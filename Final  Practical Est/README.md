# JPA One-to-Many Relationship with Cascade Persistence

This project demonstrates a One-to-Many JPA relationship between `Department` and `Employee` entities with cascade persistence and lazy loading.

## Project Structure

```
EST/
├── pom.xml                              # Maven configuration
├── src/main/
│   ├── java/com/example/
│   │   ├── entity/
│   │   │   ├── Department.java         # Department entity with @OneToMany
│   │   │   └── Employee.java           # Employee entity with @ManyToOne
│   │   ├── repository/
│   │   │   └── DepartmentRepository.java # Spring Data JPA repository
│   │   └── JpaOneToManyDemoApplication.java # Main application & demo
│   └── resources/
│       └── application.properties       # Spring Boot configuration
└── src/test/
    └── java/com/example/
        └── OneToManyCascadeTest.java   # Unit tests
```

## Key Features

### 1. One-to-Many Relationship with LAZY Loading

**Department Entity** (`Department.java`):

```java
@OneToMany(
    mappedBy = "department",
    cascade = CascadeType.ALL,
    fetch = FetchType.LAZY,        // ← LAZY loading configured
    orphanRemoval = true
)
private List<Employee> employees = new ArrayList<>();
```

**Employee Entity** (`Employee.java`):

```java
@ManyToOne(fetch = FetchType.LAZY)
@JoinColumn(name = "department_id", nullable = false)
private Department department;
```

### 2. Cascade Type Configuration

The relationship uses `CascadeType.ALL`, which means:

- **PERSIST**: When you save a Department, all associated Employees are automatically persisted
- **MERGE**: When you update a Department, Employee changes are merged
- **REMOVE**: When you delete a Department, all associated Employees are deleted
- **REFRESH**: State synchronization cascades to Employees
- **DETACH**: Entity detachment cascades to Employees

### 3. Lazy Loading (`FetchType.LAZY`)

- **Employees are NOT loaded** when fetching a Department
- **Employees ARE loaded** only when explicitly accessed (e.g., `department.getEmployees()`)
- **Benefit**: Reduces memory usage and improves performance for large datasets

## Demonstration: Saving a Department with Two Employees

The `JpaOneToManyDemoApplication` demonstrates the cascade behavior:

```java
// 1. Create a Department
Department dept = new Department();
dept.setName("Engineering");
dept.setLocation("Building A, Floor 2");

// 2. Create two Employee objects
Employee emp1 = new Employee("John Doe", "john.doe@example.com", "Senior Developer", 85000.0);
Employee emp2 = new Employee("Jane Smith", "jane.smith@example.com", "Backend Engineer", 80000.0);

// 3. Add employees to the department
dept.addEmployee(emp1);
dept.addEmployee(emp2);

// 4. Save only the Department - employees cascade automatically!
Department savedDept = departmentRepository.save(dept);

// Result: 1 Department row + 2 Employee rows = 3 rows in database
```

### Expected Output:

```
========== JPA One-to-Many Cascade Demo ==========

Created Department: Engineering
Added Employee 1: John Doe
Added Employee 2: Jane Smith

Saving department (with CascadeType.ALL, employees will be saved automatically)...

========== After Saving ==========

Department saved with ID: 1
Employee 1 ID: 2
Employee 2 ID: 3

========== Retrieved from Database ==========

Department ID: 1
Department Name: Engineering
Department Location: Building A, Floor 2

Employees in this department:
  - John Doe (ID: 2, Email: john.doe@example.com, Title: Senior Developer)
  - Jane Smith (ID: 3, Email: jane.smith@example.com, Title: Backend Engineer)

========== Summary ==========
Total rows saved: 1 Department + 2 Employees = 3 rows
Cascade Persist: ✓ Working - Employees were saved with Department
Lazy Loading: ✓ Configured - FetchType.LAZY on employees collection

================================================
```

## SQL Generated

When saving a Department with two Employees, Hibernate generates the following SQL:

```sql
-- Insert Department
INSERT INTO departments (name, location) VALUES ('Engineering', 'Building A, Floor 2');

-- Insert Employee 1
INSERT INTO employees (name, email, job_title, salary, department_id)
VALUES ('John Doe', 'john.doe@example.com', 'Senior Developer', 85000.0, 1);

-- Insert Employee 2
INSERT INTO employees (name, email, job_title, salary, department_id)
VALUES ('Jane Smith', 'jane.smith@example.com', 'Backend Engineer', 80000.0, 1);
```

## Database Schema

**departments table**:

```sql
CREATE TABLE departments (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255)
);
```

**employees table**:

```sql
CREATE TABLE employees (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE,
    job_title VARCHAR(255),
    salary DOUBLE,
    department_id BIGINT NOT NULL,
    FOREIGN KEY (department_id) REFERENCES departments(id)
);
```

## Running the Application

### Prerequisites

- Java 17+
- Maven 3.6+

### Build and Run

```bash
# Navigate to the project directory
cd EST

# Build the project
mvn clean install

# Run the Spring Boot application
mvn spring-boot:run
```

### Run Tests

```bash
# Run all tests
mvn test

# Run a specific test
mvn test -Dtest=OneToManyCascadeTest
```

## Tests Included

The `OneToManyCascadeTest` class contains four comprehensive tests:

1. **testCascadePersistMultipleEmployees**: Verifies that saving a Department automatically persists associated Employees
2. **testLazyLoadingOfEmployees**: Verifies that Employees are loaded only when accessed
3. **testCascadeDeleteOrphanRemoval**: Verifies that removing an Employee from the collection deletes it from the database
4. **testCascadeMerge**: Verifies that updating Employee data through the Department persists the changes

## Configuration

The `application.properties` file enables:

- **H2 in-memory database** for testing
- **SQL logging** to see generated queries
- **Automatic schema creation** (`ddl-auto=create-drop`)

```properties
spring.datasource.url=jdbc:h2:mem:testdb
spring.jpa.show-sql=true
spring.jpa.hibernate.ddl-auto=create-drop
logging.level.org.hibernate.SQL=DEBUG
```

## Key Concepts

| Concept                | Explanation                                                           |
| ---------------------- | --------------------------------------------------------------------- |
| **@OneToMany**         | Marks the collection side of a one-to-many relationship               |
| **@ManyToOne**         | Marks the reference side of a many-to-one relationship                |
| **mappedBy**           | Specifies the property on the inverse side that owns the relationship |
| **CascadeType.ALL**    | Cascades all operations (persist, merge, remove, etc.)                |
| **FetchType.LAZY**     | Employees are loaded only when explicitly accessed                    |
| **orphanRemoval=true** | Employees are deleted when removed from the collection                |
| **@JoinColumn**        | Specifies the foreign key column in the owned entity                  |

## Additional Notes

- The `Department` class includes helper methods `addEmployee()` and `removeEmployee()` for convenience
- The `@ToString.Exclude` annotation prevents recursive `toString()` calls on the employees collection
- The relationship is bidirectional: both sides are aware of each other
- The `Department` is the parent entity, and `Employee` is the child entity

## References

- [JPA One-to-Many Annotation](https://docs.oracle.com/cd/E24290_01/corejavapersistence/corejavapt019.htm)
- [Hibernate Cascade Types](https://docs.jboss.org/hibernate/orm/6.0/userguide/html_single/Hibernate_User_Guide.html#pc-cascade)
- [Spring Data JPA](https://spring.io/projects/spring-data-jpa)

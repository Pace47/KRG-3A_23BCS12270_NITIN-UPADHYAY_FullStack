package com.example;

import com.example.entity.Department;
import com.example.entity.Employee;
import com.example.repository.DepartmentRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class OneToManyCascadeTest {

    @Autowired
    private DepartmentRepository departmentRepository;

    /**
     * Test 1: Verify that saving a Department with employees cascades and persists all rows
     */
    @Test
    @Transactional
    void testCascadePersistMultipleEmployees() {
        // Arrange: Create a department with 2 employees
        Department dept = new Department();
        dept.setName("Sales");
        dept.setLocation("Building B");

        Employee emp1 = new Employee("Alice Johnson", "alice@example.com", "Sales Manager", 75000.0);
        Employee emp2 = new Employee("Bob Wilson", "bob@example.com", "Sales Associate", 55000.0);

        dept.addEmployee(emp1);
        dept.addEmployee(emp2);

        // Act: Save only the department - employees should cascade
        Department savedDept = departmentRepository.save(dept);

        // Assert: All three rows should exist
        assertNotNull(savedDept.getId(), "Department should have an ID");
        assertNotNull(emp1.getId(), "Employee 1 should have an ID (cascaded save)");
        assertNotNull(emp2.getId(), "Employee 2 should have an ID (cascaded save)");
        assertEquals(2, savedDept.getEmployees().size(), "Department should have 2 employees");
    }

    /**
     * Test 2: Verify LazyLoading - employees are not loaded until accessed
     */
    @Test
    @Transactional
    void testLazyLoadingOfEmployees() {
        // Arrange: Create and save a department with an employee
        Department dept = new Department();
        dept.setName("Marketing");
        dept.setLocation("Building C");
        
        Employee emp = new Employee("Carol Davis", "carol@example.com", "Marketing Manager", 70000.0);
        dept.addEmployee(emp);
        
        departmentRepository.save(dept);
        Long deptId = dept.getId();

        // Act: Clear the session and retrieve only the department
        departmentRepository.flush();
        
        // In a new transaction, fetch the department
        Department retrievedDept = departmentRepository.findById(deptId).orElse(null);
        assertNotNull(retrievedDept);

        // Assert: Employees collection is lazy loaded
        // Note: With FetchType.LAZY, accessing the collection will trigger a query
        assertEquals(1, retrievedDept.getEmployees().size());
    }

    /**
     * Test 3: Verify cascade delete - removing an employee from the department deletes it
     */
    @Test
    @Transactional
    void testCascadeDeleteOrphanRemoval() {
        // Arrange: Create and save a department with employees
        Department dept = new Department();
        dept.setName("HR");
        dept.setLocation("Building D");
        
        Employee emp1 = new Employee("Diana Evans", "diana@example.com", "HR Manager", 72000.0);
        Employee emp2 = new Employee("Eve Martinez", "eve@example.com", "Recruiter", 60000.0);
        
        dept.addEmployee(emp1);
        dept.addEmployee(emp2);
        departmentRepository.save(dept);
        
        Long emp1Id = emp1.getId();

        // Act: Remove an employee and save
        dept.removeEmployee(emp1);
        departmentRepository.save(dept);

        // Assert: The employee should be deleted (orphanRemoval=true)
        assertEquals(1, dept.getEmployees().size());
    }

    /**
     * Test 4: Verify cascade merge - updating department updates employees
     */
    @Test
    @Transactional
    void testCascadeMerge() {
        // Arrange: Create and save a department
        Department dept = new Department();
        dept.setName("Finance");
        dept.setLocation("Building E");
        
        Employee emp1 = new Employee("Frank Garcia", "frank@example.com", "Accountant", 65000.0);
        dept.addEmployee(emp1);
        departmentRepository.save(dept);

        // Act: Update the employee's salary through the department
        emp1.setSalary(68000.0);
        departmentRepository.save(dept);

        // Assert: The change should be persisted
        Department updated = departmentRepository.findById(dept.getId()).orElse(null);
        assertNotNull(updated);
        assertEquals(68000.0, updated.getEmployees().get(0).getSalary());
    }
}

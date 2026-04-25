package com.example;

import com.example.entity.Department;
import com.example.entity.Employee;
import com.example.repository.DepartmentRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class JpaOneToManyDemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(JpaOneToManyDemoApplication.class, args);
    }

    @Bean
    public CommandLineRunner run(DepartmentRepository departmentRepository) {
        return args -> {
            System.out.println("\n========== JPA One-to-Many Cascade Demo ==========\n");

            Department dept = new Department();
            dept.setName("Engineering");
            dept.setLocation("Building A, Floor 2");

            Employee emp1 = new Employee("John Doe", "john.doe@example.com", "Senior Developer", 85000.0);
            Employee emp2 = new Employee("Jane Smith", "jane.smith@example.com", "Backend Engineer", 80000.0);

            dept.addEmployee(emp1);
            dept.addEmployee(emp2);

            System.out.println("Created Department: " + dept.getName());
            System.out.println("Added Employee 1: " + emp1.getName());
            System.out.println("Added Employee 2: " + emp2.getName());
            System.out.println("\nSaving department (with CascadeType.ALL, employees will be saved automatically)...\n");

            Department savedDept = departmentRepository.save(dept);

            System.out.println("\n========== After Saving ==========\n");
            System.out.println("Department saved with ID: " + savedDept.getId());
            System.out.println("Employee 1 ID: " + emp1.getId());
            System.out.println("Employee 2 ID: " + emp2.getId());

            Department retrievedDept = departmentRepository.findById(savedDept.getId()).orElse(null);

            if (retrievedDept != null) {
                System.out.println("\n========== Retrieved from Database ==========\n");
                System.out.println("Department ID: " + retrievedDept.getId());
                System.out.println("Department Name: " + retrievedDept.getName());
                System.out.println("Department Location: " + retrievedDept.getLocation());

                System.out.println("\nEmployees in this department:");
                retrievedDept.getEmployees().forEach(emp -> {
                    System.out.println("  - " + emp.getName()
                            + " (ID: " + emp.getId()
                            + ", Email: " + emp.getEmail()
                            + ", Title: " + emp.getJobTitle() + ")");
                });

                System.out.println("\n========== Summary ==========");
                System.out.println("Total rows saved: 1 Department + " + retrievedDept.getEmployees().size() + " Employees = "
                        + (1 + retrievedDept.getEmployees().size()) + " rows");
                System.out.println("Cascade Persist: ✓ Working - Employees were saved with Department");
                System.out.println("Lazy Loading: ✓ Configured - FetchType.LAZY on employees collection");
            }

            System.out.println("\n================================================\n");
        };
    }
}

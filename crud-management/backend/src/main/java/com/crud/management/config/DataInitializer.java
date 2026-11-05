package com.crud.management.config;

import com.crud.management.entity.Employee;
import com.crud.management.repository.EmployeeRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(DataInitializer.class);
    private final EmployeeRepository employeeRepository;

    public DataInitializer(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    @Override
    public void run(String... args) {
        if (employeeRepository.count() == 0) {
            log.info("Initializing sample employee dataset...");

            List<Employee> sampleEmployees = List.of(
                    createEmp("EMP-1001", "Alexander Wright", "alexander.wright@company.org", "+1 (555) 234-5678",
                            "Engineering", "Principal Cloud Architect", new BigDecimal("145000.00"), LocalDate.of(2023, 1, 15)),
                    createEmp("EMP-1002", "Elena Rostova", "elena.rostova@company.org", "+1 (555) 345-6789",
                            "Engineering", "Senior DevOps Engineer", new BigDecimal("128000.00"), LocalDate.of(2023, 4, 1)),
                    createEmp("EMP-1003", "Marcus Chen", "marcus.chen@company.org", "+1 (555) 456-7890",
                            "Product", "VP of Product Strategy", new BigDecimal("155000.00"), LocalDate.of(2022, 9, 10)),
                    createEmp("EMP-1004", "Sophia Rodriguez", "sophia.rodriguez@company.org", "+1 (555) 567-8901",
                            "Design", "Lead UI/UX Designer", new BigDecimal("112000.00"), LocalDate.of(2023, 8, 20)),
                    createEmp("EMP-1005", "Devon Vance", "devon.vance@company.org", "+1 (555) 678-9012",
                            "Engineering", "Full Stack Software Engineer", new BigDecimal("105000.00"), LocalDate.of(2024, 2, 1)),
                    createEmp("EMP-1006", "Aisha Patel", "aisha.patel@company.org", "+1 (555) 789-0123",
                            "Human Resources", "People Operations Director", new BigDecimal("118000.00"), LocalDate.of(2022, 11, 5)),
                    createEmp("EMP-1007", "Lucas Silva", "lucas.silva@company.org", "+1 (555) 890-1234",
                            "Marketing", "Growth Marketing Lead", new BigDecimal("98000.00"), LocalDate.of(2024, 5, 12)),
                    createEmp("EMP-1008", "Hannah Schmidt", "hannah.schmidt@company.org", "+1 (555) 901-2345",
                            "Finance", "Senior Financial Analyst", new BigDecimal("115000.00"), LocalDate.of(2023, 3, 25)),
                    createEmp("EMP-1009", "Tariq Mansoor", "tariq.mansoor@company.org", "+1 (555) 012-3456",
                            "Engineering", "Security Operations Specialist", new BigDecimal("122000.00"), LocalDate.of(2024, 1, 10)),
                    createEmp("EMP-1010", "Chloe Dubois", "chloe.dubois@company.org", "+1 (555) 123-9876",
                            "Sales", "Enterprise Account Executive", new BigDecimal("130000.00"), LocalDate.of(2023, 7, 18)),
                    createEmp("EMP-1011", "Liam O'Connor", "liam.oconnor@company.org", "+1 (555) 234-8765",
                            "Product", "Technical Product Manager", new BigDecimal("125000.00"), LocalDate.of(2024, 6, 1)),
                    createEmp("EMP-1012", "Maya Tanaka", "maya.tanaka@company.org", "+1 (555) 345-7654",
                            "Engineering", "Backend Systems Engineer", new BigDecimal("110000.00"), LocalDate.of(2024, 8, 15))
            );

            employeeRepository.saveAll(sampleEmployees);
            log.info("Initialized {} sample employee records successfully.", sampleEmployees.size());
        }
    }

    private Employee createEmp(String code, String name, String email, String phone, String dept, String role, BigDecimal salary, LocalDate joinDate) {
        Employee e = new Employee();
        e.setEmployeeCode(code);
        e.setFullName(name);
        e.setEmail(email);
        e.setPhoneNumber(phone);
        e.setDepartment(dept);
        e.setDesignation(role);
        e.setSalary(salary);
        e.setJoiningDate(joinDate);
        return e;
    }
}

package com.crud.management.service.impl;

import com.crud.management.dto.DashboardStatsDto;
import com.crud.management.dto.EmployeeRequestDto;
import com.crud.management.dto.EmployeeResponseDto;
import com.crud.management.dto.PaginatedResponseDto;
import com.crud.management.entity.Employee;
import com.crud.management.exception.ResourceNotFoundException;
import com.crud.management.repository.EmployeeRepository;
import com.crud.management.service.EmployeeService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Transactional
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeRepository employeeRepository;

    public EmployeeServiceImpl(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    @Override
    public EmployeeResponseDto createEmployee(EmployeeRequestDto requestDto) {
        if (employeeRepository.findByEmail(requestDto.getEmail().trim().toLowerCase()).isPresent()) {
            throw new IllegalArgumentException("An employee with email '" + requestDto.getEmail() + "' already exists.");
        }

        Employee employee = new Employee();
        mapDtoToEntity(requestDto, employee);

        if (requestDto.getEmployeeCode() != null && !requestDto.getEmployeeCode().trim().isEmpty()) {
            String code = requestDto.getEmployeeCode().trim().toUpperCase();
            if (employeeRepository.findByEmployeeCode(code).isPresent()) {
                throw new IllegalArgumentException("Employee code '" + code + "' already in use.");
            }
            employee.setEmployeeCode(code);
        } else {
            // Generate auto employee code
            long count = employeeRepository.count() + 1;
            employee.setEmployeeCode(String.format("EMP-%04d", count));
        }

        Employee saved = employeeRepository.save(employee);
        return EmployeeResponseDto.fromEntity(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public PaginatedResponseDto<EmployeeResponseDto> getAllEmployees(int page, int size, String sortBy, String sortDir, String search, String department) {
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.DESC.name())
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();

        Pageable pageable = PageRequest.of(page, size, sort);

        Specification<Employee> spec = Specification.where(null);

        if (department != null && !department.trim().isEmpty() && !department.equalsIgnoreCase("ALL")) {
            final String deptVal = department.trim().toLowerCase();
            spec = spec.and((root, query, cb) ->
                    cb.equal(cb.lower(root.get("department")), deptVal)
            );
        }

        if (search != null && !search.trim().isEmpty()) {
            final String searchPattern = "%" + search.trim().toLowerCase() + "%";
            spec = spec.and((root, query, cb) ->
                    cb.or(
                            cb.like(cb.lower(root.get("fullName")), searchPattern),
                            cb.like(cb.lower(root.get("email")), searchPattern),
                            cb.like(cb.lower(root.get("designation")), searchPattern),
                            cb.like(cb.lower(root.get("employeeCode")), searchPattern)
                    )
            );
        }

        Page<Employee> employeePage = employeeRepository.findAll(spec, pageable);

        List<EmployeeResponseDto> content = employeePage.getContent().stream()
                .map(EmployeeResponseDto::fromEntity)
                .collect(Collectors.toList());

        return new PaginatedResponseDto<>(
                content,
                employeePage.getNumber(),
                employeePage.getSize(),
                employeePage.getTotalElements(),
                employeePage.getTotalPages(),
                employeePage.isLast()
        );
    }

    @Override
    @Transactional(readOnly = true)
    public EmployeeResponseDto getEmployeeById(Long id) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + id));
        return EmployeeResponseDto.fromEntity(employee);
    }

    @Override
    public EmployeeResponseDto updateEmployee(Long id, EmployeeRequestDto requestDto) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + id));

        String email = requestDto.getEmail().trim().toLowerCase();
        if (employeeRepository.existsByEmailAndIdNot(email, id)) {
            throw new IllegalArgumentException("An employee with email '" + email + "' already exists.");
        }

        if (requestDto.getEmployeeCode() != null && !requestDto.getEmployeeCode().trim().isEmpty()) {
            String code = requestDto.getEmployeeCode().trim().toUpperCase();
            if (employeeRepository.existsByEmployeeCodeAndIdNot(code, id)) {
                throw new IllegalArgumentException("Employee code '" + code + "' already in use.");
            }
            employee.setEmployeeCode(code);
        }

        mapDtoToEntity(requestDto, employee);
        Employee updated = employeeRepository.save(employee);
        return EmployeeResponseDto.fromEntity(updated);
    }

    @Override
    public void deleteEmployee(Long id) {
        if (!employeeRepository.existsById(id)) {
            throw new ResourceNotFoundException("Cannot delete: Employee not found with id: " + id);
        }
        employeeRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public DashboardStatsDto getDashboardStats() {
        long totalEmployees = employeeRepository.count();
        Double avgSalary = employeeRepository.findAverageSalary();
        BigDecimal avgDecimal = avgSalary != null
                ? BigDecimal.valueOf(avgSalary).setScale(2, RoundingMode.HALF_UP)
                : BigDecimal.ZERO;

        List<Object[]> deptCounts = employeeRepository.countEmployeesByDepartment();
        Map<String, Long> breakdown = new HashMap<>();
        for (Object[] row : deptCounts) {
            String dept = (String) row[0];
            Long cnt = (Long) row[1];
            breakdown.put(dept, cnt);
        }

        LocalDate thirtyDaysAgo = LocalDate.now().minusDays(30);
        long newJoiners = employeeRepository.countNewJoinersSince(thirtyDaysAgo);

        return new DashboardStatsDto(
                totalEmployees,
                avgDecimal,
                breakdown.size(),
                breakdown,
                newJoiners
        );
    }

    @Override
    @Transactional(readOnly = true)
    public List<String> getAllDepartments() {
        return employeeRepository.findDistinctDepartments();
    }

    private void mapDtoToEntity(EmployeeRequestDto dto, Employee entity) {
        entity.setFullName(dto.getFullName().trim());
        entity.setEmail(dto.getEmail().trim().toLowerCase());
        entity.setPhoneNumber(dto.getPhoneNumber().trim());
        entity.setDepartment(dto.getDepartment().trim());
        entity.setDesignation(dto.getDesignation().trim());
        entity.setSalary(dto.getSalary());
        entity.setJoiningDate(dto.getJoiningDate());
    }
}

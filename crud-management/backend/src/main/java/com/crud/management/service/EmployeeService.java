package com.crud.management.service;

import com.crud.management.dto.DashboardStatsDto;
import com.crud.management.dto.EmployeeRequestDto;
import com.crud.management.dto.EmployeeResponseDto;
import com.crud.management.dto.PaginatedResponseDto;

import java.util.List;

public interface EmployeeService {

    EmployeeResponseDto createEmployee(EmployeeRequestDto requestDto);

    PaginatedResponseDto<EmployeeResponseDto> getAllEmployees(int page, int size, String sortBy, String sortDir, String search, String department);

    EmployeeResponseDto getEmployeeById(Long id);

    EmployeeResponseDto updateEmployee(Long id, EmployeeRequestDto requestDto);

    void deleteEmployee(Long id);

    DashboardStatsDto getDashboardStats();

    List<String> getAllDepartments();
}

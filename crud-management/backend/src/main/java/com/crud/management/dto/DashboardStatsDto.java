package com.crud.management.dto;

import java.math.BigDecimal;
import java.util.Map;

public class DashboardStatsDto {

    private long totalEmployees;
    private BigDecimal averageSalary;
    private long totalDepartments;
    private Map<String, Long> departmentBreakdown;
    private long newJoinersLast30Days;

    public DashboardStatsDto() {
    }

    public DashboardStatsDto(long totalEmployees, BigDecimal averageSalary, long totalDepartments,
                             Map<String, Long> departmentBreakdown, long newJoinersLast30Days) {
        this.totalEmployees = totalEmployees;
        this.averageSalary = averageSalary;
        this.totalDepartments = totalDepartments;
        this.departmentBreakdown = departmentBreakdown;
        this.newJoinersLast30Days = newJoinersLast30Days;
    }

    public long getTotalEmployees() {
        return totalEmployees;
    }

    public void setTotalEmployees(long totalEmployees) {
        this.totalEmployees = totalEmployees;
    }

    public BigDecimal getAverageSalary() {
        return averageSalary;
    }

    public void setAverageSalary(BigDecimal averageSalary) {
        this.averageSalary = averageSalary;
    }

    public long getTotalDepartments() {
        return totalDepartments;
    }

    public void setTotalDepartments(long totalDepartments) {
        this.totalDepartments = totalDepartments;
    }

    public Map<String, Long> getDepartmentBreakdown() {
        return departmentBreakdown;
    }

    public void setDepartmentBreakdown(Map<String, Long> departmentBreakdown) {
        this.departmentBreakdown = departmentBreakdown;
    }

    public long getNewJoinersLast30Days() {
        return newJoinersLast30Days;
    }

    public void setNewJoinersLast30Days(long newJoinersLast30Days) {
        this.newJoinersLast30Days = newJoinersLast30Days;
    }
}

import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  TextField,
  MenuItem,
  InputAdornment,
  IconButton,
  Paper,
  Breadcrumbs,
  Link,
  Card,
  CardContent,
  LinearProgress,
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  Clear as ClearIcon,
  People as PeopleIcon,
  AttachMoney as MoneyIcon,
  CorporateFare as CorporateFareIcon,
  PersonAdd as PersonAddIcon,
  Refresh as RefreshIcon,
  Home as HomeIcon,
  Dns as DnsIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

import { Sidebar } from '../components/Sidebar';
import { StatCard } from '../components/StatCard';
import { EmployeeTable } from '../components/EmployeeTable';
import { EmployeeFormDialog } from '../components/EmployeeFormDialog';
import { EmployeeViewDialog } from '../components/EmployeeViewDialog';
import { DeleteConfirmDialog } from '../components/DeleteConfirmDialog';
import { NotificationSnackbar, type ToastState } from '../components/NotificationSnackbar';

import { employeeService } from '../services/api';
import type { Employee, EmployeeFormData, DashboardStats } from '../types/employee';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();

  // Navigation tab state
  const [currentTab, setCurrentTab] = useState<string>('employees');

  // Employee data state
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [totalElements, setTotalElements] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [loading, setLoading] = useState<boolean>(true);

  // Search & Filter state
  const [search, setSearch] = useState<string>('');
  const [appliedSearch, setAppliedSearch] = useState<string>('');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('');
  const [departmentList, setDepartmentList] = useState<string[]>([]);

  // Statistics state
  const [stats, setStats] = useState<DashboardStats>({
    totalEmployees: 0,
    averageSalary: 0,
    totalDepartments: 0,
    departmentBreakdown: {},
    newJoinersLast30Days: 0,
  });

  // Dialog states
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [employeeToEdit, setEmployeeToEdit] = useState<Employee | null>(null);

  const [isViewOpen, setIsViewOpen] = useState<boolean>(false);
  const [employeeToView, setEmployeeToView] = useState<Employee | null>(null);

  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
  const [employeeToDelete, setEmployeeToDelete] = useState<Employee | null>(null);

  // Toast notification state
  const [toast, setToast] = useState<ToastState>({
    open: false,
    message: '',
    severity: 'success',
  });

  const showToast = (message: string, severity: 'success' | 'error' | 'info' | 'warning' = 'success', title?: string) => {
    setToast({ open: true, message, severity, title });
  };

  // Fetch employees list
  const loadEmployees = useCallback(async () => {
    try {
      setLoading(true);
      const data = await employeeService.getEmployees({
        page,
        size: rowsPerPage,
        sortBy: 'id',
        sortDir: 'desc',
        search: appliedSearch || undefined,
        department: selectedDepartment || undefined,
      });
      setEmployees(data.content);
      setTotalElements(data.totalElements);
    } catch (err: unknown) {
      const errorMsg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Failed to connect to backend service';
      showToast(errorMsg, 'error', 'Connection Error');
    } finally {
      setLoading(false);
    }
  }, [page, rowsPerPage, appliedSearch, selectedDepartment]);

  // Fetch dashboard stats & department lists
  const loadStatsAndMetadata = useCallback(async () => {
    try {
      const [statsData, deptsData] = await Promise.all([
        employeeService.getStats().catch(() => null),
        employeeService.getDepartments().catch(() => []),
      ]);
      if (statsData) setStats(statsData);
      if (deptsData) setDepartmentList(deptsData);
    } catch {
      // Ignore background stats failure on first mount
    }
  }, []);

  // Initial load
  useEffect(() => {
    loadStatsAndMetadata();
  }, [loadStatsAndMetadata]);

  useEffect(() => {
    loadEmployees();
  }, [loadEmployees]);

  // Handle Search Execution
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(0);
    setAppliedSearch(search);
  };

  const handleClearSearch = () => {
    setSearch('');
    setAppliedSearch('');
    setPage(0);
  };

  // CRUD Actions
  const handleOpenAddDialog = () => {
    setEmployeeToEdit(null);
    setIsFormOpen(true);
  };

  const handleOpenEditDialog = (employee: Employee) => {
    setEmployeeToEdit(employee);
    setIsFormOpen(true);
  };

  const handleOpenViewDialog = (employee: Employee) => {
    setEmployeeToView(employee);
    setIsViewOpen(true);
  };

  const handleOpenDeleteDialog = (employee: Employee) => {
    setEmployeeToDelete(employee);
    setIsDeleteOpen(true);
  };

  const handleSaveEmployee = async (formData: EmployeeFormData) => {
    try {
      if (employeeToEdit) {
        await employeeService.updateEmployee(employeeToEdit.id, formData);
        showToast(`Employee "${formData.fullName}" updated successfully!`, 'success');
      } else {
        await employeeService.createEmployee(formData);
        showToast(`Employee "${formData.fullName}" registered successfully!`, 'success');
      }
      setIsFormOpen(false);
      loadEmployees();
      loadStatsAndMetadata();
    } catch (err: unknown) {
      const errorMsg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Failed to save employee';
      showToast(errorMsg, 'error', 'Operation Failed');
      throw err;
    }
  };

  const handleDeleteEmployee = async () => {
    if (!employeeToDelete) return;
    try {
      await employeeService.deleteEmployee(employeeToDelete.id);
      showToast(`Employee record for "${employeeToDelete.fullName}" was removed.`, 'success');
      setIsDeleteOpen(false);
      loadEmployees();
      loadStatsAndMetadata();
    } catch (err: unknown) {
      const errorMsg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Failed to delete employee';
      showToast(errorMsg, 'error', 'Delete Failed');
      throw err;
    }
  };

  return (
    <Box sx={{ display: 'flex', minHeight: 'calc(100vh - 64px)', backgroundColor: '#f8fafc' }}>
      {/* Sidebar Navigation */}
      <Sidebar
        currentTab={currentTab}
        onTabChange={(tab) => {
          setCurrentTab(tab);
          if (tab === 'employees') {
            setSelectedDepartment('');
            setAppliedSearch('');
            setSearch('');
          }
        }}
        employeeCount={totalElements}
      />

      {/* Main Content Area */}
      <Box sx={{ flexGrow: 1, p: { xs: 2, sm: 3, md: 4 }, overflowX: 'hidden' }}>
        <Container maxWidth="xl" disableGutters>
          {/* Header & Breadcrumb */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Box>
              <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 0.5, fontSize: '0.85rem' }}>
                <Link
                  underline="hover"
                  sx={{ display: 'flex', alignItems: 'center', color: '#64748b', cursor: 'pointer' }}
                  onClick={() => navigate('/')}
                >
                  <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                  Home
                </Link>
                <Typography sx={{ color: '#0f172a', fontWeight: 600, fontSize: '0.85rem' }}>
                  CRUD Management Dashboard
                </Typography>
              </Breadcrumbs>
              <Typography variant="h4" sx={{ fontWeight: 800, color: '#0f172a' }}>
                Employee Operations Hub
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', gap: 1.5 }}>
              <Button
                variant="outlined"
                startIcon={<RefreshIcon />}
                onClick={() => {
                  loadEmployees();
                  loadStatsAndMetadata();
                  showToast('Data refreshed successfully', 'info');
                }}
                sx={{ backgroundColor: '#ffffff' }}
              >
                Refresh
              </Button>

              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleOpenAddDialog}
                sx={{
                  background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                  fontWeight: 700,
                  boxShadow: '0 4px 14px rgba(37, 99, 235, 0.35)',
                }}
              >
                Add Employee
              </Button>
            </Box>
          </Box>

          {/* Metric Overview Cards */}
          <Grid container spacing={2.5} sx={{ mb: 3.5 }}>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <StatCard
                title="Total Employees"
                value={stats.totalEmployees || totalElements}
                subtitle="Active workforce count"
                icon={<PeopleIcon />}
                iconBgColor="#2563eb"
                trendText="Synced with PostgreSQL"
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <StatCard
                title="Average Annual Salary"
                value={`$${Number(stats.averageSalary || 0).toLocaleString('en-US', { maximumFractionDigits: 0 })}`}
                subtitle="Calculated across all roles"
                icon={<MoneyIcon />}
                iconBgColor="#10b981"
                trendText="Live JPA aggregate"
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <StatCard
                title="Active Departments"
                value={stats.totalDepartments || departmentList.length}
                subtitle="Functional business units"
                icon={<CorporateFareIcon />}
                iconBgColor="#8b5cf6"
                trendText="Multi-disciplinary"
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <StatCard
                title="New Joiners"
                value={stats.newJoinersLast30Days}
                subtitle="Onboarded in last 30 days"
                icon={<PersonAddIcon />}
                iconBgColor="#f59e0b"
                trendText="Active hiring"
              />
            </Grid>
          </Grid>

          {/* Tab Specific Views: If Analytics Tab */}
          {currentTab === 'analytics' && (
            <Card sx={{ mb: 3, p: 2 }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                  Department Distribution Breakdown
                </Typography>
                <Grid container spacing={2}>
                  {Object.entries(stats.departmentBreakdown).map(([dept, count]) => {
                    const percentage = stats.totalEmployees > 0 ? Math.round((count / stats.totalEmployees) * 100) : 0;
                    return (
                      <Grid size={{ xs: 12, sm: 6, md: 4 }} key={dept}>
                        <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                              {dept}
                            </Typography>
                            <Typography variant="caption" sx={{ fontWeight: 700, color: '#2563eb' }}>
                              {count} staff ({percentage}%)
                            </Typography>
                          </Box>
                          <LinearProgress variant="determinate" value={percentage} sx={{ height: 8, borderRadius: 4 }} />
                        </Paper>
                      </Grid>
                    );
                  })}
                </Grid>
              </CardContent>
            </Card>
          )}

          {/* Tab Specific Views: If System Tab */}
          {currentTab === 'system' && (
            <Card sx={{ mb: 3, p: 2 }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <DnsIcon color="primary" /> Container Orchestration Health
                </Typography>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, md: 3 }}>
                    <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, borderColor: '#86efac', backgroundColor: '#f0fdf4' }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#166534' }}>
                        crud-nginx
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#15803d' }}>
                        Port 80 (Gateway Entry) • Active
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid size={{ xs: 12, md: 3 }}>
                    <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, borderColor: '#93c5fd', backgroundColor: '#eff6ff' }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1e40af' }}>
                        crud-frontend
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#1d4ed8' }}>
                        React 19 Vite Production SPA • Healthy
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid size={{ xs: 12, md: 3 }}>
                    <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, borderColor: '#c4b5fd', backgroundColor: '#f5f3ff' }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#5b21b6' }}>
                        crud-backend
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#6d28d9' }}>
                        Spring Boot 3 + Java 21 • Healthy
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid size={{ xs: 12, md: 3 }}>
                    <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, borderColor: '#fde047', backgroundColor: '#fefce8' }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#854d0e' }}>
                        postgres
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#a16207' }}>
                        PostgreSQL 16 Alpine • Volume Attached
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          )}

          {/* Filter & Search Bar Controls */}
          <Paper
            elevation={0}
            sx={{
              p: 2,
              mb: 3,
              borderRadius: 3,
              border: '1px solid #e2e8f0',
              backgroundColor: '#ffffff',
            }}
          >
            <Grid container spacing={2} sx={{ alignItems: 'center' }}>
              {/* Search input */}
              <Grid size={{ xs: 12, sm: 6, md: 6 }}>
                <form onSubmit={handleSearchSubmit}>
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Search by name, email, designation, or employee code..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon sx={{ color: '#94a3b8' }} />
                          </InputAdornment>
                        ),
                        endAdornment: search ? (
                          <InputAdornment position="end">
                            <IconButton size="small" onClick={handleClearSearch}>
                              <ClearIcon fontSize="small" />
                            </IconButton>
                          </InputAdornment>
                        ) : null,
                      },
                    }}
                  />
                </form>
              </Grid>

              {/* Department filter dropdown */}
              <Grid size={{ xs: 12, sm: 4, md: 4 }}>
                <TextField
                  select
                  fullWidth
                  size="small"
                  label="Filter by Department"
                  value={selectedDepartment}
                  onChange={(e) => {
                    setSelectedDepartment(e.target.value);
                    setPage(0);
                  }}
                >
                  <MenuItem value="">
                    <em>All Departments ({totalElements})</em>
                  </MenuItem>
                  {departmentList.map((dept) => (
                    <MenuItem key={dept} value={dept}>
                      {dept}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              {/* Search Action Button */}
              <Grid size={{ xs: 12, sm: 2, md: 2 }}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => {
                    setPage(0);
                    setAppliedSearch(search);
                  }}
                  startIcon={<SearchIcon />}
                  sx={{ height: 40 }}
                >
                  Search
                </Button>
              </Grid>
            </Grid>
          </Paper>

          {/* Employee CRUD Table */}
          <EmployeeTable
            employees={employees}
            totalElements={totalElements}
            page={page}
            rowsPerPage={rowsPerPage}
            loading={loading}
            onPageChange={(newPage) => setPage(newPage)}
            onRowsPerPageChange={(newSize) => {
              setRowsPerPage(newSize);
              setPage(0);
            }}
            onView={handleOpenViewDialog}
            onEdit={handleOpenEditDialog}
            onDelete={handleOpenDeleteDialog}
          />
        </Container>
      </Box>

      {/* Add / Edit Employee Dialog Modal */}
      <EmployeeFormDialog
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleSaveEmployee}
        employeeToEdit={employeeToEdit}
        departments={departmentList}
      />

      {/* View Individual Employee Dialog Modal */}
      <EmployeeViewDialog
        open={isViewOpen}
        onClose={() => setIsViewOpen(false)}
        employee={employeeToView}
        onEdit={(emp) => {
          setIsViewOpen(false);
          handleOpenEditDialog(emp);
        }}
      />

      {/* Confirmation Dialog Before Deleting */}
      <DeleteConfirmDialog
        open={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDeleteEmployee}
        employee={employeeToDelete}
      />

      {/* Toast Notification Snackbar */}
      <NotificationSnackbar
        toast={toast}
        onClose={() => setToast({ ...toast, open: false })}
      />
    </Box>
  );
};

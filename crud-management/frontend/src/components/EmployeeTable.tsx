import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
  Avatar,
  Box,
  Typography,
  TablePagination,
  Tooltip,
  CircularProgress,
} from '@mui/material';
import {
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  DeleteOutlined as DeleteIcon,
} from '@mui/icons-material';
import type { Employee } from '../types/employee';

interface EmployeeTableProps {
  employees: Employee[];
  totalElements: number;
  page: number;
  rowsPerPage: number;
  loading: boolean;
  onPageChange: (newPage: number) => void;
  onRowsPerPageChange: (newRowsPerPage: number) => void;
  onView: (employee: Employee) => void;
  onEdit: (employee: Employee) => void;
  onDelete: (employee: Employee) => void;
}

// Map department names to consistent distinctive colors
const getDepartmentColor = (dept: string) => {
  const normalized = dept.toLowerCase();
  if (normalized.includes('eng')) return { bg: '#eff6ff', color: '#1d4ed8', border: '#bfdbfe' };
  if (normalized.includes('prod')) return { bg: '#faf5ff', color: '#7e22ce', border: '#e9d5ff' };
  if (normalized.includes('sale')) return { bg: '#f0fdf4', color: '#15803d', border: '#bbf7d0' };
  if (normalized.includes('market')) return { bg: '#fff7ed', color: '#c2410c', border: '#fed7aa' };
  if (normalized.includes('hr') || normalized.includes('human')) return { bg: '#fdf2f8', color: '#be185d', border: '#fbcfe8' };
  if (normalized.includes('fin')) return { bg: '#f0fdfa', color: '#0f766e', border: '#99f6e4' };
  if (normalized.includes('des')) return { bg: '#fefce8', color: '#a16207', border: '#fef08a' };
  return { bg: '#f1f5f9', color: '#475569', border: '#cbd5e1' };
};

const getInitials = (name: string) => {
  const parts = name.trim().split(' ');
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
};

export const EmployeeTable: React.FC<EmployeeTableProps> = ({
  employees,
  totalElements,
  page,
  rowsPerPage,
  loading,
  onPageChange,
  onRowsPerPageChange,
  onView,
  onEdit,
  onDelete,
}) => {
  return (
    <Paper
      elevation={0}
      sx={{
        border: '1px solid #e2e8f0',
        borderRadius: 3,
        overflow: 'hidden',
        backgroundColor: '#ffffff',
      }}
    >
      <TableContainer sx={{ minHeight: 420 }}>
        <Table sx={{ minWidth: 900 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ pl: 3 }}>Employee</TableCell>
              <TableCell>Code</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Designation</TableCell>
              <TableCell>Contact Info</TableCell>
              <TableCell>Salary</TableCell>
              <TableCell>Joining Date</TableCell>
              <TableCell align="right" sx={{ pr: 3 }}>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={8} align="center" sx={{ py: 8 }}>
                  <CircularProgress size={36} color="primary" />
                  <Typography variant="body2" sx={{ mt: 1.5, color: '#64748b' }}>
                    Loading employee data...
                  </Typography>
                </TableCell>
              </TableRow>
            ) : employees.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} align="center" sx={{ py: 8 }}>
                  <Typography variant="h6" sx={{ color: '#475569', fontWeight: 600 }}>
                    No employees found
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#94a3b8', mt: 0.5 }}>
                    Try adjusting your search criteria or add a new employee record.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              employees.map((emp) => {
                const deptStyle = getDepartmentColor(emp.department);
                return (
                  <TableRow key={emp.id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    {/* Full Name & Avatar */}
                    <TableCell sx={{ pl: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Avatar
                          sx={{
                            width: 38,
                            height: 38,
                            fontSize: '0.875rem',
                            fontWeight: 700,
                            backgroundColor: '#e0e7ff',
                            color: '#3730a3',
                          }}
                        >
                          {getInitials(emp.fullName)}
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#0f172a' }}>
                            {emp.fullName}
                          </Typography>
                          <Typography variant="caption" sx={{ color: '#64748b' }}>
                            {emp.email}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>

                    {/* Employee Code */}
                    <TableCell>
                      <Chip
                        label={emp.employeeCode}
                        size="small"
                        sx={{
                          fontWeight: 700,
                          fontSize: '0.75rem',
                          backgroundColor: '#f1f5f9',
                          color: '#334155',
                          borderRadius: 1.5,
                        }}
                      />
                    </TableCell>

                    {/* Department */}
                    <TableCell>
                      <Chip
                        label={emp.department}
                        size="small"
                        sx={{
                          backgroundColor: deptStyle.bg,
                          color: deptStyle.color,
                          border: `1px solid ${deptStyle.border}`,
                          fontWeight: 600,
                          fontSize: '0.75rem',
                          borderRadius: 2,
                        }}
                      />
                    </TableCell>

                    {/* Designation */}
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 500, color: '#334155' }}>
                        {emp.designation}
                      </Typography>
                    </TableCell>

                    {/* Phone Number */}
                    <TableCell>
                      <Typography variant="body2" sx={{ color: '#475569', fontSize: '0.85rem' }}>
                        {emp.phoneNumber}
                      </Typography>
                    </TableCell>

                    {/* Salary */}
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 700, color: '#0f172a' }}>
                        ${Number(emp.salary).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </Typography>
                    </TableCell>

                    {/* Joining Date */}
                    <TableCell>
                      <Typography variant="body2" sx={{ color: '#64748b', fontSize: '0.85rem' }}>
                        {emp.joiningDate}
                      </Typography>
                    </TableCell>

                    {/* Actions */}
                    <TableCell align="right" sx={{ pr: 3 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 0.5 }}>
                        <Tooltip title="View Details">
                          <IconButton
                            size="small"
                            onClick={() => onView(emp)}
                            sx={{ color: '#2563eb', '&:hover': { backgroundColor: '#eff6ff' } }}
                          >
                            <VisibilityIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="Edit Employee">
                          <IconButton
                            size="small"
                            onClick={() => onEdit(emp)}
                            sx={{ color: '#0284c7', '&:hover': { backgroundColor: '#e0f2fe' } }}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="Delete Employee">
                          <IconButton
                            size="small"
                            onClick={() => onDelete(emp)}
                            sx={{ color: '#ef4444', '&:hover': { backgroundColor: '#fef2f2' } }}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination Bar */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50]}
        component="div"
        count={totalElements}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(_, newPage) => onPageChange(newPage)}
        onRowsPerPageChange={(e) => onRowsPerPageChange(parseInt(e.target.value, 10))}
        sx={{
          borderTop: '1px solid #e2e8f0',
          backgroundColor: '#ffffff',
        }}
      />
    </Paper>
  );
};

import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  MenuItem,
  Typography,
  InputAdornment,
  CircularProgress,
} from '@mui/material';
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Business as BusinessIcon,
  Work as WorkIcon,
  AttachMoney as MoneyIcon,
  CalendarToday as CalendarIcon,
  Badge as BadgeIcon,
} from '@mui/icons-material';
import type { Employee, EmployeeFormData, FormErrors } from '../types/employee';

interface EmployeeFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: EmployeeFormData) => Promise<void>;
  employeeToEdit?: Employee | null;
  departments: string[];
}

const DEFAULT_DEPARTMENTS = [
  'Engineering',
  'Product',
  'Design',
  'Human Resources',
  'Sales',
  'Marketing',
  'Finance',
  'Operations',
];

export const EmployeeFormDialog: React.FC<EmployeeFormDialogProps> = ({
  open,
  onClose,
  onSubmit,
  employeeToEdit,
  departments,
}) => {
  const isEdit = Boolean(employeeToEdit);

  const [formData, setFormData] = useState<EmployeeFormData>({
    employeeCode: '',
    fullName: '',
    email: '',
    phoneNumber: '',
    department: '',
    designation: '',
    salary: '',
    joiningDate: new Date().toISOString().split('T')[0],
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);

  // Synchronize state when opening or when employeeToEdit changes
  useEffect(() => {
    if (employeeToEdit) {
      setFormData({
        employeeCode: employeeToEdit.employeeCode || '',
        fullName: employeeToEdit.fullName || '',
        email: employeeToEdit.email || '',
        phoneNumber: employeeToEdit.phoneNumber || '',
        department: employeeToEdit.department || '',
        designation: employeeToEdit.designation || '',
        salary: employeeToEdit.salary ?? '',
        joiningDate: employeeToEdit.joiningDate || new Date().toISOString().split('T')[0],
      });
    } else {
      setFormData({
        employeeCode: '',
        fullName: '',
        email: '',
        phoneNumber: '',
        department: 'Engineering',
        designation: '',
        salary: '',
        joiningDate: new Date().toISOString().split('T')[0],
      });
    }
    setErrors({});
  }, [employeeToEdit, open]);

  // Combine default departments and any existing ones
  const availableDepartments = Array.from(
    new Set([...DEFAULT_DEPARTMENTS, ...(departments || [])])
  );

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Full Name must be at least 2 characters';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Enter a valid email address (e.g. user@company.org)';
    }

    const phoneRegex = /^[+0-9\s\-()]{7,25}$/;
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phoneNumber.trim())) {
      newErrors.phoneNumber = 'Enter a valid phone number (min 7 digits)';
    }

    if (!formData.department.trim()) {
      newErrors.department = 'Please select a department';
    }

    if (!formData.designation.trim()) {
      newErrors.designation = 'Designation/Job Title is required';
    }

    if (formData.salary === '' || formData.salary === undefined || Number(formData.salary) <= 0) {
      newErrors.salary = 'Salary must be a positive number';
    }

    if (!formData.joiningDate) {
      newErrors.joiningDate = 'Joining date is required';
    } else {
      const selected = new Date(formData.joiningDate);
      const today = new Date();
      today.setHours(23, 59, 59, 999);
      if (selected > today) {
        newErrors.joiningDate = 'Joining date cannot be in the future';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setSubmitting(true);
      await onSubmit(formData);
      onClose();
    } catch {
      // Error handled by parent toast
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={submitting ? undefined : onClose}
      maxWidth="md"
      fullWidth
      slotProps={{
        paper: {
          sx: { borderRadius: 3, p: 1 },
        },
      }}
    >
      <form onSubmit={handleSubmit} noValidate>
        <DialogTitle sx={{ pb: 1 }}>
          <Typography variant="h5" sx={{ fontWeight: 800, color: '#0f172a' }}>
            {isEdit ? 'Edit Employee Details' : 'Add New Employee'}
          </Typography>
          <Typography variant="body2" sx={{ color: '#64748b' }}>
            {isEdit
              ? `Updating profile and corporate records for ${employeeToEdit?.fullName}`
              : 'Complete the form below to register a new employee into the system.'}
          </Typography>
        </DialogTitle>

        <DialogContent dividers sx={{ pt: 2.5 }}>
          <Grid container spacing={2.5}>
            {/* Employee Code (Optional / Auto) */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Employee ID / Code"
                placeholder="e.g. EMP-1015 (Leave blank to auto-generate)"
                value={formData.employeeCode}
                onChange={(e) => setFormData({ ...formData, employeeCode: e.target.value })}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <BadgeIcon sx={{ color: '#94a3b8' }} />
                      </InputAdornment>
                    ),
                  },
                }}
                helperText="Custom unique code or automatically generated"
              />
            </Grid>

            {/* Full Name */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                required
                fullWidth
                label="Full Name"
                placeholder="e.g. Sarah Jenkins"
                value={formData.fullName}
                onChange={(e) => {
                  setFormData({ ...formData, fullName: e.target.value });
                  if (errors.fullName) setErrors({ ...errors, fullName: undefined });
                }}
                error={Boolean(errors.fullName)}
                helperText={errors.fullName}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon sx={{ color: '#94a3b8' }} />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Grid>

            {/* Email */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                required
                fullWidth
                type="email"
                label="Corporate Email"
                placeholder="e.g. s.jenkins@company.org"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                  if (errors.email) setErrors({ ...errors, email: undefined });
                }}
                error={Boolean(errors.email)}
                helperText={errors.email}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon sx={{ color: '#94a3b8' }} />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Grid>

            {/* Phone Number */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                required
                fullWidth
                label="Phone Number"
                placeholder="+1 (555) 000-0000"
                value={formData.phoneNumber}
                onChange={(e) => {
                  setFormData({ ...formData, phoneNumber: e.target.value });
                  if (errors.phoneNumber) setErrors({ ...errors, phoneNumber: undefined });
                }}
                error={Boolean(errors.phoneNumber)}
                helperText={errors.phoneNumber}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneIcon sx={{ color: '#94a3b8' }} />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Grid>

            {/* Department */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                select
                required
                fullWidth
                label="Department"
                value={formData.department}
                onChange={(e) => {
                  setFormData({ ...formData, department: e.target.value });
                  if (errors.department) setErrors({ ...errors, department: undefined });
                }}
                error={Boolean(errors.department)}
                helperText={errors.department}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <BusinessIcon sx={{ color: '#94a3b8' }} />
                      </InputAdornment>
                    ),
                  },
                }}
              >
                {availableDepartments.map((dept) => (
                  <MenuItem key={dept} value={dept}>
                    {dept}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* Designation */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                required
                fullWidth
                label="Designation / Role"
                placeholder="e.g. Senior Software Architect"
                value={formData.designation}
                onChange={(e) => {
                  setFormData({ ...formData, designation: e.target.value });
                  if (errors.designation) setErrors({ ...errors, designation: undefined });
                }}
                error={Boolean(errors.designation)}
                helperText={errors.designation}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <WorkIcon sx={{ color: '#94a3b8' }} />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Grid>

            {/* Salary */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                required
                fullWidth
                type="number"
                label="Annual Salary (USD)"
                placeholder="e.g. 120000"
                value={formData.salary}
                onChange={(e) => {
                  setFormData({ ...formData, salary: e.target.value === '' ? '' : Number(e.target.value) });
                  if (errors.salary) setErrors({ ...errors, salary: undefined });
                }}
                error={Boolean(errors.salary)}
                helperText={errors.salary}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <MoneyIcon sx={{ color: '#94a3b8' }} />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Grid>

            {/* Joining Date */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                required
                fullWidth
                type="date"
                label="Joining Date"
                value={formData.joiningDate}
                onChange={(e) => {
                  setFormData({ ...formData, joiningDate: e.target.value });
                  if (errors.joiningDate) setErrors({ ...errors, joiningDate: undefined });
                }}
                error={Boolean(errors.joiningDate)}
                helperText={errors.joiningDate}
                slotProps={{
                  inputLabel: { shrink: true },
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <CalendarIcon sx={{ color: '#94a3b8' }} />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions sx={{ p: 2.5, gap: 1 }}>
          <Button onClick={onClose} disabled={submitting} variant="outlined" color="inherit">
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={submitting}
            startIcon={submitting ? <CircularProgress size={18} color="inherit" /> : null}
          >
            {submitting ? 'Saving...' : isEdit ? 'Update Employee' : 'Create Employee'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

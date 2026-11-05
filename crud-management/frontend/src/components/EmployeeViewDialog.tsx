import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Avatar,
  Chip,
  Grid,
} from '@mui/material';
import {
  Email as EmailIcon,
  Phone as PhoneIcon,
  Work as WorkIcon,
  AttachMoney as MoneyIcon,
  CalendarMonth as CalendarIcon,
  AccessTime as AccessTimeIcon,
  Edit as EditIcon,
} from '@mui/icons-material';
import type { Employee } from '../types/employee';

interface EmployeeViewDialogProps {
  open: boolean;
  onClose: () => void;
  employee: Employee | null;
  onEdit: (employee: Employee) => void;
}

export const EmployeeViewDialog: React.FC<EmployeeViewDialogProps> = ({
  open,
  onClose,
  employee,
  onEdit,
}) => {
  if (!employee) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      slotProps={{
        paper: {
          sx: { borderRadius: 3, p: 1 },
        },
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar
            sx={{
              width: 56,
              height: 56,
              fontSize: '1.25rem',
              fontWeight: 800,
              backgroundColor: '#3b82f6',
              boxShadow: '0 4px 14px rgba(59, 130, 246, 0.35)',
            }}
          >
            {employee.fullName.slice(0, 2).toUpperCase()}
          </Avatar>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 800, color: '#0f172a' }}>
              {employee.fullName}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
              <Chip
                label={employee.employeeCode}
                size="small"
                sx={{ fontWeight: 700, backgroundColor: '#f1f5f9', color: '#1e293b' }}
              />
              <Chip
                label={employee.department}
                size="small"
                color="primary"
                variant="outlined"
                sx={{ fontWeight: 600 }}
              />
            </Box>
          </Box>
        </Box>
      </DialogTitle>

      <DialogContent dividers sx={{ pt: 2.5, pb: 3 }}>
        <Grid container spacing={2.5}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <WorkIcon sx={{ color: '#64748b' }} />
              <Box>
                <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 600, display: 'block' }}>
                  Designation
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 600, color: '#1e293b' }}>
                  {employee.designation}
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <MoneyIcon sx={{ color: '#10b981' }} />
              <Box>
                <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 600, display: 'block' }}>
                  Annual Salary
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 700, color: '#0f172a' }}>
                  ${Number(employee.salary).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <EmailIcon sx={{ color: '#64748b' }} />
              <Box>
                <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 600, display: 'block' }}>
                  Email Address
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 500, color: '#1e293b' }}>
                  {employee.email}
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <PhoneIcon sx={{ color: '#64748b' }} />
              <Box>
                <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 600, display: 'block' }}>
                  Phone Number
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 500, color: '#1e293b' }}>
                  {employee.phoneNumber}
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <CalendarIcon sx={{ color: '#64748b' }} />
              <Box>
                <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 600, display: 'block' }}>
                  Joining Date
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600, color: '#1e293b' }}>
                  {employee.joiningDate}
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <AccessTimeIcon sx={{ color: '#64748b' }} />
              <Box>
                <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 600, display: 'block' }}>
                  Database Record ID
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 500, color: '#64748b' }}>
                  #{employee.id}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ p: 2, justifyContent: 'space-between' }}>
        <Button onClick={onClose} variant="outlined" color="inherit">
          Close
        </Button>
        <Button
          variant="contained"
          startIcon={<EditIcon />}
          onClick={() => {
            onClose();
            onEdit(employee);
          }}
        >
          Edit Profile
        </Button>
      </DialogActions>
    </Dialog>
  );
};

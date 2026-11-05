import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  CircularProgress,
} from '@mui/material';
import { WarningAmberRounded as WarningIcon } from '@mui/icons-material';
import type { Employee } from '../types/employee';

interface DeleteConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  employee: Employee | null;
}

export const DeleteConfirmDialog: React.FC<DeleteConfirmDialogProps> = ({
  open,
  onClose,
  onConfirm,
  employee,
}) => {
  const [deleting, setDeleting] = useState(false);

  if (!employee) return null;

  const handleConfirm = async () => {
    try {
      setDeleting(true);
      await onConfirm();
      onClose();
    } catch {
      // Handled in parent
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={deleting ? undefined : onClose}
      maxWidth="xs"
      fullWidth
      slotProps={{
        paper: {
          sx: { borderRadius: 3, p: 1 },
        },
      }}
    >
      <DialogTitle sx={{ pb: 1, display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Box
          sx={{
            width: 44,
            height: 44,
            borderRadius: '50%',
            backgroundColor: '#fee2e2',
            color: '#dc2626',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <WarningIcon fontSize="medium" />
        </Box>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 800, color: '#0f172a' }}>
            Delete Employee
          </Typography>
          <Typography variant="caption" sx={{ color: '#64748b' }}>
            Permanent database action
          </Typography>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ py: 2 }}>
        <Typography variant="body2" sx={{ color: '#334155', lineHeight: 1.6 }}>
          Are you sure you want to permanently delete the employee record for{' '}
          <strong>{employee.fullName}</strong> (
          <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: 4 }}>
            {employee.employeeCode}
          </code>
          )?
        </Typography>
        <Typography variant="caption" sx={{ color: '#ef4444', display: 'block', mt: 1.5, fontWeight: 500 }}>
          This operation cannot be undone. All associated records will be removed.
        </Typography>
      </DialogContent>

      <DialogActions sx={{ p: 2, gap: 1 }}>
        <Button onClick={onClose} disabled={deleting} variant="outlined" color="inherit">
          Cancel
        </Button>
        <Button
          onClick={handleConfirm}
          variant="contained"
          color="error"
          disabled={deleting}
          startIcon={deleting ? <CircularProgress size={18} color="inherit" /> : null}
        >
          {deleting ? 'Deleting...' : 'Confirm Delete'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

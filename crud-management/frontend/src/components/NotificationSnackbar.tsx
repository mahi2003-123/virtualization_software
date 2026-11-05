import React from 'react';
import { Snackbar, Alert, AlertTitle } from '@mui/material';

export interface ToastState {
  open: boolean;
  message: string;
  severity: 'success' | 'error' | 'info' | 'warning';
  title?: string;
}

interface NotificationSnackbarProps {
  toast: ToastState;
  onClose: () => void;
}

export const NotificationSnackbar: React.FC<NotificationSnackbarProps> = ({ toast, onClose }) => {
  return (
    <Snackbar
      open={toast.open}
      autoHideDuration={5000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <Alert
        onClose={onClose}
        severity={toast.severity}
        variant="filled"
        sx={{
          width: '100%',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
          borderRadius: 2,
          fontWeight: 500,
        }}
      >
        {toast.title && <AlertTitle sx={{ fontWeight: 700 }}>{toast.title}</AlertTitle>}
        {toast.message}
      </Alert>
    </Snackbar>
  );
};

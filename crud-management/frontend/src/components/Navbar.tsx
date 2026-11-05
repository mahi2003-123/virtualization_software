import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Chip,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Home as HomeIcon,
  CorporateFare as CorporateFareIcon,
  Dns as DnsIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e2e8f0',
        color: '#0f172a',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', minHeight: 64 }}>
        {/* Brand Logo & Title (Clickable) */}
        <Box
          onClick={() => navigate('/')}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            cursor: 'pointer',
            transition: 'transform 0.2s ease',
            '&:hover': {
              transform: 'scale(1.02)',
            },
          }}
        >
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: 2.5,
              background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              boxShadow: '0 4px 12px rgba(37, 99, 235, 0.25)',
            }}
          >
            <CorporateFareIcon fontSize="medium" />
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 800, lineHeight: 1.1, color: '#0f172a' }}>
              Workforce<span style={{ color: '#2563eb' }}>Pro</span>
            </Typography>
            <Typography variant="caption" sx={{ color: '#64748b', fontSize: '0.72rem', display: 'block' }}>
              Enterprise CRUD Platform
            </Typography>
          </Box>
        </Box>

        {/* Center / Navigation Actions */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Chip
            icon={<DnsIcon fontSize="small" sx={{ color: '#10b981 !important' }} />}
            label="Nginx Proxy: Active"
            size="small"
            variant="outlined"
            sx={{
              borderColor: '#bbf7d0',
              backgroundColor: '#f0fdf4',
              color: '#15803d',
              fontWeight: 500,
              display: { xs: 'none', sm: 'flex' },
            }}
          />

          <Button
            startIcon={<HomeIcon />}
            variant={!isDashboard ? 'contained' : 'text'}
            color={!isDashboard ? 'primary' : 'inherit'}
            size="small"
            onClick={() => navigate('/')}
            sx={{ fontWeight: 600 }}
          >
            Home
          </Button>

          <Button
            startIcon={<DashboardIcon />}
            variant={isDashboard ? 'contained' : 'outlined'}
            color="primary"
            size="small"
            onClick={() => navigate('/dashboard')}
            sx={{ fontWeight: 600 }}
          >
            Dashboard
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

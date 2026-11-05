import React from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  Chip,
} from '@mui/material';
import {
  People as PeopleIcon,
  BarChart as BarChartIcon,
  Business as BusinessIcon,
  CloudDone as CloudDoneIcon,
} from '@mui/icons-material';

interface SidebarProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  employeeCount?: number;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentTab, onTabChange, employeeCount }) => {
  const navItems = [
    { id: 'employees', label: 'Employee Directory', icon: <PeopleIcon />, badge: employeeCount },
    { id: 'analytics', label: 'Workforce Analytics', icon: <BarChartIcon /> },
    { id: 'departments', label: 'Department Structure', icon: <BusinessIcon /> },
    { id: 'system', label: 'System & Containers', icon: <CloudDoneIcon /> },
  ];

  return (
    <Box
      sx={{
        width: 260,
        flexShrink: 0,
        backgroundColor: '#ffffff',
        borderRight: '1px solid #e2e8f0',
        minHeight: 'calc(100vh - 64px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        py: 2.5,
      }}
    >
      <Box>
        <Typography
          variant="overline"
          sx={{
            px: 3,
            color: '#94a3b8',
            fontWeight: 700,
            letterSpacing: '0.08em',
          }}
        >
          Management Portal
        </Typography>

        <List sx={{ px: 1.5, mt: 1 }}>
          {navItems.map((item) => {
            const active = currentTab === item.id;
            return (
              <ListItem key={item.id} disablePadding sx={{ mb: 0.8 }}>
                <ListItemButton
                  onClick={() => onTabChange(item.id)}
                  sx={{
                    borderRadius: 2,
                    py: 1.2,
                    px: 2,
                    backgroundColor: active ? 'rgba(37, 99, 235, 0.08)' : 'transparent',
                    color: active ? '#2563eb' : '#475569',
                    '&:hover': {
                      backgroundColor: active ? 'rgba(37, 99, 235, 0.12)' : '#f8fafc',
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 38,
                      color: active ? '#2563eb' : '#64748b',
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    slotProps={{
                      primary: {
                        sx: {
                          fontSize: '0.9rem',
                          fontWeight: active ? 600 : 500,
                        },
                      },
                    }}
                  />
                  {item.badge !== undefined && (
                    <Chip
                      label={item.badge}
                      size="small"
                      color={active ? 'primary' : 'default'}
                      sx={{ height: 20, fontSize: '0.75rem', fontWeight: 600 }}
                    />
                  )}
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>

      {/* Footer Info Box */}
      <Box sx={{ px: 2 }}>
        <Divider sx={{ mb: 2 }} />
        <Box
          sx={{
            p: 1.8,
            borderRadius: 2.5,
            backgroundColor: '#f8fafc',
            border: '1px solid #e2e8f0',
          }}
        >
          <Typography variant="caption" sx={{ fontWeight: 700, color: '#334155', display: 'block' }}>
            Production Stack
          </Typography>
          <Typography variant="caption" sx={{ color: '#64748b', display: 'block', fontSize: '0.72rem', mt: 0.5 }}>
            • React 19 + MUI + Vite<br />
            • Spring Boot 3 + Java 21<br />
            • PostgreSQL 16 Alpine<br />
            • Nginx Gateway Proxy
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

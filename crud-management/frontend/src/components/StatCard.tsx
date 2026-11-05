import React from 'react';
import { Card, CardContent, Typography, Box, Avatar } from '@mui/material';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  iconBgColor?: string;
  trendText?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  iconBgColor = '#2563eb',
  trendText,
}) => {
  return (
    <Card
      sx={{
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        '&:hover': {
          transform: 'translateY(-3px)',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
        },
      }}
    >
      <CardContent sx={{ p: 2.5 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box>
            <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 600, mb: 0.5 }}>
              {title}
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#0f172a', mb: 0.5 }}>
              {value}
            </Typography>
            {subtitle && (
              <Typography variant="caption" sx={{ color: '#94a3b8', display: 'block' }}>
                {subtitle}
              </Typography>
            )}
            {trendText && (
              <Typography
                variant="caption"
                sx={{
                  color: '#10b981',
                  fontWeight: 600,
                  display: 'inline-block',
                  mt: 0.5,
                  backgroundColor: '#ecfdf5',
                  px: 1,
                  py: 0.2,
                  borderRadius: 1,
                }}
              >
                {trendText}
              </Typography>
            )}
          </Box>
          <Avatar
            sx={{
              backgroundColor: iconBgColor,
              color: '#ffffff',
              width: 48,
              height: 48,
              boxShadow: `0 4px 12px ${iconBgColor}40`,
            }}
          >
            {icon}
          </Avatar>
        </Box>
      </CardContent>
    </Card>
  );
};

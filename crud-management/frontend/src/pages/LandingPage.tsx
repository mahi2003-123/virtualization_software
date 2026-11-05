import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Chip,
  Stack,
  Tooltip,
} from '@mui/material';
import {
  RocketLaunch as RocketIcon,
  Dashboard as DashboardIcon,
  Storage as StorageIcon,
  Speed as SpeedIcon,
  Layers as LayersIcon,
  CheckCircle as CheckCircleIcon,
  Dns as DnsIcon,
  Code as CodeIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ minHeight: 'calc(100vh - 64px)', backgroundColor: '#0f172a', color: '#f8fafc', py: { xs: 4, md: 8 } }}>
      <Container maxWidth="lg">
        {/* Top Announcement Pill */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
          <Chip
            icon={<CheckCircleIcon sx={{ color: '#10b981 !important' }} />}
            label="Multi-Container Docker Architecture Active"
            sx={{
              backgroundColor: 'rgba(30, 41, 59, 0.8)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#38bdf8',
              fontWeight: 600,
              fontSize: '0.85rem',
              py: 2,
              px: 1,
            }}
          />
        </Box>

        {/* Hero Section */}
        <Box sx={{ textAlign: 'center', maxWidth: 860, mx: 'auto', mb: 6 }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' },
              fontWeight: 900,
              lineHeight: 1.15,
              mb: 2.5,
              background: 'linear-gradient(135deg, #ffffff 30%, #94a3b8 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Enterprise Workforce CRUD Management System
          </Typography>

          <Typography
            variant="h6"
            sx={{
              color: '#94a3b8',
              fontWeight: 400,
              lineHeight: 1.6,
              mb: 4,
              fontSize: { xs: '1rem', md: '1.2rem' },
            }}
          >
            Fully containerized full-stack architecture powered by <strong>React 19</strong>, <strong>Spring Boot 3 (Java 21)</strong>,
            <strong> PostgreSQL 16</strong>, and an <strong>Nginx Reverse Proxy Gateway</strong>.
          </Typography>

          {/* Launch Buttons */}
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            sx={{ justifyContent: 'center', alignItems: 'center' }}
          >
            <Button
              variant="contained"
              size="large"
              startIcon={<RocketIcon />}
              onClick={() => navigate('/dashboard')}
              sx={{
                background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                fontSize: '1.1rem',
                fontWeight: 700,
                py: 1.6,
                px: 4,
                borderRadius: 2.5,
                boxShadow: '0 8px 30px rgba(37, 99, 235, 0.45)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                  transform: 'translateY(-2px)',
                },
              }}
            >
              Launch Application
            </Button>

            <Button
              variant="outlined"
              size="large"
              startIcon={<DashboardIcon />}
              onClick={() => navigate('/dashboard')}
              sx={{
                borderColor: 'rgba(255, 255, 255, 0.2)',
                color: '#f8fafc',
                fontSize: '1.05rem',
                fontWeight: 600,
                py: 1.6,
                px: 3.5,
                borderRadius: 2.5,
                '&:hover': {
                  borderColor: '#38bdf8',
                  backgroundColor: 'rgba(56, 189, 248, 0.08)',
                },
              }}
            >
              Go to Dashboard
            </Button>
          </Stack>
        </Box>

        {/* CLICKABLE APPLICATION LOGO / MAIN HERO IMAGE BANNER */}
        {/* Requirement: When clicked, navigates directly to CRUD Management Dashboard */}
        <Tooltip title="Click to launch the CRUD Management Dashboard" arrow>
          <Box
            onClick={() => navigate('/dashboard')}
            sx={{
              maxWidth: 960,
              mx: 'auto',
              cursor: 'pointer',
              position: 'relative',
              borderRadius: 4,
              p: { xs: 2.5, sm: 4 },
              background: 'linear-gradient(145deg, #1e293b 0%, #0f172a 100%)',
              border: '2px solid rgba(59, 130, 246, 0.35)',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6), 0 0 40px rgba(37, 99, 235, 0.2)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              overflow: 'hidden',
              '&:hover': {
                transform: 'scale(1.015) translateY(-4px)',
                borderColor: '#38bdf8',
                boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8), 0 0 50px rgba(56, 189, 248, 0.35)',
              },
            }}
          >
            {/* Pulsing Launch Indicator Pill */}
            <Box
              sx={{
                position: 'absolute',
                top: 16,
                right: 16,
                backgroundColor: 'rgba(37, 99, 235, 0.9)',
                color: '#ffffff',
                px: 2,
                py: 0.6,
                borderRadius: 20,
                fontSize: '0.8rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
              }}
            >
              <RocketIcon sx={{ fontSize: 16 }} /> Click Image to Open Dashboard
            </Box>

            {/* Interactive Mock Dashboard Preview Graphic */}
            <Box sx={{ mt: { xs: 3, sm: 1 } }}>
              {/* Window Controls Mock */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <Box sx={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#ef4444' }} />
                <Box sx={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#f59e0b' }} />
                <Box sx={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#10b981' }} />
                <Typography variant="caption" sx={{ color: '#64748b', ml: 1.5, fontFamily: 'monospace' }}>
                  http://localhost/dashboard — Served via Nginx Reverse Proxy
                </Typography>
              </Box>

              {/* Graphic Body */}
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 4 }}>
                  <Box
                    sx={{
                      p: 2.5,
                      borderRadius: 2.5,
                      backgroundColor: 'rgba(30, 41, 59, 0.7)',
                      border: '1px solid rgba(255, 255, 255, 0.05)',
                    }}
                  >
                    <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 600 }}>
                      SYSTEM CAPACITY
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 800, color: '#38bdf8', mt: 0.5 }}>
                      100% Online
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#cbd5e1', mt: 1, fontSize: '0.85rem' }}>
                      Spring Boot REST API connected to PostgreSQL 16 container.
                    </Typography>
                  </Box>
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                  <Box
                    sx={{
                      p: 2.5,
                      borderRadius: 2.5,
                      backgroundColor: 'rgba(30, 41, 59, 0.7)',
                      border: '1px solid rgba(255, 255, 255, 0.05)',
                    }}
                  >
                    <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 600 }}>
                      ACTIVE CAPABILITIES
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 800, color: '#a78bfa', mt: 0.5 }}>
                      CRUD + Search
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#cbd5e1', mt: 1, fontSize: '0.85rem' }}>
                      Pagination, live filter, sorting, and modal validations.
                    </Typography>
                  </Box>
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                  <Box
                    sx={{
                      p: 2.5,
                      borderRadius: 2.5,
                      backgroundColor: 'rgba(30, 41, 59, 0.7)',
                      border: '1px solid rgba(255, 255, 255, 0.05)',
                    }}
                  >
                    <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 600 }}>
                      SECURITY & ROUTING
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 800, color: '#34d399', mt: 0.5 }}>
                      Port 80 Gate
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#cbd5e1', mt: 1, fontSize: '0.85rem' }}>
                      Single entry point via Nginx reverse proxy gateway.
                    </Typography>
                  </Box>
                </Grid>
              </Grid>

              {/* Click Banner Footer */}
              <Box
                sx={{
                  mt: 3,
                  pt: 2,
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: 1,
                }}
              >
                <Typography variant="body2" sx={{ color: '#94a3b8', display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CodeIcon fontSize="small" sx={{ color: '#38bdf8' }} /> Docker Compose Architecture: 4 Linked Containers
                </Typography>
                <Typography variant="body2" sx={{ color: '#38bdf8', fontWeight: 700 }}>
                  Click anywhere on this preview to open the dashboard →
                </Typography>
              </Box>
            </Box>
          </Box>
        </Tooltip>

        {/* Technical Architecture Cards */}
        <Box sx={{ mt: 8 }}>
          <Typography variant="h5" sx={{ textAlign: 'center', fontWeight: 800, mb: 4, color: '#f8fafc' }}>
            Production Multi-Tier Docker Architecture
          </Typography>

          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Card sx={{ backgroundColor: '#1e293b', border: '1px solid rgba(255, 255, 255, 0.08)', height: '100%' }}>
                <CardContent sx={{ p: 3 }}>
                  <DnsIcon sx={{ fontSize: 36, color: '#38bdf8', mb: 1.5 }} />
                  <Typography variant="h6" sx={{ color: '#ffffff', fontWeight: 700 }}>
                    Nginx Gateway
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#94a3b8', mt: 1, fontSize: '0.85rem' }}>
                    Single public entry point on Port 80. Routes / to React SPA and /api to Spring Boot backend.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Card sx={{ backgroundColor: '#1e293b', border: '1px solid rgba(255, 255, 255, 0.08)', height: '100%' }}>
                <CardContent sx={{ p: 3 }}>
                  <LayersIcon sx={{ fontSize: 36, color: '#818cf8', mb: 1.5 }} />
                  <Typography variant="h6" sx={{ color: '#ffffff', fontWeight: 700 }}>
                    React 19 Frontend
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#94a3b8', mt: 1, fontSize: '0.85rem' }}>
                    Modern Material UI dashboard built with Vite and TypeScript, served inside lightweight alpine container.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Card sx={{ backgroundColor: '#1e293b', border: '1px solid rgba(255, 255, 255, 0.08)', height: '100%' }}>
                <CardContent sx={{ p: 3 }}>
                  <SpeedIcon sx={{ fontSize: 36, color: '#34d399', mb: 1.5 }} />
                  <Typography variant="h6" sx={{ color: '#ffffff', fontWeight: 700 }}>
                    Spring Boot 3
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#94a3b8', mt: 1, fontSize: '0.85rem' }}>
                    Java 21 runtime providing RESTful CRUD APIs, Hibernate ORM, Bean Validation, and actuator health checks.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Card sx={{ backgroundColor: '#1e293b', border: '1px solid rgba(255, 255, 255, 0.08)', height: '100%' }}>
                <CardContent sx={{ p: 3 }}>
                  <StorageIcon sx={{ fontSize: 36, color: '#f59e0b', mb: 1.5 }} />
                  <Typography variant="h6" sx={{ color: '#ffffff', fontWeight: 700 }}>
                    PostgreSQL 16
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#94a3b8', mt: 1, fontSize: '0.85rem' }}>
                    ACID-compliant relational database with dedicated persistent Docker named volume for enterprise storage.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

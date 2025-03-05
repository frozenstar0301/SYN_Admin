import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '../contexts/AuthContext';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Container,
  FormControlLabel,
  Link,
  Stack,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  Alert,
  CircularProgress
} from '@mui/material';
import { Visibility, VisibilityOff, Mail, Lock } from '@mui/icons-material';
import { loginSchema } from '../lib/validations';

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data: any) => {
    try {
      await login(data);
      navigate('/signincustomize');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box
      component="main"
      sx={{
        backgroundColor: 'background.default',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh'
      }}
    >
      <Container 
        maxWidth="sm"
        sx={{
          py: {
            xs: '60px',
            md: '120px'
          }
        }}
      >
        <Card elevation={16} sx={{ p: 4 }}>
          <CardContent>
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
                mb: 3
              }}
            >
              <Typography
                color="textPrimary"
                variant="h1"
                sx={{ mb: 1 }}
              >
                Welcome SYN
              </Typography>
              <Typography
                color="textSecondary"
                variant="body1"
              >
                Sign in to your account
              </Typography>
            </Box>

            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={3}>
                <TextField
                  {...register('email')}
                  error={Boolean(errors.email)}
                  fullWidth
                  helperText={errors.email?.message as string}
                  label="Email Address"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Mail color="action" />
                      </InputAdornment>
                    )
                  }}
                />
                <TextField
                  {...register('password')}
                  error={Boolean(errors.password)}
                  fullWidth
                  helperText={errors.password?.message as string}
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock color="action" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              </Stack>

              <Box sx={{ mt: 2 }}>
                <FormControlLabel
                  control={<Checkbox color="primary" />}
                  label="Remember me"
                />
              </Box>

              <Button
                disabled={isSubmitting}
                fullWidth
                size="large"
                sx={{ mt: 3 }}
                type="submit"
                variant="contained"
              >
                {isSubmitting ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  'Sign In'
                )}
              </Button>

              <Box sx={{ mt: 3 }}>
                <Link
                  component={RouterLink}
                  to="/forgot-password"
                  variant="body1"
                  sx={{ display: 'inline-block', mb: 2 }}
                >
                  Forgot password?
                </Link>
                <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  Don&apos;t have an account?{' '}
                  <Link
                    component={RouterLink}
                    to="/register"
                    variant="body1"
                  >
                    Sign up
                  </Link>
                </Typography>
              </Box>
            </form>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};
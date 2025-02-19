import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

interface Props {
  message?: string;
}

export const LoadingOverlay: React.FC<Props> = ({ message = 'Loading...' }) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        zIndex: 1000,
      }}
    >
      <CircularProgress size={40} />
      <Typography variant="body2" sx={{ mt: 2 }} color="text.secondary">
        {message}
      </Typography>
    </Box>
  );
};
import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

interface ColorPickerProps {
  title: string;
  currentColor: string;
  onColorChange: (color: string) => void;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({ 
  title, 
  currentColor, 
  onColorChange 
}) => {
  // Predefined color palette
  const colorPalette = [
    '#8BC34A', '#4CAF50', '#009688', '#00BCD4', '#03A9F4', 
    '#2196F3', '#3F51B5', '#673AB7', '#9C27B0', '#E91E63',
    '#F44336', '#FF5722', '#FF9800', '#FFC107', '#FFEB3B',
    '#CDDC39', '#4CAF50', '#388E3C', '#2E7D32', '#1B5E20',
    '#212121', '#424242', '#616161', '#757575', '#9E9E9E',
    '#BDBDBD', '#E0E0E0', '#EEEEEE', '#F5F5F5', '#FFFFFF'
  ];

  return (
    <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      
      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle1" gutterBottom>
          Current Color
        </Typography>
        <Box 
          sx={{ 
            width: '100%', 
            height: '50px', 
            backgroundColor: currentColor,
            borderRadius: '4px',
            border: '1px solid #e0e0e0',
            mb: 2
          }} 
        />
        
        <Typography variant="subtitle1" gutterBottom>
          Color Value: {currentColor}
        </Typography>
      </Box>

      <Typography variant="subtitle1" gutterBottom>
        Select Color
      </Typography>
      
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {colorPalette.map((color) => (
          <Box
            key={color}
            onClick={() => onColorChange(color)}
            sx={{
              width: '40px',
              height: '40px',
              backgroundColor: color,
              borderRadius: '4px',
              cursor: 'pointer',
              border: currentColor === color ? '2px solid black' : '1px solid #e0e0e0',
              '&:hover': {
                transform: 'scale(1.1)',
                transition: 'transform 0.2s'
              }
            }}
          />
        ))}
      </Box>
      
      <Box sx={{ mt: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          Custom Color
        </Typography>
        <input
          type="color"
          value={currentColor}
          onChange={(e) => onColorChange(e.target.value)}
          style={{ width: '100%', height: '40px' }}
        />
      </Box>
    </Paper>
  );
};

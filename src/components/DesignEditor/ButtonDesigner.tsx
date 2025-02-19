import React from 'react';
import { Box, Typography } from '@mui/material';
import { FontGrid } from '../FontSection/FontGrid';
import { FontItem } from '../../types/index';

interface Props {
  fonts: FontItem[];
  selectedFontId?: string;
  onFontSelect: (font: FontItem) => void;
  onFontUpload: (file: File) => void;
  isUploading: boolean;
}

export const ButtonDesigner: React.FC<Props> = ({
  fonts,
  selectedFontId,
  onFontSelect,
  onFontUpload,
  isUploading,
}) => {
  return (
    <Box>     
      <Typography variant="subtitle1" gutterBottom>
        Font Styles
      </Typography>
      
      <FontGrid
        fonts={fonts}
        selectedFontId={selectedFontId}
        onSelect={onFontSelect}
        onUpload={onFontUpload}
        isUploading={isUploading}
      />
    </Box>
  );
};
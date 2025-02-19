import React from 'react';
import { Paper, Typography } from '@mui/material';

interface Props {
  imageUrl: string | null;
}

export const ImagePreview: React.FC<Props> = ({ imageUrl }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        height: 300,
        border: '1px solid',
        borderColor: 'grey.300',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt=""
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
          }}
        />
      ) : (
        <Typography color="text.secondary">
          Select an image to preview
        </Typography>
      )}
    </Paper>
  );
};
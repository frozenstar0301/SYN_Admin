import React from 'react';
import { Paper, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { LoadingOverlay } from './LoadingOverlay';

interface UploadButtonProps {
  onUpload: (file: File) => void;
  accept: string;
  isLoading?: boolean;
  loadingMessage?: string;
}

export const UploadButton: React.FC<UploadButtonProps> = ({
  onUpload,
  accept,
  isLoading = false,
  loadingMessage,
}) => {
  return (
    <Paper
      elevation={0}
      sx={{
        position: 'relative',
        aspectRatio: '1/1',
        border: '2px dashed #ccc',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: isLoading ? 'default' : 'pointer',
        '&:hover': {
          borderColor: isLoading ? '#ccc' : 'primary.main',
        },
      }}
    >
      {isLoading && <LoadingOverlay message={loadingMessage} />}
      <label style={{ 
        width: '100%', 
        height: '100%', 
        cursor: isLoading ? 'default' : 'pointer' 
      }}>
        <input
          type="file"
          hidden
          accept={accept}
          disabled={isLoading}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) onUpload(file);
            e.target.value = '';
          }}
        />
        <IconButton
          component="span"
          disabled={isLoading}
          sx={{
            width: '100%',
            height: '100%',
          }}
        >
          <AddIcon fontSize="large" />
        </IconButton>
      </label>
    </Paper>
  );
};
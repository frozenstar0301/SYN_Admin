import React from 'react';
import { 
  Grid, 
  Paper, 
  Typography, 
  IconButton,
  CircularProgress,
  Box
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { FontItem } from '../../types/index';

interface Props {
  fonts: FontItem[];
  onSelect: (font: FontItem) => void;
  onUpload: (file: File) => void;
  selectedFontId?: string;
  isUploading: boolean;
}

export const FontGrid: React.FC<Props> = ({
  fonts,
  onSelect,
  onUpload,
  selectedFontId,
  isUploading,
}) => {
  return (
    <Grid container spacing={2}>
      {fonts.map((font) => (
        <Grid item xs={4} sm={3} key={font.id}>
          <Paper
            elevation={0}
            sx={{
              aspectRatio: '1/1',
              border: '2px solid',
              borderColor: selectedFontId === font.id ? 'primary.main' : 'grey.300',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              p: 1,
              transition: 'all 0.2s',
              '&:hover': {
                borderColor: 'primary.main',
                transform: 'scale(1.02)',
              },
            }}
            onClick={() => onSelect(font)}
          >
            <Typography
              style={{ fontFamily: font.name }}
              variant="h6"
              align="center"
            >
              Aa
            </Typography>
            <Typography
              variant="caption"
              align="center"
              sx={{
                mt: 1,
                maxWidth: '100%',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {font.name}
            </Typography>
          </Paper>
        </Grid>
      ))}
      <Grid item xs={4} sm={3}>
        <Paper
          elevation={0}
          sx={{
            position: 'relative',
            aspectRatio: '1/1',
            border: '2px dashed',
            borderColor: 'grey.300',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: isUploading ? 'default' : 'pointer',
            '&:hover': {
              borderColor: isUploading ? 'grey.300' : 'primary.main',
            },
          }}
        >
          <input
            type="file"
            hidden
            accept=".ttf,.otf,.woff,.woff2"
            disabled={isUploading}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) onUpload(file);
              e.target.value = '';
            }}
            id="font-upload"
          />
          <label htmlFor="font-upload" style={{ width: '100%', height: '100%' }}>
            {isUploading ? (
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                <CircularProgress size={24} />
                <Typography variant="caption" color="text.secondary">
                  Uploading...
                </Typography>
              </Box>
            ) : (
              <IconButton
                component="span"
                sx={{
                  width: '100%',
                  height: '100%',
                }}
              >
                <AddIcon />
              </IconButton>
            )}
          </label>
        </Paper>
      </Grid>
    </Grid>
  );
}
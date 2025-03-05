import { 
  Grid, 
  Paper, 
  IconButton, 
  CircularProgress,
  Box,
  Typography 
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { ImageItem } from '../../types/index';

interface Props {
  images: ImageItem[];
  onSelect: (image: ImageItem | null) => void;  // Modified to accept null
  onUpload: (file: File) => void;
  selectedImageId?: string;
  isUploading: boolean;
}

export const ImageGrid: React.FC<Props> = ({
  images,
  onSelect,
  onUpload,
  selectedImageId,
  isUploading,
}) => {
  return (
    <Grid container spacing={2}>
      {/* Default Card */}
      <Grid item xs={3} sm={2}>
        <Paper
          elevation={0}
          sx={{
            aspectRatio: '1/1',
            border: '2px solid',
            borderColor: !selectedImageId ? 'primary.main' : 'grey.300',
            cursor: 'pointer',
            overflow: 'hidden',
            transition: 'all 0.2s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'grey.100',
            '&:hover': {
              borderColor: 'primary.main',
              transform: 'scale(1.02)',
            },
          }}
          onClick={() => onSelect(null)}
        >
          <Box sx={{ textAlign: 'center' }}>
            <CloseIcon sx={{ color: 'text.secondary', mb: 1 }} />
            <Typography variant="caption" color="text.secondary" display="block">
              Default
            </Typography>
          </Box>
        </Paper>
      </Grid>

      {/* Existing Image Cards */}
      {images.map((image) => (
        <Grid item xs={3} sm={2} key={image.id}>
          <Paper
            elevation={0}
            sx={{
              aspectRatio: '1/1',
              border: '2px solid',
              borderColor: selectedImageId === image.id ? 'primary.main' : 'grey.300',
              cursor: 'pointer',
              overflow: 'hidden',
              transition: 'all 0.2s',
              '&:hover': {
                borderColor: 'primary.main',
                transform: 'scale(1.02)',
              },
            }}
            onClick={() => onSelect(image)}
          >
            <Box
              component="img"
              src={image.url}
              alt=""
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </Paper>
        </Grid>
      ))}

      {/* Upload Card */}
      <Grid item xs={3} sm={2}>
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
            accept="image/*"
            disabled={isUploading}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) onUpload(file);
              e.target.value = '';
            }}
            id="image-upload"
          />
          <label htmlFor="image-upload" style={{ width: '100%', height: '100%' }}>
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
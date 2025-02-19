import { Box, Typography } from '@mui/material';
import { ImageGrid } from '../ImageSection/ImageGrid';
import { ImageItem } from '../../types';

interface Props {
  title: string;
  images: ImageItem[];
  selectedImageId?: string;
  onSelect: (image: ImageItem | null) => void;  // Modified to accept null
  onUpload: (file: File) => void;
  isUploading: boolean;
}

export const BackgroundSelector: React.FC<Props> = ({
  title,
  images,
  selectedImageId,
  onSelect,
  onUpload,
  isUploading,
}) => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <ImageGrid
        images={images}
        selectedImageId={selectedImageId}
        onSelect={onSelect}
        onUpload={onUpload}
        isUploading={isUploading}
      />
    </Box>
  );
};
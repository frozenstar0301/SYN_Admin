import { useEffect, useState } from 'react';
import {
  AppBar,
  Box,
  Container,
  Grid,
  Paper,
  ThemeProvider,
  CssBaseline,
  Button,
  Toolbar,
  Typography,
  Tabs,
  Tab,
  CircularProgress,
  Backdrop,
  Alert,
  Snackbar,
} from '@mui/material';
import {
  Save as SaveIcon,
  Image as ImageIcon,
  TextFields as TextFieldsIcon,
} from '@mui/icons-material';
import { theme } from './theme';
import { BackgroundSelector } from './components/DesignEditor/BackgroundSelector';
import { ButtonDesigner } from './components/DesignEditor/ButtonDesigner';
import { ScreenPreview } from './components/DesignEditor/ScreenPreview';
import { useImages } from './hooks/useImages';
import { useFonts } from './hooks/useFonts';
import { Screen, FontItem, ImageItem } from './types/index';
import { useScreens } from './hooks/useScreens';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface AlertState {
  open: boolean;
  message: string;
  severity: 'success' | 'error';
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      style={{ 
        height: '100%',
        display: value === index ? 'block' : 'none',
        overflow: 'auto'
      }}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

export default function App() {
  const { images, uploadImage, isUploading: isUploadingImage } = useImages();
  const { fonts, uploadFont, isUploading: isUploadingFont } = useFonts();
  const { saveScreen, loadScreen } = useScreens();
  
  const [screen, setScreen] = useState<Partial<Screen>>({});

  const [tabValue, setTabValue] = useState(0);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [alert, setAlert] = useState<AlertState>({
    open: false,
    message: '',
    severity: 'success'
  });

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleBackgroundSelect = (image: ImageItem | null) => {
    setScreen((prev: any) => ({
      ...prev,
      background_image_id: image?.id || null,
    }));
  };
  
  const handleButtonSelect = (image: ImageItem | null) => {
    setScreen((prev: any) => ({
      ...prev,
      button_image_id: image?.id || null,
    }));
  };

  const handleSigninFontSelect = (font: FontItem) => {
    setScreen((prev: any) => ({
      ...prev,
      font_id: font.id,
    }));
  };

  // const handleSignupFontSelect = (font: FontItem) => {
  //   setScreen((prev: any) => ({
  //     ...prev,
  //     signup_button_font_id: font.id,
  //   }));
  // };

  const handleCloseAlert = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlert((prev) => ({ ...prev, open: false }));
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await saveScreen(screen);
      setAlert({
        open: true,
        message: 'Screen saved successfully!',
        severity: 'success'
      });
    } catch (error) {
      console.error('Error saving screen:', error);
      setAlert({
        open: true,
        message: 'Failed to save screen. Please try again.',
        severity: 'error'
      });
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    const initializeScreen = async () => {
      try {
        setIsInitialLoading(true);
        const loadedScreen = await loadScreen();
        if (loadedScreen) {
          setScreen(loadedScreen);
        }
      } catch (error) {
        console.error('Error loading screen:', error);
        setAlert({
          open: true,
          message: 'Failed to load screen. Please refresh the page.',
          severity: 'error'
        });
      } finally {
        setIsInitialLoading(false);
      }
    };

    initializeScreen();
  }, []);

  if (isInitialLoading) {
    return (
      <Backdrop
        open={true}
        sx={{
          color: '#fff',
          zIndex: (theme) => theme.zIndex.drawer + 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 2
        }}
      >
        <CircularProgress color="inherit" />
        <Typography>Loading Screen Designer...</Typography>
      </Backdrop>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* Sticky Header */}
        <AppBar 
          position="fixed" 
          color="default" 
          elevation={1}
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              SYN Admin
            </Typography>
            <Button
              variant="contained"
              startIcon={isSaving ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
              onClick={handleSave}
              disabled={isSaving}
            >
              {isSaving ? 'Saving...' : 'Save'}
            </Button>
          </Toolbar>
        </AppBar>

        {/* Toolbar spacing to prevent content from going under AppBar */}
        <Toolbar />

        <Container maxWidth="xl" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
          <Grid container spacing={3}>
            {/* Preview section */}
            <Grid item xs={12} md={7}>
              <Paper sx={{ height: '700px', p: 2, position: 'sticky', top: 88 }}>
                <Typography variant="h6" gutterBottom>
                  Preview
                </Typography>
                <Box sx={{ height: 'calc(100% - 40px)' }}>
                  <ScreenPreview
                    screen={screen}
                    fonts={fonts}
                    images={images}
                  />
                </Box>
              </Paper>
            </Grid>

            {/* Editor section */}
            <Grid item xs={12} md={5}>
              <Paper sx={{ height: '700px', display: 'flex', flexDirection: 'column' }}>
                <Tabs
                  value={tabValue}
                  onChange={handleTabChange}
                  aria-label="editor tabs"
                  sx={{ borderBottom: 1, borderColor: 'divider' }}
                >
                  <Tab 
                    icon={<ImageIcon />} 
                    iconPosition="start" 
                    label="Background & Button Images" 
                  />
                  <Tab 
                    icon={<TextFieldsIcon />} 
                    iconPosition="start" 
                    label="Fonts" 
                  />
                </Tabs>

                <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
                  <TabPanel value={tabValue} index={0}>
                    <BackgroundSelector
                      title="Background Image"
                      images={images}
                      selectedImageId={screen.background_image_id || ""}
                      onSelect={handleBackgroundSelect}
                      onUpload={uploadImage}
                      isUploading={isUploadingImage}
                    />
                    <br />
                    <BackgroundSelector
                      title="Button Image"
                      images={images}
                      selectedImageId={screen.button_image_id || ""}
                      onSelect={handleButtonSelect}
                      onUpload={uploadImage}
                      isUploading={isUploadingImage}
                    />
                  </TabPanel>

                  <TabPanel value={tabValue} index={1}>
                    <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
                      <ButtonDesigner
                        fonts={fonts}
                        selectedFontId={screen.font_id || ""}
                        onFontSelect={handleSigninFontSelect}
                        onFontUpload={uploadFont}
                        isUploading={isUploadingFont}
                      />
                    </Paper>
                  </TabPanel>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>

        {/* Alert Snackbar */}
        <Snackbar
          open={alert.open}
          autoHideDuration={6000}
          onClose={handleCloseAlert}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={handleCloseAlert}
            severity={alert.severity}
            sx={{ width: '100%' }}
            elevation={6}
            variant="filled"
          >
            {alert.message}
          </Alert>
        </Snackbar>

        {/* Saving Backdrop */}
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isSaving}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Box>
    </ThemeProvider>
  );
}
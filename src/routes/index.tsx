// src/routes/index.tsx
import { createBrowserRouter } from 'react-router-dom';
import { SignInCustomize } from '../pages/SignInCustomize';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <SignInCustomize />,
  }
]);

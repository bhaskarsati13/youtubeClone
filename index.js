import { createRoot } from 'react-dom/client';
import Home from './src/pages/home/Home';
import Error from './src/pages/error/Error';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Video from './src/pages/video/Video';

const root = createRoot(document.getElementById("root"));

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <Error />,
  },
  {
    path: '/videoPlayer/:category/:videoId',
    element: <Video />,
  },
]);

root.render(<RouterProvider router={router} />);

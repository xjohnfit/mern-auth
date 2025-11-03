import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import store from './store.ts';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import App from './App.tsx'
import HomeScreen from './screens/HomeScreen.tsx';
import LoginScreen from './screens/LoginScreen.tsx';
import RegisterScreen from './screens/RegisterScreen.tsx';
import ProfileScreen from './screens/ProfileScreen.tsx';
import PrivateRoute from './components/PrivateRoute.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, Component: HomeScreen },
      { path: "/login", Component: LoginScreen },
      { path: "/register", Component: RegisterScreen },
      {
        element: <PrivateRoute />,
        children: [
          { path: "/profile", Component: ProfileScreen },
        ],
      },
    ],
  }
]);

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  </Provider>
)

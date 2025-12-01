import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../views/Home';
import Orders from '../views/Orders';
import OrderSummary from '../views/OrderSummary';
import ProtectedRoute from '../components/ProtectedRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/home',
        element: <Home />,
      },
      {
        path: '/orders',
        element: (
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        ),
      },
      {
        path: '/order-summary',
        element: (
          <ProtectedRoute>
            <OrderSummary />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

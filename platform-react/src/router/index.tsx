import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../views/Home';
import Orders from '../views/Orders';
import OrderSummary from '../views/OrderSummary';

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
        element: <Orders />,
      },
      {
        path: '/order-summary',
        element: <OrderSummary />,
      },
    ],
  },
]);

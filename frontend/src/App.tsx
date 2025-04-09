import { Provider } from 'react-redux';
import { store } from './store';
import AppRoutes from './routes';
import { Toaster } from 'react-hot-toast';
import './App.css'

function App() {
  return (
    <Provider store={store}>
      <Toaster position="top-right" toastOptions={{
        duration: 3000,
        style: {
          background: '#363636',
          color: '#fff',
        },
        success: {
          style: {
            background: '#22c55e',
          },
        },
        error: {
          style: {
            background: '#ef4444',
          },
        },
      }} />
      <AppRoutes />
    </Provider>
  )
}

export default App

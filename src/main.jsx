import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import GlobalStyles from './components/GlobalStyles';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <GlobalStyles>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </GlobalStyles>
  </BrowserRouter>
);

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppRoutes } from './app-routes';
import { BrowserRouter } from 'react-router-dom';
import { SessionProvider } from './features/auth/providers/session-provider';

export default function App() {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <SessionProvider>
        <main className='flex-1 flex-col antialiased max-h-full'>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </main>
      </SessionProvider>
    </QueryClientProvider>
  );
}

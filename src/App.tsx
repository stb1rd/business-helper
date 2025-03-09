import './App.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { IndexPage } from './components/IndexPage/IndexPage';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <IndexPage />
    </QueryClientProvider>
  );
}

export default App;

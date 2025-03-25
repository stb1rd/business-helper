import './App.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { MockedPalettes } from '@/components/sections/MockedPalettes';
import { ApiOrder } from '@/components/sections/ApiOrder';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col items-center gap-6 w-full">
        <MockedPalettes />
        <ApiOrder />
      </div>
    </QueryClientProvider>
  );
}

export default App;

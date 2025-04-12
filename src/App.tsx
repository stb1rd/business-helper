import './App.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { MockedPalettes } from '@/components/sections/MockedOrder';
import { FileApiOrder } from '@/components/sections/FileApiOrder';
import { ManageWarehouse } from '@/components/sections/ManageWarehouse';
import { ManageProducts } from '@/components/sections/ManageProducts';
import { PostApiOrder } from '@/components/sections/PostApiOrder';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col items-center gap-6 w-full">
        <MockedPalettes />
        <PostApiOrder />
        <FileApiOrder />
        <ManageWarehouse />
        <ManageProducts />
      </div>
    </QueryClientProvider>
  );
}

export default App;

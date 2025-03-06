// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Hello } from './components/Hello';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <>
        <Hello />
      </>
    </QueryClientProvider>
  );
}

export default App;

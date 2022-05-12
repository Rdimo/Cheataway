import { lazy, StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import '@/styles/index.css';
import '@/components';
const App = lazy(() => import('@/routes/init'));

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <StrictMode>
    <Router>
      <main>
        <App />
      </main>
      <Suspense fallback={null}></Suspense>
    </Router>
  </StrictMode>,
);

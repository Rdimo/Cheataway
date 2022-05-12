import { useRoutes } from 'react-router-dom';
import { routes } from './index';

const App = () => {
  return useRoutes(routes);
};

export default App;

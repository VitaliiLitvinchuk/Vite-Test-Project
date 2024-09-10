import { Navigate } from 'react-router-dom';
import { Routes, Route } from 'react-router';
import './App.css';
import Layout from './components/layout';
import rootPath, { routes } from './routes';

const App = () => {
  return (
    <Routes>
      <Route path={rootPath} element={<Layout />}>
        {
          routes.map(x =>
            x.nested ?
              x.nested.map(x2 => x2.component && (
                <Route
                  key={`${x.path}${x2.path}`}
                  path={`${x.path}${x2.path}`}
                  element={<x2.component />}
                />
              ))
              :
              x.component &&
              <Route
                key={x.path}
                path={x.path}
                element={<x.component />}
              />
          )
        }
      </Route>
      <Route path='*' element={<Navigate to={rootPath} />} />
    </Routes>
  );
}

export default App

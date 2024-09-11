import React, { Suspense } from 'react';
import { Navigate } from 'react-router-dom';
import { Routes, Route } from 'react-router';
import './App.css';
import Layout from './components/layout';
import rootPath, { routes } from './routes';

const LazyPage = React.lazy(() => import('./components/chapters/chapter-4'));

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
        <Route
          key={"chapter-4"}
          path={"test"}
          element={<Suspense><LazyPage /></Suspense>} />
      </Route>
      <Route path='*' element={<Navigate to={rootPath} />} />
    </Routes>
  );
}

export default App

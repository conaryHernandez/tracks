import React from 'react';
import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom';
import { Spinner } from '../../components/UI';

import './App.css';

// Routes
const Home = React.lazy(() => import('../Home/Home'));

const App = () => {
  return (
    <div className="App">
      <React.Suspense fallback={<Spinner />}>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={Home} />
            <Redirect to="/" />
          </Switch>
        </BrowserRouter>
      </React.Suspense>
    </div>
  );
};

export default App;

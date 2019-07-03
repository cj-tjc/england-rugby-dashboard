import React, { Suspense } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Page404 from '../../views/PageNotFoundView';

const AllClubsView = React.lazy(() => import('../../views/AllClubsView'));
const ClubView = React.lazy(() => import('../../views/ClubView'));

const AppRouter = () => (
  <BrowserRouter>
    <Switch>
      <Suspense fallback={<p>Loading...</p>}>
        <Switch>
          <Route path="/clubs" exact component={AllClubsView} />
          <Route path="/clubs/:clubId" exact component={ClubView} />
          <Route component={Page404} />
        </Switch>
      </Suspense>
    </Switch>
  </BrowserRouter>
);

export default AppRouter;

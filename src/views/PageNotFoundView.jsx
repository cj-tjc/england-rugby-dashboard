import React from 'react';
import { withRouter } from 'react-router-dom';
const Page404 = ({ location }) => (
  <div>
    <h2>
      No match found for <code>{location.pathname}</code>
    </h2>
  </div>
);

export default withRouter(Page404);

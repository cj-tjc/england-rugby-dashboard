import React from 'react';
import { withRouter } from 'react-router-dom';
const Page404 = ({ location }) => (
  <div className="rfu-container" style={{ padding: 10 }}>
    <h2 className="rfu-title">
      No match found for <code>{location.pathname}</code>
    </h2>
  </div>
);

export default withRouter(Page404);

import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ cookies, component: Component, path, exact }) => {
      const level = cookies.get("level");
      return (
            <Route path={path} exact={exact} render={props => (
                  ((level === "1") || (level === "2") || (level === "3")) ?
                        <Component cookies={cookies} />
                        : <Redirect to="/" />
            )} />
      );
};

export default PrivateRoute;
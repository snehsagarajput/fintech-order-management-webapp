import React from 'react';
import { Route } from 'react-router-dom';

const CustomRoute = ({ cookies, component: Component, path, exact }) => {
      return (
            <Route path={path} exact={exact} render={() => (
                  <Component cookies={cookies} />
            )} />
      );
};

export default CustomRoute;
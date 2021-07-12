import React from 'react'
import {
  HashRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import routes from './routes'

export default function RouterContainer() {
  //just render one time
  return (
    <Router>
      <Switch>
        {
          routes.map(route => (
            <Route 
              exact={route.exact} 
              key={route.path} 
              path={route.path} 
              name={route.name}
            >
              <route.component title={route.title}/>
            </Route>
          ))
        }
      </Switch>
    </Router>
  );
}
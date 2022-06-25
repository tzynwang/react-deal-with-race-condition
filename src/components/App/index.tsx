import React, { memo } from 'react';
import { HashRouter as Router, Switch, Route, Link } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import ContentPage from '@Components/Common/ContentPage';
import IndexPage from '@Components/Common/IndexPage';

function App(): React.ReactElement {
  /* Main */
  return (
    <React.Fragment>
      <CssBaseline />
      <Router>
        <Stack direction="row" spacing={2}>
          <Link to="/">Index page</Link>
          <Link to="/typeA/7">contentId: 7</Link>
          <Link to="/typeB/3">contentId: 3</Link>
        </Stack>
        <Switch>
          <Route path="/typeA/:contentId">
            <ContentPage />
          </Route>
          <Route path="/typeB/:contentId">
            <ContentPage />
          </Route>
          <Route path="/">
            <IndexPage />
          </Route>
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default memo(App);

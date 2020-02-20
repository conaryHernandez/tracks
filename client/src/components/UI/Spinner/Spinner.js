import React from 'react';

import classes from './Spinner.module.scss';

const Spinner = () => (
  <div data-testid="loader" className={classes.Loader}>
    Loading...
  </div>
);

export default Spinner;

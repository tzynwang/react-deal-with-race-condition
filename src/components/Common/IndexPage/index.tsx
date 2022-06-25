import React, { memo } from 'react';
import Typography from '@mui/material/Typography';

function IndexPage(): React.ReactElement {
  /* Main */
  return (
    <Typography variant="h4" component="div">
      Nothing special, just the index page.
    </Typography>
  );
}

export default memo(IndexPage);

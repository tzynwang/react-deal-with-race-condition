import React, { memo, useState, useMemo, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import type { Post, PostResponse, CancelError } from './types';

const SLEEP = (ms = 2000): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

function ContentPage(): React.ReactElement {
  /* States */
  const { contentId } = useParams<{ contentId: string }>();
  const { pathname } = useLocation();
  const [res, setRes] = useState<PostResponse>({ data: [] });
  const [dynamicContent, setDynamicContent] = useState<Post[]>([]);
  const [abortController, setAbortController] =
    useState<null | AbortController>(null);
  const pageCategory = useMemo(() => pathname.split('/')[1], [pathname]);

  /* Functions */
  const fetchContent = async (contentId: string): Promise<void> => {
    const controller = new AbortController();
    setAbortController(controller);
    try {
      const res = await axios.get<any, PostResponse>(
        `https://jsonplaceholder.typicode.com/posts?id=${contentId}`,
        {
          signal: controller.signal,
        }
      );
      if (contentId === '7') {
        // INFO: mock long response manually
        await SLEEP();
      }
      setRes({ data: res.data });
    } catch (err) {
      const error = err as CancelError;
      setRes({ error } as PostResponse);
    }
  };
  const unmountedAbortRequest = (): void => {
    abortController?.abort();
  };
  const unmountedClearUp = (): void => {
    // INFO: reset states back to default when leaving the current url
    setDynamicContent([]);
    setRes({ data: [] });
  };

  /* Hooks */
  useEffect(() => {
    fetchContent(contentId);
  }, [pageCategory, contentId]);
  useEffect(() => {
    if (res.data && res.data.length && res.data[0].id === Number(contentId)) {
      // INFO: only update data when 'contentId in url' === 'response data contentId'
      setDynamicContent(res.data);
    }
    if (res.error) {
      console.info(res.error);
    }
  }, [res.data, res.error]);
  useEffect(() => () => unmountedAbortRequest(), [abortController]);
  useEffect(() => () => unmountedClearUp(), [contentId, pageCategory]);

  /* Main */
  return (
    <React.Fragment>
      <Typography variant="h4" component="div">
        In {pageCategory} page, with contentId: {contentId}
      </Typography>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          {dynamicContent.map((content) => (
            <Grid item xs={12} sm={6} lg={3} key={content.id}>
              <Paper sx={{ height: '100%', padding: '1rem' }} elevation={4}>
                <Typography variant="h5" component="div">
                  {content.title}
                </Typography>
                <Typography variant="body1">{content.body}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default memo(ContentPage);

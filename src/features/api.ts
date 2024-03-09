import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';

const MAX_RETRIES = 3;

const baseQuery = fetchBaseQuery({});

const baseQueryWithRetry = retry(baseQuery, { maxRetries: MAX_RETRIES });

export const api = createApi({
  baseQuery: baseQueryWithRetry,
  tagTypes: [],
  endpoints: () => ({}),
});

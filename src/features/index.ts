import { api } from '@/features/api.ts';
import contact from '@/features/contact/slice';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    contact,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

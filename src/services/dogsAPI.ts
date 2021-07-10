import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

interface Dog {
  message: string;
  status: string;
}

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://dog.ceo/api',
  }),
  endpoints(builder) {
    return {
      fetchDogs: builder.query<Dog, void>({
        query() {
          return '/breeds/image/random';
        },
      }),
    };
  },
});

export const {useFetchDogsQuery} = apiSlice;

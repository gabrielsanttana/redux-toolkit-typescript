import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

interface Dog {
  message: string;
  status: string;
}

export const dogsSlice = createApi({
  reducerPath: 'dogs',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://dog.ceo/api',
  }),
  endpoints(builder) {
    return {
      fetchDogs: builder.query<Dog, void>({
        query() {
          return '/breeds/image/randomn';
        },
      }),

      updateDog: builder.mutation<Dog, {newData: any}>({
        query: ({newData}) => ({
          url: '/breeds/image/random',
          method: 'PATCH',
          body: newData,
        }),
      }),
    };
  },
});

export const {useLazyQuery: useLazyFetchDogsQuery} =
  dogsSlice.endpoints.fetchDogs;

export const {useUpdateDogMutation} = dogsSlice;

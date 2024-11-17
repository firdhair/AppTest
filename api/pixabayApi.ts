import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const pixabayApi = createApi({
  reducerPath: 'pixabayApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pixabay.com/api/' }),
  endpoints: (builder) => ({
    getImages: builder.query({
      query: ({ query, page = 1, perPage = 20 }) => ({
        url: '',
        params: {
          key: '47108952-bc71d47210c5897e4b2251e5a', // Replace with your actual API key
          q: query,
          page,
          per_page: perPage,
          image_type: 'photo',
        },
      }),
    }),
  }),
});

export const { useGetImagesQuery } = pixabayApi;


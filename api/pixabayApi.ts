import { createApi } from '@reduxjs/toolkit/query/react';
import axios from 'axios';

export const pixabayApi = createApi({
  reducerPath: 'pixabayApi',
  baseQuery: async ({ url, params }: { url: string, params: any }) => {
    try {
      const response = await axios.get(url, { params });
      return { data: response.data }; 
    } catch (error) {
      return { error }; 
    }
  },
  endpoints: (builder) => ({
    getImages: builder.query({
      query: ({ query, page = 1, perPage = 20 }) => ({
        url: 'https://pixabay.com/api/', 
        params: {
          key: '47108952-bc71d47210c5897e4b2251e5a', 
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

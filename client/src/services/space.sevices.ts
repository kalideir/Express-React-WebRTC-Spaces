import ApiService from './api.service';

export interface Space {
  id: string;
  name: string;
}

type SpacesResponse = Space[];

const spaceApi = ApiService.injectEndpoints({
  endpoints: build => ({
    getSpaces: build.query<SpacesResponse, void>({
      query: () => 'spaces',
      providesTags: result =>
        result ? [...result.map(({ id }) => ({ type: 'Space' as const, id })), { type: 'Space', id: 'LIST' }] : [{ type: 'Space', id: 'LIST' }],
    }),
    addSpace: build.mutation<Space, Partial<Space>>({
      query: body => ({
        url: `/space/`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Space', id: 'LIST' }],
    }),

    getSpace: build.query<Space, string>({
      query: id => `/space/${id}`,
      providesTags: (result, error, id) => [{ type: 'Space', id }],
    }),
    updateSpace: build.mutation<void, Pick<Space, 'id'> & Partial<Space>>({
      query: ({ id, ...patch }) => ({
        url: `/${id}`,
        method: 'PUT',
        body: patch,
      }),
    }),

    deleteSpace: build.mutation<{ success: boolean; id: number }, number>({
      query(id) {
        return {
          url: `/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: (result, error, id) => [{ type: 'Space', id }],
    }),
  }),
});

export const { useGetSpaceQuery, useGetSpacesQuery, useAddSpaceMutation, useUpdateSpaceMutation, useDeleteSpaceMutation } = spaceApi;

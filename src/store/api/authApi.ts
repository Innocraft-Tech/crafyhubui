import apiSlice from './api';

interface Skill {
  skillName: string;
}

interface TransformedSkill {
  label: string;
  value: string;
  [key: string]: string | boolean | undefined;
}

const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    logIn: builder.mutation<any, any>({
      query: (credentials) => ({
        url: 'autho',
        method: 'POST',
        body: { ...credentials },
      }),
      invalidatesTags: [{ type: 'User', id: 'me' }],
    }),
    logOut: builder.mutation<any, void>({
      query: () => ({
        url: 'auth/logout',
        method: 'POST',
      }),
      invalidatesTags: [{ type: 'User', id: 'me' }],
    }),
    register: builder.mutation<any, any>({
      query: (data) => ({
        url: 'auth',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
    forgotPassword: builder.mutation<any, any>({
      query: (data) => ({
        url: 'auth/forgot',
        method: 'POST',
        body: data,
      }),
    }),
    resetPassword: builder.mutation<any, any>({
      query: ({ resetToken, credentials }) => ({
        url: `auth/reset/${resetToken}`,
        method: 'PUT',
        body: credentials,
      }),
    }),
    updatePassword: builder.mutation<any, any>({
      query: (data) => ({
        url: 'auth/password',
        method: 'PUT',
        body: data,
      }),
    }),
    getSkills: builder.query<TransformedSkill[], void>({
      query: () => 'crafy/skills',

      transformResponse: (response: Skill[]): TransformedSkill[] => {
        return response.map((skill) => ({
          label: skill.skillName,
          value: skill.skillName,
        }));
      },
      providesTags: ['Skills'],
    }),
    addSkill: builder.mutation<any, any>({
      query: (data) => ({
        url: 'crafy/add/skill',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Skills'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useLogInMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useLogOutMutation,
  useRegisterMutation,
  useUpdatePasswordMutation,
  useAddSkillMutation,
  useGetSkillsQuery,
} = authApi;

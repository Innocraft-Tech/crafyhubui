import apiSlice from './api';

const chatApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    chatStart: builder.mutation<ChatResponse, ChatPayload>({
      query: (data) => ({
        url: 'chat',
        method: 'POST',
        body: data,
      }),

      invalidatesTags: () => [{ type: 'Chat' }],
    }),
    getChats: builder.query<MessageResponse, GetChatPayload>({
      query: (id) => `message/${id}`,
      providesTags: (result, error, id) => [{ type: 'Chat', id }],
    }),
    getUserChats: builder.query<UserChatsResponse, GetChatPayload>({
      query: (id) => `chat/${id}`,
      providesTags: (result, error, arg) => [{ type: 'User', id: arg }],
    }),
    sendMessage: builder.mutation<SendMessageResponse, MessagePayload>({
      query: (data) => ({
        url: 'message/add',
        method: 'POST',
        body: data,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useChatStartMutation,
  useGetChatsQuery,
  useSendMessageMutation,
  useGetUserChatsQuery,
} = chatApiSlice;

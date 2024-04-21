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
      providesTags: [{ type: 'Chat' }],
    }),
    getUserChats: builder.query<MessageResponse, GetChatPayload>({
      query: (id) => `chat/${id}`,
      // providesTags: [{ type: 'UserChats' }],
      providesTags: (result, error, arg) => [{ type: 'User', id: arg }],
    }),
    sendMessage: builder.mutation<SendMessageResponse, MessagePayload>({
      query: (data) => ({
        url: 'message/add',
        method: 'POST',
        body: data,
      }),

      // invalidatesTags: () => [{ type: 'Chat' }],
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

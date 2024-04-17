type ChatPayload = {
  senderId: string;
  receiverId: string;
};

type ChatResponse = {
  members: string[];
  _id: string;
  createdAt: string;
  updatedAt: string;
};

type GetChatPayload = string;

type OnlineUsers = {
  userId: string;
  socketId: string;
};

type MessagePayload = {
  chatId: string;
  senderId: string;
  text: string;
};

type Message = {
  _id?: string;
  chatId: string;
  senderId: string;
  text: string;
  createdAt: string;
  updatedAt: string;
};

type SendMessageResponse = {
  message: Message;
};

type MessageResponse = {
  messages: Message[];
};

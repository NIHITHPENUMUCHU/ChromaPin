export interface Pin {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  colors: string[];
  author: {
    id: string;
    name: string;
    avatar: string;
  };
}

export interface Message {
  id: string;
  from: string;
  content: string;
  timestamp: number;
  read: boolean;
}

export interface Notification {
  id: string;
  message: string;
  timestamp: number;
  read: boolean;
}
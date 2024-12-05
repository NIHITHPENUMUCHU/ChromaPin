import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Pin, Message, Notification } from '../types';
import { mockPins } from '../utils/mockData';

interface PinStore {
  pins: Pin[];
  favorites: string[];
  searchTerm: string;
  selectedColor: string | null;
  notifications: Notification[];
  messages: Message[];
  userPins: Pin[];
  setSearchTerm: (term: string) => void;
  setSelectedColor: (color: string | null) => void;
  toggleFavorite: (pinId: string) => void;
  isFavorite: (pinId: string) => boolean;
  downloadPin: (pin: Pin) => void;
  sharePin: (pin: Pin) => void;
  clearNotifications: () => void;
  startChat: (username: string) => void;
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
  uploadPin: (pin: Omit<Pin, 'id'>) => void;
}

export const usePinStore = create<PinStore>()(
  persist(
    (set, get) => ({
      pins: mockPins,
      favorites: [],
      searchTerm: '',
      selectedColor: null,
      notifications: [],
      messages: [],
      userPins: [],
      setSearchTerm: (term) => set({ searchTerm: term }),
      setSelectedColor: (color) => set({ selectedColor: color }),
      toggleFavorite: (pinId) => {
        const favorites = get().favorites;
        const newFavorites = favorites.includes(pinId)
          ? favorites.filter((id) => id !== pinId)
          : [...favorites, pinId];
        set({ favorites: newFavorites });
      },
      isFavorite: (pinId) => get().favorites.includes(pinId),
      downloadPin: (pin) => {
        const link = document.createElement('a');
        link.href = pin.imageUrl;
        link.download = `${pin.title}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      },
      sharePin: (pin) => {
        // Fix sharing functionality to use clipboard instead of navigator.share
        const shareUrl = `${window.location.origin}/pin/${pin.id}`;
        navigator.clipboard.writeText(shareUrl).catch(() => {
          // Fallback if clipboard API fails
          const textarea = document.createElement('textarea');
          textarea.value = shareUrl;
          document.body.appendChild(textarea);
          textarea.select();
          document.execCommand('copy');
          document.body.removeChild(textarea);
        });
      },
      clearNotifications: () => set({ notifications: [] }),
      startChat: (username) => {
        const messages = get().messages;
        const newMessage: Message = {
          id: Date.now().toString(),
          from: username,
          content: `Hi! I'm interested in your pins.`,
          timestamp: Date.now(),
          read: false,
        };
        set({ messages: [...messages, newMessage] });
      },
      addMessage: (message) => {
        const messages = get().messages;
        const newMessage: Message = {
          ...message,
          id: Date.now().toString(),
          timestamp: Date.now(),
        };
        set({ messages: [...messages, newMessage] });
      },
      uploadPin: (pin) => {
        const newPin: Pin = {
          ...pin,
          id: Date.now().toString(),
        };
        set((state) => ({
          pins: [newPin, ...state.pins],
          userPins: [newPin, ...state.userPins],
        }));
      },
    }),
    {
      name: 'pin-storage',
      partialize: (state) => ({
        favorites: state.favorites,
        messages: state.messages,
        notifications: state.notifications,
        userPins: state.userPins,
      }),
    }
  )
);
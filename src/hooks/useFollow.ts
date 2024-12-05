import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FollowState {
  following: string[];
  toggleFollow: (userId: string) => void;
  isFollowing: (userId: string) => boolean;
}

export const useFollow = create<FollowState>()(
  persist(
    (set, get) => ({
      following: [],
      toggleFollow: (userId) => {
        const following = get().following;
        const newFollowing = following.includes(userId)
          ? following.filter((id) => id !== userId)
          : [...following, userId];
        set({ following: newFollowing });
      },
      isFollowing: (userId) => get().following.includes(userId),
    }),
    {
      name: 'follow-storage',
    }
  )
);
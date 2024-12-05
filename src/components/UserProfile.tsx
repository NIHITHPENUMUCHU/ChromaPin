import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus, UserMinus } from 'lucide-react';
import { motion } from 'framer-motion';
import { useFollow } from '../hooks/useFollow';
import { usePinStore } from '../store/usePinStore';
import toast from 'react-hot-toast';

interface UserProfileProps {
  userId: string;
  name: string;
  avatar: string;
}

export const UserProfile: React.FC<UserProfileProps> = ({ userId, name, avatar }) => {
  const { toggleFollow, isFollowing } = useFollow();
  const { startChat } = usePinStore();
  const navigate = useNavigate();

  const handleFollow = () => {
    toggleFollow(userId);
    toast.success(isFollowing(userId) ? 'Unfollowed user' : 'Following user');
  };

  const handleMessage = () => {
    startChat(name);
    navigate('/messages');
    toast.success('Chat started with ' + name);
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <img
          src={avatar}
          alt={name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <p className="font-medium">{name}</p>
          <p className="text-sm text-gray-500">Creator</p>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleFollow}
          className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
            isFollowing(userId)
              ? 'bg-gray-100 hover:bg-gray-200'
              : 'bg-primary text-white hover:bg-primary-dark'
          }`}
        >
          {isFollowing(userId) ? (
            <>
              <UserMinus className="w-5 h-5" />
              Unfollow
            </>
          ) : (
            <>
              <UserPlus className="w-5 h-5" />
              Follow
            </>
          )}
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleMessage}
          className="px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          Message
        </motion.button>
      </div>
    </div>
  );
};
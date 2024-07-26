import { mockUserData } from '@/pages/MyPage/mockUserData';
import create from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState {
  imageUrl: string;
  email: string;
  nickname: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  location: string;
  mbti: string;
  interests: string[];
  setUser: (user: Partial<UserState>) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      ...mockUserData,
      setUser: (user) => set((state) => ({ ...state, ...user })),
    }),
    {
      name: 'user-storage', // localStorage key
    },
  ),
);

// Function to log stored user data from local storage
const logStoredUserData = () => {
  const userData = localStorage.getItem('user-storage');

  if (userData) {
    const parsedUserData = JSON.parse(userData);
    console.log(parsedUserData);
  } else {
    console.log('No user data found in local storage');
  }
};

// Call the function to log the data
logStoredUserData();
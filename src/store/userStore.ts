import { emptyUserData } from '@/pages/MyPage/mockUserData';
import create from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState {
  name: string;
  imageUrl: string;
  email: string;
  nickname: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  locations: string[]; // 추가
  isVerified: boolean; // 추가
  interests: string[];
  isLoggedIn: boolean;
  setUser: (user: Partial<UserState>) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      ...emptyUserData,
      isLoggedIn: false,
      setUser: (user) =>
        set((state) => ({ ...state, ...user, isLoggedIn: true })),
      clearUser: () => set({ ...emptyUserData, isLoggedIn: false }),
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

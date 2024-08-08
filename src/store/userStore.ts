import { emptyUserData, mockUserData } from '@/pages/MyPage/mockUserData';
import create from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState {
  imageUrl: string | undefined;
  email: string | undefined;
  nickname: string | undefined;
  password: string | undefined;
  confirmPassword: string | undefined;
  phoneNumber: string | undefined;
  location: string | undefined;
  mbti: string | undefined;
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
      clearUser: () => set({ ...mockUserData, isLoggedIn: false }),
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

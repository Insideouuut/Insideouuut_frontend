import { ClubData } from '@/types/Meetings';
import { getData } from './api';

// Define the function to fetch club data
export const getClubData = async (id: string): Promise<ClubData> => {
  try {
    // Fetch the data using the getData function
    const data = await getData<ClubData>(`/api/meetings/${id}`);
    console.log(data); // Log the fetched data
    return data;
  } catch (error) {
    console.error('Error fetching club data:', error);
    throw error;
  }
};

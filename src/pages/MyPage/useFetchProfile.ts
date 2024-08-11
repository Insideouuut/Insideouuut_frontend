// useFetchProfile.ts
import {
  Api,
  ApiResponseMyProfileResponse,
  MyProfileResponse,
} from '@/api/Apis';
import { useEffect, useState } from 'react';

const apiInstance = new Api();

export const useFetchProfile = () => {
  const [profile, setProfile] = useState<MyProfileResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response: ApiResponseMyProfileResponse =
          await apiInstance.api.getMyProfile();

        const userProfile =
          response.results && Array.isArray(response.results)
            ? response.results[0]
            : null;

        setProfile(userProfile);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch profile');
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return { profile, loading, error };
};

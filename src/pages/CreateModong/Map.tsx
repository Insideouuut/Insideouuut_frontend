import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MeetingPlace } from '@/types/Modong';
import axios from 'axios';
import React, { Dispatch, SetStateAction, useState } from 'react';

interface PlacesSearchResult {
  name: string;
  placeUrl: string;
  kakaoMapId: string;
  addressName: string;
  roadAddressName: string;
  latitude: string;
  longitude: string;
}

interface KakaoPlaceDocument {
  id: string;
  place_name: string;
  address_name: string;
  road_address_name: string;
  y: string;
  x: string;
  place_url: string;
}

interface MapProps {
  setMeetingPlace: Dispatch<SetStateAction<MeetingPlace | null>>;
}

const Map: React.FC<MapProps> = ({ setMeetingPlace }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [places, setPlaces] = useState<PlacesSearchResult[]>([]);

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };

  const searchPlaces = async () => {
    if (!searchKeyword) {
      alert('장소를 입력해주세요.');
      return;
    }
    setLoading(true);

    const url = `	https://dapi.kakao.com/v2/local/search/keyword?query=${searchKeyword}`;
    const KAKAO_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `KakaoAK ${KAKAO_API_KEY}`,
        },
      });

      const placesData: PlacesSearchResult[] = response.data.documents.map(
        (place: KakaoPlaceDocument) => ({
          kakaoMapId: place.id,
          name: place.place_name,
          addressName: place.address_name,
          roadAddressName: place.road_address_name,
          latitude: place.y,
          longitude: place.x,
          placeUrl: place.place_url,
        }),
      );

      setPlaces(placesData);
    } catch (error) {
      alert('장소를 불러오는 중 오류가 발생했습니다. 다시 시도해 주세요.');
      console.error('Error fetching places:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="장소 검색"
          value={searchKeyword}
          onChange={handleSearchInputChange}
        />
        <Button
          type="button"
          onClick={searchPlaces}
          disabled={loading}
          className="hover:bg-green-600"
        >
          {loading ? '검색 중...' : '검색'}
        </Button>
      </div>
      <div className="flex flex-col gap-4 mt-4 max-h-96 overflow-y-auto">
        {places.map((place) => (
          <Button
            key={place.kakaoMapId}
            type="button"
            variant="ghost"
            onClick={() => setMeetingPlace(place)}
            className="flex justify-between items-end h-fit"
          >
            <div className="flex flex-col items-start">
              <p className="font-neoBold">{place.name}</p>
              <p className="text-sm text-gray-500">
                {place.addressName || place.roadAddressName}
              </p>
            </div>
            <a
              href={place.placeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-500"
            >
              지도 보기
            </a>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Map;

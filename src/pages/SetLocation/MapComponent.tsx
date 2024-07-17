// MapComponent.tsx
import React, { useEffect } from 'react';

interface MapComponentProps {
  onLocationSelect: (location: string, lat: number, lng: number) => void; // 콜백 함수 타입 정의
}

const MapComponent: React.FC<MapComponentProps> = ({ onLocationSelect }) => {
  useEffect(() => {
    const { kakao } = window;

    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      const locPosition = new kakao.maps.LatLng(lat, lng);
      const container = document.getElementById('map');
      if (!container) return;

      const options = {
        center: locPosition,
        level: 3,
      };

      const map = new kakao.maps.Map(container, options);
      const marker = new kakao.maps.Marker({
        position: locPosition,
      });
      marker.setMap(map);

      const geocoder = new kakao.maps.services.Geocoder();
      geocoder.coord2RegionCode(lng, lat, (result, status) => {
        if (status === 'OK') {
          const fullAddress = `${result[0].region_1depth_name} ${result[0].region_2depth_name} ${result[0].region_3depth_name}`;
          onLocationSelect(fullAddress, lat, lng);
        }
      });
    });
  }, [onLocationSelect]);

  return <div id="map" style={{ width: '800px', height: '500px' }} />;
};

export default MapComponent;

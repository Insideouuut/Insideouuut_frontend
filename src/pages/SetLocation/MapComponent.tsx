import React, { useEffect } from 'react';

const MapComponent: React.FC = () => {
  useEffect(() => {
    const { kakao } = window;

    // 현재 위치 가져오기
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      // 현재 위치의 LatLng 객체 생성
      const locPosition = new kakao.maps.LatLng(lat, lng);

      const container = document.getElementById('map');
      if (!container) return;

      const options = {
        center: locPosition,
        level: 3,
      };

      // 지도 생성 및 현재 위치 중심 설정
      const map = new kakao.maps.Map(container, options);

      // 현재 위치에 마커 표시
      const marker = new kakao.maps.Marker({
        position: locPosition,
      });
      marker.setMap(map);
    });
  }, []);

  return (
    <div>
      <div id="map" style={{ width: '800px', height: '500px' }} />
    </div>
  );
};

export default MapComponent;

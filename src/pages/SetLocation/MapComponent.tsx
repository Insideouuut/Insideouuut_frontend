import proj4 from 'proj4';
import React, { useCallback, useEffect, useRef, useState } from 'react';

interface MapComponentProps {
  onLocationSelect: (location: string, lat: number, lng: number) => void;
  onNeighborhoodsUpdate: (neighborhoods: string[]) => void;
}

interface GeoJsonFeature {
  type: string;
  geometry: {
    type: string;
    coordinates: number[][][];
  };
  properties: {
    SIDO: string;
    SIGUNGU: string;
    EMD_KOR_NM: string;
  };
}

interface GeoJsonData {
  type: string;
  features: GeoJsonFeature[];
}

const MapComponent: React.FC<MapComponentProps> = ({
  onLocationSelect,
  onNeighborhoodsUpdate,
}) => {
  const [radius, setRadius] = useState(2); // 반경 초기값 설정
  const [neighborhoods, setNeighborhoods] = useState<string[]>([]);
  const [locationSet, setLocationSet] = useState(false); // 위치가 설정되었는지 추적
  const [isNeighborhoodsUpdated, setIsNeighborhoodsUpdated] = useState(false); // 이웃 목록이 업데이트되었는지 추적
  const mapRef = useRef<kakao.maps.Map | null>(null); // 지도를 저장
  const polygonsRef = useRef<kakao.maps.Polygon[]>([]); // 폴리곤을 저장

  const fetchGeoJsonData =
    useCallback(async (): Promise<GeoJsonData | null> => {
      try {
        const response = await fetch('/location.geojson');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: GeoJsonData = await response.json();
        return data;
      } catch (error) {
        console.error('Error fetching GeoJSON data:', error);
        return null;
      }
    }, []);

  const isWithinRadius = (
    centerLat: number,
    centerLng: number,
    pointLat: number,
    pointLng: number,
    radiusKm: number,
  ): boolean => {
    const earthRadiusKm = 6371;
    const dLat = ((pointLat - centerLat) * Math.PI) / 180;
    const dLng = ((pointLng - centerLng) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((centerLat * Math.PI) / 180) *
        Math.cos((pointLat * Math.PI) / 180) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadiusKm * c;

    return distance <= radiusKm;
  };

  const drawNeighborhoodPolygons = useCallback(
    async (map: kakao.maps.Map, neighborhoodsArray: string[]) => {
      const data = await fetchGeoJsonData();
      if (!data) return;

      const utmk =
        '+proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=GRS80 +units=m +no_defs';
      const wgs84 = '+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs';
      const transformer = proj4(utmk, wgs84);

      neighborhoodsArray.forEach((neighborhood) => {
        data.features.forEach((feature) => {
          if (feature.properties.EMD_KOR_NM === neighborhood) {
            const polygonPath: kakao.maps.LatLng[] = [];
            const coordinates = feature.geometry.coordinates;
            coordinates.forEach((coordinateArray) => {
              coordinateArray.forEach((coordinate) => {
                const [longi, lati] = transformer.forward(
                  coordinate as [number, number],
                );
                polygonPath.push(new kakao.maps.LatLng(lati, longi));
              });
            });

            const polygon = new kakao.maps.Polygon({
              path: polygonPath,
              strokeColor: '#4B8959',
              fillColor: '#5DB270',
              fillOpacity: 0.4,
            });

            polygon.setMap(map);
            polygonsRef.current.push(polygon); // 폴리곤 저장
          }
        });
      });
    },
    [fetchGeoJsonData],
  );

  const updateNeighborhoodsWithinRadius = useCallback(
    async (centerLat: number, centerLng: number, radiusKm: number) => {
      const data = await fetchGeoJsonData();
      if (!data) return;

      const utmk =
        '+proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=GRS80 +units=m +no_defs';
      const wgs84 = '+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs';
      const transformer = proj4(utmk, wgs84);

      const neighborhoodSet = new Set<string>();

      data.features.forEach((feature) => {
        const coordinates = feature.geometry.coordinates;
        let withinRadius = false;

        coordinates.forEach((coordinateArray) => {
          coordinateArray.forEach((coordinate) => {
            const [longi, lati] = transformer.forward(
              coordinate as [number, number],
            );
            if (isWithinRadius(centerLat, centerLng, lati, longi, radiusKm)) {
              withinRadius = true;
            }
          });
        });

        if (withinRadius) {
          neighborhoodSet.add(feature.properties.EMD_KOR_NM);
        }
      });

      const neighborhoodsArray = Array.from(neighborhoodSet);
      setNeighborhoods(neighborhoodsArray);
      onNeighborhoodsUpdate(neighborhoodsArray);
      setIsNeighborhoodsUpdated(true); // 이웃 목록 업데이트 완료
    },
    [fetchGeoJsonData, onNeighborhoodsUpdate],
  );

  useEffect(() => {
    const { kakao } = window;

    const handlePosition = async (position: GeolocationPosition) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      const locPosition = new kakao.maps.LatLng(lat, lng);
      const container = document.getElementById('map');
      if (!container) return;

      const options: kakao.maps.MapOptions = {
        center: locPosition,
        level: 6,
      };

      const map = new kakao.maps.Map(container, options);
      mapRef.current = map; // 지도를 저장

      const marker = new kakao.maps.Marker({
        position: locPosition,
      });
      marker.setMap(map);

      const geocoder = new kakao.maps.services.Geocoder();
      geocoder.coord2RegionCode(lng, lat, async (result, status) => {
        if (status === 'OK') {
          const fullAddress = `${result[0].region_1depth_name} ${result[0].region_2depth_name} ${result[0].region_3depth_name}`;
          console.log('Current Location:', fullAddress);
          onLocationSelect(fullAddress, lat, lng);

          // 초기에 이웃 목록을 업데이트
          await updateNeighborhoodsWithinRadius(lat, lng, radius);
          setLocationSet(true); // 위치 설정 완료
        }
      });
    };

    if (!locationSet) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log('Got position: ', position);
          handlePosition(position);
        },
        (error) => {
          console.error('Error getting position: ', error);
        },
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onLocationSelect, updateNeighborhoodsWithinRadius, locationSet]);

  // 이웃 목록 업데이트가 완료된 후 폴리곤 그리기
  useEffect(() => {
    if (isNeighborhoodsUpdated && mapRef.current) {
      drawNeighborhoodPolygons(mapRef.current, neighborhoods);
      setIsNeighborhoodsUpdated(false); // 폴리곤을 그린 후 다시 false로 설정
    }
  }, [isNeighborhoodsUpdated, drawNeighborhoodPolygons, neighborhoods]);

  // 반경 변경 시 이웃 목록만 업데이트
  useEffect(() => {
    if (locationSet && mapRef.current) {
      const center = mapRef.current.getCenter();
      if (center) {
        updateNeighborhoodsWithinRadius(
          center.getLat(),
          center.getLng(),
          radius,
        );
      }
    }
  }, [radius, updateNeighborhoodsWithinRadius, locationSet]);

  return (
    <div className="flex flex-col items-center space-y-4 w-full max-w-screen-lg mx-auto">
      <div id="map" className="w-full h-96 sm:h-[500px] rounded-md shadow-md" />
      <div className="text-center flex flex-col items-center space-y-2 sm:space-y-0 sm:flex-row sm:space-x-2">
        <label htmlFor="radius" className="text-sm whitespace-nowrap">
          반경 선택 (km):
        </label>
        <input
          type="range"
          id="radius"
          min="1"
          max="5"
          step="1"
          value={radius}
          className="h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary w-full sm:w-auto"
          onChange={(e) => setRadius(Number(e.target.value))}
        />
        <span className="text-sm ml-2">{radius}km</span>
      </div>
      <div className="w-full p-4 rounded-md border border-gray-200 shadow-sm">
        <h3 className="text-center text-sm font-semibold mb-2">내 주변 동네</h3>
        <ul className="flex flex-wrap gap-2 justify-center">
          {neighborhoods.map((neighborhood, index) => (
            <li
              key={index}
              className="bg-primary text-white px-3 py-1 rounded-full shadow-sm"
            >
              {neighborhood}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MapComponent;

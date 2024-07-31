import proj4 from 'proj4';
import React, { useEffect, useState } from 'react';

interface MapComponentProps {
  onLocationSelect: (location: string, lat: number, lng: number) => void; // 콜백 함수 타입 정의
}

const MapComponent: React.FC<MapComponentProps> = ({ onLocationSelect }) => {
  const [map, setMap] = useState<any>(null);
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      });
    }
  }, []);

  useEffect(() => {
    if (!latitude || !longitude) return;

    const container: any = document.getElementById('map');
    const options: kakao.maps.MapOptions = {
      center: new kakao.maps.LatLng(latitude, longitude),
      level: 3,
    };

    const createdMap = new kakao.maps.Map(container, options);
    setMap(createdMap);
  }, [latitude, longitude]);

  useEffect(() => {
    const findNeighborhood = () => {
      return new Promise<string>((resolve, reject) => {
        const geocoder = new kakao.maps.services.Geocoder();

        const callback = (result: any, status: any) => {
          if (status === kakao.maps.services.Status.OK) {
            resolve(result[0].region_3depth_name);
          } else {
            reject(status);
          }
        };

        geocoder.coord2RegionCode(longitude!, latitude!, callback);
      });
    };

    const findNeighborhoodCoordinates = async (neighborhoodName: string) => {
      const response = await fetch('/location.geojson');
      const data = await response.json();

      for (const feature of data.features) {
        if (neighborhoodName === feature.properties.EMD_KOR_NM) {
          return feature.geometry.coordinates;
        }
      }
      return false;
    };

    const addNeighborhoodPolygon = async () => {
      const neighborhoodName = await findNeighborhood();
      const coordinates = await findNeighborhoodCoordinates(neighborhoodName);

      if (!coordinates) return;

      const polygonPath: any = [];
      const utmk =
        '+proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=GRS80 +units=m +no_defs';
      const wgs84 = '+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs';
      const transformer = proj4(utmk, wgs84);

      coordinates.forEach((coordinateArray: any[]) => {
        coordinateArray.forEach((coordinate: any) => {
          const [longi, lati] = transformer.forward(coordinate);
          const latLng = new kakao.maps.LatLng(lati, longi);
          polygonPath.push(latLng);
          console.log('Polygon Coordinate:', lati, longi);
        });
      });

      const polygon = new kakao.maps.Polygon({
        path: polygonPath,
        strokeColor: '#925CE9',
        fillColor: '#925CE9',
        fillOpacity: 0.7,
      });

      polygon.setMap(map);
    };

    if (map) {
      addNeighborhoodPolygon();
    }
  }, [latitude, longitude, map]);

  return <div id="map" style={{ width: '800px', height: '500px' }} />;
};

export default MapComponent;

declare namespace kakao.maps {
  class LatLng {
    constructor(lat: number, lng: number);
  }

  class Map {
    constructor(container: HTMLElement, options: MapOptions);
  }

  class Marker {
    constructor(options: MarkerOptions);
    setMap(map: Map | null): void;
  }

  interface MapOptions {
    center: LatLng;
    level: number;
  }

  interface MarkerOptions {
    position: LatLng;
  }

  namespace services {
    class Places {
      keywordSearch(
        keyword: string,
        callback: (
          result: PlacesSearchResult[],
          status: PlacesSearchStatus,
        ) => void,
        options?: PlacesSearchOptions,
      ): void;
    }

    interface PlacesSearchOptions {
      location?: LatLng;
      radius?: number;
    }

    type PlacesSearchStatus = 'OK' | 'ZERO_RESULT' | 'ERROR';

    interface PlacesSearchResult {
      id: string;
      place_name: string;
      // 필요한 추가 필드를 여기에 정의할 수 있습니다.
    }

    class Geocoder {
      coord2RegionCode(
        lng: number,
        lat: number,
        callback: (result: RegionCodeResult[], status: Status) => void,
      ): void;
    }

    interface RegionCodeResult {
      region_1depth_name: string;
      region_2depth_name: string;
      region_3depth_name: string;
      // 추가적인 필드가 필요하다면 여기에 선언합니다.
    }

    type Status = 'OK' | 'ERROR'; // 필요한 모든 상태 값을 여기에 추가합니다.
  }
}

interface Window {
  kakao: typeof kakao;
}

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
  }
}

interface Window {
  kakao: typeof kakao;
}

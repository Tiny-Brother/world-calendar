import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { SEARCH_DEBOUNCE_TIME } from '@/lib/config';

const openStreetMapUrl = 'https://nominatim.openstreetmap.org';

const keys = {
  all: ['location'],
  search: (term: string) => [...keys.all, 'search', term],
  city: () => [...keys.all, 'city'],
};

export type OpeenStreetMap = {
  lat: string;
  lon: string;
  type: string;
  class: string;
  osm_id: number;
  licence: string;
  osm_type: string;
  place_id: number;
  importance: number;
  display_name: string;
  boundingbox: string[];
};

export function useOpenStreetMapLocation(location: string) {
  return useQuery<OpeenStreetMap[]>({
    queryKey: keys.search(location),
    staleTime: SEARCH_DEBOUNCE_TIME,
    placeholderData: keepPreviousData,
    queryFn: async () => {
      const url = `${openStreetMapUrl}/search?format=json&q=${location}`;
      const res = await fetch(url);
      const data = await res.json();
      return data;
    },
  });
}

export function useGetUserCurrentLocation() {
  return useQuery<OpeenStreetMap>({
    queryKey: keys.city(),
    queryFn: async () => {
      try {
        const position = await new Promise<GeolocationPosition>(
          (resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
          },
        );

        const { latitude } = position.coords;
        const { longitude } = position.coords;

        const url = `${openStreetMapUrl}/reverse?format=json&lat=${latitude}&lon=${longitude}`;
        const response = await fetch(url);
        return await response.json();
      } catch (error) {
        throw new Error('An error occurred while fetching user city.');
      }
    },
  });
}

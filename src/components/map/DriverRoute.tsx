'use client';

import { useEffect, useRef } from 'react';

interface DriverRouteProps {
  origin: [number, number];
  destination: [number, number];
  className?: string;
}

export function DriverRoute({ origin, destination, className = 'h-80' }: DriverRouteProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    const initMap = async () => {
      const L = (await import('leaflet')).default;

      const map = L.map(mapRef.current!).setView(origin, 14);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
        maxZoom: 19,
      }).addTo(map);

      const originIcon = L.divIcon({
        className: 'bg-purple-600 w-4 h-4 rounded-full border-2 border-white shadow',
        iconSize: [16, 16],
      });

      const destIcon = L.divIcon({
        className: 'bg-red-500 w-4 h-4 rounded-full border-2 border-white shadow',
        iconSize: [16, 16],
      });

      L.marker(origin, { icon: originIcon }).addTo(map).bindPopup('Store');
      L.marker(destination, { icon: destIcon }).addTo(map).bindPopup('Customer');

      map.fitBounds([origin, destination], { padding: [50, 50] });

      mapInstance.current = map;
    };

    initMap();

    return () => {
      mapInstance.current?.remove();
      mapInstance.current = null;
    };
  }, []);

  return <div ref={mapRef} className={`w-full rounded-xl border border-purple-100 ${className}`} />;
}

'use client';

import { useEffect, useRef } from 'react';

interface DeliveryMapProps {
  center?: [number, number];
  zoom?: number;
  className?: string;
}

export function DeliveryMap({ center = [40.7128, -74.006], zoom = 13, className = 'h-64' }: DeliveryMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    const initMap = async () => {
      const L = (await import('leaflet')).default;

      const map = L.map(mapRef.current!).setView(center, zoom);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map);

      L.marker(center).addTo(map)
        .bindPopup('Delivery Location')
        .openPopup();

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

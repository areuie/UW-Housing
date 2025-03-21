'use client';

import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

export default function MapPage() {
    const mapContainer = useRef<HTMLDivElement>(null);
    const map = useRef<mapboxgl.Map | null>(null);

    useEffect(() => {
        if (!map.current && mapContainer.current) {
            mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;
            
            map.current = new mapboxgl.Map({
                container: mapContainer.current,
                style: 'mapbox://styles/areuie/cm8hz7b9w00j501pa24tv5mlu',
                center: [-80.5449, 43.4723],
                zoom: 14
            });
        }
    }, []);

    return (
        <div ref={mapContainer} style={{ width: '100%', height: '500px' }} />
    );
}
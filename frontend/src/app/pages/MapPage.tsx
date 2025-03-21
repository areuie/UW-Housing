'use client';

import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

export default function MapPage() {
    const mapContainer = useRef<HTMLDivElement>(null);
    const map = useRef<mapboxgl.Map | null>(null);
    const [displayFeatures, setDisplayFeatures] = useState<any>(null);

    useEffect(() => {
        if (!map.current && mapContainer.current) {
            mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;
            
            map.current = new mapboxgl.Map({
                container: mapContainer.current,
                style: 'mapbox://styles/areuie/cm8hz7b9w00j501pa24tv5mlu',
                center: [-80.5449, 43.4723],
                zoom: 14,
                pitch: 60,
                bearing: 0,
            });

            map.current.on('mousemove', (e) => {
                const features = map.current!.queryRenderedFeatures(e.point);

                const displayProperties = [
                    'type',
                    'properties',
                    'id',
                    'layer',
                    'source',
                    'sourceLayer',
                    'state'
                ];

                const formattedFeatures = features.map((feat) => {
                    const displayFeat: any = {};
                    displayProperties.forEach((prop) => {
                        displayFeat[prop] = feat[prop as keyof typeof feat];
                    });
                    return displayFeat;
                });

                setDisplayFeatures(formattedFeatures);
            });
        }
    }, []);

    return (
        <>
            <div ref={mapContainer} style={{ width: '100%', height: '100vh' }} />
            <pre
                style={{
                    position: 'fixed',
                    top: 0,
                    right: 0,
                    bottom: 0,
                    width: '50%',
                    overflow: 'auto',
                    background: 'rgba(255, 255, 255, 0.8)',
                    padding: '10px',
                    zIndex: 1000
                }}
            >
                {JSON.stringify(displayFeatures, null, 2)}
            </pre>
        </>
    );
}
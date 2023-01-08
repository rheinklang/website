import { createRef, FC, RefObject, useCallback, useEffect, useMemo, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { Logger } from '../../utils/logger';
import classNames from 'classnames';
import { Heading } from '../Heading';
import { MapIcon } from '@heroicons/react/24/outline';
import { useTranslation } from '../../hooks/useTranslation';

import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = `${process.env.NEXT_PUBLIC_MAPBOX_API_KEY}`;

export interface MapProps {
	title?: string;
	zoom?: number;
	coordinates: [number, number] | null;
}

export const Map: FC<MapProps> = ({ title, zoom = 14, coordinates }) => {
	const logger = useMemo(() => new Logger('MapComponent'), []);
	const translate = useTranslation();

	const [hasError, setHasError] = useState(false);
	const [currentMap, setCurrentMap] = useState<mapboxgl.Map | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [, setCurrentMarker] = useState<mapboxgl.Marker | null>(null);

	const mapElementRef = createRef<HTMLDivElement>();

	const handleMapLoad = useCallback(
		(element: NonNullable<RefObject<HTMLDivElement>['current']>, coordinates: [number, number], zoom: number) => {
			try {
				setIsLoading(true);

				const map = new mapboxgl.Map({
					container: element,
					style: 'mapbox://styles/janbiasi/cl3ft3r56000o14rtfy12s12n',
					center: coordinates,
					zoom: zoom,
					minZoom: zoom - Math.round(zoom / 2),
					maxZoom: zoom + Math.round(zoom / 3),
					pitch: 60,
					bearing: 90,
					attributionControl: false,
					localFontFamily: 'Inter',
					scrollZoom: false,
				});

				const popup = new mapboxgl.Popup({
					closeOnMove: true,
				})
					.setText(title || 'Event-Location')
					.addTo(map);

				const marker = new mapboxgl.Marker({
					color: '#DA798F',
					draggable: false,
				})
					.setLngLat(coordinates)
					.setPopup(popup)
					.addTo(map);

				map.addControl(new mapboxgl.NavigationControl());
				map.addControl(
					new mapboxgl.AttributionControl({
						compact: true,
						customAttribution: 'Rheinklang Events',
					})
				);

				map.on('load', () => {
					map.addSource('mapbox-dem', {
						type: 'raster-dem',
						url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
						tileSize: 512,
						maxzoom: 14,
					});
					// add the DEM source as a terrain layer with exaggerated height
					map.setTerrain({ source: 'mapbox-dem', exaggeration: 1.5 });
				});

				map.on('error', (error) => {
					setHasError(true);
					logger.error(error.error, {
						context: `Map(${coordinates.join(',')})`,
					});
				});

				setCurrentMap(map);
				setCurrentMarker(marker);
				setIsLoading(false);
			} catch (error) {
				logger.error(error as Error);
				setIsLoading(false);
				setHasError(true);
			}
		},
		[title, logger]
	);

	useEffect(() => {
		if (!coordinates || coordinates.length !== 2) {
			logger.warn(`Invalid coordinates: ${coordinates}, skipping displaying map`);
			return;
		}

		if (!mapElementRef.current) {
			return;
		}

		if (currentMap) {
			return;
		}

		handleMapLoad(mapElementRef.current, coordinates, zoom);
	}, [mapElementRef, currentMap, coordinates, logger, zoom, handleMapLoad]);

	if (hasError && !isLoading) {
		return (
			<div key="error" className="text-center h-full w-full relative bg-slightly-rose-100 z-20">
				<div className="absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 text-slightly-rose-900">
					<MapIcon className="h-8 w-8 mx-auto mb-2" />
					<Heading level="3">{translate('error.map.couldNotLoadMap')}</Heading>
				</div>
			</div>
		);
	}

	return hasError ? null : (
		<div
			key="map"
			ref={mapElementRef}
			className={classNames('w-full h-full', {
				'h-0': hasError,
			})}
		/>
	);
};

Map.displayName = 'Map';

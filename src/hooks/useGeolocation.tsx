import { useState, useEffect } from 'react';

interface LocationData {
    latitude: number | null;
    longitude: number | null;
    city: string | null;
    country: string | null;
    countryCode: string | null;
}

interface GeolocationError {
    message: string;
}

const useGeolocation = () => {
    const [location, setLocation] = useState<LocationData | null>(null);
    const [error, setError] = useState<GeolocationError | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [permissionDenied, setPermissionDenied] = useState<boolean>(false);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;

                    // Use Nominatim for reverse geocoding
                    fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`)
                        .then((response) => response.json())
                        .then((data) => {

                            const city = data.address?.state || 'Unknown';
                            const country = data.address?.country || 'Unknown';
                            const countryCode = data.address?.country_code || 'Unknown';

                            setLocation({
                                latitude,
                                longitude,
                                city,
                                country,
                                countryCode,
                            });
                            setLoading(false);
                        })
                        .catch(() => {
                            setError({ message: 'Unable to retrieve location data.' });
                            setLoading(false);
                        });
                },
                (err) => {
                    if (err.code === 1) {
                        setPermissionDenied(true);
                    }
                    setError({ message: 'Geolocation permission denied or failed.' });
                    setLoading(false);
                }
            );
        } else {
            setError({ message: 'Geolocation is not supported by this browser.' });
            setLoading(false);
        }
    }, []);

    const retryPermission = () => {
        setPermissionDenied(false);
        setLoading(true);
        setLocation(null);
        setError(null);
        // Re-trigger geolocation request
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`)
                    .then((response) => response.json())
                    .then((data) => {

                        const city = data.address?.state || 'Unknown';
                        const country = data.address?.country || 'Unknown';
                        const countryCode = data.address?.country_code || 'Unknown';
                        setLocation({
                            latitude,
                            longitude,
                            city,
                            country,
                            countryCode,
                        });
                        setLoading(false);
                    })
                    .catch(() => {
                        setError({ message: 'Unable to retrieve location data.' });
                        setLoading(false);
                    });
            },
            (err) => {
                if (err.code === 1) {
                    setPermissionDenied(true);
                }
                setError({ message: 'Geolocation permission denied or failed.' });
                setLoading(false);
            }
        );
    };

    return { location, error, loading, permissionDenied, retryPermission };
};

export default useGeolocation;

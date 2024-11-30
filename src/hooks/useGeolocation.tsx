import { ENV } from '@/constants'; // Make sure ENV.IPSTACK_ACCESS_TOKEN is set with your ipstack API key
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
        const fetchLocation = async () => {
            try {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                        async (position: GeolocationPosition) => {
                            const { latitude, longitude } = position.coords;
                            try {
                                const response = await fetch(
                                    `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
                                );
                                const data = await response.json();
                                setLocation({
                                    latitude,
                                    longitude,
                                    city: data.address?.state || 'Unknown',
                                    country: data.address?.country || 'Unknown',
                                    countryCode: data.address?.country_code || 'Unknown',
                                });
                                setLoading(false);
                            } catch (error) {
                                console.log(error);
                                setError({ message: 'Unable to retrieve location data from geolocation.' });
                                setLoading(false);
                            }
                        },
                        (err: GeolocationPositionError) => {
                            if (err.code === 1) setPermissionDenied(true);
                            fetchIPLocation(); // Fallback to IP geolocation if browser geolocation fails
                        }
                    );
                } else {
                    fetchIPLocation(); // If geolocation is not available, use IP geolocation
                }
            } catch (error) {
                console.log(error);
                setError({ message: 'Unable to retrieve location data.' });
                setLoading(false);
            }
        };

        fetchLocation();
    }, []);

    const fetchIPLocation = async () => {
        try {
            const response = await fetch(`http://api.ipstack.com/check?access_key=${ENV.IPSTACK_ACCESS_TOKEN}`); // Replace with your ipstack API key
            const data = await response.json();
            setLocation({
                latitude: parseFloat(data.latitude),
                longitude: parseFloat(data.longitude),
                city: data.city || 'Unknown',
                country: data.country_name || 'Unknown',
                countryCode: data.country_code || 'Unknown',
            });
            setLoading(false);
        } catch (error) {
            console.log(error);
            setError({ message: 'Unable to retrieve IP location data from ipstack.' });
            setLoading(false);
        }
    };

    const retryPermission = () => {
        setPermissionDenied(false);
        setLoading(true);
        setLocation(null);
        setError(null);
        navigator.geolocation.getCurrentPosition(
            async (position: GeolocationPosition) => {
                const { latitude, longitude } = position.coords;
                try {
                    const response = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
                    );
                    const data = await response.json();
                    setLocation({
                        latitude,
                        longitude,
                        city: data.address?.state || 'Unknown',
                        country: data.address?.country || 'Unknown',
                        countryCode: data.address?.country_code || 'Unknown',
                    });
                    setLoading(false);
                } catch (error) {
                    console.log(error);
                    setError({ message: 'Unable to retrieve location data after retry.' });
                    setLoading(false);
                }
            },
            () => {
                setError({ message: 'Geolocation permission denied or failed during retry.' });
                setLoading(false);
            }
        );
    };

    return { location, error, loading, permissionDenied, retryPermission };
};

export default useGeolocation;

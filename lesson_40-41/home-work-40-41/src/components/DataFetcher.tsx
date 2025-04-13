import { useEffect, useState } from 'react';
import axios from 'axios';

interface DataFetcherProps {
    userId: number;
}

interface UserData {
    id: number;
    name: string;
    email: string;
}

function DataFetcher({ userId }: DataFetcherProps) {
    const [data, setData] = useState<UserData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await axios.get<UserData>(
                    `https://jsonplaceholder.typicode.com/users/${userId}`
                );
                setData(response.data);
            } catch (err) {
                setError('Помилка при завантаженні користувача');
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [userId]);

    if (loading) return <p>Завантаження даних...</p>;
    if (error) return <p>{error}</p>;
    if (!data) return null;

    return (
        <div>
            <p><strong>Ім’я:</strong> {data.name}</p>
            <p><strong>Email:</strong> {data.email}</p>
        </div>
    );
}

export default DataFetcher;
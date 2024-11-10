"use client"
import React, { useEffect, useState, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardTitle } from './ui/card';
import { Label } from '@radix-ui/react-label';
import { Input } from "@/components/ui/input";
import { Button } from './ui/button';
import Image from 'next/image';

interface WeatherData {
    name: string;
    main: {
        temp: number;
    };
    weather: [
        {
            description: string;
            icon: string;
        }
    ];
}

const WeatherComponent: React.FC = () => {
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [value, setValue] = useState<string>("Tbilisi");
    const [valueUpdate, setValueUpdate] = useState<string>("Tbilisi");

    const fetchWeatherData = useCallback(async () => {
        const url = `https://open-weather13.p.rapidapi.com/city/${valueUpdate}/EN`;
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': '35dfb6e5a2msh79becbf8afd655fp1421cfjsn45662e0342c2',
                'x-rapidapi-host': 'open-weather13.p.rapidapi.com',
            },
        };

        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error('Failed to fetch weather data');
            }
            const result = await response.json();
            setWeatherData(result);
        } catch (error: any) {
            setError(error.message);
        }
    }, [valueUpdate]);

    useEffect(() => {
        fetchWeatherData();
    }, [fetchWeatherData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    const handleChangeUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        setValueUpdate(value);
    };

    if (error) {
        return (
            <>
                <Card className='m-4 p-4'>
                    <form>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Name</Label>
                                <Input value={value} onChange={handleChange} id="name" placeholder="Enter city" />
                                <Button onClick={handleChangeUpdate}>Search</Button>
                            </div>
                        </div>
                    </form>
                </Card>
                <Card className='m-4 p-4'>
                    <CardContent>
                        <CardTitle>No Data</CardTitle>
                    </CardContent>
                </Card>
            </>
        );
    }

    if (!weatherData) {
        return <div>Loading...</div>;
    }

    const weatherIconCode = weatherData.weather[0].icon;
    const iconUrl = weatherIconCode ? `http://openweathermap.org/img/wn/${weatherIconCode}.png` : null;

    return (
        <>
            <Card className='m-4 p-4'>
                <form onSubmit={handleChangeUpdate}>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Name</Label>
                            <Input value={value} onChange={handleChange} id="name" placeholder="Enter city" />
                            <Button type="submit">Search</Button>
                        </div>
                    </div>
                </form>
            </Card>
            <Card className='m-4 p-4'>
                <CardContent>
                    <CardTitle>{weatherData.name}</CardTitle>
                    <div>
                        <CardDescription>{weatherData.main.temp}&#8451;</CardDescription>
                        <div className='flex justify-between items-center'>
                            <CardDescription>{weatherData.weather[0].description}</CardDescription>
                            <Image
                                src={iconUrl || ''}
                                width={50}
                                height={50}
                                alt={weatherData.weather[0].description}
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </>
    );
};

export default WeatherComponent;

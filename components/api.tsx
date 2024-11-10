"use client"
import React, { ReactEventHandler, useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Label } from '@radix-ui/react-label'
import { Input } from "@/components/ui/input"
import Image from 'next/image'
import { Button } from './ui/button'

const WeatherComponent: React.FC = () => {
    const [weatherData, setWeatherData] = useState<any>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const [value, setValue] = useState<string | null>("Tbilisi")
    const [valueUpdate, setValueUpdate] = useState<string | null>("Tbilisi")


    const fetchWeatherData = async () => {
        const url = `https://open-weather13.p.rapidapi.com/city/${valueUpdate}/EN`;
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': '35dfb6e5a2msh79becbf8afd655fp1421cfjsn45662e0342c2',
                'x-rapidapi-host': 'open-weather13.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options)
            if (!response.ok) {
                throw new Error('Failed to fetch weather data')
            }
            const result = await response.json()
            setWeatherData(result)
        } catch (error: any) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchWeatherData()
    }, [fetchWeatherData])

    // if (loading) {
    //     return <div>Loading...</div>
    // }

    const weatherIconCode = weatherData?.weather[0]?.icon;
    const iconUrl = weatherIconCode ? `http://openweathermap.org/img/wn/${weatherIconCode}.png` : null;


    const handleChange = async ({ e }: { e: React.ChangeEvent<HTMLInputElement> }) => {
        setValue(e.target.value)
    }
    const handleChangeUpdate = async ({ e }: { e: React.FormEvent }) => {
        e.preventDefault()
        setValueUpdate(value)
        console.log(valueUpdate)
    }
    if (error) {
        return (
            <>
                <Card className='m-4 p-4'>
                    <form>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Name</Label>
                                <Input value={value} onChange={(e) => handleChange({ e })} id="name" placeholder="Name of your project" />
                                <Button onClick={(e) => handleChangeUpdate({ e })}>search</Button>
                            </div>
                        </div>
                    </form>
                </Card>
                <Card className='m-4 p-4'>
                    <CardContent>
                        <CardTitle className='text-[30px]'>No Data</CardTitle>
                    </CardContent>
                </Card>
            </>
        )
    }

    return (
        <>
            <Card className='m-4 p-4'>
                <form>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Name</Label>
                            <Input value={value} onChange={(e) => handleChange({ e })} id="name" placeholder="Name of your project" />
                            <Button onClick={(e) => handleChangeUpdate({ e })}>search</Button>
                        </div>
                    </div>
                </form>
            </Card>
            <Card className='m-4 p-4'>
                <CardContent>
                    <CardTitle>{weatherDataTest.name}</CardTitle>
                    <div>
                        <CardDescription>{weatherDataTest.main.temp}&#8451;</CardDescription>
                        <div className='flex justify-between items-center'>
                            <CardDescription> {weatherDataTest.weather[0].description}</CardDescription>
                            <img src={iconUrl} width={50} height={50} alt='asdasd' />
                        </div>
                    </div>

                </CardContent>
            </Card>
        </>
    )
}

export default WeatherComponent
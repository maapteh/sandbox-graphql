import React from 'react';
import {
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    BarChart,
    Bar,
} from 'recharts';
import { useCovidHistoricalQuery } from '../../codegen/_graphql';

const country = 'Netherlands';

export const CovidVisual = () => {
    const { data, loading } = useCovidHistoricalQuery({
        variables: {
            days: 30,
            country: country,
        },
        ssr: false,
    });

    if (loading) {
        return <p>Loading data for {country}</p>;
    }

    if (!data || !data.covidHistorical) {
        return null;
    }

    const { dates, results } = data.covidHistorical;

    return (
        <>
            <p>
                {results.map((item, i) => {
                    const lineData = dates.map((date, n) => {
                        return {
                            name: date,
                            death: item.deaths[n],
                            recovered: item.cases[n],
                        };
                    });

                    return (
                        <p>
                            <strong>{item.province || 'no province'}</strong>
                            <BarChart
                                width={500}
                                height={300}
                                data={lineData}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="death" fill="#8884d8" />
                                <Bar dataKey="recovered" fill="#82ca9d" />
                            </BarChart>
                        </p>
                    );
                })}
            </p>
        </>
    );
};

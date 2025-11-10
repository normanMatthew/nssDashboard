"use client";
import React from "react";
import { Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import styles from "./chartComponent.module.css";

const data = [
    {
        name: "Monday",
        visit: 1000,
        click: 1100
    },
     {
        name: "Tuesday",
        visit: 2000,
        click: 1200
    },
     {
        name: "Wednesday",
        visit: 3000,
        click: 1300
    },
     {
        name: "Thursday",
        visit: 4000,
        click: 1400
    },
     {
        name: "Friday",
        visit: 5000,
        click: 1500
    },
     {
        name: "Saturday",
        visit: 6000,
        click: 1600
    },
     {
        name: "Sunday",
        visit: 7000,
        click: 1700
    },
];


const ChartComponent = () => {
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Weekly Recap</h2>
            <ResponsiveContainer width="100%" height="90%">
                <LineChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip contentStyle={{background: "#141c2c", border: "none"}} />
                    <Legend />
                    <Line type="monotone" dataKey="visit" stroke="#8884d8" strokeDasharray="5 5" />
                    <Line type="monotone" dataKey="click" stroke="#82ca9d" strokeDasharray="3 4 5 2" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
};

export default ChartComponent;
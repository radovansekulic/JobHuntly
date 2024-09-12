"use client"

import Header from "@/app/components/Header";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Work({ params }: { params: { id: number } }) {
    const [data, setData] = useState({ jobs: [], offers: [] });

    useEffect(() => {
        const token = localStorage.getItem('token');

        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/work/${params.id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/json',
                    },
                }); setData(response.data);

            } catch (err) {
                console.error("Failed to fetch data:", err);
            }
        };

        fetchData();
    }, [params.id]);

    return (
        <>
            <Header />
            <section className="mt-20 container md:px-4 max-w-5xl mx-auto">
                <h1 className="text-4xl text-bold my-10">MY JOB APPLICATIONS 👇</h1>
                {data.jobs.map((job) => (
                    <>
                        <div className="p-5 border mb-20 rounded-xl">
                            <div className="flex justify-between">
                                <div>
                                    <h1 className="text-xl font-semibold mb-2">👋 {job["nickname"]}</h1>
                                    <h1 className="text-lg mb-5">{job["title"]}</h1>
                                </div>
                                <div>
                                    <button className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                        START PRICE - {job["price"]}$
                                    </button>
                                </div>
                            </div>
                            <p>{job["description"]}</p>
                        </div>
                        {data.offers
                            .filter(offer => offer["jobId"] === job["_id"])
                            .map(filteredOffer => (
                                <div className="ms-5" key={filteredOffer["_id"]}>
                                    <div className="mb-10 border p-5" key={filteredOffer["_id"]} >
                                        <h1 className="font-bold mb-5 text-2xl">
                                            {filteredOffer["nickname"]} - <span>{filteredOffer["email"]}</span>
                                        </h1>
                                        <p className="border-s p-4">PROPOSAL: {filteredOffer["description"]}</p>
                                        <p className="p-4 font-bold text-2xl text-indigo-500">PRICE: {filteredOffer["price"]} $</p>
                                    </div>
                                </div >
                            ))
                        }
                    </>
                ))}
            </section >
        </>
    )
}
"use client"

import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../components/Header";
import Link from "next/link";

export default function Dashboard({ params }: { params: { id: number } }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');

        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/myJobs/${params.id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/json',
                    },
                });
                setData(response.data.jobs);
            } catch (err) {
                console.error("Failed to fetch data:", err);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <Header />
            <h1 className="text-4xl container px-4 max-w-4xl mx-auto text-bold my-10">MY POSTED JOBS 👇</h1>
            <section className="mt-20 container md:grid grid-cols-2 px-4 gap-10 mx-auto max-w-4xl">
                {data.map((item) => (
                    <div className="w-full">
                        <Link href={`/job/${item["_id"]}`} key={item["_id"]}>
                            <div className="p-5 border mb-10 rounded-xl">
                                <div className="flex justify-between">
                                    <div>
                                        <h1 className="text-xl font-semibold mb-2">👋 {item["nickname"]}</h1>
                                        <h1 className="text-lg mb-5">{item["title"]}</h1>
                                    </div>
                                    <div>
                                        <button className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">VIEW PROPOSALS</button>
                                    </div>
                                </div>
                                <p>{item["description"]}</p>
                            </div>
                        </Link>
                    </div>
                ))}
            </section>
        </div>
    )
}
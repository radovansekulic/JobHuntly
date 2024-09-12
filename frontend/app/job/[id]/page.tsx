"use client"

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Alert from "@/app/components/Alert";
import Header from "../../components/Header";

interface JobData {
    _id: number;
    nickname: string;
    title: string;
    price: number;
    description: string;
}

interface OfferDta {
    _id: number;
    nickname: string;
    title: string;
    price: number;
    email: string;
    description: string;
}

export default function Dashboard({ params }: { params: { id: number } }) {
    const router = useRouter();
    const [data, setData] = useState<JobData | null>(null);
    const [message, setMessage] = useState("");
    const [dataOffer, setDataOffer] = useState<OfferDta | null>(null);

    const [formData, setFormData] = useState({
        userId: '',
        nickname: '',
        email: '',
        description: '',
        price: ''
    });

    const handleChange = (e: { target: { name: string; value: string; }; }) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        const userData = localStorage.getItem("userData");
        if (userData) {
            const userDataObj = JSON.parse(userData);
            setFormData({
                ...formData,
                nickname: userDataObj.nickname,
                userId: userDataObj._id,
                email: userDataObj.email
            });
        }
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('token');

        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/getJob/${params.id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/json',
                    },
                }); setData(response.data);

                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/getOffers/${params.id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/json',
                    },
                }); setDataOffer(res.data);

            } catch (err) {
                console.error("Failed to fetch data:", err);
            }
        };

        fetchData();
    }, [params.id]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        try {
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/offer/${params.id}`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                },
            });
            setMessage("Offer created successfully");
            window.location.reload();
        } catch (error) {
            setMessage("Error creating Offer");
        }
    };

    return (
        <div>
            <Header />
            {message && <Alert message={message} />}
            <section className="mt-32 container mx-auto">
                {data ? (
                    <>
                        <div className="md:flex justify-around px-4">
                            <section>
                                <div className="p-5 border mb-20 rounded-xl">
                                    <div className="flex justify-between">
                                        <div>
                                            <h1 className="text-xl font-semibold mb-2">👋 {data.nickname}</h1>
                                            <h1 className="text-lg mb-5">{data.title}</h1>
                                        </div>
                                        <div>
                                            <button className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                                START PRICE - {data.price}$
                                            </button>
                                        </div>
                                    </div>
                                    <p>{data.description}</p>
                                </div>
                                <h1 className="text-4xl text-bold">SUBMIT YOUR PROPOSAL 👇</h1>
                                <div>
                                    <form onSubmit={handleSubmit} className="container my-20 px-4 mx-auto">
                                        <div className="space-y-12 sm:space-y-16">
                                            <div>
                                                <div className="mt-10 space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
                                                    <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                                                        <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">Price</label>
                                                        <div className="mt-2 sm:col-span-2 sm:mt-0">
                                                            <input
                                                                type="number"
                                                                required
                                                                name="price"
                                                                value={formData.price}
                                                                onChange={handleChange}
                                                                autoComplete="price"
                                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                                                        <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">Description</label>
                                                        <div className="mt-2 sm:col-span-2 sm:mt-0">
                                                            <textarea
                                                                required
                                                                name="description"
                                                                value={formData.description}
                                                                onChange={handleChange}
                                                                className="block w-full max-w-2xl h-[150px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                            />
                                                            <p className="mt-3 text-sm leading-6 text-gray-600">Enter a description.</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mt-6 flex items-center justify-end gap-x-6">
                                                <button type="button" className="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
                                                <button type="submit" className="inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600">Publish Offer</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </section>
                            <Link href="#" key={data._id}>
                                <div>
                                    {Array.isArray(dataOffer) && dataOffer.length > 0 ? (
                                        dataOffer.map((item) => (
                                            <div className="mb-10 border p-5" key={item._id}>
                                                <h1 className="font-bold mb-5 text-2xl">
                                                    {item.nickname} - <span>{item.email}</span>
                                                </h1>
                                                <p className="border-s p-4">PROPOSAL: {item.description}</p>
                                                <p className="p-4 font-bold text-2xl text-indigo-500">PRICE: {item.price} $</p>
                                            </div>
                                        ))
                                    ) : (
                                        <h1 className="text-2xl font-bold text-rose-500 mb-10">Job not proposal</h1>
                                    )}
                                </div>
                            </Link>
                        </div>
                    </>
                ) : (
                    <h1 className="text-2xl font-bold text-rose-500 mb-10">Job not found</h1>
                )}
            </section>
        </div>
    );
}

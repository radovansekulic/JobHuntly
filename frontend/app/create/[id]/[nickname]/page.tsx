"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Header from "../../../components/Header";
import Alert from "@/app/components/Alert";

export default function Create({ params }: {
    params:
    { id: number, nickname: string }
}) {
    const router = useRouter();
    const [message, setMessage] = useState("");

    const [formData, setFormData] = useState({
        userId: params.id,
        nickname: params.nickname,
        title: '',
        description: '',
        price: ''
    });

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/create`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                },
            });
            router.push('/');

        } catch (error) {
            setMessage("Error creating job")
        }
    };

    return (
        <div>
            <Header />
            <div className={message ? '' : 'hidden'}>
                <Alert message={message} />
            </div>
            <form onSubmit={handleSubmit} className="container md:max-w-2xl mt-20 px-4 mx-auto">
                <div className="space-y-12 sm:space-y-16">
                    <div>
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Post Job</h2>
                        <div className="mt-10 space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
                            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                                <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">Title</label>
                                <div className="mt-2 sm:col-span-2 sm:mt-0">
                                    <input type="text" required={true} name="title" value={formData.title} onChange={handleChange} autoComplete="given-name"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                            </div>

                            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                                <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">Description</label>
                                <div className="mt-2 sm:col-span-2 sm:mt-0">
                                    <textarea required={true} name="description" value={formData.description} onChange={handleChange}
                                        className="block w-full max-w-2xl h-[150px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
                                    <p className="mt-3 text-sm leading-6 text-gray-600">Enter a description.</p>
                                </div>
                            </div>

                            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                                <label htmlFor="startingPrice" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">Starting Price</label>
                                <div className="mt-2 sm:col-span-2 sm:mt-0">
                                    <input type="number" required={true} name="price" value={formData.price} onChange={handleChange} autoComplete="off"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <button type="button" className="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
                        <button type="submit" className="inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600">Publish Auction</button>
                    </div>
                </div>
            </form>
        </div>
    )
}
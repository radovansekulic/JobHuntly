import { useState } from 'react';

export default function Alert(props: any) {
    const [hidden, setHidden] = useState(false);

    const handleDismiss = () => {
        setHidden(true);
    };

    return (
        <div className={`z-100 ms-[50%] relative me-10 top-20 ${hidden ? 'hidden' : ''}`}>
            <div className="flex rounded-md bg-rose-50 p-4 float-end md:w-1/3">
                <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-rose-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                            clipRule="evenodd"></path>
                    </svg>
                </div>
                <div className="ml-3">
                    <p className="text-sm font-medium text-rose-800">{props.message}</p>
                </div>
                <div className="ml-auto pl-3">
                    <div className="-mx-1.5 -my-1.5">
                        <button type="button" onClick={handleDismiss}
                            className="inline-flex rounded-md bg-rose-50 p-1.5 text-rose-500 hover:bg-rose-100 focus:outline-none focus:ring-2 focus:ring-rose-600 focus:ring-offset-2 focus:ring-offset-rose-50">
                            <span className="sr-only">Dismiss</span>
                            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path
                                    d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
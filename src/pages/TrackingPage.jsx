import React, { useState } from 'react';
import Swal from 'sweetalert2';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const TrackingPage = () => {

    const axiosPublic = useAxiosPublic();
    const [ show, setShow ] = useState(false);


    const { data: nominees = [], refetch } = useQuery({
        queryKey: ['nominee'],
        queryFn: async () => {
            const res = await axiosPublic.get('/nominee');
            return res.data;
        }
    })

    const handleClose = () => {
        setShow(false)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const trackNo = form.trackingNumber.value;
        const isVerified = nominees.some(item => item.verification === trackNo);
        console.log(trackNo);
        if (isVerified) {
            Swal.fire({
                title: `Application #${trackNo} is in status "Approved and printed/generated"!`,
                
                confirmButtonText: 'OK',
                customClass: {
                  confirmButton: 'swal-button-red' // Add custom class for the button
                }
              });
        } else {
            setShow(true)
        }

    }
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            {/* Header */}
            <header className="bg-black">
                <div className="container mx-auto py-2  px-6 flex justify-between items-center">
                    {/* Logo placeholder */}
                    <div className="flex items-center">
                        <div className="">
                            <img src="https://res.cloudinary.com/dnvmj9pvk/image/upload/v1729756212/UniverseIT/wfzr1tlgloeouvzi37sx.png" alt="" className='w-2/3' />
                        </div> {/* Placeholder for logo */}

                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button className="text-white">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>

                        </button>
                    </div>

                    {/* Right section (buttons) - Hidden on mobile */}
                    <div className="hidden md:flex space-x-4">
                        <button className="text-white bg-red-600 px-4 py-2 rounded font-bold">Log in</button>
                        <button className="text-red-600 border border-red-600 px-4 py-2 rounded font-bold">Register</button>
                        <div className="flex justify-center items-center gap-2 rounded-lg border border-red-600 my-2 ">
                            <div className="text-white bg-red-600 rounded-l-lg px-2">EN</div>
                            <div className="text-red-600 pr-2">AL</div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Section */}
            <main className="flex-grow">
                <div className="bg-[#ee0000] text-white  py-4">
                    <h2 className="text-3xl  ml-6 lg:ml-28 font-bold">Track application</h2>
                </div>

                
                {
                    show && <div className="w-full  lg:w-1/3 mt-8 bg-red-200 mx-auto p-4 border-2 border-red-600 rounded-lg flex justify-center gap-4 lg:gap-16 items-center">
                    <p className='w-11/12 text-center lg:text-start'>No application was found with this tracking number!</p>
                    <p onClick={handleClose} className='text-gray-400 font-bold'>x</p>
                </div>
                }

                {/* Tracking form */}
                <div className="w-11/12 mx-auto py-10">
                    <div className="bg-white p-6 md:p-8 shadow-md rounded-md">
                        <form action="" onSubmit={handleSubmit}>
                            <div className="mb-4 lg:w-1/3 mx-auto">
                                <label className="block text-[16px]  mb-2" htmlFor="trackingNumber">
                                    Tracking number
                                </label>
                                <input
                                    id="trackingNumber"
                                    name="trackingNumber"
                                    type="text"
                                    placeholder="Tracking number"
                                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-red-600"
                                />
                            </div>
                            <div className="lg:w-1/3 mx-auto">
                                <button className="bg-[#ee0000] hover:bg-red-800 text-white px-6 py-2 rounded w-full font-semibold">
                                    Track
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-black text-white py-6 md:py-12">
                <div className="container mx-auto px-4 md:px-6 lg:flex justify-center gap-32 text-center md:text-left">
                    <div className="mb-6 md:mb-0">
                        <h3 className="text-lg font-bold mb-2">Application</h3>
                        <ul>
                            <li>New application</li>
                            <li>Ongoing applications</li>
                            <li>Track application</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold mb-2">About e-Visa</h3>
                        <ul>
                            <li>About</li>
                            <li>FAQ</li>
                            <li>Comments</li>
                        </ul>
                    </div>
                </div>
                <div className="mt-6 text-center text-sm">
                    <p>This electronic system is maintained by the economic operator: A-T-D ALBANIAN TECHNOLOGY DISTRIBUTION</p>
                </div>
            </footer>
        </div>
    );
};

export default TrackingPage;

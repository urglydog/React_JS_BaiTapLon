import Support from "../../components/Support/Support";
import { Link, useLocation } from 'react-router-dom';
import path from "../../constant/path";
import {UserContext} from '../../context/UserContext'
import { useContext } from "react";

function Profile() {
    const location = useLocation();
    const{user} = useContext(UserContext);
    return (
        <div className="bg-gray-100 min-h-screen font-sans">
            <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
                <p className="text-sm text-gray-500 mb-6">
                    <Link to={path.home} className="text-blue-500 hover:underline">
                        Home
                    </Link>
                    {' / '}
                    {location.pathname === path.profile && 'My Dashboard'}
                </p>
                <h1 className="text-2xl font-semibold text-gray-800 mb-2">
                    My Dashboard
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Sidebar */}
                    <div className="bg-white rounded-md shadow-md p-4">
                        <h2 className="text-lg font-semibold text-gray-700 mb-4">Account Management</h2>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    to={path.profile}
                                    className={`block text-blue-500 font-medium hover:text-blue-700 ${location.pathname === path.profile ? 'font-bold' : ''
                                        }`}
                                >
                                    Account Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to={`${path.profile}/account-information`}
                                    className={`block text-gray-700 hover:text-gray-900 ${location.pathname === `${path.profile}/account-information` ? 'font-bold' : ''
                                        }`}
                                >
                                    Account Information
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to={`${path.profile}/address-book`}
                                    className={`block text-gray-700 hover:text-gray-900 ${location.pathname === `${path.profile}/address-book` ? 'font-bold' : ''
                                        }`}
                                >
                                    Address Book
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to={`${path.profile}/my-orders`}
                                    className="block text-gray-700 hover:text-gray-900"
                                >
                                    My Orders
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to={`${path.profile}/downloadable-products`}
                                    className="block text-gray-700 hover:text-gray-900"
                                >
                                    My Downloadable Products
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to={`${path.profile}/payment-methods`}
                                    className="block text-gray-700 hover:text-gray-900"
                                >
                                    Stored Payment Methods
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to={`${path.profile}/billing-agreements`}
                                    className="block text-gray-700 hover:text-gray-900"
                                >
                                    Billing Agreements
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to={`${path.profile}/wish-list`}
                                    className="block text-gray-700 hover:text-gray-900"
                                >
                                    My Wish List
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to={`${path.profile}/product-reviews`}
                                    className="block text-gray-700 hover:text-gray-900"
                                >
                                    My Product Reviews
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to={`${path.profile}/newsletter-subscriptions`}
                                    className="block text-gray-700 hover:text-gray-900"
                                >
                                    Newsletter Subscriptions
                                </Link>
                            </li>
                        </ul>

                        {/* Other sections */}
                        <div className="mt-6 bg-gray-100 rounded-md p-4">
                            <h3 className="text-sm font-semibold text-gray-600 mb-2">Compare Products</h3>
                            <p className="text-gray-500 text-sm">You have no items to compare.</p>
                        </div>

                        <div className="mt-4 bg-gray-100 rounded-md p-4">
                            <h3 className="text-sm font-semibold text-gray-600 mb-2">My Wish List</h3>
                            <p className="text-gray-500 text-sm">You have no items in your wish list.</p>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3 bg-white rounded-md shadow-md p-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Account Information</h2>

                        {/* Contact Information */}
                        <div className="mb-6 border-b pb-4">
                            <h3 className="text-lg font-semibold text-gray-700 mb-2">Contact Information</h3>
                            <p className="text-gray-600">
                                Alax Driver
                                <br />
                                ExampleAdress@gmail.com
                            </p>
                            <div className="mt-2">
                                <button className="text-blue-500 hover:text-blue-700 text-sm font-medium mr-4">
                                    Edit
                                </button>
                                <button className="text-blue-500 hover:text-blue-700 text-sm font-medium">
                                    Change Password
                                </button>
                            </div>
                        </div>

                        {/* Newsletters */}
                        <div className="mb-6 border-b pb-4">
                            <h3 className="text-lg font-semibold text-gray-700 mb-2">Newsletters</h3>
                            <p className="text-gray-600">You don't subscribe to our newsletter.</p>
                            <div className="mt-2">
                                <button className="text-blue-500 hover:text-blue-700 text-sm font-medium">
                                    Edit
                                </button>
                            </div>
                        </div>

                        {/* Address Book */}
                        <div className="mb-6 border-b pb-4">
                            <h3 className="text-lg font-semibold text-gray-700 mb-2">Address Book</h3>
                            <Link
                                to={`${path.profile}/manage-addresses`}
                                className="text-blue-500 hover:text-blue-700 text-sm font-medium"
                            >
                                Manage Addresses
                            </Link>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                {/* Default Billing Address */}
                                <div>
                                    <h4 className="text-md font-semibold text-gray-700 mb-2">Default Billing Address</h4>
                                    <p className="text-gray-600 text-sm">You have not set a default billing address.</p>
                                    <Link
                                        to={`${path.profile}/edit-billing-address`}
                                        className="text-blue-500 hover:text-blue-700 text-sm font-medium mt-2"
                                    >
                                        Edit Address
                                    </Link>
                                </div>

                                {/* Default Shipping Address */}
                                <div>
                                    <h4 className="text-md font-semibold text-gray-700 mb-2">Default Shipping Address</h4>
                                    <p className="text-gray-600 text-sm">You have not set a default shipping address.</p>
                                    <Link
                                        to={`${path.profile}/edit-shipping-address`}
                                        className="text-blue-500 hover:text-blue-700 text-sm font-medium mt-2"
                                    >
                                        Edit Address
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Support Section */}
            <Support />
        </div>
    );
}

export default Profile;

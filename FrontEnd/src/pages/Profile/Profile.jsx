import Support from "../../components/Support/Support";
import { Link, useLocation } from 'react-router-dom';
import path from "../../constant/path";
import { UserContext } from '../../context/UserContext';
import { useContext, useState, useEffect } from "react";
import axiosInstance from "../../custom/axios";

function Profile() {
    const location = useLocation();
    const { user } = useContext(UserContext);
    const [accountInfo, setAccountInfo] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        address: '',
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // State cho Modal chỉnh sửa
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editAccountInfo, setEditAccountInfo] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        address: '',
    });

    useEffect(() => {
        const fetchAccountInfo = async () => {
            setLoading(true);
            setError('');
            try {
                if (user && user.customerID) {
                    const response = await axiosInstance.get(`/api/customer/${user.customerID}`);
                    if (response.data.EC === 1) {
                        setAccountInfo(response.data.DT);
                        setEditAccountInfo(response.data.DT); // Khởi tạo dữ liệu chỉnh sửa
                    } else {
                        setError(response.data.EM || 'Failed to load account information.');
                    }
                } else {
                    setError('User information not found.');
                }
            } catch (err) {
                setError('Error loading account information.');
                console.error("Error fetching profile data:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchAccountInfo();
    }, [user]);

    const openEditModal = () => {
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
    };

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditAccountInfo({ ...editAccountInfo, [name]: value });
    };

    const handleSaveAccountInfo = async () => {
        try {
            const response = await axiosInstance.put('/api/customer', {
                customerId: user.customerID,
                ...editAccountInfo,
            });

            if (response.data.EC === 1) {
                alert('Thông tin tài khoản đã được cập nhật thành công!');
                setIsEditModalOpen(false);
                // Gọi lại fetchAccountInfo để cập nhật lại state accountInfo
                const fetchUpdatedInfo = async () => {
                    const response = await axiosInstance.get(`/api/customer/${user.customerID}`);
                    if (response.data.EC === 1) {
                        setAccountInfo(response.data.DT);
                    }
                };
                fetchUpdatedInfo();
            } else {
                alert(response.data.EM || 'Có lỗi xảy ra khi cập nhật thông tin.');
            }
        } catch (error) {
            console.error('Lỗi khi cập nhật thông tin tài khoản:', error);
            alert('Lỗi server khi cập nhật thông tin.');
        }
    };

    if (loading) {
        return <div className="container mx-auto py-10">Loading account information...</div>;
    }

    if (error) {
        return <div className="container mx-auto py-10 text-red-500">{error}</div>;
    }

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
                                {accountInfo.fullName}
                                <br />
                                {accountInfo.email}
                            </p>
                            <div className="mt-2">
                                <button
                                    className="text-blue-500 hover:text-blue-700 text-sm font-medium mr-4"
                                    onClick={openEditModal}
                                >
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
                                    <p className="text-gray-600 text-sm">{accountInfo.address || 'You have not set a default billing address.'}</p>
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
                                    <p className="text-gray-600 text-sm">{accountInfo.address || 'You have not set a default shipping address.'}</p>
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

            {/* Modal chỉnh sửa thông tin */}
            {isEditModalOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50" id="my-modal">
                    <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                        <div className="mt-3 text-center">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">Edit Account Information</h3>
                            <div className="mt-2">
                                <div>
                                    <label htmlFor="fullName" className="block text-gray-700 text-sm font-bold mb-2">Full Name:</label>
                                    <input
                                        type="text"
                                        id="fullName"
                                        name="fullName"
                                        value={editAccountInfo.fullName}
                                        onChange={handleEditInputChange}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                </div>
                                <div className="mt-4">
                                    <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={editAccountInfo.email}
                                        onChange={handleEditInputChange}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                </div>
                                <div className="mt-4">
                                    <label htmlFor="phoneNumber" className="block text-gray-700 text-sm font-bold mb-2">Phone Number:</label>
                                    <input
                                        type="text"
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        value={editAccountInfo.phoneNumber}
                                        onChange={handleEditInputChange}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                </div>
                                <div className="mt-4">
                                    <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">Address:</label>
                                    <textarea
                                        id="address"
                                        name="address"
                                        value={editAccountInfo.address}
                                        onChange={handleEditInputChange}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                </div>
                            </div>
                            <div className="items-center px-4 py-3">
                                <button
                                    id="ok-btn"
                                    className="px-4 py-2 bg-green-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
                                    onClick={handleSaveAccountInfo}
                                >
                                    Lưu
                                </button>
                                <button
                                    className="mt-2 px-4 py-2 bg-gray-200 text-gray-800 text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300"
                                    onClick={closeEditModal}
                                >
                                    Đóng
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Support Section */}
            <Support />
        </div>
    );
}

export default Profile;
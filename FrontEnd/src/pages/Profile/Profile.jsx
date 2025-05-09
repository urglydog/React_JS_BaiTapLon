"use client"

import Support from "../../components/Support/Support"
import { Link, useLocation, Routes, Route, Navigate } from "react-router-dom"
import path from "../../constant/path"
import { UserContext } from "../../context/UserContext"
import { useContext, useState, useEffect, useRef } from "react"
import axiosInstance from "../../custom/axios"
import MyOrders from "../../components/info/MyOrders"
import AccountDashboard from "../../components/info/AccountDashboard"

function Profile() {
  const location = useLocation()
  const { user, updateUser } = useContext(UserContext)
  const [accountInfo, setAccountInfo] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    address: "",
  })
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editAccountInfo, setEditAccountInfo] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    address: "",
  })
  const [isEditingAddress, setIsEditingAddress] = useState(false)
  const [editingAddressValue, setEditingAddressValue] = useState("")
  const addressInputRef = useRef(null)

  // state quản lý đổi mật khẩu
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false)
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmNewPassword, setConfirmNewPassword] = useState("")
  const [changePasswordError, setChangePasswordError] = useState("")
  const [changePasswordSuccess, setChangePasswordSuccess] = useState(false)

  // Đặt các hàm xử lý vào window để component con có thể gọi
  useEffect(() => {
    window.handleOpenChangePasswordModal = handleOpenChangePasswordModal
    window.handleEditButtonClick = handleEditButtonClick

    return () => {
      // Cleanup khi component unmount
      delete window.handleOpenChangePasswordModal
      delete window.handleEditButtonClick
    }
  }, [])

  const handleOpenChangePasswordModal = () => {
    setIsChangePasswordModalOpen(true)
    setCurrentPassword("")
    setNewPassword("")
    setConfirmNewPassword("")
    setChangePasswordError("")
    setChangePasswordSuccess(false)
  }

  const handleCloseChangePasswordModal = () => {
    setIsChangePasswordModalOpen(false)
  }

  const handlePasswordInputChange = (e) => {
    const { name, value } = e.target
    if (name === "currentPassword") setCurrentPassword(value)
    else if (name === "newPassword") setNewPassword(value)
    else if (name === "confirmNewPassword") setConfirmNewPassword(value)
  }

  const handleChangePasswordSubmit = async () => {
    setChangePasswordError("")
    setChangePasswordSuccess(false)

    if (newPassword !== confirmNewPassword) {
      setChangePasswordError("Mật khẩu mới và xác nhận mật khẩu không khớp.")
      return
    }

    try {
      if (!user || !user.customerID) {
        alert("Không tìm thấy thông tin người dùng. Vui lòng đăng nhập lại.")
        return
      }

      const response = await axiosInstance.post("/api/customer/change-password", {
        customerID: user.customerID,
        currentPassword: currentPassword,
        newPassword: newPassword,
      })

      if (response.data.EC === 1) {
        setChangePasswordSuccess(true)
        setTimeout(handleCloseChangePasswordModal, 1500)
      } else {
        setChangePasswordError(response.data.EM || "Đã có lỗi xảy ra khi đổi mật khẩu.")
      }
    } catch (error) {
      console.error("Lỗi khi đổi mật khẩu:", error)
      setChangePasswordError("Lỗi server khi đổi mật khẩu.")
    }
  }

  useEffect(() => {
    if (user) {
      setAccountInfo({
        fullName: user.fullName || "",
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
        address: user.address || "",
      })
    }
  }, [user])

  useEffect(() => {
    if (isEditingAddress && addressInputRef.current) {
      setEditingAddressValue(accountInfo.address)
      addressInputRef.current.focus()
    }
  }, [isEditingAddress, accountInfo.address])

  const handleEditButtonClick = () => {
    setEditAccountInfo({
      fullName: accountInfo.fullName || "",
      email: accountInfo.email || "",
      phoneNumber: accountInfo.phoneNumber || "",
      address: accountInfo.address || "",
    })
    setIsEditModalOpen(true)
  }

  const closeEditModal = () => {
    setIsEditModalOpen(false)
  }

  const handleEditInputChange = (e) => {
    const { name, value } = e.target
    setEditAccountInfo((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSaveAccountInfo = async () => {
    try {
      if (!user || !user.customerID) {
        alert("Không tìm thấy thông tin người dùng. Vui lòng đăng nhập lại.")
        return
      }
      const response = await axiosInstance.put("/api/customer", {
        customerID: user.customerID,
        ...editAccountInfo,
      })

      if (response.data.EC === 1) {
        alert("Thông tin tài khoản đã được cập nhật thành công!")
        setIsEditModalOpen(false)
        setAccountInfo(editAccountInfo)
        updateUser({
          ...user,
          ...editAccountInfo,
        })
      } else {
        alert(response.data.EM || "Có lỗi xảy ra khi cập nhật thông tin.")
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật thông tin tài khoản:", error)
      alert("Lỗi server khi cập nhật thông tin.")
    }
  }

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <p className="text-sm text-gray-500 mb-6">
          <Link to={path.home} className="text-blue-500 hover:underline">
            Home
          </Link>
          {" / "}
          {location.pathname === path.profile && "My Dashboard"}
          {location.pathname === `${path.profile}/my-orders` && "My Orders"}
          {location.pathname === `${path.profile}/account-information` && "Account Information"}
        </p>
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">My Dashboard</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar - This stays the same for all tabs */}
          <div className="bg-white rounded-md shadow-md p-4">
            <h2 className="text-lg font-semibold text-gray-700 mb-4"></h2>
            <ul className="space-y-2">
              <li>
                <Link
                  to={path.profile}
                  className={`block text-gray-700 hover:text-gray-900 ${location.pathname === path.profile ? "font-bold" : ""}`}
                >
                  Account Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to={`${path.profile}/account-information`}
                  className={`block text-gray-700 hover:text-gray-900 ${location.pathname === `${path.profile}/account-information` ? "font-bold" : ""}`}
                >
                  Account Information
                </Link>
              </li>
              <li>
                <Link
                  to={`${path.profile}/address-book`}
                  className={`block text-gray-700 hover:text-gray-900 ${location.pathname === `${path.profile}/address-book` ? "font-bold" : ""}`}
                >
                  Address Book
                </Link>
              </li>
              <li>
                <Link
                  to={`${path.profile}/my-orders`}
                  className={`block text-gray-700 hover:text-gray-900 ${location.pathname === `${path.profile}/my-orders` ? "font-bold" : ""}`}
                >
                  My Orders
                </Link>
              </li>
              {/* ... Các link khác giữ nguyên ... */}
            </ul>

            <div className="mt-6 bg-gray-100 rounded-md p-4">
              <h3 className="text-sm font-semibold text-gray-600 mb-2">Compare Products</h3>
              <p className="text-gray-500 text-sm">You have no items to compare.</p>
            </div>

            <div className="mt-4 bg-gray-100 rounded-md p-4">
              <h3 className="text-sm font-semibold text-gray-600 mb-2">My Wish List</h3>
              <p className="text-gray-500 text-sm">You have no items in your wish list.</p>
            </div>
          </div>

          {/* Main Content - This changes based on the current route */}
          <div className="lg:col-span-3 bg-white rounded-md shadow-md p-6">
            <Routes>
              <Route path="/" element={<AccountDashboard />} />
              <Route path="/my-orders" element={<MyOrders />} />
              <Route path="/account-information" element={<AccountDashboard />} />
              <Route path="/address-book" element={<div>Address Book Content</div>} />
              <Route path="*" element={<Navigate to={path.profile} replace />} />
            </Routes>
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
                  <label htmlFor="fullName" className="block text-gray-700 text-sm font-bold mb-2">
                    Full Name:
                  </label>
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
                  <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                    Email:
                  </label>
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
                  <label htmlFor="phoneNumber" className="block text-gray-700 text-sm font-bold mb-2">
                    Phone Number:
                  </label>
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
                  <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">
                    Address:
                  </label>
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
      {isChangePasswordModalOpen && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
          id="changePasswordModal"
        >
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Đổi Mật Khẩu</h3>
              <div className="mt-2">
                <div>
                  <label htmlFor="currentPassword" className="block text-gray-700 text-sm font-bold mb-2">
                    Mật khẩu hiện tại:
                  </label>
                  <input
                    type="password"
                    id="currentPassword"
                    name="currentPassword"
                    value={currentPassword}
                    onChange={handlePasswordInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="mt-4">
                  <label htmlFor="newPassword" className="block text-gray-700 text-sm font-bold mb-2">
                    Mật khẩu mới:
                  </label>
                  <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    value={newPassword}
                    onChange={handlePasswordInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="mt-4">
                  <label htmlFor="confirmNewPassword" className="block text-gray-700 text-sm font-bold mb-2">
                    Xác nhận mật khẩu mới:
                  </label>
                  <input
                    type="password"
                    id="confirmNewPassword"
                    name="confirmNewPassword"
                    value={confirmNewPassword}
                    onChange={handlePasswordInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                {changePasswordError && <p className="text-red-500 text-xs italic mt-2">{changePasswordError}</p>}
                {changePasswordSuccess && (
                  <p className="text-green-500 text-sm italic mt-2">Đổi mật khẩu thành công!</p>
                )}
              </div>
              <div className="items-center px-4 py-3 mt-4">
                <button
                  className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  onClick={handleChangePasswordSubmit}
                >
                  Lưu Thay Đổi
                </button>
                <button
                  className="mt-2 px-4 py-2 bg-gray-200 text-gray-800 text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300"
                  onClick={handleCloseChangePasswordModal}
                >
                  Hủy
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <Support></Support>
    </div>
  )
}

export default Profile

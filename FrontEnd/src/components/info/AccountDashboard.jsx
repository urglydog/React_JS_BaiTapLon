"use client"

import { Link } from "react-router-dom"
import path from "../../constant/path"
import { useContext, useState, useRef } from "react"
import { UserContext } from "../../context/UserContext"
import axiosInstance from "../../custom/axios"

const AccountDashboard = () => {
  const { user, updateUser } = useContext(UserContext)
  const [accountInfo, setAccountInfo] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    address: user?.address || "",
  })
  const [isEditingAddress, setIsEditingAddress] = useState(false)
  const [editingAddressValue, setEditingAddressValue] = useState("")
  const addressInputRef = useRef(null)

  const handleOpenChangePasswordModal = () => {
    // Gọi hàm từ component cha thông qua props
    if (typeof window.handleOpenChangePasswordModal === "function") {
      window.handleOpenChangePasswordModal()
    }
  }

  const handleEditButtonClick = () => {
    // Gọi hàm từ component cha thông qua props
    if (typeof window.handleEditButtonClick === "function") {
      window.handleEditButtonClick()
    }
  }

  const handleEditAddressClick = () => {
    setIsEditingAddress(true)
    setEditingAddressValue(accountInfo.address)
  }

  const handleAddressInputChange = (e) => {
    setEditingAddressValue(e.target.value)
  }

  const handleSaveAddress = async () => {
    try {
      if (!user || !user.customerID) {
        alert("Không tìm thấy thông tin người dùng. Vui lòng đăng nhập lại.")
        return
      }
      const response = await axiosInstance.put("/api/customer", {
        customerID: user.customerID,
        address: editingAddressValue,
      })

      if (response.data.EC === 1) {
        alert("Địa chỉ giao hàng mặc định đã được cập nhật thành công!")
        setIsEditingAddress(false)
        setAccountInfo((prev) => ({ ...prev, address: editingAddressValue }))
        updateUser({ ...user, address: editingAddressValue })
      } else {
        alert(response.data.EM || "Có lỗi xảy ra khi cập nhật địa chỉ.")
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật địa chỉ:", error)
      alert("Lỗi server khi cập nhật thông tin.")
    }
  }

  const handleCancelEditAddress = () => {
    setIsEditingAddress(false)
  }

  const handleAddressInputKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSaveAddress()
    }
  }

  return (
    <>
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
            onClick={handleEditButtonClick}
          >
            Edit
          </button>
          <button
            className="text-blue-500 hover:text-blue-700 text-sm font-medium"
            onClick={handleOpenChangePasswordModal}
          >
            Change Password
          </button>
        </div>
      </div>

      {/* Newsletters */}
      <div className="mb-6 border-b pb-4">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Newsletters</h3>
        <p className="text-gray-600">You don't subscribe to our newsletter.</p>
        <div className="mt-2">
          <button className="text-blue-500 hover:text-blue-700 text-sm font-medium">Edit</button>
        </div>
      </div>

      {/* Address Book */}
      <div className="mb-6 border-b pb-4">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Address Book</h3>
        <Link to={`${path.profile}/manage-addresses`} className="text-blue-500 hover:text-blue-700 text-sm font-medium">
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
            {isEditingAddress ? (
              <div className="flex items-center">
                <input
                  ref={addressInputRef}
                  type="text"
                  value={editingAddressValue}
                  onChange={handleAddressInputChange}
                  onKeyPress={handleAddressInputKeyPress}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
                />
                <button
                  onClick={handleSaveAddress}
                  className="ml-2 px-3 py-1 bg-green-500 text-white text-xs font-medium rounded-md shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
                >
                  Lưu
                </button>
                <button
                  onClick={handleCancelEditAddress}
                  className="ml-2 px-3 py-1 bg-gray-300 text-gray-700 text-xs font-medium rounded-md shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
                >
                  Hủy
                </button>
              </div>
            ) : (
              <p className="text-gray-600 text-sm">{accountInfo.address}</p>
            )}
            {!isEditingAddress && (
              <button
                onClick={handleEditAddressClick}
                className="text-blue-500 hover:text-blue-700 text-sm font-medium mt-2"
              >
                Edit Address
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default AccountDashboard

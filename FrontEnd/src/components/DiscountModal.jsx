import React, { useState } from "react";

function DiscountModal({ isOpen, onClose, vouchers, onSelectVoucher, enteredCode, setEnteredCode }) {
  const [manualApplyError, setManualApplyError] = useState("");
  const [checkingVoucher, setCheckingVoucher] = useState(false);
  const [foundVoucher, setFoundVoucher] = useState(null);
  const [isExpiredVoucher, setIsExpiredVoucher] = useState(false);

  if (!isOpen) return null;

  const handleApplyManual = async () => {
    if (!enteredCode) {
      setManualApplyError("Vui lòng nhập mã giảm giá.");
      setFoundVoucher(null);
      setIsExpiredVoucher(false);
      return;
    }
    setManualApplyError("");
    setCheckingVoucher(true);
    setFoundVoucher(null);
    setIsExpiredVoucher(false);

    try {
      const response = await fetch("http://localhost:4000/api/voucher/check", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: enteredCode }),
      });

      const data = await response.json();

      if (data && data.EC === 1 && data.DT) {
        setFoundVoucher(data.DT);
        setIsExpiredVoucher(new Date(data.DT.expirationDate) < new Date());
      } else {
        setManualApplyError(data?.EM || "Mã giảm giá không hợp lệ.");
        setFoundVoucher(data?.DT || null); // Vẫn set foundVoucher nếu có data trả về
        setIsExpiredVoucher(data?.DT ? new Date(data.DT.expirationDate) < new Date() : false);
      }
    } catch (error) {
      console.error("Lỗi khi kiểm tra mã giảm giá:", error);
      setManualApplyError("Có lỗi xảy ra khi kiểm tra mã.");
      setFoundVoucher(null);
      setIsExpiredVoucher(false);
    } finally {
      setCheckingVoucher(false);
    }
  };

  const handleSelectFoundVoucher = () => {
    if (foundVoucher && !isExpiredVoucher) {
      onSelectVoucher(foundVoucher.code);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md overflow-y-auto max-h-screen">
        <h2 className="text-xl font-semibold mb-4">Chọn hoặc Nhập Mã Giảm Giá</h2>

        {/* Input nhập mã giảm giá */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Nhập mã giảm giá (nếu có)"
            className="w-full border p-2 rounded mb-2"
            value={enteredCode}
            onChange={(e) => setEnteredCode(e.target.value)}
            disabled={checkingVoucher}
          />
          <button
            onClick={handleApplyManual}
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            disabled={checkingVoucher}
          >
            {checkingVoucher ? "Đang kiểm tra..." : "Tìm"}
          </button>
          {manualApplyError && <p className="text-red-500 text-sm mt-1">{manualApplyError}</p>}
          {foundVoucher && (
            <div className={`mt-2 p-3 border rounded-md ${isExpiredVoucher ? 'bg-red-100' : 'bg-green-100'}`}>
              <p className={`font-semibold ${isExpiredVoucher ? 'text-red-700' : 'text-green-700'}`}>
                {isExpiredVoucher ? 'Mã đã hết hạn!' : 'Mã hợp lệ!'}
              </p>
              <p className={isExpiredVoucher ? 'text-red-700' : ''}>Mã: {foundVoucher.code}</p>
              <p className={isExpiredVoucher ? 'text-red-700' : ''}>Giảm: {foundVoucher.discount}%</p>
              <p className={isExpiredVoucher ? 'text-red-700' : ''}>
                Hết hạn: {new Date(foundVoucher.expirationDate).toLocaleDateString()}
              </p>
              {isExpiredVoucher ? (
                <p className="text-red-500 text-sm mt-2">Voucher này đã hết hạn và không thể áp dụng.</p>
              ) : (
                <button
                  onClick={handleSelectFoundVoucher}
                  className="w-full py-2 px-4 rounded-md text-sm mt-2 bg-green-500 text-white hover:bg-green-600"
                >
                  Áp dụng mã này
                </button>
              )}
            </div>
          )}
        </div>

        <hr className="my-4" />

        {/* Danh sách các voucher hiện có */}
        <h3 className="text-lg font-semibold mb-2">Các Mã Giảm Giá Hiện Có</h3>
        <div className="max-h-96 overflow-y-auto">
          {vouchers.length === 0 ? (
            <p className="text-gray-500">Không có mã giảm giá nào.</p>
          ) : (
            <ul className="space-y-2">
              {vouchers.map((voucher) => (
                <li
                  key={voucher.voucherId}
                  className="border rounded-md p-3 flex items-center justify-between hover:bg-gray-100 cursor-pointer"
                  onClick={() => onSelectVoucher(voucher.code)}
                >
                  <div>
                    <div className="font-semibold">{voucher.code}</div>
                    <div className="text-sm text-gray-600">
                      Giảm {voucher.discount}% - Hết hạn: {new Date(voucher.expirationDate).toLocaleDateString()}
                    </div>
                  </div>
                  <button className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 text-sm">
                    Chọn
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Nút đóng modal */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}

export default DiscountModal;
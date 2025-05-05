import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import a1 from "../../assets/images/aboutus/anh1.png";
import a2 from "../../assets/images/aboutus/anh2.png";
import a3 from "../../assets/images/aboutus/anh3.png";
import a4 from "../../assets/images/aboutus/anh4.png";
import a5 from "../../assets/images/aboutus/anh5.png";

export default function AboutUs() {
  const [testimonials, setTestimonials] = useState([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch reviews từ API
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const token = localStorage.getItem('token'); // Lấy token từ localStorage
        if (!token) {
          throw new Error("Vui lòng đăng nhập để xem đánh giá");
        }

        const response = await fetch("http://localhost:4000/reviews", {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Không thể lấy danh sách đánh giá");
        }

        const data = await response.json();
        console.log("API Response:", data); // Kiểm tra toàn bộ response
console.log("Data.DT:", data.DT); // Kiểm tra dữ liệu đánh giá
        if (data.EC === 1) {
          // Ánh xạ dữ liệu API thành định dạng testimonials
          const formattedTestimonials = data.DT.map(review => ({
            comment: review.comment,
            customerName: review.customerName,
          }));
          setTestimonials(formattedTestimonials);
        } else {
          throw new Error(data.EM || "Lỗi từ server");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  // Chuyển đến đánh giá trước
  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Chuyển đến đánh giá tiếp theo
  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Breadcrumb navigation */}
      <div className="bg-white py-2 text-sm text-gray-600 px-4">
        <Link
          to="/"
          className="hover:text-blue-600"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          Home
        </Link>
        <span className="mx-1">/</span>
        <span>About us</span>
      </div>
      
      {/* Main Content */}
      <div className="flex flex-col">
        {/* About Us header */}
        <div className="px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-800">About Us</h1>
        </div>
        
        {/* A Family That Keeps On Growing */}
        <section className="bg-black text-white py-12">
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-6">
              <h2 className="text-2xl font-bold mb-4">A Family That Keeps On Growing</h2>
              <p className="mb-4">
                We strive daily to please the home market, supplying great computers and hardware at great prices to non-corporate customers, through our large Melbourne CBD showroom and our online store.
              </p>
              <p>
                Shop management employs people with computing experience, not salespeople on commission. We prefer to assist with a friendly, warm and educational rather than ruthless pitch. Every member of our friendly staff loves computers.
              </p>
            </div>
            <div className="md:w-1/2 mt-6 md:mt-0">
              <div className="p-4 rounded-lg">
                <img src={a1} alt="Shop interior" className="w-full rounded-lg" />
              </div>
            </div>
          </div>
        </section>
        
        {/* Shop.com */}
        <section className="py-12">
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-6">
              <img src={a2} alt="Keyboard" className="w-full rounded-lg" />
            </div>
            <div className="md:w-1/2 mt-6 md:mt-0">
              <div className="flex items-center mb-4">
                <div className="bg-blue-600 text-white rounded-full p-2 mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800">Shop.com</h3>
              </div>
              <p className="mb-4 text-gray-600">
                Shop.com is a proudly Australian owned, Melbourne based retailer of IT goods and services, operating since 1991. Our clients include home and business users, education institutions and government organizations. We provide complete business IT solutions, centered on high quality hardware and exceptional customer service.
              </p>
            </div>
          </div>
        </section>
        
        {/* Now You're In Safe Hands */}
        <section className="bg-black text-white py-12">
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-6">
              <div className="flex items-center mb-4">
                <div className="bg-blue-600 text-white rounded-full p-2 mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6.625 2.655A9 9 0 0119 11a1 1 0 11-2 0 7 7 0 00-9.625-6.492 1 1 0 11-.75-1.853zM4.662 4.959A1 1 0 014.75 6.37 6.97 6.97 0 003 11a1 1 0 11-2 0 8.97 8.97 0 012.25-5.953 1 1 0 011.412-.088z" clipRule="evenodd" />
                    <path fillRule="evenodd" d="M5 11a5 5 0 1110 0 1 1 0 11-2 0 3 3 0 10-6 0c0 1.677-.345 3.276-.968 4.729a1 1 0 11-1.838-.789A9.964 9.964 0 005 11z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Now You're In Safe Hands</h3>
              </div>
              <p className="mb-4">
                Experience a shift boost in computing from last generation, Intel Alder Lake the 12th Gen Intel® Core™ processors with the upmost computing power to bring you an unparalleled gaming experience.
              </p>
              <p className="text-sm italic">*Performance compared to i7-11700. Specs varies by model.</p>
            </div>
            <div className="md:w-1/2 mt-6 md:mt-0">
              <img src={a3} alt="Gaming PC with green lighting" className="w-full rounded-lg" />
            </div>
          </div>
        </section>
        
        {/* The Highest Quality of Products */}
        <section className="py-12">
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-6">
              <img src={a4} alt="PC case with RGB lighting" className="w-full rounded-lg" />
            </div>
            <div className="md:w-1/2 mt-6 md:mt-0">
              <div className="flex items-center mb-4">
                <div className="bg-blue-600 text-white rounded-full p-2 mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800">The Highest Quality of Products</h3>
              </div>
              <p className="mb-4 text-gray-600">
                We guarantee the highest quality of the products we sell. Several decades of successful operation and millions of happy customers let us feel certain about that. Besides, all items we sell pass thorough quality control, so no characteristics mismatch can escape the eye of our professionals.
              </p>
            </div>
          </div>
        </section>
        
        {/* We Deliver to Any Regions */}
        <section className="bg-black text-white py-12">
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-6">
              <div className="flex items-center mb-4">
                <div className="bg-blue-600 text-white rounded-full p-2 mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                    <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7h4a1 1 0 011 1v6h-2.05a2.5 2.5 0 01-4.9 0H14V7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">We Deliver to Any Regions</h3>
              </div>
              <p className="mb-4">
                We deliver our goods all across Australia. No matter where you live, your order will be shipped in the next business day after receiving payment. The packages are handled with utmost care, so the ordered products will be handed to you safe and sound, just like you expect them to be.
              </p>
            </div>
            <div className="md:w-1/2 mt-6 md:mt-0">
              <img src={a5} alt="Gaming PC with blue lighting" className="w-full rounded-lg" />
            </div>
          </div>
        </section>
        
        {/* Testimonials */}
        <section className="py-12 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">Khách Hàng Nói Gì</h2>
            <div className="max-w-4xl mx-auto">
              {loading ? (
                <p className="text-lg text-gray-600 text-center">Đang tải đánh giá...</p>
              ) : error ? (
                <p className="text-lg text-red-600 text-center">{error}</p>
              ) : testimonials.length === 0 ? (
                <p className="text-lg text-gray-600 text-center">Chưa có đánh giá nào.</p>
              ) : (
                <div className="relative bg-gray-50 p-6 rounded-lg shadow-md">
                  <button
                    onClick={prevSlide}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-blue-600 transition-colors"
                  >
                    &lt;
                  </button>
                  <div className="text-center">
                    <blockquote className="text-lg italic text-gray-800 mb-2">
                      "{testimonials[current].comment}"
                    </blockquote>
                    <p className="text-gray-600 font-medium">— {testimonials[current].customerName}</p>
                  </div>
                  <button
                    onClick={nextSlide}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-blue-600 transition-colors"
                  >
                    &gt;
                  </button>
                </div>
              )}
              <div className="mt-8 text-center">
                <button className="border border-gray-500 text-gray-700 px-4 py-2 rounded text-sm hover:bg-gray-100 transition-colors">
                  Leave Us A Review
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
import Slideshow from "../Slideshow";
import ProductSlider from "../product/ProductSlider";
import ProductCard from "../product/ProductCard";
import customer_builds from "../../assets/images/custom_buid.webp";
import msi_series from "../../assets/images/msi_series.jpg";
import desktops from "../../assets/images/desktop.jpg";
import monitors from "../../assets/images/msi_monitor.jpg";
import { UserContext } from "../../context/UserContext";

import slide from "../../assets/images/slide.png";
import CategoriesProduct from "../product/CategoriesProduct";
import SeriesNav from "../product/SeriesNav";

// Import logo
import logo1 from "../../assets/images/logo/logo_roccat.svg";
import logo2 from "../../assets/images/logo/logo_msi.svg";
import logo3 from "../../assets/images/logo/logo_razer.svg";
import logo4 from "../../assets/images/logo/logo_thermaltake.svg";
import logo5 from "../../assets/images/logo/logo_adata.svg";
import logo6 from "../../assets/images/logo/logo_hp.svg";
import logo7 from "../../assets/images/logo/logo_gigabytes.svg";
import CardNews from "../info/CardNews";
import TestimonialSlider from "../info/TestimonialSlider";

import product1 from "../../assets/images/banner.png";
import product2 from "../../assets/images/banner.png";
import TestimonialCard from "../info/TestimonialCard";
import { useEffect, useState } from "react";
function Content() {
  // const { user } = React.useContext(UserContext);

  const [products, setProducts] = useState([]);
  // Get products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          // "http://localhost:4000/api/product/getAllProducts"
          "http://localhost:4000/api/product/getAllProductsWithDetails"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(
          data.DT.map((item) => ({
            ...item,
            inStock: item.availability === "In Stock" ? true : false,
          }))
        ); // Assuming availability is a string);
        console.log("Fetched products:", data.DT);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const SupportCard = ({ icon, title, description }) => {
    return (
      <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 max-w-xs mx-auto">
        <div className="mb-4 p-3 bg-blue-100 rounded-full">{icon}</div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    );
  };

  const supportItems = [
    {
      icon: (
        <svg
          className="w-8 h-8 text-blue-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
      title: "Product Support",
      description:
        "Up to 3 years on-site warranty available for your peace of mind.",
    },
    {
      icon: (
        <svg
          className="w-8 h-8 text-blue-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
      title: "Personal Account",
      description:
        "With big discounts, free delivery and a dedicated support specialist.",
    },
    {
      icon: (
        <svg
          className="w-8 h-8 text-blue-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      title: "Amazing Savings",
      description:
        "Up to 70% off new Products, you can be sure of the best price.",
    },
  ];

  return (
    <>
      {/* Banner */}
      <Slideshow /> {/* Assuming you have a Slideshow component */}
      {/* New product */}
      <div className="py-6 max-w-screen-xl mx-auto">
        <h2 className="text-xl font-bold mb-4">New Products</h2>
        <div className="w-full overflow-x-hidden">
          <div className="grid grid-cols-1">
            <ProductSlider
              products={products.filter(
                (item) =>
                  new Date(item.createdAt).getMonth() === new Date().getMonth()
              )}
              autoPlay={true}
              interval={4000}
              visibleCount={5}
            />
          </div>
        </div>
        <div className="text-right mt-4">
          <a href="#" className="text-sm text-blue-600 hover:underline">
            See All New Products
          </a>
        </div>
      </div>
      {/* slide */}
      <div className="w-full max-w-screen-xl mx-auto mt-4 rounded-md overflow-hidden shadow-md">
        <img src={slide} alt="" />
      </div>
      {/* customer_builds */}
      <div className="flex gap-4 max-w-screen-xl mx-auto py-6">
        {/* Left - CategoriesProduct chiếm 20% hoặc min-w */}
        <div className="w-[20%] min-w-[120px]">
          <CategoriesProduct image={customer_builds} />
        </div>

        {/* Right - Products list chiếm 80% */}
        <div className="w-full overflow-x-hidden">
          <div className="grid grid-cols-1">
            <ProductSlider
              products={products.filter((item) => item.categoryName === "PC")} // Test lấy categoryName là "Smartphones"
              autoPlay={true}
              interval={4000}
              visibleCount={5}
            />
          </div>
        </div>
      </div>
      {/* MSI Series */}
      <div className="w-full max-w-screen-xl mx-auto mt-4 rounded-md overflow-hidden">
        <SeriesNav
          series={[
            ...new Set(
              products
                .filter(
                  (item) =>
                    item.categoryName === "Laptop" && item.brandName === "MSI"
                )
                .map((item) => item.seriesName)
            ),
          ]}
        />
        <div className="flex gap-4 max-w-screen-xl mx-auto py-6">
          {/* Left - CategoriesProduct chiếm 20% hoặc min-w */}
          <div className="w-[20%] min-w-[120px]">
            <CategoriesProduct image={msi_series} text="MSI Laptops" />
          </div>

          {/* Right - Products list chiếm 80% */}
          <div className="w-full overflow-x-hidden">
            <div className="grid grid-cols-1">
              <ProductSlider
                products={products.filter(
                  (item) =>
                    item.categoryName === "Laptop" && item.brandName === "MSI"
                )} // Test lấy categoryName là "Laptop"
                autoPlay={true}
                interval={4000}
                visibleCount={5}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Desktops */}
      <div className="w-full max-w-screen-xl mx-auto mt-4 rounded-md overflow-hidden">
        <SeriesNav
          series={[
            ...new Set(
              products
                .filter((item) => item.categoryName === "Case")
                .map((item) => item.seriesName)
            ),
          ]}
        />
        <div className="flex gap-4 max-w-screen-xl mx-auto py-6">
          {/* Left - CategoriesProduct chiếm 20% hoặc min-w */}
          <div className="w-[20%] min-w-[120px]">
            <CategoriesProduct image={desktops} text="Desktops" />
          </div>

          {/* Right - Products list chiếm 80% */}
          <div className="w-full overflow-x-hidden">
            <div className="grid grid-cols-1">
              <ProductSlider
                products={products.filter(
                  (item) => item.categoryName === "Case"
                )}
                autoPlay={true}
                interval={4000}
                visibleCount={5}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Gaming Monitors */}
      <div className="w-full max-w-screen-xl mx-auto mt-4 rounded-md overflow-hidden">
        <div className="flex gap-4 max-w-screen-xl mx-auto py-6">
          {/* Left - CategoriesProduct chiếm 20% hoặc min-w */}
          <div className="w-[20%] min-w-[120px]">
            <CategoriesProduct image={monitors} text="Gaming Monitors" />
          </div>

          {/* Right - Products list chiếm 80% */}
          <div className="w-full overflow-x-hidden">
            <div className="grid grid-cols-1">
              <ProductSlider
                products={products.filter(
                  (item) => item.categoryName === "screen"
                )}
                autoPlay={true}
                interval={4000}
                visibleCount={5}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Logo group */}
      <div className="w-full max-w-screen-xl mx-auto mt-4 rounded-md overflow-hidden">
        <div className="flex gap-4 max-w-screen-xl mx-auto py-6">
          <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            <img src={logo1} alt="" className="h-40 object-contain" />
            <img src={logo2} alt="" className="h-40 object-contain" />
            <img src={logo3} alt="" className="h-40 object-contain" />
            <img src={logo4} alt="" className="h-40 object-contain" />
            <img src={logo5} alt="" className="h-40 object-contain" />
            <img src={logo6} alt="" className="h-40 object-contain" />
            <img src={logo7} alt="" className="h-40 object-contain" />
          </div>
        </div>
      </div>
      {/* Follow us on Instagram for News, Offers & More */}
      <div className="w-full max-w-screen-xl mx-auto mt-4 rounded-md overflow-hidden">
        <h2 className="text-xl font-bold mb-4">
          Follow us on Instagram for News, Offers & More
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          <CardNews
            title="Your Custom Title"
            excerpt="Your custom excerpt text here..."
            date="15.10.2023"
            imageUrl={monitors}
          />
          <CardNews
            title="Your Custom Title"
            excerpt="Your custom excerpt text here..."
            date="15.10.2023"
            imageUrl={monitors}
          />
          <CardNews
            title="Your Custom Title"
            excerpt="Your custom excerpt text here..."
            date="15.10.2023"
            imageUrl={monitors}
          />
          <CardNews
            title="Your Custom Title"
            excerpt="Your custom excerpt text here..."
            date="15.10.2023"
            imageUrl={monitors}
          />
          <CardNews
            title="Your Custom Title"
            excerpt="Your custom excerpt text here..."
            date="15.10.2023"
            imageUrl={monitors}
          />
          <CardNews
            title="Your Custom Title"
            excerpt="Your custom excerpt text here..."
            date="15.10.2023"
            imageUrl={monitors}
          />
          <CardNews
            title="Your Custom Title"
            excerpt="Your custom excerpt text here..."
            date="15.10.2023"
            imageUrl={monitors}
          />
        </div>
      </div>
      {/*FeedBack  */}
      <div className="w-full max-w-screen-xl mx-auto mt-4 rounded-md overflow-hidden">
        {/* <TestimonialCard
          testimonial="My first order arrived today in perfect condition.  From the time I sent a question about the item to making the purchase, to the shipping and now the delivery, your company, Tecs, has stayed in touch.  Such great service.  I look forward to shopping on your site in the future and would highly recommend it."
          author="Trương Thanh Tùng"
          buttonText="Viết đánh giá"
          onButtonClick={() => console.log("Clicked review button")}
        /> */}

        <TestimonialSlider
          testimonials={[
            {
              id: 1,
              text: "Đánh giá 1...",
              author: "Người dùng 1",
            },
            {
              id: 2,
              text: "Đánh giá 2...",
              author: "Người dùng 2",
            },
          ]}
          autoPlay={true}
          interval={3000} // 3 giây
        />
      </div>
      {/* Support */}
      <div className="py-12 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {supportItems.map((item, index) => (
              <SupportCard
                key={index}
                icon={item.icon}
                title={item.title}
                description={item.description}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Content;

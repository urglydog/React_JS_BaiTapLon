import Slideshow from "../Slideshow"
import ProductSlider from "../product/ProductSlider"
import ProductCard from "../product/ProductCard";
import customer_builds from "../../assets/images/custom_buid.webp";
import msi_series from "../../assets/images/msi_series.jpg";
import desktops from "../../assets/images/desktop.jpg";
import monitors from "../../assets/images/msi_monitor.jpg";
import { UserContext } from "../../context/UserContext"

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
import CardNews from "../info/CardNews"
import TestimonialSlider from "../info/TestimonialSlider";

import product1 from "../../assets/images/banner.png";
import product2 from "../../assets/images/banner.png";
import TestimonialCard from "../info/TestimonialCard";
import Support from "../Support/Support";
function Content(){
    // const { user } = React.useContext(UserContext);

    const products = [
      {
        id: 1,
        image: product1,
        name: "EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTITOUCH All-In-One",
        inStock: true,
        reviews: 4,
        oldPrice: 499,
        price: 499,
      },
      {
        id: 2,
        image: product2,
        name: "EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTITOUCH All-In-One",
        inStock: false,
        reviews: 4,
        oldPrice: 499,
        price: 499,
      },
      {
        id: 3,
        image: product2,
        name: "EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTITOUCH All-In-One",
        inStock: false,
        reviews: 4,
        oldPrice: 499,
        price: 499,
      },
      {
        id: 4,
        image: product2,
        name: "EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTITOUCH All-In-One",
        inStock: false,
        reviews: 4,
        oldPrice: 499,
        price: 499,
      },
      {
        id: 5,
        image: product2,
        name: "EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTITOUCH All-In-One",
        inStock: false,
        reviews: 4,
        oldPrice: 499,
        price: 499,
      },
      {
        id: 6,
        image: product2,
        name: "EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTITOUCH All-In-One",
        inStock: false,
        reviews: 4,
        oldPrice: 499,
        price: 499,
      },
      {
        id: 7,
        image: product2,
        name: "EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTITOUCH All-In-One",
        inStock: false,
        reviews: 4,
        oldPrice: 499,
        price: 499,
      },
      {
        id: 8,
        image: product2,
        name: "EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTITOUCH All-In-One",
        inStock: false,
        reviews: 4,
        oldPrice: 499,
        price: 499,
      },
      // Thêm sản phẩm khác tương tự
    ];
  

  

    return (
        <>
                  {/* Banner */}
      <Slideshow /> {/* Assuming you have a Slideshow component */}
      {/* New product */}
      <div className="py-6 max-w-screen-xl mx-auto">
        <h2 className="text-xl font-bold mb-4">New Products</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 ">
          {/* {products.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))} */}
          <ProductSlider
            products={products}
            autoPlay={true}
            interval={4000}
            visibleCount={5}
          />
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
        <div className="w-full">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {products.map((product) => (
              <ProductCard product={product} key={product.id} />
            ))}
          </div>
        </div>
      </div>
      {/* MSI Series */}
      <div className="w-full max-w-screen-xl mx-auto mt-4 rounded-md overflow-hidden">
        <SeriesNav />
        <div className="flex gap-4 max-w-screen-xl mx-auto py-6">
          {/* Left - CategoriesProduct chiếm 20% hoặc min-w */}
          <div className="w-[20%] min-w-[120px]">
            <CategoriesProduct image={msi_series} text="MSI Laptops" />
          </div>

          {/* Right - Products list chiếm 80% */}
          <div className="w-full">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {products.map((product) => (
                <ProductCard product={product} key={product.id} />
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Desktops */}
      <div className="w-full max-w-screen-xl mx-auto mt-4 rounded-md overflow-hidden">
        <SeriesNav
          series={[
            "MSI Infinute Series",
            "MSI Triden",
            "MSI GL Series",
            "MSI Nightblade",
          ]}
        />
        <div className="flex gap-4 max-w-screen-xl mx-auto py-6">
          {/* Left - CategoriesProduct chiếm 20% hoặc min-w */}
          <div className="w-[20%] min-w-[120px]">
            <CategoriesProduct image={desktops} text="Desktops" />
          </div>

          {/* Right - Products list chiếm 80% */}
          <div className="w-full">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {products.map((product) => (
                <ProductCard product={product} key={product.id} />
              ))}
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
          <div className="w-full">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {products.map((product) => (
                <ProductCard product={product} key={product.id} />
              ))}
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
        <Support></Support>
        </>
    )
}

export default Content;
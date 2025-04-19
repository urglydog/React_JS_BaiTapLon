import React from 'react';
import a1 from "../../assets/images/aboutus/anh1.png"
import a2 from "../../assets/images/aboutus/anh2.png"
import a3 from "../../assets/images/aboutus/anh3.png"
import a4 from "../../assets/images/aboutus/anh4.png"
import a5 from "../../assets/images/aboutus/anh5.png"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; 
export default function AboutUs() {
    const [current, setCurrent] = useState(0);

    // Auto slide every 5s
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrent((prev) => (prev + 1) % testimonials.length);
      }, 5000);
      return () => clearInterval(interval);
    }, []);
    const testimonials = [
        {
          quote:
            "My first order arrived today in perfect condition. From the time I sent a question about the item to making the purchase, to the shipping and now the delivery, your company, Nick, has helped tremendously. Such great service. I look forward to shopping on your site in the future and would highly recommend.",
          author: "Derek Brown",
        },
        {
          quote:
            "Fast shipping, great quality, and amazing customer service! I couldn't be happier with my purchase.",
          author: "Sarah Lee",
        },
        {
          quote:
            "Excellent experience from start to finish. I appreciate the attention to detail and quick response time.",
          author: "Michael Nguyen",
        },
      ];
      
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Navigation paths */}
      <div className="bg-white py-2 text-sm text-gray-600 px-4">
      <Link
                to="/"
                
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                Home
              </Link>
              <span>/About us</span>
      </div>
      
      {/* Main Content */}
      <div className="flex flex-col">
        {/* About Us header */}
        <div className="px-4 py-6">
          <h1 className="text-3xl font-bold">About Us</h1>
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
              <div className=" p-4 rounded-lg">
                <img src={a1} alt="Shop interior" className="w-full rounded" />
              </div>
            </div>
          </div>
        </section>
        
        {/* Shop.com */}
        <section className="py-12">
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-6">
              <img src={a2} alt="Keyboard" className="w-full" />
            </div>
            <div className="md:w-1/2 mt-6 md:mt-0">
              <div className="flex items-center mb-4">
                <div className="bg-blue-600 text-white rounded-full p-2 mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Shop.com</h3>
              </div>
              <p className="mb-4">
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
              <img src={a3} alt="Gaming PC with green lighting" className="w-full" />
            </div>
          </div>
        </section>
        
        {/* The Highest Quality of Products */}
        <section className="py-12">
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-6">
              <img src={a4} alt="PC case with RGB lighting" className="w-full" />
            </div>
            <div className="md:w-1/2 mt-6 md:mt-0">
              <div className="flex items-center mb-4">
                <div className="bg-blue-600 text-white rounded-full p-2 mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">The Highest Quality of Products</h3>
              </div>
              <p className="mb-4">
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
              <img src={a5} alt="Gaming PC with blue lighting" className="w-full" />
            </div>
          </div>
        </section>
        
        {/* Testimonials */}
        <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-gray-400 mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
              />
            </svg>
          </div>

          <blockquote className="text-lg italic mb-6">
            "{testimonials[current].quote}"
          </blockquote>
          <p className="font-bold">— {testimonials[current].author}</p>

          {/* Indicator */}
          <div className="flex justify-center mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`h-2 w-2 mx-1 rounded-full transition-colors duration-300 ${
                  index === current ? "bg-blue-600" : "bg-gray-300"
                }`}
              ></button>
            ))}
          </div>

          <div className="mt-8">
            <button className="border border-gray-500 text-gray-700 px-4 py-2 rounded text-sm">
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
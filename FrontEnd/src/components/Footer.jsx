import React from "react";

import logo_facebook from "../assets/images/logo/logo_facebook_footer.svg";
import logo_instagram from "../assets/images/logo/logo_insta_footer.svg";

import logo1 from "../assets/images/logo/logo_paypal_footer.svg";
import logo2 from "../assets/images/logo/logo_visa_footer.svg";
import logo3 from "../assets/images/logo/logo_maestro_footer.svg";
import logo4 from "../assets/images/logo/logo_discover_footer.svg";
import logo5 from "../assets/images/logo/logo_american-express_footer.svg";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-300 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Newsletter Section */}
        <div className="mb-12 text-center flex justify-between">
          <div className="text-start">
            <h3 className="text-4xl font-bold text-white mb-4">
              Sign Up To Our Newsletter.
            </h3>
            <p className="mb-6">
              Be the first to hear about the latest offers.
            </p>
          </div>
          <div className="flex justify-center gap-4 h-12 ">
            <input
              type="email"
              placeholder="Your Email"
              className="px-4 py-2 w-100 rounded-md focus:outline-none text-white border-2"
            />
            <button className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-4xl text-white font-medium cursor-pointer transition duration-200 ">
              Subscribe
            </button>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
          {/* Column 1 */}
          <div>
            <h4 className="text-white font-bold mb-4">Information</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-white">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  About Zip
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Private Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Search
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Terms
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Orders and Returns
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Advanced Search
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Newsletter Subscription
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h4 className="text-white font-bold mb-4">PC Parts</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-white">
                  CPUS
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Add On Cards
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Hard Drives (Internal)
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Graphic Cards
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Keyboards / Mice
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Cases / Power Supplies / Cooling
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  RAM (Memory)
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Software
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Speakers / Headsets
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Motherboards
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Desktop PCs</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-white">
                  CPUS
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Custom PCs
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Servers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  MSI All-In-One PCs
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  HP/Compaq PCs
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  ASUS PCs
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Tecs PCs
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h4 className="text-white font-bold mb-4">Laptops</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-white">
                  Everyday Use Notebooks
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  MSI Workstation Series
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  MSI Prestige Series
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Tablets and Pads
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Netbooks
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Infinity Gaming Notebooks
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4 - Contact Info */}
          <div>
            <h4 className="text-white font-bold mb-4">Address</h4>
            <address className="not-italic">
              <p className="mb-2">
                Address: 1234 Street, Adress City Address, 1234
              </p>
              <p className="mb-2">
                Phone: <span className="text-blue-600">(00) 1234 5699</span>
              </p>
              <p className="mb-2">We are open:</p>
              <ul
                className="list-disc list-inside mb-4"
                style={{ listStyleType: "none" }}
              >
                <li>Monday - Thursday: 6:00 AM - 5:00 PM</li>
                <li>Friday: 9:00 AM - 8:00 PM</li>
                <li>Saturday: 10:00 AM - 5:00 PM</li>
              </ul>
              <p>
                E-mail: <span className="text-blue-600">blog@email.com</span>
              </p>
            </address>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Social Icons */}
            <div className="flex gap-4">
              <img src={logo_facebook} alt="Facebook" className="h-6" />
              <img src={logo_instagram} alt="Instagram" className="h-6" />
            </div>

            {/* Payment Icons */}
            <div className="flex gap-4">
              <img src={logo1} alt="Paypal" className="h-6" />
              <img src={logo2} alt="Visa" className="h-6" />
              <img src={logo3} alt="Maestro" className="h-6" />
              <img src={logo4} alt="Discover" className="h-6" />
              <img src={logo5} alt="American Express" className="h-6" />
            </div>

            {/* Copyright Text */}
            <div>
              <p>Copyright © 2020 DeepPty, LLC</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

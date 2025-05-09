import { Link } from "react-router-dom";
import path from "../../constant/path";

export default function AccountInformation() {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Account Information
      </h2>

      {/* Contact Information */}
      <div className="mb-6 border-b pb-4">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          Contact Information
        </h3>
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
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          Newsletters
        </h3>
        <p className="text-gray-600">You don't subscribe to our newsletter.</p>
        <div className="mt-2">
          <button className="text-blue-500 hover:text-blue-700 text-sm font-medium">
            Edit
          </button>
        </div>
      </div>

      {/* Address Book */}
      <div className="mb-6 border-b pb-4">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          Address Book
        </h3>
        <Link
          to={`${path.profile}/manage-addresses`} // Example sub-route
          className="text-blue-500 hover:text-blue-700 text-sm font-medium"
        >
          Manage Addresses
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {/* Default Billing Address */}
          <div>
            <h4 className="text-md font-semibold text-gray-700 mb-2">
              Default Billing Address
            </h4>
            <p className="text-gray-600 text-sm">
              You have not set a default billing address.
            </p>
            <Link
              to={`${path.profile}/edit-billing-address`} // Example sub-route
              className="text-blue-500 hover:text-blue-700 text-sm font-medium mt-2"
            >
              Edit Address
            </Link>
          </div>

          {/* Default Shipping Address */}
          <div>
            <h4 className="text-md font-semibold text-gray-700 mb-2">
              Default Shipping Address
            </h4>
            <p className="text-gray-600 text-sm">
              You have not set a default shipping address.
            </p>
            <Link
              to={`${path.profile}/edit-shipping-address`} // Example sub-route
              className="text-blue-500 hover:text-blue-700 text-sm font-medium mt-2"
            >
              Edit Address
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

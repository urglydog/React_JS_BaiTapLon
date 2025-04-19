import ProductCard from "./ProductCardGroup";

import productImage1 from "../../../assets/images/products/product1.png";
import productImage2 from "../../../assets/images/products/product2.png";
import productImage3 from "../../../assets/images/products/product3.png";

const sampleProducts = [
  {
    id: 1,
    name: "EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTITOUCH All-In-On...",
    image: productImage1, // Replace with real image
    price: 499,
    oldPrice: 499,
    rating: 4,
    reviews: 4,
    inStock: true,
  },
  {
    id: 2,
    name: "EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTITOUCH All-In-On...",
    image: productImage2,
    price: 499,
    oldPrice: 499,
    rating: 4,
    reviews: 4,
    inStock: true,
  },
  {
    id: 3,
    name: "EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTITOUCH All-In-On...",
    image: productImage3,
    price: 499,
    oldPrice: 499,
    rating: 4,
    reviews: 4,
    inStock: true,
  },
  {
    id: 4,
    name: "EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTITOUCH All-In-On...",
    image: productImage1,
    price: 499,
    oldPrice: 499,
    rating: 4,
    reviews: 4,
    inStock: true,
  },
  {
    id: 5,
    name: "EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTITOUCH All-In-On...",
    image: productImage2,
    price: 499,
    oldPrice: 499,
    rating: 4,
    reviews: 4,
    inStock: true,
  },
];

export default function ProductGroupCatalog() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {sampleProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

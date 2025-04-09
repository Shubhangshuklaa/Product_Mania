import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { StarIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarOutlineIcon } from '@heroicons/react/24/outline';
import api from '../services/api';

interface Product {
  _id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  image?: string;
}

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  // Try to get the product from the Redux store first
  const storeProducts = useSelector((state: RootState) => state.products.items);
  const storeProduct = storeProducts.find((p) => p._id === id);

  useEffect(() => {
    const fetchProduct = async () => {
      // If we already have the product in the store, use that
      if (storeProduct) {
        setProduct(storeProduct);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await api.get(`/products/${id}`);
        setProduct(response.data);
        setError(null);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to fetch product details');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, storeProduct]);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQuantity(parseInt(e.target.value));
  };

  const handleAddToCart = () => {
    // This would be implemented with a cart state management system
    alert(`Added ${quantity} of ${product?.name} to cart`);
  };

  // Generate an array of star ratings for display
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<StarIcon key={i} className="h-5 w-5 text-yellow-400" />);
      } else {
        stars.push(<StarOutlineIcon key={i} className="h-5 w-5 text-yellow-400" />);
      }
    }
    return stars;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 text-red-700 p-4 rounded-md mb-6">{error}</div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium text-gray-900 mb-2">Product not found</h3>
        <p className="text-gray-500">The product you're looking for doesn't exist or has been removed.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
        {/* Product Image */}
        <div className="bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center h-96">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain"
            />
          ) : (
            <div className="text-gray-400 text-center p-8">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p className="mt-2">No image available</p>
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="flex flex-col">
          <div className="mb-4">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
              {product.category}
            </span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
          <div className="flex items-center mb-4">
            <div className="flex mr-2">{renderStars(product.rating)}</div>
            <span className="text-sm text-gray-600">{product.rating.toFixed(1)} stars</span>
          </div>
          <p className="text-xl font-bold text-primary-600 mb-4">${product.price.toFixed(2)}</p>
          <div className="border-t border-b border-gray-200 py-4 my-4">
            <p className="text-gray-700 whitespace-pre-line">{product.description}</p>
          </div>

          {/* Add to Cart Section */}
          <div className="mt-auto">
            <div className="flex items-center space-x-4 mb-4">
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                Quantity
              </label>
              <select
                id="quantity"
                name="quantity"
                value={quantity}
                onChange={handleQuantityChange}
                className="input-field max-w-[100px]"
              >
                {[...Array(10)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={handleAddToCart}
              className="w-full bg-primary-600 text-white py-3 px-4 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Additional Product Information */}
      <div className="p-6 border-t border-gray-200">
        <h2 className="text-xl font-semibold mb-4">Product Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-lg font-medium mb-2">Features</h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-600">
              <li>High-quality materials</li>
              <li>Durable construction</li>
              <li>Easy to use</li>
              <li>Modern design</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">Specifications</h3>
            <div className="grid grid-cols-2 gap-2">
              <div className="text-sm font-medium text-gray-500">Category:</div>
              <div className="text-sm text-gray-900">{product.category}</div>
              <div className="text-sm font-medium text-gray-500">Rating:</div>
              <div className="text-sm text-gray-900">{product.rating.toFixed(1)} / 5</div>
              <div className="text-sm font-medium text-gray-500">In Stock:</div>
              <div className="text-sm text-gray-900">Yes</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
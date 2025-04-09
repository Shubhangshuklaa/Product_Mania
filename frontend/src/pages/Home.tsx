import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { fetchProducts } from '../store/slices/productSlice';
import { StarIcon } from '@heroicons/react/24/solid';
import { ArrowRightIcon, ShoppingBagIcon, ShieldCheckIcon, TruckIcon } from '@heroicons/react/24/outline';

const Home = () => {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Get featured products (top rated products)
  const featuredProducts = [...items]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-pattern"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8 flex flex-col md:flex-row items-center">
          <div className="text-center md:text-left md:w-1/2">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Welcome to <span className="block text-yellow-300">Product Mania</span>
            </h1>
            <p className="mt-6 max-w-lg mx-auto md:mx-0 text-xl text-indigo-100">
              Discover amazing products at competitive prices. Quality you can trust, delivered to your doorstep.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center md:justify-start gap-4">
              <Link
                to="/products"
                className="rounded-md shadow px-5 py-3 bg-white text-primary-600 font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-600 focus:ring-white"
              >
                Browse Products
              </Link>
              <Link
                to="/signup"
                className="rounded-md px-5 py-3 bg-primary-500 text-white font-medium hover:bg-primary-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-600 focus:ring-white"
              >
                Sign Up Now
              </Link>
            </div>
          </div>
          <div className="mt-12 md:mt-0 md:w-1/2">
            <div className="relative mx-auto w-full max-w-md">
              <div className="relative bg-white rounded-lg shadow-xl overflow-hidden transform rotate-2 hover:rotate-0 transition-transform duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 opacity-10"></div>
                <div className="relative p-8">
                  <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg overflow-hidden mb-4">
                    <div className="flex items-center justify-center h-48 bg-primary-100 text-primary-600">
                      <ShoppingBagIcon className="h-24 w-24" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Premium Products</h3>
                  <p className="mt-2 text-gray-600">Explore our curated collection of high-quality items</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
          <Link to="/products" className="flex items-center text-primary-600 hover:text-primary-800 font-medium">
            View All <ArrowRightIcon className="ml-1 h-5 w-5" />
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <div key={product._id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
                <div className="h-48 overflow-hidden bg-gray-200">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                      No Image
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">{product.name}</h3>
                  <p className="text-sm text-gray-500 mb-2 line-clamp-2">{product.description}</p>
                  <div className="flex items-center mb-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon
                          key={i}
                          className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">{product.rating.toFixed(1)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-primary-600">${product.price.toFixed(2)}</span>
                    <Link to={`/products/${product._id}`} className="btn-primary text-sm py-1.5">
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 rounded-xl p-8">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Why Choose Product Mania?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-md bg-primary-100 text-primary-600 mb-4">
              <ShieldCheckIcon className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Quality Guaranteed</h3>
            <p className="text-gray-600">
              All our products undergo rigorous quality checks to ensure you receive only the best.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-md bg-primary-100 text-primary-600 mb-4">
              <TruckIcon className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Fast Delivery</h3>
            <p className="text-gray-600">
              We partner with reliable shipping providers to deliver your products quickly and safely.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-md bg-primary-100 text-primary-600 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Best Prices</h3>
            <p className="text-gray-600">
              We offer competitive prices and regular discounts to give you the best value for your money.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-primary-700 rounded-xl p-8 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Shopping?</h2>
        <p className="text-xl text-primary-100 mb-8 max-w-3xl mx-auto">
          Join thousands of satisfied customers who have discovered the Product Mania difference.
        </p>
        <Link
          to="/products"
          className="inline-block rounded-md shadow px-6 py-3 bg-white text-primary-600 font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-white"
        >
          Explore Products Now
        </Link>
      </section>
    </div>
  );
};

export default Home;
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

/**
 * @page NotFound
 * @summary Page displayed when a route is not found (404).
 * @route /*
 * @layout RootLayout
 * @type public-page
 * @category error
 */
export const NotFoundPage = () => {
  return (
    <>
      <Helmet>
        <title>404 Not Found - GuessNumber Game</title>
      </Helmet>
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-128px)] text-center p-4">
        <h1 className="text-6xl font-bold text-blue-600">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mt-4 mb-2">
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-6">
          Sorry, the page you are looking for does not exist.
        </p>
        <Link
          to="/"
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Go to Homepage
        </Link>
      </div>
    </>
  );
};

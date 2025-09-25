import { Link, Outlet } from 'react-router-dom';

const Header = () => (
  <header className="bg-white shadow-md">
    <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-blue-600">
        GuessNumber
      </Link>
      <div>
        <Link
          to="/admin/config"
          className="text-gray-600 hover:text-blue-600 transition-colors"
        >
          Admin
        </Link>
      </div>
    </nav>
  </header>
);

const Footer = () => (
  <footer className="bg-gray-100 border-t">
    <div className="container mx-auto px-4 py-4 text-center text-gray-600">
      <p>&copy; {new Date().getFullYear()} GuessNumber Game. All rights reserved.</p>
    </div>
  </footer>
);

/**
 * @component RootLayout
 * @summary The main layout for the application, including header and footer.
 * @type layout-component
 */
export const RootLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

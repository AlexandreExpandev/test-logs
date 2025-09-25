import { Helmet } from 'react-helmet-async';
import { ConfigForm } from '@/domain/config';
import { useAuth } from '@/core/contexts/auth';

/**
 * @page AdminSettings
 * @summary Page for administrators to configure game settings.
 * @route /admin/settings
 * @layout RootLayout
 * @type protected-page
 * @category admin
 */
export const AdminSettingsPage = () => {
  const { isAuthenticated } = useAuth();

  // In a real app, you would also check for an admin role:
  // const { user } = useAuth();
  // if (user?.role !== 'admin') { ... }

  if (!isAuthenticated) {
    return (
      <div className="text-center p-8">
        <h1 className="text-2xl font-bold text-red-600">Acesso Negado</h1>
        <p className="text-gray-600 mt-2">
          Você precisa estar logado como administrador para ver esta página.
        </p>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Admin Settings - GuessNumber</title>
      </Helmet>
      <ConfigForm />
    </>
  );
};

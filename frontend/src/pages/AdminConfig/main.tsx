import { Helmet } from 'react-helmet-async';
import { ConfigForm } from '@/domain/config';

/**
 * @page AdminConfig
 * @summary Page for administrators to configure game settings.
 * @route /admin/config
 * @layout RootLayout
 * @type protected-page
 * @category admin
 */
export const AdminConfigPage = () => {
  // In a real app, this page would be protected by an admin role check.
  // const { user } = useAuth();
  // if (user?.role !== 'admin') {
  //   return <Navigate to="/" replace />;
  // }

  return (
    <>
      <Helmet>
        <title>Admin: Configuração do Jogo</title>
        <meta name="description" content="Configure the number range for the game." />
      </Helmet>
      <ConfigForm />
    </>
  );
};

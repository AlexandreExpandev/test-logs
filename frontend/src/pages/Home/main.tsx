import { Helmet } from 'react-helmet-async';
import { Gameboard } from '@/domain/game';

/**
 * @page Home
 * @summary The main page of the application, hosting the game.
 * @route /
 * @layout RootLayout
 * @type public-page
 * @category game
 */
export const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>GuessNumber Game</title>
        <meta name="description" content="The exciting number guessing game." />
      </Helmet>
      <Gameboard />
    </>
  );
};

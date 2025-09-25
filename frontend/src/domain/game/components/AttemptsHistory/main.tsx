/**
 * @component AttemptsHistory
 * @summary Displays the list of previous valid guesses.
 * @domain game
 */
export const AttemptsHistory = ({ history }: { history: number[] }) => {
  if (history.length === 0) {
    return null;
  }

  return (
    <div className="mt-6 w-full max-w-md">
      <h3 className="text-lg font-semibold text-center text-gray-700">Histórico de Tentativas</h3>
      <ul className="mt-2 flex flex-wrap justify-center gap-2 p-4 bg-gray-100 rounded-lg">
        {history.map((attempt, index) => (
          <li
            key={index}
            className="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-sm text-gray-800 font-bold"
          >
            {attempt}
          </li>
        ))}
      </ul>
    </div>
  );
};

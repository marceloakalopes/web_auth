import { useState } from 'react';

const LogOutButton = () => {
  const [isLoading, setIsLoading] = useState(false);

  const logOut = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:5500/api/logout", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.success) {
        localStorage.removeItem("__Name");
        localStorage.removeItem("__Username");
        window.location.reload();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        logOut();
      }}
      className="inline-flex h-12 items-center justify-center rounded-md border border-gray-200 bg-white px-10 text-base font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
      disabled={isLoading}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <svg className="animate-spin h-6 w-6 mr-3 text-gray-800 dark:text-gray-50" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.314 1.343 6.315 3.514 8.485l2.486-2.194z"></path>
          </svg>
        </div>
      ) : (
        'Logout'
      )}
    </button>
  );
};

export default LogOutButton;

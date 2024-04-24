import { Link } from "react-router-dom";
import LogOutButton from "./components/LogOutButton";

function App() {
  const username = localStorage.getItem("__Username");
  const name = localStorage.getItem("__Name");
  

  return (
    <div className="flex flex-col items-center justify-center min-h-[100dvh] px-6 md:px-8">
      <div className="max-w-lg space-y-6 text-center">
        <h1 className="text-4xl font-bold">Welcome to my Auth Project</h1>
        <p className="text-lg text-gray-500 dark:text-gray-400">{!(name&&username) ? "It looks like you are not logged in. Try logging in or signing up below." : `Hi ${name}`}</p>
        { !(name && username) ? (
          <div className="flex flex-col gap-4 min-[400px]:flex-row justify-center">
            <Link
              className="inline-flex h-12 items-center justify-center rounded-md bg-gray-900 px-10 text-base font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
              to="/login"
            >
              Login
            </Link>
            <Link
              className="inline-flex h-12 items-center justify-center rounded-md border border-gray-200 bg-white px-10 text-base font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
              to="/signup"
            >
              Sign Up
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-4 min-[400px]:flex-row justify-center">
            <Link
              className="inline-flex h-12 items-center justify-center rounded-md bg-gray-900 px-10 text-base font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
              to="/dashboard"
            >
              Dashboard
            </Link>
            <LogOutButton />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;


const LogOutButton = () => {

  const logOut = async () => {
    await fetch("http://localhost:5500/api/logout", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          localStorage.removeItem("__Name");
          localStorage.removeItem("__Username");
          window.location.reload();


        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        logOut();
      }}
      className="inline-flex h-12 items-center justify-center rounded-md border border-gray-200 border-gray-200 bg-white px-10 text-base font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
    >
      Logout
    </button>
  );
};

export default LogOutButton;

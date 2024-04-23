import LogOutButton from "../components/LogOutButton";
import { Link } from "react-router-dom";
import getUserId from "../utils/getUserId";

const Dashboard = () => {

  const userId:String | null = getUserId();

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <p className="text-xl font-semibold">
        Hello, {userId}
      </p>
      <br />
      <LogOutButton />
      <Link to="/" className="block mt-4 text-sm text-blue-500 hover:underline">
        Home
      </Link>
    </div>
  );
};

export default Dashboard;

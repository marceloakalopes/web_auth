import { useEffect } from "react";
import getUserId from "../utils/main";
import { useNavigate } from "react-router-dom";
import LogOutButton from "../components/LogOutButton";

const Dashboard = () => {
  const navigate = useNavigate();

  const userId = getUserId();

  if (!userId) {
    useEffect(() => {
      navigate("/login");
    }, []);
  } else if (userId) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <p className="text-xl font-semibold">
        Hello, {localStorage.getItem("username")}
      </p>
      <br />
      <LogOutButton  />
    </div>
    );
  }
};

export default Dashboard;

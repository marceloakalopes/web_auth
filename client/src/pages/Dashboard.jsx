import { useEffect } from "react";
import getUserId from "../utils/main";
import { useNavigate } from "react-router-dom";
import LogOutButton from "../components/LogOutButton";

const Dashboard = () => {
  const navigate = useNavigate();

  const userId = getUserId();

  if (!userId) {
    useEffect(() => {
      navigate("/log-in");
    }, []);
  } else if (userId) {
    return (
      <div>
        Hello, {localStorage.getItem("username")}
        <br />
        <br />
        <LogOutButton />
      </div>
    );
  }
};

export default Dashboard;

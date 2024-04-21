import LogOutButton from "../components/LogOutButton";

const Dashboard = () => {


    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <p className="text-xl font-semibold">
        Hello, {localStorage.getItem("username")}
      </p>
      <br />
      <LogOutButton  />
    </div>
    );
};

export default Dashboard;

import { Link } from "react-router-dom";

function App() {
  return (
    <>
      <h1>Vite App</h1>
      <Link to="/sign-up">Sign Up</Link>
      <br />
      <Link to="/log-in">Log In</Link>
    </>
  );
}

export default App;
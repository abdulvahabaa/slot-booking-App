import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import "primereact/resources/themes/lara-dark-indigo/theme.css"; //theme
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";

function Login({ setIsAuthenticated }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const toast = useRef(null);

  const showSuccess = () => {
    toast.current.show({severity:'success', summary: 'Success', detail:'Message Content', life: 3000});
}

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "admin@gmail.com" && password === "root") {
      setIsAuthenticated(true);
      navigate("/"); // Redirect to dashboard
    } else {
      alert("Invalid credentials!");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-700 dark:text-white">
          Login to Your Account
        </h2>

        <form className="mt-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-600 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring focus:ring-violet-300 dark:bg-gray-700 dark:text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mt-4">
            <label className="block text-gray-600 dark:text-gray-300">
              Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring focus:ring-violet-300 dark:bg-gray-700 dark:text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full mt-6 px-4 py-2 text-white bg-violet-500 rounded-lg hover:bg-violet-600 transition"
          >
            Login
          </button>
        </form>
        <Toast ref={toast} />
        <Button label="Success" severity="success" onClick={showSuccess} />
      </div>
    </div>
  );
}

export default Login;

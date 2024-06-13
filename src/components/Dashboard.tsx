import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface User {
  name: string;
  email: string;
}

interface ApiData {
  id: number;
  title: string;
  body: string;
}

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [apiData, setApiData] = useState<ApiData[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate fetching user details from local storage or an API
    const storedUser = {
      name: "John Doe",
      email: "john.doe@example.com",
    };
    setUser(storedUser);

    // Fetch data from a dummy API
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => setApiData(data.slice(0, 5))) // Fetch the first 5 posts
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <header className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        {user && (
          <div className="relative">
            <button
              onClick={togglePopup}
              className="bg-blue-500 text-white w-10 h-10 rounded-full flex items-center justify-center text-xl"
            >
              {user.name.charAt(0)}
            </button>
            {showPopup && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-10">
                <div className="px-4 py-2">
                  <p className="font-bold">{user.name}</p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </header>
      <div className="p-8">
        <h3 className="text-xl font-bold mb-6 text-white">Your Data</h3>
        {apiData.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {apiData.map((item) => (
              <div
                key={item.id}
                className="p-4 border-2 border-white rounded-lg shadow hover:shadow-lg transform hover:scale-105 transition duration-200 bg-white bg-opacity-80"
              >
                <h4 className="font-bold text-lg mb-2 text-gray-800">
                  {item.title}
                </h4>
                <p className="text-gray-700">{item.body}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-white">Loading data...</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

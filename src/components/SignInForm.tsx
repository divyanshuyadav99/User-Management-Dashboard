import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signInRequest, nullifyBooleans } from "../store/slices/auth";
import { RootState } from "../store";

const SignInForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { signin_success, token, error } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    return () => {
      setTimeout(() => {
        dispatch(nullifyBooleans());
      }, 0);
    };
  }, [dispatch]);

  useEffect(() => {
    if (signin_success && token) {
      localStorage.setItem("token", token);
      navigate("/dashboard");
    }
  }, [signin_success, token, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(signInRequest(formData));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
        {error && <div className="mb-4 text-center text-red-500">{error}</div>}
        <form onSubmit={handleSignIn}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              type="email"
              id="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              type="password"
              id="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Sign In
          </button>
        </form>
        <div className="mt-4 text-center">
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;

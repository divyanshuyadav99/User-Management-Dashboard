import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { signUpRequest, clearError } from "../store/slices/auth";

const SignUpForm: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, signup_success } = useSelector(
    (state: RootState) => state.auth
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(signUpRequest(formData));
  };

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  useEffect(() => {
    if (signup_success) {
      navigate("/login");
    }
  }, [signup_success, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        {signup_success ? (
          <div className="text-center text-green-500">Sign up successful!</div>
        ) : (
          <>
            <form onSubmit={handleSubmit}>
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
                  onChange={handleChange}
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
                  onChange={handleChange}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
                disabled={loading}
              >
                Sign Up
              </button>
              {error && (
                <div className="text-center text-red-500 mt-4">{error}</div>
              )}
            </form>
            <div className="mt-4 text-center">
              <Link to="/login" className="text-blue-500 hover:underline">
                Login
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SignUpForm;

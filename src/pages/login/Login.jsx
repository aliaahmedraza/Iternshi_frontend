import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [isTokenExpired, setIsTokenExpired] = useState(false);
  const [isTokenPresent, setIsTokenPresent] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const initialValues = {
    email: "",
    password: "",
  };

  useEffect(() => {
    const token = Cookies.get("token");

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const expiryTime = decodedToken.exp * 1000;
        const currentTime = Date.now();

        if (currentTime > expiryTime) {
          setIsTokenExpired(true);
        } else {
          navigate("/home");
        }
        setIsTokenPresent(true);
      } catch (error) {
        console.error("Error decoding the token:", error);
        setIsTokenExpired(true);
        setIsTokenPresent(true);
      }
    } else {
      setIsTokenPresent(false);
    }
  }, [navigate]);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await axios.post(
        "http://localhost:3004/api/auth/login",
        {
          email: values.email,
          password: values.password,
        },
        { withCredentials: true }
      );

      alert("Login Successful");
      Cookies.set("token", response.data.token);
      navigate("/home");
      resetForm();
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      alert("Error during Login. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center p-4 relative">
        <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
          {isTokenPresent && isTokenExpired ? (
            <p className="text-red-500 text-center mb-4">
              Your session has expired. Please log in again.
            </p>
          ) : null}
          <h2 className="text-2xl font-bold text-center mb-6">
            Login to Your Account
          </h2>
          <Formik
            initialValues={initialValues}
            validationSchema={LoginSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700 mb-2">
                    Email
                  </label>
                  <Field
                    type="email"
                    name="email"
                    className={`w-full p-2 border rounded-md ${
                      errors.email && touched.email
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="Enter your email"
                  />
                  {errors.email && touched.email && (
                    <div className="text-red-500 text-sm mt-1">
                      {errors.email}
                    </div>
                  )}
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="password"
                    className="block text-gray-700 mb-2"
                  >
                    Password
                  </label>
                  <Field
                    type="password"
                    name="password"
                    className={`w-full p-2 border rounded-md ${
                      errors.password && touched.password
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="Enter your password"
                  />
                  {errors.password && touched.password && (
                    <div className="text-red-500 text-sm mt-1">
                      {errors.password}
                    </div>
                  )}
                </div>
                <div className="mb-4 text-right">
                  <a
                    href="/forgetpassword"
                    className="text-blue-500 text-sm hover:underline"
                  >
                    Forgot Password?
                  </a>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-500 text-white py-2 rounded-md
                    hover:bg-blue-600 transition duration-300
                    disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Logging In..." : "Login"}
                </button>
              </Form>
            )}
          </Formik>
          <p className="text-center mt-4 text-gray-600">
            Don't have an account?
            <a href="/signup" className="text-blue-500 ml-1 hover:underline">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

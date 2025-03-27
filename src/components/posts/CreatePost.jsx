import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode"; 
import { useNavigate } from "react-router-dom";

const CreatePostSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  content: Yup.string().required("Content is required"),
});

const CreatePost = () => {
  const navigate = useNavigate();
  const token = Cookies.get("token");
  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md text-center">
          <h2 className="text-2xl font-bold mb-4">
            You must be logged in to create a post.
          </h2>
          <p>Please log in first.</p>
        </div>
      </div>
    );
  }

  try {
      const decoded = jwtDecode(token);
      console.log(decoded)
  } catch (error) {
    console.error("Error decoding token:", error);
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md text-center">
          <h2 className="text-2xl font-bold mb-4">Invalid token.</h2>
          <p>Please log in again.</p>
        </div>
      </div>
    );
  }

  const initialValues = {
    title: "",
    content: "",
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await axios.post(
        "https://internship-task-blogapp-1.onrender.com/api/posts/",
        values,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
        alert("Post created successfully!");
        console.log(response);
      resetForm();
    } catch (error) {
      if (error.response && error.response.data) {
        alert(
          error.response.data.message ||
            "Error creating post. Please try again."
        );
      } else {
        alert("An unexpected error occurred. Please try again later.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Create a Post</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={CreatePostSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label htmlFor="title" className="block text-gray-700 mb-2">
                  Title
                </label>
                <Field
                  type="text"
                  name="title"
                  placeholder="Post title"
                  className={`w-full p-2 border rounded-md ${
                    errors.title && touched.title
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                {errors.title && touched.title && (
                  <div className="text-red-500 text-sm mt-1">
                    {errors.title}
                  </div>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="content" className="block text-gray-700 mb-2">
                  Content
                </label>
                <Field
                  as="textarea"
                  name="content"
                  placeholder="Post content"
                  className={`w-full p-2 border rounded-md ${
                    errors.content && touched.content
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                {errors.content && touched.content && (
                  <div className="text-red-500 text-sm mt-1">
                    {errors.content}
                  </div>
                )}
              </div>
              <div className="flex justify-between">
                <button
                type="submit"
                onClick={()=>navigate(-1)}
                className="w-[30%] bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-[30%] bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Creating Post..." : "Create Post"}
              </button></div>
   
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CreatePost;



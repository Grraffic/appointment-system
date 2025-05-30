import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { signInWithPopup } from "firebase/auth";
import { googleProvider, auth } from "@/firebase";
import axios from "axios";
import emailService from "../../../../services/emailServices";
import { useUser } from "../../../../context/UserContext.jsx";

const useSignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const { updateUser } = useUser();

  const navigate = useNavigate();

  useEffect(() => {
    const savedEmail = localStorage.getItem("savedEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setRemember(true);
    }
  }, []);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleRemember = (e) => setRemember(e.target.checked);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    if (!email.trim() || !password.trim()) {
      setError("Please enter both email and password.");
      setIsLoading(false);
      return;
    }

    try {
      console.log('Attempting to sign in with:', { email, password });
      const response = await emailService.signin({ email, password });
      console.log('Sign in response:', response);

      if (remember) {
        localStorage.setItem("savedEmail", email);
      } else {
        localStorage.removeItem("savedEmail");
      }

      // Store the token in localStorage
      if (response.token) {
        localStorage.setItem("token", response.token);
        // Set the token in axios default headers for all future requests
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.token}`;
      }

      // Extract user data from response, ensuring we get the complete user object
      const userResponse = response.user || response;
      console.log('User response:', userResponse);

      // Store user data with consistent picture handling
      const userData = {
        email: userResponse.email || email.trim(),
        name: userResponse.name || response.name,
        id: userResponse.id || userResponse._id || response.id,
        // Ensure we get the profile picture URL from all possible fields
        picture:
          userResponse.picture ||
          userResponse.profilePicture ||
          response.picture ||
          response.profilePicture ||
          null,
        profilePicture:
          userResponse.profilePicture ||
          userResponse.picture ||
          response.profilePicture ||
          response.picture ||
          null,
        role: userResponse.role,
      };

      // Update user context with the complete data
      updateUser(userData);
      
      // Store the entire user object in localStorage for persistence
      localStorage.setItem("user", JSON.stringify(userData));
      
      setIsLoading(false);
      console.log('Navigating to registrarHome');
      navigate("/registrarHome");
    } catch (error) {
      console.error("Sign in error:", error);
      setError(error.response?.data?.message || error.message || "Invalid email or password");
      setIsLoading(false);
    }
  };

  const handleGmail = async (e) => {
    e.preventDefault();
    setError(null);
    setIsGoogleLoading(true);

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const response = await emailService.signin({
        email: user.email,
        googleAuth: true,
        name: user.displayName,
        googleId: user.uid,
        picture: user.photoURL,
      });

      if (response.token) {
        localStorage.setItem("token", response.token);
      }

      // Store user data with consistent picture handling
      const userData = {
        email: user.email,
        name: response.user?.name || user.displayName,
        id: response.user?.id || response.user?._id || response.id,
        picture:
          response.user?.picture ||
          response.user?.profilePicture ||
          user.photoURL ||
          null,
        profilePicture:
          response.user?.profilePicture ||
          response.user?.picture ||
          user.photoURL ||
          null,
        role: response.user?.role,
      };

      updateUser(userData);
      setIsGoogleLoading(false);
      navigate("/registrarHome");
    } catch (error) {
      console.error("Google signin error:", error);
      setError(error.message || "Google sign-in failed");
      setIsGoogleLoading(false);
    }
  };

  return {
    email,
    password,
    remember,
    error,
    showPassword,
    isLoading,
    isGoogleLoading,
    handleEmail,
    handlePassword,
    handleRemember,
    handleSignIn,
    handleGmail,
    handleTogglePasswordVisibility,
  };
};

export default useSignIn;

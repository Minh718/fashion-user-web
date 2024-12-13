import React, { useState, useEffect } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { FaPhone, FaEnvelope, FaLock, FaArrowRight } from "react-icons/fa";

const SignupForm = () => {
  const [isEmail, setIsEmail] = useState(true);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [countryCode, setCountryCode] = useState("+1");
  const [errors, setErrors] = useState({});
  const [suggestions, setSuggestions] = useState([]);

  const emailDomains = [
    "@gmail.com",
    "@yahoo.com",
    "@outlook.com",
    "@hotmail.com",
  ];
  const countryCodes = ["+1", "+44", "+91", "+61", "+86"];

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePhone = (phone) => {
    const regex = /^\d{10}$/;
    return regex.test(phone);
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  useEffect(() => {
    if (email && !email.includes("@")) {
      setSuggestions(emailDomains.map((domain) => email + domain));
    } else {
      setSuggestions([]);
    }
  }, [email]);

  const handleGetCode = () => {
    if (validatePhone(phone)) {
      console.log("Sending verification code to", countryCode + phone);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (isEmail) {
      if (!email) newErrors.email = "Email is required";
      else if (!validateEmail(email)) newErrors.email = "Invalid email format";
    } else {
      if (!phone) newErrors.phone = "Phone number is required";
      else if (!validatePhone(phone)) newErrors.phone = "Invalid phone number";
      if (!verificationCode)
        newErrors.verificationCode = "Verification code is required";
    }

    if (!password) newErrors.password = "Password is required";
    else if (!validatePassword(password))
      newErrors.password = "Password must be at least 8 characters";
    if (password !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log(
        "Form submitted:",
        isEmail
          ? { email, password }
          : { phone: countryCode + phone, password, verificationCode }
      );
    }
  };

  return (
    <div
      className="min-h-[80vh] flex items-center justify-center bg-cover bg-center py-12 px-4 sm:px-6 lg:px-8"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
      }}
    >
      <div className="max-w-md w-full space-y-8 bg-white bg-opacity-90 p-10 rounded-xl shadow-2xl">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign up to Fashion Shop
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Sign up to get started
          </p>
        </div>

        <div className="flex items-center justify-center mb-8">
          <div className="relative inline-flex">
            <button
              className={`px-4 py-2 rounded-l-lg transition-all duration-300 ${
                isEmail
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => setIsEmail(true)}
              aria-label="Switch to email signup"
            >
              <FaEnvelope className="inline mr-2" />
              Email
            </button>
            <button
              className={`px-4 py-2 rounded-r-lg transition-all duration-300 ${
                !isEmail
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => setIsEmail(false)}
              aria-label="Switch to phone signup"
            >
              <FaPhone className="inline mr-2" />
              Phone
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-2">
          {isEmail ? (
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-3 py-2 rounded-lg border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300`}
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-600">{errors.email}</p>
              )}
            </div>
          ) : (
            <div className="space-y-2">
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Phone Number
              </label>
              <div className="flex gap-4">
                <select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className="w-24 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  {countryCodes.map((code) => (
                    <option key={code} value={code}>
                      {code}
                    </option>
                  ))}
                </select>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={`flex-1 px-3 py-2 rounded-lg border ${
                    errors.phone ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                  placeholder="Enter your phone number"
                />
              </div>
              {errors.phone && (
                <p className="mt-2 text-sm text-red-600">{errors.phone}</p>
              )}

              <div className="flex gap-4">
                <input
                  type="text"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  className={`flex-1 px-3 py-2 rounded-lg border ${
                    errors.verificationCode
                      ? "border-red-500"
                      : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                  placeholder="Enter verification code"
                />
                <button
                  type="button"
                  onClick={handleGetCode}
                  className="px-4 py-2 bg-slate-500 text-white rounded-lg hover:bg-slate-600 transition-colors"
                >
                  Get Code
                </button>
              </div>
              {errors.verificationCode && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.verificationCode}
                </p>
              )}
            </div>
          )}

          <div className="space-y-2">
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-3 py-2 rounded-lg border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="mt-2 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`w-full px-3 py-2 rounded-lg border ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                placeholder="Confirm your password"
              />
              {errors.confirmPassword && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transform transition-all duration-300 hover:scale-[1.02]"
          >
            Sign Up
          </button>

          <button
            type="button"
            className="w-full mt-2 bg-slate-500 text-white py-2 rounded-lg font-semibold hover:bg-slate-500 focus:ring-offset-2 transform transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2"
          >
            Go to Sign up <FaArrowRight />
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;

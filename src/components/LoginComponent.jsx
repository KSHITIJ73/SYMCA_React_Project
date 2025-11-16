import { auth } from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

export default function LoginComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Account created successfully!");
      setEmail("");
      setPassword("");
    } catch (error) {
      alert("Error: " + error.message);
    }
    setLoading(false);
  };

  const handleSignIn = async () => {
    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      alert("Error: " + error.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">📝 Task App</h1>
        <p className="text-center text-gray-600 mb-8">Manage your tasks efficiently</p>

        {/* Email Input */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Password Input */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mb-4">
          <button
            onClick={isSignUp ? handleSignUp : handleSignIn}
            disabled={loading}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition disabled:opacity-50"
          >
            {loading ? "Loading..." : isSignUp ? "Sign Up" : "Sign In"}
          </button>
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 rounded-lg transition"
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </button>
        </div>

        {/* Toggle Text */}
        <p className="text-center text-gray-600 text-sm">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-indigo-600 font-semibold hover:underline"
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
}
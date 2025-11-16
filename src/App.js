import { useEffect, useState } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import LoginComponent from "./components/LoginComponent";
import TaskList from "./components/TaskList";
import TaskInput from "./components/TaskInput";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      alert("Error logging out: " + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {!user ? (
        <LoginComponent />
      ) : (
        <div className="max-w-4xl mx-auto p-6">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">📝 Task Manager</h1>
                <p className="text-gray-600 mt-1">Welcome, <span className="font-semibold text-indigo-600">{user.email}</span></p>
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <TaskInput />
            <TaskList />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
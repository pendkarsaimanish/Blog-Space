import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute.tsx"
import PublicRoute from "./components/PublicRoute.tsx"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={ 
          <PublicRoute> 
            <Login />
            </PublicRoute>
          }/>
        <Route path="/register" element={
          <PublicRoute> 
          <Register />
        </PublicRoute>
        }/>
        <Route path="/profile" />
        <Route path="/dashboard" element={ 
          <ProtectedRoute>
            <Dashboard />
            </ProtectedRoute>
          }/>
        <Route path="/new-blog" />
      </Routes>
    </>
  );
}

export default App;

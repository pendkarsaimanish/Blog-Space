import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute.tsx"
import PublicRoute from "./components/PublicRoute.tsx"
import Profile from "./pages/Profile.tsx";
import About from "./pages/About.tsx"
import Layout from "./components/Layout.tsx"
import NewBlog from "./pages/NewBlog.tsx";

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/about" element={<About />} />

          <Route path="/login" element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } />

          <Route path="/register" element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          } />

          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />

          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />

          <Route path="/new-blog" element={<NewBlog />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;

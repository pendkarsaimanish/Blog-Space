import { Route, Routes } from "react-router";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" />
        <Route path="/register" />
        <Route path="/profile" />
        <Route path="/dashboard" />
        <Route path="/new-blog" />
      </Routes>
    </>
  );
}

export default App;

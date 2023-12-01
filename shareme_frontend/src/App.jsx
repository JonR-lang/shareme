import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./layouts/Home";

function App() {
  return (
    <Routes>
      <Route exact path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default App;

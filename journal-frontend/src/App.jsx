import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddEdit from "./pages/AddEdit"
import "./styles/App.css";

function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/edit/:id" element={<AddEdit/>} />
        <Route path="/add" element={<AddEdit />} />
      </Routes>
    </div>
  )
}

export default App

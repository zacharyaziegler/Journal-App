import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import EntryDetail from "./pages/EntryDetail";
// import AddEdit from "./pages/AddEdit"
// import EntryDetail from "./pages/EntryDetail"
import "./styles/App.css";

function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/entries/:id" element={<EntryDetail />} />
        {/* <Route path="/add" element={<AddEdit />} /> */}
        {/* <Route path="/edit/:id" element={<AddEdit />} /> */}
        {/* <Route path="/entries/:id" element={<EntryDetail />} /> */}
      </Routes>
    </div>
  )
}

export default App

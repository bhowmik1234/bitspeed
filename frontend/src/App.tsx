
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Contacts from "./components/Contacts";
import Home from "./components/Home";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 p-4">
        <nav className="mb-6 flex gap-4">
          <Link to="/" className="text-blue-600 hover:underline">Home</Link>
          <Link to="/contacts" className="text-blue-600 hover:underline">Contacts</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contacts" element={<Contacts />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

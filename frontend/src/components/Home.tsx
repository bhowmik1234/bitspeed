import { useState, type FormEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email && !phone) return alert("Provide email or phone");
    try {
      setLoading(true);
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/identify`, {
        email,
        phoneNumber: phone,
      });
      setLoading(false);
      setEmail("");
      setPhone("");
      navigate("/contacts");
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-blue-200 p-4">
      <div className="flex flex-col items-center">
        {/* Tab placed above with margin */}
        <div className="mb-6 bg-blue-400 text-white px-6 py-3 rounded-xl shadow-lg text-sm font-medium flex flex-col items-center gap-1">
          <span className="uppercase tracking-wider text-xs text-blue-50">
            Backend Endpoint
          </span>
          <a
            href="https://bitspeed-hmbi.onrender.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-900 bg-white px-3 py-1 rounded-md font-semibold hover:bg-blue-50 hover:text-blue-700 transition-colors duration-300 shadow-sm"
          >
            https://bitspeed-hmbi.onrender.com
          </a>
        </div>


        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">
          <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
            Add a Contact
          </h1>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block mb-2 font-semibold text-gray-700">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@mail.com"
                className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold text-gray-700">
                Phone Number
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 9876543210"
                className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold text-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </form>
          <p className="text-center text-gray-500 mt-4 text-sm">
            You can provide either email or phone number.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;

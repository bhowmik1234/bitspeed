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
      await axios.post("http://localhost:3001/identify", { email, phoneNumber: phone });
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
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Add a Contact
        </h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-2 font-semibold text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@mail.com"
              className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
            />
          </div>
          <div>
            <label className="block mb-2 font-semibold text-gray-700">Phone Number</label>
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
  );
};

export default Home;

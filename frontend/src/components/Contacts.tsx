import React, { useEffect, useState } from "react";
import axios from "axios";

interface Contact {
  id: number;
  email?: string | null;
  phoneNumber?: string | null;
  linkedId?: number | null;
  linkPrecedence: "primary" | "secondary";
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}

const Contacts: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const res = await axios.get<{ status: number; success: boolean; data: Contact[]; message: string }>(
        "http://localhost:3001/contacts"
      );
      setContacts(res.data.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">All Contacts</h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-lg rounded-xl overflow-hidden">
            <thead className="bg-blue-100 text-blue-700 font-semibold">
              <tr>
                <th className="py-3 px-4 text-left">ID</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Phone</th>
                <th className="py-3 px-4 text-left">Linked ID</th>
                <th className="py-3 px-4 text-left">Link Type</th>
                <th className="py-3 px-4 text-left">Created At</th>
                <th className="py-3 px-4 text-left">Updated At</th>
                <th className="py-3 px-4 text-left">Deleted At</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((c, idx) => (
                <tr
                  key={c.id}
                  className={idx % 2 === 0 ? "bg-white" : "bg-blue-50"}
                >
                  <td className="py-2 px-4">{c.id}</td>
                  <td className="py-2 px-4">{c.email ?? "-"}</td>
                  <td className="py-2 px-4">{c.phoneNumber ?? "-"}</td>
                  <td className="py-2 px-4">{c.linkedId ?? "-"}</td>
                  <td className="py-2 px-4 capitalize">{c.linkPrecedence}</td>
                  <td className="py-2 px-4 text-gray-600 text-sm">{new Date(c.createdAt).toLocaleString()}</td>
                  <td className="py-2 px-4 text-gray-600 text-sm">{new Date(c.updatedAt).toLocaleString()}</td>
                  <td className="py-2 px-4 text-red-500 text-sm">{c.deletedAt ? new Date(c.deletedAt).toLocaleString() : "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Contacts;

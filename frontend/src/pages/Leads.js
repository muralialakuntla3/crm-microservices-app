import { useEffect, useState, useContext } from "react";
import { getLeads } from "../api/leads";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Loader from "../components/Loader";

export default function Leads() {
  const { token } = useContext(AuthContext);
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLeads(token).then((data) => {
      setLeads(data);
      setLoading(false);
    });
  }, [token]);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">Leads</h2>
          {loading ? <Loader /> : (
            <ul>
              {leads.map((lead) => (
                <li key={lead.id} className="border p-2 mb-2">{lead.name} - {lead.email}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

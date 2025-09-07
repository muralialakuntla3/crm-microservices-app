import { useEffect, useState, useContext } from "react";
import { getAnalytics } from "../api/analytics";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Loader from "../components/Loader";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

export default function Analytics() {
  const { token } = useContext(AuthContext);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAnalytics(token).then((res) => {
      setData(res);
      setLoading(false);
    });
  }, [token]);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">Analytics</h2>
          {loading ? <Loader /> : (
            <BarChart width={600} height={300} data={data.metrics}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          )}
        </div>
      </div>
    </div>
  );
}

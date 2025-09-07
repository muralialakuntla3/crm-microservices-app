import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-64 bg-gray-800 text-white min-h-screen p-4">
      <ul>
        <li><Link to="/dashboard" className="block py-2">Dashboard</Link></li>
        <li><Link to="/leads" className="block py-2">Leads</Link></li>
        <li><Link to="/courses" className="block py-2">Courses</Link></li>
        <li><Link to="/analytics" className="block py-2">Analytics</Link></li>
      </ul>
    </div>
  );
}

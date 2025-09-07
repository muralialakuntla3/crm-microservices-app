import { useEffect, useState, useContext } from "react";
import { getCourses } from "../api/courses";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Loader from "../components/Loader";

export default function Courses() {
  const { token } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCourses(token).then((data) => {
      setCourses(data);
      setLoading(false);
    });
  }, [token]);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">Courses</h2>
          {loading ? <Loader /> : (
            <ul>
              {courses.map((course) => (
                <li key={course.id} className="border p-2 mb-2">{course.title}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import studentService from "../../services/studentService";
import teacherService from "../../services/teacherService";
import classService from "../../services/classService";
import subjectService from "../../services/subjectService";

import Loader from "../../components/common/Loader";

const Dashboard = () => {
  const { user } = useAuth();

  const [counts, setCounts] = useState({
    students: 0,
    teachers: 0,
    classes: 0,
    subjects: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const modules = [
    {
      name: "Students",
      path: "/students",
      description: "Manage student records",
      roles: ["Admin", "Teacher"],
    },
    {
      name: "Teachers",
      path: "/teachers",
      description: "Manage teacher records",
      roles: ["Admin"],
    },
    {
      name: "Classes",
      path: "/classes",
      description: "Manage school classes",
      roles: ["Admin"],
    },
    {
      name: "Subjects",
      path: "/subjects",
      description: "Manage subjects",
      roles: ["Admin"],
    },
    {
      name: "Class Subjects",
      path: "/class-subjects",
      description: "Assign subjects to classes",
      roles: ["Admin"],
    },
    {
      name: "Attendance",
      path: "/attendance",
      description: "View attendance records",
      roles: ["Admin", "Teacher", "Student"],
    },
    {
      name: "Exams",
      path: "/exams",
      description: "Manage examinations",
      roles: ["Admin", "Teacher", "Student"],
    },
    {
      name: "Marks",
      path: "/marks",
      description: "View student marks",
      roles: ["Admin", "Teacher", "Student"],
    },
    {
      name: "Fees",
      path: "/fees",
      description: "Manage student fees",
      roles: ["Admin", "Student"],
    },
    {
      name: "Notices",
      path: "/notices",
      description: "View school notices",
      roles: ["Admin", "Teacher", "Student"],
    },
  ];

  const visibleModules = modules.filter((module) =>
    module.roles.includes(user?.role)
  );

  useEffect(() => {
    const loadDashboardCounts = async () => {
      try {
        setLoading(true);
        setError("");

        const [
          studentsResponse,
          teachersResponse,
          classesResponse,
          subjectsResponse,
        ] = await Promise.all([
          studentService.getStudents(1, 1),
          teacherService.getTeachers(1, 1),
          classService.getClasses(1, 1),
          subjectService.getSubjects(1, 1),
        ]);

        setCounts({
          students:
            studentsResponse.totalCount ??
            studentsResponse.totalRecords ??
            studentsResponse.total ??
            studentsResponse.data?.length ??
            0,

          teachers:
            teachersResponse.totalCount ??
            teachersResponse.totalRecords ??
            teachersResponse.total ??
            teachersResponse.data?.length ??
            0,

          classes:
            classesResponse.totalCount ??
            classesResponse.totalRecords ??
            classesResponse.total ??
            classesResponse.data?.length ??
            0,

          subjects:
            subjectsResponse.totalCount ??
            subjectsResponse.totalRecords ??
            subjectsResponse.total ??
            subjectsResponse.data?.length ??
            0,
        });
      } catch (error) {
        console.error(error);

        setError(
          "Unable to load dashboard statistics."
        );
      } finally {
        setLoading(false);
      }
    };

    loadDashboardCounts();
  }, []);

  if (loading) {
    return <Loader text="Loading dashboard..." />;
  }

  return (
    <div style={{ padding: "25px" }}>
      {/* Welcome Section */}
      <div
        style={{
          background:
            "linear-gradient(135deg, #007bff, #0056b3)",
          color: "#fff",
          padding: "30px",
          borderRadius: "12px",
          marginBottom: "25px",
          boxShadow:
            "0 4px 12px rgba(0,0,0,0.12)",
        }}
      >
        <h1
          style={{
            marginBottom: "10px",
            fontSize: "30px",
          }}
        >
          Welcome, {user?.fullName || "User"} 👋
        </h1>

        <p
          style={{
            margin: 0,
            fontSize: "16px",
            opacity: 0.9,
          }}
        >
          Welcome to your School Management Dashboard
        </p>

        <p
          style={{
            marginTop: "10px",
            marginBottom: 0,
            fontSize: "14px",
            opacity: 0.85,
          }}
        >
          Role: <strong>{user?.role || "User"}</strong>
        </p>
      </div>

      {error && (
        <p
          style={{
            color: "red",
            marginBottom: "20px",
          }}
        >
          {error}
        </p>
      )}

      {/* Statistics */}
      <h2 style={{ marginBottom: "20px" }}>
        Overview
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "18px",
          marginBottom: "35px",
        }}
      >
        {/* Students */}
        <Link
          to="/students"
          style={{
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "22px",
              borderRadius: "10px",
              border: "1px solid #e5e5e5",
              boxShadow:
                "0 2px 8px rgba(0,0,0,0.08)",
            }}
          >
            <p
              style={{
                margin: 0,
                color: "#666",
              }}
            >
              Total Students
            </p>

            <h2
              style={{
                margin: "10px 0 0",
                color: "#007bff",
                fontSize: "32px",
              }}
            >
              {counts.students}
            </h2>
          </div>
        </Link>

        {/* Teachers */}
        <Link
          to="/teachers"
          style={{
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "22px",
              borderRadius: "10px",
              border: "1px solid #e5e5e5",
              boxShadow:
                "0 2px 8px rgba(0,0,0,0.08)",
            }}
          >
            <p
              style={{
                margin: 0,
                color: "#666",
              }}
            >
              Total Teachers
            </p>

            <h2
              style={{
                margin: "10px 0 0",
                color: "#28a745",
                fontSize: "32px",
              }}
            >
              {counts.teachers}
            </h2>
          </div>
        </Link>

        {/* Classes */}
        <Link
          to="/classes"
          style={{
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "22px",
              borderRadius: "10px",
              border: "1px solid #e5e5e5",
              boxShadow:
                "0 2px 8px rgba(0,0,0,0.08)",
            }}
          >
            <p
              style={{
                margin: 0,
                color: "#666",
              }}
            >
              Total Classes
            </p>

            <h2
              style={{
                margin: "10px 0 0",
                color: "#fd7e14",
                fontSize: "32px",
              }}
            >
              {counts.classes}
            </h2>
          </div>
        </Link>

        {/* Subjects */}
        <Link
          to="/subjects"
          style={{
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "22px",
              borderRadius: "10px",
              border: "1px solid #e5e5e5",
              boxShadow:
                "0 2px 8px rgba(0,0,0,0.08)",
            }}
          >
            <p
              style={{
                margin: 0,
                color: "#666",
              }}
            >
              Total Subjects
            </p>

            <h2
              style={{
                margin: "10px 0 0",
                color: "#6f42c1",
                fontSize: "32px",
              }}
            >
              {counts.subjects}
            </h2>
          </div>
        </Link>
      </div>

      {/* Management Modules */}
      <h2 style={{ marginBottom: "20px" }}>
        Management Modules
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
        }}
      >
        {visibleModules.map((module) => (
          <Link
            key={module.path}
            to={module.path}
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <div
              style={{
                backgroundColor: "#fff",
                border: "1px solid #e5e5e5",
                borderRadius: "10px",
                padding: "22px",
                minHeight: "140px",
                boxShadow:
                  "0 2px 8px rgba(0,0,0,0.08)",
                cursor: "pointer",
              }}
            >
              <h3 style={{ marginBottom: "10px" }}>
                {module.name}
              </h3>

              <p
                style={{
                  color: "#666",
                  marginBottom: "18px",
                }}
              >
                {module.description}
              </p>

              <span
                style={{
                  color: "#007bff",
                  fontWeight: "bold",
                }}
              >
                Open →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
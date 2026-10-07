import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import ProtectedRoute from "../components/protected/ProtectedRoute";
import Layout from "../components/layout/Layout";

import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Dashboard from "../pages/Dashboard/Dashboard";
import Profile from "../pages/Profile/Profile";

import StudentList from "../pages/Students/StudentList";
import StudentForm from "../pages/Students/StudentForm";

import TeacherList from "../pages/Teachers/TeacherList";
import TeacherForm from "../pages/Teachers/TeacherForm";

import ClassList from "../pages/Classes/ClassList";
import ClassForm from "../pages/Classes/ClassForm";

import SubjectList from "../pages/Subjects/SubjectList";
import SubjectForm from "../pages/Subjects/SubjectForm";

import ClassSubjectList from "../pages/ClassSubjects/ClassSubjectList";
import ClassSubjectForm from "../pages/ClassSubjects/ClassSubjectForm";

import AttendanceList from "../pages/Attendance/AttendanceList";
import AttendanceForm from "../pages/Attendance/AttendanceForm";

import ExamList from "../pages/Exams/ExamList";
import ExamForm from "../pages/Exams/ExamForm";

import MarkList from "../pages/Marks/MarkList";
import MarkForm from "../pages/Marks/MarkForm";

import FeeList from "../pages/Fees/FeeList";
import FeeForm from "../pages/Fees/FeeForm";

import NoticeList from "../pages/Notices/NoticeList";
import NoticeForm from "../pages/Notices/NoticeForm";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* =========================
            Public Routes
        ========================= */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />


        {/* =========================
            Protected Routes
        ========================= */}

        <Route element={<ProtectedRoute />}>

          <Route element={<Layout />}>

            {/* Dashboard */}

            <Route
              path="/dashboard"
              element={<Dashboard />}
            />


            {/* Profile */}

            <Route
              path="/profile"
              element={<Profile />}
            />


            {/* Students */}

            <Route
              path="/students"
              element={<StudentList />}
            />

            <Route
              path="/students/add"
              element={<StudentForm />}
            />

            <Route
              path="/students/edit/:id"
              element={<StudentForm />}
            />


            {/* Teachers */}

            <Route
              path="/teachers"
              element={<TeacherList />}
            />

            <Route
              path="/teachers/add"
              element={<TeacherForm />}
            />

            <Route
              path="/teachers/edit/:id"
              element={<TeacherForm />}
            />


            {/* Classes */}

            <Route
              path="/classes"
              element={<ClassList />}
            />

            <Route
              path="/classes/add"
              element={<ClassForm />}
            />

            <Route
              path="/classes/edit/:id"
              element={<ClassForm />}
            />


            {/* Subjects */}

            <Route
              path="/subjects"
              element={<SubjectList />}
            />

            <Route
              path="/subjects/add"
              element={<SubjectForm />}
            />

            <Route
              path="/subjects/edit/:id"
              element={<SubjectForm />}
            />


            {/* Class Subjects */}

            <Route
              path="/class-subjects"
              element={<ClassSubjectList />}
            />

            <Route
              path="/class-subjects/add"
              element={<ClassSubjectForm />}
            />

            <Route
              path="/class-subjects/edit/:id"
              element={<ClassSubjectForm />}
            />


            {/* Attendance */}

            <Route
              path="/attendance"
              element={<AttendanceList />}
            />

            <Route
              path="/attendance/add"
              element={<AttendanceForm />}
            />

            <Route
              path="/attendance/edit/:id"
              element={<AttendanceForm />}
            />


            {/* Exams */}

            <Route
              path="/exams"
              element={<ExamList />}
            />

            <Route
              path="/exams/add"
              element={<ExamForm />}
            />

            <Route
              path="/exams/edit/:id"
              element={<ExamForm />}
            />


            {/* Marks */}

            <Route
              path="/marks"
              element={<MarkList />}
            />

            <Route
              path="/marks/add"
              element={<MarkForm />}
            />

            <Route
              path="/marks/edit/:id"
              element={<MarkForm />}
            />


            {/* Fees */}

            <Route
              path="/fees"
              element={<FeeList />}
            />

            <Route
              path="/fees/add"
              element={<FeeForm />}
            />

            <Route
              path="/fees/edit/:id"
              element={<FeeForm />}
            />


            {/* Notices */}

            <Route
              path="/notices"
              element={<NoticeList />}
            />

            <Route
              path="/notices/add"
              element={<NoticeForm />}
            />

            <Route
              path="/notices/edit/:id"
              element={<NoticeForm />}
            />

          </Route>

        </Route>


        {/* =========================
            Default Route
        ========================= */}

        <Route
          path="/"
          element={
            <Navigate
              to="/dashboard"
              replace
            />
          }
        />


        {/* =========================
            Not Found
        ========================= */}

        <Route
          path="*"
          element={
            <Navigate
              to="/dashboard"
              replace
            />
          }
        />

      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
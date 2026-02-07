import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import "./App.css";
import Layout from "./Layout";
// import Dashboard from "./Componets/dashboard/Dashboard";
import "bootstrap/dist/css/bootstrap.min.css";
import StudentCreateFrom from "./pages/student-craete-from/StudentCreateFrom";
import StudentsTable from "./pages/students/StudentsTable";
import StudentEditForm from "./pages/student-craete-from/StudentEditForm";

import { LanguageProvider } from "./context/LanguageContext";
import Login from "./Componets/Login/Login";
import ProtectedRoute from "./Componets/Login/ProtectedRoute";
// src/App.js
import "bootstrap/dist/css/bootstrap.min.css";
// ... rest of your App
import Records from "./pages/records/Records";
import NewStudentRecords from "./pages/records/NewStudentRecords";
import OldStudentRecords from "./pages/records/OldStudentRecords";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* Public Route */}
        <Route path="/" element={<Login />} />

        {/* Protected Layout */}
        <Route
          path="/layout"
          element={
            // <ProtectedRoute>
              <Layout />
            // </ProtectedRoute>
          }
        >
          {/* <Route
            index
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          /> */}

          <Route
            path="student-create-form"
            element={
              // <ProtectedRoute>
                <StudentCreateFrom />
              // </ProtectedRoute>
            }
          />

          <Route
            path="students-table"
            element={
              // <ProtectedRoute>
                <StudentsTable />
              // </ProtectedRoute>
            }
          />
          <Route
            path="records"
            element={
              // <ProtectedRoute>
                <Records />
              // </ProtectedRoute>
            }
          />
          <Route
            path="new-records"
            element={
              // <ProtectedRoute>
                <NewStudentRecords />
              // </ProtectedRoute>
            }
          />
          <Route
            path="old-records"
            element={
              // <ProtectedRoute>
                <OldStudentRecords />
              // </ProtectedRoute>
            }
          />

          <Route
            path="student/edit/:id"
            element={
              // <ProtectedRoute>
                <StudentEditForm />
              // </ProtectedRoute>
            }
          />
        </Route>
      </>,
    ),
  );

  return (
    <LanguageProvider>
      <RouterProvider router={router} />
    </LanguageProvider>
  );
}

export default App;

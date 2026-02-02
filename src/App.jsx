import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import "./App.css";
import Layout from "./Layout";
import Dashboard from "./Componets/dashboard/Dashboard";
import "bootstrap/dist/css/bootstrap.min.css";
import StudentCreateFrom from "./Componets/forms/student-craete-from/StudentCreateFrom";
import StudentsTable from "./Componets/forms/students/StudentsTable";
import StudentEditForm from "./Componets/forms/student-craete-from/StudentEditForm";

import { LanguageProvider } from "./context/LanguageContext";
import Login from "./Componets/Login/Login";
import ProtectedRoute from "./Componets/Login/ProtectedRoute";
// src/App.js
import "bootstrap/dist/css/bootstrap.min.css";
// ... rest of your App

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
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route
            index
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="student-create-form"
            element={
              <ProtectedRoute>
                <StudentCreateFrom />
              </ProtectedRoute>
            }
          />

          <Route
            path="students-table"
            element={
              <ProtectedRoute>
                <StudentsTable />
              </ProtectedRoute>
            }
          />

          <Route
            path="student/edit/:id"
            element={
              <ProtectedRoute>
                <StudentEditForm />
              </ProtectedRoute>
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

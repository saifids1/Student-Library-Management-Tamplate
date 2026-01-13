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

// import "primereact/resources/themes/lara-light-cyan/theme.css";
// import "primereact/resources/themes/lara-light-blue/theme.css";
// import "primereact/resources/themes/bootstrap4-light-blue/theme.css"

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="student-create-form" element={<StudentCreateFrom />} />
          <Route path="students-table" element={<StudentsTable />} />
        </Route>
        {/* <Route path='/register-login'>
          <Route path='' element={< RegisterLogin />} />
          <Route path='security-code' element={< SecurityCode />} />

        </Route> */}
      </Route>
    )
  );
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;

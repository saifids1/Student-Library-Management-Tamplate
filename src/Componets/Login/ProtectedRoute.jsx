
// import { Navigate } from "react-router-dom";

// const ProtectedRoute = ({ children }) => {
//   const auth = JSON.parse(localStorage.getItem("auth"));

  

//   if (!auth || !auth.isLoggedIn) {
//     return <Navigate to="/" replace />;
//   }


//   if (auth.role?.toLowerCase() !== "Admin" || auth.role?.toLowerCase() !=="SubAdmin") {
//     return <Navigate to="/" replace />;
//   }

//   return children;
// };

// export default ProtectedRoute;

import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const auth = JSON.parse(localStorage.getItem("auth"));

  if (!auth || !auth.isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  else{
    // return <Navigate to="" replace />;

  }

  return children;
};

export default ProtectedRoute;





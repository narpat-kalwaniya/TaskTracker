import { Routes, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./layout/AppBar";
import TaskTracker from "./pages/TaskTracker";
import ProjectTracker from "./pages/ProjectTracker";
import Login from "./pages/Auth/Login";
import AccessDenied from "./pages/Auth/AccessDenied";
import { error_messages } from "./configs/constants";
import ProtectedRoutes from "./pages/Auth/ProtectedRoutes";
import LoginError from "./pages/Auth/LoginError";
import ManageAccess from "./pages/ManageAccess/ManageAccess";

function App() {
  return (
    <Routes>
      <Route element={<ProtectedRoutes />}>
        <Route
          path="*"
          element={
            <>
              <NavBar />
              <div
                style={{
                  marginTop: "64px",
                  height: "auto",
                  minHeight: "100vh",
                  background: "#F9FAFB",
                  paddingRight: "120px",
                }}
              >
                <Routes>
                  <Route path="/" element={<ProjectTracker />} />
                  <Route path="/tasks" element={<TaskTracker />} />
                  <Route path="/projects" element={<ProjectTracker />} />
                  <Route path="/manage-access" element={<ManageAccess />} />
                </Routes>
              </div>
            </>
          }
        ></Route>
      </Route>
      <Route path="/login" element={<Login />} />
      <Route
        path="/access-denied"
        element={
          <AccessDenied
            headerText={error_messages.access_denied_text}
            descriptionText={error_messages.access_denied_des}
          />
        }
      />
      <Route path="/login-error" element={<LoginError />} />
    </Routes>
  );
}

export default App;

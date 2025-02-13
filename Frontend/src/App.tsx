import { Routes, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./layout/AppBar";
import TaskTracker from "./pages/TaskTracker";
import ProjectTracker from "./pages/ProjectTracker";
import Login from "./pages/Auth/Login";
import { useAuth } from "./hooks/useAuth";
import AccessDenied from "./pages/Auth/AccessDenied";
import { error_messages } from "./configs/constants";
import ProtectedRoutes from "./pages/Auth/ProtectedRoutes";
import LoginError from "./pages/Auth/LoginError";

function App() {
  useAuth();
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
                  height: "95vh",
                }}
              >
                <Routes>
                  <Route path="/" element={<TaskTracker />} />
                  <Route path="/tasks" element={<TaskTracker />} />
                  <Route path="/projects" element={<ProjectTracker />} />
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

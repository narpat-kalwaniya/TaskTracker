import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./layout/AppBar";
import { CssBaseline, ThemeProvider } from "@mui/material";
import TaskTracker from "./pages/TaskTracker";
import theme from "./theme";
import ProjectTracker from "./pages/ProjectTracker";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<TaskTracker />} />
          <Route path="/tasks" element={<TaskTracker />} />
          <Route path="/projects" element={<ProjectTracker />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;

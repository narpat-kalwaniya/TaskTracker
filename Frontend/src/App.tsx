import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./layout/AppBar";
import { CssBaseline, ThemeProvider } from "@mui/material";
import TaskTracker from "./pages/TaskTracker";
import theme from "./theme";
import ProjectTracker from "./pages/ProjectTracker";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
}

export default App;

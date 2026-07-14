import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import Signin from "../Pages/Signin";
import { PrivateRoute } from "./PrivateRoutes";
import Projects from "../Pages/Projects";
import ProjectsDetails from "../Pages/ProjectDetails";
import LandingPage from "../Pages/LandingPage";
import { SidebarProvider } from "../contexts/sidebarProvider";
import CalendarPage from "../Pages/Calendar";
import Signup from "../Pages/Signup";
import SettingsPage from "../Pages/SettingsPage";
import ProjectModal from "@/Pages/Projects/Components/ProjectDetails";
import Team from "@/Pages/Team";

function RoutesApp() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/home"
        element={
          <PrivateRoute>
            <SidebarProvider>
              <Home />
            </SidebarProvider>
          </PrivateRoute>
        }
      />
      <Route
        path="/calendar"
        element={
          <PrivateRoute>
            <SidebarProvider>
              <CalendarPage />
            </SidebarProvider>
          </PrivateRoute>
        }
      />
      <Route
        path="/team"
        element={
          <PrivateRoute>
            <SidebarProvider>
              <Team />
            </SidebarProvider>
          </PrivateRoute>
        }
      />
      <Route
        path="/projects"
        element={
          <PrivateRoute>
            <SidebarProvider>
              <Projects />
            </SidebarProvider>
          </PrivateRoute>
        }
      />
      <Route
        path="/projects/:id"
        element={
          <PrivateRoute>
            <SidebarProvider>
              <ProjectsDetails />
            </SidebarProvider>
          </PrivateRoute>
        }
      />

      <Route
        path="/settings"
        element={
          <PrivateRoute>
            <SidebarProvider>
              <SettingsPage />
            </SidebarProvider>
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default RoutesApp;

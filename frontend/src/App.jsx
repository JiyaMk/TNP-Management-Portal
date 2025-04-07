import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // ✅ Correct import
import { ThemeProvider } from "@/components/theme-provider";
import StudentProfile from "./components/pages/StudentProfile";
import CompanyProfile from "./components/pages/CompanyProfile";
import StudentDashboard from "./components/pages/StudentDashboard";
import Navbar from "./components/Navbar";
import LoginPage from "./components/pages/Login";
import SignUpPage from "./components/pages/SignUpPage";
import ManagementHeadDashboard from "./components/pages/ManagementHeadDashboard";
import DatabaseGenPage from "./components/pages/DatabaseGenPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProfileForm from "./components/pages/ProfileForm";


function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
      <Navbar/>
        <Routes>
          <Route path="/" element={<ManagementHeadDashboard />} />
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/profile" element={<StudentProfile />} />
          <Route path="/company-profile" element={<CompanyProfile/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/SignUp" element={<SignUpPage/>} />
          <Route path="/database-gen-page" element={<DatabaseGenPage/>} />
          <Route path="/ProfileForm" element={<ProfileForm/>} />
          <Route path="/form-page" element={<ProfileForm/>} />
          
          
        </Routes>
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick pauseOnFocusLoss draggable pauseOnHover theme="dark" />
      </Router>
    </ThemeProvider>
  );
}

export default App;

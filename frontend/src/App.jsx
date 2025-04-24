import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // ✅ Correct import
import { ThemeProvider } from "@/components/theme-provider";
import StudentProfileEdit from "./components/pages/StudentProfileEdit";
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
import LandingPage from "./components/pages/Landing";
import Footer from "./components/ui/footer";
import Profile from "./components/pages/Profile";
import { Unauthorized } from "./components/pages/Unauthorized";


function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Router>
      <Navbar/>
        <Routes>
          <Route path="/" element={<LandingPage/>} />
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/company-profile" element={<CompanyProfile/>} />
          <Route path="/management-head-dashboard" element={<ManagementHeadDashboard/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/SignUp" element={<SignUpPage/>} />
          <Route path="/database-gen-page" element={<DatabaseGenPage/>} />
          <Route path="/ProfileForm" element={<ProfileForm/>} />
          <Route path="/form-page" element={<ProfileForm/>} />
          <Route path="/StudentProfile" element={<StudentProfileEdit/>} />
          <Route path="/unauthorized" element={<Unauthorized/>} />
          
          
          
        </Routes>
        <Footer/>
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick pauseOnFocusLoss draggable pauseOnHover theme="dark" />
      </Router>
    </ThemeProvider>
  );
}

export default App;

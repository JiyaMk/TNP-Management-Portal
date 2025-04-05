import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // ✅ Correct import
import { ThemeProvider } from "@/components/theme-provider";
import StudentProfile from "./components/pages/StudentProfile";
import CompanyProfile from "./components/pages/CompanyProfile";
import StudentDashboard from "./components/pages/StudentDashboard";
import Navbar from "./components/Navbar";
import LoginPage from "./components/pages/Login";
import SignUpPage from "./components/pages/SignUpPage";


function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
      <Navbar/>
        <Routes>
          <Route path="/" element={<StudentDashboard />} />
          <Route path="/profile" element={<StudentProfile />} />
          <Route path="/company-profile" element={<CompanyProfile/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/SignUp" element={<SignUpPage/>} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;

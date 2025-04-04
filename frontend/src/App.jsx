import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // ✅ Correct import
import { ThemeProvider } from "@/components/theme-provider";
import StudentProfile from "./components/pages/StudentProfile";
import CompanyProfile from "./components/pages/CompanyProfile";
import StudentDashboard from "./components/pages/StudentDashboard";
import Navbar from "./components/Navbar";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<StudentDashboard />} />
          <Route path="/profile" element={<StudentProfile />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;

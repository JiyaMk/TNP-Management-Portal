import { ThemeProvider } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./components/mode-toggle";
import StudentProfile from "./components/pages/StudentProfile";
import CompanyProfile from "./components/pages/CompanyProfile";
import StudentDashboard from "./components/pages/StudentDashboard";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      {/* <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4">
        <h1 className="text-3xl font-bold mb-6">ShadCN Theme & Button Demo</h1>
        <ModeToggle></ModeToggle>
        <Button variant="default">Default Button</Button>
      </div> */}
    
    <CompanyProfile />;
    </ThemeProvider>
  );
}

export default App;

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import api from "@/utils/apiRequest";

const StudentDashboard = () => {
  const [listingsData, setListingsData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/company/get-details", { withCredentials: true });
        setListingsData(res.data.companies);
      } catch (err) {
        console.error(err.response?.data?.message || "Failed to fetch companies");
      }
    };
  
    fetchData(); 
  }, []);
  

  const progressData = [
    { company: "Google", date: "2025-04-01" },
    { company: "Amazon", date: "2025-03-28" },
    { company: "Microsoft", date: "2025-03-25" },
    { company: "Meta", date: "2025-03-20" },
    { company: "Apple", date: "2025-03-15" },
    { company: "Google", date: "2025-04-01" },
    { company: "Amazon", date: "2025-03-28" },
    { company: "Microsoft", date: "2025-03-25" },
    { company: "Meta", date: "2025-03-20" },
    { company: "Apple", date: "2025-03-15" },
  ];

  

  const [showAll, setShowAll] = useState(false);

  return (
    
    <div className="p-6 space-y-6">
      <h1 className="text-center font-extrabold text-3xl ">Dashboard</h1>
      {/* Progress Section */}
      <div className=" p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Hi [Name], Your data has been sent to:</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {progressData.slice(0, showAll ? progressData.length : 5).map((item, index) => (
            <Card key={index} className="mb-2">
              <CardContent className="p-4 flex flex-col items-center text-center">
                <span className="text-lg font-medium">{item.company}</span>
                <span className="text-gray-500">sent on : {item.date}</span>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="flex justify-center items-center">
        {progressData.length > 6 && (
          <Button variant="outline" className="mt-4 w-32 justify-center flex items-center" onClick={() => setShowAll(!showAll)}>
            {showAll ? "Show Less" : "See More"}
          </Button>
        )}
        </div>
      </div>

      {/* Listings Section */}
      <div className=" p-15 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Company Listings</h2>
        {listingsData.map((item, index) => (
          <Card key={index} className="mb-4 shadow-md">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center">
              <div className="mb-2 md:mb-0">
                <h3 className="text-xl font-bold">{item.name}</h3>
                <p className="text-sm text-gray-600">{item.role}</p>
              </div>
        
              <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm text-gray-700">
                <div>
                  <span className="font-medium">Stipend:</span> ₹{item.stipend}
                </div>
                <div>
                <span className="font-medium">Apply by:</span>{" "}
                {new Date(item.lastDate).toLocaleDateString()}
                </div>
                <div>
                  <span className="font-medium">Location:</span> {item.location}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        ))}
      </div>
    </div>
  );
};

export default StudentDashboard;

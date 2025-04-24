import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import api, { notify } from "@/utils/apiRequest";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManagementHeadDashboard = () => {
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

  // Define button handlers
  const handleGenerateDatabase = (item) => {
    console.log(`Generating database for ${item.company}`);
    // Your logic here
  };

  const handleNotify = async (item) => {
    console.log(`Notifying for ${item.company}`);
    try {
      const res = await notify(item._id); 
      toast.success(`Notification sent: ${res.data.message}`);
    } catch (error) {
      console.error("Notify error:", error);
      toast.error("Failed to send notification");
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-center font-extrabold text-3xl text-[#3c8c84]">Dashboard</h1>

      {/* Progress Section */}
      {/* <div className="p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">
          Hi [Name], Your data has been sent to:
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {progressData
            .slice(0, showAll ? progressData.length : 5)
            .map((item, index) => (
              <Card key={index} className="mb-2 border-[#3c8c84]">
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <span className="text-lg font-medium">{item.company}</span>
                  <span className="text-gray-500">sent on: {item.date}</span>
                </CardContent>
              </Card>
            ))}
        </div>
        <div className="flex justify-center items-center">
          {progressData.length > 6 && (
            <Button
              variant="outline"
              className="mt-4 w-32 justify-center flex items-center"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? "Show Less" : "See More"}
            </Button>
          )}
        </div>
      </div> */}

      {/* Listings Section */}
      <div className="p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Company Listings</h2>
        {listingsData.map((item, index) => (
          console.log(item),
          <Card key={index} className="mb-2 border-[#3c8c84]">
            <CardContent className="p-4 flex flex-col sm:flex-row justify-between items-center text-center sm:text-left gap-4 ">
              {/* Company Name and Date */}
              <div className="flex flex-col md:flex-row md:justify-between md:items-center">
              <div className="mb-2 md:mb-0">
                <h3 className="text-xl font-bold">{item.name}</h3>
                <p className="text-sm text-gray-600">{item.role}</p>
              </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                <Link to="/database-gen-page" className="w-full sm:w-40">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => handleGenerateDatabase(item)}
                  >
                    Generate Database
                  </Button>
                </Link>
                <Button
                  
                  variant="default"
                  className="w-full sm:w-40 bg-[#3c8c84]"
                  onClick={() => handleNotify(item)}
                >
                  Notify
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
    
  );
};

export default ManagementHeadDashboard;

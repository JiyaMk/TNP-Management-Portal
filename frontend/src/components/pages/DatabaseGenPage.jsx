import React, { useState, useEffect } from "react";
import { FaFilter, FaList } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { exportFilteredStudents, getStudentDetails } from "@/utils/apiRequest"; 
import { useNavigate } from "react-router-dom";

const fields = [
  "Name", "Roll No", "10th Marks", "12th Marks", "Backlogs", "Phone Number",
  "Year", "Semester", "Branch", "CGPA", "Certifications"
];

const fieldMapping = {
  "Name": "name",
  "Roll No": "rollNumber",
  "10th Marks": "marks10th",
  "12th Marks": "marks12th",
  "Backlogs": "backlog",
  "Phone Number": "phoneNumber",
  "Year": "year",
  "Semester": "semester",
  "Branch": "branch",
  "CGPA": "CGPA",
  "Certifications": "certifications"
};


const branches = ["CSE", "ECE", "IT", "ECE-AI", "AI-ML", "MECH", "CIVIL"];

const DatabasePage = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]); 
  const [visibleFields, setVisibleFields] = useState(fields);
  const [filters, setFilters] = useState({ tenth: 0, twelfth: 0, cgpa: 0, backlog: "all", branch: "all" });

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "management_head") {
      navigate("/unauthorized"); 
    }
  }, [navigate]);
  

  useEffect(() => {
    const fetchStudentDataFromAPI = async () => {
      try {
        const response = await getStudentDetails(); 
        console.log("Fetched student data:", response.data.students); 
        setStudents(response.data.students); 
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };

    fetchStudentDataFromAPI();
  }, []);

  
  useEffect(() => {
    console.log("Students state updated:", students);
  }, [students]);
  const toggleField = (field) => {
    setVisibleFields((prev) => prev.includes(field) ? prev.filter(f => f !== field) : [...prev, field]);
  };

  const toggleAllFields = () => {
    setVisibleFields(visibleFields.length === fields.length ? [] : fields);
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const filteredStudents = students.filter(student => {
    const tenthMarks = parseFloat(student["10th Marks"]);
    const twelfthMarks = parseFloat(student["12th Marks"]);
    const cgpa = parseFloat(student.CGPA);
    const backlog = student.Backlogs; 
    const branch = student.Branch;
  
    return (
      tenthMarks >= filters.tenth &&
      twelfthMarks >= filters.twelfth &&
      cgpa >= filters.cgpa &&
      (filters.backlog === "all" || (filters.backlog === "0" ? backlog === 0 : backlog > 0)) &&
      (filters.branch === "all" || branch === filters.branch)
    );
  });
  

  const handleExport = async () => {
    try {
      const exportData = {
        fields: visibleFields.map(field => fieldMapping[field]), 
        min10th: filters.tenth,
        min12th: filters.twelfth,
        minCGPA: filters.cgpa,
      };
  
      const response = await exportFilteredStudents(exportData, visibleFields);
  
      const fileURL = response.data.file.filepath;
  
      const link = document.createElement('a');
      link.href = fileURL;
      link.download = 'filtered_students.xlsx'; // Set the default filename for download
      link.click();
    } catch (error) {
      console.error("Error exporting data:", error);
    }
  };

  return (
    <div className="flex flex-col p-6 h-screen">
      <div className="flex gap-4 mb-6 ">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2 ">
              <FaList className="text-xl" /> Fields
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-6 w-80">
            <h2 className="text-xl font-semibold mb-4">Select Fields</h2>
            <Button className="w-full mb-3  bg-[#3c8c84]" onClick={toggleAllFields}>
              {visibleFields.length === fields.length ? "Deselect All" : "Select All"}
            </Button>
            <div className="max-h-[100vh] overflow-y-auto">
              {fields.map((field) => (
                <label key={field} className="flex items-center mb-2 cursor-pointer">
                  <input type="checkbox" checked={visibleFields.includes(field)} onChange={() => toggleField(field)} className="mr-2" />
                  {field}
                </label>
              ))}
            </div>
          </SheetContent>
        </Sheet>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2 ">
              <FaFilter className="text-xl" /> Filters
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="p-6 w-80">
            <h2 className="text-xl font-semibold mb-4">Filters</h2>
            <div className="space-y-3">
              <input type="number" name="tenth" placeholder="10th Marks" className="w-full p-2 border rounded bg-transparent" onChange={handleFilterChange} />
              <input type="number" name="twelfth" placeholder="12th Marks" className="w-full p-2 border rounded bg-transparent" onChange={handleFilterChange} />
              <input type="number" step="0.1" name="cgpa" placeholder="CGPA" className="w-full p-2 border rounded bg-transparent" onChange={handleFilterChange} />
              <select name="backlog" className="w-full p-2 border rounded bg-transparent" onChange={handleFilterChange}>
                <option value="all">All</option>
                <option value="0">No Backlogs</option>
                <option value="1">With Backlogs</option>
              </select>
              <select name="branch" className="w-full p-2 border rounded bg-transparent" onChange={handleFilterChange}>
                <option value="all">All Branches</option>
                {branches.map(branch => (
                  <option key={branch} value={branch}>{branch}</option>
                ))}
              </select>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className="flex-1 overflow-auto p-4 shadow rounded-lg">
  <table className="w-full border text-sm">
    <thead className="bg-[#3c8c84] text-white">
      <tr>
        {visibleFields.map((field) => (
          <th key={field} className="border px-4 py-2 text-left">
            {field}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {students.length > 0 ? (
        students.map((student) => (
          <tr key={student._id}>
            {visibleFields.map((field) => {
              const actualField = fieldMapping[field]; // Get the actual field name from the mapping
              return (
                <td key={field} className="border px-4 py-2">
                  {actualField === "certifications" ? (
                    <span className="block max-w-xs truncate">
                      {student[actualField] && student[actualField].length > 0
                        ? student[actualField]
                        : "-"}
                    </span>
                  ) : (
                    student[actualField] && student[actualField] !== "" ? (
                      student[actualField]
                    ) : (
                      "-"
                    )
                  )}
                </td>
              );
            })}
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={visibleFields.length} className="text-center py-2">
            No students available
          </td>
        </tr>
      )}
    </tbody>
  </table>
</div>

      <div className="mt-4 flex justify-end">
        <Button className="bg-[#3c8c84] text-white px-4 py-2 rounded" onClick={handleExport}>Send DB</Button>
      </div>
    </div>
  );
};

export default DatabasePage;

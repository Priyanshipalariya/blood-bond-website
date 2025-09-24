import React, { useState } from "react";
import { createBloodCamp } from "../services/firestore";
import { sampleBloodCamps } from "../utils/sampleData";
import { Card, CardContent, CardHeader, CardTitle } from "../components/Card";
import { Button } from "../components/Button";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminPage = () => {
  const [isCreating, setIsCreating] = useState(false);

  const createSampleCamps = async () => {
    setIsCreating(true);
    try {
      for (const camp of sampleBloodCamps) {
        await createBloodCamp(camp);
      }
      toast.success('Sample blood camps created successfully!', {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (error) {
      console.error("Error creating sample camps:", error);
      toast.error('Error creating sample camps', {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-14rem)] bg-gray-100 py-8 px-4">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-center text-red-600">Admin Panel</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Sample Data Management</h3>
              <p className="text-gray-600 mb-4">
                Create sample blood camps for testing the blood donation registration system.
              </p>
              
              <Button
                onClick={createSampleCamps}
                disabled={isCreating}
                className="w-full bg-red-600 hover:bg-red-700 text-white"
              >
                {isCreating ? "Creating Sample Camps..." : "Create Sample Blood Camps"}
              </Button>
            </div>

            <div className="border-t pt-6">
              <h4 className="font-semibold mb-2">Sample Camps to be Created:</h4>
              <div className="space-y-2">
                {sampleBloodCamps.map((camp, index) => (
                  <div key={index} className="bg-gray-50 p-3 rounded">
                    <div className="font-medium">{camp.campName}</div>
                    <div className="text-sm text-gray-600">
                      {camp.location} - {camp.district}, {camp.state}
                    </div>
                    <div className="text-sm text-gray-500">
                      {camp.campDate.toLocaleDateString()} at {camp.campTime}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminPage;

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "../components/Card";
import { Button } from "../components/Button";
import { FiUsers, FiHeart, FiMapPin, FiCalendar, FiPhone, FiAlertCircle } from "react-icons/fi";
import { useAuth } from "../Context/AuthContext";

const FindDonorPage = () => {
  const { requestId } = useParams();
  const navigate = useNavigate();
  const { getBloodRequestById, findAvailableDonors, updateBloodRequestStatus, deleteBloodRequest } = useAuth();
  const [request, setRequest] = useState(null);
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [marking, setMarking] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const req = await getBloodRequestById(requestId);
        if (!req) {
          navigate("/");
          return;
        }
        setRequest(req);
        const ds = await findAvailableDonors(req.bloodType, req.location?.pincode);
        setDonors(ds);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [requestId, getBloodRequestById, findAvailableDonors, navigate]);

  const handleFulfilled = async () => {
    if (!request) return;
    setMarking(true);
    try {
      await updateBloodRequestStatus(request.id, 'fulfilled');
      // delay delete to allow propagation / UX
      setTimeout(async () => {
        await deleteBloodRequest(request.id);
        navigate("/profile");
      }, 1500);
    } finally {
      setMarking(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-14rem)] flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (!request) return null;

  return (
    <div className="min-h-[calc(100vh-14rem)] bg-white py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <Card className="border-2 border-gray-200 shadow-lg">
          <CardHeader>
            <CardTitle>Request Details</CardTitle>
            <CardDescription className="text-gray-600">Keep this page open until your request is fulfilled.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div><span className="text-gray-600">Patient:</span> <span className="font-medium">{request.patientName} ({request.patientAge})</span></div>
              <div><span className="text-gray-600">Blood Type:</span> <span className="font-medium">{request.bloodType}</span></div>
              <div><span className="text-gray-600">Units Needed:</span> <span className="font-medium">{request.unitsNeeded}</span></div>
              <div><span className="text-gray-600">Hospital:</span> <span className="font-medium">{request.hospitalName}</span></div>
              <div><span className="text-gray-600">Pincode:</span> <span className="font-medium">{request.location?.pincode}</span></div>
              <div><span className="text-gray-600">Urgency:</span> <span className="font-medium capitalize">{request.urgencyLevel}</span></div>
              {request.scheduledDate && (
                <div><span className="text-gray-600">When Needed:</span> <span className="font-medium">{new Date(request.scheduledDate).toLocaleDateString()}</span></div>
              )}
              <div><span className="text-gray-600">Contact:</span> <span className="font-medium">{request.contactName} ({request.contactPhone})</span></div>
            </div>

            <div className="mt-6 flex gap-3">
              <Button className="bg-green-600 hover:bg-green-700" onClick={handleFulfilled} disabled={marking}>
                {marking ? 'Marking…' : 'Mark as Fulfilled'}
              </Button>
              <Button variant="outline" onClick={() => navigate('/profile')}>
                Go to Profile
              </Button>
            </div>
          </CardContent>
        </Card>

        {donors.length > 0 ? (
          <Card className="border-2 border-green-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-green-600 flex items-center gap-2">
                <FiUsers className="h-5 w-5" />
                Available Donors
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {donors.map((donor) => (
                  <div key={donor.id} className="border border-green-200 rounded-lg p-4 bg-green-50">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-green-800 text-lg">{donor.donorName}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-3 text-sm">
                          <div className="flex items-center gap-2"><FiHeart className="h-4 w-4 text-green-600" /><span>Blood Group: <strong className="text-green-800">{donor.bloodGroup}</strong></span></div>
                          <div className="flex items-center gap-2"><FiPhone className="h-4 w-4 text-green-600" /><span>Contact: <strong className="text-green-800">{donor.phone}</strong></span></div>
                          <div className="flex items-center gap-2"><FiMapPin className="h-4 w-4 text-green-600" /><span>{donor.location.city}, {donor.location.district}</span></div>
                          <div className="flex items-center gap-2"><FiCalendar className="h-4 w-4 text-green-600" /><span>Registered: {donor.registrationDate?.toDate?.()?.toLocaleDateString() || 'N/A'}</span></div>
                        </div>
                      </div>
                      <div className="ml-4 flex flex-col gap-2">
                        <a href={`tel:${donor.phone}`} className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm font-medium">
                          <FiPhone className="h-4 w-4" />
                          Call Now
                        </a>
                        <div className="text-xs text-center text-gray-600">{donor.phone}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
                <p className="text-sm text-blue-800"><FiAlertCircle className="inline h-4 w-4 mr-1" />Please contact donors directly using the provided phone numbers.</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="border-2 border-yellow-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-yellow-600 flex items-center gap-2"><FiAlertCircle className="h-5 w-5" />Sorry, no donors found</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">Please try nearby pincodes or contact emergency hotline: <strong>108</strong>.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default FindDonorPage;



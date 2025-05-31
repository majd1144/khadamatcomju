import React, { useEffect, useState } from "react";
import axios from "axios";
import "./RequestedServices.css";

const RequestedServices = () => {
  const [user, setUser] = useState(null);
  const [requests, setRequests] = useState([]);
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingRequests, setLoadingRequests] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLoggedInUser = async () => {
      try {
        setLoadingUser(true);
        const res = await axios.get("http://localhost:4000/users/loggedin_user", {
          withCredentials: true,
        });
        setUser(res.data);
      } catch {
        setError("Failed to load user information.");
      } finally {
        setLoadingUser(false);
      }
    };

    fetchLoggedInUser();
  }, []);

  useEffect(() => {
    if (!user?.id) return;

    const fetchRequests = async () => {
      try {
        setLoadingRequests(true);
        const res = await axios.get(`http://localhost:4000/requests/users/${user.id}`, {
          withCredentials: true,
        });
        setRequests(res.data);
      } catch {
        setError("Failed to load requests.");
      } finally {
        setLoadingRequests(false);
      }
    };

    fetchRequests();
  }, [user]);

  const handleCancel = async (requestId) => {
    const confirmCancel = window.confirm("Are you sure you want to cancel this order?");
    if (!confirmCancel) return;

    try {
      await axios.delete(`http://localhost:4000/requests/${requestId}`, {
        withCredentials: true,
      });
      setRequests((prev) => prev.filter((req) => req.id !== requestId && req._id !== requestId));
    } catch (err) {
      alert("Failed to cancel the request. Try again.");
    }
  };

  if (loadingUser) return <p className="loading">Loading user information...</p>;
  if (loadingRequests) return <p className="loading">Loading orders...</p>;
  if (error) return <p className="error">{error}</p>;

  const statuses = ["pending", "accepted", "rejected", "completed"];

  return (
    <div className="requested-services-container">
      <h2 className="page-title">My Request</h2>
      {statuses.map((status) => {
        const filtered = requests.filter((r) => r.status.toLowerCase() === status);
        if (!filtered.length) return null;

        return (
          <section key={status}>
            <h3 className="status-title">{status.toUpperCase()}</h3>
            <div className="card-grid">
              {filtered.map((req) => (
                <div key={req.id || req._id} className={`request-card ${status}`}>
                  <div className="card-header">
                    {/* <img
                      src={req.worker_image || "https://via.placeholder.com/60"}
                      alt="worker"
                      className="worker-image"
                    /> */}
                    <span className="badge">{status}</span>
                  </div>
                  <div className="card-content">
                    <p>💼 <strong>The service:</strong> {req.servicecategory || "unavailable"}</p>
                    <p>💰 <strong>The price:</strong> {req.fee ?? "unavailable"} JD</p>
                    {/* <p>📍 <strong>The location</strong> {req.location || "unavailable"}</p> */}
                    <p>🧑‍🔧 <strong>Worker name:</strong> {req.worker_firstname && req.worker_lastname ? ` ${req.worker_firstname} ${req.worker_lastname}` : " غير معروف"}</p>
                    {/* <p>⭐ <strong>The rating:</strong> {req.worker_rating ? `${req.worker_rating}/5` : "unavailable"}</p> */}
                    <p>🕒 <strong>Order date:</strong> {new Date(req.createdat || req.createdAt).toLocaleString()}</p>
                  </div>
                  {status === "pending" && (
                    <button
                      className="cancel-button"
                      onClick={() => handleCancel(req.id || req._id)}
                    >
                      ❌ Cancel order
                    </button>
                  )}
                </div>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default RequestedServices;
































/*

import React, { useEffect, useState } from "react";
import "./RequestedServices.css";

const RequestedServices = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const mockData = [
      {
        id: 1,
        status: "Pending",
        createdAt: new Date().toISOString(),
        worker: {
          user: { name: "Ahmad Ali" },
          jobType: "Electrician",
          price: 25,
        },
      },
      {
        id: 2,
        status: "Accepted",
        createdAt: new Date().toISOString(),
        worker: {
          user: { name: "Sara Hasan" },
          jobType: "Babysitter",
          price: 40,
        },
      },
      {
        id: 3,
        status: "Rejected",
        createdAt: new Date().toISOString(),
        worker: {
          user: { name: "Mohammad Zaid" },
          jobType: "Painter",
          price: 30,
        },
     },
      {
        id: 4,
        status: "Accepted",
        createdAt: new Date().toISOString(),
        worker: {
          user: { name: "Ayham Zataimeh" },
          jobType: "Carbenter",
          price: 150,
        }
      },{
        id: 5,
        status: "Accepted",
        createdAt: new Date().toISOString(),
        worker: {
          user: { name: "raghad saadat" },
          jobType: "Teacher",
          price: 10,
        }
      },
    ];

    setTimeout(() => {
      setRequests(mockData);
      setLoading(false);
    }, 1000);
  }, []);

  const handleCancel = (requestId) => {
    const confirmCancel = window.confirm("Are you sure you want to cancel this request?");
    if (!confirmCancel) return;

    setRequests(prev => prev.filter(req => req.id !== requestId));
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="requested-services">
      <h2>My Requested Services</h2>
      <hr/>
      {requests.length === 0 ? (
        <p>No requested services found.</p>
      ) : (
        <div className="services-list">
          {requests.map((req) => (
            <div key={req.id} className={`service-card status-${req.status.toLowerCase()}`}>
              <h3>{req.worker.user.name} - {req.worker.jobType}</h3>
              <p><strong>Price:</strong> {req.worker.price} JD</p>
              <p><strong>Status:</strong> {req.status}</p>
              <p><strong>Requested at:</strong> {new Date(req.createdAt).toLocaleString()}</p>
              {req.status === "Pending" && (
                <button className="cancel-button" onClick={() => handleCancel(req.id)}>Cancel Request</button>
              )}
            </div>
            
          ))}
        
        </div>
      )}
    </div>
  );
};

export default RequestedServices;



// // RequestedServices.jsx
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./RequestedServices.css";

// const RequestedServices = () => {
//   const [requests, setRequests] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchRequestedServices = async () => {
//       try {
//         const res = await axios.get("http://localhost:4000/requests/user", { withCredentials: true });
//         setRequests(res.data);
//       } catch (err) {
//         console.error("Error fetching requested services:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRequestedServices();
//   }, []);

//   const handleCancel = async (requestId) => {
//     const confirmCancel = window.confirm("Are you sure you want to cancel this request?");
//     if (!confirmCancel) return;

//     try {
//       await axios.delete(`http://localhost:4000/requests/${requestId}`);
//       setRequests(prev => prev.filter(req => req.id !== requestId));
//     } catch (err) {
//       console.error("Error cancelling request:", err);
//     }
//   };

//   if (loading) return <p>Loading...</p>;

//   return (
//     <div className="requested-services">
//       <h2>My Requested Services</h2>
//       {requests.length === 0 ? (
//         <p>No requested services found.</p>
//       ) : (
//         <div className="services-list">
//           {requests.map((req) => (
//             <div key={req.id} className={`service-card status-${req.status.toLowerCase()}`}>
//               <h3>{req.worker?.user?.name} - {req.worker?.jobType}</h3>
//               <p><strong>Price:</strong> {req.worker?.price} JD</p>
//               <p><strong>Status:</strong> {req.status}</p>
//               <p><strong>Requested at:</strong> {new Date(req.createdAt).toLocaleString()}</p>
//               {req.status === "Pending" && (
//                 <button className="cancel-button" onClick={() => handleCancel(req.id)}>Cancel Request</button>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default RequestedServices;

// RequestedServices.jsx
*/
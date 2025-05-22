// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const MyServices = () => {
//   const [worker, setWorker] = useState(null);
//   const [requests, setRequests] = useState([]);
//   const [loadingWorker, setLoadingWorker] = useState(true);
//   const [loadingRequests, setLoadingRequests] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchWorkerInfo = async () => {
//       try {
//         setLoadingWorker(true);
//         const userRes = await axios.get("http://localhost:4000/users/loggedin_user", { withCredentials: true });
//         if (userRes.data.role !== "admin" && userRes.data.role !== "worker") {//
//           setError("You are not authorized to view this page.");
//           return;
//         }
//         const workerRes = await axios.get(`http://localhost:4000/workers/users/${userRes.data.id}`, { withCredentials: true });
//         setWorker(workerRes.data);
//       } catch {
//         setError("Failed to load worker info.");
//       } finally {
//         setLoadingWorker(false);
//       }
//     };

//     fetchWorkerInfo();
//   }, []);

//   useEffect(() => {
//     if (!worker?.id && !worker?.worker_id) return;

//     const id = worker.id || worker.worker_id;
//     const fetchRequests = async () => {
//       try {
//         setLoadingRequests(true);
//         const res = await axios.get(`http://localhost:4000/requests/workers/${id}`, { withCredentials: true });
//         setRequests(res.data);
//       } catch {
//         setError("Failed to load worker's requests.");
//       } finally {
//         setLoadingRequests(false);
//       }
//     };

//     fetchRequests();
//   }, [worker]);

//   const handleStatusChange = async (requestId, newStatus) => {
//     try {
//       await axios.patch(
//         `http://localhost:4000/requests/${requestId}`,
//         { status: newStatus },
//         { withCredentials: true }
//       );
//       setRequests((prev) =>
//         prev.map((req) =>
//           req.id === requestId || req._id === requestId
//             ? { ...req, status: newStatus }
//             : req
//         )
//       );
//     } catch {
//       alert("Failed to update request status.");
//     }
//   };

//   if (loadingWorker) return <p>Loading worker info...</p>;
//   if (loadingRequests) return <p>Loading requests...</p>;
//   if (error) return <p style={{ color: "red" }}>{error}</p>;

//   const statuses = ["pending", "accepted", "rejected", "completed"];

//   return (
//     <div>
//       <h2>Requests Assigned To You</h2>
//       {statuses.map((status) => {
//         const filtered = requests.filter((r) => r.status.toLowerCase() === status);
//         if (!filtered.length) return null;
//         return (
//           <section key={status}>
//             <h3 style={{ textTransform: "capitalize" }}>{status} requests</h3>
//             {filtered.map((req) => (
//               <div
//                 key={req.id || req._id}
//                 style={{ border: "1px solid #ccc", margin: "0.5rem", padding: "0.5rem",width: "300px" }}//
//               >
//                 <p><strong>Service:</strong> {req.servicecategory || "N/A"}</p>
//                 <p><strong>Price:</strong> {req.fee ?? "N/A"} JD</p>
//                 <p><strong>Status:</strong> {req.status}</p>
//                 <p><strong>User Name:</strong> {req.firstname && req.lastname ? `${req.firstname} ${req.lastname}` : "N/A"}</p>

//                 {status === "pending" && (
//                   <div>
//                     <button onClick={() => handleStatusChange(req.id || req._id, "accepted")}>Accept</button>
//                     <button onClick={() => handleStatusChange(req.id || req._id, "rejected")}>Reject</button>
//                   </div>
//                 )}

//                 {status === "accepted" && (
//                   <div>
//                     <button onClick={() => handleStatusChange(req.id || req._id, "completed")}>Mark as Completed</button>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </section>
//         );
//       })}
//     </div>
//   );
// };

// export default MyServices;

import React, { useEffect, useState } from "react";
import axios from "axios";
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import DoneAllIcon from '@mui/icons-material/DoneAll';

const MyServices = () => {
  const [worker, setWorker] = useState(null);
  const [requests, setRequests] = useState([]);
  const [loadingWorker, setLoadingWorker] = useState(true);
  const [loadingRequests, setLoadingRequests] = useState(false);
  const [error, setError] = useState(null);

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return <PendingActionsIcon style={{ color: '#007bff', verticalAlign: 'middle', marginRight: 4 }} />;
      case 'accepted':
        return <CheckCircleIcon style={{ color: 'green', verticalAlign: 'middle', marginRight: 4 }} />;
      case 'rejected':
        return <CancelIcon style={{ color: 'red', verticalAlign: 'middle', marginRight: 4 }} />;
      case 'completed':
        return <DoneAllIcon style={{ color: 'purple', verticalAlign: 'middle', marginRight: 4 }} />;
      default:
        return null;
    }
  };

  useEffect(() => {
    const fetchWorkerInfo = async () => {
      try {
        setLoadingWorker(true);
        const userRes = await axios.get("http://localhost:4000/users/loggedin_user", { withCredentials: true });
        if (userRes.data.role !== "admin" && userRes.data.role !== "worker") {
          setError("You are not authorized to view this page.");
          return;
        }
        const workerRes = await axios.get(`http://localhost:4000/workers/users/${userRes.data.id}`, { withCredentials: true });
        setWorker(workerRes.data);
      } catch {
        setError("Failed to load worker info.");
      } finally {
        setLoadingWorker(false);
      }
    };

    fetchWorkerInfo();
  }, []);

  useEffect(() => {
    if (!worker?.id && !worker?.worker_id) return;

    const id = worker.id || worker.worker_id;
    const fetchRequests = async () => {
      try {
        setLoadingRequests(true);
        const res = await axios.get(`http://localhost:4000/requests/workers/${id}`, { withCredentials: true });
        setRequests(res.data);
      } catch {
        setError("Failed to load worker's requests.");
      } finally {
        setLoadingRequests(false);
      }
    };

    fetchRequests();
  }, [worker]);

  const handleStatusChange = async (requestId, newStatus) => {
    try {
      await axios.patch(
        `http://localhost:4000/requests/${requestId}`,
        { status: newStatus },
        { withCredentials: true }
      );
      setRequests((prev) =>
        prev.map((req) =>
          req.id === requestId || req._id === requestId
            ? { ...req, status: newStatus }
            : req
        )
      );
    } catch {
      alert("Failed to update request status.");
    }
  };

  if (loadingWorker) return <p style={{ fontSize: "18px" }}>Loading worker info...</p>;
  if (loadingRequests) return <p style={{ fontSize: "18px" }}>Loading requests...</p>;
  if (error) return <p style={{ color: "red", fontSize: "18px" }}>{error}</p>;

  const statuses = ["pending", "accepted", "rejected", "completed"];

  const statusColors = {
    pending: "#f0ad4e",
    accepted: "#5bc0de",
    rejected: "#d9534f",
    completed: "#5cb85c"
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ textAlign: "center", marginBottom: "2rem", fontSize: "2rem", color: "#333" }}>
        Requests Assigned To You
      </h2>

      {statuses.map((status) => {
        const filtered = requests.filter((r) => r.status.toLowerCase() === status);
        if (!filtered.length) return null;

        return (
          <section key={status} style={{ marginBottom: "2rem" }}>
            <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: 4 }}>
              {getStatusIcon(status)}
              <span style={{ textTransform: 'capitalize', color: '#007bff' }}>{status}</span>{' '}
              <span style={{ color: '#6c757d' }}>requests</span>
            </h3>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
              {filtered.map((req) => (
                <div
                  key={req.id || req._id}
                  style={{
                    border: "1px solid #e0e0e0",
                    borderRadius: "12px",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                    padding: "1.5rem",
                    backgroundColor: "#ffffff",
                    width: "320px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    cursor: "pointer",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = "translateY(-8px)";
                    e.currentTarget.style.boxShadow = "0 12px 24px rgba(0, 0, 0, 0.15)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.1)";
                  }}
                >
                  <h4 style={{ margin: "0 0 1rem 0", color: "#333", fontWeight: "700", fontSize: "1.2rem" }}>
                    {req.servicecategory || "Service"}
                  </h4>
                  <p style={{ margin: "0.25rem 0", color: "#555", fontSize: "0.95rem" }}>
                    <strong>Price:</strong> <span style={{ color: "#007bff" }}>{req.fee ?? "N/A"} JD</span>
                  </p>
                  <p style={{ margin: "0.25rem 0", color: statusColors[status], fontWeight: "600", fontSize: "0.95rem" }}>
                    <strong>Status:</strong> {req.status}
                  </p>
                  <p style={{ margin: "0.25rem 0", color: "#555", fontSize: "0.95rem" }}>
                    <strong>User Name:</strong> {req.firstname && req.lastname ? `${req.firstname} ${req.lastname}` : "N/A"}
                  </p>

                  {status === "pending" && (
                    <div style={{ marginTop: "1rem", display: "flex", gap: "0.75rem" }}>
                      <button
                        style={{
                          flex: 1,
                          padding: "0.5rem",
                          backgroundColor: "#28a745",
                          color: "white",
                          border: "none",
                          borderRadius: "6px",
                          fontWeight: "600",
                          cursor: "pointer",
                          transition: "background-color 0.3s ease",
                        }}
                        onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#218838")}
                        onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#28a745")}
                        onClick={() => handleStatusChange(req.id || req._id, "accepted")}
                      >
                        Accept
                      </button>
                      <button
                        style={{
                          flex: 1,
                          padding: "0.5rem",
                          backgroundColor: "#dc3545",
                          color: "white",
                          border: "none",
                          borderRadius: "6px",
                          fontWeight: "600",
                          cursor: "pointer",
                          transition: "background-color 0.3s ease",
                        }}
                        onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#c82333")}
                        onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#dc3545")}
                        onClick={() => handleStatusChange(req.id || req._id, "rejected")}
                      >
                        Reject
                      </button>
                    </div>
                  )}

                  {status === "accepted" && (
                    <button
                      style={{
                        marginTop: "1rem",
                        width: "100%",
                        padding: "0.6rem",
                        backgroundColor: "#007bff",
                        color: "white",
                        border: "none",
                        borderRadius: "6px",
                        fontWeight: "600",
                        cursor: "pointer",
                        transition: "background-color 0.3s ease",
                      }}
                      onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#0056b3")}
                      onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#007bff")}
                      onClick={() => handleStatusChange(req.id || req._id, "completed")}
                    >
                      Mark as Completed
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

export default MyServices;





















/*

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Card, Button, Spinner, Alert, Row, Col } from "react-bootstrap";

// const MyServices = () => {
//   const [requests, setRequests] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

// const worker = JSON.parse(localStorage.getItem("worker"));
// const workerId = worker?._id;

//   useEffect(() => {
//     axios
//       .get(`http://localhost:4000/worker-requests/${workerId}`)
//       .then((res) => {
//         setRequests(res.data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         setError("Failed to load service requests.");
//         setLoading(false);
//       });
//   }, []);

//   const handleStatusChange = async (requestId, newStatus) => {
//     try {
//       await axios.patch(`http://localhost:4000/worker-requests/${requestId}`, {
//         status: newStatus,
//       });
//       setRequests((prev) =>
//         prev.map((req) =>
//           req._id === requestId ? { ...req, status: newStatus } : req
//         )
//       );
//     } catch {
//       alert("Something went wrong while updating status.");
//     }
//   };

//   const pendingRequests = requests.filter((r) => r.status === "pending");
//   const completedRequests = requests.filter((r) => r.status === "completed");

//   if (loading) return <Spinner animation="border" />;
//   if (error) return <Alert variant="danger">{error}</Alert>;

//   return (
//     <div className="container my-4">
//       <h2 className="mb-3">📝 New Service Requests</h2>
//       <Row>
//         {pendingRequests.length === 0 && <p>No new requests.</p>}
//         {pendingRequests.map((req) => (
//           <Col md={6} lg={4} key={req._id} className="mb-3">
//             <Card>
//               <Card.Body>
//                 <Card.Title>{req.serviceName}</Card.Title>
//                 <Card.Subtitle className="mb-2 text-muted">
//                   Requested by: {req.userName}
//                 </Card.Subtitle>
//                 <Card.Text>{req.notes || "No additional notes."}</Card.Text>
//                 <div className="d-flex justify-content-between">
//                   <Button
//                     variant="success"
//                     onClick={() => handleStatusChange(req._id, "completed")}
//                   >
//                     Accept
//                   </Button>
//                   <Button
//                     variant="danger"
//                     onClick={() => handleStatusChange(req._id, "rejected")}
//                   >
//                     Reject
//                   </Button>
//                 </div>
//               </Card.Body>
//             </Card>
//           </Col>
//         ))}
//       </Row>

//       <hr className="my-4" />

//       <h2 className="mb-3">✅ Completed Requests</h2>
//       <Row>
//         {completedRequests.length === 0 && <p>No completed services yet.</p>}
//         {completedRequests.map((req) => (
//           <Col md={6} lg={4} key={req._id} className="mb-3">
//             <Card bg="light">
//               <Card.Body>
//                 <Card.Title>{req.serviceName}</Card.Title>
//                 <Card.Subtitle className="mb-2 text-muted">
//                   Client: {req.userName}
//                 </Card.Subtitle>
//                 <Card.Text>✅ Completed</Card.Text>
//               </Card.Body>
//             </Card>
//           </Col>
//         ))}
//       </Row>
//     </div>
//   );
// };

// export default MyServices;
import React, { useEffect, useState } from "react";
import { Card, Button, Spinner, Alert, Row, Col } from "react-bootstrap";

const MyServices = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // بيانات وهمية (تجريبية)
  const dummyData = [
    {
      _id: 1,
      serviceName: "Carpenter",
      userName: "Layla saadat",
      firstday : "15/5/2025",
      Lastday : "1/6/2025",
      notes: "Children's bedroom",
      Location:"Tabarbour",
      price: "500 JD",
      phone_number: "0797011655",
      status: "pending",
    },
    {
      _id: 2,
      serviceName: "Carpenter",
      userName: "Ahmad jaber",
      firstday : "20/5/2025",
      Lastday : "30/5/2025",
      notes: "Study desk",
      Location:"Tabarbour",
      price: "70 JD",
      phone_number: "0795651995",
      status: "pending",
    },
    {
      _id: 3,
      serviceName: "Carpenter",
      userName: "Sara mousa",
      firstday : "1/4/2025",
      Lastday : "1/5/2025",
      notes: "Children's bedroom",
      price: "665 JD",
      Location:"Tabarbour",
      phone_number: "0799999999",
      status: "completed",
    },  {
      _id: 4,
      serviceName: "Carpenter",
      userName: "Ayham zataymeh",
      firstday : "25/3/2025",
      Lastday : "30/3/2025",
      notes: "2 table",
      price: "200 JD",
      Location:"Tabarbour",
      phone_number: "0785956231",
      status: "completed",
    },
  ];

  useEffect(() => {
    // محاكاة تحميل البيانات
    setTimeout(() => {
      setRequests(dummyData);
      setLoading(false);
    }, 1000);
  }, []);

  const handleStatusChange = (requestId, newStatus) => {
    setRequests((prev) =>
      prev.map((req) =>
        req._id === requestId ? { ...req, status: newStatus } : req
      )
    );
  };

  const pendingRequests = requests.filter((r) => r.status === "pending");
  const completedRequests = requests.filter((r) => r.status === "completed");

  if (loading) return <Spinner animation="border" />;
  
  return (
    <div className="container my-4">
      <h2 className="mb-3">📝 New Service Requests</h2>
      <Row>
        {pendingRequests.length === 0 && <p>No new requests.</p>}
        {pendingRequests.map((req) => (
          <Col md={6} lg={4} key={req._id} className="mb-3">
            <Card>
              <Card.Body>
                <Card.Title>{req.serviceName}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Requested by: {req.userName}
                </Card.Subtitle>
                <Card.Text>Service :{req.notes || "No additional notes."}</Card.Text>
                <Card.Text>First Day     :{req.firstday}</Card.Text>
                <Card.Text>Last  Day     :{req.Lastday}</Card.Text>
                <Card.Text>Location     :{req.Location}</Card.Text>
                <Card.Text>Price    :{req.price}</Card.Text>
                <Card.Text>Phone Number :{req.phone_number}</Card.Text>
                <div className="d-flex justify-content-between">
                  <Button
                    variant="success"
                    onClick={() => handleStatusChange(req._id, "completed")}
                  >
                    Accept
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleStatusChange(req._id, "rejected")}
                  >
                    Reject
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <hr className="my-4" />

      <h2 className="mb-3">✅ Completed Requests</h2>
      <Row>
        {completedRequests.length === 0 && <p>No completed services yet.</p>}
        {completedRequests.map((req) => (
          <Col md={6} lg={4} key={req._id} className="mb-3">
            <Card bg="light">
              <Card.Body>
                <Card.Title>{req.serviceName}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Client: {req.userName}
                </Card.Subtitle>
                <Card.Text>✅ Completed</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default MyServices;

*/
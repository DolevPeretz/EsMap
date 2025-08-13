import React, { useState, useEffect } from "react";
import "../style/AdminDashboard.css"; // ייבוא קובץ ה-CSS

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);


    useEffect(() => {
        const token = localStorage.getItem('authToken'); // שליפת ה-Token מה-localStorage
        fetch('http://localhost:5001/user/admin/pending-users', {
            headers: {
                Authorization: `Bearer ${token}`, // הוספת ה-Token בכותרת
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                return response.json();
            })
            .then((data) => setUsers(data))
            .catch((error) => console.error("Error fetching users:", error));
    }, []);

    const handleUpdateStatus = (id, status) => {
        const token = localStorage.getItem('authToken'); // שליפת ה-Token מה-localStorage

        fetch(`http://localhost:5001/user/admin/update-status/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`, // הוספת ה-Token בכותרת
            },
            body: JSON.stringify({ status }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to update status");
                }
                return response.json();
            })
            .then(() => {
                alert(`User status updated to ${status}`);
                setUsers(users.filter((user) => user._id !== id)); // הסרת המשתמש מהטבלה
            })
            .catch((error) => console.error("Error updating status:", error));
    };

    return (
        <div className="admin-dashboard">
          <h1>Pending Users</h1>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Email</th>
                <th>ID Number</th>
                <th>Business Certificate</th>
                <th>ID Document</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.email}</td>
                  <td>{user.idNumber}</td>
                  <td>
                    <a href={`/${user.businessCertificate}`} target="_blank" rel="noopener noreferrer">
                      View Certificate
                    </a>
                  </td>
                  <td>
                    <a href={`/${user.idDocument}`} target="_blank" rel="noopener noreferrer">
                      View ID Document
                    </a>
                  </td>
                  <td>
                    <button className="approve-btn">Approve</button>
                    <button className="reject-btn">Reject</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    };
    
    export default AdminDashboard;
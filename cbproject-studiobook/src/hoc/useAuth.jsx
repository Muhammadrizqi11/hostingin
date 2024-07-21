import { useState, useEffect } from "react";
import axios from "axios";

const useAuth = () => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          setLoading(false);
          setIsAuthenticated(false);
          return;
        }
        const response = await axios.get("http://localhost:5000/user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserRole(response.data.role);
        setUserData(response.data);
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  return { loading, isAuthenticated, userRole, userData };
};

export default useAuth;

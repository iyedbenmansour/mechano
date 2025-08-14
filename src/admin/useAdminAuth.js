import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function useAdminAuth() {
  const navigate = useNavigate();

  useEffect(() => {
    const isAdmin = sessionStorage.getItem("admin");
    if (!isAdmin) {
      navigate("/login"); // redirect to login if no token
    }
  }, [navigate]);
}

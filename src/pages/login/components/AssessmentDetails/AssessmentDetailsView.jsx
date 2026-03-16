import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReserchLayout from "../../../../components/loginLayout/ReserchLayout";
import AssessmentDetailsPage from "./AssessmentDetailsPage";
import { auth } from "../../../../firebase";
import { signOut } from "firebase/auth";

const AssessmentDetailsView = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("assessment");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await signOut(auth);
      localStorage.removeItem('rememberedEmail');
      localStorage.removeItem('rememberMe');
      sessionStorage.removeItem('isLoggedIn');
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      alert("Failed to logout. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ReserchLayout
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      onLogout={handleLogout}
      isLoading={isLoading}
    >
      <AssessmentDetailsPage />
    </ReserchLayout>
  );
};

export default AssessmentDetailsView;

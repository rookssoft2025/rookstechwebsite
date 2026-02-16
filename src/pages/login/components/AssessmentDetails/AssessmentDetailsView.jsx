import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReserchLayout from "../../../../components/loginLayout/ReserchLayout";
import AssessmentDetailsPage from "./AssessmentDetailsPage";

const AssessmentDetailsView = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("assessment");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    navigate("/login");
    setIsLoading(false);
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

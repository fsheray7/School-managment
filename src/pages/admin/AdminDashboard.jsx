import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Cards from "../../components/cards/admincards/Cards";
import GenderDonutChart from "../../charts/genderchat/GenderDonutChart";
import ManagementValueChart from "../../charts/managementvalue/ManagementValueChart";
import TodayOverviewStrip from "../../components/cards/admincards/TodayOverviewStrip";
import FinanceCards from "../../components/cards/admincards/FinanceCards";
import FinanceTrendChart from "../../charts/finance/FinanceTrendChart";
import AlertsQuickActions from "../../components/cards/admincards/AlertsQuickActions";
import RecentActivity from "../../components/cards/admincards/RecentActivity";
import Button from "../../components/ui/Button";
import { FaEye } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";

const AdminDashboard = () => {
  const navigate = useNavigate();
  return (
    <section className="flex flex-col items-center justify-start w-full bg-white gap-8 pb-10 pt-15 transition-all duration-300 ">
      {/* 1. KPI CARDS */}
       <div className="w-full flex  flex-col gap-6">
        <div className="flex items-center gap-2">
          <div className="h-6 w-1.5 bg-[#0C46C4] rounded-full"></div>
          <h2 className="text-xl font-bold text-gray-800 font-opensans">
           KPI Cards 
          </h2>
        </div>
        <Cards />
      </div>

      {/* 2. TODAY STRIP */}
       <div className="w-full flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <div className="h-6 w-1.5 bg-[#0C46C4] rounded-full"></div>
          <h2 className="text-xl font-bold text-gray-800 font-opensans">
            Today Overview 
          </h2>
        </div>
      <TodayOverviewStrip />
      </div>

      {/* 3. ALERTS | QUICK ACTIONS */}
      <AlertsQuickActions />

      {/* 4. CHART | CHART (Finance & Management Analysis) */}
      <div className="w-full flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <div className="h-6 w-1.5 bg-[#0C46C4] rounded-full"></div>
          <div className="flex w-full flex-row justify-between items-center gap-2">

          <h2 className="text-xl font-bold text-gray-800 font-opensans">
            Finance & Data Insights 
          </h2>
          <a 
          className="text-blue-600  text-sm font-semibold hover:text-blue-800 cursor-pointer hover:underline"
          onClick={() => navigate("/finance")}
          >
            View All 
          </a>
            </div>
        </div>

        <FinanceCards />

        <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-3">
            <FinanceTrendChart />
          </div>
          <div className="lg:col-span-3 flex flex-col gap-4">
            <div className="flex flex-col md:flex-row lg:flex-row gap-4 w-full h-full">
              <ManagementValueChart />
              <GenderDonutChart />
            </div>
          </div>
        </div>
      </div>

      {/* 5. RECENT ACTIVITY */}
      <RecentActivity />
    </section>
  );
};

export default AdminDashboard;

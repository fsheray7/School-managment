import React from "react";

import { Link, useNavigate } from "react-router-dom";
import Cards from "../../components/cards/admincards/Cards";
import GenderDonutChart from "../../charts/genderchat/GenderDonutChart";
import ManagementValueChart from "../../charts/managementvalue/ManagementValueChart";

const AdminDashboard = () => {
    const navigate = useNavigate();
    return (
        <section className="flex flex-col items-center justify-start w-full bg-white  gap-2  pb-10 pt-20 transition-all duration-300">

            {/* Top  Card */}
            <div className="w-full bg-gray-100 text-white rounded-xl  p-2 sm:p-6 shadow-md">
                <Cards />
            </div>

            <div className="flex flex-col md:flex-row gap-4 w-full bg-gray-100 text-white min-h-0 rounded-xl p-2 sm:p-6  shadow-md">
                <ManagementValueChart />
                <GenderDonutChart />
            </div>


        </section>
    );
};

export default AdminDashboard;

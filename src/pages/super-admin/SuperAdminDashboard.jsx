import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserShield, FaWallet, FaChartLine } from "react-icons/fa";
import { useSettings } from "../../context/SettingsContext";
import { useToast } from "../../context/ToastContext";
import DataTable from "../../components/ui/DataTable";
import Pagination from "../../components/ui/Pagination";
import DataCard from "../../components/ui/DataCard";
import ActionButtons from "../../components/ui/ActionButtons";
import Button from "../../components/ui/Button";
import StatusToggle from "../../components/ui/StatusToggle";
import ConfirmationModal from "../../components/ui/ConfirmationModal";
import { useAdmin } from "../../context/AdminContext.jsx";
import { trendChartData } from "../../data/finance/TrendChartData";

const SuperAdminDashboard = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [adminToUpdate, setAdminToUpdate] = useState(null);

  const { admins, toggleAdminStatus } = useAdmin();

  const totalRevenue = trendChartData.reduce(
    (acc, item) => acc + item.collection,
    0,
  );

  const formatRevenue = (revenue) => {
    if (revenue >= 1000000) {
      return `PKR ${(revenue / 1000000).toFixed(2)}M`;
    }
    if (revenue >= 1000) {
      return `PKR ${(revenue / 1000).toFixed(2)}K`;
    }
    return `PKR ${revenue}`;
  };

  const stats = [
    {
      title: "Total Admins",
      value: admins ? admins.length : 0,
      icon: <FaUserShield size={24} />,
      color: "bg-blue-600",
      trend: "+2 this month",
    },
    {
      title: "Total Revenue",
      value: formatRevenue(totalRevenue),
      icon: <FaWallet size={24} />,
      color: "bg-green-600",
      trend: "+15% vs last month",
    },
    {
      title: "Quick Growth",
      value: "25%",
      icon: <FaChartLine size={24} />,
      color: "bg-purple-600",
      trend: "Steady increase",
    },
  ];

  const handleToggleStatus = (admin) => {
    setAdminToUpdate(admin);
    setIsConfirmOpen(true);
  };

  const nextStatus = adminToUpdate?.status === "Active" ? "Inactive" : "Active";

  const confirmStatusUpdate = () => {
    if (!adminToUpdate) return;

    const newStatus = adminToUpdate.status === "Active" ? "Inactive" : "Active";
    toggleAdminStatus(adminToUpdate.id);
    showToast(
      `${adminToUpdate.name}'s status changed to ${newStatus}`,
      "success",
    );
    setIsConfirmOpen(false);
    setAdminToUpdate(null);
  };

  const totalPages = Math.ceil((admins || []).length / itemsPerPage);
  const paginatedAdmins = (admins || []).slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const columns = [
    {
      header: "Admin Name",
      key: "name",
      render: (admin) => (
        <span className="font-semibold text-gray-700">{admin.name}</span>
      ),
    },
    {
      header: "School",
      key: "school",
      render: (admin) => <span className="text-gray-600">{admin.school}</span>,
    },
    {
      header: "Status",
      key: "status",
      render: (admin) => (
        <StatusToggle
          status={admin.status}
          onToggle={() => handleToggleStatus(admin)}
        />
      ),
    },
  ];

  const renderMobileCard = (admin) => (
    <DataCard
      title={admin.name}
      fields={[
        { label: "School", value: admin.school },
        {
          label: "Status",
          value: admin.status,
          render: (val) => (
            <StatusToggle
              status={val}
              onToggle={() => handleToggleStatus(admin)}
            />
          ),
        },
      ]}
      actions={
        <ActionButtons
          onView={() => {}}
          onEdit={() => {}}
          onDelete={() => {}}
          itemName={admin.name}
        />
      }
    />
  );

  return (
    <div className="flex flex-col gap-8 p-4 md:p-4">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white px-6 py-2 flex items-start justify-between"
          >
            <div>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                {stat.title}
              </p>
              <h3 className="text-lg font-bold text-gray-800 mt-2">
                {stat.value}
              </h3>
              <p className="text-xs font-medium text-green-600 mt-2">
                {stat.trend}
              </p>
            </div>
            <div
              className={`${stat.color} p-2 mt-4 rounded-xl text-white shadow-lg`}
            >
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Admins Table Preview */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden p-6 flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-800">
            Administrator List
          </h2>
          <Button
            onClick={() => navigate("/super-admin-add-admin")}
            variant="primary"
            className="text-sm font-bold px-6 py-2 rounded-xl text-white shadow-md"
          >
            Add New Admin
          </Button>
        </div>

        <DataTable
          columns={columns}
          data={paginatedAdmins}
          renderActions={(admin) => (
            <ActionButtons
              onView={() => {}}
              onEdit={() => {}}
              onDelete={() => {}}
              itemName={admin.name}
            />
          )}
          renderMobileCard={renderMobileCard}
          emptyMessage="No administrators found."
        />

        <div className="mt-4">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            totalItems={(admins || []).length}
            itemsPerPage={itemsPerPage}
          />
        </div>
      </div>

      <ConfirmationModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={confirmStatusUpdate}
        title="Change Account Status"
        message={
          <span>
            Are you sure you want to change the status to{" "}
            <span
              className={`px-2 py-1 rounded text-xs font-bold ${
                nextStatus === "Active"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {nextStatus}
            </span>{" "}
            for <strong>{adminToUpdate?.name}</strong>? This will affect their
            access to the system.
          </span>
        }
      />
    </div>
  );
};

export default SuperAdminDashboard;

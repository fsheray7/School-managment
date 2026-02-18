import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSettings } from "../../context/SettingsContext";
import { useToast } from "../../context/ToastContext";
import { FaUserPlus, FaSearch } from "react-icons/fa";
import DataTable from "../../components/ui/DataTable";
import Pagination from "../../components/ui/Pagination";
import ActionButtons from "../../components/ui/ActionButtons";
import DataCard from "../../components/ui/DataCard";
import CustomDropdown from "../../components/ui/CustomDropdown";
import Button from "../../components/ui/Button";
import StatusToggle from "../../components/ui/StatusToggle";
import ConfirmationModal from "../../components/ui/ConfirmationModal";
import DetailsModal from "../../components/ui/DetailsModal";
import DeleteModal from "../../components/ui/DeleteModal";
import { getAdmins, saveAdmins } from "../../utils/adminStorage";

const Admins = () => {
  const navigate = useNavigate();
  const { primaryColor } = useSettings();
  const { showToast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Status Toggle State
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [adminToUpdate, setAdminToUpdate] = useState(null);

  // View/Edit Modal State
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  // Delete Modal State
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const [admins, setAdmins] = useState(() => {
    const storedAdmins = localStorage.getItem("admins");
    return storedAdmins ? JSON.parse(storedAdmins) : adminsData;
  });

  // Handlers
  const handleViewDetails = (admin) => {
    setSelectedAdmin({ ...admin });
    setIsEditMode(false);
    setIsModalOpen(true);
  };

  const handleEdit = (admin) => {
    setSelectedAdmin({ ...admin });
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handleDelete = (admin) => {
    setItemToDelete(admin);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (itemToDelete) {
      const updatedAdmins = admins.filter((a) => a.id !== itemToDelete.id);
      setAdmins(updatedAdmins);
      localStorage.setItem("admins", JSON.stringify(updatedAdmins));
      showToast(`${itemToDelete.name} deleted successfully!`, "success");
      setIsDeleteModalOpen(false);
      setItemToDelete(null);
    }
  };

  const handleSaveEdit = () => {
    const updatedAdmins = admins.map((a) =>
      a.id === selectedAdmin.id ? selectedAdmin : a,
    );
    setAdmins(updatedAdmins);
    localStorage.setItem("admins", JSON.stringify(updatedAdmins));
    showToast("Admin details updated successfully!", "success");
    closeModal();
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAdmin(null);
    setIsEditMode(false);
  };

  const handleToggleStatus = (admin) => {
    setAdminToUpdate(admin);
    setIsConfirmOpen(true);
  };

  const confirmStatusUpdate = () => {
    if (!adminToUpdate) return;

    const newStatus = adminToUpdate.status === "Active" ? "Inactive" : "Active";
    const updatedAdmins = admins.map((a) =>
      a.id === adminToUpdate.id ? { ...a, status: newStatus } : a,
    );
    setAdmins(updatedAdmins);
    localStorage.setItem("admins", JSON.stringify(updatedAdmins));
    showToast(
      `${adminToUpdate.name}'s status changed to ${newStatus}`,
      "success",
    );
    setIsConfirmOpen(false);
    setAdminToUpdate(null);
  };

  const nextStatus = adminToUpdate?.status === "Active" ? "Inactive" : "Active";

 const filteredAdmins = admins.filter((admin) => {
  const lowerSearchTerm = searchTerm.toLowerCase();
  const matchesSearch = (admin.name || "").toLowerCase().includes(lowerSearchTerm) ||
    (admin.school || "").toLowerCase().includes(lowerSearchTerm) ||
    (admin.email || "").toLowerCase().includes(lowerSearchTerm) ||
    (admin.phone || "").toLowerCase().includes(lowerSearchTerm) ||
    (admin.username || "").toLowerCase().includes(lowerSearchTerm);

  const matchesStatus =
    statusFilter === "All Status" ? true : admin.status === statusFilter;

  return matchesSearch && matchesStatus;
});


  const totalPages = Math.ceil(filteredAdmins.length / itemsPerPage);
  const paginatedAdmins = filteredAdmins.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const columns = [
    {
      header: "Name & Contact",
      key: "name",
      render: (admin) => (
        <div className="flex flex-col text-left">
          <span className="font-bold text-gray-800 mb-0.5">{admin.name || "—"}</span>
          <span className="text-xs text-gray-500">{admin.email || "—"}</span>
          <span className="text-[10px] text-gray-400 mt-1">{admin.phone || "—"}</span>
        </div>
      ),
    },
    {
      header: "Assigned School",
      key: "school",
      render: (admin) => (
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-500">
            {(admin.school || "")
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
          <span className="text-sm font-medium text-gray-600 ">
            {admin.school}
          </span>
        </div>
      ),
    },
    {
      header: "Username",
      key: "username",
      render: (admin) => (
        <span className="text-sm font-medium text-gray-700 bg-gray-100 px-2 py-1 rounded">
          {admin.username || "—"}
        </span>
      ),
    },
    {
      header: "Password",
      key: "password",
      render: (admin) => (
        <span className="text-xs text-gray-400 font-mono">
          {admin.password ? "••••••" : "No Password"}
        </span>
      ),
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

  const adminFields = [
    {
      label: "Profile Photo",
      name: "profileImage",
      type: "image",
      fullWidth: true,
    },
    { label: "Full Name", name: "name", type: "input", inputType: "text" },
    {
      label: "Email Address",
      name: "email",
      type: "input",
      inputType: "email",
    },
    { label: "Phone Number", name: "phone", type: "input", inputType: "text" },
    {
      label: "Assigned School",
      name: "school",
      type: "dropdown",
      options: [
        "Beaconhouse School",
        "City School",
        "Roots International",
        "LGS School",
      ],
    },
    { label: "Username", name: "username", type: "input", inputType: "text" },
    {
      label: "Password",
      name: "password",
      type: "input",
      inputType: "password",
    },
  ];

  const renderMobileCard = (admin) => (
    <DataCard
      title={admin.name}
      fields={[
        { label: "Email", value: admin.email },
        { label: "Phone", value: admin.phone },
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
          onView={() => handleViewDetails(admin)}
          onEdit={() => handleEdit(admin)}
          onDelete={() => handleDelete(admin)}
          itemName={admin.name}
        />
      }
    />
  );

  return (
    <div className="p-4 md:p-6 flex flex-col gap-6">
      {/* Filters & Actions */}
      <div className="flex flex-col md:flex-row gap-4 items-center bg-white p-4 rounded-lg shadow-sm border border-gray-100 transition-all hover:shadow-md">
        <div className="relative flex-1 group w-full">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[var(--primary-color)] transition-colors" />
          <input
            type="text"
            placeholder="Search admins..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-12 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-lg focus:outline-none focus:ring-4 focus:ring-[var(--primary-color)]/5 transition-all text-sm font-medium"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <CustomDropdown
            options={["All Status", "Active", "Inactive"]}
            value={statusFilter}
            onChange={(val) => {
              setStatusFilter(val);
              setCurrentPage(1);
            }}
            className="flex-1 md:w-48"
            triggerClassName="bg-gray-50 border-gray-100 hover:border-[var(--primary-color)]/30 rounded-lg py-2"
          />

          <Button
            onClick={() => navigate("/super-admin-add-admin")}
            variant="primary"
            className="flex items-center gap-2 py-2 rounded-2xl shadow-lg shadow-[var(--primary-color)]/20 whitespace-nowrap whitespace-nowrap"
          >
            <FaUserPlus size={16} />
            <span className="text-sm">Add New Admin</span>
          </Button>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={paginatedAdmins}
        renderActions={(admin) => (
          <ActionButtons
            onView={() => handleViewDetails(admin)}
            onEdit={() => handleEdit(admin)}
            onDelete={() => handleDelete(admin)}
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
          totalItems={filteredAdmins.length}
          itemsPerPage={itemsPerPage}
        />
      </div>

      {/* Details/Edit Modal */}
      <DetailsModal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={isEditMode ? "Edit Administrator" : "Administrator Details"}
        isEditMode={isEditMode}
        data={selectedAdmin}
        onDataChange={setSelectedAdmin}
        onSave={handleSaveEdit}
        fields={adminFields}
      />

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        itemName={itemToDelete?.name}
      />

      {/* Status Toggle Confirmation Modal */}
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

export default Admins;

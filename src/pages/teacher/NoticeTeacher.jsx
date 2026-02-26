import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getActiveNotices, deleteNotice } from "../../utils/noticeManager";
import Filters from "../../components/ui/Filters";
import DataTable from "../../components/ui/DataTable";
import ActionButtons from "../../components/ui/ActionButtons";
import DataCard from "../../components/ui/DataCard";
import Pagination from "../../components/ui/Pagination";
import DeleteModal from "../../components/ui/DeleteModal";
import NoticePreviewModal from "../../components/common/NoticePreviewModal";
import { useToast } from "../../context/ToastContext";
import { useTeacher } from "../../context/TeacherContext";
import { getNoticesForUser } from "../../utils/noticeManager";

const NoticeTeacher = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [notices, setNotices] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [audienceFilter, setAudienceFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Modals state
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [noticeToDelete, setNoticeToDelete] = useState(null);

  const { currentTeacher } = useTeacher();

  useEffect(() => {
    loadNotices();
  }, [currentTeacher]);

  const loadNotices = () => {
    // For teacher management, we pass role 'teacher' and the teacher's name as className (for current implementation of getNoticesForUser)
    const data = getNoticesForUser("teacher", currentTeacher?.fullName);
    setNotices(data);
  };

  const handleReset = () => {
    setSearchQuery("");
    setAudienceFilter("");
    setCurrentPage(1);
  };

  const handleDeleteClick = (notice) => {
    setNoticeToDelete(notice);
    setIsDeleteOpen(true);
  };

  const confirmDelete = () => {
    if (noticeToDelete) {
      const result = deleteNotice(noticeToDelete.id);
      if (result.success) {
        showToast("Notice deleted successfully", "success");
        loadNotices();
      } else {
        showToast("Failed to delete notice", "error");
      }
      setIsDeleteOpen(false);
      setNoticeToDelete(null);
    }
  };

  const handleViewDetails = (notice) => {
    setSelectedNotice(notice);
    setIsDetailsOpen(true);
  };

  const filteredNotices = notices.filter((notice) => {
    const matchesSearch =
      notice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notice.details.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAudience = audienceFilter
      ? notice.audience === audienceFilter
      : true;
    return matchesSearch && matchesAudience;
  });

  const totalPages = Math.ceil(filteredNotices.length / itemsPerPage);
  const paginatedNotices = filteredNotices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const columns = [
    {
      header: "Date",
      key: "createdAt",
      render: (val) => new Date(val).toLocaleDateString(),
    },
    { header: "Title", key: "title", fontBold: true },
    { header: "Audience", key: "audience" },
    {
      header: "Target",
      render: (item) =>
        item.class ? `${item.class} ${item.section || ""}` : "All",
    },
    {
      header: "Important",
      key: "isImportant",
      render: (val) => (val ? "⭐ Yes" : "No"),
    },
  ];

  const detailFields = [
    { label: "Title", name: "title", type: "text" },
    { label: "Details", name: "details", type: "text" },
    { label: "Audience", name: "audience", type: "text" },
    { label: "Class", name: "class", type: "text" },
    { label: "Section", name: "section", type: "text" },
    { label: "Created At", name: "createdAt", type: "text" },
    { label: "Expiry Date", name: "expiryDate", type: "text" },
  ];

  const renderMobileCard = (notice) => (
    <DataCard
      title={notice.title}
      fields={[
        {
          label: "Date",
          value: new Date(notice.createdAt).toLocaleDateString(),
        },
        { label: "Audience", value: notice.audience },
        {
          label: "Target",
          value: notice.class
            ? `${notice.class} ${notice.section || ""}`
            : "All",
        },
        { label: "Important", value: notice.isImportant ? "⭐ Yes" : "No" },
      ]}
      actions={
        <ActionButtons
          onView={() => handleViewDetails(notice)}
          onDelete={() => handleDeleteClick(notice)}
          itemName={notice.title}
        />
      }
    />
  );

  return (
    <section className="flex flex-col px-6 items-center mt-5 justify-start w-full bg-white gap-4">
      <div className="w-full">
        <Filters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          searchPlaceholder="Search notices..."
          onReset={handleReset}
          onAdd={() => navigate("/add-notice-teacher")}
          addLabel="+ Notice"
          filters={[
            {
              value: audienceFilter,
              onChange: setAudienceFilter,
              options: ["All", "Students", "Parents"],
              placeholder: "Audience",
            },
          ]}
        />
      </div>

      <DataTable
        columns={columns}
        data={paginatedNotices}
        renderActions={(notice) => (
          <ActionButtons
            onView={() => handleViewDetails(notice)}
            onDelete={() => handleDeleteClick(notice)}
            itemName={notice.title}
          />
        )}
        renderMobileCard={renderMobileCard}
        emptyMessage="No notices found."
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        totalItems={filteredNotices.length}
        itemsPerPage={itemsPerPage}
      />

      <NoticePreviewModal
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        notice={selectedNotice}
      />

      <DeleteModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={confirmDelete}
        itemName={noticeToDelete?.title}
      />
    </section>
  );
};

export default NoticeTeacher;

import React from "react";
import NoticeForm from "../../components/admin/NoticeForm";

const NoticeAdmin = () => {
  return (
    <section className="w-full  flex flex-col items-start px-6 ">
      <div className="w-full">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">Make an Announcement</h1>

        <NoticeForm />
      </div>
    </section>
  );
};

export default NoticeAdmin;

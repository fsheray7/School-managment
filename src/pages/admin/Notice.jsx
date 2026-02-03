import React from "react";
import NoticeForm from "./NoticeForm";

const NoticeAdmin = () => {
  return (
    <section className="w-full mt-10  flex flex-col items-center px-4 py-8 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#0C46C4]">
            Create Notice
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Create and manage school notices & Announcements for students, teachers, and
            parents.
          </p>
        </div>

        <NoticeForm />
      </div>
    </section>
  );
};

export default NoticeAdmin;

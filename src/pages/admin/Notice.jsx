import React from "react";
import NoticeForm from "../../components/admin/NoticeForm";

const NoticeAdmin = () => {
  return (
    <section className="w-full mt-10  flex flex-col items-center px-4 py-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl">

        <NoticeForm />
      </div>
    </section>
  );
};

export default NoticeAdmin;

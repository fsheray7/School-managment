import React from "react";
import FeeList from "../../features/admin/FeeList";

const FeeManagement = () => {
  return (
    <div className="flex px-6 pt-4 flex-col gap-6 w-full pb-20">
      <FeeList />
    </div>
  );
};

export default FeeManagement;

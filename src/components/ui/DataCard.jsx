import React from "react";

const DataCard = ({
  title,
  fields,
  actions,
  borderAccent = "border-blue-700",
}) => {
  return (
    <div
      className={`bg-white border-t-7 rounded-xl ${borderAccent} p-4 shadow-md hover:shadow-lg transition-shadow duration-200`}
    >
      {/* Title */}
      <p className="font-bold text-blue-700 text-lg mb-2">{title}</p>

      {/* Fields */}
      <div className="text-sm space-y-2">
        {fields.map((field, index) => (
          <div key={index} className="flex gap-2">
            <span className="font-semibold text-gray-500 whitespace-nowrap">
              {field.label}:
            </span>
            <span className="text-blue-600">
              {field.render ? field.render(field.value) : field.value}
            </span>
          </div>
        ))}
      </div>

      {/* Actions */}
      {actions && (
        <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end">
          {actions}
        </div>
      )}
    </div>
  );
};

export default DataCard;

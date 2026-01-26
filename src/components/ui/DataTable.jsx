import React from "react";

const DataTable = ({
  columns,
  data,
  renderActions,
  renderMobileCard,
  emptyMessage = "No data found.",
}) => {
  return (
    <div className="w-full px-6">
      {/* ================= TABLE (Tablet + Desktop) ================= */}
      <div className="hidden md:block w-full bg-white rounded-xl shadow-sm border border-gray-200 mt-4 overflow-x-hidden">
        <table className="w-full table-fixed text-left border-collapse">
          <thead className="bg-[#E8F8F6] text-[#0C46C4] uppercase text-xs font-bold">
            <tr>
              {columns.map((col, index) => {
                if (col.hidden) return null;
                return (
                  <th
                    key={index}
                    className={`px-3 py-4 truncate ${
                      col.hiddenOnMobile ? "hidden xl:table-cell" : ""
                    } ${col.center ? "text-center" : ""}`}
                  >
                    {col.header}
                  </th>
                );
              })}
              {renderActions && (
                <th className="px-3 py-4 text-center">Actions</th>
              )}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
            {data.map((item, rowIndex) => (
              <tr
                key={item.id || rowIndex}
                className="hover:bg-gray-50 transition-colors"
              >
                {columns.map((col, colIndex) => {
                  if (col.hidden) return null;
                  return (
                    <td
                      key={colIndex}
                      className={`px-3 py-4 truncate ${
                        col.hiddenOnMobile ? "hidden xl:table-cell" : ""
                      } ${col.fontBold ? "font-medium" : ""}`}
                    >
                      {col.render ? col.render(item) : item[col.key]}
                    </td>
                  );
                })}
                {renderActions && (
                  <td className="px-3 py-4 text-center">
                    {renderActions(item)}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>

        {data.length === 0 && (
          <div className="p-8 text-center text-gray-500">{emptyMessage}</div>
        )}
      </div>

      {/* ================= MOBILE CARD VIEW ================= */}
      <div className="md:hidden w-full flex flex-col gap-3 mt-4">
        {data.map((item, index) => (
          <div key={item.id || index}>{renderMobileCard(item)}</div>
        ))}

        {data.length === 0 && (
          <div className="p-8 text-center text-gray-500 bg-white rounded-xl shadow-sm border border-gray-200">
            {emptyMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default DataTable;

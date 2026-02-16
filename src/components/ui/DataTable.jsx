import React from "react";

const DataTable = ({
  columns,
  data,
  renderActions,
  renderMobileCard,
  emptyMessage = "No data found.",
}) => {

  // Flatten columns (for tbody rendering)
  const flattenedColumns = columns.flatMap((col) =>
    col.children ? col.children : col
  );

  const hasGroupedHeaders = columns.some((col) => col.children);

  return (
    <div className="w-full">
      {/* ================= TABLE ================= */}
      <div className="hidden md:block w-full bg-white rounded-xl shadow-sm border border-gray-200 mt-4 overflow-hidden">
        <table className="w-full table-fixed text-left border-collapse">
          
          <thead
            className="bg-[var(--primary-color)]/10 uppercase text-md font-bold"
            style={{ color: "var(--primary-color)" }}
          >
            {/* ===== FIRST HEADER ROW ===== */}
            <tr>
              {columns.map((col, index) => {
                if (col.hidden) return null;

                if (col.children) {
                  return (
                    <th
                      key={index}
                      colSpan={col.children.length}
                      className="px-2 py-3 text-center"
                    >
                      {col.header}
                    </th>
                  );
                }

                return (
                  <th
                    key={index}
                    rowSpan={hasGroupedHeaders ? 2 : 1}
                    className="px-2 text-[12px]  py-3 truncate"
                  >
                    {col.header}
                  </th>
                );
              })}

              {renderActions && (
                <th
                  rowSpan={hasGroupedHeaders ? 2 : 1}
                  className="px-4 py-3 text-[10px] text-center"
                >
                  Actions
                </th>
              )}
            </tr>

            {/* ===== SECOND HEADER ROW (Only if grouped) ===== */}
            {hasGroupedHeaders && (
              <tr>
                {columns.map((col) =>
                  col.children
                    ? col.children.map((child, i) => (
                        <th key={i} className="px-2 text-[var(--text-primary-color)] text-[10px]  text-center">
                          {child.header}
                        </th>
                      ))
                    : null
                )}
              </tr>
            )}
          </thead>

          {/* ================= BODY ================= */}
          <tbody className="divide-y divide-gray-100 text-center text-xs text-gray-700">
            {data.map((item, rowIndex) => (
              <tr
                key={item.id || rowIndex}
                className="hover:bg-gray-50 transition-colors"
              >
                {flattenedColumns.map((col, colIndex) => (
                  <td
                    key={colIndex}
                    className="px-1 py-3 truncate"
                  >
                    {col.render ? col.render(item) : item[col.key]}
                  </td>
                ))}

                {renderActions && (
                  <td className="px-4 py-2 text-center">
                    {renderActions(item)}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>

        {data.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            {emptyMessage}
          </div>
        )}
      </div>

      {/* ================= MOBILE ================= */}
      <div className="md:hidden w-full flex flex-col gap-3 mt-4">
        {data.map((item, index) => (
          <div key={item.id || index}>
            {renderMobileCard(item)}
          </div>
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

import React from "react";

const DataTable = ({
  columns,
  data,
  renderActions,
  renderMobileCard,
  emptyMessage = "No data found.",
  tableClassName ="bg-[var(--primary-color)]/10 uppercase font-bold text-[var(--primary-color)]  ",
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
            className={tableClassName}
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
                    className="px-2 text-xs  py-3 truncate"
                  >
                    {col.header}
                  </th>
                );
              })}

              {renderActions && (
                <th
                  rowSpan={hasGroupedHeaders ? 2 : 1}
                  className="px-4 py-3 text-xs text-center"
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
                        <th key={i} className="px-2 text-[var(--text-primary-color)] text-xs  text-center">
                          {child.header}
                        </th>
                      ))
                    : null
                )}
              </tr>
            )}
          </thead>

          {/* ================= BODY ================= */}
          <tbody className="divide-y divide-gray-100 text-start text-xs text-gray-700 ">
            {data.map((item, rowIndex) => (
              <tr
                key={item.id || rowIndex}
                className="hover:bg-gray-50 transition-colors"
              >
                {flattenedColumns.map((col, colIndex) => (
                  <td
                    key={colIndex}
                    className="px-3 py-3 "
                  >
                    {col.render ? col.render(item) : item[col.key]}
                  </td>
                ))}

                {renderActions && (
                  <td className="px-4 py-2 text-start">
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

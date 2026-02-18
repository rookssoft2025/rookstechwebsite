import React from "react";

const DataTable = ({
  columns = [],
  data = [],
  expandedRow,
  onRowExpand,
  rowKey = "id",
}) => {
  return (
    <div className="glass-card rounded-2xl overflow-hidden border border-gray-800">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-900/80">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="p-3 text-left text-gray-300"
                  style={{ width: col.width || "auto" }}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.map((item) => (
              <React.Fragment key={item[rowKey]}>
                {/* row.renderRow must exist */}
                {item.renderRow(item, onRowExpand)}

                {expandedRow === item[rowKey] && item.expandContent && (
                  <tr className="bg-gray-900/30">
                    <td colSpan={columns.length} className="p-6">
                      {item.expandContent}
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;

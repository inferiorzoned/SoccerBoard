import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const Table = ({
  columns,
  sortColumn,
  onSort,
  data,
  onRowClicked,
  onDelete,
  onRowCtrlClicked,
  tableClassName,
  themeClassName,
  selectedItems,
  selectedRowClassName,
}) => {
  const tableClass = tableClassName
    ? tableClassName + " " + tableClassName + "-" + themeClassName
    : "table";

  return (
    <table className={tableClass}>
      <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />
      <TableBody
        columns={columns}
        data={data}
        onRowClicked={onRowClicked}
        onDelete={onDelete}
        onRowCtrlClicked={onRowCtrlClicked}
        themeClassName={themeClassName}
        selectedItems={selectedItems}
        selectedRowClassName={selectedRowClassName}
      />
    </table>
  );
};

export default Table;

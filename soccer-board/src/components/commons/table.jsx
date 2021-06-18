import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const Table = ({
  columns,
  sortColumn,
  onSort,
  data,
  onRowClicked,
  onRowCtrlClicked,
  tableClassName,
  themeClassName,
  selected,
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
        onRowCtrlClicked={onRowCtrlClicked}
        themeClassName={themeClassName}
        selected={selected}
        selectedRowClassName={selectedRowClassName}
      />
    </table>
  );
};

export default Table;

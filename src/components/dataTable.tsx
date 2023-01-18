import DataTable, { type TableProps } from "react-data-table-component";
import { ArrowDown } from "./icons";

const selectProps = {
  indeterminate: (isIndeterminate: boolean) => isIndeterminate,
};

const DataTableBase = <T,>(props: TableProps<T>) => {
  return (
    <DataTable
      pagination
      selectableRowsComponent={
        <input className="form-checkbox" type="checkbox" />
      }
      selectableRowsComponentProps={selectProps}
      sortIcon={<ArrowDown />}
      dense
      {...props}
    />
  );
};

export default DataTableBase;

export const RawDataTable = DataTable;

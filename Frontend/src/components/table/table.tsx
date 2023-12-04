import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import { Table as AntTable } from "antd";
import { AnyObject } from "@/types";

type PropsType<T extends AnyObject> = {
  data: T[];
  columns: ColumnsType<T>;
  pagination?: TablePaginationConfig;
  loading?: boolean;
};

/**  This component renders a table */
export const Table: <T extends AnyObject>(
  props: PropsType<T>
) => React.ReactElement = ({ columns, data, loading = false, pagination }) => {
  return (
    <div>
      <AntTable
        className="overflow-x-auto"
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={pagination ? pagination : false}
      />
    </div>
  );
};

"use client";
import { Table } from "@/components";
import { authorizedEntitiesData, authorizedEntitiesColumns } from "@/data";

export default function AuthorizedEntities() {
  return (
    <div>
      <Table
        columns={authorizedEntitiesColumns}
        data={authorizedEntitiesData}
        pagination={{ total: authorizedEntitiesData.length }}
      />
    </div>
  );
}

import React from "react";
import dayjs from "dayjs";
import InvoiceModule from "@/modules/InvoiceModule";

import { Tag } from "antd";

export default function Invoice() {
  const entity = "invoice";
  const searchConfig = {
    displayLabels: ["name", "surname"],
    searchFields: "name,surname,birthday",
  };
  const entityDisplayLabels = ["number", "client.company"];
  const dataTableColumns = [
    {
      title: "#N",
      dataIndex: "number",
    },
    {
      title: "Client",
      dataIndex: ["client", "company"],
    },
    {
      title: "Date",
      dataIndex: "date",
      render: (date) => {
        return dayjs(date).format("DD/MM/YYYY");
      },
    },
    {
      title: "Due date",
      dataIndex: "expiredDate",
      render: (date) => {
        return dayjs(date).format("DD/MM/YYYY");
      },
    },
    {
      title: "SubTotal",
      dataIndex: "subTotal",

      render: (subTotal) =>
        `$ ${subTotal}`.replace(/\B(?=(\d{3})+(?!\d))/g, " "),
    },
    {
      title: "Total",
      dataIndex: "total",

      render: (total) => `$ ${total}`.replace(/\B(?=(\d{3})+(?!\d))/g, " "),
    },
    {
      title: "paymentStatus",
      dataIndex: "paymentStatus",
      render: (paymentStatus) => {
        let color =
          paymentStatus === "unpaid"
            ? "volcano"
            : paymentStatus === "paid"
            ? "green"
            : "purple";

        return <Tag color={color}>{paymentStatus.toUpperCase()}</Tag>;
      },
    },
  ];

  const PANEL_TITLE = "invoice";
  const dataTableTitle = "invoices Lists";
  const ADD_NEW_ENTITY = "Add new invoice";
  const DATATABLE_TITLE = "invoices List";
  const ENTITY_NAME = "invoice";
  const CREATE_ENTITY = "Create invoice";
  const UPDATE_ENTITY = "Update invoice";

  const config = {
    entity,
    PANEL_TITLE,
    dataTableTitle,
    ENTITY_NAME,
    CREATE_ENTITY,
    ADD_NEW_ENTITY,
    UPDATE_ENTITY,
    DATATABLE_TITLE,
    dataTableColumns,
    searchConfig,
    entityDisplayLabels,
  };
  return <InvoiceModule config={config} />;
}

import React from "react";

import InvoicePanel from "@/components/InvoicePanel";
import { InvoiceLayout } from "@/layout";
import FormPatient from "@/forms/FormPatient";

export default function Invoice() {
  const entity = "patient";
  const searchConfig = {
    displayLabels: ["name", "surname"],
    searchFields: "name,surname,birthday",
  };
  const dataTableColumns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Surname",
      dataIndex: "surname",
    },
    {
      title: "Birthday",
      dataIndex: "birthday",
    },
    {
      title: "Gender",
      dataIndex: "sexe",
    },
  ];
  const readColumns = [
    {
      title: "Nom",
      dataIndex: "name",
    },
    {
      title: "Prenom",
      dataIndex: "surname",
    },
    {
      title: "Date de naissance",
      dataIndex: "birthday",
    },
    {
      title: "Sexe",
      dataIndex: "sexe",
    },
  ];
  const panelTitle = "Patient";
  const dataTableTitle = "Patients Lists";
  const config = {
    entity,
    panelTitle,
    dataTableTitle,
    readColumns,
    dataTableColumns,
    searchConfig,
  };
  return <InvoicePanel config={config} />;
}

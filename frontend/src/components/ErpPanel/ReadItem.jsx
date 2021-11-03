import React, { useState, useEffect, useRef } from "react";
import { Divider } from "antd";

import {
  Button,
  PageHeader,
  Row,
  Col,
  Descriptions,
  Statistic,
  Tag,
} from "antd";
import {
  EditOutlined,
  FilePdfOutlined,
  RollbackOutlined,
  PlusCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";

import { useSelector, useDispatch } from "react-redux";
import { erp } from "@/redux/erp/actions";

import { useErpContext } from "@/context/erp";
import uniqueId from "@/utils/uinqueId";

import { selectCurrentItem } from "@/redux/erp/selectors";

import { DOWNLOAD_BASE_URL } from "@/config/serverApiConfig";

const Item = ({ item }) => {
  console.info("item item : ", item);
  return (
    <Row gutter={[12, 0]} key={item._id}>
      <Col className="gutter-row" span={11}>
        <p style={{ marginBottom: 5 }}>
          <strong>{item.itemName}</strong>
        </p>
        <p>{item.description}</p>
      </Col>
      <Col className="gutter-row" span={4}>
        <p
          style={{
            textAlign: "right",
          }}
        >
          {item.price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
        </p>
      </Col>
      <Col className="gutter-row" span={4}>
        <p
          style={{
            textAlign: "right",
          }}
        >
          {item.quantity}
        </p>
      </Col>
      <Col className="gutter-row" span={5}>
        <p
          style={{
            textAlign: "right",
            fontWeight: "700",
          }}
        >
          {item.total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
        </p>
      </Col>
      <Divider dashed style={{ marginTop: 0, marginBottom: 15 }} />
    </Row>
  );
};

export default function ReadItem({ config }) {
  const { entity, ENTITY_NAME } = config;
  const dispatch = useDispatch();
  const { erpContextAction } = useErpContext();

  const { result: currentResult } = useSelector(selectCurrentItem);
  const { state } = useErpContext();

  const { readPanel, updatePanel } = erpContextAction;

  const [itemslist, setItemsList] = useState([]);
  const [currentErp, setCurrentErp] = useState({
    status: "",
    client: {
      company: "",
      email: "",
      phone: "",
      address: "",
    },
    subTotal: 0,
    taxTotal: 0,
    taxRate: 0,
    total: 0,
    credit: 0,
    number: 0,
    year: 0,
  });

  useEffect(() => {
    if (currentResult) {
      const { items } = currentResult;

      setItemsList(items);
      setCurrentErp(currentResult);
    }
  }, [currentResult]);

  useEffect(() => {
    console.info("itemslist", itemslist);
  }, [itemslist]);

  return (
    <>
      <PageHeader
        onBack={() => readPanel.close()}
        title={`${ENTITY_NAME} # ${currentErp.number}/${currentErp.year || ""}`}
        ghost={false}
        tags={
          <Tag color="volcano">
            {currentErp.paymentStatus || currentErp.status}
          </Tag>
        }
        // subTitle="This is cuurent erp page"
        extra={[
          <Button
            key={`${uniqueId()}`}
            onClick={() => readPanel.close()}
            icon={<CloseCircleOutlined />}
          >
            Close
          </Button>,
          <Button
            key={`${uniqueId()}`}
            onClick={() => {
              window.open(
                `${DOWNLOAD_BASE_URL}${entity}/${entity}-${currentErp._id}.pdf`,
                "_blank"
              );
            }}
            icon={<FilePdfOutlined />}
          >
            Download PDF
          </Button>,
          <Button
            key={`${uniqueId()}`}
            onClick={() => {
              dispatch(erp.currentAction("update", currentErp));
              updatePanel.open();
            }}
            type="primary"
            icon={<EditOutlined />}
          >
            Edit Erp
          </Button>,
        ]}
        style={{
          padding: "20px 0px",
        }}
      >
        <Row>
          <Statistic title="Status" value={currentErp.status} />
          <Statistic
            title="SubTotal"
            prefix="$"
            value={currentErp.subTotal}
            style={{
              margin: "0 32px",
            }}
          />
          <Statistic
            title="Total"
            prefix="$"
            value={currentErp.total}
            style={{
              margin: "0 32px",
            }}
          />
          <Statistic
            title="Balance"
            prefix="$"
            value={currentErp.credit}
            style={{
              margin: "0 32px",
            }}
          />
        </Row>
      </PageHeader>
      <Divider dashed />
      <Descriptions title={`Client : ${currentErp.client.company}`}>
        <Descriptions.Item label="Address">
          {currentErp.client.address}
        </Descriptions.Item>
        <Descriptions.Item label="E-mail">
          {currentErp.client.email}
        </Descriptions.Item>
        <Descriptions.Item label="Phone">
          {currentErp.client.phone}
        </Descriptions.Item>
      </Descriptions>
      <Divider />
      <Row gutter={[12, 0]}>
        <Col className="gutter-row" span={11}>
          <p>
            <strong>ITEM</strong>
          </p>
        </Col>
        <Col className="gutter-row" span={4}>
          <p
            style={{
              textAlign: "right",
            }}
          >
            <strong>PRICE</strong>
          </p>
        </Col>
        <Col className="gutter-row" span={4}>
          <p
            style={{
              textAlign: "right",
            }}
          >
            <strong>QUANTITY</strong>
          </p>
        </Col>
        <Col className="gutter-row" span={5}>
          <p
            style={{
              textAlign: "right",
            }}
          >
            <strong>TOTAL</strong>
          </p>
        </Col>
        <Divider />
      </Row>
      {itemslist.map((item) => (
        <Item key={item._id} item={item}></Item>
      ))}
      <div
        style={{
          width: "300px",
          float: "right",
          textAlign: "right",
          fontWeight: "700",
        }}
      >
        <Row gutter={[12, -5]}>
          <Col className="gutter-row" span={12}>
            <p>Sub Total :</p>
          </Col>

          <Col className="gutter-row" span={12}>
            <p>
              {`$ `}
              {currentErp.subTotal
                .toFixed(2)
                .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
            </p>
          </Col>
          <Col className="gutter-row" span={12}>
            <p>Tax Total ({currentErp.taxRate * 100} %) :</p>
          </Col>
          <Col className="gutter-row" span={12}>
            <p>
              {`$ `}
              {currentErp.taxTotal
                .toFixed(2)
                .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
            </p>
          </Col>
          <Col className="gutter-row" span={12}>
            <p>Total :</p>
          </Col>
          <Col className="gutter-row" span={12}>
            <p>
              {`$ `}
              {currentErp.total
                .toFixed(2)
                .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
            </p>
          </Col>
        </Row>
      </div>
    </>
  );
}

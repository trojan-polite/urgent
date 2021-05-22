import React, { useState, useEffect } from "react";
import { Form, Divider } from "antd";

import { Button, PageHeader, Row, Statistic, Tag } from "antd";

import { useSelector, useDispatch } from "react-redux";
import { erp } from "@/redux/erp/actions";
import { selectCreatedItem } from "@/redux/erp/selectors";

import { useErpContext } from "@/context/erp";
import uniqueId from "@/utils/uniqueId";

import ErpForm from "./ErpForm";
import Loading from "@/components/Loading";
import { CloseCircleOutlined, PlusOutlined } from "@ant-design/icons";
function SaveForm({ form }) {
  const handelClick = () => {
    form.submit();
  };

  return (
    <Button onClick={handelClick} type="primary" icon={<PlusOutlined />}>
      Save Erp
    </Button>
  );
}

export default function CreateItem({ config }) {
  let { entity, CREATE_ENTITY } = config;
  const { erpContextAction } = useErpContext();
  const { createPanel } = erpContextAction;
  const dispatch = useDispatch();
  const { isLoading, isSuccess } = useSelector(selectCreatedItem);
  const [form] = Form.useForm();
  const [subTotal, setSubTotal] = useState(0);
  const handelValuesChange = (changedValues, values) => {
    const items = values["items"];
    let subTotal = 0;

    if (items) {
      items.map((item) => {
        if (item) {
          if (item.quantity && item.price) {
            let total = item["quantity"] * item["price"];
            //sub total
            subTotal += total;
          }
        }
      });
      setSubTotal(subTotal);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      form.resetFields();
      dispatch(erp.resetAction("create"));
      setSubTotal(0);
      createPanel.close();
      dispatch(erp.list(entity));
    }
  }, [isSuccess]);

  const onSubmit = (fieldsValue) => {
    if (fieldsValue) {
      if (fieldsValue.expiredDate) {
        const newDate = fieldsValue["expiredDate"].format("DD/MM/YYYY");
        fieldsValue = {
          ...fieldsValue,
          expiredDate: newDate,
        };
      }
      if (fieldsValue.date) {
        const newDate = fieldsValue["date"].format("DD/MM/YYYY");
        fieldsValue = {
          ...fieldsValue,
          date: newDate,
        };
      }
      if (fieldsValue.items) {
        let newList = [...fieldsValue.items];
        newList.map((item) => {
          item.total = item.quantity * item.price;
        });
        fieldsValue = {
          ...fieldsValue,
          items: newList,
        };
      }
    }
    dispatch(erp.create(entity, fieldsValue));
  };

  return (
    <>
      <PageHeader
        onBack={() => createPanel.close()}
        title={CREATE_ENTITY}
        ghost={false}
        tags={<Tag color="volcano">Draft</Tag>}
        // subTitle="This is create page"
        extra={[
          <Button
            key={`${uniqueId()}`}
            onClick={() => createPanel.close()}
            icon={<CloseCircleOutlined />}
          >
            Cancel
          </Button>,
          <SaveForm form={form} key={`${uniqueId()}`} />,
        ]}
        style={{
          padding: "20px 0px",
        }}
      >
        <Row>
          <Statistic title="Status" value="Pending" />
          <Statistic
            title="Price"
            prefix="$"
            value={568.08}
            style={{
              margin: "0 32px",
            }}
          />
          <Statistic title="Balance" prefix="$" value={3345.08} />
        </Row>
      </PageHeader>
      <Divider dashed />
      <Loading isLoading={isLoading}>
        <Form
          form={form}
          layout="vertical"
          onFinish={onSubmit}
          onValuesChange={handelValuesChange}
        >
          <ErpForm subTotal={subTotal} />
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      </Loading>
    </>
  );
}

import React, { useState, useEffect } from "react";
import { Form, Divider } from "antd";
import dayjs from "dayjs";
import { Button, PageHeader, Row, Statistic, Tag } from "antd";

import { useSelector, useDispatch } from "react-redux";
import { erp } from "@/redux/erp/actions";

import { useErpContext } from "@/context/erp";
import uniqueId from "@/utils/uinqueId";
import { selectUpdatedItem } from "@/redux/erp/selectors";
import Loading from "@/components/Loading";
import ErpForm from "./ErpForm";
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

export default function UpdateItem({ config }) {
  let { entity, UPDATE_ENTITY } = config;
  const { erpContextAction } = useErpContext();
  const { updatePanel } = erpContextAction;
  const dispatch = useDispatch();
  const { current, isLoading, isSuccess } = useSelector(selectUpdatedItem);
  const [form] = Form.useForm();
  const [subTotal, setSubTotal] = useState(0);
  const [autoCompleteValue, setAutoCompleteValue] = useState("");

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

  const onSubmit = (fieldsValue) => {
    if (fieldsValue) {
      // if (fieldsValue.expiredDate) {
      //   fieldsValue = {
      //     ...fieldsValue,
      //     expiredDate: fieldsValue["expiredDate"].format("DD/MM/YYYY"),
      //   };
      // }
      // if (fieldsValue.date) {
      //   fieldsValue = {
      //     ...fieldsValue,
      //     date: fieldsValue["date"].format("DD/MM/YYYY"),
      //   };
      // }
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

    const id = current._id;
    console.log(
      "🚀 ~ file: UpdateItem.jsx ~ line 88 ~ onSubmit ~ fieldsValue",
      fieldsValue
    );
    dispatch(erp.update(entity, id, fieldsValue));
  };
  useEffect(() => {
    if (isSuccess) {
      form.resetFields();
      setSubTotal(0);
      dispatch(erp.resetAction("update"));
      updatePanel.close();
      dispatch(erp.list(entity));
    }
  }, [isSuccess]);

  useEffect(() => {
    if (current) {
      // if (current.client) {
      //   const tmpValue = { ...current.client };
      //   setAutoCompleteValue(tmpValue);

      //   current.client = undefined;
      // }
      if (current.date) {
        current.date = dayjs(current.date);
      }
      if (current.expiredDate) {
        current.expiredDate = dayjs(current.expiredDate);
      }
      if (!current.taxRate) {
        current.taxRate = 0;
      }

      const { subTotal } = current;

      form.setFieldsValue(current);
      setSubTotal(subTotal);
    }
  }, [current]);

  return (
    <>
      <PageHeader
        onBack={() => updatePanel.close()}
        title={UPDATE_ENTITY}
        ghost={false}
        // tags={<Tag color="volcano">Draft</Tag>}
        // subTitle="This is update page"
        extra={[
          <Button
            key={`${uniqueId()}`}
            onClick={() => updatePanel.close()}
            icon={<CloseCircleOutlined />}
          >
            Cancel
          </Button>,
          <SaveForm form={form} key={`${uniqueId()}`} />,
        ]}
        style={{
          padding: "20px 0px",
        }}
      ></PageHeader>
      <Divider dashed />
      <Loading isLoading={isLoading}>
        <Form
          form={form}
          layout="vertical"
          onFinish={onSubmit}
          onValuesChange={handelValuesChange}
        >
          <ErpForm
            subTotal={subTotal}
            // autoCompleteUpdate={autoCompleteValue}
            current={current}
          />
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

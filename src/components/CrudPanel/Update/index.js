import React, { useEffect } from "react";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { crud } from "@/redux/crud/actions";
import { useUiContext } from "@/context/ui";
import { selectUpdatedItem } from "@/redux/crud/selectors";

import { Button, Form } from "antd";
import Loading from "@/components/Loading";

export default function Update({ isOpen, entity, formElements }) {
  const dispatch = useDispatch();
  const { current, result, isLoading, isSuccess } = useSelector(
    selectUpdatedItem
  );

  const [form] = Form.useForm();

  const onSubmit = (fieldsValue) => {
    let values = {};
    if (fieldsValue) {
      if (fieldsValue.birthday) {
        values = {
          ...fieldsValue,
          birthday: fieldsValue["birthday"].format("DD/MM/YYYY"),
        };
      }
      if (fieldsValue.date) {
        values = {
          ...fieldsValue,
          birthday: fieldsValue["date"].format("DD/MM/YYYY"),
        };
      }
    }

    const id = current._id;
    dispatch(crud.update(entity, id, values));
  };
  useEffect(() => {
    console.log(current);
    if (current) {
      if (current.birthday) {
        current.birthday = dayjs(current.birthday);
      }
      if (current.date) {
        current.date = dayjs(current.date);
      }
      form.setFieldsValue(current);
    }

    // console.log(form.getFieldsValue());
    if (isSuccess) form.resetFields();
  }, [isSuccess, current]);
  const { state, uiContextAction } = useUiContext();
  const { isReadBoxOpen } = state;

  const show = isReadBoxOpen
    ? { display: "none", opacity: 0 }
    : { display: "block", opacity: 1 };
  return (
    <div style={show}>
      <Loading isLoading={isLoading}>
        <Form form={form} layout="vertical" onFinish={onSubmit}>
          {formElements}
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Loading>
    </div>
  );
}

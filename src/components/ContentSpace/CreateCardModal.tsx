import React, { useState } from "react";
import { Button, Modal, Form, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import CardM from "../../models/Card";
import { useTable } from "../../store/store";
import "./CreateCardModal.css";
import { descriptionValidation } from "../../models/Validation/Validation";

interface Values {
  title: string;
  description: string;
  modifier: string;
}

interface CollectionCreateFormProps {
  visible: boolean;
  onCreate: (values: Values) => void;
  onCancel: () => void;
}

const CollectionCreateForm: React.FC<CollectionCreateFormProps> = ({
  visible,
  onCreate,
  onCancel,
}) => {
  const [form] = Form.useForm();
  return (
    <Modal
      className="buttonsModal"
      visible={visible}
      title="Create a new task"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{ modifier: "public" }}
      >
        <Form.Item
          name="title"
          label="Title"
          rules={descriptionValidation.TitleCard}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          initialValue={""}
          rules={descriptionValidation.Description}
        >
           <Input.TextArea rows={4}/>
        </Form.Item>
      </Form>
    </Modal>
  );
};

const CollectionsPage = (props: any) => {
  const [visible, setVisible] = useState(false);
  const [state, actions] = useTable();

  const onCreate = async (values: any) => {
    const newCard = new CardM();
    newCard.description = values.description;
    newCard.title = values.title;
    newCard.columnId = props.colId;
    newCard.index = props.column.cards.length;
    props.column.cards.push(newCard);
    await actions.createCard(newCard, props.column);
    await actions.getColumnByBoard(state.currentBoard.id);
    setVisible(false);
  };

  return (
    <div>
      <Button
        className="addCard"
        type="primary"
        onClick={() => {
          setVisible(true);
        }}
      >
        <PlusOutlined />
        Add new task
      </Button>
      <CollectionCreateForm
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </div>
  );
};

export default CollectionsPage;

import {
  Button,
  Modal,
  Form,
  Input,
  Popconfirm,
  message,
} from "antd";
import { useTable } from "../../store/store";
import { descriptionValidation } from "../../models/Validation/Validation";

const EditCardModal = () => {
  const [state, actions] = useTable();
  const [form] = Form.useForm();
  let newCardTitle = state.currentCard.title;
  let newCardDescription = state.currentCard.description;

  const handleOk = async () => {
    let newCard = state.currentCard;
    newCard.description = newCardDescription;
    newCard.title = newCardTitle;
    actions.editCard(newCard);
    actions.hideEditCardModal();
    actions.getCardsByBoard(state.currentBoard.id);
  };

  const handleCancel = () => {
    actions.hideEditCardModal();
  };

  const handleDelete = async () => {
    let cardsDrag = state.currentColumn.cards;
    cardsDrag.splice(state.currentCard.index, 1);
    actions.deleteCard(state.currentCard.id);
    for (let i = state.currentCard.index; i < cardsDrag.length; i++) {
      cardsDrag[i].index--;
    }
    await actions.setCards(cardsDrag, state.currentColumn);
    message.success({
      content: "Card has been deleted",
      className: "message-box",
    });
    actions.hideEditCardModal();
    actions.getCardsByBoard(state.currentBoard.id);
  };

  return (
    <Modal
      visible={state.isEditCardModalHidden}
      title="Edit a new task"
      okText="Edit"
      cancelText="Cancel"
      onCancel={handleCancel}
      footer={[
        <Popconfirm
          title="Are you sure ?"
          okText="Yes"
          cancelText="No"
          onConfirm={handleDelete}
          onCancel={handleCancel}
        >
          <Button type="primary" danger style={{ float: "left" }}>
            Delete
          </Button>
        </Popconfirm>,

        <Button key="cancel" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={() => {
            form
              .validateFields()
              .then((values) => {
                form.resetFields();
                handleOk();
              })
              .catch((info) => {
                console.log("Validate Failed:", info);
              });
          }}
        >
          Edit
        </Button>,
      ]}
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
          initialValue={state.currentCard.title}
          rules={descriptionValidation.TitleCard}
        >
          <Input
            onChange={(event) => {
              newCardTitle = event.target.value;
            }}
          />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          initialValue={state.currentCard.description}
          rules={descriptionValidation.Description}
        >
          <Input.TextArea
            rows={4}
            onChange={(event) => {
              newCardDescription = event.target.value;
            }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditCardModal;

import { Modal, Input, Form, Button } from "antd";
import { editBoardNameBoard } from "../../../api/boardsApi";
import { descriptionValidation } from "../../../models/Validation/Validation";
import { useTable } from "../../../store/store";
import "./EditModal.css";

const EditModal = () => {
  const [state, actions] = useTable();
  const [form] = Form.useForm();

  const handleOk = async () => {
    let renamedBoard = state.currentBoard;
    renamedBoard.title = state.editBoardName;
    await editBoardNameBoard(renamedBoard);
    actions.showEditBoardModal();
    actions.getBoards();
  };

  const handleCancel = () => {
    actions.showEditBoardModal();
  };

  return (
    <Modal
      className="modal-container"
      title="Rename your board"
      visible={state.isEditBoardModalShown}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
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
                handleOk();
                form.resetFields();
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
          rules={descriptionValidation.TitleColumn}
        >
          <Input
            defaultValue={state.currentBoard?.title}
            onChange={(event) => {
              actions.setBoardName(event.target.value);
            }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditModal;

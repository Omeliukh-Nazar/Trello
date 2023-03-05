import { Form, Input, Modal } from "antd";
import columnsApi from "../../api/columnsApi";
import Column from "../../models/Column";
import { descriptionValidation } from "../../models/Validation/Validation";
import { useTable } from "../../store/store";

const AddNewColumnModal = () => {
  const [state, actions] = useTable();
  let newColumnName = "";

  const addNewColumn = async () => {
    let column = new Column();
    column.title = newColumnName;
    column.boardId = state.currentBoard.id;
    if(state.columns.length !== 0){
      column.index = state.columns[state.columns.length - 1].index + 1;
    }
    await columnsApi.addColumn(column);
    actions.hideAddColumnModal();
    actions.getColumnByBoard(state.currentBoard.id);
  };

  const handleCancel = () => {
    actions.hideAddColumnModal();
  };
  const [form] = Form.useForm();

  return (
    <Modal
      className="modal-container"
      title="Add new column"
      visible={state.isAddColumnModalHidden}
      onOk={addNewColumn}
      onCancel={handleCancel}
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
            onChange={(event) => {
              newColumnName = event.target.value;
            }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default AddNewColumnModal;

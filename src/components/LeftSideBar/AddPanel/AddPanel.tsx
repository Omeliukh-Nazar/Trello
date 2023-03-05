import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Tooltip } from "antd";
import { KeyboardEvent } from "react";
import { addBoard } from "../../../api/boardsApi";
import Board from "../../../models/Board";
import { descriptionValidation } from "../../../models/Validation/Validation";
import { useTable } from "../../../store/store";
import "./AddPanel.css";

const AddPanel = () => {
  const [state, actions] = useTable();
  const [form] = Form.useForm();

  const showInput = async () => {
    actions.openInputPanel();
  };

  const addNewBoard = async () => {
    let board = new Board();
    board.title = state.newBoard;
    await addBoard(board);
    actions.getBoards();
    actions.openInputPanel();
  };

  return (
    <>
      {state.isInputPanelHidden ? (
        <div className="collapsedButtonHide white-text" onClick={showInput}>
          Create new board
          <PlusOutlined />
        </div>
      ) : (
      <div className="form-container">
        <Form
          onSubmitCapture={(event) => {
            form
            .validateFields()
            .then(values => {
                addNewBoard();
              form.resetFields();
              event.preventDefault();
            })
            .catch(info => {
              console.log('Validate Failed:', info);
            });
          }}
          form={form}
          layout="inline"
        >
          <Form.Item
            name="title"
            rules={descriptionValidation.BoardTitle}
          >
            <Input
              className="input-marginating"
              placeholder="Enter board title"
              autoFocus
              onBlur={showInput}
              onChange={(event) => {
                actions.addBoardName(event.target.value);
              }}
            />
          </Form.Item>
        </Form>
        </div>
      )}
    </>
  );
};
export default AddPanel;

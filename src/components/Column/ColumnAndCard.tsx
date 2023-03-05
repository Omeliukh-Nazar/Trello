import { EllipsisOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Dropdown,
  Form,
  Input,
  Menu,
  message,
  Popconfirm,
  Row,
} from "antd";
import React, { useEffect, useState } from "react";
import columnsApi from "../../api/columnsApi";
import CardM from "../../models/Card";
import Column from "../../models/Column";
import { descriptionValidation } from "../../models/Validation/Validation";
import { useTable } from "../../store/store";
import CreateCardModal from "../ContentSpace/CreateCardModal";
import "./AddColumnModal.css";

const BoardColumn = () => {
  const [state, actions] = useTable();

  const [render, SetRender] = useState(false);

  let columnName = state.currentColumn?.title;

  const handleOk = async () => {
    if (columnName.length === 0) {
      return;
    }
    let newColumn: Column = state.currentColumn;
    newColumn.title = columnName;
    await columnsApi.editColumnName(newColumn);
  };

  const handleClick = async (event: React.MouseEvent<HTMLElement>) => {
    actions.setCurrentColumn(Number(event.currentTarget.id));
  };

  const handleEdit = async (event: any) => {
    columnName = event.target.value ? event.target.value : "";
  };

  async function confirm() {
    for (let i = state.currentColumn.index + 1; i < colums.length; i++) {
      colums[i].index--;
    }
    colums.splice(state.currentColumn.index, 1);

    await columnsApi.deleteColumnById(state.currentColumn.id);

    message.success({
      content: "Column has been deleted",
      className: "message-box",
    });
    await actions.setColumns(colums);
    SetRender(!render);
  }

  const deleteMenu: any = (
    <Menu>
      <Menu.Item>
        <div>
          <div style={{ clear: "both", whiteSpace: "nowrap" }}>
            <Popconfirm
              placement="bottom"
              title={"Are you sure to delete this task?"}
              onConfirm={confirm}
              okText="Yes"
              cancelText="No"
            >
              <label>Delete column</label>
            </Popconfirm>
          </div>
        </div>
      </Menu.Item>
    </Menu>
  );

  const handleAddNewColumn = () => {
    actions.hideAddColumnModal();
  };

  let dragIndexStart = 0;
  let startColumn = new Column();
  let dragIndexEnd = 0;
  let colums = state.columns;

  const dragOverHandler = (
    event: React.DragEvent<HTMLDivElement>,
    column: Column
  ) => {
    event.preventDefault();
    dragIndexEnd = column.index;
  };

  const dragLeaveHandler = async () => {};

  const dragStartHandler = (column: Column) => {
    dragIndexStart = column.index;
    startColumn = column;
  };

  const dragEndHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };
  const dropHandle = (e: React.DragEvent<HTMLDivElement>, column: Column) => {
    e.preventDefault();
    if (e.currentTarget.className.includes("column") && startCard === null) {
      if (dragIndexStart < column.index) {
        for (let i = dragIndexStart + 1; i <= dragIndexEnd; i++) {
          colums[i].index--;
        }
        colums.splice(dragIndexStart, 1);
        startColumn.index = dragIndexEnd;
        colums.splice(dragIndexEnd, 0, startColumn);
      } else {
        for (let i = dragIndexEnd; i < dragIndexStart; i++) {
          colums[i].index++;
        }
        colums.splice(dragIndexStart, 1);
        startColumn.index = dragIndexEnd;
        colums.splice(dragIndexEnd, 0, startColumn);
      }
      actions.setColumns(colums);
    } else if (startCard && column.cards.length == 0) {
      // first card
      cardsDrop = column.cards;
      cardsDrag.splice(dragIndexStartCard, 1);
      for (let i = dragIndexStartCard; i < cardsDrag.length; i++) {
        cardsDrag[i].index--;
      }
      startCard.index = 0;
      startCard.columnId = column.id;
      cardsDrop.splice(0, 0, startCard);

      actions.setCards(cardsDrag, startCardColumn);
      actions.setCards(cardsDrop, column);
    }
    SetRender(!render);
  };

  let dragIndexStartCard = 0;
  let startCard: any = null;
  let dragIndexEndCard = 0;
  let cardsDrag: CardM[] = [];
  let cardsDrop: CardM[] = [];
  let startCardColumn = new Column();

  function dragOverCardHandler(
    event: React.DragEvent<HTMLDivElement>,
    card: CardM
  ) {
    event.preventDefault();
    dragIndexEndCard = card.index;
  }

  function dragLeaveCardHandler() {}

  function dragStartCardHandler(card: CardM, col: Column) {
    dragIndexStartCard = card.index;
    startCard = card;
    cardsDrag = col.cards;
    startCardColumn = col;
  }

  function dragEndCardHandler(e: any) {
    e.preventDefault();
    startCard = null;
  }
  function dropCardHandle(
    e: React.DragEvent<HTMLDivElement>,
    card: CardM,
    col: Column
  ) {
    e.preventDefault();
    //переміщння між колонками
    if (startCard.columnId !== card.columnId) {
      cardsDrop = col.cards;
      cardsDrag.splice(dragIndexStartCard, 1);
      for (let i = dragIndexStartCard; i < cardsDrag.length; i++) {
        cardsDrag[i].index--;
      }
      startCard.index = card.index + 1;
      startCard.columnId = card.columnId;

      cardsDrop.splice(card.index + 1, 0, startCard);
      for (let i = startCard.index + 1; i < cardsDrop.length; i++) {
        cardsDrop[i].index++;
      }

      actions.setCards(cardsDrag, startCardColumn);
      actions.setCards(cardsDrop, col);
    } else {
      //переміщення в одній колонці
      if (dragIndexStartCard < dragIndexEndCard) {
        for (let i = dragIndexStartCard + 1; i <= dragIndexEndCard; i++) {
          cardsDrag[i].index--;
        }
        cardsDrag.splice(dragIndexStartCard, 1);
        startCard.index = dragIndexEndCard;
        cardsDrag.splice(dragIndexEndCard, 0, startCard);
      } else {
        for (let i = dragIndexEndCard; i < dragIndexStartCard; i++) {
          cardsDrag[i].index++;
        }
        cardsDrag.splice(dragIndexStartCard, 1);
        startCard.index = dragIndexEndCard;
        cardsDrag.splice(dragIndexEndCard, 0, startCard);
      }
      actions.setCards(cardsDrag, col);
    }
    SetRender(!render);
  }

  const renderColumns = (): JSX.Element => (
    <>
      {state.columns.map((col: Column) => (
        <div
          className="column"
          draggable={true}
          onDragOver={(e: any) => dragOverHandler(e, col)}
          onDragLeave={() => dragLeaveHandler()}
          onDragStart={() => dragStartHandler(col)}
          onDragEnd={(e: any) => dragEndHandler(e)}
          onDrop={(e: any) => dropHandle(e, col)}
        >
          <Row style={{ flexWrap: "nowrap" }}>
            <Col flex={4.9}>
              <Form
                key={"form" + col.id.toString()}
                name={"form" + col.id.toString()}
              >
                <Form.Item
                  name="Column name"
                  rules={[{ required: true }]}
                  className="column-title"
                  initialValue={col.title}
                >
                  <Input.TextArea
                    id={col.id.toString()}
                    className="column-title"
                    maxLength={50}
                    style={{
                      backgroundColor: "transparent",
                      border: 0,
                      color: "#273a59",
                      width: "99%",
                      fontSize: "1.5rem",
                    }}
                    autoSize={{ minRows: 1, maxRows: 5 }}
                    onChange={handleEdit}
                    onClick={handleClick}
                    onBlur={handleOk}
                  />
                </Form.Item>
              </Form>
            </Col>
            <Col flex={0.1}>
              <Dropdown
                className="deleteColumnButton"
                overlay={deleteMenu}
                placement="bottom"
                trigger={["click"]}
              >
                <Button onClick={() => actions.setCurrentColumn(col.id)}>
                  <EllipsisOutlined />
                </Button>
              </Dropdown>
            </Col>
          </Row>
          {col.cards.map((card: CardM) => (
            <Card
              draggable={true}
              onDragOver={(e: any) => dragOverCardHandler(e, card)}
              onDragLeave={() => dragLeaveCardHandler()}
              onDragStart={() => dragStartCardHandler(card, col)}
              onDragEnd={(e: any) => dragEndCardHandler(e)}
              onDrop={(e: any) => dropCardHandle(e, card, col)}
              className="item"
              key={card.id}
              title={card.title}
              bordered={false}
              style={{ width: 300 }}
              onClick={() => {
                actions.setCurrentCard(card.id, col);
                actions.setCurrentColumn(col.id);
                actions.hideEditCardModal();
              }}
            >
              <p>{card.description}</p>
            </Card>
          ))}
          <CreateCardModal colId={col.id} column={col} />
        </div>
      ))}
      <Button className="addColumn" onClick={handleAddNewColumn}>
        <PlusOutlined className="addColumnPlus" />
        Add new column
      </Button>
    </>
  );
  return <div className="board">{renderColumns()}</div>;
};

export default BoardColumn;

import { useTable } from "../../store/store";
import { Button, Layout, Menu } from "antd";
import "./LeftSideBar.css";
import "antd/dist/antd.min.css";
import AddPanel from "./AddPanel/AddPanel";
import {
  DeleteOutlined,
  DoubleRightOutlined,
  EditOutlined,
  LeftOutlined,
} from "@ant-design/icons";
import { deleteBoardById } from "../../api/boardsApi";
import { useEffect } from "react";

const { Sider } = Layout;

const LeftSideBar = () => {
  const [state, actions] = useTable();

  const handleCollapseSideBar = async () => {
    actions.hideSideBar();
  };

  const handleBoardDelete = async () => {
    await deleteBoardById(state.currentBoard.id);
    fetchData();
  };
  const handleShowEditBoardModal = () => {
    actions.showEditBoardModal();
  };

  const handleSelectBoard = async (event: any) => {
    await actions.setCurrentBoard(Number(event.key));
  };

  const fetchData = async () => {
    await actions.getBoards();
    await actions.setInitialCurrentBoard();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className={`sidebar ${!state.isSideBarHidden ? "" : "close"}`}>
        <div className="collapsedButton">
          {state.isSideBarHidden ? (
            <>
              <div onClick={handleCollapseSideBar}>
                <DoubleRightOutlined />
              </div>
            </>
          ) : (
            <>
              <div
                className="collapsedButtonHide white-text"
                onClick={handleCollapseSideBar}
              >
                List of Boards
                <LeftOutlined />
              </div>
              <div>
                <AddPanel />
              </div>
            </>
          )}
          {!state.isSideBarHidden ? (
            <div className="buttonsBlock">
              <Button className="itemButton" onClick={handleShowEditBoardModal}>
                <EditOutlined />
              </Button>
              <Button className="itemButton" onClick={handleBoardDelete}>
                <DeleteOutlined />
              </Button>
            </div>
          ) : null}
        </div>

        <Sider
          className="sidebar-position"
          collapsedWidth={50}
          breakpoint="md"
          trigger={null}
          collapsible
          collapsed={state.isSideBarHidden}
        >
          <div className="logo" />
          <Menu
            theme="dark"
            className="menu"
            mode="inline"
            items={state.menuItems}
            onSelect={handleSelectBoard}
            selectedKeys={[state.currentBoard.id.toString()]}
          />
        </Sider>
      </div>
    </>
  );
};
export default LeftSideBar;

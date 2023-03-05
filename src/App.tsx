import { Layout } from "antd";
import "./App.css";
import AddNewColumnModal from "./components/Column/AddColumnModal";
import ContentSpace from "./components/ContentSpace/ContentSpace";
import EditCardModal from "./components/ContentSpace/EditCardModal";
import HeaderBar from "./components/HeaderBar/HeaderBar";
import EditModal from "./components/LeftSideBar/EditModal/EditModal";
import LeftSideBar from "./components/LeftSideBar/LeftSideBar";
import { useTable } from "./store/store";

function App() {
  const [state] = useTable();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <HeaderBar />
      <Layout className="layoutStyles">
        <LeftSideBar />
        <ContentSpace />
        {state.isEditBoardModalShown ? <EditModal /> : null}
        {state.isEditCardModalHidden ? <EditCardModal /> : null}
        {state.isAddColumnModalHidden ? <AddNewColumnModal /> : null}
      </Layout>
    </Layout>
  );
}

export default App;

import { Layout } from "antd";
import "./ContentSpace.css";
import "antd/dist/antd.min.css";
import { useTable } from "../../store/store";
import { useEffect } from "react";
import BoardColumn from "../Column/ColumnAndCard";
import BoardTitle from "./BoardTitle";

const { Content } = Layout;

const ContentSpace = () => {
  const [state, actions] = useTable();

  useEffect(() => {
    actions.getColumnByBoard(state.currentBoard.id);
  }, [state.currentBoard.id]);

  return (
    <Content
      className={`content ${state.isSideBarHidden ? "content-full" : ""}`}
      style={{
        backgroundImage: `linear-gradient(
          30deg,
          hsl(239deg 82% 74%) 0%,
          hsl(277deg 65% 61%) 49%,
          hsl(315deg 72% 64%) 61%,
          hsl(337deg 88% 74%) 76%,
          hsl(327deg 98% 83%) 100%
        )`,
        backgroundSize: "cover",
      }}
    >
      <div className="boardTitle">
        <BoardTitle />
      </div>
      <BoardColumn />
    </Content>
  );
};
export default ContentSpace;

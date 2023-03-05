import { Col, Layout, Row } from "antd";
import { Avatar, Image } from "antd";
import "./HeaderBar.css";
import "antd/dist/antd.min.css";

const { Header } = Layout;

const HeaderBar = () => {
  return (
    <>
      <Header className="header">
        <Row>
          <Col flex="auto">EPlastBoard</Col>
          <Col flex="50px">
            <Avatar
              className="avatar"
              size={50}
              src={
                <Image
                  src="https://miro.medium.com/max/1400/1*PNsOWCwBAybukLYfFnuUgw.png"
                  style={{ width: 28, margin: 7 }}
                />
              }
            ></Avatar>
          </Col>
        </Row>
      </Header>
    </>
  );
};
export default HeaderBar;

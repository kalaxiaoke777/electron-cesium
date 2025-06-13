import React from "react";
import { Layout, Menu } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import "antd/dist/reset.css";
import "cesium/Build/Cesium/Widgets/widgets.css";
import { Viewer } from "cesium";
import * as Ceiusm from "cesium";
import "./App.css";

const { Header, Sider, Content } = Layout;

function App() {
  const cesiumContainerRef = React.useRef<HTMLDivElement>(null);
  const [collapsed, setCollapsed] = React.useState(false);

  React.useEffect(() => {
    let viewer: Viewer | undefined;
    if (cesiumContainerRef.current) {
      // @ts-ignore
      window.CESIUM_BASE_URL = "/node_modules/cesium/Build/Cesium/";
      viewer = new Viewer(cesiumContainerRef.current, {
        shouldAnimate: true,
        animation: false,
        baseLayerPicker: false,
        fullscreenButton: false,
        vrButton: false,
        geocoder: false,
        homeButton: false,
        infoBox: false,
        sceneModePicker: false,
        selectionIndicator: false,
        timeline: false,
        navigationHelpButton: false,
        navigationInstructionsInitiallyVisible: false,
        creditContainer: undefined,
      });
      // 视角飞到北京
      viewer.camera.flyTo({
        destination: Ceiusm.Cartesian3.fromDegrees(116.3911, 39.9067, 5000), // 北京经纬度
        duration: 2, // 飞行时间
      });
    }
    return () => {
      if (viewer) {
        viewer.destroy();
      }
    };
  }, []);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div
          className="demo-logo-vertical"
          style={{
            height: 32,
            margin: 16,
            background: "rgba(255,255,255,0.2)",
          }}
        />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="3" icon={<UploadOutlined />}>
            上传
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: "#fff",
            display: "flex",
            alignItems: "center",
            height: 64,
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              style: { padding: "0 24px", fontSize: 20, cursor: "pointer" },
              onClick: () => setCollapsed(!collapsed),
            }
          )}
          <span
            style={{ fontSize: 18, marginLeft: 16, fontWeight: 600 }}
          ></span>
          {/* 地图工具栏 */}
          <div
            className="map-toolbar"
            style={{
              marginLeft: "auto",
              display: "flex",
              alignItems: "center",
              gap: 16,
              paddingRight: 16,
              flexWrap: "wrap",
              minWidth: 0,
              maxWidth: "100%",
            }}
          >
            <button className="toolbar-btn">
              <span role="img" aria-label="zoom-in">
                🔍➕
              </span>{" "}
              <span className="btn-text">放大</span>
            </button>
            <button className="toolbar-btn">
              <span role="img" aria-label="zoom-out">
                🔍➖
              </span>{" "}
              <span className="btn-text">缩小</span>
            </button>
            <button className="toolbar-btn">
              <span role="img" aria-label="reset">
                🏠
              </span>{" "}
              <span className="btn-text">复位</span>
            </button>
            <button className="toolbar-btn">
              <span role="img" aria-label="measure">
                📏
              </span>{" "}
              <span className="btn-text">测距</span>
            </button>
            <button className="toolbar-btn">
              <span role="img" aria-label="area">
                📐
              </span>{" "}
              <span className="btn-text">测面</span>
            </button>
            <button className="toolbar-btn">
              <span role="img" aria-label="layer">
                🗺️
              </span>{" "}
              <span className="btn-text">图层</span>
            </button>
            <button className="toolbar-btn">
              <span role="img" aria-label="location">
                📍
              </span>{" "}
              <span className="btn-text">定位</span>
            </button>
          </div>
        </Header>
        <Content
          style={{
            margin: 0,
            padding: 0,
            height: "calc(100vh - 64px)",
            position: "relative",
          }}
        >
          <div
            ref={cesiumContainerRef}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: 0,
            }}
          />
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;

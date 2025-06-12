import { useEffect, useRef } from "react";
import "cesium/Build/Cesium/Widgets/widgets.css";
import { Viewer } from "cesium";
import * as Cesium from "cesium";
import "./App.css";

function App() {
  const cesiumContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
      // 飞到中国北京
      if (viewer) {
        viewer.camera.flyTo({
          destination: Cesium.Cartesian3.fromDegrees(116.3911, 39.9067, 5000), // 北京经纬度和高度
        });
      }
    }

    return () => {
      if (viewer) {
        viewer.destroy();
      }
    };
  }, []);

  return (
    <>
      <div
        ref={cesiumContainerRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 0,
        }}
      />
    </>
  );
}

export default App;

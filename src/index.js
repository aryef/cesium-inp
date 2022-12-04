// Grant CesiumJS access to your ion assets
import * as Cesium from "cesium";
import "cesium/Build/Cesium/Widgets/widgets.css";
import "../src/css/main.css";

Cesium.Ion.defaultAccessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJhMTdmZDFiNi1hNGM0LTRkZTQtYmY5YS0zYzgwMjkyMjZlNTciLCJpZCI6MTE2OTM0LCJpYXQiOjE2Njk5NzQxODZ9.cDAFssAhRLb53ckRxYq9-44iI2XoBHq8kAe7A0sUod8";

const viewer = new Cesium.Viewer("cesiumContainer", {
  requestRenderMode: true,
  maximumRenderTimeChange: Infinity,
});

viewer.scene.debugShowFramesPerSecond = true;

const options = {
  camera: viewer.scene.camera,
  canvas: viewer.scene.canvas,
};

const tileSet = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
    url : 'http://localhost:9000/public/3d_tiles/2_0_0-4_1_1/tileset.json'
}));

console.log(`'http://localhost:9000/public/3d_tiles/2_0_0-4_1_1/tileset.json' loaded successfully`);

const kmlDataSource = new Cesium.KmlDataSource();
kmlDataSource.show = true;

(async () => {

  await viewer.dataSources.add(kmlDataSource);

  try {
    await kmlDataSource.load(
      "http://localhost:9000/public/kml/AGI_HQ.kmz",
        options
    );
      await tileSet.readyPromise;
      await viewer.flyTo(tileSet);
      console.log(`tileset ready`);

      //await viewer.flyTo(kmlDataSource, { duration: 5 });
  } catch (e) {
    console.error("Error loading", e);
  }

})();

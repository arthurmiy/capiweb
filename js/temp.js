function Capi() {
  //todo create orientation inspector
  var container,
    renderer,
    renderRequested = false;
  var containerAxes, rendererAxes, sceneAxes, cameraAxes, AxesHelper;
  let start_line = -1;
  let current_line_length = 0;
  let previous_line_lengths = [];
  let next_line_length = 0;
  let current_slope = null;
}

Capi.prototype = {
  addGeometry: function (geometry, params) {
    //todo implement handleGeometry
  },

  upadteState: function (params) {
    //todo updateCapiState
  },

  updateSettings: function (params) {
    //todo updateCapiSettings
  },

  updateItemProperties: function (params) {
    //todo updateItemProperties
  },

  updateSetProperties: function (params) {
    //updateSetProperties
  },

  updateVisibility: function (params) {
    //todo update visibility
  },

  dispatchProcess: function (params) {
    //todo dispatch process
  },

  addShadowedLight: function (x, y, z, color, intensity) {
    //todo addshadowedlight
  },

  handleConstrolsChange: function () {
    //todo handle controls change
  },

  handleControlsEnd: function () {
    //todo handle controls end
  },

  inspectControlsOrientation: function () {},

  paintPlane: function (e) {},

  paintTrace: function (e) {},

  paintSection: function (e) {},

  updateViewerState: function (e) {},
};

export { Capi };

/// todo in another place
//onDblClick
//handle mouse down
//handle mouse move
//handle mouse up
//handle mouse wheel
//animate
//requestRenderIfNotRequested
//render
//init

import React from "react";
import * as d3 from "d3";

const MIN_DISTANCE = 20;
const DISTANCE_CORRECTOR = 5; // ma
const REPULSION = -80;

// simulation setup with all forces
const linkForce2 = d3
  .forceLink()
  .id(node => {
    return node.nodeId;
  })
  .distance(link => {
    return MIN_DISTANCE * link.betweennessWeighted * DISTANCE_CORRECTOR; // distance
  });

function getViewport() {
  var viewPortWidth;
  var viewPortHeight;

  // the more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight
  if (typeof window.innerWidth != "undefined") {
    viewPortWidth = window.innerWidth;
    viewPortHeight = window.innerHeight;
  }

  // IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)
  else if (
    typeof document.documentElement !== "undefined" &&
    typeof document.documentElement.clientWidth !== "undefined" &&
    document.documentElement.clientWidth !== 0
  ) {
    viewPortWidth = document.documentElement.clientWidth;
    viewPortHeight = document.documentElement.clientHeight;
  }

  // older versions of IE
  else {
    viewPortWidth = document.getElementsByTagName("body")[0].clientWidth;
    viewPortHeight = document.getElementsByTagName("body")[0].clientHeight;
  }
  return [viewPortWidth, viewPortHeight];
}

const Graph = React.forwardRef((props, ref) => {
  return <div ref={ref} id="graph" />;
});

export default Graph;

import React from "react";
import * as d3 from "d3";

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
    typeof document.documentElement != "undefined" &&
    typeof document.documentElement.clientWidth != "undefined" &&
    document.documentElement.clientWidth != 0
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
  const [viewPortWidth, viewPortHeight] = getViewport();
  /*  const svg = d3.select(ref.current).append("svg");

  // how to scale an SVG
  // https://css-tricks.com/scale-svg/
  svg
    .attr("x", "0px")
    .attr("y", "0px")
    .attr("id", "canvas")
    .style("background-color", "#C6D8E0")
    .attr("width", viewPortWidth)
    .attr("height", viewPortHeight)
    .attr("viewBox", `0 0 ${viewPortWidth / 4} ${viewPortHeight / 4}`)
    .style("margin-top", "10px"); */

  return <div ref={ref}>Graph</div>;
});

export default Graph;

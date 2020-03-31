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

const useGraph = ({ ref, nodes }) => {
  const [viewPortWidth, viewPortHeight] = getViewport();

  const widthScaled = viewPortWidth / 2; // twice
  const heightScaled = viewPortHeight / 2; // twice

  const [nodeElements, setNodeElements] = React.useState();
  const [textElements, setTextElements] = React.useState();

  const [textVisibility, toogleTextVisibility] = React.useState(true);

  React.useEffect(() => {
    const svg = d3.select(ref.current).append("svg");

    svg
      .attr("x", "0px")
      .attr("y", "0px")
      .attr("id", "canvas")
      .style("background-color", "#C6D8E0")
      .attr("width", viewPortWidth)
      .attr("height", viewPortHeight)
      .attr("viewBox", `0 0 ${widthScaled} ${heightScaled}`)
      .style("margin-top", "10px");

    const simulation = d3
      .forceSimulation()
      .force("link", linkForce2)
      .force("charge", d3.forceManyBody().strength(REPULSION))
      .force("center", d3.forceCenter(widthScaled / 2, heightScaled / 2));

    const initialNodeElements = svg
      .append("g")
      .attr("class", "nodes")
      .selectAll("circle")
      .data(nodes)
      .enter()
      .append("circle")
      .attr("r", () => 5)
      .attr("fill", "#000000")
      .style("pointer-events", "auto");

    const initialTextElements = svg
      .append("g")
      .attr("class", "texts")
      .selectAll("text")
      .data(nodes)
      .enter()
      .append("text")
      .text(node => node.screenName)
      .attr("class", "svg-text")
      .attr("dx", 15)
      .attr("dy", 4)
      .style("display", textVisibility ? "visible" : "none");

    simulation.nodes(nodes).on("tick", () => {
      initialNodeElements.attr("cx", node => node.x).attr("cy", node => node.y);
      initialTextElements.attr("x", node => node.x).attr("y", node => node.y);
      setNodeElements(initialNodeElements);
      setTextElements(initialTextElements);
    });
  }, []);

  const handleToggle = () => toogleTextVisibility(!textVisibility);

  React.useEffect(() => {
    textElements &&
      textElements.style("display", textVisibility ? "block" : "none");
  }, [textVisibility]);

  return {
    handleToggle
  };
};

export default useGraph;

import * as d3 from "d3";
import * as config from "./configuration";

import {
  getNeighbors,
  getDefaultNodeColor,
  getNodeColor,
  getLinkColor,
  getNodeOpacity,
  getLinkOpacity,
  getNodePointerEvents,
  getDefaultLinkColor
} from "./helpers";

const DRAGALPHA = 0.05;
const MIN_DISTANCE = 20;
const DISTANCE_CORRECTOR = 5; // makes distance visually meaningful

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

// simulation setup with all forces
const linkForce2 = d3
  .forceLink()
  .id(node => {
    return node.nodeId;
  })
  .distance(link => {
    return MIN_DISTANCE * link.betweennessWeighted * DISTANCE_CORRECTOR; // distance
  });

/* const linkForce2 = d3
  .forceLink()
  .id(node => {
    return node.nodeId;
  })
  .distance(link => {
    const dist =
      config.DIST_MULTIPLIER *
        (link.source.degree + link.target.degree) *
        100 +
      config.DIST_EXTRA;
    // console.log(dist);
    return dist;
  }); */

export default (el, { nodes, links }, handleOnOpen) => {
  //  console.log("##", nodes, links);
  // ugly way to keep state in event handling!vrefactor asap.
  let clickStart = null;
  let neighbors = null;
  let focused = false;
  let clickEnd = null;
  // end refactor

  const [viewPortWidth, viewPortHeight] = getViewport();
  const svg = d3.select(el).append("svg");

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
    .style("margin-top", "10px");

  // simulation setup with all forces
  const simulation = d3
    .forceSimulation()
    .force("link", linkForce2)
    .force("charge", d3.forceManyBody().strength(config.REPULSION))
    .force("center", d3.forceCenter(viewPortWidth / 8, viewPortHeight / 8));

  /* eslint-disable no-param-reassign */
  const drag = () => {
    const dragstarted = d => {
      if (!d3.event.active) {
        simulation.alphaTarget(DRAGALPHA).restart();
      }
      d.fx = d.x;
      d.fy = d.y;
    };

    const dragged = d => {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    };

    const dragended = d => {
      if (!d3.event.active) {
        simulation.alphaTarget(0);
      }
      d.fx = null;
      d.fy = null;
    };
    /* eslint-enable no-param-reassign */

    return d3
      .drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended);
  };

  const linkElements = svg
    .append("g")
    .attr("class", "links")
    .selectAll("line")
    .data(links)
    .enter()
    .append("line")
    .attr("stroke-width", 1)
    .attr("stroke", getDefaultLinkColor);

  const textElements = svg
    .append("g")
    .attr("class", "texts")
    .selectAll("text")
    .data(nodes)
    .enter()
    .append("text")
    .text(node => node.screenName)
    .attr("class", "svg-text")
    .attr("dx", 15)
    .attr("dy", 4);

  const nodeElements = svg
    .append("g")
    .attr("class", "nodes")
    .selectAll("circle")
    .data(nodes)
    .enter()
    .append("circle")
    .attr("r", () => 5)
    .attr("fill", getDefaultNodeColor)
    .style("pointer-events", "auto");

  simulation.nodes(nodes).on("tick", () => {
    nodeElements.attr("cx", node => node.x).attr("cy", node => node.y);
    textElements.attr("x", node => node.x).attr("y", node => node.y);
    linkElements
      .attr("x1", link => link.source.x)
      .attr("y1", link => link.source.y)
      .attr("x2", link => link.target.x)
      .attr("y2", link => link.target.y);
  });

  // Add zooming
  const zoom = d3
    .zoom()
    .scaleExtent([1 / 15, 10])
    .on("zoom", () => {
      linkElements.attr("transform", d3.event.transform);
      textElements.attr("transform", d3.event.transform);
      nodeElements.attr("transform", d3.event.transform);
    });
  svg.call(zoom);

  simulation.force("link").links(links);

  const handleMouseDown = element => {
    if (!focused) {
      clickStart = new Date();
      neighbors = getNeighbors(element, links);
      focused = true;

      // Lessen opacity for everything execpt active and change link color
      nodeElements.attr("opacity", node => getNodeOpacity(node, neighbors));
      nodeElements.attr("pointer-events", node =>
        getNodePointerEvents(node, neighbors)
      );
      nodeElements.attr("fill", node => getNodeColor(node, neighbors));
      linkElements.attr("opacity", node => getNodeOpacity(node, neighbors));
      linkElements.attr("opacity", link => getLinkOpacity(element, link));
      linkElements.attr("stroke", link => getLinkColor(element, link));
    }
  };

  const handleMouseUp = element => {
    const { url } = element;
    if (focused && url.length > 0 && neighbors) {
      clickEnd = new Date();
      if (
        clickEnd - clickStart > 500 &&
        neighbors.indexOf(element.screenName) > -1
      ) {
        // ATM only display last URL fro all urls in data
        // TODO: ch1031 Add page for multiple node tweets

        if (url.length > 1) {
          // handleOnOpen(url);
          console.log("should be open a dialog box to select a link");
        } else {
          window.open(url[url.length - 1], "_blank");
        }
      }
    }
  };

  const reset = () => {
    if (d3.event.target.nodeName === "svg" && focused) {
      nodeElements.attr("fill", getDefaultNodeColor);
      nodeElements.attr("opacity", config.OPACITY);
      textElements.attr("opacity", config.OPACITY);
      linkElements.attr("stroke", getDefaultLinkColor);
      linkElements.attr("opacity", config.OPACITY);
      focused = false;
    }
  };
  svg.on("click", reset);

  nodeElements
    .style("cursor", d => (d.url ? "pointer" : "initial"))
    .on("click", handleMouseUp)
    .on("mousedown", handleMouseDown)
    .call(drag());

  const toggleText = textVisibility => {
    // console.log("toggleText", textVisibility ? "visible" : "none");
    textElements.style("display", textVisibility ? "visible" : "none");
  };
  return toggleText;
};

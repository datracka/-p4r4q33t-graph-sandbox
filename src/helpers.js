import * as config from "./configuration";

export function getNeighbors(node, links) {
  return links.reduce(
    (neighbors, link) => {
      if (link.target.screenName === node.screenName) {
        neighbors.push(link.source.screenName);
      } else if (link.source.screenName === node.screenName) {
        neighbors.push(link.target.screenName);
      }
      return neighbors;
    },
    [node.screenName]
  );
}

function isNeighborLink(node, link) {
  // console.log("link", link);
  return (
    link.target.screenName === node.screenName ||
    link.source.screenName === node.screenName
  );
}

export function getDefaultLinkColor(link) {
  let color;
  switch (link.typeLink) {
    case config.REPLY:
      color = config.linkAttrs.strokes[config.REPLY];
      break;
    case config.RETWEET:
      color = config.linkAttrs.strokes[config.RETWEET];
      break;
    case config.MENTION:
      color = config.linkAttrs.strokes[config.MENTION];
      break;
    case config.QUOTE:
      color = config.linkAttrs.strokes[config.QUOTE];
      break;
    default:
      color = "#000";
  }
  return color;
}

export function getDefaultNodeColor(node) {
  // define basic gradient
  const red = node.degree * 4 * 256;
  const green = (1 - node.degree * 4) * 256;
  // console.log(red, green);
  return `rgb(${red}, ${green}, 0)`;
}

export const getNodeColor = (node, neighbors) => {
  // define basic gradient
  const red = node.degree * 4 * 256;
  const green = (1 - node.degree * 4) * 256;

  const { url } = node;
  if (neighbors.indexOf(node.screenName) !== -1) {
    if (url.length === 1) {
      return config.nodeAttrs.colorWitOnehUrl;
    }
    if (url.length > 1) {
      return config.nodeAttrs.colorWitMultiplehUrls;
    }
    return config.nodeAttrs.highlightedColor;
  }
  // no nodes selected normal node color
  const c = `rgb(${red}, ${green}, 0)`;
  return c;
};

export function getTextColor(node, neighbors) {
  return neighbors.indexOf(node.screenName) !== -1
    ? config.textStyle.highlightedFill
    : config.textStyle.fill;
}

export function getLinkColor(node, link) {
  return isNeighborLink(node, link)
    ? config.linkAttrs.highlightedStrokes[link.typeLink]
    : config.linkAttrs.strokes[link.typeLink];
}

export function getNodeOpacity(node, neighbors) {
  return neighbors.indexOf(node.screenName) !== -1
    ? config.OPACITY
    : config.HOVER_OPACITY;
}

export function getLinkOpacity(node, link) {
  return isNeighborLink(node, link) ? config.OPACITY : config.HOVER_OPACITY;
}

export function getNodePointerEvents(node, neighbors) {
  return neighbors.indexOf(node.screen_name) !== -1
    ? config.nodeAttrs.highlightedPointerEvents
    : config.nodeAttrs.pointerEvents;
}

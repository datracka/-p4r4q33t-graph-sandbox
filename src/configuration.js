export const DRAGALPHA = 0.05;
export const DIST_MULTIPLIER = 1;
export const DIST_EXTRA = 0;
export const REPULSION = -80;
export const REPULSIONPOWER = 0.3;
export const MAXREPULSIONLENGTH = 0.25;
export const OPACITY = 1.0;
export const HOVER_OPACITY = 0.35;
export const INITIAL_SCALE = 0.75;

// types of relationships between links
export const REPLY = "reply";
export const RETWEET = "retweet";
export const QUOTE = "quote";
export const MENTION = "mention";

export const linkAttrs = {
  strokeOpacity: 0.6,
  strokes: {
    [REPLY]: "#842608",
    [RETWEET]: "#ab6800",
    [MENTION]: "#443e36",
    [QUOTE]: "#007b81"
  },
  // mimics theme.js definition
  highlightedStrokes: {
    [REPLY]: "#421304",
    [RETWEET]: "#553300",
    [MENTION]: "#211e1b",
    [QUOTE]: "#003d40"
  }
};

export const nodeAttrs = {
  stroke: "#fff",
  strokeWidth: 0,
  color: "#FFBE57",
  colorWitOnehUrl: "#1da1f2",
  colorWitMultiplehUrls: "#007b81",
  highlightedColor: "#F15A29",
  pointerEvents: "none",
  highlightedPointerEvents: "initial"
};

export const textStyle = {
  fill: "#404444",
  highlightedFill: "#ddd",
  textAnchor: "middle",
  fontSize: "10px",
  fontFamily: "Arial",
  textShadow: "none",
  letterSpacing: "0.5px",
  fontWeight: "700"
};

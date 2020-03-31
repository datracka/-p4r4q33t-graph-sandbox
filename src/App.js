import React from "react";
import "./styles.css";
import Graph from "./graph";
import useGraph from "./use-graph";

// https://bl.ocks.org/mapio/53fed7d84cd1812d6a6639ed7aa83868

const testData = {
  networkData: [
    {
      nodes: [
        {
          nodeId: "NASA",
          screenName: "NASA",
          createdAt: "Wed Sep 04 21:58:56 +0000 2019",
          degree: 0.5,
          radius: 25,
          replyCount: null,
          retweetCount: null,
          text: "[]",
          url: "[]",
          __typename: "Node"
        },
        {
          nodeId: "VolkanErsinESF",
          screenName: "VolkanErsinESF",
          createdAt: "Wed Sep 04 21:58:32 +0000 2019",
          degree: 0.15000000000000002,
          radius: 8,
          replyCount: 0,
          retweetCount: 0,
          text:
            "['RT @NASA_SLS: CubeSats can be part of a historic mission aboard Artemis 2, the second lunar mission of #NASASLS and @NASA_Orion. @NASA is s…']",
          url:
            "['https://twitter.com/VolkanErsinESF/status/1169369178316390400']",
          __typename: "Node"
        },
        {
          nodeId: "NASA_SLS",
          screenName: "NASA_SLS",
          createdAt: "Wed Sep 04 21:58:32 +0000 2019",
          degree: 0.05,
          radius: 5,
          replyCount: null,
          retweetCount: null,
          text: "[]",
          url: "[]",
          __typename: "Node"
        },
        {
          nodeId: "NASA_Orion",
          screenName: "NASA_Orion",
          createdAt: "Wed Sep 04 21:58:32 +0000 2019",
          degree: 0.05,
          radius: 5,
          replyCount: null,
          retweetCount: null,
          text: "[]",
          url: "[]",
          __typename: "Node"
        }
      ],
      links: [
        {
          source: "NASA",
          target: "VolkanErsinESF",
          betweennessWeighted: "0.1",
          __typename: "Link"
        },
        {
          source: "VolkanErsinESF",
          target: "NASA_SLS",
          betweennessWeighted: "0.28205128205128205",
          __typename: "Link"
        },
        {
          source: "VolkanErsinESF",
          target: "NASA_Orion",
          betweennessWeighted: "0.28205128205128205",
          __typename: "Link"
        }
      ],
      __typename: "Network"
    }
  ]
};

const App = () => {
  const ref = React.useRef(null);
  const [currentNode, setCurrentNode] = React.useState(null);
  const { handleToggle } = useGraph({
    ref,
    nodes: testData.networkData[0].nodes
  });

  const createHandleClick = node => e => setCurrentNode(node);

  return (
    <>
      <button onClick={handleToggle}>toggle text</button>
      <ul className="box">
        {testData.networkData[0].nodes.map(node => {
          const handleClick = createHandleClick(node);
          return (
            <li onClick={handleClick} key={node.nodeId}>
              {node.nodeId}
            </li>
          );
        })}
      </ul>
      <Graph ref={ref} />
    </>
  );
};

export default App;

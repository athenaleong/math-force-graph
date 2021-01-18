import logo from './logo.svg';
import React, {useState, useEffect, useMemo, useCallback} from 'react';
import ForceMap from './components/forceMap/forceMap';
import {RightBox, Main, TitleBox, Settings, ResetButton} from './style';
import InfoBar from './components/infoBar/infoBar';
import graphData from './mockData.json';
import {greyArray} from './color';
import ToggleDagMode from './components/select/select'
import axios from 'axios';

function App() {

  // const [graphData, setGraphData] = useState(null);

  const rootId = "5ff5c2599b5920837d7b5a65";
  const [selectedNode, setSelectedNode] = useState(null);
  const [dagMode, setDagMode] = useState('radial');
  const [buttonClick, setButtonClick] = useState(false);

  const nodeById = useMemo(() => {

    console.log('reload nodeById');
    
    var nodeById = Object.fromEntries(graphData.nodes.map(node => [node.id, node]));

    graphData.nodes.forEach(node => {
        node.childLinks = [];
        node.parentLinks = []
        node.collapsed = false;
    })

    graphData.links.forEach(link => {
        nodeById[link.source].childLinks.push(link);
        nodeById[link.target].parentLinks.push(link);
    })

    function getHeight(node, height) {
        node.height = height;
        node.childLinks.forEach(child => {
            var newNode = (typeof child.target) === 'object' ? child.target : nodeById[child.target];
            getHeight(newNode, height + 1);
        })

    }

    getHeight(nodeById[rootId], 0);

    console.log(nodeById);

    return nodeById;

  }, [graphData]) 

  const cookieTrail = useCallback(() => {
    var trail = []
    var node = selectedNode;
    while (node) {
      trail.push(node.header);
      if (node.parentLinks.length != 0) {
        node = node.parentLinks[0].source 
      }
      else {
        node = null;
      }
    }
    trail.pop();
    // return trail.reverse().join(' > ')
    return trail.reverse()


  }, [selectedNode])

  const resetOnClick = () => {
    console.log('reset clicked')
    setButtonClick(!buttonClick);
  }


  return (
    <Main>
      <InfoBar selectedNode={selectedNode} nodeById={nodeById} cookieTrail={cookieTrail}/>
      <RightBox>
        <TitleBox>
          {/* <p>{cookieTrail()}</p> */}
          
          <Settings color={greyArray[5]}>
            <ResetButton onClick={resetOnClick}>
              <i class="fa fa-repeat" aria-hidden="true"></i>
            </ResetButton>
            <ToggleDagMode setDagMode={setDagMode}/>
          </Settings>
        </TitleBox>
      <ForceMap setSelectedNode={setSelectedNode} selectedNode={selectedNode} graphData={graphData} nodeById={nodeById} dagMode={dagMode} buttonClick={buttonClick}/>
      </RightBox>
    </Main>
  );
}

export default App;

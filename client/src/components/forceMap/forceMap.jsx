import React, {useState, useEffect, useMemo, useCallback, useRef} from 'react';
import './style';
import axios from 'axios';
import {colorArray, greyArray} from '../../color';
import {ForceGraph} from './style';
import {forceCollide} from 'd3-force';

function ForceMap(props) {

    const {dagMode} = props;
    
    const [width, setWidth]   = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);
    const [removedLinks, setRemovedLinks]  = useState([]);

    const updateDimensions = () => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
    }
    const forceEngineRef = useRef();

    useEffect(() => {
        const forceEngine = forceEngineRef.current;
        forceEngine.d3Force('collide', forceCollide(8));

        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);



    }, []);

    var {nodeById, setSelectedNode, selectedNode, buttonClick} = props;

    const [rootId, setRootId] = useState("5ff5c2599b5920837d7b5a65");

   // reloaded during reference change
    const rootNode = useMemo(() => {
        return nodeById[rootId];
    }, [rootId, nodeById])

    const getPrunedTree = useCallback(() => {
        console.log('reloading')
        const visibleLinks = [];
        const visibleNodes = [];

        const currentNode = nodeById[rootId];
        function traverseTree(node, link=null) {
         
            visibleNodes.push(node);
            if (node.collapsed) return;

            node.childLinks.forEach(child => {
                var target = (typeof child.target) === "object" ? child.target : nodeById[child.target];
                if (target.height == 4) return;

                if (!removedLinks.includes(child.index)) {
                    visibleLinks.push(child);
                    traverseTree(target, child);
                }  
            })
            
        }
        if (currentNode != undefined) {traverseTree(currentNode)};

        console.log('toload')
        // setPrunedTree({'nodes': visibleNodes, 'links': visibleLinks});
        return {'nodes': visibleNodes, 'links': visibleLinks};

    }, [nodeById, rootId, removedLinks]);


    const onNodeClick = useCallback((node) => {

        if (node.height != 3) {
        function iterateChildren(node, isCollapse) {
            node.childLinks.forEach((child) => {
                var target = (typeof child.target) === "object" ? child.target : nodeById[child.target]
                target.collapsed = isCollapse;

                if (removedLinks.includes(child.index)) {
                    setRemovedLinks(prev => prev.filter(i => i != child.index));
                }

                iterateChildren(target, isCollapse);
            })
        }

        node.collapsed = !node.collapsed;
        iterateChildren(node, node.collapsed);
        console.log(nodeById[node.id])
        setPrunedTree(getPrunedTree());
    }
    else {
        console.log('clicked')
        setSelectedNode(node);
    }

    }, [])

    const onNodeRightClick = useCallback((node, event) => {
        console.log('NODE IS RIGHT CLICKED')
        if (node.height < 4) {
           setRootId(node.id)
        }
    }, [])

    const onLinkClick = async (link, event) => {
        console.log(`CLICK LINK ${link.index}`)
        if (removedLinks.includes(link.index)) {
            setRemovedLinks(prev => prev.filter(i => i != link.index));
        } else {
            setRemovedLinks(prev => [...prev, link.index]);
        }

    }

    const onLinkHover = (link, event) => {
        link && console.log(` HOVER ${link.index}`)
    }

    useEffect(() => {
        Object.entries(nodeById).forEach(([k,v]) => {
            v.collapsed = false;
        })
        setPrunedTree(getPrunedTree())
    }, [buttonClick])

    

    useEffect(() => {
        setPrunedTree(getPrunedTree())
    }, [removedLinks])

    const [prunedTree, setPrunedTree] = useState(getPrunedTree());


    const nodeCanvas = useCallback((node, ctx, globalScale, isShadowContext) => {
        if (node.x == undefined) return;


        // font 
        ctx.fillStyle = '#4F4F4F';
        ctx.fillText(node.header, node.x, node.y - 8);
        ctx.textAlign = "alphabet";
        ctx.font = '6px Sarabun';

        ctx.beginPath();
        ctx.arc(node.x, node.y, 6, 0, 2 * Math.PI);

        // point 
        if (node.height >= 3) {
            var gradient = ctx.createLinearGradient(node.x - 4, node.y - 4, node.x + 4, node.y + 4);
            node.childLinks.forEach((child, index) => {
                var target = (child.target === 'object')? child.target : nodeById[child.target]
                gradient.addColorStop(index / node.childLinks.length, colorArray[target.level - 1])
            })
            ctx.fillStyle = gradient;
            ctx.fill();
        } else {
            ctx.fillStyle = greyArray[node.height + 1];
            ctx.fill();
        }



    }, [])


    const nodeColor = (node) => {
        if (node.height >= 3) {
            return "#56CCF2"
        }
    }

    return (
        <div>
        <ForceGraph
            graphData={prunedTree}
            onNodeRightClick={onNodeRightClick}
            onNodeClick={onNodeClick}
            // onLinkClick={onLinkClick}
            onLinkHover={onLinkHover}
            nodeColor={nodeColor}
            nodeAutoColorBy={"height"}
            nodeCanvasObject={nodeCanvas}
            nodeCanvasObjectMode={() => 'replace'}
            width={width - 500}
            height={height - 0.20 * height}
            ref={forceEngineRef}
            dagMode={dagMode}
            dagLevelDistance={50}
            />
        <ul>
            {removedLinks.map(links => {
                <li>{links}</li>
            })}
        </ul>
        </div>
    )
}

export default ForceMap;


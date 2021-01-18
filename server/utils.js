const { json } = require("express");
const React = require("react");

const pointToJSONformat = (pointCursor) => {
    var nodes = []
    var links = []
    console.log(pointCursor);
    pointCursor.forEach(point => {
        nodes.push({'id': point._id,
                    'header': point.name,
                    'level': point.level || null,
                })
        point.parent.forEach(parent => {
            links.push({'source': parent, 
                        'target': point._id,
                        'value' : 1})
        })
    })

    

    return {"nodes": nodes, "links": links}
}

exports.pointToJSONformat = pointToJSONformat;
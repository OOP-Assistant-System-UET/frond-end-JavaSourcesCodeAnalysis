import * as React from 'react';
import {Component} from 'react';
// import async from 'react-promise';
// import  Promise from 'react-promise';
import * as go from 'gojs';
import callApi from './../../api/ApiCaller';
import DragZoomingTool from './DragZoomingTool';
import './loader.css';
 const $= go.GraphObject.make;
class UMLDiagram extends Component{
    constructor(props){
        super(props);
        this.renderCanvas = this.renderCanvas.bind(this);
        this.state = {myModel: null, myDiagram: null};
        this.state = { Nodedata:[], Linkdata:[]};
    }


    componentDidMount () {

        let linkPro = new Promise((resolve, reject)=>{
            resolve(callApi('relationships', 'GET', null));
            return(<div className='loader'></div>);
        });

        let nodePro = new Promise((resolve, reject)=>{
            resolve(callApi('class', 'GET', null));
            return(<div className='loader'></div>);
        })

        Promise.all([linkPro, nodePro])
            .then(values=>{
            this.setState({
                Linkdata: values[0].data,
                Nodedata: values[1].data
            });
        }).then(this.renderCanvas)
            .catch(function(err){
            console.log(err);
        });


    }


    renderCanvas(){



        function convertVisibility(v) {
            switch (v) {
                case "public":
                    return "+";
                case "private":
                    return "-";
                case "protected":
                    return "#";
                case "package":
                    return "~";
                default:
                    return v;
            }
        }

        function convertScope(s) {
            switch (s) {
                case "interface":
                    return "<<interface>>";
                default:
                    return "";
            }
        }

        // the item template for properties
        var propertyTemplate =
            $(go.Panel, "Horizontal",
                // property visibility/access
                $(go.TextBlock,
                    {isMultiline: false, editable: false, width: 12},
                    new go.Binding("text", "visibility", convertVisibility)),
                // property name, underlined if scope=="class" to indicate static property
                $(go.TextBlock,
                    {isMultiline: false, editable: true},
                    new go.Binding("text", "name").makeTwoWay(),
                    new go.Binding("isUnderline", "scope", function (s) {
                        return s[0] === 'c'
                    })),

                // property type, if known
                $(go.TextBlock, "",
                    new go.Binding("text", "type", function (t) {
                        return (t ? ": " : "");
                    })),
                $(go.TextBlock,
                    {isMultiline: false, editable: true},
                    new go.Binding("text", "type").makeTwoWay()),
                // property default value, if any
                $(go.TextBlock,
                    {isMultiline: false, editable: false},
                    new go.Binding("text", "default", function (s) {
                        return s ? " = " + s : "";
                    }))
            );

        // the item template for methods
        var methodTemplate =
            $(go.Panel, "Horizontal",
                // method visibility/access
                $(go.TextBlock,
                    {isMultiline: false, editable: false, width: 12},
                    new go.Binding("text", "visibility", convertVisibility)),
                // method name, underlined if scope=="class" to indicate static method
                $(go.TextBlock,
                    {isMultiline: false, editable: true},
                    new go.Binding("text", "name").makeTwoWay(),
                    new go.Binding("isUnderline", "scope", function (s) {
                        return s[0] === 'c'
                    })),
                // method parameters
                $(go.TextBlock, "()",
                    // this does not permit adding/editing/removing of parameters via inplace edits
                    new go.Binding("text", "parameters", function (parr) {
                        var s = "(";
                        for (var i = 0; i < parr.length; i++) {
                            var param = parr[i];
                            if (i > 0) s += ", ";
                            s += param.name + ": " + param.type;
                        }
                        return s + ")";
                    })),
                // method return type, if any
                $(go.TextBlock, "",
                    new go.Binding("text", "type", function (t) {
                        return (t ? ": " : "");
                    })),
                $(go.TextBlock,
                    {isMultiline: false, editable: true},
                    new go.Binding("text", "type").makeTwoWay())
            );


        function convertIsTreeLink(r) {
            return r === 'extends';
        }

        function convertFromArrow(r) {
            switch (r) {
                case "extends":
                    return "";
                default:
                    return "";
            }
        }

        function convertRelationship(r) {
            switch (r) {
                case "implements":
                    return [4, 2];
                default:
                    return [0, 0];
            }
            // return r === 'implements';
        }

        function convertToArrow(r) {
            switch (r) {
                case "extends":
                    return "Triangle";
                case "implements":
                    return "Triangle";
                default:
                    return "";
            }
        }
        let diagram = $(go.Diagram, this.refs.goJsDiv,
            {
                initialContentAlignment: go.Spot.Center,
                "undoManager.isEnabled": true,
                layout: $(go.TreeLayout,
                    { // this only lays out in trees nodes connected by "generalization" links
                        angle: 90,
                        path: go.TreeLayout.PathSource,  // links go from child to parent
                        setsPortSpot: false,  // keep Spot.AllSides for link connection spot
                        setsChildPortSpot: false,  // keep Spot.AllSides
                        // nodes not connected by "generalization" links are laid out horizontally
                        arrangement: go.TreeLayout.ArrangementHorizontal
                    })
            });
        diagram.nodeTemplate =
            $(go.Node, "Auto",
                {
                    locationSpot: go.Spot.Center,
                    fromSpot: go.Spot.AllSides,
                    toSpot: go.Spot.AllSides
                },
                $(go.Shape, {fill: "lightyellow"}),
                $(go.Panel, "Table",
                    {defaultRowSeparatorStroke: "black"},
                    // header
                    $(go.TextBlock,
                        {
                            row: 1, columnSpan: 2, margin: 3, alignment: go.Spot.Center,
                            font: "bold 12pt sans-serif",
                            isMultiline: false, editable: true
                        },
                        new go.Binding("text", "name").makeTwoWay()),

                    $(go.TextBlock,
                        {
                            row: 0, columnSpan: 2, margin: 3, alignment: go.Spot.Center,
                            font: "bold 10pt serif",
                            isMultiline: false, editable: true
                        },
                        new go.Binding("text", "scope", convertScope)),
                    // properties
                    $(go.TextBlock, "Properties",
                        {row: 2, font: "italic 10pt sans-serif"},
                        new go.Binding("visible", "visible", function (v) {
                            return !v;
                        }).ofObject("PROPERTIES")),
                    $(go.Panel, "Vertical", {name: "PROPERTIES"},
                        new go.Binding("itemArray", "properties"),
                        {
                            row: 2, margin: 3, stretch: go.GraphObject.Fill,
                            defaultAlignment: go.Spot.Left, background: "lightyellow",
                            itemTemplate: propertyTemplate
                        }
                    ),
                    $("PanelExpanderButton", "PROPERTIES",
                        {row: 2, column: 1, alignment: go.Spot.TopRight, visible: false},
                        new go.Binding("visible", "properties", function (arr) {
                            return arr.length > 0;
                        })),
                    // methods
                    $(go.TextBlock, "Methods",
                        {row: 3, font: "italic 10pt sans-serif"},
                        new go.Binding("visible", "visible", function (v) {
                            return !v;
                        }).ofObject("METHODS")),
                    $(go.Panel, "Vertical", {name: "METHODS"},
                        new go.Binding("itemArray", "methods"),
                        {
                            row: 3, margin: 3, stretch: go.GraphObject.Fill,
                            defaultAlignment: go.Spot.Left, background: "lightyellow",
                            itemTemplate: methodTemplate
                        }
                    ),
                    $("PanelExpanderButton", "METHODS",
                        {row: 3, column: 1, alignment: go.Spot.TopRight, visible: false},
                        new go.Binding("visible", "methods", function (arr) {
                            return arr.length > 0;
                        }))
                )
            );

        diagram.linkTemplate =
            $(go.Link,
                {routing: go.Link.Orthogonal},
                new go.Binding("isLayoutPositioned", "relationship", convertIsTreeLink),
                $(go.Shape, {strokeWidth: 1},
                    new go.Binding("strokeDashArray", "relationship", convertRelationship)),
                                $(go.Shape, {scale: 1.3, fill: "white"},
                    new go.Binding("fromArrow", "relationship", convertFromArrow)),
                $(go.Shape, {scale: 1.3, fill: "white"},
                    new go.Binding("toArrow", "relationship", convertToArrow))
            );
        var Nodedata = this.state.Nodedata;
        var Linkdata = this.state.Linkdata;
        console.log(Nodedata);
        console.log(Linkdata);
        diagram.currentTool = new DragZoomingTool ();
        diagram.toolManager.mouseMoveTools.insertAt(2, new DragZoomingTool());

        this.setState({myModel: diagram.model, myDiagram: diagram},
            () => {
                diagram.model = $(go.GraphLinksModel,
                    {
                        copiesArrays: true,
                        copiesArrayObjects: true,
                        nodeDataArray: Nodedata,
                        linkDataArray: Linkdata
                    });
                this.setState({myModel: diagram.model, myDiagram: diagram});
            }
        );

    }



    render () {

        return (
                <div ref="goJsDiv" style={{
                    'marginTop': '100px',
                    'width': '90%',
                    'height': '500px',
                    'backgroundColor': '#DAE4E4'
                }}></div>
            );


    }
}
export default UMLDiagram;
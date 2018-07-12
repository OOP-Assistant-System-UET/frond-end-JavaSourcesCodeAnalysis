
import * as go from 'gojs';

export default function DragZoomingTool() {
    go.Tool.call(this);
    // noinspection JSAnnotator
    this.name = "DragZooming";

    var b = new go.Part();
    b.layerName = "Tool";
    b.selectable = false;
    var r = new go.Shape();
    r.name = "SHAPE";
    r.figure = "Rectangle";
    r.fill = null;
    r.stroke = "magenta";
    r.position = new go.Point(0, 0);
    b.add(r);
    /** @type {Part} */
    this._box = b;

    /** @type {number} */
    this._delay = 175;

    /** @type {Diagram} */
    this._zoomedDiagram = null;
}

go.Diagram.inherit(DragZoomingTool, go.Tool);


DragZoomingTool.prototype.canStart = function() {
    if (!this.isEnabled) return false;
    var diagram = this.diagram;
    if (diagram === null) return false;
    var e = diagram.lastInput;
    // require left button & that it has moved far enough away from the mouse down point, so it isn't a click
    if (!e.left) return false;
    // don't include the following checks when this tool is running modally
    if (diagram.currentTool !== this) {
        if (!this.isBeyondDragSize()) return false;
        // must wait for "delay" milliseconds before that tool can run
        if (e.timestamp - diagram.firstInput.timestamp < this.delay) return false;
    }
    return true;
};


DragZoomingTool.prototype.doActivate = function() {
    var diagram = this.diagram;
    if (diagram === null) return;
    this.isActive = true;
    diagram.isMouseCaptured = true;
    diagram.skipsUndoManager = true;
    diagram.add(this.box);
    this.doMouseMove();
};


DragZoomingTool.prototype.doDeactivate = function() {
    var diagram = this.diagram;
    if (diagram === null) return;
    diagram.remove(this.box);
    diagram.skipsUndoManager = false;
    diagram.isMouseCaptured = false;
    this.isActive = false;
};


DragZoomingTool.prototype.doMouseMove = function() {
    var diagram = this.diagram;
    if (diagram === null) return;
    if (this.isActive && this.box !== null) {
        var r = this.computeBoxBounds();
        var shape = this.box.findObject("SHAPE");
        if (shape === null) shape = this.box.findMainElement();
        shape.desiredSize = r.size;
        this.box.position = r.position;
    }
};


DragZoomingTool.prototype.doMouseUp = function() {
    if (this.isActive) {
        var diagram = this.diagram;
        diagram.remove(this.box);
        try {
            diagram.currentCursor = "wait";
            this.zoomToRect(this.computeBoxBounds());
        } finally {
            diagram.currentCursor = "";
        }
    }
    this.stopTool();
};


DragZoomingTool.prototype.computeBoxBounds = function() {
    var diagram = this.diagram;
    if (diagram === null) return new go.Rect(0, 0, 0, 0);
    var start = diagram.firstInput.documentPoint;
    var latest = diagram.lastInput.documentPoint;
    var adx = latest.x - start.x;
    var ady = latest.y - start.y;

    var observed = this.zoomedDiagram;
    if (observed === null) observed = this.diagram;
    if (observed === null) {
        return new go.Rect(start, latest);
    }
    var vrect = observed.viewportBounds;
    if (vrect.height === 0 || ady === 0) {
        return new go.Rect(start, latest);
    }

    var vratio = vrect.width / vrect.height;
    var lx;
    var ly;
    if (Math.abs(adx / ady) < vratio) {
        lx = start.x + adx;
        ly = start.y + Math.ceil(Math.abs(adx) / vratio) * (ady < 0 ? -1 : 1);
    } else {
        lx = start.x + Math.ceil(Math.abs(ady) * vratio) * (adx < 0 ? -1 : 1);
        ly = start.y + ady;
    }
    return new go.Rect(start, new go.Point(lx, ly));
};


DragZoomingTool.prototype.zoomToRect = function(r) {
    if (r.width < 0.1) return;
    var observed = this.zoomedDiagram;
    if (observed === null) observed = this.diagram;
    if (observed === null) return;

    // zoom out when using the Shift modifier
    if (this.diagram.lastInput.shift) {
        observed.scale = Math.max(observed.scale * r.width / observed.viewportBounds.width, observed.minScale);
        observed.centerRect(r);
    } else {
        // do scale first, so the Diagram's position normalization isn't constrained unduly when increasing scale
        observed.scale = Math.min(observed.viewportBounds.width * observed.scale / r.width, observed.maxScale);
        observed.position = new go.Point(r.x, r.y);
    }
};



Object.defineProperty(DragZoomingTool.prototype, "box", {
    get: function() { return this._box; },
    set: function(val) { this._box = val; }
});


Object.defineProperty(DragZoomingTool.prototype, "delay", {
    get: function() { return this._delay; },
    set: function(val) { this._delay = val; }
});


Object.defineProperty(DragZoomingTool.prototype, "zoomedDiagram", {
    get: function() { return this._zoomedDiagram; },
    set: function(val) { this._zoomedDiagram = val; }
});
// nodes.js

class BaseNode {
  constructor(id, type, data, position) {
    this.id = id;
    this.type = type;
    this.data = data;
    this.position = position;
  }

  getInfo() {
    return `ID: ${this.id}, Type: ${this.type}, Position: (${this.position.x}, ${this.position.y})`;
  }
}

class ViewNode extends BaseNode {
  constructor(id, data, position) {
    super(id, 'view', data, position);
    this.sourcePosition='bottom'
    this.targetPosition= 'top'
  }
}

class LogicalNode extends BaseNode {
  constructor(id, data, position) {
    super(id, 'logical', data, position);
  }
}

class AndSwitch extends LogicalNode {
  constructor(id, data, position) {
    super(id, data, position);
    this.ltype = 'andSwitch';
  }
}

class AndEnd extends LogicalNode {
  constructor(id, data, position) {
    super(id, data, position);
    this.ltype = 'andEnd';
  }
}

class OrSwitch extends LogicalNode {
  constructor(id, data, position) {
    super(id, data, position);
    this.ltype = 'orSwitch';
  }
}

// Exporting classes
module.exports = {
  BaseNode,
  ViewNode,
  LogicalNode,
  AndSwitch,
  AndEnd,
  OrSwitch
};

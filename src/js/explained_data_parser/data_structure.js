export class NodeData {
    /**
     * @param {String} nodeId 
     * @param {String} nodeDisplayName 
     * @param {String} type 
     * @param {Object} additionalData 
     */
    constructor(nodeId, nodeDisplayName, type, additionalData) {
        this.nodeId = nodeId;
        this.nodeDisplayName = nodeDisplayName;
        this.type = type;
        this.additionalData = additionalData;
    }
}

export class Node {
    /**
     * @param {NodeData} data 
     * @param {*} parent 
     */
    constructor(data, parent = null) {
        this.data = data;
        // this.parent = parent;
        this.left = null;
        this.right = null;
    }
}

export class BinaryTree {
    /**
     * 
     */
    constructor() {
        this.root = null;
    }

    /**
     * @param {Node} root 
     */
    setRoot(rootData) {
        this.root = new Node(rootData);
        return this.root;
    }

    /**
     * 
     * @param {Any} data 
     * @param {Object} node 
     * @param {String} direction 
     */
    insert(data, node, direction) {
        const newNode = new Node(data, node);

        if (direction === 'left') {
            node.left = newNode;
        } else if (direction === 'right') {
            node.right = newNode;
        }

        return newNode;
    }
}

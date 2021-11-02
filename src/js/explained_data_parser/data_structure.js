export class NodeData {
    /**
     * @param {String} id 
     * @param {String} displayName 
     * @param {String} type 
     * @param {Object} additionalData 
     */
    constructor(id, displayName, type, additionalData) {
        this.id = id;
        this.displayName = displayName;
        this.type = type;
        this.additionalData = additionalData;
    }
}

export class Node {
    /**
     * @param {NodeData} data 
     * @param {Node} parent 
     */
    constructor(data, parent = null) {
        this.data = data;
        this.parentId = parent ? parent.data.id : null;
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
        this.nodesStack = [];
        this.nodesMap = {};
    }

    /**
     * @param {Node} root 
     */
    setRoot(rootData) {
        this.root = new Node(rootData);
        this.setMap(this.root);
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
        this.setMap(newNode);

        if (direction === 'left') {
            node.left = newNode;
        } else if (direction === 'right') {
            node.right = newNode;
        }

        return newNode;
    }

    /**
     * @param {Node} node 
     */
    setMap(node) {
        this.nodesMap[node.data.id] = node;
    }

    /**
     * @returns {Array[Node]}
     */
    getNodes() {
        return Object.values(this.nodesMap);
    }

    /**
     * Get stack for traversing
     * @returns {Node?}
     */
    getNodeById(id) {
        return this.nodesMap[id];
    }
}

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
     * @param {*} parent 
     */
    constructor(data, parent = null) {
        this.data = data;
        this.parent = parent ? parent.id : null;
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
    }

    /**
     * @param {Node} root 
     */
    setRoot(rootData) {
        this.root = new Node(rootData);
        this.nodesStack.push(this.root);
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
        this.nodesStack.push(newNode);

        if (direction === 'left') {
            node.left = newNode;
        } else if (direction === 'right') {
            node.right = newNode;
        }

        return newNode;
    }

    /**
     * Get stack for traversing
     * @returns {Array[Node]}
     */
    getNodesStack() {
        return this.nodesStack;
    }
}

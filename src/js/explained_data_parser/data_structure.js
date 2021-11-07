export class NodeData {
    /**
     * @param {String} id 
     * @param {String} displayName 
     * @param {String} type 
     * @param {Object} additionalData 
     */
    constructor(id, displayName, type, additionalData = {}) {
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

    /**
     * @param {Node} leftNode 
     */
    setLeft(leftNode) {
        this.left = leftNode;
    }

    /**
     * @param {Node} rightNode 
     */
    setRight(rightNode) {
        this.right = rightNode;
    }
}

export class MultibranchNode {
    /**
     * @param {NodeData} data 
     * @param {Node} parent 
     * @param {BinaryTree[]} children
     */
     constructor(data, children, parent = null) {
        this.data = data;
        this.parentId = parent ? parent.data.id : null;
        this.children = children;
    }
}

export class BinaryTree {
    /**
     * @param {NodeData} materializedData 
     */
    constructor(materializedData) {
        this.root = null;
        this.nodesMap = {};
        this.materializedData = materializedData;
    }

    /**
     * @param {NodeData} rootData 
     */
    setRoot(rootData) {
        this.root = new Node(rootData);
        this.setMap(this.root);
        return this.root;
    }

    /**
     * @param {NodeData} data 
     * @param {Node} parent 
     * @param {String} direction 
     */
    insert(data, parent, direction) {
        const newNode = new Node(data, parent);
        this.setMap(newNode);

        if (direction === 'left') {
            parent.setLeft(newNode);
        } else if (direction === 'right') {
            parent.setRight(newNode);
        }

        return newNode;
    }

    /**
     * @param {BinaryTree} data 
     * @param {Node} parent 
     * @param {String} direction 
     */
    insertTree(tree, parent, direction) {
        this.setMap(tree);

        if (direction === 'left') {
            parent.setLeft(tree);
        } else if (direction === 'right') {
            parent.setRight(tree);
        }

        return tree;
    }

    /**
     * @param {Any} data 
     * @param {Node} parent 
     * @param {String} direction 
     */
     insertMultibranchNode(data, children, parent) {
        const newNode = new MultibranchNode(data, children, parent);
        this.setMap(newNode);

        return newNode;
    }

    /**
     * @param {Node} node 
     */
    setMap(node) {
        if (node instanceof BinaryTree && node.materializedData) {
            this.nodesMap[node.materializedData.id] = node;
        } else {
            this.nodesMap[node.data.id] = node;
        }
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

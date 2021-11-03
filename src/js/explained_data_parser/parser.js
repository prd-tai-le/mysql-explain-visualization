import { NodeData, BinaryTree } from './data_structure';
import MermaidUtils from '../utils/mermaid';

export default class ExplainedDataParser {
    /**
     * 
     * @param {Object} data 
     */
    constructor(data) {
        this.binaryTree = new BinaryTree();
        this.data = data;
        this.currentDataLevel = null;
        this.counters = {
            ordering: 0,
            nestedLoop: 0,
        };
        this.build();
    }

    build() {
        const root = this._parseQueryBlockNode();
        let latestNode = this._parseOrderingNode(root, 'left') || root;
        latestNode = this._parseNestedLoopNodes(latestNode) || latestNode;

        return latestNode;
    }

    _parseQueryBlockNode() {
        const { query_block: queryBlockData } = this.data;
        const { id, name } = this._getQueryBlockIdentifier(queryBlockData.select_id);
        const nodeData = new NodeData(id, name, 'query_block', {
            cost_info: queryBlockData.cost_info,
        });
        const rootNode = this.binaryTree.setRoot(nodeData);
        this.currentDataLevel = queryBlockData;

        return rootNode;
    }

    _getQueryBlockIdentifier(selectId) {
        return {
            id: `query_block#${selectId}`,
            name: `Query Block #${selectId}`,
        };
    }

    /**
     * @param {Object} data 
     */
    _getOrderingIdentifier() {
        return {
            id: `ordering#${++this.counters.ordering}`,
            name: `Ordering`,
        };
    }

    _getNestedLoopNodeIdentifier() {
        return {
            id: `nested_loop#${++this.counters.ordering}`,
            name: `Nested Loop`,
        };
    }

    /**
     * 
     * @param {Object} orderingOperation 
     * @param {Node} node
     */
    _parseOrderingNode(parentNode, insertDirection) {
        const { ordering_operation: orderingOperation } = this.currentDataLevel;

        if (orderingOperation) {
            const { id, name } = this._getOrderingIdentifier();
            const nodeData = new NodeData(id, name, 'ordering', {
                using_filesort: orderingOperation.using_filesort,
            });
            const currentNode = this.binaryTree.insert(nodeData, parentNode, insertDirection);
            this.currentDataLevel = orderingOperation;
            
            return currentNode;
        }
        return null;
    }

    _parseNestedLoopNodes(parentNode) {
        const { nested_loop: nestedLoop } = this.currentDataLevel;

        if (!nestedLoop) {
            return null;
        }

        nestedLoop.reverse();
        nestedLoop.forEach((query, index) => {
            const tableNodeData = this.constructor._parseTableData(query);
            const { id, name } = this._getNestedLoopNodeIdentifier();
            const nestedLoopNodeData = new NodeData(id, name, 'nested_loop', {
                query_cost: tableNodeData.query_cost,
            });
            
            // last table connects with the previous nested loop diamond
            if (index != nestedLoop.length - 1) {
                parentNode = this.binaryTree.insert(nestedLoopNodeData, parentNode, 'left');
            }
            this.binaryTree.insert(tableNodeData, parentNode, 'right');
        });

        return parentNode;
    }

    /**
     * Because this method is used dynamically, we shouldn't insert anything to the tree
     * @param {Object} data
     */
    static _parseTableData(data) {
        const { table: tableData } = data;
        const { table_name: id, table_name: name } = tableData;
        const nodeData = new NodeData(id, name, 'table', {
            table_name: tableData.table_name,
            access_type: tableData.access_type,
            possible_keys: tableData.possible_keys,
            key: tableData.key,
            rows_examined_per_scan: tableData.rows_examined_per_scan,
            rows_produced_per_join: tableData.rows_produced_per_join,
            filtered: tableData.filtered,
            using_index: tableData.using_index,
            cost_info: tableData.cost_info,
        });
        ExplainedDataParser._parseAttachedSubqueries();
        ExplainedDataParser._parseMaterializedFromSubquery();
        // check attached_subqueries
        // check materialized_from_subquery
        return nodeData;
    }

    static _parseAttachedSubqueries() {

    }

    static _parseMaterializedFromSubquery() {

    }

    /**
     * @returns {String}
     */
    buildMermaidContent() {
        let content = '';
        let eventContent = '';
        const nodes = this.binaryTree.getNodes();
        nodes.reverse();

        for (let i = 0; i < nodes.length; i += 1) {
            const currentNode = nodes[i];
            if (!currentNode.parentId) continue;

            const previousNode = this.binaryTree.getNodeById(nodes[i].parentId);
            const previousNodeBox = MermaidUtils.getBoxContent(previousNode.data);
            const currentNodeBox = MermaidUtils.getBoxContent(currentNode.data);
            content += `${currentNodeBox}--->${previousNodeBox};\n`;
            
            const nodeEvent = `click ${previousNode.data.id} call listenNodeClickEvent("${previousNode.data.id}");\n`;
            const nodeEvent2 = `click ${currentNode.data.id} call listenNodeClickEvent("${currentNode.data.id}");\n`;
            if (eventContent.indexOf(nodeEvent) === -1) {
                eventContent += nodeEvent;
            }
            if (eventContent.indexOf(nodeEvent2) === -1) {
                eventContent += nodeEvent2;
            }
        }

        return `${content}\n${eventContent}`;
    }
}

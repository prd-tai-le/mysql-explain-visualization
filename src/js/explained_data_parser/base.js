import { NodeData, BinaryTree } from './data_structure';

export default class BaseExplainedDataParser {
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
        return this._parseQueryBlockNode();
    }

    _parseQueryBlockNode() {
        const { query_block: queryBlockData } = this.data;
        const { id, name } = this._getQueryBlockIdentifier();
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
            id: `nestedLoop#${++this.counters.ordering}`,
            name: `Nested Loop`,
        };
    }

    _parseQueryBlockNode() {

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
        nestedLoop.forEach((query) => {
            const { id, name } = this._getNestedLoopNodeIdentifier();
            const nestedLoopNodeData = new NodeData(id, name, 'nested_loop', {});
            parentNode = this.binaryTree.insert(nestedLoopNodeData, parentNode, 'left');

            const tableNodeData = this.constructor._parseTableData(query);
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
        BaseExplainedDataParser._parseAttachedSubqueries();
        BaseExplainedDataParser._parseMaterializedFromSubquery();
        // check attached_subqueries
        // check materialized_from_subquery
        return nodeData;
    }

    static _parseAttachedSubqueries() {

    }

    static _parseMaterializedFromSubquery() {

    }

    buildMermaidContent() {
        
        console.log(this.binaryTree);
    }
}

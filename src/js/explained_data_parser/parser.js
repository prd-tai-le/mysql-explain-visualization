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

    /**
     * @returns {Node}
     */
    _parseQueryBlockNode() {
        const { query_block: queryBlockData } = this.data;
        const { id, name } = this._getQueryBlockIdentifier(queryBlockData.select_id);
        const nodeData = new NodeData(id, name, 'query_block', {
            select_id: queryBlockData.select_id,
            cost_info: queryBlockData.cost_info,
        });
        const rootNode = this.binaryTree.setRoot(nodeData);
        this.currentDataLevel = queryBlockData;

        return rootNode;
    }

    /**
     * @param {String} selectId 
     * @returns 
     */
    _getQueryBlockIdentifier(selectId) {
        return {
            id: `query_block#${selectId}`,
            name: `Query Block #${selectId}`,
        };
    }

    /**
     * @param {NodeData} nodeData 
     * @return {String}
     */
    _getQueryBlockContent(nodeData) {
        return `
            <h6 class="node__title">Query Block</h6>
            <p>- Select ID: ${nodeData.additionalData.select_id}</p>
            <p>- Query cost: ${nodeData.additionalData.cost_info.query_cost}</p>
        `;
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

    /**
     * @param {Object} data 
     */
    _getOrderingIdentifier() {
        return {
            id: `ordering#${++this.counters.ordering}`,
            name: `Ordering`,
        };
    }

    /**
     * @param {NodeData} nodeData 
     * @return {String}
     */
    _getOrderingContent(nodeData) {
        return `
            <h6 class="node__title">Ordering Operation</h6>
            <p>Using Filesort: ${nodeData.additionalData.using_filesort ? 'True' : 'False'}</p>
        `;
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
                cost_info: tableNodeData.additionalData.cost_info,
                rows_produced_per_join: tableNodeData.additionalData.rows_produced_per_join,
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
     * @param {NodeData} nodeData 
     * @return {String}
     */
    _getNestedLoopContent(nodeData) {
        return `
            <h6 class="node__title">Nested Loop</h6>
            <p>Prefix cost: ${nodeData.additionalData.cost_info.prefix_cost}</p>
        `;
    }

    _getNestedLoopNodeIdentifier() {
        return {
            id: `nested_loop#${++this.counters.ordering}`,
            name: `Nested Loop`,
        };
    }

    /**
     * Because this method is used dynamically, we shouldn't insert anything to the tree
     * @param {Object} data
     */
    static _parseTableData(data) {
        const { table: tableData } = data;
        const { table_name: id, table_name: name } = tableData;
        const nodeData = new NodeData(id, name, 'table', { ...tableData });
        ExplainedDataParser._parseAttachedSubqueries();
        ExplainedDataParser._parseMaterializedFromSubquery();
        // check attached_subqueries
        // check materialized_from_subquery
        return nodeData;
    }

    /**
     * @param {NodeData} nodeData 
     * @return {String}
     */
    _getTableContent(nodeData) {
        const { additionalData, displayName } = nodeData;

        return `
            <h6 class="node__title">${displayName}</h6>
            <p>- Access Type: ${additionalData.access_type}</p>
            <p>- Used Columns: ${additionalData.used_columns.join(', ')}</p>
            
            <br>
            <h6 class="node__title">Key/Index: ${additionalData.key}</h6>
            ${additionalData.ref ? `<p>- Ref: ${additionalData.ref.join(', ')}</p>` : ''}
            ${additionalData.used_key_parts ? `<p>- Used Key Parts: ${additionalData.used_key_parts.join(', ')}</p>` : ''}
            ${additionalData.possible_keys ? `<p>- Possible Keys: ${additionalData.possible_keys.join(', ')}</p>` : ''}

            <br>
            <p>- Rows Examined Per Scan: ${additionalData.rows_examined_per_scan}</p>
            <p>- Rows Produced Per Scan: ${additionalData.rows_produced_per_join}</p>

            <br>
            <h6 class="node__title">Cost Info</h6>
            <p>- Read: ${additionalData.cost_info.read_cost}</p>
            <p>- Eval: ${additionalData.cost_info.eval_cost}</p>
        `;
    }

    static _parseAttachedSubqueries() {

    }

    static _parseMaterializedFromSubquery() {

    }

    /**
     * @param {string} id 
     * @returns 
     */
    getExplainContentById(id) {
        const nodeData = this.binaryTree.getNodeById(id).data;
        let content;

        switch (nodeData.type) {
            case 'nested_loop':
                content = this._getNestedLoopContent(nodeData);
                break;
            case 'ordering':
                content = this._getOrderingContent(nodeData);
                break;
            case 'query_block':
                content = this._getQueryBlockContent(nodeData);
                break;
            case 'table':
                content = this._getTableContent(nodeData);
                break;
        }
        content = content ? content.trim() : null;
        console.log(nodeData, content ? content.trim() : null);

        return content;
    }

    /**
     * @returns {String}
     */
    buildMermaidContent() {
        let content = '';
        const nodes = this.binaryTree.getNodes();
        nodes.reverse();

        for (let i = 0; i < nodes.length; i += 1) {
            const currentNode = nodes[i];
            if (!currentNode.parentId) continue;

            const previousNode = this.binaryTree.getNodeById(nodes[i].parentId);
            const previousNodeBox = MermaidUtils.getBoxContent(previousNode.data);
            const currentNodeBox = MermaidUtils.getBoxContent(currentNode.data);
            content += `${currentNodeBox}-->${previousNodeBox};\n`;
        }

        return `${content}`;
    }
}

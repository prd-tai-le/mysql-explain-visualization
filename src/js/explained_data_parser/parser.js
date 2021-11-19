import { NodeData, BinaryTree, MultibranchNode } from './data_structure';
import MermaidUtils from '../utils/mermaid';
import CommonUtils from '../utils/common';
import PopupContentUtils from '../utils/popup-content';

export default class ExplainedDataParser {
  /**
   * @param {Object} data: JSON data
   * @param {String} idPrefix: Prefix string
   * @param {NodeData} materializedData: Data from materializing
   */
  constructor(data, idPrefix = null, materializedData = null) {
    this.binaryTree = new BinaryTree(materializedData);
    this.data = data;
    this.currentDataLevel = null;
    this.idPrefix = idPrefix ? `${idPrefix}#` : '';
  }

  build() {
    const root = this._parseQueryBlockNode();
    let latestNode = this._parseOrderingNode(root, 'left') || root;
    latestNode = this._parseNestedLoopNodes(latestNode) || latestNode;
    latestNode = this._parseTableNode(latestNode, 'left') || latestNode;
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
      id: `${this.idPrefix}query_block-${CommonUtils.randomString()}`,
      name: `Query Block #${selectId}`,
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

  /**
   * @param {Object} data
   */
  _getOrderingIdentifier() {
    return {
      id: `${this.idPrefix}ordering-${CommonUtils.randomString()}`,
      name: `Ordering`,
    };
  }

  _parseNestedLoopNodes(parentNode) {
    const { nested_loop: nestedLoop } = this.currentDataLevel;

    if (!nestedLoop) {
      return null;
    }
    nestedLoop.reverse();
    nestedLoop.forEach((query, index) => {
      const tableNodeData = this._parseTableData(query);
      const { id, name } = this._getNestedLoopNodeIdentifier();
      const nestedLoopNodeData = new NodeData(id, name, 'nested_loop', {
        cost_info: tableNodeData.additionalData.cost_info,
        rows_produced_per_join: tableNodeData.additionalData.rows_produced_per_join,
      });
      // last table connects with the previous nested loop diamond
      if (index !== nestedLoop.length - 1) {
        parentNode = this.binaryTree.insert(nestedLoopNodeData, parentNode, 'left');
      }
      const tableNode = this.binaryTree.insert(tableNodeData, parentNode, 'right');
      this._parseAttachedSubqueriesNodes(tableNode, query.table);
      this._parseMaterializedFromSubquery(tableNode, query.table);
    });

    return parentNode;
  }

  _getNestedLoopNodeIdentifier() {
    return {
      id: `${this.idPrefix}nested_loop-${CommonUtils.randomString()}`,
      name: `Nested Loop`,
    };
  }

  /**
   * Because this method is used dynamically, we shouldn't insert anything to the tree
   * @param {NodeData} data
   */
  _parseTableData(data) {
    const { table: tableData } = data;
    const { id, name } = this._getTableIdentifier(tableData.table_name);
    const nodeData = new NodeData(id, name, 'table', { ...tableData });
    // ExplainedDataParser._parseMaterializedFromSubquery();
    // check materialized_from_subquery
    return nodeData;
  }

  /**
   * @param {Node} parentNode
   * @param {String} insertDirection
   * @returns {Node?}
   */
  _parseTableNode(parentNode, insertDirection) {
    const { table } = this.currentDataLevel;

    if (table) {
      const nodeData = this._parseTableData(this.currentDataLevel);
      const currentNode = this.binaryTree.insert(nodeData, parentNode, insertDirection);
      this.currentDataLevel = table;
      this._parseAttachedSubqueriesNodes(currentNode, table);
      this._parseMaterializedFromSubquery(currentNode, table);

      return currentNode;
    }
    return null;
  }

  /**
   * @param {String} tableName
   * @returns {Object}
   */
  _getTableIdentifier(tableName) {
    return {
      id: `${this.idPrefix}${tableName}-${CommonUtils.randomString()}`,
      name: tableName,
    };
  }

  /**
   *
   * @param {Node|MultibranchNode} parentNode
   * @param {MultibranchNode?} tableData
   * @returns
   */
  _parseAttachedSubqueriesNodes(parentNode, tableData) {
    const { attached_subqueries: attachedSubqueries } = tableData;

    if (attachedSubqueries) {
      const idPrefix = `${this.idPrefix}${parentNode.data.id}#subqueries`;
      const multibranchNodeData = new NodeData(idPrefix, 'Attached Subqueries', 'attached_subqueries');
      const trees = attachedSubqueries.map((subqueryData, index) => {
        const dataParser = new ExplainedDataParser(subqueryData, `${idPrefix}#${index}`);
        dataParser.build();

        return dataParser.binaryTree;
      });
      this.binaryTree.insertMultibranchNode(multibranchNodeData, trees, parentNode);

      return multibranchNodeData;
    }
    return null;
  }

  _parseMaterializedFromSubquery(parentNode, tableData) {
    const { materialized_from_subquery: materializedFromSubquery } = tableData;

    if (materializedFromSubquery) {
      const idPrefix = `${this.idPrefix}${parentNode.data.id}#materialized_from_subquery`;
      const nodeData = new NodeData(idPrefix, `${parentNode.data.displayName} (Materialized)`, 'materialized_from_subquery');

      const dataParser = new ExplainedDataParser(materializedFromSubquery, idPrefix, nodeData);
      dataParser.build();
      this.binaryTree.insertTree(dataParser.binaryTree, parentNode, 'left');

      return dataParser.binaryTree;
    }
    return null;
  }

  /**
   * @param {string} id
   * @returns
   */
  getExplainContentById(id) {
    let node;
    let { nodesMap } = this.binaryTree;
    const segments = id.split('#');
    const newSegments = [];

    segments.forEach((segment) => {
      if (segment === 'subqueries') { // put materialized... here
        newSegments[newSegments.length - 1] += `#${segment}`;
      } else {
        newSegments.push(segment);
      }
    });

    newSegments.forEach((segment, index) => {
      if (index === newSegments.length - 1) {
        node = nodesMap[id];
        return;
      }
      if (!nodesMap[segment]) {
        segment = parseInt(segment, 10);
        nodesMap = node.children[segment].nodesMap;
      } else {
        node = nodesMap[segment];
      }
    });
    let content;

    switch (node.data.type) {
      case 'nested_loop':
        content = PopupContentUtils.getNestedLoopContent(node.data);
        break;
      case 'ordering':
        content = PopupContentUtils.getOrderingContent(node.data);
        break;
      case 'query_block':
        content = PopupContentUtils.getQueryBlockContent(node.data);
        break;
      case 'table':
        content = PopupContentUtils.getTableContent(node.data);
        break;
      default:
    }
    content = content ? content.trim() : null;

    return content;
  }

  /**
   * @returns {String}
   */
  buildMermaidContent(binaryTree = null) {
    binaryTree = binaryTree || this.binaryTree;

    let content = '';
    let style = '';
    const nodes = binaryTree.getNodes();
    nodes.reverse();

    for (let i = 0; i < nodes.length; i += 1) {
      const currentNode = nodes[i];
      if (!currentNode.parentId) {
        continue;
      }
      if (currentNode instanceof BinaryTree) {
        const previousNode = binaryTree.getNodeById(nodes[i].parentId);
        const [currentNodeBox,] = MermaidUtils.getBoxContent(previousNode.data);
        // console.log(123123);
        const content2 = this.buildMermaidContent(currentNode);
        const [rootSubTree,] = MermaidUtils.getBoxContent(currentNode.getNodes()[0].data);
        content += `\n${content2}`;
        content += `${rootSubTree}-->${currentNodeBox}\n`;
      } else {
        const previousNode = binaryTree.getNodeById(nodes[i].parentId);
        const [prevNodeBox,] = MermaidUtils.getBoxContent(previousNode.data);
        const [currentNodeBox,] = MermaidUtils.getBoxContent(currentNode.data);

        content += `${currentNodeBox}-->${prevNodeBox}\n`;
        // style += prevNodeStyle ? `${prevNodeStyle}\n` : '';
        // style += currentNodeStyle ? `${currentNodeStyle}\n` : '';

        if (currentNode instanceof MultibranchNode) {
          currentNode.children.forEach((subTree) => {
            const content2 = this.buildMermaidContent(subTree);
            const [rootSubTree, _] = MermaidUtils.getBoxContent(subTree.getNodes()[0].data);

            content += `\n${content2}`;
            content += `${rootSubTree}-->${currentNodeBox}\n`;
          });
        }
      }
    }
    return content;
    // return `${content}\n\n${style}`;
  }
}

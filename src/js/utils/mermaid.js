import { NodeData } from '../explained_data_parser/data_structure';
import CommonUtils from './common';

export default class MermaidUtils {
  /**
   * @param {NodeData} nodeData
   * @returns
   */
  static getBoxContent({ id, type, displayName, additionalData }) {
    let content;
    let style;

    switch (type) {
      case 'table':
        content = `${id}["<b>${displayName}</b><br>${MermaidUtils._getPrefixCostContent(additionalData, 'read_cost')}<br>${MermaidUtils._getIndexContent(additionalData)}"]`;
        break;
      case 'nested_loop':
        content = `${id}{"<b>${displayName}</b>"}`;
        break;
      case 'query_block':
        content = `${id}[<b>${displayName}</b>${additionalData.cost_info ? `<br>${MermaidUtils._getPrefixCostContent(additionalData, 'query_cost')}<br>` : ''}]`;
        break;
      case 'attached_subqueries':
        content = `${id}[<b>${displayName}</b>]`;
        style = `style ${id} stroke:#000,stroke-width:3px,stroke-dasharray: 5 5`;
        break;
      default:
        content = `${id}[<b>${displayName}</b>]`;
    }

    return [content, style];
  }

  /**
   * @param {Object} additionalData
   * @param key
   * @returns
   */
  static _getPrefixCostContent(additionalData, key = 'prefix_cost') {
    return `<i>Query cost:</i> ${additionalData.cost_info[key]}`;
  }

  /**
   * @param {Object} additionalData
   * @returns
   */
  static _getIndexContent(additionalData) {
    return additionalData.key ? `<i>Index:</i> ${additionalData.key}` : '';
  }

  /**
   * @param {Object} additionalData
   * @returns
   */
  static _getTotalRows(additionalData) {
    return `<i>Total rows:</i> ${additionalData.rows_produced_per_join}`;
  }

  /**
   * @param {String} idPrefix
   * @param {String} selectId
   * @returns
   */
  static getQueryBlockIdentifier(idPrefix, selectId) {
    return {
      id: `${idPrefix}query_block-${CommonUtils.randomString()}`,
      name: `Query Block ${selectId ? `#${selectId}` : ''}`,
    };
  }

  /**
   * @param {String} idPrefix
   * @returns
   */
  static getOrderingIdentifier(idPrefix) {
    return {
      id: `${idPrefix}ordering-${CommonUtils.randomString()}`,
      name: `Ordering`,
    };
  }

  /**
   * @param {String} idPrefix
   * @returns
   */
  static getNestedLoopNodeIdentifier(idPrefix) {
    return {
      id: `${idPrefix}nested_loop-${CommonUtils.randomString()}`,
      name: `Nested Loop`,
    };
  }

  /**
   * @param {String} idPrefix
   * @param {String} tableName
   * @returns
   */
  static getTableIdentifier(idPrefix, tableName) {
    return {
      id: `${idPrefix}${tableName}-${CommonUtils.randomString()}`,
      name: tableName,
    };
  }
}

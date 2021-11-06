import { NodeData } from '../explained_data_parser/data_structure';

export default class MermaidUtils {
    /**
     * 
     * @param {NodeData} nodeData 
     * @returns 
     */
    static getBoxContent({ id, type, displayName, additionalData }) {
        let content;

        switch (type) {
            case 'table':
                content = `${id}["<b>${displayName}</b><br>${MermaidUtils._getPrefixCostContent(additionalData)}<br>${MermaidUtils._getIndexContent(additionalData)}"]`;
                break;
            case 'nested_loop':
                // content = `${id}{"<b>${displayName}</b><br>${MermaidUtils._getPrefixCostContent(additionalData)}<br>${MermaidUtils._getTotalRows(additionalData)}"}`;
                content = `${id}{"<b>${displayName}</b>"}`;
                break;
            case 'query_block':
                content = `${id}[<b>${displayName}</b><br>${MermaidUtils._getPrefixCostContent(additionalData, 'query_cost')}<br>]`;
                break;
            default:
                content = `${id}[<b>${displayName}</b>]`;
        }

        return content;
    }

    /**
     * @param {Object} additionalData 
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
}

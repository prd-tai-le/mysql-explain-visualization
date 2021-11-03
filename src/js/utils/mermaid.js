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
                content = `${id}["<b>${displayName}</b><br><i>Query cost:</i> ${additionalData.cost_info.prefix_cost}<br><i>Index:</i> ${additionalData.key}"]`;
                console.log(additionalData.key);
                break;
            case 'nested_loop':
                content = `${id}[<b>${displayName}</b><br><i>Query cost:</i> ${additionalData.cost_info}<br><i>Rows:</i> 0]`;
                break;
            case 'query_block':
                content = `${id}[<b>${displayName}</b><br><i>Query cost:</i> ${additionalData.cost_info.query_cost}<br>]`;
                break;
            default:
                content = `${id}[<b>${displayName}</b>]`;
        }

        return content;
    }
}

import { NodeData } from '../explained_data_parser/data_structure';

export default class MermaidUtils {
    /**
     * 
     * @param {NodeData} nodeData 
     * @returns 
     */
    static getBoxContent(nodeData) {
        console.log(nodeData);
        return `
            ${nodeData.id}[<b>${nodeData.displayName}</b><br>123]
        `.trim();
    }
}

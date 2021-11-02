import BaseExplainedDataParser from './base';

export default class JoinDataParser extends BaseExplainedDataParser {
    build() {
        const root = super.build();
        let latestNode = this._parseOrderingNode(root, 'left') || root;
        latestNode = this._parseNestedLoopNodes(latestNode) || latestNode;

        console.log(this.buildMermaidContent());
    }
}

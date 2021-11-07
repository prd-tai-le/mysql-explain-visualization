import ExplainedDataParser from './explained_data_parser/parser';
import sampleData from './sampleData5.json';

const dataParser = new ExplainedDataParser(sampleData);
dataParser.build();
const content = dataParser.buildMermaidContent();
// console.log(dataParser.binaryTree);

function renderFlowchart(renderingText) {
    renderingText = `graph BT;\n${renderingText}`.trim();

    const htmlElement = document.querySelector('.mermaid');
    htmlElement.innerHTML = renderingText;

    setTimeout(() => {
        $('.node').each((_, element) => {
            const keys = $(element).attr('id').split('-');
            const newKeys = keys.splice(1, keys.length - 2);
            const key = newKeys.join('-');
            const content = dataParser.getExplainContentById(key);

            if (content) {
                $(element).attr('data-toggle', 'popover');
                $(element).attr('data-content', content);
                $(element).attr('data-html', 'true');
            }
        });
        $('[data-toggle="popover"]').popover();
    }, 1000);
}

renderFlowchart(content);

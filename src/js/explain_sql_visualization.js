import ExplainedDataParser from './explained_data_parser/parser';
import sampleData from './sampleData5.json';

const dataParser = new ExplainedDataParser(sampleData);
const content = dataParser.buildMermaidContent();

function renderFlowchart(renderingText) {
    renderingText = `graph BT;\n${renderingText}`.trim();

    const htmlElement = document.querySelector('.mermaid');
    htmlElement.innerHTML = renderingText;

    setTimeout(() => {
        $('.node').each((_, element) => {
            const key = $(element).attr('id').split('-')[1];
            const content = dataParser.getExplainContentById(key);

            if (content) {
                $(element).attr('data-toggle', 'popover');
                $(element).attr('data-content', content);
                $(element).attr('data-html', 'true');
            }
        });
        $('[data-toggle="popover"]').popover();
    }, 500);
}

renderFlowchart(content);

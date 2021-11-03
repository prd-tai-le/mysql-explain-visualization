import ExplainedDataParser from './explained_data_parser/parser';
import sampleData from './sampleData1.json';

const dataParser = new ExplainedDataParser(sampleData);
const content = dataParser.buildMermaidContent();

function renderFlowchart(renderingText) {
    renderingText = `graph TD;\n${renderingText}`.trim();

    const htmlElement = document.querySelector('.mermaid');
    htmlElement.innerHTML = renderingText;
    console.log(renderingText);

    // mermaid.render('preparedScheme', renderingText, function (renderingText) {
    //   const htmlElement = document.querySelector('.mermaid');
    //   htmlElement.innerHTML = renderingText;
    // });
}

function listenNodeClickEvent() {
    
}

renderFlowchart(content);

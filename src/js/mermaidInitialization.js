import data from './sampleData1.json';

/**
 * 
 * @param {Array} operations 
 * @param {Object} configs 
 * @returns 
 */
function parseOperations(operations, configs = {}) {
  const queries = {};

  operations.forEach((table) => {
    queries[table.table_name] = {
      costInfo: table.cost_info,
      filtered: table.filtered,
      key: table.key,
      rowsExaminedPerScan: table.rows_examined_per_scan,
      rowsProducedPerJoin: table.rows_produced_per_join,
      subqueries: table.attached_subqueries || [],
      tableName: table.table_name,
    };
  });

  return queries;
}

function getBoxContent(query) {
  return `${query.tableName}[<b>${query.tableName}</b>]`;
}

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

function parseQueriesToVisualizationCode(queries, queryBlock) {
  let currentQuery;
  let renderingText = '';
  const keys = Object.keys(queries);

  keys.forEach((_, index) => {
    currentQuery = queries[keys[index]];
    const nextQuery = queries[keys[index + 1]];

    if (currentQuery && nextQuery) {
      renderingText += `${getBoxContent(currentQuery)}--->${getBoxContent(nextQuery)};\n`;
    }
  });
  renderingText += `${getBoxContent(currentQuery)}--->queryBlock${queryBlock.selectId}[query block #1];`;

  return renderingText;
}

let queries;

if (data.query_block.ordering_operation?.nested_loop) {
  const { nested_loop: operations } = data.query_block.ordering_operation;
  queries = parseOperations(operations.map(e => e.table));
} else if (data.query_block.table) {
  queries = parseOperations([data.query_block.table]);
}

if (queries) {
  let renderingText = parseQueriesToVisualizationCode(queries, {
    selectId: data.query_block.select_id,
    totalCostInfo: data.query_block.cost_info,
  });
  renderFlowchart(renderingText);
}

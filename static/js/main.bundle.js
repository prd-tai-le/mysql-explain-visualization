"use strict";(self.webpackChunkwebpack_boilerplate=self.webpackChunkwebpack_boilerplate||[]).push([[179],{754:()=>{function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function t(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var a=function e(t,a,r){var o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{};n(this,e),this.id=t,this.displayName=a,this.type=r,this.additionalData=o},r=function(){function e(t){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;n(this,e),this.data=t,this.parentId=a?a.data.id:null,this.left=null,this.right=null}return t(e,[{key:"setLeft",value:function(e){this.left=e}},{key:"setRight",value:function(e){this.right=e}}]),e}(),o=function e(t,a){var r,o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;n(this,e),this.data=t,this.parentId=null==o||null===(r=o.data)||void 0===r?void 0:r.id,this.children=a},i=function(){function e(t){n(this,e),this.root=null,this.nodesMap={},this.nodeData=t,this.parentId=null}return t(e,[{key:"setRoot",value:function(e){return this.root=new r(e),this.setMap(this.root),this.root}},{key:"insert",value:function(e,t,n){var a=new r(e,t);return this.setMap(a),"left"===n?t.setLeft(a):"right"===n&&t.setRight(a),a}},{key:"insertTree",value:function(e,t,n){return e.parentId=t.data.id,this.setMap(e),"left"===n?t.setLeft(e):"right"===n&&t.setRight(e),e}},{key:"insertMultibranchNode",value:function(e,t,n){var a=new o(e,t,n);return this.setMap(a),a}},{key:"setMap",value:function(t){t instanceof e&&t.nodeData?this.nodesMap[t.nodeData.id]=t:this.nodesMap[t.data.id]=t}},{key:"getNodes",value:function(){return Object.values(this.nodesMap)}},{key:"getNodeById",value:function(e){return this.nodesMap[e]}},{key:"getNodeData",value:function(){return this.nodeData}}]),e}();function c(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}var s=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e)}var t,n;return t=e,n=[{key:"randomString",value:function(){for(var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:3,t="",n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",a=n.length,r=0;r<e;r+=1)t+=n.charAt(Math.floor(Math.random()*a));return t}}],null&&c(t.prototype,null),n&&c(t,n),e}();function l(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}var u=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e)}var t,n;return t=e,n=[{key:"getBoxContent",value:function(t){var n,a=t.id,r=t.type,o=t.displayName,i=t.additionalData,c=e._getBoxStyle(r,a,i);switch(r){case"table":n="".concat(a,'["<b>').concat(o,"</b><br>").concat(e._getPrefixCostContent(i,"read_cost"),"<br>").concat(e._getIndexContent(i),'"]');break;case"nested_loop":n="".concat(a,'{"<b>').concat(o,'</b>"}');break;case"query_block":n="".concat(a,"[<b>").concat(o,"</b>").concat(i.cost_info?"<br>".concat(e._getPrefixCostContent(i,"query_cost"),"<br>"):"","]");break;case"ordering":case"duplicate_removals":n="".concat(a,"(<b>").concat(o,"</b>)");break;default:n="".concat(a,"[<b>").concat(o,"</b>]")}return[n,c]}},{key:"_getBoxStyle",value:function(t,n){var a,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};switch(t){case"nested_loop":a="style ".concat(n," fill:#fff, stroke:#b3b3b3, stroke-width:2px");break;case"query_block":case"union":a="style ".concat(n," fill:#b3b3b3, stroke:#000, stroke-width:2px");break;case"attached_subqueries":a="style ".concat(n," fill:#fff, stroke:#000, stroke-width:2px, stroke-dasharray: 5 5");break;case"ordering":a="style ".concat(n," fill:#fff, stroke:#bf4040, stroke-width:2px");break;case"duplicate_removals":a="style ".concat(n," fill:#fff, stroke:#bbba06, stroke-width:2px");break;case"table":a=e._getTableStyle(n,r);break;default:a=""}return a}},{key:"_getTableStyle",value:function(e,t){var n;switch(t.access_type.toUpperCase()){case"SYSTEM":case"CONST":n="style ".concat(e," fill:#4080c0");break;case"EQ_REF":case"REF":case"REF_OR_NULL":case"INDEX_MERGE":n="style ".concat(e," fill:#008000");break;case"FULLTEXT":n="style ".concat(e," fill:#bbba06");break;case"UNIQUE_SUBQUERY":case"INDEX_SUBQUERY":case"RANGE":n="style ".concat(e," fill:#b97301");break;case"INDEX":case"ALL":n="style ".concat(e," fill:#b93236");break;case"UNKNOWN":n="style ".concat(e," fill:#000")}return n+",stroke:#000,color:#fff"}},{key:"_getPrefixCostContent",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"prefix_cost";return"<i>Query cost:</i> ".concat(e.cost_info[t])}},{key:"_getIndexContent",value:function(e){return e.key?"<i>Index:</i> ".concat(e.key.replace("<","").replace(">","")):""}},{key:"_getTotalRows",value:function(e){return"<i>Total rows:</i> ".concat(e.rows_produced_per_join)}},{key:"getQueryBlockIdentifier",value:function(e,t){return{id:"".concat(e,"query_block").concat(t||"","-").concat(s.randomString()),name:"Query Block ".concat(t?"#".concat(t):"")}}},{key:"getOrderingIdentifier",value:function(e){return{id:"".concat(e,"ordering-").concat(s.randomString()),name:"Ordering"}}},{key:"getDuplicateRemovalsIdentifier",value:function(e){return{id:"".concat(e,"duplicate_removals-").concat(s.randomString()),name:"Ordering"}}},{key:"getNestedLoopNodeIdentifier",value:function(e){return{id:"".concat(e,"nested_loop-").concat(s.randomString()),name:"Nested Loop"}}},{key:"getTableIdentifier",value:function(e,t){return{id:"".concat(e).concat(t,"-").concat(s.randomString()),name:t}}},{key:"getSubqueryIdentifier",value:function(e,t){return{id:e,name:"Subquery ".concat(t?"#".concat(t):"")}}}],null&&l(t.prototype,null),n&&l(t,n),e}();function d(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}var f=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e)}var t,n;return t=e,n=[{key:"getTableContent",value:function(e){var t=e.additionalData,n=e.displayName;return"\n      <h6 class='node__title'>".concat(n,"</h6>\n      <p>- Access Type: ").concat(t.access_type,"</p>\n      ").concat(t.used_columns?"<p>- Used Columns: ".concat(t.used_columns.join(", "),"</p>"):"","\n      \n      ").concat(t.key?"<br>":"","\n      ").concat(t.key?"<h6 class='node__title'>Key/Index: ".concat(t.key,"</h6>"):"","\n      ").concat(t.ref?"<p>- Ref: ".concat(t.ref.join(", "),"</p>"):"","\n      ").concat(t.used_key_parts?"<p>- Used Key Parts: ".concat(t.used_key_parts.join(", "),"</p>"):"","\n      ").concat(t.possible_keys?"<p>- Possible Keys: ".concat(t.possible_keys.join(", "),"</p>"):"","\n\n      <br>\n      <p>- Rows Examined Per Scan: ").concat(t.rows_examined_per_scan,"</p>\n      <p>- Rows Produced Per Scan: ").concat(t.rows_produced_per_join,"</p>\n      <p>- Filtered: ").concat(t.filtered,"%</p>\n\n      <br>\n      <h6 class='node__title'>Cost Info</h6>\n      <p>- Read: ").concat(t.cost_info.read_cost,"</p>\n      <p>- Eval: ").concat(t.cost_info.eval_cost,"</p>\n      <p>- Prefix: ").concat(t.cost_info.prefix_cost,"</p>\n      <p>- Data Read: ").concat(t.cost_info.data_read_per_join,"</p>\n    ")}},{key:"getQueryBlockContent",value:function(e){var t=e.additionalData;return"\n      <h6 class='node__title'>Query Block</h6>\n      ".concat(t.select_id?"<p>- Select ID: ".concat(t.select_id,"</p>"):"","\n      ").concat(t.cost_info?"<p>- Query cost: ".concat(t.cost_info.query_cost,"</p>"):"","\n    ")}},{key:"getOrderingContent",value:function(e){return"\n      <h6 class='node__title'>Ordering Operation</h6>\n      <p>Using Filesort: ".concat(e.additionalData.using_filesort?"True":"False","</p>\n    ")}},{key:"getNestedLoopContent",value:function(e){return"\n      <h6 class='node__title'>Nested Loop</h6>\n      <p>Prefix cost: ".concat(e.additionalData.cost_info.prefix_cost,"</p>\n    ")}}],null&&d(t.prototype,null),n&&d(t,n),e}();function p(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var a,r,o=[],i=!0,c=!1;try{for(n=n.call(e);!(i=(a=n.next()).done)&&(o.push(a.value),!t||o.length!==t);i=!0);}catch(e){c=!0,r=e}finally{try{i||null==n.return||n.return()}finally{if(c)throw r}}return o}}(e,t)||function(e,t){if(e){if("string"==typeof e)return b(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?b(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function b(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,a=new Array(t);n<t;n++)a[n]=e[n];return a}function y(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function h(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function v(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}var g=function(){function e(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;v(this,e),this.binaryTree=new i(a),this.data=t,this.currentDataLevel=null,this.idPrefix=n?"".concat(n,"#"):""}var t,n;return t=e,n=[{key:"build",value:function(){var e=this._parseQueryBlockNode(),t=this._parseUnion(e)||e;t=this._parseDuplicatesRemoval(t)||t,t=this._parseOrderingNode(t)||t,t=this._parseNestedLoopNodes(t)||t,t=this._parseTableNode(t)||t}},{key:"_parseQueryBlockNode",value:function(){var e,t=this.data.query_block;console.log(t);var n=u.getQueryBlockIdentifier(this.idPrefix,t.select_id),r=n.id,o=n.name;"subquery"===(null===(e=this.binaryTree.getNodeData())||void 0===e?void 0:e.type)&&(o=this.binaryTree.getNodeData().displayName);var i=new a(r,o,"query_block",{select_id:t.select_id,cost_info:t.cost_info}),c=this.binaryTree.setRoot(i);return this.currentDataLevel=t,c}},{key:"_parseOrderingNode",value:function(e){var t=this.currentDataLevel.ordering_operation;if(t){var n=u.getOrderingIdentifier(this.idPrefix),r=n.id,o=n.name,i=new a(r,o,"ordering",{using_filesort:t.using_filesort}),c=this.binaryTree.insert(i,e,"left");return this.currentDataLevel=t,c}return null}},{key:"_parseNestedLoopNodes",value:function(e){var t=this,n=this.currentDataLevel.nested_loop;return n?(n.reverse(),n.forEach((function(r,o){var i=t._parseTableData(r),c=u.getNestedLoopNodeIdentifier(t.idPrefix),s=c.id,l=c.name,d=new a(s,l,"nested_loop",{cost_info:i.additionalData.cost_info,rows_produced_per_join:i.additionalData.rows_produced_per_join});o!==n.length-1&&(e=t.binaryTree.insert(d,e,"left"));var f=t.binaryTree.insert(i,e,"right");t._parseAttachedSubqueriesNodes(f,r.table),t._parseMaterializedFromSubquery(f,r.table)})),e):null}},{key:"_parseDuplicatesRemoval",value:function(e){var t=this.currentDataLevel.duplicates_removal;if(t){var n=u.getDuplicateRemovalsIdentifier(this.idPrefix),r=n.id,o=n.name,i=new a(r,o,"duplicate_removals",{using_temporary_table:t.using_temporary_table,using_filesort:t.using_filesort}),c=this.binaryTree.insert(i,e,"left");return this.currentDataLevel=t,c}return null}},{key:"_parseUnion",value:function(t){var n=this.currentDataLevel.union_result;if(n){var r="".concat(this.idPrefix).concat(t.data.id,"#union"),o=new a(r,"Union","union"),i=n.query_specifications.map((function(t,n){var a=new e(t,"".concat(r,"#").concat(n));return a.build(),a.binaryTree}));return this.binaryTree.insertMultibranchNode(o,i,t),o}return null}},{key:"_parseTableData",value:function(e){var t=e.table,n=u.getTableIdentifier(this.idPrefix,t.table_name),r=n.id,o=n.name,i=new a(r,o,"table",function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?y(Object(n),!0).forEach((function(t){h(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):y(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},t));return i}},{key:"_parseTableNode",value:function(e){var t=this.currentDataLevel.table;if(t){var n=this._parseTableData(this.currentDataLevel),a=this.binaryTree.insert(n,e,"left");return this.currentDataLevel=t,this._parseAttachedSubqueriesNodes(a,t),this._parseMaterializedFromSubquery(a,t),a}return null}},{key:"_parseAttachedSubqueriesNodes",value:function(t,n){var r=n.attached_subqueries;if(r){var o="".concat(this.idPrefix).concat(t.data.id,"#subqueries"),i=new a(o,"Attached Subqueries","attached_subqueries"),c=r.map((function(t,n){var r="".concat(o,"#").concat(n),i=u.getSubqueryIdentifier(r,t.query_block.select_id).name,c=new e(t,r,new a(r,i,"subquery"));return c.build(),c.binaryTree}));return this.binaryTree.insertMultibranchNode(i,c,t),i}return null}},{key:"_parseMaterializedFromSubquery",value:function(t,n){var r=n.materialized_from_subquery;if(r){var o="".concat(this.idPrefix).concat(t.data.id,"#materialized_from_subquery"),i=new e(r,o,new a(o,"Materialized - ".concat(t.data.displayName),"materialized_from_subquery"));return i.build(),this.binaryTree.insertTree(i.binaryTree,t,"left"),i.binaryTree}return null}},{key:"getExplainContentById",value:function(e){var t,n,a=this.binaryTree.nodesMap,r=e.split("#"),o=[];switch(r.forEach((function(e){"subqueries"===e||"materialized_from_subquery"===e?o[o.length-1]+="#".concat(e):o[o.length-1]?o.push("".concat(o[o.length-1],"#").concat(e)):o.push(e)})),o.forEach((function(n,r){if(r!==o.length-1){if(a[n]&&(t=a[n]),t&&t.nodesMap&&(a=t.nodesMap),t&&t.children){var i=parseInt(n.slice(-2).replace("#",""),10);Number.isInteger(i)&&(a=t.children[i].nodesMap)}}else t=a[e]})),t.data.type){case"nested_loop":n=f.getNestedLoopContent(t.data);break;case"ordering":n=f.getOrderingContent(t.data);break;case"query_block":n=f.getQueryBlockContent(t.data);break;case"table":n=f.getTableContent(t.data)}return n?n.trim():null}},{key:"buildMermaidContent",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;t=t||this.binaryTree;var n="",a="",r=t.getNodes();r.reverse();for(var c=0;c<r.length;c+=1){var s=r[c];if(s.parentId)if(s instanceof i){var l=t.getNodeById(r[c].parentId),d=u.getBoxContent(l.data),f=p(d,1),b=f[0],y=u.getBoxContent(s.getNodes()[0].data),h=p(y,1),v=h[0],_=this.buildMermaidContent(s);_="\nsubgraph ".concat(s.nodeData.displayName,"\n").concat(_,"end\n"),n+="\n".concat(_),n+="".concat(v,"--\x3e").concat(b,"\n")}else!function(){var i=t.getNodeById(r[c].parentId),l=p(u.getBoxContent(i.data),2),d=l[0],f=l[1],b=p(u.getBoxContent(s.data),2),y=b[0],h=b[1];n+="".concat(y,"--\x3e").concat(d,"\n"),a+=f?"".concat(f,"\n"):"",a+=h?"".concat(h,"\n"):"",s instanceof o&&s.children.forEach((function(t){var a=e.buildMermaidContent(t),r=p(u.getBoxContent(t.getNodes()[0].data),2),o=r[0];r[1],n+="\n".concat(a),n+="".concat(o,"--\x3e").concat(y,"\n")}))}()}return"".concat(n,"\n").concat(a)}}],n&&_(t.prototype,n),e}();function k(){var e=editor.getSession().getValue();try{var t=JSON.parse(e),n=new g(t);n.build(),function(e){var t=e.buildMermaidContent();t="graph BT;\n".concat(t).trim();var n=document.querySelector(".mermaid");mermaid.mermaidAPI.render("mermaid",t,(function(e){n.innerHTML=e})),setTimeout((function(){$(".node").each((function(t,n){var a=$(n).attr("id").split("-"),r=a.splice(1,a.length-2).join("-"),o=e.getExplainContentById(r);o&&($(n).attr("data-toggle","popover"),$(n).attr("data-content",o),$(n).attr("data-html","true"))})),$('[data-toggle="popover"]').popover()}),1e3)}(n)}catch(e){console.log("Failed to decode")}}editor.getSession().on("change",(function(){k()})),k()}},e=>{e(e.s=754)}]);
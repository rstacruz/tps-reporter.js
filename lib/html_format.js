const ejs = require('ejs')

const NORMALIZE_CSS =
  `/*! normalize.css v5.0.0 | MIT License | github.com/necolas/normalize.css */button,hr,input{overflow:visible}audio,canvas,progress,video{display:inline-block}progress,sub,sup{vertical-align:baseline}[type=checkbox],[type=radio],legend{box-sizing:border-box;padding:0}html{font-family:sans-serif;line-height:1.15;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%}body{margin:0}article,aside,details,figcaption,figure,footer,header,main,menu,nav,section{display:block}h1{font-size:2em;margin:.67em 0}figure{margin:1em 40px}hr{box-sizing:content-box;height:0}code,kbd,pre,samp{font-family:monospace,monospace;font-size:1em}a{background-color:transparent;-webkit-text-decoration-skip:objects}a:active,a:hover{outline-width:0}abbr[title]{border-bottom:none;text-decoration:underline;text-decoration:underline dotted}b,strong{font-weight:bolder}dfn{font-style:italic}mark{background-color:#ff0;color:#000}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative}sub{bottom:-.25em}sup{top:-.5em}audio:not([controls]){display:none;height:0}img{border-style:none}svg:not(:root){overflow:hidden}button,input,optgroup,select,textarea{font-family:sans-serif;font-size:100%;line-height:1.15;margin:0}button,select{text-transform:none}[type=reset],[type=submit],button,html [type=button]{-webkit-appearance:button}[type=button]::-moz-focus-inner,[type=reset]::-moz-focus-inner,[type=submit]::-moz-focus-inner,button::-moz-focus-inner{border-style:none;padding:0}[type=button]:-moz-focusring,[type=reset]:-moz-focusring,[type=submit]:-moz-focusring,button:-moz-focusring{outline:ButtonText dotted 1px}fieldset{border:1px solid silver;margin:0 2px;padding:.35em .625em .75em}legend{color:inherit;display:table;max-width:100%;white-space:normal}textarea{overflow:auto}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}[type=search]::-webkit-search-cancel-button,[type=search]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary{display:list-item}[hidden],template{display:none}`

const STYLE_TEMPLATE =
`
html {
  font-size: 14px;
  line-height: 1.5;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  color: #345;
}

.tasks-list {
  margin: 24px auto;
  background: white;
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
  padding-top: 8px;
  padding-bottom: 8px;
  max-width: 640px;
  min-width: 480px;
}

.task-table {
  table-layout: fixed;
  border-collapse: collapse;
  width: 100%;
}

.work-item > td {
  border-top: solid 1px #fafafa;
}

.work-item.-project.-depth-1 > td {
  border-top: solid 2px #ccc;
}

.work-item.work-item:first-child > td {
  border-top: 0;
}

.work-item > .points { width: 40px; }
.work-item > .progress { width: 80px; }
.work-item > .item { width: 100%; }
.work-item > .space { width: 16px; }

.work-item > .item {
  padding: 4px 8px;
  white-space: nowrap;
}

.work-item.-project > .item {
  font-weight: bold;
  color: #111;
}

.work-item > .item { padding-left: 100px; }
.work-item.-depth-1 > .item { padding-left: 0; }
.work-item.-depth-2 > .item { padding-left: 20px; }
.work-item.-depth-3 > .item { padding-left: 40px; }
.work-item.-depth-4 > .item { padding-left: 60px; }
.work-item.-depth-5 > .item { padding-left: 80px; }

.work-item > .points {
  color: #8090a0;
  font-size: .86em;
  text-align: right;
}

.item-bullet {
  display: inline-block;
  vertical-align: middle;
  width: 12px;
  height: 12px;
  border-radius: 2px;
  background: #eee;
  margin-right: 5px;
  position: relative;
  top: -2px;
}

.item-bullet.-progress-1 {
  background: #C8E6C9;
}

.item-bullet.-progress-2 {
  background: #81C784;
}

.item-bullet.-progress-2 {
  background: #4CAF50;
}

.progress-bar {
  display: block;
  height: 3px;
  background: #eee;
}

.progress-bar > span {
  display: block;
  background: #4CAF50;
  height: 3px;
}
`

const LAYOUT_TEMPLATE =
`<!doctype html>
<html>
<head>
<meta charset='utf-8'>
<style>${NORMALIZE_CSS}</style>
<style>${STYLE_TEMPLATE}</style>
</head>
<body>
<div class='tasks-list'>
<table class='task-table'>
<% if (node.children) node.children.forEach(function (child) { -%>
<%- renderNode({ node: child, renderNode: renderNode }) -%>
<% }) -%>
</table>
</div>
</body>
</html>
`

const NODE_TEMPLATE =
`<tr class='work-item -depth-<%= node.depth %> -<%= node.type %>'>
<td class='space'></td>
<td class='item'>
  <span class='item-bullet -progress-<%= Math.floor(node.progress * 3) %>'></span>
  <%= node.value %>
</td>
<td class='progress'>
  <% if (node.type === 'project') { -%>
    <span class='progress-bar'><span style='width:<%= node.progress * 100 %>%'></span></span>
  <% } -%>
</td>
<td class='points'>
  <% if (node.type === 'project') { -%>
    <%= node.points -%>
  <% } -%>
</td>
<td class='space'></td>
</tr>
<% if (node.children) node.children.forEach(function (child) { -%>
<%- renderNode({ node: child, renderNode: renderNode }) -%>
<% }) -%>
`

function formatHtml (node) {
  const render = ejs.compile(LAYOUT_TEMPLATE)
  const renderNode = ejs.compile(NODE_TEMPLATE)

  return render({
    node, renderNode
  })
}

module.exports = formatHtml

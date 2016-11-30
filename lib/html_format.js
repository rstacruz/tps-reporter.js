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
  border-top: solid 1px #f9f9fa;
}

.work-item.-project > td {
  border-top: solid 1px #CFD8DC;
}

.work-item.-project.-depth-1 > td {
  border-top: solid 2px #90A4AE;
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

/* Hide points */

.work-item > .points > * {
  visibility: hidden;
}

.work-item:hover > .points > *,
.work-item.-project > .points > * {
  visibility: visible;
}

/*
 * Item bullet
 */

.item-bullet {
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: linear-gradient(to right, #ECEFF1 50%, #4CAF50 50%);
  overflow: hidden;
  position: relative;
  margin-right: 4px;
  top: 1px;
}

.item-bullet.-p0 {
  background: #ECEFF1;
}

.item-bullet::before {
  content: '';
  display: block;
  width: 50%;
  height: 100%;
  background: #ECEFF1;
  position: absolute;
  top: 0%;
  left: 50%;
  transform-origin: 0 50%;
  transform: rotate(0deg);
}

.item-bullet.-p7::before,
.item-bullet.-p8::before,
.item-bullet.-p9::before,
.item-bullet.-p10::before,
.item-bullet.-p11::before,
.item-bullet.-p12::before {
  background: #4CAF50;
}

.item-bullet.-p1::before { transform: rotate(30deg); }
.item-bullet.-p2::before { transform: rotate(60deg); }
.item-bullet.-p3::before { transform: rotate(90deg); }
.item-bullet.-p4::before { transform: rotate(120deg); }
.item-bullet.-p5::before { transform: rotate(150deg); }
.item-bullet.-p6::before { display: none; }
.item-bullet.-p7::before { transform: rotate(30deg); }
.item-bullet.-p8::before { transform: rotate(60deg); }
.item-bullet.-p9::before { transform: rotate(90deg); }
.item-bullet.-p10::before { transform: rotate(120deg); }
.item-bullet.-p11::before { transform: rotate(150deg); }
.item-bullet.-p12::before { transform: rotate(180deg); }

.item-bullet::after {
  content: '';
  display: block;
  position: absolute;
  top: 2px;
  right: 2px;
  bottom: 2px;
  left: 2px;
  border-radius: 50%;
  background: white;
}

/* Almost done */
.item-bullet.-p9::after,
.item-bullet.-p10::after,
.item-bullet.-p11::after,
.item-bullet.-p12::after {
  background: #DCEDC8;
}

.item-bullet.-done::after {
  display: none;
}

xxx.item-bullet.-done::after {
  content: '✓';
  font-size: 12px;
  font-weight: bold;
}

.progress-bar {
  display: block;
  height: 3px;
  background: #ECEFF1;
  border-radius: 2px;
}

.progress-bar > span {
  display: block;
  background: #4CAF50;
  height: 3px;
  border-radius: 2px;
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
  <span class='item-bullet -p<%= Math.round(node.progress * 12) %> <%= node.progress === 1 ? '-done' : '' %>' title='<%= Math.round(node.progress * 100) %>%'></span>
  <%= node.value %>
</td>
<td class='progress'>
  <% if (node.type === 'project') { -%>
    <span class='progress-bar'><span style='width:<%= node.progress * 100 %>%'></span></span>
  <% } -%>
</td>
<td class='points'>
  <span title='<%= node.progress * node.points %>'><%= node.points -%></span>
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

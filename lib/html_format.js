const ejs = require('ejs')

const NORMALIZE_CSS =
  `/*! normalize.css v5.0.0 | MIT License | github.com/necolas/normalize.css */button,hr,input{overflow:visible}audio,canvas,progress,video{display:inline-block}progress,sub,sup{vertical-align:baseline}[type=checkbox],[type=radio],legend{box-sizing:border-box;padding:0}html{font-family:sans-serif;line-height:1.15;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%}body{margin:0}article,aside,details,figcaption,figure,footer,header,main,menu,nav,section{display:block}h1{font-size:2em;margin:.67em 0}figure{margin:1em 40px}hr{box-sizing:content-box;height:0}code,kbd,pre,samp{font-family:monospace,monospace;font-size:1em}a{background-color:transparent;-webkit-text-decoration-skip:objects}a:active,a:hover{outline-width:0}abbr[title]{border-bottom:none;text-decoration:underline;text-decoration:underline dotted}b,strong{font-weight:bolder}dfn{font-style:italic}mark{background-color:#ff0;color:#000}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative}sub{bottom:-.25em}sup{top:-.5em}audio:not([controls]){display:none;height:0}img{border-style:none}svg:not(:root){overflow:hidden}button,input,optgroup,select,textarea{font-family:sans-serif;font-size:100%;line-height:1.15;margin:0}button,select{text-transform:none}[type=reset],[type=submit],button,html [type=button]{-webkit-appearance:button}[type=button]::-moz-focus-inner,[type=reset]::-moz-focus-inner,[type=submit]::-moz-focus-inner,button::-moz-focus-inner{border-style:none;padding:0}[type=button]:-moz-focusring,[type=reset]:-moz-focusring,[type=submit]:-moz-focusring,button:-moz-focusring{outline:ButtonText dotted 1px}fieldset{border:1px solid silver;margin:0 2px;padding:.35em .625em .75em}legend{color:inherit;display:table;max-width:100%;white-space:normal}textarea{overflow:auto}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}[type=search]::-webkit-search-cancel-button,[type=search]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary{display:list-item}[hidden],template{display:none}`

const STYLE_TEMPLATE =
`
html {
  font-size: 16px;
  line-height: 1.5;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  color: #345;
  background: #fafafa;
}

@media (max-width: 768px) {
  html {
    font-size: 15px;
  }
}

@media (max-width: 480px) {
  html {
    font-size: 14px;
  }
}

.tasks-list {
  margin: 32px auto;
  background: white;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  padding: 8px 24px;
  max-width: 780px;
  min-width: 640px;
}

@media (max-width: 768px) {
  .tasks-list {
    min-width: 320px;
    padding: 8px 16px;
    margin: 0 auto;
  }
}

@media (max-width: 480px) {
  .tasks-list {
    width: 100%;
    min-width: 240px;
    margin: 0 auto;
  }
}

.task-table {
  table-layout: fixed;
  border-collapse: collapse;
  width: 100%;
}

/*
 * Work item
 */

.work-item > td {
  border-bottom: solid 1px #f9f9fa;
}

.work-item:last-child > td {
  border-bottom: none;
}

.work-item:hover > td {
  background: #fcfcfc;
}

.work-item:hover > td:first-child {
  background: linear-gradient(to right, white, #fcfcfc 16px);
}

.work-item:hover > td:last-child {
  background: linear-gradient(to left, white, #fcfcfc 16px);
}

/* Big features */
.work-item.-project.-depth-2 > td {
  border-bottom: solid 1px #edddee;
  padding-top: 16px;
}

/* Main headings */
.work-item.-project.-depth-1 > td {
  border-bottom: none;
  padding-bottom: 8px;
  padding-top: 16px;
}

.work-item.-project.-depth-1:not(:first-child) > td {
  padding-top: 32px;
}

.work-item.-project.-depth-1 > .item {
  font-weight: 300;
  font-size: 1.2em;
  color: #607D8B;
}

.work-item.-project.-depth-1 > .item > .item-bullet {
  display: none;
}

.work-item > .points { width: 40px; }
.work-item > .progress { width: 80px; }
.work-item > .sprints { width: 80px; }
.work-item > .item { width: 100%; }

.work-item > .item {
  padding: 4px 8px;
  white-space: nowrap;
}

.work-item.-project > .item {
  font-weight: bold;
  color: #111;
}

.work-item > .item { padding-left: 120px; }
.work-item.-depth-1 > .item,
.work-item.-depth-2 > .item { padding-left: 0; }
.work-item.-depth-3 > .item { padding-left: 24px; }
.work-item.-depth-4 > .item { padding-left: 48px; }
.work-item.-depth-5 > .item { padding-left: 72px; }
.work-item.-depth-6 > .item { padding-left: 96px; }

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
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: linear-gradient(to right, #ECEFF1 50%, #4CAF50 50%);
  transform: translate3d(0, 0, 0);
  overflow: hidden;
  position: relative;
  margin-right: 6px;
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
  animation: arcrotate 500ms ease-out;
}

@keyframes arcrotate {
  0% { transform: rotate(0deg); }
}

.item-bullet.-p12::before {
  animation: none;
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

/* Halfway there */
.item-bullet.-p6::after,
.item-bullet.-p7::after,
.item-bullet.-p8::after {
  background: #ECEFF1;
}

/* Almost done */
.item-bullet.-p9,
.item-bullet.-p10,
.item-bullet.-p11,
.item-bullet.-p12 {
  background: linear-gradient(to right, #DCEDC8 50%, #4CAF50 50%);
}

.item-bullet.-p9::after,
.item-bullet.-p10::after,
.item-bullet.-p11::after,
.item-bullet.-p12::after {
  background: #DCEDC8;
}

.item-bullet.-done::after {
  display: none;
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

/*
 * Tooltips
 */

.hint-box {
  position: relative;
}

.hint-box::before,
.hint-box::after {
  display: inline-block;
  pointer-events: none;
  box-sizing: border-box;
  position: absolute;
  z-index: 1000;
  top: 100%;
  left: 50%;
  opacity: 0;
  transition: all 100ms linear;
}

.hint-box::before {
  content: '';
  display: inline-block;
  width: 0;
  height: 0;
  margin-top: 0;
  margin-left: -4px;
  border: solid 4px transparent;
  border-bottom-color: #fff;
}

.hint-box::after {
  content: attr(data-hint);
  margin-left: -50%;
  margin-top: 8px;
  border-radius: 3px;
  padding: 8px 12px;
  max-width: 320px;
  white-space: normal;

  background: #fff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1), 0 6px 12px rgba(0, 0, 0, 0.05);
  color: #607D8B;

  font-size: .86rem;
  font-weight: normal;
  font-style: normal;
}

.hint-box.-wide::after {
  min-width: 300px;
  text-align: center;
}

.hint-box:hover::before,
.hint-box:hover::after {
  opacity: 1;
}

.hint-box.-block {
  padding-top: 8px;
  padding-bottom: 8px;
  display: block;
}

/*
 * Note icon
 */

.note-icon {
  padding: 0 4px;
}

.note-icon::before {
  content: '≡';
  display: inline-block;
  box-sizing: border-box;
  width: 12px;
  height: 14px;
  line-height: 12px;
  font-size: 16px;
  text-align: center;
  text-indent: 1px;
  color: #8899aa;
  background-color: #FFF9C4;
  border-bottom-right-radius: 3px;
  box-shadow: 1px 1px 0 #ccc;
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
<%- renderNode({ node: child, root: node, h: h, renderNode: renderNode }) -%>
<% }) -%>
</table>
</div>
</body>
</html>
<!--

<%- src %>
-->`

const NODE_TEMPLATE =
`<tr class='work-item -depth-<%= node.depth %> -<%= node.type %>'>
<td class='item'>
  <span class='hint-box' data-hint='<%= Math.round(node.progress * 100) %>%'>
    <span class='item-bullet -p<%= Math.round(node.progress * 12) %> <%= node.progress === 1 ? '-done' : '' %>'></span>
  </span>
  <span><%= node.value %></span>
  <% if (node.notes) { -%>
    <span class='hint-box -wide' data-hint='<%= node.notes %>'>
      <span class='note-icon'></span>
    </span>
  <% } -%>
</td>
<% if (root.sprints && Object.keys(root.sprints).length) { -%>
  <!-- <td class='sprints'>
    <%= JSON.stringify(h.segmentize(Object.keys(root.sprints), node.inSprints)) %>
  </td> -->
<% } -%>
<td class='progress'>
  <% if (node.type === 'project') { -%>
    <span class='hint-box -block' data-hint='<%= Math.round(node.progress * 100) %>%'>
      <span class='progress-bar'><span style='width:<%= node.progress * 100 %>%'></span></span>
    </span>
  <% } -%>
</td>
<td class='points'>
  <span title='<%= node.progress * node.points %>'><%= node.points -%></span>
</td>
</tr>
<% if (node.children) node.children.forEach(function (child) { -%>
<%- renderNode({ node: child, root: root, h: h, renderNode: renderNode }) -%>
<% }) -%>
`

function formatHtml (node, context) {
  const render = ejs.compile(LAYOUT_TEMPLATE)
  const renderNode = ejs.compile(NODE_TEMPLATE)
  const src = context && context.src
  const h = {
    segmentize: require('./segmentize')
  }

  return render({
    node, renderNode, src, h
  })
}

module.exports = formatHtml

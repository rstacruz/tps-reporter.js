const ejs = require('ejs')

const LAYOUT_TEMPLATE =
`<!doctype html>
<html>
  <head>
    <meta charset='utf-8'>
  </head>
  <body>
    <table>
      <% if (node.children) node.children.forEach(function (child) { -%>
      <%- renderNode({ node: child, renderNode: renderNode }) -%>
      <% }) -%>
    </table>
  </body>
</html>
`

const NODE_TEMPLATE =
`<tr class='work-item -depth-<%= node.depth %> -<%= node.type %>'>
  <td><%= node.value %></td>
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

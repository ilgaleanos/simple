const Fragment = require('../core/fragment.js');



const renderTable = new Fragment("App",`
        <div class="Main">
                <table id="Table" class="Table" ><tbody>
                        {{~ it.items: item}}
                                <tr class="TableRow {{? item.active }}active{{?}}" data-id="{{= item.id }}">
                                        <td class="TableCell" data-text="#{{= item.id }}">#{{= item.id }}</td>
                                        {{~ item.props: prop}}
                                                <td class="TableCell" data-text="#{{= prop }}">{{= prop }}</td>
                                        {{~}}
                                </tr>
                        {{~}}
                </tbody></table>
        </div>
        `, {})

const renderAnim = new Fragment("App",`
<div  class="Main">
        <div class="Anim">
        {{~ it.items: item}}
                <div class="AnimBox" style="border-radius:{{= item.time % 10 }}px; background:rgba(0,0,0,{{= 0.5 + (( item.time % 10) / 10) }})" data-id="{{= item.id }}"></div>
        {{~}}
        <div>
</div>
        `, {})


function renderTreeNode(c) {
       for (var a = '<ul class="TreeNode">', d = 0; d < c.children.length; d++) var b = c.children[d],
           a = a + (b.container ? renderTreeNode(b) : '<li class="TreeLeaf">' + b.id + "</li>");
       return a + "</ul>"
}

const container = document.getElementById('App');
function renderTree(data) {
        container.innerHTML = '<div class="Main"><div class="Tree">' + renderTreeNode(data.root) + "</div></div>"
}

function renderMain(data) {
        const location = data && data.location;
        if (location === "table") {
                renderTable.render({data: data.table});
        } else if (location === "anim") {
                renderAnim.render({data: data.anim});
        } else if (location === "tree") {
                renderTree( data.tree);
        }
}

uibench.init("Vanilla[innerHTML]", "1.0.0");

function handleClick(e) {
        if (e.target.className === "TableCell") {
                console.log("Click", e.target.getAttribute("data-text"));
                e.preventDefault();
                e.stopPropagation();
        }
}


document.addEventListener("DOMContentLoaded", (e) => {
        uibench.run(
            (state) => {
                        renderMain(state);
                        if (state.location === "table") {
                              container.onclick = handleClick;
                        }
                },
                (samples) => {
                        document.body.innerHTML = "<pre>" + JSON.stringify(samples, null, " ") + "</pre>";
                }
        );
});

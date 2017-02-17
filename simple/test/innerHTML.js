const renderTable = new Fragment("#App",`
        <div class="Main">
                <table class="Table"><tbody>
                        <tr class="TableRow{{? it.active }}active{{?}}" data-id="{{= it.id }}">
                                <td class="TableCell" data-text="#{{= it.id }}">#{{= it.id }}</td>
                                {{~ it.props: prop}}
                                        <td class="TableCell" data-text="#{{= prop }}">#{{= prop }}</td>
                                {{~}}
                        </tr>
                </tbody></table>
        `, {})

const renderAnimBox = new Fragment("#App",`
        <div class="Anim">
        {{~ it.items: item}}
                <div class="AnimBox" style="border-radius:{{ item.time % 10 }}px; background:rgba(0,0,0,{{0.5 + (( item.time % 10) / 10) }})" data-id="{{= item.id }}"></div>
        {{~}}
        <div>
        `, {})


function renderTreeNode(data) {
        var result = '<ul class="TreeNode">', n;
        for (let i = 0, k = data.children.length; i < k; i++) {
                n = data.children[i];
                if ( n.container ) {
                        result = result + renderTreeNode(n) :
                } else {
                        result = result + '<li class="TreeLeaf">';
                        result = result + n.props.id;
                        result = result +'</li>';
                        return;
                }
        }
        result = result +'</ul>'
        return result;
}

const renderTree = new Fragment("#App", `
        <div class="Tree">
                <ul class="TreeNode">
                        {{~ it.children: child }}
                                {{? child.container }}
                                        {{ this.renderTreeNode(child); }}
                                {{??}}
                                        <li class="TreeLeaf">{{= it.id }}</li>
                                {{?}}
                        {{~}}
                </ul>
        </div>
        `,{})


function renderMain(data) {
        const location = data && data.location;
        if (location === "table") {
                renderTable.render(data.table);
        } else if (location === "anim") {
                renderAnim.render(data.anim);
        } else if (location === "tree") {
                renderTree.render(data.tree);
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
                              const cells = container.querySelectorAll(".TableCell");
                              for (var i = 0, k = cells.length; i < k; i++) {
                                      cells[i].onclick = handleClick;
                              }
                        }
                },
                (samples) => {
                        document.body.innerHTML = "<pre>" + JSON.stringify(samples, null, " ") + "</pre>";
                }
        );
});

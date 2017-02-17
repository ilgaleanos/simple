const Fragment = require('../core/fragment.js');
// const Palette = require('../core/palette.js');

class notFound {
        constructor(props) {
                this.store = props.store;
                this.fragment = new Fragment('content', `
                <h1>{{= it }}</h1>
                `, "Not Found Page in urls");
        }
}

module.exports = notFound;

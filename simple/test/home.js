const Fragment = require('../core/fragment.js');
// const Palette = require('../core/palette.js');
const Layout = require('./layout');

class Home extends Layout {
        constructor(props) {
                super(props);
                this.store = props.store;
                this.fragment = new Fragment('content', `
                <h1>{{= it }}</h1>
                `, "Home");
        }
}

module.exports = Home;

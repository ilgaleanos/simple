const Fragment = require('../core/fragment.js');
// const Palette = require('../core/palette.js');

class Home {
        constructor(props) {
                this.store = props.store;
                this.fragment = new Fragment('main', `
                <ul>
                        <li><a href="/" >index</a></li>
                        <li><a href="/home/" >/home/</a></li>
                        <li><a href="/about/">/about/</a></li>
                        <li><a href="/books/isaac/demo/15/?asd=3&poy=5">/books/</a></li>
                </ul>
                <content id="content">
                        <h1>Hello World</h1>
                </content>
                `);
        }
}

module.exports = Home;

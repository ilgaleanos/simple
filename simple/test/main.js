const Router = require('../core/router.js');
const Fragment = require('../core/fragment.js');
const Layout = require('./layout.js');
const Home = require('./home.js');
const About = require('./about.js');
const notFound = require('./notFound.js');


var routes = {
        '/': Home,
        '/home/': Home,
        '/about/': About,
        '/books/:id/demo/:asd/': About,
}

var store = {
        text: 'Hello world'
}

const router = new Router(routes, store);
router.setNotFound(notFound);
router.start()

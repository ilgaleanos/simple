/*
* @author ilgaleanos under licence MIT
*
* It require routes starting and ending with  /
* routes is a dic the routes of the form { routeString: handlerClass }
* store is a globar object to pass data to handlerClasses
* if you need calls to parents, you must implement inheritance
* rDefault is the first route to go at end compile routes
* based on https://en.wikipedia.org/wiki/Depth-first_search
* and Radix tree (https://en.wikipedia.org/wiki/Radix_tree)
*/

class Router {
        constructor( dicRoutes = {}, objStore = {}, rDefault = "/" ) {
                var that = this;
                History.Adapter.bind(window,'statechange',()=>{
                        that.mGoToLink(History.getState().hash);
                });

                // Capture all clicks, I don't know a better way to do this
                window.onclick = (event) => {
                        event.preventDefault();
                        var a = event.target;
                        if ( a.tagName.toLowerCase() === 'a') {
                                if( a.target === '_blank'){
                                        window.open( a.href, '_blank');
                                }
                                History.pushState("", "", a.href);
                        }
                };

                this.rDefault = rDefault;
                this.dicRoutes = dicRoutes;
                this.routesKeys =Object.keys(this.dicRoutes);
                this.numOfRoutes = this.routesKeys.length;

                // this object is pass to all clases
                this.mData = {
                        store: objStore,
                        params: {},
                        query:{}
                }

                this.fn;
                this.notFoundBool = false;
                this.routesCompile();
        }

        // set a specific not found handler
        setNotFound( aFunction ) {
                this.notFound = aFunction;
                this.notFoundBool = true;
        }

        // Handler for find a route
        mGoToLink( mLinkStr ) {
                var rSplit = mLinkStr.split('/');
                rSplit.splice(0,1);

                this.access = true;
                this.mData.params = {}
                this.mData.query = {}
                this.mGetFnOfRoute(this.routeTree, rSplit, 0 );

                if (this.fn == undefined) {
                        if (this.notFoundBool) {
                                new this.notFound( this.mData );
                        } else {
                                new this.dicRoutes[this.rDefault](this.mData);
                        }
                } else {
                        this.mGetSearch(window.location.search);
                        new this.fn(this.mData);
                }
        }

        // search in depth for the route in this.routeTree,
        // return a handler or undefined
        mGetFnOfRoute( obj, arrRoute, depth ) {
                var part = arrRoute[depth];
                if( obj[part] === undefined  ) {
                        var arrKeys = Object.keys(obj), key;
                        for (var i = 0, k = arrKeys.length; i < k; i++) {
                                key = arrKeys[i];
                                if ( key[0] == ':') {
                                        this.mData.params[key.substring(1)] = part;
                                        this.mGetFnOfRoute( obj[key], arrRoute, depth+1 );
                                }
                        }
                        if (this.access) {
                                this.fn = obj['>fn'];
                                this.access = false;
                                return;
                        } else {
                                return;
                        }
                }
                this.mGetFnOfRoute( obj[part], arrRoute, depth+1 );
        }

        // handler for a query params worker of mGoToLink
        mGetSearch( searchStr ) {
                this.mData.query = {};
                if( searchStr ) {
                        searchStr = searchStr.substring(1);
                        var arrElem,
                                arrParts = searchStr.split('&');
                        for (var i = 0, k = arrParts.length; i < k; i++) {
                                arrElem = arrParts[i].split('=');
                                this.mData.query[arrElem[0]] = arrElem[1];
                        }
                }
        }

        // Handler for compile routes
        routesCompile() {
                this.routeTree = {};
                var rSplit, part;
                for (var i = 0; i < this.numOfRoutes; i++) {
                        rSplit = this.routesKeys[i].split('/');
                        rSplit.splice(0,1);
                        this.mSetNode(this.routeTree, rSplit[0], rSplit, 0, this.dicRoutes[this.routesKeys[i]])
                }
        }

        // recursive worker for routesCompiler
        mSetNode( obj, part, arrRoute, depth, fn) {
                var newDepth = depth+1;
                if ( obj[part] == undefined ) {
                        obj[part] = {};
                }
                if (arrRoute[newDepth]  == undefined || arrRoute[newDepth] == "" || arrRoute[newDepth][0] == '?') {
                        obj[part] = {'>fn': fn};
                        return;
                }
                this.mSetNode(obj[part], arrRoute[newDepth], arrRoute, newDepth, fn);
        }

        // shortest for History
        goTo( mLinkStr ) {
                History.pushState("", "", mLinkStr);
        }

        // function to init after configure
        start() {
                this.mGoToLink(History.getState().hash);
        }
}

module.exports = Router;

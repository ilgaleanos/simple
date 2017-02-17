/**
* This class take a object in javascript and create a style sheet
* Nested objects are not allowed, as in sass
* Id is the id for the stylesheet
*/

class Palette {
        constructor(css = {}, id = "main") {
                this.mCss = css;
                this.mSheet = document.getElementById(id+"_sheet");
                if ( this.mSheet == null) {
                        this.mSheet = document.createElement('style');
                        this.mSheet.id = id + "_sheet";
                        document.head.appendChild(this.mSheet);
                }
                this.render(css);
        }

        render( css = {} ) {
                var key = "",
                        prop = "",
                        arrKeys = Object.keys(css);
                for (var i = 0, k = arrKeys.length; i <k; i++) {
                        key = arrKeys[i];
                        // if string is empty delete from
                        if (css[key].length == 0) {
                                delete this.mCss[key];
                        }

                        // Apply the css directly
                        else {
                                if ( this.mCss[key] === undefined) {
                                        this.mCss[key] = {};
                                }
                                var arrProp = Object.keys(css[key]);
                                for (var j = 0, u = arrProp.length; j < u; j++) {
                                        prop = arrProp[j]; // multiple type warning
                                        this.mCss[key][prop] = css[key][prop];
                                }
                        }
                }
                this.mSheet.innerHTML = this.cssToString(this.mCss);
        }

        cssToString(css) {
                var cssStr = "";
                var selector = "",
                        prop = "",
                        arrSelectors = Object.keys(css);
                for (var i = 0, k = arrSelectors.length; i < k ; i++) {
                        selector = arrSelectors[i];
                        cssStr = cssStr + selector;
                        cssStr = cssStr + "{";

                        var arrProp = Object.keys(css[selector]);
                        for (var j = 0, u = arrProp.length; j < u; j++) {
                                prop = arrProp[j];
                                cssStr = cssStr + prop;
                                cssStr = cssStr + ":";
                                cssStr = cssStr + css[selector][prop];
                                cssStr = cssStr + ";";
                        }
                        cssStr = cssStr + "}";
                }
                return cssStr;
        }

        getCssAsJsonStr() {
                return JSON.stringify(this.mCss);
        }

        getCssAsStr() {
                return this.cssToString(this.mCss);
        }

        clear() {
                this.mSheet.innerHTML =''
        }
}

module.exports = Palette;

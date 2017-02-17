const doT = require('../core/doT.js');

class Fragment {
        constructor(id="", template=undefined, data=undefined) {

                // Name of wrapper to render
                this.mId = id;

                //  Get the elements from the dom
                this.mElem = document.getElementById(this.mId);

                // Compile template and set data to template
                this.mData = data;
                if(template) {
                        this.mFn = doT.template(template);
                        this.rendered = this.mFn(this.mData);
                        this.mElem.innerHTML = this.rendered;
                } else {
                        throw new ReferenceError("Template is required in call to fragment "+ this.mId);
                }

        }

        // set a new id, this fragment change the dom objetive
        setNewId(id) {
                this.mId = id;
                this.mElem = document.getElementById(this.mId);
        }

        // receives a object {template: 'foo', data:'bar'} for render
        // if pass a template recompiled this.mFn and then data is required
        // if pass a data only, use this.mFn
        // if pass a template only, recompile this.mFn and render with data = undefined
        // if not pass parameters, render this.mFn with undefined
        render(self = {}) {
                if (self.template && self.data ){
                        this.mFn = doT.template(self.template);
                        const renderTmp = this.mFn(self.data);
                        if( renderTmp != this.rendered ) {
                                this.mElem.innerHTML = renderTmp;
                                this.rendered = renderTmp;
                                this.mData = self.data;
                        }
                        return;
                }
                else if (self.data){
                        const renderTmp = this.mFn(self.data);
                        if( renderTmp != this.rendered ) {
                                this.mElem.innerHTML = renderTmp;
                                this.rendered = renderTmp;
                                this.mData = self.data;
                        }
                        return;
                }
                else if (self.template) {
                        this.mFn = doT.template(self.template);
                        const renderTmp = this.mFn(undefined);
                        if( renderTmp != this.rendered ) {
                                this.mElem.innerHTML = this.rendered;
                                this.rendered =  renderTmp;
                        }
                        return;
                }
                else{
                        const renderTmp = this.mFn( this.mData );
                        if( renderTmp != this.rendered ) {
                                this.mElem.innerHTML = this.rendered;
                                this.rendered =  renderTmp;
                        }
                        return;
                }
        }

        getRenderStr(self = {}) {
                if (self.template && self.data ){
                        this.mFn = doT.template(self.template);
                        return this.mFn(self.data);
                }
                else if (self.data){
                        return this.mFn(self.data);
                }
                else if (self.template) {
                        this.mFn = doT.template(self.template);
                        return this.mFn( undefined );
                }
                else{
                        return this.mFn( undefined );
                }
        }

        prop(dicProps) {
                var key = '';
                var arrKeys = Object.keys(dicProps);
                for (var i = 0, k = arrKeys.length; i < k; i++) {
                        key = arrKeys[i];
                        this.mElem.setAttribute(key, dicProps[key]);
                }
        }

        addClass(classesArray) {
                if( typeof classesArray === 'string' ) {
                        classesArray = [ classesArray ];
                } else if( typeof classesArray === 'number' ) {
                        classesArray = [ ""+classesArray ];
                }

                for (var i = 0, k = classesArray.length; i < k; i++) {
                        this.mElem.classList.add(classesArray[i]);
                }
        }

        // classesDictionary is of the form {oldClass: newClass,..}
        changeClass(classesDictionary) {
                var key = '',
                        className = this.mElem.className,
                        arrClasses = className.split('\\s+'),
                        arrKeys = Object.keys(classesDictionary);
                for (var i = 0, k = arrKeys.length ; i != k ; i++) {
                        key = arrKeys[i];
                        if ( arrClasses.find((el)=>{ el == key }) ){
                                this.mElem.classList.remove(key);
                                this.mElem.classList.add(classesDictionary[key]);
                        }
                }
        }

        toggleClass(classString) {
                if( typeof classesArray === 'number' ) {
                        classString = classString.toString();
                }
                this.mElem.classList.toggle(classString);
        }

        deleteClass(classesArray) {
                if( typeof classesArray === 'string' ) {
                        classesArray = [ classesArray ];
                } else if( typeof classesArray === 'number' ) {
                        classesArray = [ ""+classesArray ];
                }

                for (var i = 0, k = classesArray.length ; i != k ; i++) {
                        this.mElem.classList.remove(classesArray[i]);
                }
        }

        hide() {
                this.mElem.style.display = "None";
        }

        show() {
                this.mElem.style.display = "";
        }

        parent(){
                return this.mElem.parentNode;
        }

        clear() {
                this.mElem.innerHTML= '';
        }
}

module.exports = Fragment;

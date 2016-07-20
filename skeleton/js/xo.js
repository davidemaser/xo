/**
 * Copyright (c) <2016> <David Maser>
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software
 * and associated documentation files (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge, publish, distribute,
 * sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or
 * substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
 * BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
 * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
var xj = jQuery.noConflict(),
    xo = {
    config: {
        loadPathDefault: '../dist/js/',
        loadPathExtension: '.js',
        ajax:{
            pathDefault: '../dist/json/',
            fileExtension: '.json',
            defaultMethod: 'get',
            defaultDataType: 'json'
        },
        sessionStorageKey: 'xo-',
        sessionFlushRule: false,
        dataLoadedItems:[],
        showErrorLog: true,
        showErrorLogDate: false,
        animationSpeed: 500,
        domParentNode: 'body',
        defaultXOWrapper: 'section',
        defaultXOPage: 'index',
        defaultStickyOffset : 300,
        /*
         initialise specific components and widgets
         as needed.
         */
        init:{
            accordion:true,
            data:false,
            dropdowns:true,
            forms: true,
            gutter: true,
            modal: true,
            nav: true,
            panel: true,
            placeholders:false,
            poster:false,
            sticky: true,
            tabs: true,
            video: false
        },
        /*
        app is running so set a flag and a key
        to force reinitialisation.
         */
        appRunning: false,
        reInitKey: '0188846aREvvS7'
    },
    _define: {
        backlog: function () {
        },
        domload: function () {
        },
        dataready: function () {
        },
        domready: function () {
        },
        targetclick: function () {
        },
        targetswipe: function () {
        }
    },
    _throw: {
        dataerror: function () {
        },
        datatimeout: function () {
        },
        nullified: function () {
        },
        overflow: function () {
        }
    },
    init: function (advise, callback) {
        if(xo.config.appRunning !== true) {
            xo.pageSetUp('html', 'xo', 'true', 'xo set');
            xo.config.init.accordion == true ? xo.accordionBuilder() : null;
            xo.config.init.data == true ? xo.layoutToPage() : null;
            xo.config.init.dropdowns == true ? xo.dropDownInit() : null;
            xo.config.init.forms == true ? xo.formToPage() : null;
            xo.config.init.gutter == true ? xo.gutter('init') : null;
            xo.config.init.modal == true ? xo.modal('init') : null;
            xo.config.init.nav == true ? xo.navInit() : null;
            xo.config.init.panel == true ? xo.panel() : null;
            xo.config.init.placeholders == true ? xo.placeholder() : null;
            xo.config.init.poster == true ? xo.poster() : null;
            xo.config.init.sticky == true ? xo.sticky() : null;
            xo.config.init.tabs == true ? xo.tabBuilder() : null;
            xo.config.init.video == true ? xo.video() : null;
            xo.initMouseEvents();
            xo.config.appRunning = true;
            advise == true ? xo.log('xo is running') : null;
            if (callback && typeof(callback) === "function") {
                callback();
            }
        } else {
            xo.log('An XO instance is already running');
        }
    },
    saveLoadedItems:function(item){
        xo.config.dataLoadedItems.push(item);
    },
    checkLoadedItems:function(item){
        if(xo.config.dataLoadedItems.indexOf(item)>-1){
            return true;
        }
    },
    pageSetUp: function (domItem, domPrefix, xoMin, xoClass) {
        if (xo.config.appRunning !== true) {
            xj(domItem).attr({
                'xo-prefix': domPrefix,
                'xo-min': xoMin
            }).addClass(xoClass);
            xj(xo.config.domParentNode).contents().wrapAll('<' + xo.config.defaultXOWrapper + ' class="xo" xo-reserved="true">');
        } else {
            xo.log('An XO instance is already running');
        }
    },
    loadSuccess: function () {
        xj(xo.config.domParentNode).css('opacity', 1);
    },
    loadExternal: function (scriptPath, scriptURI, scriptExt) {
        /*
        load external scripts asynchronously and execute their
        functions. This can be used to load jQuery plugins or
        other components after the main xo core has been built
         */
        var a = scriptPath == undefined || null || ' ' ? xo.config.loadPathDefault : scriptPath,
            b = scriptURI == undefined ? "" : scriptURI,
            c = scriptExt == undefined || null || ' ' ? xo.config.loadPathExtension : scriptExt,
            d = a + b + c;
        xj.getScript(d, function (xoCore) {
            eval(xoCore);
        });
    },
    /*
    utility functions
     */
    log: function (e) {
        var a = navigator.vendor.indexOf("Google") > -1,
            b = xo.config.showErrorLogDate == true ? new Date() : "";
        if (xo.config.showErrorLog == true) {
            a == true ? console.warn(e, b) : console.log(e, b);
        }
    },
    prompt: function (message, url) {
        var r = confirm(message);
        if (r == true) {
            window.location = url;
        }
        document.getElementById("demo").innerHTML = txt;
    },
    createUniqueCode: function () {
        var a = new Date().valueOf(),
            b = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
        return a + b;
    },
    countDomTags: function (pa) {
        pa = pa || document;
        var O = {},
            A = [], tag, D = pa.getElementsByTagName('*');
        D = A.slice.apply(D, [0, D.length]);
        while (D.length) {
            tag = D.shift().tagName.toLowerCase();
            if (!O[tag]) O[tag] = 0;
            O[tag] += 1;
        }
        for (var p in O) {
            A[A.length] = p + ': ' + O[p];
        }
        A.sort(function (a, b) {
            a = a.split(':')[1] * 1;
            b = b.split(':')[1] * 1;
            return b - a;
        });
        return A.join(', ');
    },
    placeholder:function(){
        /*
        creates a placeholder image from an img tag that
        has the xo-type attribute placeholder. Placeholder
        uses placeholdit.imgix.net to get the image.
        Requires xo-type-param. Param should be:
        ~text?txtsize=33&txt=Your Text×150&w=350&h=150
         */
        var _obj = '[xo-type="placeholder"]';
        xj(_obj).each(function(){
            var _sourceURL = 'https://placeholdit.imgix.net/',
                _sourcePARAM = xj(this).attr('xo-type-param');
            xj(this).attr('src',_sourceURL+_sourcePARAM);
        })
    },
    /*
     end utility functions
     */
    switchNavMode: function () {
        //not implemented yet
        var a = xj('html').attr('xo-prefix'),
            b = xj(xo.config.domParentNode).find(xo.config.defaultXOWrapper),
            c = b.attr('xo-reserved'),
            d = c == true ? xo.config.ajax.pathDefault : scriptPath;
    },
    animate: function (obj, type, speed, length) {
        //not implemented yet
    },
    getData: function (scriptPath, scriptURI, method, identifier, target, flush) {
        /*
        query a json file or json response object.
        Loaded data can be saved to session, parse and
        displayed or new functions can be created to
        handle specific data formats.
        The ajax call returns a data object.
         */
        var _path = scriptPath == undefined || null || ' ' ? xo.config.ajax.pathDefault : scriptPath,
            _uri = scriptURI == undefined ? "" : scriptURI,
            _extension = xo.config.ajax.fileExtension,
            _dataURL = _path + _uri + _extension;
        return xj.ajax({
            dataType: xo.config.ajax.defaultDataType,
            url: _dataURL,
            type: xo.config.ajax.defaultMethod,
            statusCode: {
                404: function () {
                    xo.log('XO can\'t load that file');
                },
                500: function () {
                    xo.log('the server has encountered an internal error');
                },
                502: function () {
                    xo.log('bad gateway');
                },
                503: function () {
                    xo.log('the service is unavailable');
                },
                504: function () {
                    xo.log('the gateway has timed out');
                }

            }
        }).success(function (data) {
            if (method == 'p') {
                xo.parseData(data, true, target);
            } else if (method == 's') {
                xo.saveDataToSession(JSON.stringify(data), 's', xo.config.sessionStorageKey, identifier);
            } else if (method == 'b') {
                if (sessionStorage.getItem(xo.config.sessionStorageKey + identifier) === null) {
                    xo.saveDataToSession(JSON.stringify(data), 's', xo.config.sessionStorageKey, identifier);
                    xo.log('Saved ' + xo.config.sessionStorageKey + identifier + ' to session storage');
                }
                xo.getDataFromSession('xo', identifier, true, flush||xo.config.sessionFlushRule);
            }
        }).error(function () {
            xo.log('ajax can\'t load that file');
        });
    },
    parseData: function (data, parse, target) {
        //working on this one
        if (parse == true) {
            var _data = JSON.parse(data);
        }
        xj(target).append(_data);
    },
    saveDataToSession: function (data, method, key, id) {
        if (typeof(Storage) !== "undefined") {
            key = key == undefined || null || ' ' ? xo.config.sessionStorageKey : key;
            method == 's' ? sessionStorage.setItem(key + id, data) : localStorage.setItem(xo.config.sessionStorageKey + xo.createUniqueCode(), data);
        } else {
            xo.log('Sorry! No Web Storage support..');
        }
    },
    getDataFromSession: function (key, id, parse, flush) {
        var _data = sessionStorage.getItem(key + '-' + id);
        if (parse == true) {
            _data = JSON.parse(_data);
        }
        if(flush == true){
            sessionStorage.removeItem(key + '-' + id);
        }
        return _data;
    },
    trigger: function (type, passValue, message) {
        message = message || null;
        if (type == 'direct') {
            window.location = passValue;
        } else if (type == 'kill-modal'){
            xo.modal('kill-modal',passValue);
        } else if (type == 'prompt') {
            xo.prompt(message, passValue);
        }
    },
    tooltip: function (object, method) {
        if (method == 'add') {
            var tipText = xj(object).attr('xo-tooltip-text'),
                tipEnabled = xj(object).attr('xo-trigger') == 'tooltip',
                toolTipTop = Math.round(xj(object).offset().top),
                toolTipLeft = Math.round(xj(object).offset().left);
            if (tipEnabled == true) {
                var baseHTML = '<div class="tooltip" style="left:' + toolTipLeft + 'px;top:' + toolTipTop + 'px;">' + tipText + '</div>';
                xj(baseHTML).insertAfter(object);
            }
        } else if (method == 'delete') {
            xj('.tooltip').remove();
        }
    },
    sticky:function(){
        xj(window).scroll(function(){
            var _stickyObj = xj('[xo-span="sticky"]');
            if (xj(window).scrollTop() >= xo.config.defaultStickyOffset) {
                _stickyObj.addClass('sticky-fixed');
            }
            else {
                _stickyObj.removeClass('sticky-fixed');
            }
        });
    },
    panel: function () {
        xj('[xo-type="panel-group"]').each(function () {
            var _obj = '[xo-type="panel"]',
                _count = xj(this).children().length,
                _parent = xj(this).width();
            xj(this).find(_obj).each(function () {
                xj(this).css('width', (_parent / _count) - (_count+1));
            })
        });
    },
    getTemplateObjects: function (type, template,parent) {
        /*
        Template items are wrapped in double curly brackets ({{}})
        Comma (,) splits template items.
        Brackets ([]) delimit action items.
        Double hyphens (--) split action items.
        Items with multiple children are split with ampersand (@)
        Double bar symbols (||) split action items.
        Action items can
        var template = '{{title:This is the title}},{{body:This is the body}},{{buttons:Yes[action=xo-trigger--url=here.html]@No[action=xo-trigger--url=null]}}'
         */
        var _templateArray = template.split(','),
            _brutObject = [],
            _itemHTML = '';
        for(var i =0,ii=_templateArray.length;i<ii;i++){
            _brutObject.push({a:_templateArray[i].replace('{{','').replace('}}','').split(':')[0],b:_templateArray[i].replace('{{','').replace('}}','').split(':')[1]});
        }
        switch (type) {
            case 'modal':
                for(var j=0,jj=_brutObject.length;j<jj;j++){
                    if(_brutObject[j].a.indexOf('buttons')>-1){
                        var a = _brutObject[j].b.split('@');
                        if(a.length>1){
                            _itemHTML += '<div class="xo modal buttons">';
                            for(var k=0,kk=a.length;k<kk;k++){
                                var _tVal = a[k].split('action=')[1].split('--'),
                                    _tValA = _tVal[0];
                                    if(_tVal.length > 1) {
                                        var _tValB = _tVal[1].split('=')[0];
                                    }
                                    var _tMethod = _tValA+'="'+_tValB+'"',
                                    _tValue = _tValA+'-'+_tValB;
                                if(a[k].indexOf('url') > -1){
                                    var _tAction = a[k].split('url=')[1].split(']')[0] !== null && a[k].split('url=')[1].split(']')[0] !== 'null' ? a[k].split('url=')[1].split(']')[0] : parent;
                                }else if(a[k].indexOf('modal') > -1){
                                    _tAction = a[k].split('modal=')[1].split(']')[0] !== null && a[k].split('modal=')[1].split(']')[0] !== 'null' ? a[k].split('modal=')[1].split(']')[0] : parent;
                                }
                                _itemHTML += '<button ';
                                _itemHTML += _tMethod+' ';
                                _itemHTML += _tValue+'="'+_tAction+'"';
                                _itemHTML += '>'+a[k].split('[')[0]+'</button>';
                            }
                            _itemHTML += '</div>';
                        }
                    }else{
                        _itemHTML += '<div class="xo modal '+_brutObject[j].a+'">' + _brutObject[j].b + '</div>';
                    }
                }
                return _itemHTML;
                break;
            case 'popup':
                break;
        }
    },
    modal: function (method, template) {
        if(method !== 'kill-modal') {
            var _obj = '[xo-type="modal"]',
                _objName = xj(_obj).attr('xo-object-name'),
                _filterObj = '[xo-type="modal-filter"]',
                _filterCode = '<div xo-type="modal-filter"></div>',
                _inlineTemplate = xj(_obj).attr('xo-data-template');
            if (typeof _inlineTemplate !== undefined && _inlineTemplate !== false) {
                xj(_obj).contents().not('[xo-type="modal-toggle"]').remove();
                xj(_obj).append(xo.getTemplateObjects('modal', _inlineTemplate, _objName));
            } else if (template !== typeof undefined && template !== false) {
                xj(_obj).contents().not('[xo-type="modal-toggle"]').remove(); //empty modal content to avoid duplicates.
                xj(_obj).append(xo.getTemplateObjects('modal', template));
            }
            if (xj(_obj).length > 0) {
                var _state = xj(_obj).attr('xo-state');
            }
            if (method == 'init') {
                xj(_obj).prepend('<div xo-type="modal-toggle">X</div>');
                xj(_obj).wrap('<div class="modal-wrapper" xo-state="closed">');
            } else {
                if (_state == 'open') {
                    xj(_obj).attr('xo-state', 'closed');
                    xj(_obj).parent().attr('xo-state', 'closed');
                    xj(_filterObj).animate({opacity: 0}, xo.config.animationSpeed, function () {
                        xj(_filterObj).remove();
                    });
                } else if (_state == 'closed') {
                    xj(xo.config.defaultXOWrapper + '.xo').prepend(_filterCode);
                    xj(_filterObj).animate({opacity: 1}, xo.config.animationSpeed, function () {
                        xj(_obj).attr('xo-state', 'open');
                        xj(_obj).parent().attr('xo-state', 'open');
                    });
                }
            }
        }else{
            xj('[xo-object-name="'+template+'"]').attr('xo-state','closed').parent().attr('xo-state','closed');
            xj('[xo-type="modal-filter"]').remove();
        }
    },
    gutter: function (method,parent) {
        /*
        creates an animatable gutter instance out of any html element. XO parameters
        define where it is placed and what it's initial state is to be. You can place
        as many XO gutters on your page as long as you make sure to give each one a
        unique xo-object-name value. Toggles for a particular gutter can be created
        by adding the xo-parent attribute
        i.e. <a xo-type="gutter-toggle" xo-parent="left-gutter">
        */
        var _baseObj = '[xo-type="gutter"]';
        //check if a gutter exists
        if(xj(_baseObj).length !== 0) {
            var _obj = parent !== null && parent !== undefined ? _baseObj + '[xo-object-name="' + parent + '"]' : _baseObj;
            var _filterObj = '[xo-type="gutter-filter"]',
                _filterCode = '<div xo-type="gutter-filter" xo-parent="' + parent + '"></div>';
            if (xj(_obj).length > 0) {
                var _state = xj(_obj).attr('xo-state'),
                    _width = xj(_obj).width(),
                    _param = xj(_obj).attr('xo-type-param');
            }
            if (method == 'init') {
                /*
                 loop through each gutter object to give each of
                 them and their enclosed close buttons and opacity
                 filters the correct values and parameters
                 */
                xj(_baseObj).each(function () {
                    var _p = xj(this).attr('xo-object-name'),
                        _width = xj(_obj).width();
                    xj(this).prepend('<div xo-type="gutter-toggle" xo-parent="' + _p + '">X</div>');
                    if (xj(this).attr('xo-state') == 'closed') {
                        xj(this).css(xj(this).attr('xo-type-param'), -_width);
                    }
                });
            } else {
                _width = xj(_obj).width();
                if (_state == 'open') {
                    if (_param == 'left') {
                        xj(_obj).animate({left: -_width}, xo.config.animationSpeed, function () {
                            xj(_obj).attr('xo-state', 'closed')
                        });
                    } else if (_param == 'right') {
                        xj(_obj).animate({right: -_width}, xo.config.animationSpeed, function () {
                            xj(_obj).attr('xo-state', 'closed')
                        });
                    }
                    xj(_filterObj).animate({opacity: 0}, xo.config.animationSpeed, function () {
                        xj(_filterObj).remove();
                    });

                } else if (_state == 'closed') {
                    if (_param == 'left') {
                        xj(_obj).animate({left: "0"}, xo.config.animationSpeed);
                    } else if (_param == 'right') {
                        xj(_obj).animate({right: "0"}, xo.config.animationSpeed);
                    }
                    xj(xo.config.defaultXOWrapper + '.xo').prepend(_filterCode);
                    xj(_filterObj).animate({opacity: 1}, xo.config.animationSpeed);
                    xj(_obj).attr('xo-state', 'open');
                }
            }
        }
    },
    video: function () {
        /*
        creates a video instance on the page. Writes
        the code necessary inside the html object that
        has the xo-type video. XO params define the
        source url, video format, etc..
         */
        xj('[xo-type="video"]').each(function () {
            var _obj = '[xo-type="video"]',
                _vdoW = xj(_obj).attr('xo-video-width') || 'auto',
                _vdoH = xj(_obj).attr('xo-video-height') || 'auto',
                _vdoS = xj(_obj).attr('xo-video-src'),
                _vdoT = xj(_obj).attr('xo-video-format'),
                _vdoC = xj(_obj).attr('xo-video-controls'),
                _vdoA = xj(_obj).attr('xo-video-autoplay'),
                _vdo = '<video width="' + _vdoW + '" height="' + _vdoH + '"';
            if (_vdoC == 'true') {
                _vdo += ' controls';
            }
            if (_vdoA == 'true') {
                _vdo += ' autoplay'
            }
            _vdo += '>';
            _vdo += '<source src="' + _vdoS + '" type="video/' + _vdoT + '">';
            _vdo += 'Your browser does not support the video tag.';
            _vdo += '</video>';
            xj(_obj).contents().remove();//removes content from the video placeholder
            xj(_obj).append(_vdo);
        })
    },
    formToPage: function () {
        /*
         function launched by init. Cycles through all objects
         on the page that have the xo-type="form" attribute and
         injects the correct form into them by calling the
         formBuilder function.
         */
        xj('[xo-type="form"]').each(function () {
            var _formTarget = xj(this).attr('xo-object-name');
            xo.formBuilder('forms/' + _formTarget, _formTarget, _formTarget);
        })
    },
    formBuilder: function (source, target, host) {
        var _tempData = xo.getData(null, source, 'b', target, false),
            _tempArray = [],
            _tempOptions = '[',
            _tempRadioOptions = '[',
            _tempCheckOptions = '[',
            _tempDataListOptions = '[',
            _sessionSourceLoaded = xo.checkLoadedItems(xo.config.sessionStorageKey+host);
        if(_sessionSourceLoaded !== true) {
            _tempData.success(function (data) {
                var _initData = [],
                    _processData = data.form;
                _initData.push({
                    action: data.formAction,
                    method: data.formMethod,
                    id: data.formId,
                    class: data.formClass
                });
                Object.keys(_processData).forEach(function (key) {
                    switch (_processData[key].item) {
                        case 'select':
                            if (typeof _processData[key].option === 'object') {
                                var _optionDepth = _processData[key].option.length;
                                for (var o = 0; o < _optionDepth; o++) {
                                    _tempOptions += '{"optionName":"' + _processData[key].option[o].name + '","optionValue":"' + _processData[key].option[o].value + '"';
                                    _tempOptions += _processData[key].option[o].selected == true ? ',"optionSelected":true' : ',"optionSelected":false';
                                    _tempOptions += '}';
                                    if (o < _optionDepth - 1) {
                                        _tempOptions += ',';
                                    }
                                }
                                _tempOptions += ']';
                                _tempOptions = JSON.parse(_tempOptions);
                            }
                            break;
                        case 'radiogroup':
                            if (typeof _processData[key].option === 'object') {
                                _optionDepth = _processData[key].option.length;
                                for (o = 0; o < _optionDepth; o++) {
                                    _tempRadioOptions += '{"optionName":"' + _processData[key].option[o].name + '","optionValue":"' + _processData[key].option[o].value + '"';
                                    _tempRadioOptions += _processData[key].option[o].checked == true ? ',"optionChecked":true' : ',"optionChecked":false';
                                    _tempRadioOptions += '}';
                                    if (o < _optionDepth - 1) {
                                        _tempRadioOptions += ',';
                                    }
                                }
                                _tempRadioOptions += ']';
                                _tempRadioOptions = JSON.parse(_tempRadioOptions);
                            }
                            break;
                        case 'checkbox':
                            if (typeof _processData[key].option === 'object') {
                                _optionDepth = _processData[key].option.length;
                                for (o = 0; o < _optionDepth; o++) {
                                    _tempCheckOptions += '{"optionName":"' + _processData[key].option[o].name + '","optionValue":"' + _processData[key].option[o].value + '"';
                                    _tempCheckOptions += _processData[key].option[o].checked == true ? ',"optionChecked":true' : ',"optionChecked":false';
                                    _tempCheckOptions += '}';
                                    if (o < _optionDepth - 1) {
                                        _tempCheckOptions += ',';
                                    }
                                }
                                _tempCheckOptions += ']';
                                _tempCheckOptions = JSON.parse(_tempCheckOptions);
                            }
                            break;
                        case 'datalist':
                            if (typeof _processData[key].option === 'object') {
                                _optionDepth = _processData[key].option.length;
                                for (o = 0; o < _optionDepth; o++) {
                                    _tempDataListOptions += '{"optionValue":"' + _processData[key].option[o].value + '"}';
                                    if (o < _optionDepth - 1) {
                                        _tempDataListOptions += ',';
                                    }
                                }
                                _tempDataListOptions += ']';
                                _tempDataListOptions = JSON.parse(_tempDataListOptions);
                            }
                            break;
                    }
                    _tempArray.push({
                        item: _processData[key].item,
                        name: _processData[key].name,
                        label: _processData[key].label || null,
                        class: _processData[key].class || null,
                        id: _processData[key].id || null,
                        required: _processData[key].required || null,
                        multiple: _processData[key].multiple || null,
                        placeholder: _processData[key].placeholder || null,
                        value: _processData[key].value || null,
                        min: _processData[key].min - length || null,
                        max: _processData[key].max - length || null,
                        rows: _processData[key].rows || null,
                        cols: _processData[key].cols || null,
                        submit: _processData[key].submit || null,
                        options: _tempOptions || _tempRadioOptions || _tempCheckOptions || _tempDataListOptions
                    });
                });
                var _formLength = _tempArray.length;
                for (var i = 0; i < _formLength; i++) {
                    switch (_tempArray[i].item) {
                        case 'text':
                            var _formCode = '<div class="form-line ' + _tempArray[i].item + '">';
                            _formCode += _tempArray[i].label !== null ? '<label for="' + _tempArray[i].name + '">' + _tempArray[i].label + '</label>' : '';
                            _formCode += '<input type="text"';
                            _formCode += _tempArray[i].name !== null ? ' name="' + _tempArray[i].name + '"' : '';
                            _formCode += _tempArray[i].class !== null ? ' class="' + _tempArray[i].class + '"' : '';
                            _formCode += _tempArray[i].id !== null ? ' id="' + _tempArray[i].id + '"' : '';
                            _formCode += _tempArray[i].required !== null && _tempArray[i].required == true ? ' required' : '';
                            _formCode += _tempArray[i].placeholder !== null ? ' placeholder="' + _tempArray[i].placeholder + '"' : '';
                            _formCode += _tempArray[i].value !== null ? ' value="' + _tempArray[i].value + '"' : '';
                            _formCode += _tempArray[i].min !== null ? ' minlength="' + _tempArray[i].min + '"' : '';
                            _formCode += _tempArray[i].max !== null ? ' maxlength="' + _tempArray[i].max + '"' : '';
                            _formCode += '></div>';
                            break;
                        case 'textarea':
                            _formCode += '<div class="form-line ' + _tempArray[i].item + '">';
                            _formCode += _tempArray[i].label !== null ? '<label for="' + _tempArray[i].name + '">' + _tempArray[i].label + '</label>' : '';
                            _formCode += '<textarea';
                            _formCode += _tempArray[i].rows !== null ? ' rows="' + _tempArray[i].rows + '"' : '';
                            _formCode += _tempArray[i].cols !== null ? ' cols="' + _tempArray[i].cols + '"' : '';
                            _formCode += _tempArray[i].name !== null ? ' name="' + _tempArray[i].name + '"' : '';
                            _formCode += _tempArray[i].class !== null ? ' class="' + _tempArray[i].class + '"' : '';
                            _formCode += _tempArray[i].id !== null ? ' id="' + _tempArray[i].id + '"' : '';
                            _formCode += _tempArray[i].required !== null && _tempArray[i].required == true ? ' required' : '';
                            _formCode += _tempArray[i].placeholder !== null ? ' placeholder="' + _tempArray[i].placeholder + '"' : '';
                            _formCode += _tempArray[i].max !== null ? ' maxlength="' + _tempArray[i].max + '"' : '';
                            _formCode += '></textarea></div>';
                            break;
                        case 'select':
                            _formCode += '<div class="form-line ' + _tempArray[i].item + '">';
                            _formCode += _tempArray[i].label !== null ? '<label for="' + _tempArray[i].name + '">' + _tempArray[i].label + '</label>' : '';
                            _formCode += '<select';
                            _formCode += _tempArray[i].name !== null ? ' name="' + _tempArray[i].name + '"' : '';
                            _formCode += _tempArray[i].required !== null && _tempArray[i].required == true ? ' required' : '';
                            _formCode += _tempArray[i].multiple !== null && _tempArray[i].multiple == true ? ' multiple' : '';
                            _formCode += _tempArray[i].class !== null ? ' class="' + _tempArray[i].class + '"' : '';
                            _formCode += _tempArray[i].id !== null ? ' id="' + _tempArray[i].id + '"' : '';
                            _formCode += '>';
                            for (var j = 0, jj = _tempArray[i].options.length; j < jj; j++) {
                                _formCode += '<option';
                                _formCode += _tempArray[i].options[j].optionSelected !== null && _tempArray[i].options[j].optionSelected == true ? ' selected' : '';
                                _formCode += ' value="' + _tempArray[i].options[j].optionValue + '">';
                                _formCode += _tempArray[i].options[j].optionName + '</option>';
                            }
                            _formCode += '</select></div>';
                            break;
                        case 'radiogroup':
                            _formCode += '<div class="form-line ' + _tempArray[i].item + '">';
                            _formCode += _tempArray[i].label !== null ? '<label for="' + _tempArray[i].name + '">' + _tempArray[i].label + '</label>' : '';
                            for (var k = 0, kk = _tempArray[i].options.length; k < kk; k++) {
                                _formCode += '<input type="radio"';
                                _formCode += ' name="' + _tempArray[i].name + '"';
                                _formCode += _tempArray[i].options[k].optionChecked !== null && _tempArray[i].options[k].optionChecked == true ? ' checked' : '';
                                _formCode += ' value="' + _tempArray[i].options[k].optionValue + '">';
                            }
                            _formCode += '</div>';
                            break;
                        case 'checkbox':
                            _formCode += '<div class="form-line ' + _tempArray[i].item + '">';
                            _formCode += _tempArray[i].label !== null ? '<label for="' + _tempArray[i].name + '">' + _tempArray[i].label + '</label>' : '';
                            for (var l = 0, ll = _tempArray[i].options.length; l < ll; l++) {
                                _formCode += '<input type="checkbox"';
                                _formCode += ' name="' + _tempArray[i].name + '"';
                                _formCode += _tempArray[i].options[l].optionChecked !== null && _tempArray[i].options[l].optionChecked == true ? ' checked' : '';
                                _formCode += ' value="' + _tempArray[i].options[l].optionValue + '">';
                            }
                            _formCode += '</div>';
                            break;
                        case 'datalist':
                            _formCode += '<div class="form-line ' + _tempArray[i].item + '">';
                            _formCode += _tempArray[i].label !== null ? '<label for="' + _tempArray[i].name + '">' + _tempArray[i].label + '</label>' : '';
                            _formCode += '<input list="' + _tempArray[i].id + '" name="' + _tempArray[i].name + '">';
                            _formCode += '<datalist id="' + _tempArray[i].id + '">';
                            for (var m = 0, mm = _tempArray[i].options.length; m < mm; m++) {
                                _formCode += '<option value="' + _tempArray[i].options[m].optionValue + '">';
                            }
                            _formCode += '</datalist>';
                            _formCode += _tempArray[i].submit !== true ? '' : '<input type="submit">';
                            _formCode += '</div>';
                            break;
                    }
                }
                var _formPrepend = '<form action="' + _initData[0].action + '" method="' + _initData[0].method + '" id="' + _initData[0].id + '" class="' + _initData[0].class + '">',
                    _formAppend = '</form>';
                xj('[xo-object-name="' + host + '"]').append(_formPrepend + _formCode + _formAppend);
                xo.saveLoadedItems(xo.config.sessionStorageKey + host);
            });
        }else{
            xo.warningBar('attention','DATA LOADED','This form instance has already been loaded','body');
        }
    },
    layoutToPage: function () {
        /*
         function launched by init. Cycles through all objects
         on the page that have the xo-type="data" attribute and
         injects the correct form into them by calling the
         formBuilder function.
         */
        xj('[xo-type="data"]').each(function () {
            var _dataTarget = xj(this).attr('xo-object-name'),
                _dataSource = xj(this).attr('xo-data-source');
            xo.layoutBuilder(_dataSource, _dataTarget, _dataTarget);
        })
    },
    layoutBuilder:function(source, target, host){
        var _tempData = (xo.getData(null, source, 'b', target,false)),
            _tempArray = [],
            _tempOptions = '[',
            _sessionSourceLoaded = xo.checkLoadedItems(xo.config.sessionStorageKey+host);
        if(_sessionSourceLoaded !== true) {
            _tempData.success(function (data) {
                var _processData = data.page;
                Object.keys(_processData).forEach(function (key) {
                    if (typeof _processData[key].node === 'object') {
                        var _optionDepth = _processData[key].node.length;
                        for (var o = 0; o < _optionDepth; o++) {
                            _tempOptions += '{"nodeType":"' + _processData[key].node[o].type + '",';
                            _tempOptions += _processData[key].node[o].class !== null ? '"nodeClass":"' + _processData[key].node[o].class + '",' : '"nodeClass":null,';
                            _tempOptions += _processData[key].node[o].id !== null ? '"nodeID":"' + _processData[key].node[o].id + '",' : '"nodeId":null,';
                            _tempOptions += _processData[key].node[o].xoType !== null ? '"nodexoType":"' + _processData[key].node[o].xoType + '",' : '"nodexoType":null,';
                            _tempOptions += _processData[key].node[o].xoState !== null ? '"nodexoState":"' + _processData[key].node[o].xoState + '",' : '"nodexoState":null,';
                            _tempOptions += _processData[key].node[o].xoSpan !== null ? '"nodexoSpan":"' + _processData[key].node[o].xoSpan + '",' : '"nodexoSpan":null,';
                            _tempOptions += _processData[key].node[o].xoObjectName !== null ? '"nodexoObjectName":"' + _processData[key].node[o].xoObjectName + '",' : '"nodexoObjectName":null,';
                            _tempOptions += _processData[key].node[o].xoTypeParam !== null ? '"nodexoTypeParam":"' + _processData[key].node[o].xoTypeParam + '",' : '"nodexoTypeParam":null,';
                            _tempOptions += _processData[key].node[o].xoParent !== null ? '"nodexoParent":"' + _processData[key].node[o].xoParent + '",' : '"nodexoParent":null,';
                            _tempOptions += '"nodeContent":"' + _processData[key].node[o].content + '"';
                            _tempOptions += '}';
                            if (o < _optionDepth - 1) {
                                _tempOptions += ',';
                            }
                        }
                        _tempOptions += ']';
                        _tempOptions = JSON.parse(_tempOptions);
                    }
                    _tempArray.push({
                        page: _processData[key].id,
                        title: _processData[key].title,
                        metas: _processData[key].metas,
                        node: _tempOptions
                    });
                    var _layoutCode = '',
                        _baseNode = _tempArray[0].node;
                    for (var i = 0, ii = _baseNode.length; i < ii; i++) {
                        _layoutCode += '<' + _baseNode[i].nodeType;
                        _layoutCode += _baseNode[i].nodexoType !== null && _baseNode[i].nodexoType !== undefined ? ' xo-type="' + _baseNode[i].nodexoType + '"' : '';
                        _layoutCode += _baseNode[i].nodeClass !== null && _baseNode[i].nodeClass !== undefined ? ' class="' + _baseNode[i].nodeClass + '"' : '';
                        _layoutCode += _baseNode[i].nodeID !== null && _baseNode[i].nodeID !== undefined ? ' id="' + _baseNode[i].nodeID + '"' : '';
                        _layoutCode += _baseNode[i].nodexoState !== null && _baseNode[i].nodexoState !== undefined ? ' xo-state="' + _baseNode[i].nodexoState + '"' : '';
                        _layoutCode += _baseNode[i].nodexoSpan !== null && _baseNode[i].nodexoSpan !== undefined ? ' xo-span="' + _baseNode[i].nodexoSpan + '"' : '';
                        _layoutCode += _baseNode[i].nodexoObjectName !== null && _baseNode[i].nodexoObjectName !== undefined ? ' xo-object-name="' + _baseNode[i].nodexoObjectName + '"' : '';
                        _layoutCode += _baseNode[i].nodexoTypeParam !== null && _baseNode[i].nodexoTypeParam !== undefined ? ' xo-type-param="' + _baseNode[i].nodexoTypeParam + '"' : '';
                        _layoutCode += _baseNode[i].nodexoParent !== null && _baseNode[i].nodexoParent !== undefined ? ' xo-parent="' + _baseNode[i].nodexoParent + '"' : '';
                        _layoutCode += '>' + _baseNode[i].nodeContent + '</' + _baseNode[i].nodeType + '>';
                    }
                    xj('[xo-object-name="' + host + '"]').append(_layoutCode);
                    xo.saveLoadedItems(xo.config.sessionStorageKey + host);
                });
            });
        }else{
            xo.warningBar('attention','DATA LOADED','This data instance has already been loaded','body');
        }
    },
    dropDownInit:function(){
        /*
         initializes the display of dropdown navigation bars as needed.
         Feature can be enabled in xo.config. dropDownInit cycles
         through the page dom to find xo-type dropdown objects
         and displays the dropdowns in place. Dropdowns can be static
         or json.
         */
        xj('[xo-type="dropdown"]').each(function () {
            var _buttonLabel = xj(this).attr('xo-dropdown-button'),
                _objectName = xj(this).attr('xo-object-name');
            xo.dropDownBuilder(_buttonLabel, _objectName, 'static', null);
        });
        xj('[xo-type="jsondropdown"]').each(function () {
            var _buttonLabel = xj(this).attr('xo-dropdown-button'),
                _objectName = xj(this).attr('xo-object-name'),
                _objectSource = xj(this).attr('xo-data-source');
            xo.dropDownBuilder(_buttonLabel, _objectName, 'json',_objectSource);
        })
    },
    dropDownBuilder:function(button,object,type,source){
        /**
         * button @type=string : button text
         * object @type=string : page dom element
         * type @type=string : either static or json
         * source @type= string : json source url
         */
        switch(type){
            case 'static':
                var _this = '[xo-object-name="'+object+'"]',
                    _initialState = xj(_this).attr('xo-state'),
                    _buttonHTML = '<button xo-type="dropdown-button" xo-parent="'+object+'">'+button+'</button>';
                xj(_this).prepend(_buttonHTML).find('ul').attr('xo-object-name',object).attr('xo-state',_initialState);
                break;
            case 'json':
                    _this = '[xo-object-name="'+object+'"]',
                    _initialState = xj(_this).attr('xo-state'),
                    _buttonHTML = '<button xo-type="dropdown-button" xo-parent="'+object+'">'+button+'</button>';
                var _tempData = xo.getData(null, source, 'b', object,false),
                    _sessionSourceLoaded = xo.checkLoadedItems(xo.config.sessionStorageKey+object),
                    _dropdownHTML = '';
                if(_sessionSourceLoaded !== true) {
                    _tempData.success(function (data) {
                        var _processData = data.dropdown;
                        _dropdownHTML += '<ul xo-object-name="'+object+'" xo-state="'+_initialState+'">';
                        Object.keys(_processData).forEach(function (key) {
                            _dropdownHTML += '<li';
                            _dropdownHTML += _processData[key].xotype !== null && _processData[key].xotype !== undefined ? ' xo-type="'+_processData[key].xotype+'"' : '';
                            _dropdownHTML += _processData[key].xotrigger !== null && _processData[key].xotrigger !== undefined ? ' xo-trigger="'+_processData[key].xotrigger+'"' : '';
                            _dropdownHTML += _processData[key].xotriggerurl !== null && _processData[key].xotriggerurl !== undefined ? ' xo-trigger-url="'+_processData[key].xotriggerurl+'"' : '';
                            _dropdownHTML += _processData[key].xostate !== null && _processData[key].xostate !== undefined ? ' xo-state="'+_processData[key].xostate+'"' : '';
                            _dropdownHTML += _processData[key].xoobjectname !== null && _processData[key].xoobjectname !== undefined ? ' xo-object-name="'+_processData[key].xoobjectname+'"' : '';
                            _dropdownHTML += _processData[key].xoparent !== null && _processData[key].xoparent !== undefined ? ' xo-parent="'+_processData[key].xoparent+'"' : '';
                            _dropdownHTML += _processData[key].class !== null && _processData[key].class !== undefined ? ' class="'+_processData[key].class+'"' : '';
                            _dropdownHTML += _processData[key].id !== null && _processData[key].id !== undefined ? ' id="'+_processData[key].id+'"' : '';
                            _dropdownHTML += '>';
                            _dropdownHTML += _processData[key].content;
                            _dropdownHTML += '</li>';
                        });
                        _dropdownHTML += '</ul>';
                        xj(_this).prepend(_buttonHTML).find('ul').attr('xo-object-name',object).attr('xo-state',_initialState);
                        xj('[xo-object-name="' + object + '"]').append(_dropdownHTML);
                        xo.saveLoadedItems(xo.config.sessionStorageKey + object);
                    });
                }else{
                    xo.warningBar('attention','DATA LOADED','This data instance has already been loaded','body');
                }
                break;
        }
    },
    navInit:function(){
        /*
        initializes the display of navigation bars as needed.
        Feature can be enabled in xo.config. navInit cycles
        through the page dom to find xo-type navigation objects
        and displays the nav bar in place
         */
        xj('[xo-type="navigation"]').each(function () {
            var _objectName = xj(this).attr('xo-object-name'),
                _objectSource = xj(this).attr('xo-data-source');
            xo.navBuilder(_objectSource, _objectName);
        });
    },
    navBuilder:function(source, target){
        /*
        this function builds a navigation bar from
        a json file. Check the nav-bar.json file
        in dist/json/nav for the structure and
        options that are available.
        The navBuilder reuses functions and features
        such as buttons, dropdowns, form objects.
         */
        var _tempData = xo.getData(null, source, 'b', target,false),
            _tempArray = [],
            _sessionSourceLoaded = xo.checkLoadedItems(xo.config.sessionStorageKey+target);
        if(_sessionSourceLoaded !== true) {
            _tempData.success(function (data) {
                var _processData = data.nav;
                Object.keys(_processData).forEach(function (key) {
                    if (_processData[key].nodes !== null && _processData[key].nodes !== undefined && _processData[key].nodes !== "undefined" && typeof _processData[key].nodes === 'object') {
                        var _optionDepth = _processData[key].nodes.length,
                            _tempNodes = '[';
                        for (var o = 0; o < _optionDepth; o++) {
                            _tempNodes += '{"nodetype":"' + _processData[key].nodes[o].type + '"';
                            _tempNodes += _processData[key].nodes[o].class !== null && _processData[key].nodes[o].class !== "undefined" && _processData[key].nodes[o].class !== undefined ? ',"nodeclass":"' + _processData[key].nodes[o].class + '"' : '';
                            _tempNodes += _processData[key].nodes[o].id !== null && _processData[key].nodes[o].id !== "undefined" && _processData[key].nodes[o].id !== undefined ? ',"nodeid":"' + _processData[key].nodes[o].id + '"' : '';
                            _tempNodes += _processData[key].nodes[o].xotype !== null && _processData[key].nodes[o].xotype !== "undefined" && _processData[key].nodes[o].xotype !== undefined ? ',"nodexotype":"' + _processData[key].nodes[o].xotype + '"' : '';
                            _tempNodes += _processData[key].nodes[o].xostate !== null && _processData[key].nodes[o].xostate !== "undefined" && _processData[key].nodes[o].xostate !== undefined ? ',"nodexostate":"' + _processData[key].nodes[o].xostate + '"' : '';
                            _tempNodes += _processData[key].nodes[o].xoObjectName !== null && _processData[key].nodes[o].xoobjectname !== "undefined" && _processData[key].nodes[o].xoobjectname !== undefined ? ',"nodexoobjectname":"' + _processData[key].nodes[o].xoobjectname + '"' : '';
                            _tempNodes += _processData[key].nodes[o].xoParent !== null && _processData[key].nodes[o].xoparent !== "undefined" && _processData[key].nodes[o].xoparent !== undefined ? ',"nodexoparent":"' + _processData[key].nodes[o].xoparent + '"' : '';
                            _tempNodes += _processData[key].nodes[o].label !== null && _processData[key].nodes[o].label !== "undefined" && _processData[key].nodes[o].label !== undefined ? ',"nodecontent":"' + _processData[key].nodes[o].label + '"' : '';
                            _tempNodes += '}';
                            if (o < _optionDepth - 1) {
                                _tempNodes += ',';
                            }
                        }
                        _tempNodes += ']';
                        _tempNodes = JSON.parse(_tempNodes);
                    }
                    _tempArray.push({
                        type: _processData[key].type,
                        label: _processData[key].label,
                        url: _processData[key].url,
                        class: _processData[key].class,
                        id: _processData[key].id,
                        xotype: _processData[key].xotype,
                        xotrigger: _processData[key].xotrigger,
                        xotriggerurl:_processData[key].xotriggerurl,
                        xostate:_processData[key].xostate,
                        xoobjectname:_processData[key].xoobjectname,
                        xoparent:_processData[key].xoparent,
                        placeholder:_processData[key].placeholder,
                        button:_processData[key].buttonLabel,
                        node: _tempNodes
                    });
                });
                var _navCode = '';
                for (var i = 0, ii = _tempArray.length; i < ii; i++) {
                    switch (_tempArray[i].type) {
                        case 'icon':
                            _navCode += '<div class="nav-icon"';
                            _navCode += _tempArray[i].xostate !== null && _tempArray[i].xostate !== "undefined" && _tempArray[i].xostate !== undefined ? ' xo-state="' + _tempArray[i].xostate + '"' : '';
                            _navCode += _tempArray[i].xotype !== null && _tempArray[i].xotype !== "undefined" && _tempArray[i].xotype !== undefined ? ' xo-type="' + _tempArray[i].xotype + '"' : '';
                            _navCode += _tempArray[i].xoparent !== null && _tempArray[i].xoparent !== "undefined" && _tempArray[i].xoparent !== undefined ? ' xo-parent="' + _tempArray[i].xoparent + '"' : '';
                            _navCode += '>';
                            _navCode += _tempArray[i].class !== null && _tempArray[i].class !== "undefined" && _tempArray[i].class !== undefined ? '<span class="'+_tempArray[i].class+'"></span>' : '';
                            _navCode += '</div>';
                            break;
                        case 'image':
                            _navCode += '<img';
                            _navCode += _tempArray[i].xotype !== null && _tempArray[i].xotype !== "undefined" && _tempArray[i].xotype !== undefined ? ' xo-type="' + _tempArray[i].xotype + '"' : '';
                            _navCode += _tempArray[i].xotrigger !== null && _tempArray[i].xotrigger !== "undefined" && _tempArray[i].xotrigger !== undefined ? ' xo-trigger="' + _tempArray[i].xotrigger + '"' : '';
                            _navCode += _tempArray[i].xotriggerurl !== null && _tempArray[i].xotriggerurl !== "undefined" && _tempArray[i].xotriggerurl !== undefined ? ' xo-trigger-url="' + _tempArray[i].xotriggerurl + '"' : '';
                            _navCode += _tempArray[i].xostate !== null && _tempArray[i].xostate !== "undefined" && _tempArray[i].xostate !== undefined ? ' xo-state="' + _tempArray[i].xostate + '"' : '';
                            _navCode += _tempArray[i].xoobjectname !== null && _tempArray[i].xoobjectname !== "undefined" && _tempArray[i].xoobjectname !== undefined ? ' xo-object-name="' + _tempArray[i].xoobjectname + '"' : '';
                            _navCode += _tempArray[i].xoparent !== null && _tempArray[i].xoparent !== "undefined" && _tempArray[i].xoparent !== undefined ? ' xo-parent="' + _tempArray[i].xoparent + '"' : '';
                            _navCode += _tempArray[i].class !== null && _tempArray[i].class !== "undefined" && _tempArray[i].class !== undefined ? ' class="' + _tempArray[i].class + '"' : '';
                            _navCode += _tempArray[i].id !== null && _tempArray[i].id !== "undefined" && _tempArray[i].id !== undefined ? ' id="' + _tempArray[i].id + '"' : '';
                            _navCode += ' src="'+_tempArray[i].url;
                            _navCode += '" />';
                            break;
                        case 'button':
                            _navCode += '<button';
                            _navCode += _tempArray[i].xotype !== null && _tempArray[i].xotype !== "undefined" && _tempArray[i].xotype !== undefined ? ' xo-type="' + _tempArray[i].xotype + '"' : '';
                            _navCode += _tempArray[i].xotrigger !== null && _tempArray[i].xotrigger !== "undefined" && _tempArray[i].xotrigger !== undefined ? ' xo-trigger="' + _tempArray[i].xotrigger + '"' : '';
                            _navCode += _tempArray[i].xotriggerurl !== null && _tempArray[i].xotriggerurl !== "undefined" && _tempArray[i].xotriggerurl !== undefined ? ' xo-trigger-url="' + _tempArray[i].xotriggerurl + '"' : '';
                            _navCode += _tempArray[i].xostate !== null && _tempArray[i].xostate !== "undefined" && _tempArray[i].xostate !== undefined ? ' xo-state="' + _tempArray[i].xostate + '"' : '';
                            _navCode += _tempArray[i].xoobjectname !== null && _tempArray[i].xoobjectname !== "undefined" && _tempArray[i].xoobjectname !== undefined ? ' xo-object-name="' + _tempArray[i].xoobjectname + '"' : '';
                            _navCode += _tempArray[i].xoparent !== null && _tempArray[i].xoparent !== "undefined" && _tempArray[i].xoparent !== undefined ? ' xo-parent="' + _tempArray[i].xoparent + '"' : '';
                            _navCode += _tempArray[i].class !== null && _tempArray[i].class !== "undefined" && _tempArray[i].class !== undefined ? ' class="' + _tempArray[i].class + '"' : '';
                            _navCode += _tempArray[i].id !== null && _tempArray[i].id !== "undefined" && _tempArray[i].id !== undefined ? ' id="' + _tempArray[i].id + '"' : '';
                            _navCode += '>';
                            _navCode += _tempArray[i].label;
                            _navCode += '</button>';
                            break;
                        case 'search':
                            _navCode += '<form';
                            _navCode += _tempArray[i].xotype !== null && _tempArray[i].xotype !== "undefined" && _tempArray[i].xotype !== undefined ? ' xo-type="' + _tempArray[i].xotype + '"' : '';
                            _navCode += _tempArray[i].xotrigger !== null && _tempArray[i].xotrigger !== "undefined" && _tempArray[i].xotrigger !== undefined ? ' xo-trigger="' + _tempArray[i].xotrigger + '"' : '';
                            _navCode += _tempArray[i].xotriggerurl !== null && _tempArray[i].xotriggerurl !== "undefined" && _tempArray[i].xotriggerurl !== undefined ? ' xo-trigger-url="' + _tempArray[i].xotriggerurl + '"' : '';
                            _navCode += _tempArray[i].xostate !== null && _tempArray[i].xostate !== "undefined" && _tempArray[i].xostate !== undefined ? ' xo-state="' + _tempArray[i].xostate + '"' : '';
                            _navCode += _tempArray[i].xoobjectname !== null && _tempArray[i].xoobjectname !== "undefined" && _tempArray[i].xoobjectname !== undefined ? ' xo-object-name="' + _tempArray[i].xoobjectname + '"' : '';
                            _navCode += _tempArray[i].xoparent !== null && _tempArray[i].xoparent !== "undefined" && _tempArray[i].xoparent !== undefined ? ' xo-parent="' + _tempArray[i].xoparent + '"' : '';
                            _navCode += _tempArray[i].class !== null && _tempArray[i].class !== "undefined" && _tempArray[i].class !== undefined ? ' class="' + _tempArray[i].class + '"' : '';
                            _navCode += _tempArray[i].id !== null && _tempArray[i].id !== "undefined" && _tempArray[i].id !== undefined ? ' id="' + _tempArray[i].id + '"' : '';
                            _navCode += '><input type="text"';
                            _navCode += _tempArray[i].placeholder !== null && _tempArray[i].placeholder !== "undefined" && _tempArray[i].placeholder !== undefined ? ' placeholder="' + _tempArray[i].placeholder + '"' : '';
                            _navCode += '>';
                            _navCode += _tempArray[i].buttonLabel !== null && _tempArray[i].buttonLabel !== "undefined" && _tempArray[i].buttonLabel !== undefined ? '<input type="submit" value="'+_tempArray[i].buttonLabel+'">' : '';
                            _navCode += '</form>';
                            break;
                        case 'dropdown':
                            _navCode += '<div class="nav-dropdown" xo-state="closed">';
                            _navCode += '<button xo-type="'+_tempArray[i].xotype+'" xo-parent="'+_tempArray[i].xoparent+'" class="'+_tempArray[i].class+'">'+_tempArray[i].label+'</button>';
                            if(_tempArray[i].node !== null && _tempArray[i].node !== undefined && _tempArray[i].node !== "undefined" && _tempArray[i].node !== '') {
                                /*
                                 this creates a dropdown below the nav item
                                 (usually a button) if the json has child
                                 nodes. See the documentation for how this
                                 is used
                                 */
                                _navCode += '<ul xo-object-name="'+_tempArray[i].xoparent+'" xo-state="closed">';
                                for (var j = 0, jj = _tempArray[i].node.length; j < jj; j++) {
                                    if(_tempArray[i].node[j].nodetype == 'line'){
                                        _navCode += '<li xo-type="'+_tempArray[i].node[j].nodexotype+'" xo-state="'+_tempArray[i].node[j].nodexostate+'" xo-object-name="'+_tempArray[i].node[j].nodexoobjectname+'" xo-parent="'+_tempArray[i].node[j].nodexoparent+'" class="'+_tempArray[i].node[j].nodeclass+'" id="'+_tempArray[i].node[j].nodeid+'">'+_tempArray[i].node[j].nodecontent+'</li>';
                                    }else if(_tempArray[i].node[j].nodetype == 'seperator'){
                                        _navCode += '<li xo-type="dropdown-seperator"></li>';
                                    }
                                }
                            }
                            _navCode += '</div>';
                            break;
                    }

                }
                xj('[xo-object-name="'+target+'"]').append(_navCode);
            });
        }
    },
    warningBar:function(type, title, content, host){
        /*
         xo-type can be
         success : green bar
         attention : blue bar
         alert : yellow bar
         error : red bar
         */
        var _objectHTML = '<div xo-type="warning" xo-type-param="'+type+'" xo-state="open">';
        _objectHTML += title !== null && title !== undefined ? '<div class="message title">'+title+'</div>' : '';
        _objectHTML += content !== null && content !== undefined ? '<div class="message content">'+content+'</div>' : '';
        _objectHTML += '</div>';
        host == 'body' ? xj(xo.config.domParentNode).prepend(_objectHTML) : xj('[xo-object-name="'+host+'"]').prepend(_objectHTML);
    },
    poster:function(){
        var _obj = xj('[xo-type="poster"]'),
            _objName = _obj.attr('xo-object-name'),
            _objParent = _obj.attr('xo-parent'),
            _objState = _obj.attr('xo-state'),
            _posterBackground = _obj.attr('xo-poster-source'),
            _posterSize = _obj.attr('xo-poster-size'),
            _posterProportion = _obj.attr('xo-type-param'),
            //the xo-type-param will override the poster-size values
            _posterText = _obj.find('[xo-type="poster-text"]');
        /*
        poster text can have 7 parameters
        xo-type-param="font-size,color,text align,background color,box width,box height,padding"
        font-size can be numeric or string (10 or 10px or 1em)
        color can be hex or rgb (#000 or rgb(0,0,0,1) or rgba(0,0,0,1))
        text align can be a string (center, left...)
        background color can be hex or rgb (#000 or rgb(0,0,0) or rgba(0,0,0,0.7))
        box width can be numeric or string (10 or 10px or 1em)
        box height can be numeric or string (10 or 10px or 1em)
        padding can be either a general value (i.e 0) or specific values (i.e. 0 10px 5ps 15px)
        use the letter x to undefine an item (i.e. xo-type-param="x,x,center,500,x,10")
         */
        if(_posterProportion == 'fullscreen'){
            var _posterWidth = '100%',
                _posterHeight = '100%';
        }else{
            _posterWidth = _posterSize.split(',')[0],
            _posterHeight = _posterSize.split(',')[1];
        }
        if(_posterText.length > 0){
            xj(_posterText).each(function(){
                var _textParams = xj(this).attr('xo-type-param'),
                    _textSize = _textParams.split(',')[0] !== 'x' ? _textParams.split(',')[0] : null,
                    _textColor = _textParams.split(',')[1] !== 'x' ? _textParams.split(',')[1] : null,
                    _textAlign = _textParams.split(',')[2] !== 'x' ? _textParams.split(',')[2] : null;
                        if(_textParams.split(',')[3].indexOf('rgb') > -1){
                            var _textBoxColor = _textParams.split(',')[3] !== 'x' ? _textParams.split(',')[3].replace(/-/g,',') : null;
                        }
                    var _textBoxWidth = _textParams.split(',')[4] !== 'x' ? _textParams.split(',')[4] : null,
                    _textBoxHeight = _textParams.split(',')[5] !== 'x' ? _textParams.split(',')[5] : null,
                    _textBoxPadding = _textParams.split(',')[6] !== 'x' ? _textParams.split(',')[6] : null;
                xj(this).css({
                    'font-size':_textSize,
                    'color':_textColor,
                    'text-align':_textAlign,
                    'background-color':_textBoxColor,
                    'width':_textBoxWidth,
                    'height':_textBoxHeight,
                    'padding': _textBoxPadding,
                    'margin': '0 auto'
                });
            });
        }
        if(_objParent !== undefined){
            var _item = xj('[xo-object-name="'+_objName+'"]').detach();
            xj(_objParent).prepend(_item);
        }
        _obj.css({
            'position':'absolute',
            'display': 'block',
            'width':_posterWidth,
            'height':_posterHeight,
            'background-image':'url(' + _posterBackground +')',
            'background-repeat': 'no-repeat',
            'background-size': 'cover'
        });
        _objState == 'closed' ? _obj.attr('xo-state','open') : _obj.attr('xo-state','closed');
    },
    tabBuilder:function(){
        var _tabObject = '[xo-type="tabs"]',
            _tabObjectId = xj(_tabObject).attr('xo-object-name'),
            _tabObjectMode = xj(_tabObject).attr('xo-type-param');
        var _tabHeader = '<div xo-type="tab-header">';
            xj(_tabObject).find('[xo-type="tab-node"]').each(function(){
                var _tabHeaderLabel = xj(this).attr('xo-tab-header'),
                    _tabHeaderParent = xj(this).attr('xo-object-name'),
                    _tabDefaultState = xj(this).attr('xo-state');
                _tabHeader += '<div xo-type="tab-header-node" xo-type-param="';
                _tabHeader += _tabDefaultState == 'open' ? 'active' : '';
                _tabHeader += '" xo-parent="'+_tabHeaderParent+'">';
                if(_tabObjectMode=='text'){
                    _tabHeader += _tabHeaderLabel;
                }else if(_tabObjectMode=='icon'){
                    _tabHeader += '<span class="'+_tabHeaderLabel+'"></span>';
                }
                _tabHeader += '</div>';
            });
            _tabHeader += '</div>';
        xj('[xo-object-name="'+_tabObjectId+'"]').prepend(_tabHeader);
        xj('[xo-object-name="'+_tabObjectId+'"]').find('[xo-type="tab-node"]').wrapAll('<div xo-type="tab-block">');

    },
    accordionBuilder:function(){
            var _accObject = '[xo-type="accordion"]',
                _accObjectId = xj(_accObject).attr('xo-object-name'),
                _accObjectMode = xj(_accObject).attr('xo-type-param');
            xj(_accObject).find('[xo-type="accordion-node"]').each(function(){
                var _accHeaderLabel = xj(this).attr('xo-accordion-header'),
                    _accHeaderParent = xj(this).attr('xo-object-name'),
                    _accDefaultState = xj(this).attr('xo-state');
                var _accHeader = '<div xo-type="accordion-header-node" xo-type-param="';
                _accHeader += _accDefaultState == 'open' ? 'active' : '';
                _accHeader += '" xo-parent="'+_accHeaderParent+'">';
                if(_accObjectMode=='text'){
                    _accHeader += _accHeaderLabel;
                }else if(_accObjectMode=='icon'){
                    _accHeader += '<span class="'+_accHeaderLabel+'"></span>';
                }
                _accHeader += '</div>';
                xj(_accHeader).insertBefore(this);
            });
            /*xj('[xo-object-name="'+_accObjectId+'"]').prepend(_accHeader);
            xj('[xo-object-name="'+_accObjectId+'"]').find('[xo-type="accordion-node"]').wrapAll('<div xo-type="accordion-block">');*/

    },    
    initMouseEvents: function () {
        var mouseX, mouseY;
        xj('body').on('mouseover', '[xo-trigger="tooltip"]', function (e) {
            mouseX = e.pageX;
            mouseY = e.pageY;
            xo.tooltip(xj(this), 'add');
        }).on('mouseout', '[xo-trigger="tooltip"]', function () {
            xo.tooltip(null, 'delete');
        }).on('click', '[xo-trigger="url"]', function () {
            var _goToUrl = xj(this).attr('xo-trigger-url');
            xo.trigger('direct', _goToUrl, null);
        }).on('click', '[xo-trigger-close="modal"]', function () {
            xo.modal();
            /*var _targetModal = xj(this).attr('xo-trigger-close-modal');
            xo.trigger('kill-modal', _targetModal, null);*/
        }).on('click', '[xo-type="gutter-toggle"]', function () {
            var a = xj(this).attr('xo-parent') || null;
            xo.gutter(null,a);
        }).on('click', '[xo-trigger="gutter-toggle"]', function () {
            var a = xj(this).attr('xo-parent') || null;
            xo.gutter(null,a);
        }).on('click', '[xo-trigger="poster"]', function () {
            xo.poster();
        }).on('click', '[xo-type="poster-toggle"]', function () {
            xo.poster();
        }).on('click', '[xo-type="data-toggle"]', function () {
            xo.layoutToPage();
        }).on('click', '[xo-trigger="data-toggle"]', function () {
            xo.layoutToPage();
        }).on('click', '[xo-type="gutter-filter"]', function () {
            var a = xj(this).attr('xo-parent') || null;
            xo.gutter(null,a);
        }).on('click', '[xo-type="modal-toggle"]', function () {
            if (xj(this).attr('xo-data-template') !== "") {
                xo.modal(null, xj(this).attr('xo-data-template'))
            }
        }).on('click', '[xo-type="modal-filter"]', function () {
            xo.modal();
        }).on('click','[xo-type="dropdown-button"]',function(){
            var _target = xj(this).attr('xo-parent'),
                _object = 'ul[xo-object-name="' + _target + '"]',
                _clickedState = xj(_object).attr('xo-state'),
                _parentSize = xj(this).parent().width();
            if(_clickedState == 'open') {
                xj(_object).attr('xo-state', 'closed').parent().attr('xo-state', 'closed');
            }else if(_clickedState == 'closed') {
                xj(_object).attr('xo-state', 'open').css('width',_parentSize).parent().attr('xo-state', 'open');
            }
        }).on('click','[xo-type="warning"]',function(){
            xj(this).slideToggle(500);
        }).on('click', '[xo-type="tab-header-node"]', function () {
            var _toggleTabContent = xj(this).attr('xo-parent');
            xj('[xo-type="tab-node"]').attr('xo-state','closed');
            xj('[xo-type="tab-node"][xo-object-name="'+_toggleTabContent+'"]').attr('xo-state','open');
            xj('[xo-type="tab-header-node"]').attr('xo-type-param','');
            xj(this).attr('xo-type-param','active');
        }).on('click', '[xo-type="accordion-header-node"]', function () {
            var _toggleAccordionContent = xj(this).attr('xo-parent');
            xj('[xo-type="accordion-node"]').attr('xo-state','closed');
            xj('[xo-type="accordion-node"][xo-object-name="'+_toggleAccordionContent+'"]').attr('xo-state','open');
            xj('[xo-type="accordion-header-node"]').attr('xo-type-param','');
            xj(this).attr('xo-type-param','active');
        });
    }
};
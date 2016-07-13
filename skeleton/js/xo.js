/**
 * Created by david-maser on 23/06/16.
 */
var xo = {
    config: {
        loadPathDefault: '../dist/js/',
        loadPathExtension: '.js',
        ajaxPathDefault: '../dist/json/',
        ajaxFileExtension: '.json',
        ajaxDefaultMethod: 'get',
        ajaxDefaultDataType: 'json',
        sessionStorageKey: 'xo-',
        sessionFlushRule: false,
        showErrorLog: true,
        showErrorLogDate: false,
        animationSpeed: 500,
        domParentNode: 'body',
        defaultXOWrapper: 'section',
        defaultXOPage: 'index',
        /*
         initialise specific components and widgets
         as needed.
         */
        initGutter: true,
        initVideo: true,
        initPanel: true,
        initModal: true,
        initForms: true,
        initData: false,
        initDropdowns: true,
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
            xo.config.initGutter == true ? xo.gutter('init') : null;
            xo.config.initVideo == true ? xo.video() : null;
            xo.config.initPanel == true ? xo.panel() : null;
            xo.config.initModal == true ? xo.modal('init') : null;
            xo.config.initForms == true ? xo.formToPage() : null;
            xo.config.initData == true ? xo.layoutToPage() : null;
            xo.config.initDropdowns == true ? xo.dropDownInit() : null;
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
    createUniqueCode: function () {
        var a = new Date().valueOf(),
            b = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
        return a + b;
    },
    pageSetUp: function (domItem, domPrefix, xoMin, xoClass) {
        if (xo.config.appRunning !== true) {
            $(domItem).attr({
                'xo-prefix': domPrefix,
                'xo-min': xoMin
            }).addClass(xoClass);
            $(xo.config.domParentNode).contents().wrapAll('<' + xo.config.defaultXOWrapper + ' class="xo" xo-reserved="true">');
        } else {
            xo.log('An XO instance is already running');
        }
    },
    loadSuccess: function () {
        $(xo.config.domParentNode).css('opacity', 1);
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
        $.getScript(d, function (xoCore) {
            eval(xoCore);
        });
    },
    log: function (e) {
        var a = navigator.vendor.indexOf("Google") > -1,
            b = xo.config.showErrorLogDate == true ? new Date() : "";
        if (xo.config.showErrorLog == true) {
            a == true ? console.warn(e, b) : console.log(e, b);
        }
    },
    switchNavMode: function () {
        var a = $('html').attr('xo-prefix'),
            b = $(xo.config.domParentNode).find(xo.config.defaultXOWrapper),
            c = b.attr('xo-reserved'),
            d = c == true ? xo.config.ajaxPathDefault : scriptPath;
    },
    animate: function (obj, type, speed, length) {

    },
    getData: function (scriptPath, scriptURI, method, identifier, target, flush) {
        /*
        query a json file or json response object.
        Loaded data can be saved to session, parse and
        displayed or new functions can be created to
        handle specific data formats.
        The ajax call returns a data object.
         */
        var a = scriptPath == undefined || null || ' ' ? xo.config.ajaxPathDefault : scriptPath,
            b = scriptURI == undefined ? "" : scriptURI,
            c = xo.config.ajaxFileExtension,
            d = a + b + c;
        return $.ajax({
            dataType: xo.config.ajaxDefaultDataType,
            url: d,
            type: xo.config.ajaxDefaultMethod,
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
        $(target).append(_data);
    },
    saveDataToSession: function (data, method, key, id) {
        if (typeof(Storage) !== "undefined") {
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
        } else if (type == 'prompt') {
            xo.prompt(message, passValue);
        }
    },
    prompt: function (message, url) {
        /*
        utility function that creates a user prompt
        on an xo prompt object.
         */
        var r = confirm(message);
        if (r == true) {
            window.location = url;
        }
        document.getElementById("demo").innerHTML = txt;
    },
    tooltip: function (object, method) {
        if (method == 'add') {
            var tipText = $(object).attr('xo-tooltip-text'),
                tipEnabled = $(object).attr('xo-trigger') == 'tooltip',
                toolTipTop = $(object).offset().top,
                toolTipLeft = $(object).offset().left;
            if (tipEnabled == true) {
                var baseHTML = '<div class="tooltip" style="left:' + toolTipLeft + ';top:' + toolTipTop + ';">' + tipText + '</div>';
                $(baseHTML).insertAfter(object);
            }
        } else if (method == 'delete') {
            $('.tooltip').remove();
        }
    },
    panel: function () {
        $('[xo-type="panel-group"]').each(function () {
            var _obj = '[xo-type="panel"]',
                _count = $(this).children().length,
                _parent = $(this).width();
            $(this).find(_obj).each(function () {
                $(this).css('width', (_parent / _count) - _count);
                console.log(_count);
            })
        });
    },
    getTemplateObjects: function (type, template) {
        var templateArray = template.split(',');
        switch (type) {
            case 'modal':
                var t = templateArray[0],
                    b = templateArray[1],
                    bt = templateArray[2];
                if (bt.indexOf('/') > -1) {
                    var buttonArray = bt.split('/'),
                        bt1 = buttonArray[0],
                        bt2 = buttonArray[1];
                }
                var modalHTML = '<div class="xo modal title">' + t + '</div>';
                modalHTML += '<div class="xo modal body">' + b + '</div>';
                modalHTML += '<div class="xo modal buttons">';
                if (Array.isArray(buttonArray)) {
                    modalHTML += '<button>' + bt1 + '</button>';
                    modalHTML += '<button>' + bt2 + '</button>';
                } else {
                    modalHTML += '<button>' + bt + '</button>';
                }
                modalHTML += '</div>';
                return modalHTML;
                break;
            case 'popup':
                break;
        }

    },
    modal: function (method, template) {
        var _obj = '[xo-type="modal"]',
            _filterObj = '[xo-type="modal-filter"]',
            _filterCode = '<div xo-type="modal-filter"></div>',
            _inlineTemplate = $(_obj).attr('xo-data-template');
        if (typeof _inlineTemplate !== typeof undefined && _inlineTemplate !== false) {
            $(_obj).contents().not('[xo-type="modal-toggle"]').remove();
            $(_obj).append(xo.getTemplateObjects('modal', _inlineTemplate));
        } else if (template !== typeof undefined && template !== false) {
            $(_obj).contents().not('[xo-type="modal-toggle"]').remove(); //empty modal content to avoid duplicates.
            $(_obj).append(xo.getTemplateObjects('modal', template));
        }
        if ($(_obj).length > 0) {
            var _state = $(_obj).attr('xo-state');
        }
        if (method == 'init') {
            $(_obj).prepend('<div xo-type="modal-toggle">X</div>');
            $(_obj).wrap('<div class="modal-wrapper" xo-state="closed">');
        } else {
            if (_state == 'open') {
                $(_obj).attr('xo-state', 'closed');
                $(_obj).parent().attr('xo-state', 'closed');
                $(_filterObj).animate({opacity: 0}, xo.config.animationSpeed, function () {
                    $(_filterObj).remove();
                });
            } else if (_state == 'closed') {
                $(xo.config.defaultXOWrapper + '.xo').prepend(_filterCode);
                $(_filterObj).animate({opacity: 1}, xo.config.animationSpeed, function () {
                    $(_obj).attr('xo-state', 'open');
                    $(_obj).parent().attr('xo-state', 'open');
                });
            }
        }
    },
    gutter: function (method) {
        /*
        creates an animatable gutter instance out of
        any html element. XO parameters define where
        it is placed and what it's initial state is
        to be.
         */
        //check if a gutter exists
        var _obj = '[xo-type="gutter"]',
            _filterObj = '[xo-type="gutter-filter"]',
            _filterCode = '<div xo-type="gutter-filter"></div>';
        if ($(_obj).length > 0) {
            var _state = $(_obj).attr('xo-state'),
                _width = $(_obj).width(),
                _param = $(_obj).attr('xo-type-param');
        }
        if (method == 'init') {
            $(_obj).prepend('<div xo-type="gutter-toggle">X</div>');
            if (_state == 'closed') {
                $(_obj).css('left', -_width);
            }
        } else {
            if (_state == 'open') {
                $(_obj).animate({left: -_width}, xo.config.animationSpeed).attr('xo-state', 'closed');
                $(_filterObj).animate({opacity: 0}, xo.config.animationSpeed, function () {
                    $(_filterObj).remove();
                });

            } else if (_state == 'closed') {
                $(_obj).animate({left: 0}, xo.config.animationSpeed).attr('xo-state', 'open');
                $(xo.config.defaultXOWrapper + '.xo').prepend(_filterCode);
                $(_filterObj).animate({opacity: 1}, xo.config.animationSpeed);
            }
        }
    },
    navbar: function () {

    },
    video: function () {
        /*
        creates a video instance on the page. Writes
        the code necessary inside the html object that
        has the xo-type video. XO params define the
        source url, video format, etc..
         */
        $('[xo-type="video"]').each(function () {
            var _obj = '[xo-type="video"]',
                _vdoW = $(_obj).attr('xo-video-width') || 'auto',
                _vdoH = $(_obj).attr('xo-video-height') || 'auto',
                _vdoS = $(_obj).attr('xo-video-src'),
                _vdoT = $(_obj).attr('xo-video-format'),
                _vdoC = $(_obj).attr('xo-video-controls'),
                _vdoA = $(_obj).attr('xo-video-autoplay'),
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
            $(_obj).contents().remove();//removes content from the video placeholder
            $(_obj).append(_vdo);
        })
    },
    formToPage: function () {
        /*
         function launched by init. Cycles through all objects
         on the page that have the xo-type="form" attribute and
         injects the correct form into them by calling the
         formBuilder function.
         */
        $('[xo-type="form"]').each(function () {
            var _formTarget = $(this).attr('xo-object-name');
            xo.formBuilder('forms/' + _formTarget, _formTarget, _formTarget);
        })
    },
    formBuilder: function (source, target, host) {
        var _tempData = xo.getData(null, source, 'b', target, false),
            _tempArray = [],
            _tempOptions = '[',
            _tempRadioOptions = '[',
            _tempCheckOptions = '[',
            _tempDataListOptions = '[';
        _tempData.success(function (data) {
            var _initData = [],
                _processData = data.form;
                _initData.push({action:data.formAction,method:data.formMethod,id:data.formId,class:data.formClass});
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
                    min: _processData[key].min-length || null,
                    max: _processData[key].max-length || null,
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
            var _formPrepend = '<form action="'+_initData[0].action+'" method="'+_initData[0].method+'" id="'+_initData[0].id+'" class="'+_initData[0].class+'">',
                _formAppend = '</form>';
            $('[xo-object-name="' + host + '"]').append(_formPrepend+_formCode+_formAppend);
        });
    },
    layoutToPage: function () {
        /*
         function launched by init. Cycles through all objects
         on the page that have the xo-type="form" attribute and
         injects the correct form into them by calling the
         formBuilder function.
         */
        $('[xo-type="data"]').each(function () {
            var _dataTarget = $(this).attr('xo-object-name'),
                _dataSource = $(this).attr('xo-data-source');
            xo.layoutBuilder(_dataSource, _dataTarget, _dataTarget);
        })
    },
    layoutBuilder:function(source, target, host){
        var _tempData = (xo.getData(null, source, 'b', target,false)),
            _tempArray = [],
            _tempOptions = '[';
        _tempData.success(function (data) {
            var _processData = data.page;
            Object.keys(_processData).forEach(function (key) {
                        if (typeof _processData[key].node === 'object') {
                            var _optionDepth = _processData[key].node.length;
                            for (var o = 0; o < _optionDepth; o++) {
                                _tempOptions += '{"nodeType":"' + _processData[key].node[o].type + '",';
                                _tempOptions += _processData[key].node[o].class !== null ? '"nodeClass":"'+_processData[key].node[o].class+'",' : '"nodeClass":null,';
                                _tempOptions += _processData[key].node[o].id !== null ? '"nodeID":"'+_processData[key].node[o].id+'",' : '"nodeId":null,';
                                _tempOptions += _processData[key].node[o].xoType !== null ? '"nodexoType":"'+_processData[key].node[o].xoType+'",' : '"nodexoType":null,';
                                _tempOptions += _processData[key].node[o].xoState !== null ? '"nodexoState":"'+_processData[key].node[o].xoState+'",' : '"nodexoState":null,';
                                _tempOptions += _processData[key].node[o].xoSpan !== null ? '"nodexoSpan":"'+_processData[key].node[o].xoSpan+'",' : '"nodexoSpan":null,';
                                _tempOptions += _processData[key].node[o].xoObjectName !== null ? '"nodexoObjectName":"'+_processData[key].node[o].xoObjectName+'",' : '"nodexoObjectName":null,';
                                _tempOptions += _processData[key].node[o].xoTypeParam !== null ? '"nodexoTypeParam":"'+_processData[key].node[o].xoTypeParam+'",' : '"nodexoTypeParam":null,';
                                _tempOptions += _processData[key].node[o].xoParent !== null ? '"nodexoParent":"'+_processData[key].node[o].xoParent+'",' : '"nodexoParent":null,';
                                _tempOptions += '"nodeContent":"'+_processData[key].node[o].content+'"';
                                _tempOptions += '}';
                                if (o < _optionDepth - 1) {
                                    _tempOptions += ',';
                                }
                            }
                            _tempOptions += ']';
                            _tempOptions = JSON.parse(_tempOptions);
                        }
                _tempArray.push({
                    page:_processData[key].id,
                    title:_processData[key].title,
                    metas:_processData[key].metas,
                    node:_tempOptions
                });
                var _layoutCode = '',
                    _baseNode = _tempArray[0].node;
                for(var i=0,ii=_baseNode.length;i<ii;i++){
                            _layoutCode += '<'+_baseNode[i].nodeType;
                            _layoutCode += _baseNode[i].nodexoType !== null && _baseNode[i].nodexoType !== undefined ? ' xo-type="'+_baseNode[i].nodexoType+'"' : '';
                            _layoutCode += _baseNode[i].nodeClass !== null && _baseNode[i].nodeClass !== undefined ? ' class="'+_baseNode[i].nodeClass+'"' : '';
                            _layoutCode += _baseNode[i].nodeID !== null && _baseNode[i].nodeID !== undefined ? ' id="'+_baseNode[i].nodeID+'"' : '';
                            _layoutCode += _baseNode[i].nodexoState !== null && _baseNode[i].nodexoState !== undefined ? ' xo-state="'+_baseNode[i].nodexoState+'"' : '';
                            _layoutCode += _baseNode[i].nodexoSpan !== null && _baseNode[i].nodexoSpan !== undefined ? ' xo-span="'+_baseNode[i].nodexoSpan+'"' : '';
                            _layoutCode += _baseNode[i].nodexoObjectName !== null && _baseNode[i].nodexoObjectName !== undefined ? ' xo-object-name="'+_baseNode[i].nodexoObjectName+'"' : '';
                            _layoutCode += _baseNode[i].nodexoTypeParam !== null && _baseNode[i].nodexoTypeParam !== undefined ? ' xo-type-param="'+_baseNode[i].nodexoTypeParam+'"' : '';
                            _layoutCode += _baseNode[i].nodexoParent !== null && _baseNode[i].nodexoParent !== undefined ? ' xo-parent="'+_baseNode[i].nodexoParent+'"' : '';
                            _layoutCode += '>'+_baseNode[i].nodeContent+'</'+_baseNode[i].nodeType+'>';
                }
                $('[xo-object-name="' + host + '"]').append(_layoutCode);
            });
        });
    },
    warningBar:function(type, title, content, host){
        var _objectHTML = '<div xo-type=""';
    },
    dropDownInit:function(){
        $('[xo-type="dropdown"]').each(function () {
            var _buttonLabel = $(this).attr('xo-dropdown-button'),
                _objectName = $(this).attr('xo-object-name');
            xo.dropDownBuilder(_buttonLabel, _objectName);
        })
    },
    dropDownBuilder:function(button,object){
        var _this = '[xo-object-name="'+object+'"]',
            _initialState = $(_this).attr('xo-state'),
            _buttonHTML = '<button xo-type="dropdown-button" xo-parent="'+object+'">'+button+'</button>';
        $(_this).prepend(_buttonHTML).find('ul').attr('xo-object-name',object).attr('xo-state',_initialState);
        $('body').on('click','[xo-type="dropdown-button"]',function(){
            var _target = $(this).attr('xo-parent'),
                _clickedState = $('ul[xo-object-name="' + _target + '"]').attr('xo-state');
            if(_clickedState == 'open') {
                $('ul[xo-object-name="' + _target + '"]').attr('xo-state', 'closed').parent().attr('xo-state', 'closed');
            }else if(_clickedState == 'closed') {
                $('ul[xo-object-name="' + _target + '"]').attr('xo-state', 'open').parent().attr('xo-state', 'open');
            }
        })
    },
    initMouseEvents: function () {
        var mouseX, mouseY;
        $('body').on('mouseover', '[xo-trigger="tooltip"]', function (e) {
            mouseX = e.pageX;
            mouseY = e.pageY;
            xo.tooltip($(this), 'add');
        }).on('mouseout', '[xo-trigger="tooltip"]', function () {
            xo.tooltip(null, 'delete');
        }).on('click', '[xo-trigger="url"]', function () {
            var goToUrl = $(this).attr('xo-trigger-url');
            xo.trigger('direct', goToUrl, null);
        }).on('click', '[xo-type="gutter-toggle"]', function () {
            xo.gutter(null);
        }).on('click', '[xo-trigger="gutter-toggle"]', function () {
            xo.gutter(null);
        }).on('click', '[xo-type="gutter-filter"]', function () {
            xo.gutter(null);
        }).on('click', '[xo-type="modal-toggle"]', function () {
            if ($(this).attr('xo-data-template') !== "") {
                xo.modal(null, $(this).attr('xo-data-template'))
            }
        }).on('click', '[xo-type="modal-filter"]', function () {
            xo.modal();
        });
    }
};

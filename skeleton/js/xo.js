/**
 * Created by david-maser on 23/06/16.
 */
var xo = {
    config:{
        loadPathDefault:'../dist/js/',
        loadPathExtension:'.js',
        ajaxPathDefault:'../dist/json/',
        ajaxFileExtension:'.json',
        ajaxDefaultMethod:'get',
        ajaxDefaultDataType:'json',
        sessionStorageKey:'xo-',
        showErrorLog: true,
        showErrorLogDate: false,
        animationSpeed: 500,
        domParentNode: 'body',
        defaultXOWrapper: 'section',
        /*
        initialise specific components and widgets
        as needed.
         */
        initGutter: true,
        initVideo: true,
        initPanel: true,
        initModal: true,
        appRunning: false
    },
    _define:{
        backlog:function(){},
        domload:function(){},
        dataready:function(){},
        domready:function(){},
        targetclick:function(){},
        targetswipe:function(){}
    },
    _throw:{
        dataerror:function(){},
        datatimeout:function(){},
        nullified:function(){},
        overflow:function(){}
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
    createUniqueCode:function(){
        var a = new Date().valueOf(),
            b = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
            return a+b;
    },
    init:function(advise,callback){
        xo.pageSetUp('html','xo','true','xo set');
        xo.config.initGutter == true ? xo.gutter('init') : null;
        xo.config.initVideo == true ? xo.video() : null;
        xo.config.initPanel == true ? xo.panel() : null;
        xo.config.initModal == true ? xo.modal('init') : null;
        xo.initMouseEvents();
        xo.config.appRunning = true;
        advise == true ? xo.log('xo is running') : null;
        if (callback && typeof(callback) === "function") {
            callback();
        }
    },
    pageSetUp:function(domItem,domPrefix,xoMin,xoClass){
        if(xo.config.appRunning !== true) {
            $(domItem).attr({
                'xo-prefix': domPrefix,
                'xo-min': xoMin
            }).addClass(xoClass);
            $(xo.config.domParentNode).contents().wrapAll('<'+xo.config.defaultXOWrapper+' class="xo" xo-reserved="true">');
        }else{
            xo.log('An XO instance is already running');
        }
    },
    loadSuccess:function(){
        $(xo.config.domParentNode).css('opacity',1);
    },
    loadExternal:function(scriptPath,scriptURI,scriptExt){
        var a = scriptPath == undefined || null || ' ' ? xo.config.loadPathDefault : scriptPath,
            b = scriptURI == undefined ? "" : scriptURI,
            c = scriptExt == undefined || null || ' ' ? xo.config.loadPathExtension : scriptExt,
            d = a+b+c;
        $.getScript(d, function(xoCore){
            //console.log("Script "+xoCore+" loaded but not necessarily executed.");
            eval(xoCore);
        });
    },
    log:function(e){
        var a = navigator.vendor.indexOf("Google") > -1,
            b = xo.config.showErrorLogDate == true ? new Date() : "";
        if(xo.config.showErrorLog == true) {
            a == true ? console.warn(e,b) : console.log(e,b);
        }
    },
    switchNavMode:function(){
        var a = $('html').attr('xo-prefix'),
            b = $(xo.config.domParentNode).find(xo.config.defaultXOWrapper),
            c = b.attr('xo-reserved'),
            d = c == true ? xo.config.ajaxPathDefault : scriptPath;
    },
    animate:function(obj,type,speed,length){

    },
    getData:function(scriptPath,scriptURI,method,identifier,target){
        var a = scriptPath == undefined || null || ' ' ? xo.config.ajaxPathDefault : scriptPath,
            b = scriptURI == undefined ? "" : scriptURI,
            c = xo.config.ajaxFileExtension,
            d = a+b+c;
        $.ajax({
            dataType: xo.config.ajaxDefaultDataType,
            url: d,
            type: xo.config.ajaxDefaultMethod,
            statusCode: {
                404: function() {
                    xo.log('XO can\'t load that file');
                },
                500: function() {
                    xo.log('the server has encountered an internal error');
                },
                502: function() {
                    xo.log('bad gateway');
                },
                503: function() {
                    xo.log('the service is unavailable');
                },
                504: function() {
                    xo.log('the gateway has timed out');
                }

            }
        }).success(function(data) {
            if(method == 'p'){
                parseData(data,true,target);
            }else if(method == 's'){
                xo.saveDataToSession(JSON.stringify(data),'s',xo.config.sessionStorageKey,identifier);
            }
        }).error(function() {
            xo.log('ajax can\'t load that file');
        });
    },
    parseData:function(data,parse,target){
        //working on this one
        if(parse == true){
            _data = JSON.parse(data);
        }
        $(target).append(_data);
    },
    saveDataToSession:function(data,method,key,id){
        if (typeof(Storage) !== "undefined") {
            method == 's' ? sessionStorage.setItem(key+id, data) : localStorage.setItem(xo.config.sessionStorageKey+xo.createUniqueCode(), data);
        } else {
            xo.log('Sorry! No Web Storage support..');
        }
    },
    getDataFromSession:function(key,id,parse){
        var _data = sessionStorage.getItem(key+'-'+id);
        if(parse == true){
            _data = JSON.parse(_data);
        }
        console.log(_data);
    },
    trigger:function(type,passValue,message){
        message = message || null;
        if(type == 'direct'){
            window.location = passValue;
        }else if(type == 'prompt'){
            xo.prompt(message,passValue);
        }
    },
    prompt:function(message,url){
        var r = confirm(message);
        if (r == true) {
            window.location = url;
        }
        document.getElementById("demo").innerHTML = txt;
    },
    tooltip:function(object,method){
        if(method == 'add'){
            var tipText = $(object).attr('xo-tooltip-text'),
                tipEnabled = $(object).attr('xo-trigger') == 'tooltip',
                toolTipTop = $(object).offset().top,
                toolTipLeft = $(object).offset().left;
            if(tipEnabled == true){
                var baseHTML = '<div class="tooltip" style="left:'+toolTipLeft+';top:'+toolTipTop+';">'+tipText+'</div>';
                $(baseHTML).insertAfter(object);
            }
        }else if(method == 'delete'){
            $('.tooltip').remove();
        }
    },
    panel:function(){
        $('[xo-type="panel-group"]').each(function(){
            var _obj = '[xo-type="panel"]',
                _count = $(this).children().length,
                _parent = $(this).width();
            $(this).find(_obj).each(function () {
                $(this).css('width', (_parent / _count) - _count);
                console.log(_count);
            })
        });
    },
    getTemplateObjects:function(type,template){
        var templateArray = template.split(',');
        switch(type) {
            case 'modal':
                var t = templateArray[0],
                    b = templateArray[1],
                    bt = templateArray[2];
                if(bt.indexOf('/')>-1) {
                    var buttonArray = bt.split('/'),
                        bt1 = buttonArray[0],
                        bt2 = buttonArray[1];
                }
                var modalHTML = '<div class="xo modal title">'+t+'</div>';
                    modalHTML += '<div class="xo modal body">'+b+'</div>';
                    modalHTML += '<div class="xo modal buttons">';
                if(Array.isArray(buttonArray)){
                    modalHTML += '<button>'+bt1+'</button>';
                    modalHTML += '<button>'+bt2+'</button>';
                }else{
                    modalHTML += '<button>'+bt+'</button>';
                }
                    modalHTML += '</div>';
                return modalHTML;
                break;
            case 'popup':
                break;
        }

    },
    modal:function(method,template){
        var _obj = '[xo-type="modal"]',
            _filterObj = '[xo-type="modal-filter"]',
            _filterCode = '<div xo-type="modal-filter"></div>',
            _inlineTemplate = $(_obj).attr('xo-data-template');
        if (typeof _inlineTemplate !== typeof undefined && _inlineTemplate !== false) {
            $(_obj).contents().not('[xo-type="modal-toggle"]').remove();
            $(_obj).append(xo.getTemplateObjects('modal',_inlineTemplate));
        }else if(template !== undefined){
            $(_obj).contents().not('[xo-type="modal-toggle"]').remove(); //empty modal content to avoid duplicates.
            $(_obj).append(xo.getTemplateObjects('modal',template));
        }
        if ($(_obj).length > 0) {
            var state = $(_obj).attr('xo-state'),
                param = $(_obj).attr('xo-type-param');
        }
        if(method == 'init') {
            $(_obj).prepend('<div xo-type="modal-toggle">X</div>');
            $(_obj).wrap('<div class="modal-wrapper">');
        } else {
            if (state == 'open') {
                $(_obj).attr('xo-state', 'closed');
                $(_filterObj).animate({opacity: 0}, xo.config.animationSpeed, function () {
                    $(_filterObj).remove();
                });
            } else if (state == 'closed') {
                $(xo.config.defaultXOWrapper + '.xo').prepend(_filterCode);
                $(_filterObj).animate({opacity: 1}, xo.config.animationSpeed,function(){
                    $(_obj).attr('xo-state', 'open');
                });
            }
        }
    },
    gutter:function(method){
        //check if a gutter exists
        var _obj = '[xo-type="gutter"]',
            _filterObj = '[xo-type="gutter-filter"]',
            _filterCode = '<div xo-type="gutter-filter"></div>';
        if ($(_obj).length > 0) {
            var state = $(_obj).attr('xo-state'),
                width = $(_obj).width(),
                param = $(_obj).attr('xo-type-param');
        }
        if(method == 'init') {
            $(_obj).prepend('<div xo-type="gutter-toggle">X</div>');
            if(state == 'closed'){
                $(_obj).css('left',-width);
            }
        } else {
            if (state == 'open') {
                $(_obj).animate({left: -width}, xo.config.animationSpeed).attr('xo-state', 'closed');
                $(_filterObj).animate({opacity: 0}, xo.config.animationSpeed,function(){
                    $(_filterObj).remove();
                });

            } else if (state == 'closed') {
                $(_obj).animate({left: 0}, xo.config.animationSpeed).attr('xo-state', 'open');
                $(xo.config.defaultXOWrapper+'.xo').prepend(_filterCode);
                $(_filterObj).animate({opacity: 1}, xo.config.animationSpeed);
            }
        }
    },
    video:function(){
        $('[xo-type="video"]').each(function(){
            var _obj = '[xo-type="video"]',
                _vdoW = $(_obj).attr('xo-video-width') || 'auto',
                _vdoH = $(_obj).attr('xo-video-height') || 'auto',
                _vdoS = $(_obj).attr('xo-video-src'),
                _vdoT = $(_obj).attr('xo-video-format'),
                _vdoC = $(_obj).attr('xo-video-controls'),
                _vdoA = $(_obj).attr('xo-video-autoplay'),
                _vdo = '<video width="'+_vdoW+'" height="'+_vdoH+'"';
            if(_vdoC == 'true') {
                _vdo += ' controls';
            }
            if(_vdoA == 'true'){
                _vdo += ' autoplay'
            }
            _vdo += '>';
            _vdo += '<source src="'+_vdoS+'" type="video/'+_vdoT+'">';
            _vdo += 'Your browser does not support the video tag.';
            _vdo += '</video>';
            $(_obj).contents().remove();//removes content from the video placeholder
            $(_obj).append(_vdo);
        })
    },
    initMouseEvents:function(){
        var mouseX, mouseY;
        $('body').on('mouseover', '[xo-trigger="tooltip"]', function(e) {
            mouseX = e.pageX;
            mouseY = e.pageY;
            xo.tooltip($(this),'add');
        }).on('mouseout', '[xo-trigger="tooltip"]', function() {
            xo.tooltip(null,'delete');
        }).on('click', '[xo-trigger="url"]', function() {
            var goToUrl = $(this).attr('xo-trigger-url');
            xo.trigger('direct',goToUrl,null);
        }).on('click', '[xo-type="gutter-toggle"]', function() {
            xo.gutter(null);
        }).on('click', '[xo-trigger="gutter-toggle"]', function() {
            xo.gutter(null);
        }).on('click', '[xo-type="gutter-filter"]', function() {
            xo.gutter(null);
        }).on('click', '[xo-type="modal-toggle"]', function() {
            if($(this).attr('xo-data-template') !== ""){
                xo.modal(null,$(this).attr('xo-data-template'))
            }
        }).on('click', '[xo-type="modal-filter"]', function() {
            xo.modal();
        });
    }
};

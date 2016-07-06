/**
 * Created by david-maser on 23/06/16.
 */
var xo = {
    config:{
        loadPathDefault:'../dist/js/',
        loadPathExtension:'.js',
        ajaxPathDefault:'json/',
        ajaxFileExtension:'.json',
        ajaxDefaultMethod:'get',
        ajaxDefaultDataType:'json',
        sessionStorageKey:'xoDemo',
        showErrorLog: true,
        showErrorLogDate: false,
        domParentNode: 'body',
        appRunning: false
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
    getPageData:function(){
        var pageData = [];
        pageData.push({url:window.location.href,proto:window.location.protocol,port:window.location.port,dom:xo.countDomTags()});
        xo.saveDataToSession(pageData,'s');
    },
    init:function(advise){
        xo.pageSetUp('html','xo','true','xo set');
        advise == true ? xo.log('xo is running') : null;
        xo.config.appRunning = true;
    },
    pageSetUp:function(domItem,domPrefix,xoMin,xoClass){
        if(xo.config.appRunning !== true) {
            $(domItem).attr({
                'xo-prefix': domPrefix,
                'xo-min': xoMin
            }).addClass(xoClass);
            $(xo.config.domParentNode).contents().wrapAll('<section class="xo" xo-reserved="true">');
            xo.getPageData();
        }else{
            xo.log('An XO instance is already running');
        }
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
            b = $(xo.config.domParentNode).find('section'),
            c = b.attr('xo-reserved'),
            d = c == true ? xo.config.ajaxPathDefault : scriptPath;
    },
    animate:function(obj,type,speed,length){

    },
    getData:function(scriptPath,scriptURI){
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
                    xo.log('ajax can\'t load that file');
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
            xo.saveDataToSession(data,'s');
        }).error(function() {
            xo.log('ajax can\'t load that file');
        });
    },
    parseData:function(data,method,startNode,target){
        //working on this one
    },
    saveDataToSession:function(data,method){
        if (typeof(Storage) !== "undefined") {
            method == 's' ? sessionStorage.setItem(xo.config.sessionStorageKey+xo.createUniqueCode(), data) : localStorage.setItem(xo.config.sessionStorageKey+xo.createUniqueCode(), data);
        } else {
            xo.log('Sorry! No Web Storage support..');
        }
    },
    buildDomStructure:function(){
        var render = "all" || null,
            engine = [],
            scope = "dom";
    }
};

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
        localStorageKey:'aso-1866425',
        showErrorLog: true,
        showErrorLogDate: false,
        domParentNode: 'body'
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
    getPageData:function(){
        var pageData = [];
        pageData.push({url:window.location.href,proto:window.location.protocol,port:window.location.port,dom:xo.countDomTags()});
        xo.writeToSessionStorage(pageData);
    },
    writeToSessionStorage:function(data){
        if (typeof(Storage) !== "undefined") {
            console.log(data[0]);
        } else {
            xo.log('Sorry! No Web Storage support..');
        }
    },
    init:function(advise){
        xo.pageSetUp('html','xo','true','xo set');
        advise == true ? xo.log('xo is running') : null;
        var xoRunning = true;
    },
    pageSetUp:function(domItem,domPrefix,xoMin,xoClass){
        $(domItem).attr({
            'data-xo-prefix':domPrefix,
            'data-xo-min':xoMin
        }).addClass(xoClass);
        $(xo.config.domParentNode).contents().wrapAll('<section class="xo" xo-reserved="true">');
        xo.getPageData();
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
            xo.parseData(data,null,'demo',null);
        }).error(function() {
            xo.log('ajax can\'t load that file');
        });
    },
    parseData:function(data,method,startNode,target){
        console.log(data);
    },
    build:function(){
        var render = "all" || null,
            engine = [],
            scope = "dom";
    }
};

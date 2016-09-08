###*
# Copyright (c) <2016> <David Maser>
# Permission is hereby granted, free of charge, to any person obtaining a copy of this software
# and associated documentation files (the "Software"), to deal in the Software without restriction,
# including without limitation the rights to use, copy, modify, merge, publish, distribute,
# sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
#
# The above copyright notice and this permission notice shall be included in all copies or
# substantial portions of the Software.
#
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
# BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
# NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
# DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
###

xj = jQuery.noConflict()
xo = {} or
config:
  loadPathDefault: '../dist/js/'
  loadPathExtension: '.js'
  ajax:
    pathDefault: '../dist/json/'
    fileExtension: '.json'
    defaultMethod: 'get'
    defaultDataType: 'json'
  sessionStorageKey: 'xo-'
  sessionFlushRule: false
  dataLoadedItems: []
  showErrorLog: true
  showErrorLogDate: false
  animationSpeed: 500
  domParentNode: 'body'
  defaultXOWrapper: 'section'
  defaultXOPage: 'index'
  defaultStickyOffset: 300
  init:
    accordion: true
    data: false
    dropdowns: true
    forms: true
    gutter: true
    modal: true
    nav: true
    panel: true
    placeholders: false
    poster: false
    sticky: true
    tabs: true
    video: false
  appRunning: false
  reInitKey: '0188846aREvvS7'
_define:
  domload: ->
    window.addEventListener 'onload', (->
      'l'
    ), false
    return
  dataready: ->
  domready: ->
    window.addEventListener 'DOMContentLoaded', (->
      'd'
    ), false
    return
init: (advise, callback) ->
  if `xo.config.appRunning != true`
    xo.pageSetUp 'html', 'xo', 'true', 'xo set'
    if `xo.config.init.accordion == true` then xo.navPanelBuilder('accordion') else null
    if `xo.config.init.data == true` then xo.layoutToPage() else null
    if `xo.config.init.dropdowns == true` then xo.dropDownInit() else null
    if `xo.config.init.forms == true` then xo.formToPage() else null
    if `xo.config.init.gutter == true` then xo.gutter('init') else null
    if `xo.config.init.modal == true` then xo.modal('init') else null
    if `xo.config.init.nav == true` then xo.navInit() else null
    if `xo.config.init.panel == true` then xo.panel() else null
    if `xo.config.init.placeholders == true` then xo.placeholder() else null
    if `xo.config.init.poster == true` then xo.poster() else null
    if `xo.config.init.sticky == true` then xo.sticky() else null
    if `xo.config.init.tabs == true` then xo.navPanelBuilder('tabs') else null
    if `xo.config.init.video == true` then xo.video() else null
    xo.initMouseEvents()
    xo.config.appRunning = true
    if `advise == true` then xo.log('xo is running') else null
    if callback and `typeof callback == 'function'`
      callback()
  else
    xo.log 'An XO instance is already running'
  return
saveLoadedItems: (item) ->
  xo.config.dataLoadedItems.push item
  return
checkLoadedItems: (item) ->
  if xo.config.dataLoadedItems.indexOf(item) > -1
    return true
  return
pageSetUp: (domItem, domPrefix, xoMin, xoClass) ->
  if `xo.config.appRunning != true`
    xj(domItem).attr(
      'xo-prefix': domPrefix
      'xo-min': xoMin).addClass xoClass
    xj(xo.config.domParentNode).contents().wrapAll '<' + xo.config.defaultXOWrapper + ' class="xo" xo-reserved="true">'
  else
    xo.log 'An XO instance is already running'
  return
loadSuccess: ->
  xj(xo.config.domParentNode).css 'opacity', 1
  return
loadExternal: (scriptPath, scriptURI, scriptExt) ->

  ###
   load external scripts asynchronously and execute their
   functions. This can be used to load jQuery plugins or
   other components after the main xo core has been built
  ###

  a = if `scriptPath == undefined` or null or ' ' then xo.config.loadPathDefault else scriptPath
  b = if `scriptURI == undefined` then '' else scriptURI
  c = if `scriptExt == undefined` or null or ' ' then xo.config.loadPathExtension else scriptExt
  d = a + b + c
  xj.getScript d, (xoCore) ->
    eval xoCore
    return
  return
log: (e) ->
  a = navigator.vendor.indexOf('Google') > -1
  b = if `xo.config.showErrorLogDate == true` then new Date else ''
  if `xo.config.showErrorLog == true`
    if `a == true` then console.warn(e, b) else console.log(e, b)
  return
prompt: (message, url) ->
  r = confirm(message)
  if `r == true`
    window.location = url
  document.getElementById('demo').innerHTML = txt
  return
createUniqueCode: ->
  a = (new Date).valueOf()
  b = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5)
  a + b
countDomTags: (pa) ->
  pa = pa or document
  O = {}
  A = []
  tag = undefined
  D = pa.getElementsByTagName('*')
  D = A.slice.apply(D, [
    0
    D.length
  ])
  while D.length
    tag = D.shift().tagName.toLowerCase()
    if !O[tag]
      O[tag] = 0
    O[tag] += 1
  for p of O
    A[A.length] = p + ': ' + O[p]
  A.sort (a, b) ->
    a = a.split(':')[1] * 1
    b = b.split(':')[1] * 1
    b - a
  A.join ', '
placeholder: ->

  ###
   creates a placeholder image from an img tag that
   has the xo-type attribute placeholder. Placeholder
   uses placeholdit.imgix.net to get the image.
   Requires xo-type-param. Param should be:
   ~text?txtsize=33&txt=Your Text×150&w=350&h=150
  ###

  _obj = '[xo-type="placeholder"]'
  xj(_obj).each ->
    _sourceURL = 'https://placeholdit.imgix.net/'
    _sourcePARAM = xj(this).attr('xo-type-param')
    xj(this).attr 'src', _sourceURL + _sourcePARAM
    return
  return
switchNavMode: ->
#not implemented yet
  a = xj('html').attr('xo-prefix')
  b = xj(xo.config.domParentNode).find(xo.config.defaultXOWrapper)
  c = b.attr('xo-reserved')
  d = if `c == true` then xo.config.ajax.pathDefault else scriptPath
  return
animate: (obj, type, speed, length) ->
#not implemented yet
  return
getData: (scriptPath, scriptURI, method, identifier, target, flush) ->

  ###
   query a json file or json response object.
   Loaded data can be saved to session, parse and
   displayed or new functions can be created to
   handle specific data formats.
   The ajax call returns a data object.
  ###

  _path = if `scriptPath == undefined` or null or ' ' then xo.config.ajax.pathDefault else scriptPath
  _uri = if `scriptURI == undefined` then '' else scriptURI
  _extension = xo.config.ajax.fileExtension
  _dataURL = _path + _uri + _extension
  xj.ajax(
    dataType: xo.config.ajax.defaultDataType
    url: _dataURL
    type: xo.config.ajax.defaultMethod
    statusCode:
      404: ->
        xo.log 'XO can\'t load that file'
        return
      500: ->
        xo.log 'the server has encountered an internal error'
        return
      502: ->
        xo.log 'bad gateway'
        return
      503: ->
        xo.log 'the service is unavailable'
        return
      504: ->
        xo.log 'the gateway has timed out'
        return
  ).success((data) ->
    xo._define.dataready()
    if `method == 'p'`
      xo.parseData data, true, target
    else if `method == 's'`
      xo.saveDataToSession JSON.stringify(data), 's', xo.config.sessionStorageKey, identifier
    else if `method == 'b'`
      if `sessionStorage.getItem(xo.config.sessionStorageKey + identifier) == null`
        xo.saveDataToSession JSON.stringify(data), 's', xo.config.sessionStorageKey, identifier
        xo.log 'Saved ' + xo.config.sessionStorageKey + identifier + ' to session storage'
      xo.getDataFromSession 'xo', identifier, true, flush or xo.config.sessionFlushRule
    return
  ).error ->
    xo.log 'ajax can\'t load that file'
    return
parseData: (data, parse, target) ->
#working on this one
  if `parse == true`
    _data = JSON.parse(data)
  xj(target).append _data
  return
saveDataToSession: (data, method, key, id) ->
  if `typeof Storage != 'undefined'`
    key = if `key == undefined` or null or ' ' then xo.config.sessionStorageKey else key
    if `method == 's'` then sessionStorage.setItem(key + id, data) else localStorage.setItem(xo.config.sessionStorageKey + xo.createUniqueCode(), data)
  else
    xo.log 'Sorry! No Web Storage support..'
  return
getDataFromSession: (key, id, parse, flush) ->
  _data = sessionStorage.getItem(key + '-' + id)
  if `parse == true`
    _data = JSON.parse(_data)
  if `flush == true`
    sessionStorage.removeItem key + '-' + id
  _data
trigger: (type, passValue, message) ->
  message = message or null
  if `type == 'direct'`
    window.location = passValue
  else if `type == 'kill-modal'`
    xo.modal 'kill-modal', passValue
  else if `type == 'prompt'`
    xo.prompt message, passValue
  return
tooltip: (object, method) ->
  if `method == 'add'`
    tipText = xj(object).attr('xo-tooltip-text')
    tipEnabled = `xj(object).attr('xo-trigger') == 'tooltip'`
    toolTipTop = Math.round(xj(object).offset().top)
    toolTipLeft = Math.round(xj(object).offset().left)
    if `tipEnabled == true`
      baseHTML = '<div class="tooltip" style="left:' + toolTipLeft + 'px;top:' + toolTipTop + 'px;">' + tipText + '</div>'
      xj(baseHTML).insertAfter object
  else if `method == 'delete'`
    xj('.tooltip').remove()
  return
sticky: ->
  xj(window).scroll ->
    _stickyObj = xj('[xo-span="sticky"]')
    if xj(window).scrollTop() >= xo.config.defaultStickyOffset
      _stickyObj.addClass 'sticky-fixed'
    else
      _stickyObj.removeClass 'sticky-fixed'
    return
  return
panel: ->
  xj('[xo-type="panel-group"]').each ->
    _obj = '[xo-type="panel"]'
    _count = xj(this).children().length
    _parent = xj(this).width()
    xj(this).find(_obj).each ->
      xj(this).css 'width', _parent / _count - (_count + 1)
      return
    return
  return
getTemplateObjects: (type, template, parent) ->

  ###
   Template items are wrapped in double curly brackets ({{}})
   Comma (,) splits template items.
   Brackets ([]) delimit action items.
   Double hyphens (--) split action items.
   Items with multiple children are split with ampersand (@)
   Double bar symbols (||) split action items.
   Action items can
   var template = '{{title:This is the title}},{{body:This is the body}},{{buttons:Yes[action=xo-trigger--url=here.html]@No[action=xo-trigger--url=null]}}'
  ###

  _templateArray = template.split(',')
  _brutObject = []
  _itemHTML = ''
  i = 0
  ii = _templateArray.length
  while i < ii
    _brutObject.push
      a: _templateArray[i].replace('{{', '').replace('}}', '').split(':')[0]
      b: _templateArray[i].replace('{{', '').replace('}}', '').split(':')[1]
    i++
  switch type
    when 'modal'
      j = 0
      jj = _brutObject.length
      while j < jj
        if _brutObject[j].a.indexOf('buttons') > -1
          a = _brutObject[j].b.split('@')
          if a.length > 1
            _itemHTML += '<div class="xo modal buttons">'
            k = 0
            kk = a.length
            while k < kk
              _tVal = a[k].split('action=')[1].split('--')
              _tValA = _tVal[0]
              if _tVal.length > 1
                _tValB = _tVal[1].split('=')[0]
              _tMethod = _tValA + '="' + _tValB + '"'
              _tValue = _tValA + '-' + _tValB
              if a[k].indexOf('url') > -1
                _tAction = if `a[k].split('url=')[1].split(']')[0] != null` and `a[k].split('url=')[1].split(']')[0] != 'null'` then a[k].split('url=')[1].split(']')[0] else parent
              else if a[k].indexOf('modal') > -1
                _tAction = if `a[k].split('modal=')[1].split(']')[0] != null` and `a[k].split('modal=')[1].split(']')[0] != 'null'` then a[k].split('modal=')[1].split(']')[0] else parent
              _itemHTML += '<button '
              _itemHTML += _tMethod + ' '
              _itemHTML += _tValue + '="' + _tAction + '"'
              _itemHTML += '>' + a[k].split('[')[0] + '</button>'
              k++
            _itemHTML += '</div>'
        else
          _itemHTML += '<div class="xo modal ' + _brutObject[j].a + '">' + _brutObject[j].b + '</div>'
        j++
      return _itemHTML
    when 'popup'
  return
modal: (method, template) ->
  if `method != 'kill-modal'`
    _obj = '[xo-type="modal"]'
    _objName = xj(_obj).attr('xo-object-name')
    _filterObj = '[xo-type="modal-filter"]'
    _filterCode = '<div xo-type="modal-filter"></div>'
    _inlineTemplate = xj(_obj).attr('xo-data-template')
    if `typeof _inlineTemplate != undefined` and `_inlineTemplate != false`
      xj(_obj).contents().not('[xo-type="modal-toggle"]').remove()
      xj(_obj).append xo.getTemplateObjects('modal', _inlineTemplate, _objName)
    else if `template != typeof undefined` and `template != false`
      xj(_obj).contents().not('[xo-type="modal-toggle"]').remove()
      #empty modal content to avoid duplicates.
      xj(_obj).append xo.getTemplateObjects('modal', template)
    if xj(_obj).length > 0
      _state = xj(_obj).attr('xo-state')
    if `method == 'init'`
      xj(_obj).prepend '<div xo-type="modal-toggle">X</div>'
      xj(_obj).wrap '<div class="modal-wrapper" xo-state="closed">'
    else
      if `_state == 'open'`
        xj(_obj).attr 'xo-state', 'closed'
        xj(_obj).parent().attr 'xo-state', 'closed'
        xj(_filterObj).animate { opacity: 0 }, xo.config.animationSpeed, ->
          xj(_filterObj).remove()
          return
      else if `_state == 'closed'`
        xj(xo.config.defaultXOWrapper + '.xo').prepend _filterCode
        xj(_filterObj).animate { opacity: 1 }, xo.config.animationSpeed, ->
          xj(_obj).attr 'xo-state', 'open'
          xj(_obj).parent().attr 'xo-state', 'open'
          return
  else
    xj('[xo-object-name="' + template + '"]').attr('xo-state', 'closed').parent().attr 'xo-state', 'closed'
    xj('[xo-type="modal-filter"]').remove()
  return
gutter: (method, parent) ->

  ###
   creates an animatable gutter instance out of any html element. XO parameters
   define where it is placed and what it's initial state is to be. You can place
   as many XO gutters on your page as long as you make sure to give each one a
   unique xo-object-name value. Toggles for a particular gutter can be created
   by adding the xo-parent attribute
   i.e. <a xo-type="gutter-toggle" xo-parent="left-gutter">
  ###

  _baseObj = '[xo-type="gutter"]'
  #check if a gutter exists
  if `xj(_baseObj).length != 0`
    _obj = if `parent != null` and `parent != undefined` then _baseObj + '[xo-object-name="' + parent + '"]' else _baseObj
    _filterObj = '[xo-type="gutter-filter"]'
    _filterCode = '<div xo-type="gutter-filter" xo-parent="' + parent + '"></div>'
    if xj(_obj).length > 0
      _state = xj(_obj).attr('xo-state')
      _width = xj(_obj).width()
      _param = xj(_obj).attr('xo-type-param')
    if `method == 'init'`

      ###
       loop through each gutter object to give each of
       them and their enclosed close buttons and opacity
       filters the correct values and parameters
      ###

      xj(_baseObj).each ->
        `var _width`
        _p = xj(this).attr('xo-object-name')
        _width = xj(_obj).width()
        xj(this).prepend '<div xo-type="gutter-toggle" xo-parent="' + _p + '">X</div>'
        if `xj(this).attr('xo-state') == 'closed'`
          xj(this).css xj(this).attr('xo-type-param'), -_width
        return
    else
      _width = xj(_obj).width()
      if `_state == 'open'`
        if `_param == 'left'`
          xj(_obj).animate { left: -_width }, xo.config.animationSpeed, ->
            xj(_obj).attr 'xo-state', 'closed'
            return
        else if `_param == 'right'`
          xj(_obj).animate { right: -_width }, xo.config.animationSpeed, ->
            xj(_obj).attr 'xo-state', 'closed'
            return
        xj(_filterObj).animate { opacity: 0 }, xo.config.animationSpeed, ->
          xj(_filterObj).remove()
          return
      else if `_state == 'closed'`
        if `_param == 'left'`
          xj(_obj).animate { left: '0' }, xo.config.animationSpeed
        else if `_param == 'right'`
          xj(_obj).animate { right: '0' }, xo.config.animationSpeed
        xj(xo.config.defaultXOWrapper + '.xo').prepend _filterCode
        xj(_filterObj).animate { opacity: 1 }, xo.config.animationSpeed
        xj(_obj).attr 'xo-state', 'open'
  return
video: ->

  ###
   creates a video instance on the page. Writes
   the code necessary inside the html object that
   has the xo-type video. XO params define the
   source url, video format, etc..
  ###

  xj('[xo-type="video"]').each ->
    _obj = '[xo-type="video"]'
    _vdoW = xj(_obj).attr('xo-video-width') or 'auto'
    _vdoH = xj(_obj).attr('xo-video-height') or 'auto'
    _vdoS = xj(_obj).attr('xo-video-src')
    _vdoT = xj(_obj).attr('xo-video-format')
    _vdoC = xj(_obj).attr('xo-video-controls')
    _vdoA = xj(_obj).attr('xo-video-autoplay')
    _vdo = '<video width="' + _vdoW + '" height="' + _vdoH + '"'
    if `_vdoC == 'true'`
      _vdo += ' controls'
    if `_vdoA == 'true'`
      _vdo += ' autoplay'
    _vdo += '>'
    _vdo += '<source src="' + _vdoS + '" type="video/' + _vdoT + '">'
    _vdo += 'Your browser does not support the video tag.'
    _vdo += '</video>'
    xj(_obj).contents().remove()
    #removes content from the video placeholder
    xj(_obj).append _vdo
    return
  return
formToPage: ->

  ###
   function launched by init. Cycles through all objects
   on the page that have the xo-type="form" attribute and
   injects the correct form into them by calling the
   formBuilder function.
  ###

  xj('[xo-type="form"]').each ->
    _formTarget = xj(this).attr('xo-object-name')
    xo.formBuilder 'forms/' + _formTarget, _formTarget, _formTarget
    return
  return
formBuilder: (source, target, host) ->
  _tempData = xo.getData(null, source, 'b', target, false)
  _tempArray = []
  _tempOptions = '['
  _tempRadioOptions = '['
  _tempCheckOptions = '['
  _tempDataListOptions = '['
  _sessionSourceLoaded = xo.checkLoadedItems(xo.config.sessionStorageKey + host)
  if `_sessionSourceLoaded != true`
    _tempData.success (data) ->
      _initData = []
      _processData = data.form
      _initData.push
        action: data.formAction
        method: data.formMethod
        id: data.formId
        class: data.formClass
      Object.keys(_processData).forEach (key) ->
        switch _processData[key].item
          when 'select'
            if `typeof _processData[key].option == 'object'`
              _optionDepth = _processData[key].option.length
              o = 0
              while o < _optionDepth
                _tempOptions += '{"optionName":"' + _processData[key].option[o].name + '","optionValue":"' + _processData[key].option[o].value + '"'
                _tempOptions += if `_processData[key].option[o].selected == true` then ',"optionSelected":true' else ',"optionSelected":false'
                _tempOptions += '}'
                if o < _optionDepth - 1
                  _tempOptions += ','
                o++
              _tempOptions += ']'
              _tempOptions = JSON.parse(_tempOptions)
          when 'radiogroup'
            if `typeof _processData[key].option == 'object'`
              _optionDepth = _processData[key].option.length
              o = 0
              while o < _optionDepth
                _tempRadioOptions += '{"optionName":"' + _processData[key].option[o].name + '","optionValue":"' + _processData[key].option[o].value + '"'
                _tempRadioOptions += if `_processData[key].option[o].checked == true` then ',"optionChecked":true' else ',"optionChecked":false'
                _tempRadioOptions += '}'
                if o < _optionDepth - 1
                  _tempRadioOptions += ','
                o++
              _tempRadioOptions += ']'
              _tempRadioOptions = JSON.parse(_tempRadioOptions)
          when 'checkbox'
            if `typeof _processData[key].option == 'object'`
              _optionDepth = _processData[key].option.length
              o = 0
              while o < _optionDepth
                _tempCheckOptions += '{"optionName":"' + _processData[key].option[o].name + '","optionValue":"' + _processData[key].option[o].value + '"'
                _tempCheckOptions += if `_processData[key].option[o].checked == true` then ',"optionChecked":true' else ',"optionChecked":false'
                _tempCheckOptions += '}'
                if o < _optionDepth - 1
                  _tempCheckOptions += ','
                o++
              _tempCheckOptions += ']'
              _tempCheckOptions = JSON.parse(_tempCheckOptions)
          when 'datalist'
            if `typeof _processData[key].option == 'object'`
              _optionDepth = _processData[key].option.length
              o = 0
              while o < _optionDepth
                _tempDataListOptions += '{"optionValue":"' + _processData[key].option[o].value + '"}'
                if o < _optionDepth - 1
                  _tempDataListOptions += ','
                o++
              _tempDataListOptions += ']'
              _tempDataListOptions = JSON.parse(_tempDataListOptions)
        _tempArray.push
          item: _processData[key].item
          name: _processData[key].name
          label: _processData[key].label or null
          class: _processData[key].class or null
          id: _processData[key].id or null
          required: _processData[key].required or null
          multiple: _processData[key].multiple or null
          placeholder: _processData[key].placeholder or null
          value: _processData[key].value or null
          min: _processData[key].min - length or null
          max: _processData[key].max - length or null
          rows: _processData[key].rows or null
          cols: _processData[key].cols or null
          submit: _processData[key].submit or null
          options: _tempOptions or _tempRadioOptions or _tempCheckOptions or _tempDataListOptions
        return
      _formLength = _tempArray.length
      i = 0
      while i < _formLength
        switch _tempArray[i].item
          when 'text'
            _formCode = '<div class="form-line ' + _tempArray[i].item + '">'
            _formCode += if `_tempArray[i].label != null` then '<label for="' + _tempArray[i].name + '">' + _tempArray[i].label + '</label>' else ''
            _formCode += '<input type="text"'
            _formCode += if `_tempArray[i].name != null` then ' name="' + _tempArray[i].name + '"' else ''
            _formCode += if `_tempArray[i].class != null` then ' class="' + _tempArray[i].class + '"' else ''
            _formCode += if `_tempArray[i].id != null` then ' id="' + _tempArray[i].id + '"' else ''
            _formCode += if `_tempArray[i].required != null` and `_tempArray[i].required == true` then ' required' else ''
            _formCode += if `_tempArray[i].placeholder != null` then ' placeholder="' + _tempArray[i].placeholder + '"' else ''
            _formCode += if `_tempArray[i].value != null` then ' value="' + _tempArray[i].value + '"' else ''
            _formCode += if `_tempArray[i].min != null` then ' minlength="' + _tempArray[i].min + '"' else ''
            _formCode += if `_tempArray[i].max != null` then ' maxlength="' + _tempArray[i].max + '"' else ''
            _formCode += '></div>'
          when 'textarea'
            _formCode += '<div class="form-line ' + _tempArray[i].item + '">'
            _formCode += if `_tempArray[i].label != null` then '<label for="' + _tempArray[i].name + '">' + _tempArray[i].label + '</label>' else ''
            _formCode += '<textarea'
            _formCode += if `_tempArray[i].rows != null` then ' rows="' + _tempArray[i].rows + '"' else ''
            _formCode += if `_tempArray[i].cols != null` then ' cols="' + _tempArray[i].cols + '"' else ''
            _formCode += if `_tempArray[i].name != null` then ' name="' + _tempArray[i].name + '"' else ''
            _formCode += if `_tempArray[i].class != null` then ' class="' + _tempArray[i].class + '"' else ''
            _formCode += if `_tempArray[i].id != null` then ' id="' + _tempArray[i].id + '"' else ''
            _formCode += if `_tempArray[i].required != null` and `_tempArray[i].required == true` then ' required' else ''
            _formCode += if `_tempArray[i].placeholder != null` then ' placeholder="' + _tempArray[i].placeholder + '"' else ''
            _formCode += if `_tempArray[i].max != null` then ' maxlength="' + _tempArray[i].max + '"' else ''
            _formCode += '></textarea></div>'
          when 'select'
            _formCode += '<div class="form-line ' + _tempArray[i].item + '">'
            _formCode += if `_tempArray[i].label != null` then '<label for="' + _tempArray[i].name + '">' + _tempArray[i].label + '</label>' else ''
            _formCode += '<select'
            _formCode += if `_tempArray[i].name != null` then ' name="' + _tempArray[i].name + '"' else ''
            _formCode += if `_tempArray[i].required != null` and `_tempArray[i].required == true` then ' required' else ''
            _formCode += if `_tempArray[i].multiple != null` and `_tempArray[i].multiple == true` then ' multiple' else ''
            _formCode += if `_tempArray[i].class != null` then ' class="' + _tempArray[i].class + '"' else ''
            _formCode += if `_tempArray[i].id != null` then ' id="' + _tempArray[i].id + '"' else ''
            _formCode += '>'
            j = 0
            jj = _tempArray[i].options.length
            while j < jj
              _formCode += '<option'
              _formCode += if `_tempArray[i].options[j].optionSelected != null` and `_tempArray[i].options[j].optionSelected == true` then ' selected' else ''
              _formCode += ' value="' + _tempArray[i].options[j].optionValue + '">'
              _formCode += _tempArray[i].options[j].optionName + '</option>'
              j++
            _formCode += '</select></div>'
          when 'radiogroup'
            _formCode += '<div class="form-line ' + _tempArray[i].item + '">'
            _formCode += if `_tempArray[i].label != null` then '<label for="' + _tempArray[i].name + '">' + _tempArray[i].label + '</label>' else ''
            k = 0
            kk = _tempArray[i].options.length
            while k < kk
              _formCode += '<input type="radio"'
              _formCode += ' name="' + _tempArray[i].name + '"'
              _formCode += if `_tempArray[i].options[k].optionChecked != null` and `_tempArray[i].options[k].optionChecked == true` then ' checked' else ''
              _formCode += ' value="' + _tempArray[i].options[k].optionValue + '">'
              k++
            _formCode += '</div>'
          when 'checkbox'
            _formCode += '<div class="form-line ' + _tempArray[i].item + '">'
            _formCode += if `_tempArray[i].label != null` then '<label for="' + _tempArray[i].name + '">' + _tempArray[i].label + '</label>' else ''
            l = 0
            ll = _tempArray[i].options.length
            while l < ll
              _formCode += '<input type="checkbox"'
              _formCode += ' name="' + _tempArray[i].name + '"'
              _formCode += if `_tempArray[i].options[l].optionChecked != null` and `_tempArray[i].options[l].optionChecked == true` then ' checked' else ''
              _formCode += ' value="' + _tempArray[i].options[l].optionValue + '">'
              l++
            _formCode += '</div>'
          when 'datalist'
            _formCode += '<div class="form-line ' + _tempArray[i].item + '">'
            _formCode += if `_tempArray[i].label != null` then '<label for="' + _tempArray[i].name + '">' + _tempArray[i].label + '</label>' else ''
            _formCode += '<input list="' + _tempArray[i].id + '" name="' + _tempArray[i].name + '">'
            _formCode += '<datalist id="' + _tempArray[i].id + '">'
            m = 0
            mm = _tempArray[i].options.length
            while m < mm
              _formCode += '<option value="' + _tempArray[i].options[m].optionValue + '">'
              m++
            _formCode += '</datalist>'
            _formCode += if `_tempArray[i].submit != true` then '' else '<input type="submit">'
            _formCode += '</div>'
        i++
      _formPrepend = '<form action="' + _initData[0].action + '" method="' + _initData[0].method + '" id="' + _initData[0].id + '" class="' + _initData[0].class + '">'
      _formAppend = '</form>'
      xj('[xo-object-name="' + host + '"]').append _formPrepend + _formCode + _formAppend
      xo.saveLoadedItems xo.config.sessionStorageKey + host
      return
  else
    xo.warningBar 'attention', 'DATA LOADED', 'This form instance has already been loaded', 'body'
  return
layoutToPage: ->

  ###
   function launched by init. Cycles through all objects
   on the page that have the xo-type="data" attribute and
   injects the correct form into them by calling the
   formBuilder function.
  ###

  xj('[xo-type="data"]').each ->
    _dataTarget = xj(this).attr('xo-object-name')
    _dataSource = xj(this).attr('xo-data-source')
    xo.layoutBuilder _dataSource, _dataTarget, _dataTarget
    return
  return
layoutBuilder: (source, target, host) ->
  _tempData = xo.getData(null, source, 'b', target, false)
  _tempArray = []
  _tempOptions = '['
  _sessionSourceLoaded = xo.checkLoadedItems(xo.config.sessionStorageKey + host)
  if `_sessionSourceLoaded != true`
    _tempData.success (data) ->
      _processData = data.page
      Object.keys(_processData).forEach (key) ->
        if `typeof _processData[key].node == 'object'`
          _optionDepth = _processData[key].node.length
          o = 0
          while o < _optionDepth
            _tempOptions += '{"nodeType":"' + _processData[key].node[o].type + '",'
            _tempOptions += if `_processData[key].node[o].class != null` then '"nodeClass":"' + _processData[key].node[o].class + '",' else '"nodeClass":null,'
            _tempOptions += if `_processData[key].node[o].id != null` then '"nodeID":"' + _processData[key].node[o].id + '",' else '"nodeId":null,'
            _tempOptions += if `_processData[key].node[o].xoType != null` then '"nodexoType":"' + _processData[key].node[o].xoType + '",' else '"nodexoType":null,'
            _tempOptions += if `_processData[key].node[o].xoState != null` then '"nodexoState":"' + _processData[key].node[o].xoState + '",' else '"nodexoState":null,'
            _tempOptions += if `_processData[key].node[o].xoSpan != null` then '"nodexoSpan":"' + _processData[key].node[o].xoSpan + '",' else '"nodexoSpan":null,'
            _tempOptions += if `_processData[key].node[o].xoObjectName != null` then '"nodexoObjectName":"' + _processData[key].node[o].xoObjectName + '",' else '"nodexoObjectName":null,'
            _tempOptions += if `_processData[key].node[o].xoTypeParam != null` then '"nodexoTypeParam":"' + _processData[key].node[o].xoTypeParam + '",' else '"nodexoTypeParam":null,'
            _tempOptions += if `_processData[key].node[o].xoParent != null` then '"nodexoParent":"' + _processData[key].node[o].xoParent + '",' else '"nodexoParent":null,'
            _tempOptions += '"nodeContent":"' + _processData[key].node[o].content + '"'
            _tempOptions += '}'
            if o < _optionDepth - 1
              _tempOptions += ','
            o++
          _tempOptions += ']'
          _tempOptions = JSON.parse(_tempOptions)
        _tempArray.push
          page: _processData[key].id
          title: _processData[key].title
          metas: _processData[key].metas
          node: _tempOptions
        _layoutCode = ''
        _baseNode = _tempArray[0].node
        i = 0
        ii = _baseNode.length
        while i < ii
          _layoutCode += '<' + _baseNode[i].nodeType
          _layoutCode += if `_baseNode[i].nodexoType != null` and `_baseNode[i].nodexoType != undefined` then ' xo-type="' + _baseNode[i].nodexoType + '"' else ''
          _layoutCode += if `_baseNode[i].nodeClass != null` and `_baseNode[i].nodeClass != undefined` then ' class="' + _baseNode[i].nodeClass + '"' else ''
          _layoutCode += if `_baseNode[i].nodeID != null` and `_baseNode[i].nodeID != undefined` then ' id="' + _baseNode[i].nodeID + '"' else ''
          _layoutCode += if `_baseNode[i].nodexoState != null` and `_baseNode[i].nodexoState != undefined` then ' xo-state="' + _baseNode[i].nodexoState + '"' else ''
          _layoutCode += if `_baseNode[i].nodexoSpan != null` and `_baseNode[i].nodexoSpan != undefined` then ' xo-span="' + _baseNode[i].nodexoSpan + '"' else ''
          _layoutCode += if `_baseNode[i].nodexoObjectName != null` and `_baseNode[i].nodexoObjectName != undefined` then ' xo-object-name="' + _baseNode[i].nodexoObjectName + '"' else ''
          _layoutCode += if `_baseNode[i].nodexoTypeParam != null` and `_baseNode[i].nodexoTypeParam != undefined` then ' xo-type-param="' + _baseNode[i].nodexoTypeParam + '"' else ''
          _layoutCode += if `_baseNode[i].nodexoParent != null` and `_baseNode[i].nodexoParent != undefined` then ' xo-parent="' + _baseNode[i].nodexoParent + '"' else ''
          _layoutCode += '>' + _baseNode[i].nodeContent + '</' + _baseNode[i].nodeType + '>'
          i++
        xj('[xo-object-name="' + host + '"]').append _layoutCode
        xo.saveLoadedItems xo.config.sessionStorageKey + host
        return
      return
  else
    xo.warningBar 'attention', 'DATA LOADED', 'This data instance has already been loaded', 'body'
  return
dropDownInit: ->

  ###
   initializes the display of dropdown navigation bars as needed.
   Feature can be enabled in xo.config. dropDownInit cycles
   through the page dom to find xo-type dropdown objects
   and displays the dropdowns in place. Dropdowns can be static
   or json.
  ###

  xj('[xo-type="dropdown"]').each ->
    _buttonLabel = xj(this).attr('xo-dropdown-button')
    _objectName = xj(this).attr('xo-object-name')
    xo.dropDownBuilder _buttonLabel, _objectName, 'static', null
    return
  xj('[xo-type="jsondropdown"]').each ->
    _buttonLabel = xj(this).attr('xo-dropdown-button')
    _objectName = xj(this).attr('xo-object-name')
    _objectSource = xj(this).attr('xo-data-source')
    xo.dropDownBuilder _buttonLabel, _objectName, 'json', _objectSource
    return
  return
dropDownBuilder: (button, object, type, source) ->

  ###*
  # button @type=string : button text
  # object @type=string : page dom element
  # type @type=string : either static or json
  # source @type= string : json source url
  ###

  switch type
    when 'static'
      _this = '[xo-object-name="' + object + '"]'
      _initialState = xj(_this).attr('xo-state')
      _buttonHTML = '<button xo-type="dropdown-button" xo-parent="' + object + '">' + button + '</button>'
      xj(_this).prepend(_buttonHTML).find('ul').attr('xo-object-name', object).attr 'xo-state', _initialState
    when 'json'
      _this = '[xo-object-name="' + object + '"]'
      _initialState = xj(_this).attr('xo-state')
      _buttonHTML = '<button xo-type="dropdown-button" xo-parent="' + object + '">' + button + '</button>'
      _tempData = xo.getData(null, source, 'b', object, false)
      _sessionSourceLoaded = xo.checkLoadedItems(xo.config.sessionStorageKey + object)
      _dropdownHTML = ''
      if `_sessionSourceLoaded != true`
        _tempData.success (data) ->
          _processData = data.dropdown
          _dropdownHTML += '<ul xo-object-name="' + object + '" xo-state="' + _initialState + '">'
          Object.keys(_processData).forEach (key) ->
            _dropdownHTML += '<li'
            _dropdownHTML += if `_processData[key].xotype != null` and `_processData[key].xotype != undefined` then ' xo-type="' + _processData[key].xotype + '"' else ''
            _dropdownHTML += if `_processData[key].xotrigger != null` and `_processData[key].xotrigger != undefined` then ' xo-trigger="' + _processData[key].xotrigger + '"' else ''
            _dropdownHTML += if `_processData[key].xotriggerurl != null` and `_processData[key].xotriggerurl != undefined` then ' xo-trigger-url="' + _processData[key].xotriggerurl + '"' else ''
            _dropdownHTML += if `_processData[key].xostate != null` and `_processData[key].xostate != undefined` then ' xo-state="' + _processData[key].xostate + '"' else ''
            _dropdownHTML += if `_processData[key].xoobjectname != null` and `_processData[key].xoobjectname != undefined` then ' xo-object-name="' + _processData[key].xoobjectname + '"' else ''
            _dropdownHTML += if `_processData[key].xoparent != null` and `_processData[key].xoparent != undefined` then ' xo-parent="' + _processData[key].xoparent + '"' else ''
            _dropdownHTML += if `_processData[key].class != null` and `_processData[key].class != undefined` then ' class="' + _processData[key].class + '"' else ''
            _dropdownHTML += if `_processData[key].id != null` and `_processData[key].id != undefined` then ' id="' + _processData[key].id + '"' else ''
            _dropdownHTML += '>'
            _dropdownHTML += _processData[key].content
            _dropdownHTML += '</li>'
            return
          _dropdownHTML += '</ul>'
          xj(_this).prepend(_buttonHTML).find('ul').attr('xo-object-name', object).attr 'xo-state', _initialState
          xj('[xo-object-name="' + object + '"]').append _dropdownHTML
          xo.saveLoadedItems xo.config.sessionStorageKey + object
          return
      else
        xo.warningBar 'attention', 'DATA LOADED', 'This data instance has already been loaded', 'body'
  return
navInit: ->

  ###
   initializes the display of navigation bars as needed.
   Feature can be enabled in xo.config. navInit cycles
   through the page dom to find xo-type navigation objects
   and displays the nav bar in place
  ###

  xj('[xo-type="navigation"]').each ->
    _objectName = xj(this).attr('xo-object-name')
    _objectSource = xj(this).attr('xo-data-source')
    xo.navBuilder _objectSource, _objectName
    return
  return
navBuilder: (source, target) ->

  ###
   this function builds a navigation bar from
   a json file. Check the nav-bar.json file
   in dist/json/nav for the structure and
   options that are available.
   The navBuilder reuses functions and features
   such as buttons, dropdowns, form objects.
  ###

  _tempData = xo.getData(null, source, 'b', target, false)
  _tempArray = []
  _sessionSourceLoaded = xo.checkLoadedItems(xo.config.sessionStorageKey + target)
  if `_sessionSourceLoaded != true`
    _tempData.success (data) ->
      _processData = data.nav
      Object.keys(_processData).forEach (key) ->
        if `_processData[key].nodes != null` and `_processData[key].nodes != undefined` and `_processData[key].nodes != 'undefined'` and `typeof _processData[key].nodes == 'object'`
          _optionDepth = _processData[key].nodes.length
          _tempNodes = '['
          o = 0
          while o < _optionDepth
            _tempNodes += '{"nodetype":"' + _processData[key].nodes[o].type + '"'
            _tempNodes += if `_processData[key].nodes[o].class != null` and `_processData[key].nodes[o].class != 'undefined'` and `_processData[key].nodes[o].class != undefined` then ',"nodeclass":"' + _processData[key].nodes[o].class + '"' else ''
            _tempNodes += if `_processData[key].nodes[o].id != null` and `_processData[key].nodes[o].id != 'undefined'` and `_processData[key].nodes[o].id != undefined` then ',"nodeid":"' + _processData[key].nodes[o].id + '"' else ''
            _tempNodes += if `_processData[key].nodes[o].xotype != null` and `_processData[key].nodes[o].xotype != 'undefined'` and `_processData[key].nodes[o].xotype != undefined` then ',"nodexotype":"' + _processData[key].nodes[o].xotype + '"' else ''
            _tempNodes += if `_processData[key].nodes[o].xostate != null` and `_processData[key].nodes[o].xostate != 'undefined'` and `_processData[key].nodes[o].xostate != undefined` then ',"nodexostate":"' + _processData[key].nodes[o].xostate + '"' else ''
            _tempNodes += if `_processData[key].nodes[o].xoObjectName != null` and `_processData[key].nodes[o].xoobjectname != 'undefined'` and `_processData[key].nodes[o].xoobjectname != undefined` then ',"nodexoobjectname":"' + _processData[key].nodes[o].xoobjectname + '"' else ''
            _tempNodes += if `_processData[key].nodes[o].xoParent != null` and `_processData[key].nodes[o].xoparent != 'undefined'` and `_processData[key].nodes[o].xoparent != undefined` then ',"nodexoparent":"' + _processData[key].nodes[o].xoparent + '"' else ''
            _tempNodes += if `_processData[key].nodes[o].label != null` and `_processData[key].nodes[o].label != 'undefined'` and `_processData[key].nodes[o].label != undefined` then ',"nodecontent":"' + _processData[key].nodes[o].label + '"' else ''
            _tempNodes += '}'
            if o < _optionDepth - 1
              _tempNodes += ','
            o++
          _tempNodes += ']'
          _tempNodes = JSON.parse(_tempNodes)
        _tempArray.push
          type: _processData[key].type
          label: _processData[key].label
          url: _processData[key].url
          class: _processData[key].class
          id: _processData[key].id
          xotype: _processData[key].xotype
          xotrigger: _processData[key].xotrigger
          xotriggerurl: _processData[key].xotriggerurl
          xostate: _processData[key].xostate
          xoobjectname: _processData[key].xoobjectname
          xoparent: _processData[key].xoparent
          placeholder: _processData[key].placeholder
          button: _processData[key].buttonLabel
          node: _tempNodes
        return
      _navCode = ''
      i = 0
      ii = _tempArray.length
      while i < ii
        switch _tempArray[i].type
          when 'icon'
            _navCode += '<div class="nav-icon"'
            _navCode += if `_tempArray[i].xostate != null` and `_tempArray[i].xostate != 'undefined'` and `_tempArray[i].xostate != undefined` then ' xo-state="' + _tempArray[i].xostate + '"' else ''
            _navCode += if `_tempArray[i].xotype != null` and `_tempArray[i].xotype != 'undefined'` and `_tempArray[i].xotype != undefined` then ' xo-type="' + _tempArray[i].xotype + '"' else ''
            _navCode += if `_tempArray[i].xoparent != null` and `_tempArray[i].xoparent != 'undefined'` and `_tempArray[i].xoparent != undefined` then ' xo-parent="' + _tempArray[i].xoparent + '"' else ''
            _navCode += '>'
            _navCode += if `_tempArray[i].class != null` and `_tempArray[i].class != 'undefined'` and `_tempArray[i].class != undefined` then '<span class="' + _tempArray[i].class + '"></span>' else ''
            _navCode += '</div>'
          when 'image'
            _navCode += '<img'
            _navCode += if `_tempArray[i].xotype != null` and `_tempArray[i].xotype != 'undefined'` and `_tempArray[i].xotype != undefined` then ' xo-type="' + _tempArray[i].xotype + '"' else ''
            _navCode += if `_tempArray[i].xotrigger != null` and `_tempArray[i].xotrigger != 'undefined'` and `_tempArray[i].xotrigger != undefined` then ' xo-trigger="' + _tempArray[i].xotrigger + '"' else ''
            _navCode += if `_tempArray[i].xotriggerurl != null` and `_tempArray[i].xotriggerurl != 'undefined'` and `_tempArray[i].xotriggerurl != undefined` then ' xo-trigger-url="' + _tempArray[i].xotriggerurl + '"' else ''
            _navCode += if `_tempArray[i].xostate != null` and `_tempArray[i].xostate != 'undefined'` and `_tempArray[i].xostate != undefined` then ' xo-state="' + _tempArray[i].xostate + '"' else ''
            _navCode += if `_tempArray[i].xoobjectname != null` and `_tempArray[i].xoobjectname != 'undefined'` and `_tempArray[i].xoobjectname != undefined` then ' xo-object-name="' + _tempArray[i].xoobjectname + '"' else ''
            _navCode += if `_tempArray[i].xoparent != null` and `_tempArray[i].xoparent != 'undefined'` and `_tempArray[i].xoparent != undefined` then ' xo-parent="' + _tempArray[i].xoparent + '"' else ''
            _navCode += if `_tempArray[i].class != null` and `_tempArray[i].class != 'undefined'` and `_tempArray[i].class != undefined` then ' class="' + _tempArray[i].class + '"' else ''
            _navCode += if `_tempArray[i].id != null` and `_tempArray[i].id != 'undefined'` and `_tempArray[i].id != undefined` then ' id="' + _tempArray[i].id + '"' else ''
            _navCode += ' src="' + _tempArray[i].url
            _navCode += '" />'
          when 'button'
            _navCode += '<button'
            _navCode += if `_tempArray[i].xotype != null` and `_tempArray[i].xotype != 'undefined'` and `_tempArray[i].xotype != undefined` then ' xo-type="' + _tempArray[i].xotype + '"' else ''
            _navCode += if `_tempArray[i].xotrigger != null` and `_tempArray[i].xotrigger != 'undefined'` and `_tempArray[i].xotrigger != undefined` then ' xo-trigger="' + _tempArray[i].xotrigger + '"' else ''
            _navCode += if `_tempArray[i].xotriggerurl != null` and `_tempArray[i].xotriggerurl != 'undefined'` and `_tempArray[i].xotriggerurl != undefined` then ' xo-trigger-url="' + _tempArray[i].xotriggerurl + '"' else ''
            _navCode += if `_tempArray[i].xostate != null` and `_tempArray[i].xostate != 'undefined'` and `_tempArray[i].xostate != undefined` then ' xo-state="' + _tempArray[i].xostate + '"' else ''
            _navCode += if `_tempArray[i].xoobjectname != null` and `_tempArray[i].xoobjectname != 'undefined'` and `_tempArray[i].xoobjectname != undefined` then ' xo-object-name="' + _tempArray[i].xoobjectname + '"' else ''
            _navCode += if `_tempArray[i].xoparent != null` and `_tempArray[i].xoparent != 'undefined'` and `_tempArray[i].xoparent != undefined` then ' xo-parent="' + _tempArray[i].xoparent + '"' else ''
            _navCode += if `_tempArray[i].class != null` and `_tempArray[i].class != 'undefined'` and `_tempArray[i].class != undefined` then ' class="' + _tempArray[i].class + '"' else ''
            _navCode += if `_tempArray[i].id != null` and `_tempArray[i].id != 'undefined'` and `_tempArray[i].id != undefined` then ' id="' + _tempArray[i].id + '"' else ''
            _navCode += '>'
            _navCode += _tempArray[i].label
            _navCode += '</button>'
          when 'search'
            _navCode += '<form'
            _navCode += if `_tempArray[i].xotype != null` and `_tempArray[i].xotype != 'undefined'` and `_tempArray[i].xotype != undefined` then ' xo-type="' + _tempArray[i].xotype + '"' else ''
            _navCode += if `_tempArray[i].xotrigger != null` and `_tempArray[i].xotrigger != 'undefined'` and `_tempArray[i].xotrigger != undefined` then ' xo-trigger="' + _tempArray[i].xotrigger + '"' else ''
            _navCode += if `_tempArray[i].xotriggerurl != null` and `_tempArray[i].xotriggerurl != 'undefined'` and `_tempArray[i].xotriggerurl != undefined` then ' xo-trigger-url="' + _tempArray[i].xotriggerurl + '"' else ''
            _navCode += if `_tempArray[i].xostate != null` and `_tempArray[i].xostate != 'undefined'` and `_tempArray[i].xostate != undefined` then ' xo-state="' + _tempArray[i].xostate + '"' else ''
            _navCode += if `_tempArray[i].xoobjectname != null` and `_tempArray[i].xoobjectname != 'undefined'` and `_tempArray[i].xoobjectname != undefined` then ' xo-object-name="' + _tempArray[i].xoobjectname + '"' else ''
            _navCode += if `_tempArray[i].xoparent != null` and `_tempArray[i].xoparent != 'undefined'` and `_tempArray[i].xoparent != undefined` then ' xo-parent="' + _tempArray[i].xoparent + '"' else ''
            _navCode += if `_tempArray[i].class != null` and `_tempArray[i].class != 'undefined'` and `_tempArray[i].class != undefined` then ' class="' + _tempArray[i].class + '"' else ''
            _navCode += if `_tempArray[i].id != null` and `_tempArray[i].id != 'undefined'` and `_tempArray[i].id != undefined` then ' id="' + _tempArray[i].id + '"' else ''
            _navCode += '><input type="text"'
            _navCode += if `_tempArray[i].placeholder != null` and `_tempArray[i].placeholder != 'undefined'` and `_tempArray[i].placeholder != undefined` then ' placeholder="' + _tempArray[i].placeholder + '"' else ''
            _navCode += '>'
            _navCode += if `_tempArray[i].buttonLabel != null` and `_tempArray[i].buttonLabel != 'undefined'` and `_tempArray[i].buttonLabel != undefined` then '<input type="submit" value="' + _tempArray[i].buttonLabel + '">' else ''
            _navCode += '</form>'
          when 'dropdown'
            _navCode += '<div class="nav-dropdown" xo-state="closed">'
            _navCode += '<button xo-type="' + _tempArray[i].xotype + '" xo-parent="' + _tempArray[i].xoparent + '" class="' + _tempArray[i].class + '">' + _tempArray[i].label + '</button>'
            if `_tempArray[i].node != null` and `_tempArray[i].node != undefined` and `_tempArray[i].node != 'undefined'` and `_tempArray[i].node != ''`

              ###
               this creates a dropdown below the nav item
               (usually a button) if the json has child
               nodes. See the documentation for how this
               is used
              ###

              _navCode += '<ul xo-object-name="' + _tempArray[i].xoparent + '" xo-state="closed">'
              j = 0
              jj = _tempArray[i].node.length
              while j < jj
                if `_tempArray[i].node[j].nodetype == 'line'`
                  _navCode += '<li xo-type="' + _tempArray[i].node[j].nodexotype + '" xo-state="' + _tempArray[i].node[j].nodexostate + '" xo-object-name="' + _tempArray[i].node[j].nodexoobjectname + '" xo-parent="' + _tempArray[i].node[j].nodexoparent + '" class="' + _tempArray[i].node[j].nodeclass + '" id="' + _tempArray[i].node[j].nodeid + '">' + _tempArray[i].node[j].nodecontent + '</li>'
                else if `_tempArray[i].node[j].nodetype == 'seperator'`
                  _navCode += '<li xo-type="dropdown-seperator"></li>'
                j++
            _navCode += '</div>'
        i++
      xj('[xo-object-name="' + target + '"]').append _navCode
      return
  return
warningBar: (type, title, content, host) ->

  ###
   xo-type can be
   success : green bar
   attention : blue bar
   alert : yellow bar
   error : red bar
  ###

  _objectHTML = '<div xo-type="warning" xo-type-param="' + type + '" xo-state="open">'
  _objectHTML += if `title != null` and `title != undefined` then '<div class="message title">' + title + '</div>' else ''
  _objectHTML += if `content != null` and `content != undefined` then '<div class="message content">' + content + '</div>' else ''
  _objectHTML += '</div>'
  if `host == 'body'` then xj(xo.config.domParentNode).prepend(_objectHTML) else xj('[xo-object-name="' + host + '"]').prepend(_objectHTML)
  return
poster: ->
  _obj = xj('[xo-type="poster"]')
  _objName = _obj.attr('xo-object-name')
  _objParent = _obj.attr('xo-parent')
  _objState = _obj.attr('xo-state')
  _posterBackground = _obj.attr('xo-poster-source')
  _posterSize = _obj.attr('xo-poster-size')
  _posterProportion = _obj.attr('xo-type-param')
  _posterText = _obj.find('[xo-type="poster-text"]')

  ###
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
  ###

  if `_posterProportion == 'fullscreen'`
    _posterWidth = '100%'
    _posterHeight = '100%'
  else
    _posterWidth = _posterSize.split(',')[0]
    _posterHeight = _posterSize.split(',')[1]
  if _posterText.length > 0
    xj(_posterText).each ->
      _textParams = xj(this).attr('xo-type-param')
      _textSize = if `_textParams.split(',')[0] != 'x'` then _textParams.split(',')[0] else null
      _textColor = if `_textParams.split(',')[1] != 'x'` then _textParams.split(',')[1] else null
      _textAlign = if `_textParams.split(',')[2] != 'x'` then _textParams.split(',')[2] else null
      if _textParams.split(',')[3].indexOf('rgb') > -1
        _textBoxColor = if `_textParams.split(',')[3] != 'x'` then _textParams.split(',')[3].replace(/-/g, ',') else null
      _textBoxWidth = if `_textParams.split(',')[4] != 'x'` then _textParams.split(',')[4] else null
      _textBoxHeight = if `_textParams.split(',')[5] != 'x'` then _textParams.split(',')[5] else null
      _textBoxPadding = if `_textParams.split(',')[6] != 'x'` then _textParams.split(',')[6] else null
      xj(this).css
        'font-size': _textSize
        'color': _textColor
        'text-align': _textAlign
        'background-color': _textBoxColor
        'width': _textBoxWidth
        'height': _textBoxHeight
        'padding': _textBoxPadding
        'margin': '0 auto'
      return
  if `_objParent != undefined`
    _item = xj('[xo-object-name="' + _objName + '"]').detach()
    xj(_objParent).prepend _item
  _obj.css
    'position': 'absolute'
    'display': 'block'
    'width': _posterWidth
    'height': _posterHeight
    'background-image': 'url(' + _posterBackground + ')'
    'background-repeat': 'no-repeat'
    'background-size': 'cover'
  if `_objState == 'closed'` then _obj.attr('xo-state', 'open') else _obj.attr('xo-state', 'closed')
  return
navPanelBuilder: (mode) ->
  if `mode == 'tabs'`
    _tabObject = '[xo-type="tabs"]'
    _tabObjectId = xj(_tabObject).attr('xo-object-name')
    _tabObjectMode = xj(_tabObject).attr('xo-type-param')
    _tabHeader = '<div xo-type="header">'

    ###
     it's probably not necessary to wrap the nodes in a header div.
     This would make the code identical to the accordion builder
     and could be switched out by a function parameter
    ###

    xj(_tabObject).find('[xo-type="node"]').each ->
      _tabHeaderLabel = xj(this).attr('xo-header')
      _tabHeaderParent = xj(this).attr('xo-object-name')
      _tabDefaultState = xj(this).attr('xo-state')
      _tabHeader += '<div xo-type="header-node" xo-type-param="'
      _tabHeader += if `_tabDefaultState == 'open'` then 'active' else ''
      _tabHeader += '" xo-parent="' + _tabHeaderParent + '">'
      if `_tabObjectMode == 'text'`
        _tabHeader += _tabHeaderLabel
      else if `_tabObjectMode == 'icon'`
        _tabHeader += '<span class="' + _tabHeaderLabel + '"></span>'
      _tabHeader += '</div>'
      return
    _tabHeader += '</div>'
    xj('[xo-object-name="' + _tabObjectId + '"]').prepend _tabHeader
    xj('[xo-object-name="' + _tabObjectId + '"]').find('[xo-type="node"]').wrapAll '<div xo-type="block">'
  else if `mode == 'accordion'`
    _accObject = '[xo-type="accordion"]'
    _accObjectId = xj(_accObject).attr('xo-object-name')
    _accObjectMode = xj(_accObject).attr('xo-type-param')
    xj(_accObject).find('[xo-type="node"]').each ->
      _accHeaderLabel = xj(this).attr('xo-header')
      _accHeaderParent = xj(this).attr('xo-object-name')
      _accDefaultState = xj(this).attr('xo-state')
      _accHeader = '<div xo-type="header-node" xo-type-param="'
      _accHeader += if `_accDefaultState == 'open'` then 'active' else ''
      _accHeader += '" xo-parent="' + _accHeaderParent + '">'
      if `_accObjectMode == 'text'`
        _accHeader += _accHeaderLabel
      else if `_accObjectMode == 'icon'`
        _accHeader += '<span class="' + _accHeaderLabel + '"></span>'
      _accHeader += '</div>'
      xj(_accHeader).insertBefore this
      return
  return
initMouseEvents: ->
  mouseX = undefined
  mouseY = undefined
  xj('body').on('mouseover', '[xo-trigger="tooltip"]', (e) ->
    mouseX = e.pageX
    mouseY = e.pageY
    xo.tooltip xj(this), 'add'
    return
  ).on('mouseout', '[xo-trigger="tooltip"]', ->
    xo.tooltip null, 'delete'
    return
  ).on('click', '[xo-trigger="url"]', ->
    _goToUrl = xj(this).attr('xo-trigger-url')
    xo.trigger 'direct', _goToUrl, null
    return
  ).on('click', '[xo-trigger-close="modal"]', ->
    xo.modal()

    ###var _targetModal = xj(this).attr('xo-trigger-close-modal');
     xo.trigger('kill-modal', _targetModal, null);
    ###

    return
  ).on('click', '[xo-type="gutter-toggle"]', ->
    a = xj(this).attr('xo-parent') or null
    xo.gutter null, a
    return
  ).on('click', '[xo-trigger="gutter-toggle"]', ->
    a = xj(this).attr('xo-parent') or null
    xo.gutter null, a
    return
  ).on('click', '[xo-trigger="poster"]', ->
    xo.poster()
    return
  ).on('click', '[xo-type="poster-toggle"]', ->
    xo.poster()
    return
  ).on('click', '[xo-type="data-toggle"]', ->
    xo.layoutToPage()
    return
  ).on('click', '[xo-trigger="data-toggle"]', ->
    xo.layoutToPage()
    return
  ).on('click', '[xo-type="gutter-filter"]', ->
    a = xj(this).attr('xo-parent') or null
    xo.gutter null, a
    return
  ).on('click', '[xo-type="modal-toggle"]', ->
    if `xj(this).attr('xo-data-template') != ''`
      xo.modal null, xj(this).attr('xo-data-template')
    return
  ).on('click', '[xo-type="modal-filter"]', ->
    xo.modal()
    return
  ).on('click', '[xo-type="dropdown-button"]', ->
    _target = xj(this).attr('xo-parent')
    _object = 'ul[xo-object-name="' + _target + '"]'
    _clickedState = xj(_object).attr('xo-state')
    _parentSize = xj(this).parent().width()
    if `_clickedState == 'open'`
      xj(_object).attr('xo-state', 'closed').parent().attr 'xo-state', 'closed'
    else if `_clickedState == 'closed'`
      xj(_object).attr('xo-state', 'open').css('width', _parentSize).parent().attr 'xo-state', 'open'
    return
  ).on('click', '[xo-type="warning"]', ->
    xj(this).slideToggle 500
    return
  ).on('click', '[xo-type="tabs"] [xo-type="header-node"]', ->
    _toggleTabContent = xj(this).attr('xo-parent')
    xj('[xo-type="tabs"] [xo-type="node"]').attr 'xo-state', 'closed'
    xj('[xo-type="tabs"] [xo-type="node"][xo-object-name="' + _toggleTabContent + '"]').attr 'xo-state', 'open'
    xj('[xo-type="tabs"] [xo-type="header-node"]').attr 'xo-type-param', ''
    xj(this).attr 'xo-type-param', 'active'
    return
  ).on 'click', '[xo-type="accordion"] [xo-type="header-node"]', ->
    _toggleAccordionContent = xj(this).attr('xo-parent')
    xj('[xo-type="accordion"] [xo-type="node"]').attr 'xo-state', 'closed'
    xj('[xo-type="accordion"] [xo-type="node"][xo-object-name="' + _toggleAccordionContent + '"]').attr 'xo-state', 'open'
    xj('[xo-type="accordion"] [xo-type="header-node"]').attr 'xo-type-param', ''
    xj(this).attr 'xo-type-param', 'active'
    return
  return
app = {}
app.method = {}

app::quit = ->
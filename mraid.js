var mraid=window.parent.mraid;if("undefined"==typeof mraid){var bridge={receiver:window.parent,send:function(e,i){/*return bridge.receiver.controller.postMessage({target:"controller",action:e,arguments:i},"*")*/}};mraid={_version:"2.0",_state:"loading",_placementType:"inline",_defaultPosition:{x:0,y:0,width:-1,height:-1},_customClose:!1,_expandProperties:{useCustomClose:!1,width:"auto",height:"auto",isModal:!0,lockOrientation:!1},_resizeProperties:{width:-1,height:-1,offsetX:-1,offsetY:-1,customClosePosition:"top-right",allowOffscreen:!0},_listeners:{ready:[],error:[],stateChange:[],viewableChange:[],sizeChange:[]},_event:function(e){var i=Array.prototype.slice.call(arguments,1,arguments.length);for(var t in mraid._listeners[e])mraid._listeners[e][t].apply(mraid,i)},_loaded:function(){mraid._viewable=!0,mraid._stateChangeEvent("default"),mraid._defaultPosition=bridge.send("getCurrentPosition"),bridge.receiver.addEventListener("orientationchange",function(){mraid._event("sizeChange",mraid.getCurrentPosition.width,mraid.getCurrentPosition.height)}),mraid._event("ready","ready"),function e(i){var t=mraid.isViewable();i!=t&&mraid._event("viewableChange",t),setTimeout(function(){e(t)},100)}(mraid.getCurrentPosition(mraid.isViewable()))},_orientation:function(){return 90==Math.abs(bridge.receiver.orientation)?"landscape":"portrait"},_stateChangeEvent:function(e){mraid._state=e,mraid._event("stateChange",e)},_errorEvent:function(e,i){mraid._event("error",e,i)},_validators:{dimension:function(e){return!isNaN(e)&&e>=0},type:function(e,i){return typeof e===i},inclusion:function(e,i){return i.indexOf(e)>-1}},_validate:function(e,i,t){return mraid._validators[i].call(!1,e,t)?!0:(mraid._errorEvent(i+" validation fails for value: "+e+" and options: "+t,"_validate"),!1)},_validateExpandProperties:function(e){return mraid._validate(e.width,"dimension")&&mraid._validate(e.height,"dimension")&&mraid._validate(e.useCustomClose,"type","boolean")},_validateResizeProperties:function(e){return mraid._validate(e.width,"dimension")&&mraid._validate(e.height,"dimension")&&mraid._validate(e.offsetX,"dimension")&&mraid._validate(e.offsetY,"dimension")&&mraid._validate(e.customClosePosition,"inclusion",["top-left","top-center","top-right","center","bottom-left","bottom-center","bottom-right"])},_pxToDip:function(e){return e},addEventListener:function(e,i){mraid._listeners[e]?mraid._listeners[e].push(i):mraid._errorEvent("can not add event to unexisting kind "+e,"addEventListener")},createCalendarEvent:function(){mraid._errorEvent("not supported","createCalendarEvent")},close:function(){bridge.send("close",mraid.getState()),"default"==mraid.getState()?(mraid._event("sizeChange",0,0),mraid._stateChangeEvent("hidden")):("expanded"==mraid.getState()||"resized"==mraid.getState())&&(mraid._event("sizeChange",mraid.getDefaultPosition().width,mraid.getDefaultPosition().height),mraid._stateChangeEvent("default"))},expand:function(e){return"resized"!=mraid.getState()&&"default"!=mraid.getState()?(mraid._errorEvent("Ad can be expanded only in default or resized state","expand"),!1):1!=mraid._validateExpandProperties(mraid._expandProperties)?(mraid._errorEvent("Ad can be expanded only when valid expand properties are set","expand"),!1):(mraid._event("sizeChange",mraid._expandProperties.width,mraid._expandProperties.height),bridge.send("expand",{url:e,width:mraid._expandProperties.width,height:mraid._expandProperties.height,useCustomClose:mraid._expandProperties.useCustomClose}),void mraid._stateChangeEvent("expanded"))},getCurrentPosition:function(){return mraid._pxToDip(bridge.send("getCurrentPosition"))},getDefaultPosition:function(){return mraid._pxToDip(mraid._defaultPosition)},getExpandProperties:function(){return mraid._expandProperties},getMaxSize:function(){return mraid._pxToDip({width:bridge.receiver.innerWidth,height:bridge.receiver.innerHeight})},getPlacementType:function(){return bridge.send("getPlacementType")},getResizeProperties:function(){return mraid._resizeProperties},getScreenSize:function(){return mraid._pxToDip("portrait"==mraid._orientation()?{width:screen.width,height:screen.height}:{width:screen.height,height:screen.width})},getState:function(){return mraid._state},getVersion:function(){return mraid._version},isViewable:function(){var e=mraid.getCurrentPosition();return true/*e.x+e.width>0&&e.y+e.height>0*/},open:function(e){window.open(e,"_parent")},playVideo:function(){mraid._errorEvent("not supported","playVideo")},removeEventListener:function(e,i){var t=!1;if(mraid._listeners[e])for(var r=0;r<mraid._listeners[e].length;r++)mraid._listeners[e][r]==i&&(t=!0,mraid._listeners[e].splice(r,1));t||mraid._errorEvent("no event listener was removed","removeEventListener")},resize:function(){return"resized"!=mraid.getState()&&"default"!=mraid.getState()?(mraid._errorEvent("Ad can be resized only in default or resized state","resize"),!1):1!=mraid._validateResizeProperties(mraid._resizeProperties)?(mraid._errorEvent("Ad can be resized only when valid resized properties are set","resize"),!1):(mraid._event("sizeChange",mraid._resizeProperties.width,mraid._resizeProperties.height),bridge.send("resize",{width:mraid._resizeProperties.width,height:mraid._resizeProperties.height,x:mraid._resizeProperties.offsetX,y:mraid._resizeProperties.offsetY,customClosePosition:mraid._resizeProperties.customClosePosition,allowOffscreen:mraid._resizeProperties.allowOffscreen}),void mraid._stateChangeEvent("resized"))},_setProperties:function(e,i,t){for(var r=i.length,n=0;r>n;n++){var a=i[n];t.hasOwnProperty(a)&&(mraid[e][a]=t[a])}},setExpandProperties:function(e){mraid._setProperties("_expandProperties",["width","height","useCustomClose"],e)},setResizeProperties:function(e){mraid._setProperties("_resizeProperties",["width","height","offsetX","offsetY","customClosePosition","allowOffscreen"],e)},storePicture:function(){mraid._errorEvent("not supported","storePicture")},supports:function(e){return{sms:!0,tel:!0,calendar:!1,storePicture:!1,inlineVideo:!1}[e]},useCustomClose:function(e){mraid._expandProperties.useCustomClose=e}},document.addEventListener("DOMContentLoaded",function(){mraid._loaded()},!1),window.parent.mraid=mraid}
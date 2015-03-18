(function(){var a=Backbone.Model.extend({url:"php/index.php?action=config",defaults:function(){return{ctaImageURL:null,ctaLinkURL:null,videoURL:null,entitiesURL:null,defaultLocalizationData:null}},fetch:function(c,b){(b)||(b={});_.extend(b,{parse:true,dataType:"text",url:this.url+"&name="+c.name+"&id="+c.id});kps.ConfigModel.__super__.fetch.call(this,b)},parse:function(b,c){var d=$($.parseXML(b));var e={ctaImageURL:d.find("background").text(),ctaLinkURL:d.find("url").text(),videoURL:d.find("teaservideoyt").text(),entitiesURL:d.find("json_path").text(),majorColor:"#"+d.find("skin").attr("majorColor"),darkColor:"#"+d.find("skin").attr("darkColor")};return e}});window.kps=window.kps||{};window.kps.ConfigModel=window.kps.ConfigModel||a})();(function(){var a=Backbone.Collection.extend({url:"php/index.php?action=entities",model:kps.EntityModel,_defaultLocalizationData:{},_mapData:{},initialize:function(){(this.model)||(this.model=kps.EntityModel)},fetch:function(c,b){(b)||(b={});_.extend(b,{parse:true,reset:true,dataType:"json",url:this.url+"&source="+encodeURIComponent(c)});kps.EntityCollection.__super__.fetch.call(this,b)},parse:function(b,c){(b)||(b={});var d=b.events?b.events.slice():null;_.extend(this._defaultLocalizationData,b.localisation);_.extend(this._mapData,b.map);this._mapData.maxaffcity=b.maxaffcity;return d},calculateDelta:function(b){_.each(this.models,function(c){c.set({delta:kps.Utils.calculateDelta(b,c.toJSON()),itineraryURL:"https://www.google.fr/maps/preview/dir/"+b.latitude+","+b.longitude+"/"+c.get("latitude")+","+c.get("longitude")})},this);this.comparator="delta";this.sort()}});window.kps=window.kps||{};window.kps.EntityCollection=window.kps.EntityCollection||a})();(function(){var a=Backbone.Model.extend({KEY_MAPPIMG:{n:"name",a:"address",c:"country",z:"zipCode",lat:"latitude","long":"longitude",d:"description",t:"phone"},defaults:function(){return{name:"",address:"",country:"",zipCode:"",latitude:0,longitude:0,description:"",phone:"",geometry:null,itineraryURL:null}},parse:function(b,c){(b)||(b={});var e={};_.extend(e,b);for(var d in this.KEY_MAPPIMG){if(b[d]){delete e[d];e[this.KEY_MAPPIMG[d]]=b[d]}}e.geometry={type:"Point",coordinates:[b["long"]||b.longitude,b.lat||b.latitude]};return e}});window.kps=window.kps||{};window.kps.EntityModel=window.kps.EntityModel||a})();(function(){var a=Backbone.Model.extend({url:"php/index.php?action=localization",defaults:function(){return{timeZone:null,country:null,countryCode:null,region:null,regionCode:null,areaCode:0,city:null,zipCode:null,latitude:0,longitude:0,metroCode:0,dmaCode:0}},fetch:function(b){(b)||(b={});_.extend(b,{parse:true,dataType:"text",url:this.url});kps.LocalizationModel.__super__.fetch.call(this,b)},fetchByZipCode:function(c,b){(b)||(b={});_.extend(b,{parse:true,dataType:"text",url:this.url+"&zipCode="+encodeURIComponent(c)});kps.LocalizationModel.__super__.fetch.call(this,b)},parse:function(b,c){if(!(/error/.test(b))){var d=$($.parseXML(b));var e={timeZone:d.find("time_zone").text(),country:d.find("country").text(),countryCode:d.find("countrycode").text(),region:d.find("region").text(),regionCode:d.find("regioncode").text(),areaCode:parseInt(d.find("areacode").text()),city:d.find("city").text(),zipCode:d.find("postalcode").text()||d.find("postal_code").text(),latitude:parseFloat(d.find("latitude").text())||parseFloat(d.find("lat").text()),longitude:parseFloat(d.find("longitude").text())||parseFloat(d.find("lng").text()),metroCode:parseInt(d.find("metro_code").text()),dmaCode:parseInt(d.find("dma_code").text())};return e}else{this.trigger("error")}}});window.kps=window.kps||{};window.kps.LocalizationModel=window.kps.LocalizationModel||a})();(function(){var a=Backbone.Model.extend({defaults:function(){return{zoom:5,maxaffcity:25}}});window.kps=window.kps||{};window.kps.MapModel=window.kps.MapModel||a})();(function(){var a=Backbone.Router.extend({_configModel:null,_entityList:null,_localizationModel:null,_ctaView:null,_videoView:null,_localizationView:null,_mapView:null,_alertView:null,_maximized:false,_ready:false,initialize:function(){$("#collapse_button").on("click touchstart",_.bind(this.onCollapseButtonClick,this));if(window.tryptique_params){this._configModel=new kps.ConfigModel();this._ctaView=new kps.CallToActionView({model:this._configModel});this._videoView=new kps.VideoContainerView({model:this._configModel});this.listenTo(this._configModel,"change",this.onConfigChange);this._configModel.fetch(tryptique_params)}},toggleLayout:function(){if(this._maximized){this.minimize()}else{this.maximize()}},maximize:function(){this._maximized=true;this._ctaView.hide();this._videoView.hide();this._localizationView.maximize();this._mapView.maximize();kps.Utils.sendMessage({type:"STAT",info:{category:"CUSTOM",action:"MAXIMIZE"}})},minimize:function(){this._maximized=false;this._ctaView.show();this._videoView.show();this._localizationView.minimize();this._mapView.minimize();kps.Utils.sendMessage({type:"STAT",info:{category:"CUSTOM",action:"MINIMIZE"}})},setDefaultLocalization:function(){this._localizationModel.set(this._configModel.get("defaultLocalizationData"))},onCollapseButtonClick:function(){kps.Utils.sendMessage({type:"COLLAPSE"})},onConfigChange:function(){if(!this._entityList){this._entityList=new kps.EntityCollection();this._mapView=new kps.MapContainerView({collection:this._entityList});this.listenTo(this._entityList,"reset",this.onEntitiesChange)}this._entityList.fetch(this._configModel.get("entitiesURL"))},onEntitiesChange:function(){if(!this._localizationModel){this._localizationModel=new kps.LocalizationModel();this._localizationView=new kps.LocalizationFormView({model:this._localizationModel});this.listenTo(this._localizationModel,"change",this.onLocalizationChange);this.listenTo(this._localizationModel,"error",this.onLocalizationError)}this._configModel.set({defaultLocalizationData:this._entityList._defaultLocalizationData},{silent:true});this._localizationModel.fetch()},onLocalizationChange:function(){this._mapView.repositionUserMarker(this._localizationModel.toJSON());this._ready=true},onLocalizationError:function(){if(!this._alertView){this._alertView=new kps.AlertView().render()}if(this._ready){this._alertView.open()}else{this.setDefaultLocalization()}}});window.kps=window.kps||{};window.kps.vars=window.kps.vars||{};window.kps.Tryptique=window.kps.Tryptique||a;$(document).ready(function(){window.location.search.replace(/([^=&?]+)=([^&]*)/g,function(c,b,d){kps.vars[b]=decodeURIComponent(d)});kps.Utils.loadTemplates(["CallToActionView","VideoContainerView","LocalizationFormView","MapContainerView","MarkerView","ShopDetailsView","AlertView"],kps,function(){kps.app=new kps.Tryptique();Backbone.history.start()})})})();(function(){var a={EARTH_RADIUS:6378,loadTemplates:function(b,c,e){var d=[];$.each(b,function(g,f){if(c[f]){d.push($.get("tpl/"+f+".html",function(h){c[f].prototype.template=_.template(h)}))}});$.when.apply(null,d).done(e)},calculateDelta:function(h,g){var f=h.latitude*Math.PI/180;var e=g.latitude*Math.PI/180;var j=h.longitude*Math.PI/180;var i=g.longitude*Math.PI/180;return kps.Utils.EARTH_RADIUS*Math.acos(Math.sin(f)*Math.sin(e)+Math.cos(f)*Math.cos(e)*Math.cos(j-i))},sendMessage:function(b){b=b||{};b.target=kps.vars.adId;window.top.postMessage(JSON.stringify(b),kps.vars.topOrigin||"*")},canTouchThis:function(){return("ontouchstart" in document)}};window.kps=window.kps||{};window.kps.Utils=window.kps.Utils||a})();(function(){var a=Backbone.View.extend({el:$("#alert").first(),_opened:false,initialize:function(){if(kps.Utils.canTouchThis()){this.delegateEvents({"touchstart .icon_x_mark":"close"})}else{this.delegateEvents({"click .icon_x_mark":"close"})}},render:function(){this.$el.html(this.template());return this},open:function(){this._opened=true;this.$el.removeClass("close")},close:function(b){b.stopImmediatePropagation();b.preventDefault();this._opened=false;this.$el.addClass("close")}});window.kps=window.kps||{};window.kps.AlertView=window.kps.AlertView||a})();(function(){var a=Backbone.View.extend({el:$("#cta").first(),initialize:function(){this.listenTo(this.model,"change",this.render);if(kps.Utils.canTouchThis()){this.delegateEvents({touchstart:"onCtaClick"})}else{this.delegateEvents({click:"onCtaClick"})}},render:function(){this.$el.html(this.template(this.model.toJSON()));return this},show:function(){this.$el.css("display","block")},hide:function(){this.$el.css("display","none")},onCtaClick:function(b){b.stopImmediatePropagation();b.preventDefault();kps.Utils.sendMessage({type:"EXTERNAL_LINK",info:{action:"CUSTOM",url:this.model.get("ctaLinkURL")}})}});window.kps=window.kps||{};window.kps.CallToActionView=window.kps.CallToActionView||a})();(function(){var a=Backbone.View.extend({el:$("#localization_form").first(),_$textInput:null,initialize:function(){this.listenToOnce(this.model,"change",this.render);if(kps.Utils.canTouchThis()){this.delegateEvents({"touchstart .btn.search":"changeLocalization"})}else{this.delegateEvents({"click .btn.search":"changeLocalization"})}},render:function(){this.$el.html(this.template());this._$textInput=$(".form_control",this.el);this.listenTo(this.model,"change",this.onLocalizationChange);return this},changeLocalization:function(b){b.stopImmediatePropagation();b.preventDefault();this.model.fetchByZipCode(this._$textInput.val());kps.Utils.sendMessage({type:"STAT",info:{category:"CUSTOM",action:"POSTALCODE",label:this._$textInput.val()}})},maximize:function(){this.$el.addClass("visu2")},minimize:function(){this.$el.removeClass("visu2")},onLocalizationChange:function(){this._$textInput.val(this.model.get("city"))}});window.kps=window.kps||{};window.kps.LocalizationFormView=window.kps.LocalizationFormView||a})();(function(){var b=Backbone.View.extend({el:$("#map_container").first(),_map:null,_markerLayer:null,_shopView:null,_$layoutButton:null,_userMarkerView:null,_$currentMarker:null,initialize:function(){this.listenTo(this.collection,"reset",this.onCollectionChange);this.listenTo(this.collection,"sort",this.onCollectionSorted);if(kps.Utils.canTouchThis()){this.delegateEvents({"touchstart .icon_fullscreen":"toggleLayout","touchstart .marker":"onMarkerClick","touchstart .icon_close_shop":"closeShopDetails"})}else{this.delegateEvents({"click .icon_fullscreen":"toggleLayout","click .marker":"onMarkerClick","click .icon_close_shop":"closeShopDetails"})}},render:function(){this.$el.html(this.template());var c=new MM.TemplatedLayer("http://tile.openstreetmap.org/{Z}/{X}/{Y}.png");this._markerLayer=new MM.MarkerLayer();this._map=new MM.Map($("#map").attr("id"),c,null,[new MM.TouchHandler(),new MM.MouseHandler()]);this._map.addLayer(this._markerLayer);this._shopView=new kps.ShopDetailsView({el:$("#shop_details").first()}).render();this._$layoutButton=$(".icon_fullscreen",this.el);return this},repositionUserMarker:function(c){if(!this._userMarkerView){_.extend(c,{type:"user"});this._userMarkerView=new kps.MarkerView({model:new kps.EntityModel(c,{parse:true})}).render();this._markerLayer.addMarker(this._userMarkerView.el,this._userMarkerView.model.toJSON())}this._userMarkerView.reposition(c);a.call(this._markerLayer,this._userMarkerView.el,this._userMarkerView.model.toJSON());this.collection.calculateDelta(c)},toggleLayout:function(c){c.stopImmediatePropagation();c.preventDefault();kps.app.toggleLayout();this._map._windowResize()},maximize:function(){this.$el.addClass("visu1");this._$layoutButton.addClass("top")},minimize:function(){this.$el.removeClass("visu1");this._$layoutButton.removeClass("top");if(this._shopView._opened){this._$layoutButton.addClass("close")}},openShopDetails:function(d){var c=this.collection.get(d);if(c){if(!kps.app._maximized){this._$layoutButton.addClass("close")}this._shopView.open();this._shopView.setDetails(c.toJSON());this.selectCurrentMarker(d)}},selectCurrentMarker:function(c){this.unselectCurrentMarker();this._$currentMarker=$("#"+c+" path");this._$currentMarker.css("fill",kps.app._configModel.get("majorColor"))},unselectCurrentMarker:function(){if(this._$currentMarker){this._$currentMarker.css("fill",kps.app._configModel.get("darkColor"));this._$currentMarker=null}},closeShopDetails:function(c){c.stopImmediatePropagation();c.preventDefault();this.unselectCurrentMarker();this._$layoutButton.removeClass("close");this._shopView.close()},onCollectionChange:function(){if(!this.model){this.model=new kps.MapModel(this.collection._mapData);this.render()}this._markerLayer.removeAllMarkers();_.each(this.collection.models,function(c){this._markerLayer.addMarker(new kps.MarkerView({model:c}).render().el,c.toJSON())},this);this._map.setZoom(this.model.get("zoom"))},onCollectionSorted:function(){var d=[];var c=null;_.times(this.model.get("maxaffcity"),function(e){c=this.collection.at(e);d.push(new MM.Location(c.get("latitude"),c.get("longitude")))},this);d.push(this._userMarkerView.el.location);this._map.setZoom(this.model.get("zoom"));this._map.setExtent(d);if(this.collection.length>0){this.openShopDetails(this.collection.at(0).cid)}},onMarkerClick:function(c){c.stopImmediatePropagation();c.preventDefault();this.openShopDetails(c.currentTarget.id)}});window.kps=window.kps||{};window.kps.MapContainerView=window.kps.MapContainerView||b;function a(c,d){c.location=this.coerceLocation(d);c.coord=this.map.locationCoordinate(c.location);this.repositionMarker(c)}})();(function(){var a=Backbone.View.extend({tagName:"a",className:"marker",render:function(){this.$el.html(this.template());this.$el.attr("id",this.model.cid);if(this.model.get("type")=="user"){this.$el.addClass("mk_shop")}else{this.$el.find("path").css("fill",kps.app._configModel.get("darkColor"))}return this},reposition:function(b){this.model.set(this.model.parse(b))}});window.kps=window.kps||{};window.kps.MarkerView=window.kps.MarkerView||a})();(function(){var a=Backbone.View.extend({_opened:false,initialize:function(){this.model=new kps.EntityModel();this.listenTo(this.model,"change",this.render);if(kps.Utils.canTouchThis()){this.delegateEvents({"touchstart .icon_map":"onMapClick","touchstart .icon_phone":"onPhoneClick"})}else{this.delegateEvents({"click .icon_map":"onMapClick","click .icon_phone":"onPhoneClick"})}},render:function(){this.$el.html(this.template(this.model.toJSON()));$("h1.title",this.el).css("color",kps.app._configModel.get("majorColor"));return this},open:function(){this._opened=true;this.$el.removeClass("close")},close:function(){this._opened=false;this.$el.addClass("close")},setDetails:function(b){this.model.set(b)},onMapClick:function(b){b.stopImmediatePropagation();b.preventDefault();kps.Utils.sendMessage({type:"EXTERNAL_LINK",info:{action:"CUSTOM",url:this.model.get("itineraryURL")}});kps.Utils.sendMessage({type:"STAT",info:{category:"CUSTOM",action:"ITINERARY",label:this.model.get("itineraryURL")}})},onPhoneClick:function(){kps.Utils.sendMessage({type:"STAT",info:{category:"EXTERNAL_LINK",action:"CUSTOM",label:this.model.get("phone")}});kps.Utils.sendMessage({type:"STAT",info:{category:"CUSTOM",action:"PHONE",label:this.model.get("phone")}})}});window.kps=window.kps||{};window.kps.ShopDetailsView=window.kps.ShopDetailsView||a})();(function(){var a=Backbone.View.extend({el:$("#video_container").first(),_player:null,_playhead:null,_quarterIndex:0,_quarterDuration:0,_initialized:false,initialize:function(){this.listenTo(this.model,"change",this.render)},render:function(){this.$el.html(this.template());this.renderYoutubeVideo();return this},renderYoutubeVideo:function(){var b=document.createElement("script");b.src="https://www.youtube.com/iframe_api";var c=document.getElementsByTagName("script")[0];c.parentNode.insertBefore(b,c);window.onYouTubeIframeAPIReady=_.bind(this.onYouTubeIframeAPIReady,this)},show:function(){this.$el.css("display","block")},hide:function(){this.$el.css("display","none")},updateQuarterIndex:function(c){var b=0;c=Math.max(0,Math.min(Math.floor(c),4));while(this._quarterIndex<c){++this._quarterIndex;b=(this._quarterIndex/4*100);kps.Utils.sendMessage({type:"STAT",info:{category:"PROGRESS",action:"TEASER_"+(b<100?b:"COMPLETE"),value:b}})}},onYouTubeIframeAPIReady:function(){this._player=new YT.Player("player",{height:"100%",width:"100%",videoId:this.model.get("videoURL"),playerVars:{autoplay:1},events:{onReady:_.bind(this.onPlayerReady,this),onStateChange:_.bind(this.onPlayerStateChange,this)}})},onPlayerReady:function(b){this._quarterIndex=0;this._quarterDuration=this._player.getDuration()/4},onPlayerStateChange:function(b){if(this._player.getVideoData().video_id!=this.model.get("videoURL")){return}switch(b.data){case YT.PlayerState.PLAYING:if(!this._initialized){this._initialized=true;this._quarterIndex=0;this._quarterDuration=this._player.getDuration()/4;this._playhead=setInterval(_.bind(function(){this.updateQuarterIndex(this._player.getCurrentTime()/this._quarterDuration)},this),100);kps.Utils.sendMessage({type:"STAT",info:{category:"OPEN_CONTENT",action:"TEASER_VIEW"}})}break;case YT.PlayerState.PAUSED:clearInterval(this._playhead);this._playhead=0;break;case YT.PlayerState.ENDED:clearInterval(this._playhead);this._playhead=0;this.updateQuarterIndex(4);this._quarterIndex=0;this._initialized=false;break;default:break}}});window.kps=window.kps||{};window.kps.VideoContainerView=window.kps.VideoContainerView||a})();
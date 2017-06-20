!function(t){"use strict";function e(t,e,a){if(a[0]&&"object"!=typeof a[0]){if(e[a[0]])return e[a[0]].apply(t,Array.prototype.slice.call(a,1));throw o(a[0]+" is an invalid value")}return e.init.apply(t,a)}function a(t,e,a,i){return{css:{position:"absolute",top:t,left:e,overflow:i||"hidden","z-index":a||"auto"}}}function i(t,e,a,i,s){var n=1-s,o=n*n*n,d=s*s*s;return r(Math.round(o*t.x+3*s*n*n*e.x+3*s*s*n*a.x+d*i.x),Math.round(o*t.y+3*s*n*n*e.y+3*s*s*n*a.y+d*i.y))}function r(t,e){return{x:t,y:e}}function s(t,e){return Object.prototype.hasOwnProperty.call(e,t)}function n(){for(var t=["Moz","Webkit","Khtml","O","ms"],e=t.length,a="";e--;)t[e]+"Transform"in document.body.style&&(a="-"+t[e].toLowerCase()+"-");return a}function o(t){function e(t){this.name="TurnJsError",this.message=t}return e.prototype=new Error,e.prototype.constructor=e,new e(t)}function d(t){var e={top:0,left:0};do{e.left+=t.offsetLeft,e.top+=t.offsetTop}while(t=t.offsetParent);return e}function p(){return""}var l="",h={down:"mousedown",move:"mousemove",up:"mouseup",over:"mouseover",out:"mouseout"},g={backward:["l"],forward:["r"],all:["l","r"]},c=["single","double"],f=["ltr","rtl"],u={acceleration:!0,display:"double",duration:600,page:1,gradients:!0,when:null},v={acceleration:!0,corners:"forward",cornerSize:100,duration:600,gradients:!0},w={init:function(e){if(this.length>1)throw o("This selector has more than 1 element");l=n();var a,i=0,r=this.data(),d=this.children();if(e=t.extend({width:this.width(),height:this.height(),direction:this.attr("dir")||this.css("direction")||"ltr"},u,e),r.opts=e,r.pageObjs={},r.pages={},r.pageWrap={},r.pagePlace={},r.pageMv=[],r.zoom=1,r.totalPages=e.pages||0,r.docEvents={mouseStart:function(t){for(var e in r.pages)if(s(e,r.pages)&&m._eventStart.call(r.pages[e],t)===!1)return!1},mouseMove:function(t){for(var e in r.pages)s(e,r.pages)&&m._eventMove.call(r.pages[e],t)},mouseEnd:function(t){for(var e in r.pages)s(e,r.pages)&&m._eventEnd.call(r.pages[e],t)}},e.when)for(a in e.when)s(a,e.when)&&this.bind(a,e.when[a]);for(this.css({position:"relative",width:e.width,height:e.height}),this.turn("display",e.display),""!==e.direction&&this.turn("direction",e.direction),a=0;a<d.length;a++)"1"!=t(d[a]).attr("ignore")&&this.turn("addPage",d[a],++i);return t(this).bind(h.down,r.docEvents.mouseStart).bind("start",w._start).bind("end",w._end).bind("pressed",w._pressed).bind("released",w._released).bind("flip",w._flip),t(document).bind(h.move,r.docEvents.mouseMove).bind(h.up,r.docEvents.mouseEnd),this.turn("page",e.page),r.done=!0,this},addPage:function(e,a){var i,r,s=!1,n=this.data(),d=n.totalPages+1;if(n.destroying)return!1;if((i=/\bp([0-9]+)\b/.exec(t(e).attr("class")))&&(a=parseInt(i[1],10)),a){if(a==d)s=!0;else if(a>d)throw o('Page "'+a+'" cannot be inserted')}else a=d,s=!0;return a>=1&&a<=d&&(r="double"==n.display?a%2?" odd":" even":"",n.done&&this.turn("stop"),a in n.pageObjs&&w._movePages.call(this,a,1),s&&(n.totalPages=d),n.pageObjs[a]=t(e).css({float:"left"}).addClass("page p"+a+r),w._addPage.call(this,a),n.done&&this.turn("update"),w._removeFromDOM.call(this)),this},_addPage:function(e){var a=this.data(),i=a.pageObjs[e];if(i)if(w._necessPage.call(this,e)){if(!a.pageWrap[e]){var r=w._pageSize.call(this,e,!0);i.css({width:r.width,height:r.height}),a.pagePlace[e]=e,a.pageWrap[e]=t("<div/>",{class:"turn-page-wrapper",page:e,css:{position:"absolute",overflow:"hidden"}}).css(r),this.append(a.pageWrap[e]),a.pageWrap[e].prepend(a.pageObjs[e])}e&&1!=w._setPageLoc.call(this,e)||w._makeFlip.call(this,e)}else a.pagePlace[e]=0,a.pageObjs[e]&&a.pageObjs[e].remove()},hasPage:function(t){return s(t,this.data().pageObjs)},center:function(e){var a=this.data(),i=t(this).turn("size"),r=i.width/(2*a.zoom)-i.width/2;if("double"==a.display){var s=this.turn("view",e||a.tpage||a.page);"ltr"==a.direction?s[0]?s[1]||(r+=i.width/4):r-=i.width/4:s[0]?s[1]||(r-=i.width/4):r+=i.width/4}return t(this).css({marginLeft:r}),this},destroy:function(){var e=this.data();for(e.destroying=!0,t(this).unbind(h.down).unbind("end").unbind("first").unbind("flip").unbind("last").unbind("pressed").unbind("released").unbind("start").unbind("turning").unbind("turned").unbind("zooming"),t(document).unbind(h.move,e.docEvents.mouseMove).unbind(h.up,e.docEvents.mouseEnd);0!==e.totalPages;)this.turn("removePage",e.totalPages);return e.fparent&&e.fparent.remove(),e.shadow&&e.shadow.remove(),this.removeData(),e=null,this},is:function(){return"object"==typeof this.data().pages},zoom:function(e){var a=this.data();if("number"==typeof e){if(e<.001||e>100)throw o(e+" is not a value for zoom");var i=t.Event("zooming");if(this.trigger(i,[e,a.zoom]),i.isDefaultPrevented())return this;var r=t(this).turn("size"),s=1/a.zoom,n=Math.round(r.width*s*e),d=Math.round(r.height*s*e);return a.zoom=e,t(this).turn("stop").turn("size",n,d).css({marginTop:r.height*s/2-d/2}),a.opts.autoCenter?this.turn("center"):t(this).css({marginLeft:r.width*s/2-n/2}),w._updateShadow.call(this),this}return a.zoom},_pageSize:function(t,e){var a=this.data(),i={};if("single"==a.display)i.width=this.width(),i.height=this.height(),e&&(i.top=0,i.left=0,i.right="auto");else{var r=this.width()/2,s=this.height();if(a.pageObjs[t].hasClass("own-size")?(i.width=a.pageObjs[t].width(),i.height=a.pageObjs[t].height()):(i.width=r,i.height=s),e){var n=t%2;i.top=(s-i.height)/2,"ltr"==a.direction?(i[n?"right":"left"]=r-i.width,i[n?"left":"right"]="auto"):(i[n?"left":"right"]=r-i.width,i[n?"right":"left"]="auto")}}return i},_makeFlip:function(t){var e=this.data();if(!e.pages[t]&&e.pagePlace[t]==t){var a="single"==e.display,i=t%2;e.pages[t]=e.pageObjs[t].css(w._pageSize.call(this,t)).flip({page:t,next:i||a?t+1:t-1,turn:this,duration:e.opts.duration,acceleration:e.opts.acceleration,gradients:e.opts.gradients}).flip("disable",e.disabled)}return e.pages[t]},_makeRange:function(){var t,e;if(!(this.data().totalPages<1))for(e=this.turn("range"),t=e[0];t<=e[1];t++)w._addPage.call(this,t)},range:function(t){var e,a,i,r,s=this.data();if(t=t||s.tpage||s.page||1,r=w._view.call(this,t),t<1||t>s.totalPages)throw o('"'+t+'" is not a page for range');return r[1]=r[1]||r[0],r[0]>=1&&r[1]<=s.totalPages?(e=Math.floor(2),s.totalPages-r[1]>r[0]?(a=Math.min(r[0]-1,e),i=2*e-a):(i=Math.min(s.totalPages-r[1],e),a=2*e-i)):(a=5,i=5),[Math.max(1,r[0]-a),Math.min(s.totalPages,r[1]+i)]},_necessPage:function(t){if(0===t)return!0;var e=this.data(),a=this.turn("range");return e.pageObjs[t].hasClass("fixed")||t>=a[0]&&t<=a[1]},_removeFromDOM:function(){var t,e=this.data();for(t in e.pageWrap)s(t,e.pageWrap)&&!w._necessPage.call(this,t)&&w._removePageFromDOM.call(this,t)},_removePageFromDOM:function(t){var e=this.data();if(e.pages[t]){var a=e.pages[t].data();m._moveFoldingPage.call(e.pages[t],!1),a.f&&a.f.fwrapper&&a.f.fwrapper.remove(),e.pages[t].removeData(),e.pages[t].remove(),delete e.pages[t]}e.pageObjs[t]&&e.pageObjs[t].remove(),e.pageWrap[t]&&(e.pageWrap[t].remove(),delete e.pageWrap[t]),delete e.pagePlace[t]},removePage:function(t){var e=this.data();if(t<1||t>e.totalPages)throw o("The page "+t+" doesn't exist");return e.pageObjs[t]&&(this.turn("stop"),w._removePageFromDOM.call(this,t),delete e.pageObjs[t]),w._movePages.call(this,t,-1),e.totalPages=e.totalPages-1,e.page>e.totalPages?this.turn("page",e.totalPages):w._makeRange.call(this),this},_movePages:function(t,e){var a,i=this,r=this.data(),s="single"==r.display,n=function(t){var a=t+e,n=a%2,o=n?" odd ":" even ";r.pageObjs[t]&&(r.pageObjs[a]=r.pageObjs[t].removeClass("p"+t+" odd even").addClass("p"+a+o)),r.pagePlace[t]&&r.pageWrap[t]&&(r.pagePlace[a]=a,r.pageObjs[a].hasClass("fixed")?r.pageWrap[a]=r.pageWrap[t].attr("page",a):r.pageWrap[a]=r.pageWrap[t].css(w._pageSize.call(i,a,!0)).attr("page",a),r.pages[t]&&(r.pages[a]=r.pages[t].flip("options",{page:a,next:s||n?a+1:a-1,corners:s?"all":n?"forward":"backward"})),e&&(delete r.pages[t],delete r.pagePlace[t],delete r.pageObjs[t],delete r.pageWrap[t],delete r.pageObjs[t]))};if(e>0)for(a=r.totalPages;a>=t;a--)n(a);else for(a=t;a<=r.totalPages;a++)n(a)},display:function(e){var a=this.data(),i=a.display;if(e){if(t.inArray(e,c)==-1)throw o('"'+e+'" is not a value for display');if("single"==e?a.pageObjs[0]||(this.turn("stop").css({overflow:"hidden"}),a.pageObjs[0]=t("<div />",{class:"page p-temporal"}).css({width:this.width(),height:this.height()}).appendTo(this)):a.pageObjs[0]&&(this.turn("stop").css({overflow:""}),a.pageObjs[0].remove(),delete a.pageObjs[0]),a.display=e,i){var r=this.turn("size");w._movePages.call(this,1,0),this.turn("size",r.width,r.height).turn("update")}return this}return i},direction:function(e){var a=this.data();if(void 0===e)return a.direction;if(e=e.toLowerCase(),t.inArray(e,f)==-1)throw o('"'+e+'" is not a value for direction');return"rtl"==e&&t(this).attr("dir","ltr").css({direction:"ltr"}),a.direction=e,a.done&&this.turn("size",t(this).width(),t(this).height()),this},animating:function(){return this.data().pageMv.length>0},disable:function(e){var a,i=this.data(),r=this.turn("view");i.disabled=void 0===e||e===!0;for(a in i.pages)s(a,i.pages)&&i.pages[a].flip("disable",!!e&&t.inArray(a,r));return this},disabled:function(t){return void 0===t?this.data().disabled===!0:this.turn("disable",t)},size:function(t,e){if(t&&e){var a,i,r=this.data(),n="double"==r.display?t/2:t;this.css({width:t,height:e}),r.pageObjs[0]&&r.pageObjs[0].css({width:n,height:e});for(a in r.pageWrap)s(a,r.pageWrap)&&(i=w._pageSize.call(this,a,!0),r.pageObjs[a].css({width:i.width,height:i.height}),r.pageWrap[a].css(i),r.pages[a]&&r.pages[a].css({width:i.width,height:i.height}));return this.turn("resize"),this}return{width:this.width(),height:this.height()}},resize:function(){var t,e=this.data();for(e.pages[0]&&(e.pageWrap[0].css({left:-this.width()}),e.pages[0].flip("resize",!0)),t=1;t<=e.totalPages;t++)e.pages[t]&&e.pages[t].flip("resize",!0)},_removeMv:function(t){var e,a=this.data();for(e=0;e<a.pageMv.length;e++)if(a.pageMv[e]==t)return a.pageMv.splice(e,1),!0;return!1},_addMv:function(t){var e=this.data();w._removeMv.call(this,t),e.pageMv.push(t)},_view:function(t){var e=this.data();return t=t||e.page,"double"==e.display?t%2?[t-1,t]:[t,t+1]:[t]},view:function(t){var e=this.data(),a=w._view.call(this,t);return"double"==e.display?[a[0]>0?a[0]:0,a[1]<=e.totalPages?a[1]:0]:[a[0]>0&&a[0]<=e.totalPages?a[0]:0]},stop:function(t,e){if(this.turn("animating")){var a,i,r,s=this.data(),n=s.pageMv;for(s.pageMv=[],s.tpage&&(s.page=s.tpage,delete s.tpage),a=0;a<n.length;a++)r=s.pages[n[a]],i=r.data().f.opts,r.flip("hideFoldedPage",!1),m._moveFoldingPage.call(r,!1),s.pagePlace[i.next]=i.next,i.force&&(i.next=i.page%2==0?i.page-1:i.page+1,delete i.force)}return this.turn("update"),this},pages:function(t){var e=this.data();if(t){if(t<e.totalPages){for(var a=t+1;a<=e.totalPages;a++)this.turn("removePage",a);this.turn("page")>t&&this.turn("page",t)}return e.totalPages=t,this}return e.totalPages},_missing:function(t){var e,a=this.data(),i=this.turn("range",t),r=[];for(e=i[0];e<=i[1];e++)a.pageObjs[e]||r.push(e);r.length>0&&this.trigger("missing",[r])},_fitPage:function(t){var e=this.data(),a=this.turn("view",t);w._missing.call(this,t),e.pageObjs[t]&&(e.page=t,this.turn("stop"),w._removeFromDOM.call(this),w._makeRange.call(this),w._updateShadow.call(this),this.trigger("turned",[t,a]),e.opts.autoCenter&&this.turn("center"))},_turnPage:function(e,a){var i,r,s=this.data(),n=s.pagePlace[e],o=this.turn("view"),d=this.turn("view",e);if(s.page!=e){var p=t.Event("turning");if(this.trigger(p,[e,d]),p.isDefaultPrevented())return;t.inArray(1,d)!=-1&&this.trigger("first"),t.inArray(s.totalPages,d)!=-1&&this.trigger("last")}if(a)this.turn("stop",n);else{if(w._missing.call(this,e),!s.pageObjs[e])return;this.turn("stop"),s.page=e}if(w._makeRange.call(this),"single"==s.display?(i=o[0],r=d[0]):o[1]&&e>o[1]?(i=o[1],r=d[0]):o[0]&&e<o[0]&&(i=o[0],r=d[1]),s.pages[i]){var l=s.pages[i].data().f.opts;s.tpage=r,l.next!=r&&(l.next=r,s.pagePlace[r]=l.page,l.force=!0),"single"==s.display?"ltr"==s.direction?s.pages[i].flip("turnPage",d[0]>o[0]?"r":"l"):s.pages[i].flip("turnPage",d[0]>o[0]?"l":"r"):s.pages[i].flip("turnPage")}},page:function(e){e=parseInt(e,10);var a=this.data();return e>0&&e<=a.totalPages?(a.done&&t.inArray(e,this.turn("view"))==-1?w._turnPage.call(this,e):w._fitPage.call(this,e),this):a.page},next:function(){return this.turn("page",w._view.call(this,this.data().page).pop()+1)},previous:function(){return this.turn("page",w._view.call(this,this.data().page).shift()-1)},peel:function(t,e){return this},_addMotionPage:function(){var e=t(this).data().f.opts,a=e.turn,i=a.data();w._addMv.call(a,e.page),i.pagePlace[e.next]=e.page,a.turn("update")},_start:function(t,e,a){var i=e.turn.data();if(t.isDefaultPrevented())return void w._updateShadow.call(e.turn);"single"==i.display&&a&&("l"==a&&"ltr"==i.direction||"r"==a&&"rtl"==i.direction?(e.next=e.next<e.page?e.next:e.page-1,e.force=!0):e.next=e.next>e.page?e.next:e.page+1),w._addMotionPage.call(t.target),w._updateShadow.call(e.turn)},_end:function(e,a,i){var r=t(e.target),s=(r.data().f,a.turn),n=s.data();i||n.tpage?n.tpage!=a.next&&n.tpage!=a.page||(delete n.tpage,w._fitPage.call(s,n.tpage||a.next,!0)):(w._removeMv.call(s,a.page),w._updateShadow.call(s),s.turn("update"))},_pressed:function(e){e.stopPropagation();var a,i=t(e.target).data().f,r=i.opts.turn.data().pages;for(a in r)a!=i.opts.page&&r[a].flip("disable",!0);return i.time=(new Date).getTime()},_released:function(e,a){e.stopPropagation();var i,r=t(e.target),s=r.data().f,n=s.opts.turn,o=n.data();i="single"==o.display?"r"==a.corner?a.x<r.width()/2:a.x>r.width()/2:a.x<0||a.x>r.width(),((new Date).getTime()-s.time<200||i)&&(e.preventDefault(),w._turnPage.call(n,s.opts.next,m._cornerActivated.call(r,a,1)===!1)),o.mouseAction=!1},_flip:function(e){e.stopPropagation();var a=t(e.target).data().f.opts;a.turn.trigger("turn",[a.next]),a.turn.data().opts.autoCenter&&a.turn.turn("center",a.next)},calculateZ:function(t){var e,a,i,r,s,n=this,o=this.data(),d=this.turn("view"),p=d[0]||d[1],l={pageZ:{},partZ:{},pageV:{}},h=function(t){var e=n.turn("view",t);e[0]&&(l.pageV[e[0]]=!0),e[1]&&(l.pageV[e[1]]=!0)};for(e=0;e<t.length;e++)a=t[e],i=o.pages[a].data().f.opts.next,r=o.pagePlace[a],h(a),h(i),s=o.pagePlace[i]==i?i:a,l.pageZ[s]=o.totalPages-Math.abs(p-s),l.partZ[r]=2*o.totalPages+Math.abs(p-s);return l},update:function(){var t,e=this.data();if(e.pageMv.length&&0!==e.pageMv[0]){var a,i,r=this.turn("calculateZ",e.pageMv);this.turn("view",e.tpage);for(t in e.pageWrap)s(t,e.pageWrap)&&(i=e.pageObjs[t].hasClass("fixed"),e.pageWrap[t].css({display:r.pageV[t]||i?"":"none","z-index":r.pageZ[t]||(i?-1:0)}),(a=e.pages[t])&&(a.flip("z",r.partZ[t]||null),r.pageV[t]&&a.flip("resize"),e.tpage&&a.flip("disable",!0)))}else for(t in e.pageWrap)if(s(t,e.pageWrap)){var n=w._setPageLoc.call(this,t);e.pages[t]&&e.pages[t].flip("disable",e.disabled||1!=n).flip("z",null)}},_updateShadow:function(){var e,i,r=this.data(),s=this.width(),n=this.height(),o="single"==r.display?s:s/2;e=this.turn("view"),r.shadow||(r.shadow=t("<div />",{class:"shadow",css:a(0,0,0).css}).appendTo(this));for(var d=0;d<r.pageMv.length&&(e[0]&&e[1]);d++)e=this.turn("view",r.pages[r.pageMv[d]].data().f.opts.next),i=this.turn("view",r.pageMv[d]),e[0]=e[0]&&i[0],e[1]=e[1]&&i[1];switch(e[0]?e[1]?3:"ltr"==r.direction?2:1:"ltr"==r.direction?1:2){case 1:r.shadow.css({width:o,height:n,top:0,left:o});break;case 2:r.shadow.css({width:o,height:n,top:0,left:0});break;case 3:r.shadow.css({width:s,height:n,top:0,left:0})}},_setPageLoc:function(t){var e=this.data(),a=this.turn("view");return t==a[0]||t==a[1]?(e.pageWrap[t].css({zIndex:e.totalPages,display:""}),1):"single"==e.display&&t==a[0]+1||"double"==e.display&&t==a[0]-2||t==a[1]+2?(e.pageWrap[t].css({zIndex:e.totalPages-1,display:""}),2):(e.pageWrap[t].css({zIndex:0,display:e.pageObjs[t].hasClass("fixed")?"":"none"}),0)},options:function(e){if(void 0===e)return this.data().opts;var a=this.data();if(t.extend(a.opts,e),e.pages&&this.turn("pages",e.pages),e.page&&this.turn("page",e.page),e.display&&this.turn("display",e.display),e.direction&&this.turn("direction",e.direction),e.width&&e.height&&this.turn("size",e.width,e.height),e.when)for(var i in e.when)s(i,e.when)&&this.unbind(i).bind(i,e.when[i]);return this},version:function(){return"4.1.0"}},m={init:function(t){return this.data({f:{effect:"r"==t.corners||"l"==t.corners?"hard":"sheet"}}),this.flip("options",t),m._addPageWrapper.call(this),this},setData:function(e){var a=this.data();return a.f=t.extend(a.f,e),this},options:function(e){var a=this.data().f;return e?(m.setData.call(this,{opts:t.extend({},a.opts||v,e)}),this):a.opts},z:function(t){var e=this.data().f;return e.fwrapper&&(e.opts["z-index"]=t,e.fwrapper.css({"z-index":t||parseInt(e.parent.css("z-index"),10)||0})),this},_cAllowed:function(){var t=this.data().f,e=t.opts.turn.data(),a=t.opts.page,i=a%2;return"single"==e.display?1==a?"ltr"==e.direction?g.forward:g.backward:a==e.totalPages?"ltr"==e.direction?g.backward:g.forward:g.all:"ltr"==e.direction?g[i?"forward":"backward"]:g[i?"backward":"forward"]},_cornerActivated:function(e){var a=this.data().f,i=a.parent.offset(),r=this.width(),s=this.height(),n={x:Math.max(0,e.pageX-i.left),y:Math.max(0,e.pageY-i.top)},o=a.opts.cornerSize;if(n.x<=0||n.y<=0||n.x>=r||n.y>=s)return!1;var d=m._cAllowed.call(this);if(n.x>r-o)n.corner="r";else{if(!(n.x<o))return!1;n.corner="l"}return t.inArray(n.corner,d)!=-1&&n},_c:function(t,e){switch(e=e||0,t){case"l":return r(e,0);case"r":return r(this.width()-e,0)}},_c2:function(t){switch(t){case"l":return r(2*this.width(),0);case"r":return r(-this.width(),0)}},_foldingPage:function(t){var e=this.data().f,a=e.opts;return e.folding?e.folding:a.turn?(e=a.turn.data(),"single"==e.display?e.pageObjs[a.next]?e.pageObjs[0]:null:e.pageObjs[a.next]):void 0},_backGradient:function(){var t=this.data().f,e=t.opts.turn;return t.opts.gradients&&(!e||"single"==e.data().display||2!=t.opts.page&&t.opts.page!=e.data().totalPages-1)},resize:function(t){var e=this.data().f,a=this.width(),i=this.height();t&&(e.wrapper.css({width:a,height:i}),e.fpage.css({width:a,height:i}))},_addPageWrapper:function(){var e=this.data().f,i=this.parent();if(e.parent=i,!e.wrapper){var r={};e.wrapper=t("<div/>",a(0,0,2)).css(r).appendTo(i).prepend(this),e.fpage=t("<div/>",a(0,0,1)).css(r).appendTo(i)}m.resize.call(this,!0)},_fold:function(t){var e=this.data().f,a=m._c.call(this,t.corner),i=a.x?a.x-t.x:t.x,r=this.width();this.height();switch(i=Math.min(2*r,Math.max(0,i)),t.corner){case"r":e.wrapper.css({width:Math.max(0,r-i)}),this.css({position:"relative",left:-i}),e.fpage.css({left:-i+r,width:Math.max(0,i-r)});break;case"l":e.wrapper.css({width:r}),this.css({position:"relative",left:i}),e.fpage.css({left:r,width:Math.max(0,i-r)}),e.folding&&e.folding.css({position:"relative",left:2*-r+i})}e.parent.css({overflow:"visible"}),e.point=t},_moveFoldingPage:function(t){var e=this.data().f;if(t){var a=m._foldingPage.call(this),i=e.opts.turn;if(a){if(e.folding){if(e.folding===a)return;m._moveFoldingPage.call(this,!1)}m.setData.call(this,{backParent:a.parent(),folding:a}),e.fpage.prepend(a)}i.turn("update")}else e.backParent&&(e.backParent.prepend(e.folding),delete e.backParent,delete e.folding)},_showFoldedPage:function(e,a){var i=m._foldingPage.call(this),r=this.data(),s=r.f,n=s.visible;if(!n||!s.point||s.point.corner!=e.corner){var o=(s.opts.turn.data().mouseAction,t.Event("start"));if(this.trigger(o,[s.opts,e.corner]),n=!1,o.isDefaultPrevented())return!1}if(i){if(a){var d=this,p=s.point&&s.point.corner==e.corner?s.point:m._c.call(this,e.corner,1);this.animatef({from:[p.x,p.y],to:[e.x,e.y],duration:500,frame:function(t){e.x=Math.round(t[0]),e.y=Math.round(t[1]),m._fold.call(d,e)}})}else m._fold.call(this,e),r.effect&&!r.effect.turning&&this.animatef(!1);return n||(s.visible=!0,m._moveFoldingPage.call(this,!0),s.fpage.show()),!0}return!1},hide:function(){var t=this.data().f;m._foldingPage.call(this);return this.css({position:"",left:"auto"}),t.wrapper.css({width:this.width()}),t.fpage.css({width:this.width()}),t.folding&&t.folding.css({position:"",left:"auto"}),t.fpage.hide(),t.visible=!1,this},hideFoldedPage:function(t){var e=this.data().f;if(e.point){var a=this,s=e.point,n=function(){e.point=null,a.flip("hide"),a.trigger("end",[e.opts,!1])};if(t){var o=m._c.call(this,s.corner),d="t"==s.corner.substr(0,1),p=d?Math.min(0,s.y-o.y)/2:Math.max(0,s.y-o.y)/2,l=r(s.x,s.y+p),h=r(o.x,o.y-p);this.animatef({from:0,to:1,frame:function(t){var e=i(s,l,h,o,t);s.x=e.x,s.y=e.y,m._fold.call(a,s)},complete:n,duration:800,hiding:!0})}else this.animatef(!1),n()}},turnPage:function(t){var e=this,a=this.data().f;t={corner:a.corner?a.corner.corner:t||m._cAllowed.call(this)[0]};var r=a.point||m._c.call(this,t.corner,a.opts.turn?a.opts.turn.data().opts.elevation:0),s=m._c2.call(this,t.corner);this.trigger("flip").animatef({from:0,to:1,frame:function(a){var n=i(r,r,s,s,a);t.x=n.x,t.y=n.y,m._showFoldedPage.call(e,t)},complete:function(){e.trigger("end",[a.opts,!0])},duration:a.opts.duration,turning:!0}),a.corner=null},moving:function(){return"effect"in this.data()},isTurning:function(){return this.flip("moving")&&this.data().effect.turning},_eventStart:function(t){var e=this.data().f;if(!e.disabled&&!this.flip("isTurning")){if(e.corner=m._cornerActivated.call(this,t),e.corner&&m._foldingPage.call(this,e.corner))return m._showFoldedPage.call(this,e.corner)&&this.trigger("pressed",[e.point]),!1;e.corner=null}},_eventMove:function(t){var e=this.data().f;if(!e.disabled)if(t=[t],e.corner){var a=e.parent.offset();e.corner.x=t[0].pageX-a.left,e.corner.y=t[0].pageY-a.top,m._showFoldedPage.call(this,e.corner)}else if(!this.data().effect&&this.is(":visible")){var i=m._cornerActivated.call(this,t[0]);if(i){var r=m._c.call(this,i.corner,e.opts.cornerSize/2);i.x=r.x,i.y=r.y,m._showFoldedPage.call(this,i,!0)}else m.hideFoldedPage.call(this,!0)}},_eventEnd:function(){var e=this.data().f;if(!e.disabled&&e.point){var a=t.Event("released");this.trigger(a,[e.point]),a.isDefaultPrevented()||m.hideFoldedPage.call(this,!0)}e.corner=null},disable:function(t){return m.setData.call(this,{disabled:t}),this}};window.requestAnim=function(t){window.setTimeout(t,1e3/60)},t.extend(t.fn,{flip:function(t,a){return e(this,m,arguments)},turn:function(t){return e(this,w,arguments)},transform:function(t,e){var a={};return e&&(a[l+"transform-origin"]=e),a[l+"transform"]=t,this.css(a)},animatef:function(e){var a=this.data();if(a.effect&&a.effect.stop(),e){e.to.length||(e.to=[e.to]),e.from.length||(e.from=[e.from]);for(var i=[],r=e.to.length,s=!0,n=this,o=(new Date).getTime(),d=function(){if(a.effect&&s){for(var t=[],p=Math.min(e.duration,(new Date).getTime()-o),l=0;l<r;l++)t.push(a.effect.easing(1,p,e.from[l],i[l],e.duration));e.frame(1==r?t[0]:t),p==e.duration?(delete a.effect,n.data(a),e.complete&&e.complete()):window.requestAnim(d)}},p=0;p<r;p++)i.push(e.to[p]-e.from[p]);a.effect=t.extend({stop:function(){s=!1},easing:function(t,e,a,i,r){return i*Math.sqrt(1-(e=e/r-1)*e)+a}},e),this.data(a),d()}else delete a.effect}}),t.isTouch=!1,t.mouseEvents=h,t.cssPrefix=p,t.cssTransitionEnd=p,t.findPos=d}(jQuery);
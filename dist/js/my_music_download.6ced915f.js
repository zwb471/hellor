(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["my_music_download"],{"3df5":function(e,t,n){"use strict";n.r(t);var a=n("7a23"),c={class:"MusicDownloadPage"},o={for:"uploadAudio"},r=Object(a["o"])(" 上传云盘 ");function u(e,t,n,u,i,l){var d=Object(a["S"])("CloudUploadOutlined"),s=Object(a["S"])("a-tag");return Object(a["J"])(),Object(a["m"])("div",c,[Object(a["n"])("label",o,[Object(a["p"])(s,{color:"#55acee",style:{padding:"10px 20px",cursor:"pointer"}},{icon:Object(a["fb"])((function(){return[Object(a["p"])(d,{style:{"font-size":"18px"}})]})),default:Object(a["fb"])((function(){return[r]})),_:1})]),Object(a["n"])("template",null,[Object(a["n"])("input",{id:"uploadAudio",type:"file",accept:"audio/*",onChange:t[0]||(t[0]=function(t){return e.handleFileUpload()}),ref:"fileInput"},null,544)])])}var i=n("5530"),l=(n("04f3"),n("ed3b")),d=n("1da1"),s=(n("96cf"),n("6eba"),n("0d03"),n("614e")),p={name:"MusicDownloadPage",setup:function(){var e=Object(a["N"])({fileInput:null,handleFileUpload:function(){var e=this;return Object(d["a"])(regeneratorRuntime.mark((function t(){var n,a,c,o;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(n=e.fileInput.files,!n.length){t.next=15;break}return a=n.item(0),c=new FormData,c.append("songFile",a),t.prev=5,t.next=8,$axios({url:s["a"]+"/cloud?time="+Date.now(),method:"post",headers:{"Content-Type":"multipart/form-data"},data:c});case 8:o=t.sent,o["data"]["code"]&&l["a"].success({title:"上传云盘成功"}),t.next=15;break;case 12:t.prev=12,t.t0=t["catch"](5),console.log(t.t0.message);case 15:case"end":return t.stop()}}),t,null,[[5,12]])})))()}});return Object(i["a"])({},Object(a["Z"])(e))}},f=(n("e63f"),n("6b0d")),b=n.n(f);const O=b()(p,[["render",u],["__scopeId","data-v-38ec02a0"]]);t["default"]=O},e63f:function(e,t,n){"use strict";n("ef5c")},ef5c:function(e,t,n){}}]);
//# sourceMappingURL=my_music_download.6ced915f.js.map
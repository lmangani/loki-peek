(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{35:function(e,t,n){e.exports=n(91)},41:function(e,t,n){},43:function(e,t,n){e.exports=n.p+"static/media/logo.5d5d9eef.svg"},44:function(e,t,n){},91:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(32),c=n.n(o),s=(n(41),n(11)),i=n(12),l=n(14),u=n(13),h=n(15),m=(n(43),n(44),n(33)),p=n.n(m),d=n(34),f=function(e){function t(){var e;return Object(s.a)(this,t),(e=Object(l.a)(this,Object(u.a)(t).call(this))).onDateChange=function(t){return e.setState({date:t})},e.state={searchText:"",searchServer:Object({NODE_ENV:"production",PUBLIC_URL:""}).API||"http://127.0.0.1:3100",date:[new Date,new Date],streams:[]},e}return Object(h.a)(t,e),Object(i.a)(t,[{key:"parseQuery",value:function(e){var t=/(?:^|\s){[^{]*}/g,n=e.match(t),a="",r=e;return n&&(a=n[0].trim(),r=e.replace(t,"").trim()),console.log(a,r),{query:a,regexp:r}}},{key:"onChangeHandle",value:function(e){this.setState({searchText:e.target.value})}},{key:"onChangeServer",value:function(e){this.setState({searchServer:e.target.value})}},{key:"onSubmit",value:function(e){var t=this;e.preventDefault();var n=this.state.searchText,a=this.state.searchServer,r=this.state.date,o=this.parseQuery(n),c="&start="+r[0].getTime()+"000000&end="+r[1].getTime()+"000000",s="".concat(a,"/api/prom/query?query=").concat(o.query,"&regexp=").concat(o.regexp)+c;Object(d.a)(s).then(function(e){return e.json()}).then(function(e){return t.setState({streams:e.streams})}).catch(function(e){console.log(e)})}},{key:"render",value:function(){var e=this,t={paddingTop:"10px",display:"flex",justifyContent:"center",backgroundColor:"#808080",padding:"10px"};return r.a.createElement("div",{className:"App"},r.a.createElement("div",{style:{margin:"auto",fontSize:"18px",width:"100%",backgroundColor:"#c9c9c9",display:"flex",flexDirection:"column"}},r.a.createElement(p.a,{onChange:this.onDateChange,value:this.state.date}),r.a.createElement("div",null,r.a.createElement("div",{className:"float",style:{width:"20%"}},r.a.createElement("form",{style:t},r.a.createElement("label",{htmlFor:"searchServer"},"Server "),r.a.createElement("input",{type:"text",id:"searchServer",value:this.state.searchServer,onChange:function(t){return e.onChangeServer(t)},className:"searchForm"}))),r.a.createElement("div",{className:"float",style:{width:"80%"}},r.a.createElement("form",{style:t,onSubmit:function(t){return e.onSubmit(t)}},r.a.createElement("label",{htmlFor:"searchTextForm"},"Search "),r.a.createElement("input",{type:"text",id:"searchTextForm",onChange:function(t){return e.onChangeHandle(t)},value:this.state.searchText,className:"searchForm"})))),r.a.createElement(v,{streams:this.state.streams})))}}]),t}(a.Component),v=function(e){function t(){return Object(s.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{style:{paddingTop:"20px",display:"flex",justifyContent:"space-between",flexDirection:"column",backgroundColor:"#CFD2E1"}},this.streams)}},{key:"streams",get:function(){try{return this.props.streams.map(function(e){return e.entries.map(function(e){return r.a.createElement(g,{ts:e.ts,line:e.line})})})}catch(e){return r.a.createElement(g,{ts:"",line:"No Results"})}}}]),t}(r.a.Component),g=function(e){function t(){return Object(s.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{style:{display:"flex",flexDirection:"row",paddingLeft:"2%",fontSize:"14px",textAlign:"left",maxWidth:"90%"}},r.a.createElement("p",null,this.props.ts,": ",this.props.line))}}]),t}(r.a.Component),y=f;Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(y,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[35,2,1]]]);
//# sourceMappingURL=main.aa12ee69.chunk.js.map
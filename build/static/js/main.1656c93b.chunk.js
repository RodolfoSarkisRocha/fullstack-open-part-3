(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{20:function(e,t,n){e.exports=n(43)},25:function(e,t,n){},43:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(17),c=n.n(o),i=(n(25),n(19)),l=n(18),u=n(7),m=n(2),s=n(5),d=function(e){var t=e.text;return r.a.createElement("h2",null,t)},f=function(e){var t=e.person,n=e.onDelete;return r.a.createElement("div",{style:{marginBottom:10},key:t.id},r.a.createElement("div",null,"Name: ".concat(t.name)),r.a.createElement("div",null,"Number: ".concat(t.number)),r.a.createElement("button",{onClick:function(){return n(t)}},"Delete"),r.a.createElement("div",{style:{marginTop:10,borderBottom:"1px solid black"}}))},b=function(e){var t=e.persons,n=void 0===t?[]:t,a=e.onDelete;return r.a.createElement(r.a.Fragment,null,r.a.createElement(d,{text:"Numbers"}),n.map((function(e){return r.a.createElement(f,{key:e.id,person:e,onDelete:a})})))},p=function(e){var t=e.onSubmit,n=e.handleInputChange,a=e.contactFields;return r.a.createElement(r.a.Fragment,null,r.a.createElement(d,{text:"Create new person"}),r.a.createElement("form",{onSubmit:t},r.a.createElement("div",{style:{marginBottom:10}},r.a.createElement("label",null,"Name: "),r.a.createElement("input",{value:a.name,name:"name",onChange:n})),r.a.createElement("div",{style:{marginBottom:10}},r.a.createElement("label",null,"Number: "),r.a.createElement("input",{value:a.number,name:"number",onChange:n})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"Add"))))},h=function(e){var t=e.filterValue,n=e.filterName,a=e.handleFilter;return r.a.createElement("div",{style:{marginBottom:10}},r.a.createElement("label",null,n,": "),r.a.createElement("input",{value:t,onChange:a}))},v=n(4),E=n.n(v),g="https://fso-phonebook-backend-node.herokuapp.com/api/people",y={backgroundColor:"#f6ffed",border:"1px solid #b7eb8f",color:"#52c41a",transition:"opacity 2s linear",height:"30px",padding:5,opacity:1},w={backgroundColor:"#fff1f0",border:"1px solid #ffa39e",color:"#f5222d",padding:5,height:"30px",opacity:1},x={width:"100%",borderRadius:5,boxSizing:"border-box",height:0,opacity:0,transition:"opacity 2s linear",textAlign:"center"},j=function(e){var t=e.message,n=e.type,a={success:y,error:w},o=Object(m.a)(Object(m.a)({},x),a[n]);return r.a.createElement("div",{style:o},t)},O={padding:10,boxSizing:"border-box",width:"100%"},k=function(){var e=Object(a.useState)([]),t=Object(s.a)(e,2),n=t[0],o=t[1],c=Object(a.useState)({name:"",number:""}),f=Object(s.a)(c,2),v=f[0],y=f[1],w=Object(a.useState)(""),x=Object(s.a)(w,2),k=x[0],S=x[1],C=Object(a.useState)({message:null,type:null}),I=Object(s.a)(C,2),N=I[0],B=I[1];Object(a.useEffect)((function(){E.a.get(g).then((function(e){return e.data})).then((function(e){return o(e)})).catch((function(e){return F("It was impossible to retrieve notes","error")}))}),[]);var F=function(e,t){B({message:e,type:t}),setTimeout((function(){B({message:null,type:null})}),5e3)};return r.a.createElement("div",{style:O},r.a.createElement(d,{text:"Phonebook"}),r.a.createElement(j,{message:N.message,type:N.type}),r.a.createElement(d,{text:"Filters"}),r.a.createElement(h,{filterValue:k,filterName:"Name",handleFilter:function(e){var t=e.target.value.trim();S(t)}}),r.a.createElement(p,{onSubmit:function(e){e.preventDefault();var t,a,r=v.name,c=v.number;if([r,c].some((function(e){return""===e.trim()||null===e||void 0===e})))F("Both fields are required!","error");else{var i={name:r,number:c};if(function(e){return!!n.some((function(t){return t.name===e}))}(r)){if(window.confirm("".concat(r," is already addded to phonebook, replace the old number with a new one?"))){var u=n.find((function(e){return e.name===r}));(t=u.id,a=i,E.a.put("".concat(g,"/").concat(t),a).then((function(e){return e.data}))).then((function(e){var t=Object(l.a)(n),a=t.findIndex((function(t){return t.id===e.id}));t.splice(a,1,e),o(t),y({name:"",number:""}),F("Successfully updated ".concat(r,"!"),"success")})).catch((function(){return F("It was impossible to edit ".concat(r),"error")}))}}else(function(e){return E.a.post(g,e).then((function(e){return e.data}))})(i).then((function(e){o(n.concat(e)),y({name:"",number:""}),F("Sucessfully added ".concat(r," to the list!"),"success")})).catch((function(){return F("It was impossible to create note","error")}))}},handleInputChange:function(e){var t=e.target.value,n=e.target.name;y(Object(m.a)(Object(m.a)({},v),{},Object(u.a)({},n,t)))},contactFields:v}),r.a.createElement(b,{persons:k?n.filter((function(e){var t=e.name.toLowerCase(),n=k.toLowerCase();return t.includes(n)})):n,onDelete:function(e){var t=e.id,a=Object(i.a)(e,["id"]);window.confirm("Are you sure you want to delete ".concat(a.name,"?"))&&function(e){return E.a.delete("".concat(g,"/").concat(e)).then((function(e){return e.data}))}(t).then((function(){o(n.filter((function(e){return e.id!==t}))),F("Succesfully deleted ".concat(a.name))})).catch((function(){F("It was impossible to delete the person with name ".concat(a.name),"error")}))}}))};c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(k,null)),document.getElementById("root"))}},[[20,1,2]]]);
//# sourceMappingURL=main.1656c93b.chunk.js.map
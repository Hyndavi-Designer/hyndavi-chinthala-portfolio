(function(){
var D=document,R=D.documentElement;
function $(s,c){return(c||D).querySelector(s)}function $$(s,c){return[].slice.call((c||D).querySelectorAll(s))}
/* theme */
try{var th=localStorage.getItem("hc-theme");if(th)R.setAttribute("data-theme",th)}catch(e){}
var tb=$(".th-t");
function paint(){if(tb)tb.textContent=R.getAttribute("data-theme")==="light"?"☾":"☀"}paint();
if(tb)tb.onclick=function(){var n=R.getAttribute("data-theme")==="light"?"dark":"light";R.setAttribute("data-theme",n);try{localStorage.setItem("hc-theme",n)}catch(e){}paint()};
/* loader */
var ld=$("#ld");
if(ld){var seen=0;try{seen=sessionStorage.getItem("hc-ld")}catch(e){}
 if(seen||matchMedia("(prefers-reduced-motion:reduce)").matches){ld.classList.add("done")}
 else{var p=0,pc=$("b",ld),t=setInterval(function(){p=Math.min(100,p+Math.ceil(Math.random()*14));pc.textContent=p+"%";if(p>=100){clearInterval(t);setTimeout(function(){ld.classList.add("done");go()},250);try{sessionStorage.setItem("hc-ld","1")}catch(e){}}},70)}}
/* clock */
var ck=$("#clk");if(ck){var f=function(){try{ck.textContent=new Intl.DateTimeFormat("en-IN",{hour:"numeric",minute:"2-digit",timeZone:"Asia/Kolkata"}).format(new Date())+" Hyderabad"}catch(e){}};f();setInterval(f,30000)}
/* mobile menu */
var mb=$(".mb"),nv=$(".nv");
if(mb)mb.onclick=function(){var o=nv.classList.toggle("open");mb.textContent=o?"Close":"Menu";mb.style.position=o?"relative":"";mb.style.zIndex=o?"70":""};
$$(".nv a").forEach(function(a){a.addEventListener("click",function(){if(nv.classList.contains("open")){nv.classList.remove("open");mb.textContent="Menu"}})});
/* nav on scroll */
var bar=$(".bar"),ly=0;
addEventListener("scroll",function(){var y=scrollY;bar.classList.toggle("solid",y>40);bar.classList.toggle("hide",y>ly&&y>400&&!nv.classList.contains("open"));ly=y},{passive:true});
/* reveal */
function go(){var io=window.IntersectionObserver&&new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting){x.target.classList.add("in");io.unobserve(x.target)}})},{threshold:.12});
 $$(".rv").forEach(function(e){if(io)io.observe(e);else e.classList.add("in")})}
if(!ld||ld.classList.contains("done"))go();
/* scrollspy */
var secs=$$("main section[id]"),links=$$(".nv a[href^='#']");
if(secs.length&&window.IntersectionObserver){var so=new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting)links.forEach(function(a){a.classList.toggle("cur",a.getAttribute("href")==="#"+x.target.id)})})},{rootMargin:"-45% 0px -50% 0px"});secs.forEach(function(s){so.observe(s)})}
/* cursor bubble */
var cu=$("#cur");
if(cu&&matchMedia("(hover:hover)").matches){var cx=0,cy=0,tx=0,ty=0;
 addEventListener("mousemove",function(e){tx=e.clientX;ty=e.clientY});
 (function l(){cx+=(tx-cx)*.18;cy+=(ty-cy)*.18;cu.style.transform="translate("+cx+"px,"+cy+"px)"+(cu.classList.contains("on")?" scale(1)":" scale(0)");requestAnimationFrame(l)})();
 $$(".card").forEach(function(c){c.addEventListener("mouseenter",function(){cu.classList.add("on")});c.addEventListener("mouseleave",function(){cu.classList.remove("on")})})}
/* pinned work deck */
var tr=$(".track");
if(tr&&!matchMedia("(prefers-reduced-motion:reduce)").matches){
 var cs=$$(".dk .card"),N=cs.length,ct=$(".cnt .t"),pb=$(".cnt .bar2 i"),tk=0;tr.classList.add("on");
 var ez=function(t){return t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2};
 var upd=function(){tk=0;var r=tr.getBoundingClientRect(),vh=innerHeight,s=Math.min(Math.max(-r.top,0)/vh,N-1),f=Math.floor(s),fr=s-f,p=s>=N-1?N-1:f+ez(Math.min(1,Math.max(0,(fr-.12)/.76)));
  cs.forEach(function(c,i){var d=i-p,a=Math.abs(d);c.style.transform="translate3d(0,"+(d*100)+"%,0) scale("+(d<0?1+Math.max(d,-1)*.05:1)+")";c.style.opacity=d<0?Math.max(0,1+d*1.15):1;c.style.visibility=a>1.02?"hidden":"visible";c.style.pointerEvents=a<.5?"auto":"none";c.style.zIndex=d<0?1:2;c.tabIndex=a<.5?0:-1});
  var k=Math.round(p);ct.textContent=("0"+(k+1)).slice(-2)+" / "+("0"+N).slice(-2);pb.style.width=(p/(N-1)*100)+"%"};
 var rq=function(){if(!tk){tk=1;requestAnimationFrame(upd)}};
 addEventListener("scroll",rq,{passive:true});addEventListener("resize",rq);upd()}
/* lightbox */
var lb=D.createElement("div");lb.id="lb";lb.hidden=true;lb.setAttribute("role","dialog");lb.setAttribute("aria-label","Enlarged image");lb.innerHTML='<img alt="">';D.body.appendChild(lb);
lb.onclick=function(){lb.hidden=true};
$$(".zb").forEach(function(b){b.onclick=function(){var i=$("img",b),m=lb.firstChild;m.src=i.currentSrc||i.src;m.alt=i.alt;m.className=i.naturalHeight>1.6*i.naturalWidth?"":"t";lb.hidden=false;lb.scrollTop=0}});
/* slider */
var sl=$(".sl");
if(sl){var S=JSON.parse(sl.getAttribute("data-s")),k=0,n=S.length,im=$(".st img",sl),sp=$$(".sm span",sl),th2=$(".thb",sl),bs=[];
 S.forEach(function(s,j){var x=D.createElement("button");x.innerHTML='<img alt="" loading="lazy" src="'+s[2]+'">';x.setAttribute("aria-label","Slide "+(j+1)+": "+s[0]);x.onclick=function(){set(j)};th2.appendChild(x);bs.push(x)});
 function set(j){k=(j+n)%n;im.src=S[k][1];im.alt=S[k][0];sp[0].textContent=S[k][0];sp[1].textContent=(k+1)+" / "+n;bs.forEach(function(x,q){x.className=q===k?"on":""});th2.scrollTo({left:bs[k].offsetLeft-th2.clientWidth/2+bs[k].clientWidth/2,behavior:"smooth"})}
 $(".sp",sl).onclick=function(){set(k-1)};$(".sn",sl).onclick=function(){set(k+1)};
 var x0=null,st=$(".st",sl);st.ontouchstart=function(e){x0=e.touches[0].clientX};st.ontouchend=function(e){if(x0===null)return;var d=e.changedTouches[0].clientX-x0;if(Math.abs(d)>40)set(k+(d<0?1:-1));x0=null};
 D.addEventListener("keydown",function(e){if(!lb.hidden)return;if(e.key==="ArrowRight")set(k+1);else if(e.key==="ArrowLeft")set(k-1)});set(0)}
D.addEventListener("keydown",function(e){if(e.key==="Escape")lb.hidden=true});
})();

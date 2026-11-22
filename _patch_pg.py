import json, os, sys
sys.stdout.reconfigure(encoding="utf-8", errors="replace")
D = r"C:\Users\LOPES\.dsh\dsh_orb\portfolio_site"
p = os.path.join(D, "\u4e2a\u4eba\u4f5c\u54c1\u96c6\u7f51\u7ad9.html")
s = open(p, encoding="utf-8").read()
pg = json.load(open(os.path.join(D,"assets_src","_pg.json"), encoding="utf-8"))
pgjs = json.dumps(pg, ensure_ascii=True, separators=(",",":"))

A_SB   = 'var _SB='
A_OST  = 'var ost=ct.useState(null),opn=ost[0],setOpn=ost[1];'
A_RET  = 'return p.jsxs("div",{className:"wp"+(open?" is-open":""),'
A_ESC  = 'if(e.key==="Escape"){setLb(-1);setFl(null);setOpn(null);}'
A_CLOSE= 'if(!open){setLb(-1);setFl(null);setOpn(null);'
A_PROJ = 'p.jsx("div",{className:"wp__card wp__card--big wp__card--img",style:{backgroundImage:\'url("\'+_WIMG[0]+\'")\'},children:p.jsx("span",{className:"wp__no",children:"01"})}),p.jsxs("div",{className:"wp__cap",children:[p.jsx("b",{children:_WNAME[0][0]}),p.jsx("span",{children:"| "+_WNAME[0][1]})]})'
A_CV   = 'setOpn(null);},children:"\\u00d7"})]})})'
for nm,a in [("SB",A_SB),("OST",A_OST),("RET",A_RET),("ESC",A_ESC),("CLOSE",A_CLOSE),("PROJ",A_PROJ),("CV",A_CV)]:
    c = s.count(a); print(nm, c)
    if c != 1: raise SystemExit("anchor fail "+nm)

EFFECT = ('ct.useEffect(function(){if(pv!==null&&pvRef.current){pvRef.current.scrollLeft=0;setPvi(0);}},[pv]);'
 'function _go(i){var el=pvRef.current;if(!el)return;var c=el.children[i];if(c){el.scrollTo({left:c.offsetLeft-(el.clientWidth-c.clientWidth)/2,behavior:"smooth"});}}'
 'function _onSc(){var el=pvRef.current;if(!el)return;var best=0,bd=1e9;for(var i=0;i<el.children.length;i++){var c=el.children[i];'
 'var d=Math.abs(c.offsetLeft-(el.clientWidth-c.clientWidth)/2-el.scrollLeft);if(d<bd){bd=d;best=i;}}setPvi(best);}')

PGRID = ('p.jsx("div",{className:"wp__pg",children:_PG.map(function(g,gi){'
 'return p.jsxs("div",{className:"wp__pgitem",onClick:function(ev){ev.stopPropagation();setPv(gi);},children:['
 'p.jsx("div",{className:"wp__pgcover",style:{backgroundImage:\'url("\'+g.imgs[0]+\'")\'},children:p.jsx("span",{className:"wp__no",children:"0"+(gi+1)})}),'
 'p.jsxs("div",{className:"wp__label",children:[p.jsx("b",{children:g.cn}),p.jsx("em",{children:g.en})]})]},gi);})})')

PV = ('pv===null?null:p.jsx("div",{className:"wp__pv",onClick:function(){setPv(null);},'
 'children:p.jsxs("div",{className:"wp__pvin",onClick:function(ev){ev.stopPropagation();},children:['
 'p.jsx("div",{className:"wp__pvbody",ref:pvRef,onScroll:_onSc,children:_PG[pv].imgs.map(function(u,i){'
 'return p.jsx("img",{className:"wp__pvimg",src:u,alt:"",onClick:function(){_go(i);}},i);})}),'
 'p.jsxs("div",{className:"wp__pvname",children:[p.jsx("b",{children:_PG[pv].cn}),p.jsx("em",{children:_PG[pv].en}),p.jsx("i",{children:(pvi+1)+" / "+_PG[pv].imgs.length})]}),'
 'p.jsx("button",{className:"wp__pvn wp__pvn--l",onClick:function(){_go(Math.max(0,pvi-1));},children:"\\u2039"}),'
 'p.jsx("button",{className:"wp__pvn wp__pvn--r",onClick:function(){_go(Math.min(_PG[pv].imgs.length-1,pvi+1));},children:"\\u203a"}),'
 'p.jsx("button",{className:"wp__pvclose",onClick:function(){setPv(null);},children:"\\u00d7"})]})})')

s = s.replace(A_SB, "var _PG=" + pgjs + ";" + A_SB, 1)
s = s.replace(A_OST, A_OST + 'var pst=ct.useState(null),pv=pst[0],setPv=pst[1];var pis=ct.useState(0),pvi=pis[0],setPvi=pis[1];var pvRef=ct.useRef(null);', 1)
s = s.replace(A_RET, EFFECT + A_RET, 1)
s = s.replace(A_ESC, 'if(e.key==="Escape"){setLb(-1);setFl(null);setOpn(null);setPv(null);}', 1)
s = s.replace(A_CLOSE, 'if(!open){setLb(-1);setFl(null);setOpn(null);setPv(null);', 1)
s = s.replace(A_PROJ, PGRID, 1)
s = s.replace(A_CV, A_CV + ',' + PV, 1)

CSS = (".wp__pg{display:grid;grid-template-columns:repeat(4,1fr);gap:18px}"
 ".wp__pgitem{cursor:zoom-in}"
 ".wp__pgcover{position:relative;aspect-ratio:4/3;border-radius:12px;background-size:cover;background-position:center;background-color:#111116;transition:transform .4s,box-shadow .4s}"
 ".wp__pgitem:hover .wp__pgcover{transform:translateY(-4px);box-shadow:0 20px 46px rgba(0,0,0,.55)}"
 ".wp__pgcover .wp__no{color:rgba(255,255,255,.78);text-shadow:0 4px 20px rgba(0,0,0,.75)}"
 ".wp__pv{position:fixed;inset:0;z-index:10092;background:rgba(4,4,6,.975);display:flex;align-items:center;justify-content:center}"
 ".wp__pvin{width:100%;position:relative}"
 ".wp__pvbody{display:flex;gap:22px;overflow-x:auto;overflow-y:hidden;scroll-snap-type:x mandatory;padding:0 calc(50vw - 360px);scrollbar-width:none}"
 ".wp__pvbody::-webkit-scrollbar{display:none}"
 ".wp__pvimg{flex:0 0 720px;width:720px;max-width:72vw;height:62vh;object-fit:cover;border-radius:14px;scroll-snap-align:center;cursor:pointer;background:#0f0f13}"
 ".wp__pvname{display:flex;align-items:baseline;justify-content:center;gap:12px;margin-top:22px;text-align:center}"
 ".wp__pvname b{font-weight:600;font-size:17px;letter-spacing:.12em;color:rgba(255,255,255,.92)}"
 ".wp__pvname em{font-style:normal;font-size:10px;letter-spacing:.28em;color:rgba(255,255,255,.38)}"
 ".wp__pvname i{font-style:normal;font-size:11px;letter-spacing:.1em;color:rgba(255,255,255,.45);margin-left:6px}"
 ".wp__pvn{position:fixed;top:50%;transform:translateY(-50%);width:46px;height:46px;border-radius:50%;border:1px solid rgba(255,255,255,.2);background:rgba(10,10,14,.7);color:#fff;font-size:22px;line-height:1;cursor:pointer;z-index:10100}"
 ".wp__pvn--l{left:22px}.wp__pvn--r{right:22px}"
 ".wp__pvclose{position:fixed;top:20px;right:26px;width:40px;height:40px;border-radius:50%;border:1px solid rgba(255,255,255,.22);background:rgba(12,12,16,.75);color:#fff;font-size:20px;line-height:1;cursor:pointer;z-index:10100}"
 "@media(max-width:900px){.wp__pg{grid-template-columns:repeat(2,1fr)}}"
 "@media(max-width:640px){.wp__pg{grid-template-columns:1fr}.wp__pvimg{height:48vh}}")
if s.count("</style>") != 1: raise SystemExit("style anchor")
s = s.replace("</style>", CSS + "</style>", 1)

open(p,"w",encoding="utf-8",newline="").write(s)
print("ok", os.path.getsize(p))
print("PG", s.count("var _PG="), "pgcover", s.count("wp__pgcover"), "pv", s.count("wp__pv\""), "project_big_left", s.count("wp__card--big"))
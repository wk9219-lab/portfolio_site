import json, os, sys
sys.stdout.reconfigure(encoding="utf-8", errors="replace")
D = r"C:\Users\LOPES\.dsh\dsh_orb\portfolio_site"
HTML = os.path.join(D, "\u4e2a\u4eba\u4f5c\u54c1\u96c6\u7f51\u7ad9.html")
s = open(HTML, encoding="utf-8").read()
arr = json.load(open(os.path.join(D,"assets_src","_sb.json"), encoding="utf-8"))
sbjs = json.dumps(arr, ensure_ascii=True, separators=(",",":"))

A1 = 'var lst=ct.useState(-1),lb=lst[0],setLb=lst[1];'
A2 = 'if(e.key==="Escape")setLb(-1);'
A3 = 'if(!open){setLb(-1);'
A4 = 'p.jsx("div",{className:"wp__grid wp__grid--video",children:[0,1,2,3,4].map(function(k){return p.jsx(_VCard,{no:"0"+(k+1),i:k},k);})})'
A5 = 'return p.jsxs("div",{className:"wp"+(open?" is-open":""),'
A6 = 'children:"\\u00d7"})]}):null'
for nm,a in [("A1",A1),("A2",A2),("A3",A3),("A4",A4),("A5",A5),("A6",A6)]:
    c = s.count(a)
    print(nm, "count", c)
    if c != 1:
        raise SystemExit("anchor not unique: "+nm)

CASE = 'function _case(gi){return p.jsxs("div",{className:"wp__case",children:[p.jsx(_VCard,{no:"0"+(gi+1),i:gi}),p.jsxs("div",{className:"wp__sub",children:[p.jsx("b",{children:"\\u5206\\u955c\\u5c55\\u793a"}),p.jsx("em",{children:"Storyboard"})]}),p.jsx("div",{className:"wp__frames",children:_SB[gi].map(function(u,fi){return p.jsx("img",{className:"wp__frame",src:u,alt:"",loading:"lazy",onClick:function(ev){ev.stopPropagation();setFl([gi,fi]);}},fi);})})]},gi);}'
CASES = 'p.jsx("div",{className:"wp__cases",children:[0,1,2,3,4].map(function(k){return p.jsx(_case,{gi:k},k);})})'
FLB = 'fl?p.jsxs("div",{className:"wp__lb",onClick:function(){setFl(null);},children:[p.jsx("img",{className:"wp__lbimg",src:_SB[fl[0]][fl[1]],alt:"",onClick:function(ev){ev.stopPropagation();}}),p.jsx("button",{className:"wp__lbbtn wp__lbbtn--prev",onClick:function(ev){ev.stopPropagation();setFl([fl[0],(fl[1]+_SB[fl[0]].length-1)%_SB[fl[0]].length]);},children:"\\u2039"}),p.jsx("button",{className:"wp__lbbtn wp__lbbtn--next",onClick:function(ev){ev.stopPropagation();setFl([fl[0],(fl[1]+1)%_SB[fl[0]].length]);},children:"\\u203a"}),p.jsx("button",{className:"wp__lbclose",onClick:function(ev){ev.stopPropagation();setFl(null);},children:"\\u00d7"})]}):null'

CSS = (".wp__cases{display:block}"
 ".wp__case{max-width:1040px;margin:0 auto 92px}"
 ".wp__case .wp__card--wide{aspect-ratio:16/9}"
 ".wp__sub{display:flex;flex-direction:column;align-items:center;gap:6px;margin:30px 0 18px;text-align:center}"
 ".wp__sub b{font-weight:600;font-size:19px;letter-spacing:.14em;color:rgba(255,255,255,.92)}"
 ".wp__sub em{font-style:normal;font-size:10px;letter-spacing:.28em;text-transform:uppercase;color:rgba(255,255,255,.38)}"
 ".wp__frames{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}"
 ".wp__frame{width:100%;aspect-ratio:16/9;object-fit:cover;border-radius:10px;display:block;cursor:zoom-in;background:#121216;transition:transform .35s ease,box-shadow .35s ease}"
 ".wp__frame:hover{transform:translateY(-2px);box-shadow:0 16px 40px rgba(0,0,0,.55)}"
 "@media(max-width:640px){.wp__frames{grid-template-columns:repeat(2,1fr)}.wp__case{margin-bottom:56px}}")

s = s.replace(A1, A1 + 'var fst=ct.useState(null),fl=fst[0],setFl=fst[1];', 1)
s = s.replace(A2, 'if(e.key==="Escape"){setLb(-1);setFl(null);}', 1)
s = s.replace(A3, 'if(!open){setLb(-1);setFl(null);', 1)
s = s.replace(A4, CASES, 1)
s = s.replace(A5, CASE + A5, 1)
s = s.replace(A6, A6 + ',' + FLB, 1)
s = s.replace("</style>", CSS + "</style>", 1)
s = s.replace("function _WorksPage(){", "var _SB=" + sbjs + ";function _WorksPage(){", 1)

open(HTML, "w", encoding="utf-8", newline="").write(s)
print("written", os.path.getsize(HTML), "bytes")
print("SB count", s.count("var _SB="), "case count", s.count("wp__case"), "frame count", s.count("wp__frame\""))
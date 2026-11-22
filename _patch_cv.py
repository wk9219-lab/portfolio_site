import os, sys
sys.stdout.reconfigure(encoding="utf-8", errors="replace")
D = r"C:\Users\LOPES\.dsh\dsh_orb\portfolio_site"
p = os.path.join(D, "\u4e2a\u4eba\u4f5c\u54c1\u96c6\u7f51\u7ad9.html")
s = open(p, encoding="utf-8").read()

A_CASES = 'p.jsx("div",{className:"wp__cases",children:[0,1,2,3,4].map(function(k){return p.jsx(_case,{gi:k},k);})})'
A_FST   = 'var fst=ct.useState(null),fl=fst[0],setFl=fst[1];'
A_ESC   = 'if(e.key==="Escape"){setLb(-1);setFl(null);}'
A_CLOSE = 'if(!open){setLb(-1);setFl(null);'
A_FLB   = 'setFl(null);},children:"\\u00d7"})]}):null'
for nm,a in [("CASES",A_CASES),("FST",A_FST),("ESC",A_ESC),("CLOSE",A_CLOSE),("FLB",A_FLB)]:
    c = s.count(a); print(nm, c)
    if c != 1: raise SystemExit("anchor fail "+nm)

# remove _case definition
i = s.find('function _case(props){var gi=props.gi;')
if i < 0: raise SystemExit("case def not found")
j = s.find('},gi);}', i)
if j < 0: raise SystemExit("case tail not found")
s = s[:i] + s[j+7:]
print("case def removed")

GRID = ('p.jsx("div",{className:"wp__grid wp__grid--video",children:[0,1,2,3,4].map(function(k){'
        'return p.jsxs("div",{className:"wp__vidcell",onClick:function(ev){ev.stopPropagation();setOpn(k);},children:['
        'p.jsx(_VCard,{no:"0"+(k+1),i:k}),p.jsx("span",{className:"wp__hit"})]},k);})})')

CV = ('opn===null?null:p.jsx("div",{className:"wp__cv",onClick:function(){setOpn(null);},'
      'children:p.jsxs("div",{className:"wp__cvin",onClick:function(ev){ev.stopPropagation();},children:['
      'p.jsx(_VCard,{no:"0"+(opn+1),i:opn}),'
      'p.jsxs("div",{className:"wp__sub",children:[p.jsx("b",{children:"\\u5206\\u955c\\u5c55\\u793a"}),p.jsx("em",{children:"Storyboard"})]}),'
      'p.jsx("div",{className:"wp__frames",children:_SB[opn].map(function(u,fi){'
      'return p.jsx("img",{className:"wp__frame",src:u,alt:"",onClick:function(ev){ev.stopPropagation();setFl([opn,fi]);}},fi);})}),'
      'p.jsx("button",{className:"wp__cvclose",onClick:function(ev){ev.stopPropagation();setOpn(null);},children:"\\u00d7"})]})})')

s = s.replace(A_CASES, GRID, 1)
s = s.replace(A_FST, A_FST + 'var ost=ct.useState(null),opn=ost[0],setOpn=ost[1];', 1)
s = s.replace(A_ESC, 'if(e.key==="Escape"){setLb(-1);setFl(null);setOpn(null);}', 1)
s = s.replace(A_CLOSE, 'if(!open){setLb(-1);setFl(null);setOpn(null);', 1)
s = s.replace(A_FLB, A_FLB + ',' + CV, 1)

CSS = (".wp__vidcell{position:relative}"
 ".wp__hit{position:absolute;inset:0;z-index:5;cursor:zoom-in;border-radius:14px}"
 ".wp__cv{position:fixed;inset:0;z-index:10050;background:rgba(5,5,7,.965);overflow-y:auto;padding:76px 0 96px}"
 ".wp__cvin{max-width:1040px;margin:0 auto;padding:0 24px;position:relative}"
 ".wp__cvin .wp__card--wide{aspect-ratio:16/9}"
 ".wp__cvclose{position:fixed;top:20px;right:26px;width:40px;height:40px;border-radius:50%;border:1px solid rgba(255,255,255,.22);background:rgba(12,12,16,.75);color:#fff;font-size:20px;line-height:1;cursor:pointer;z-index:10060}"
 ".wp__lb{z-index:10080}")
c2 = s.count("</style>")
if c2 != 1: raise SystemExit("style anchor %d" % c2)
s = s.replace("</style>", CSS + "</style>", 1)

open(p, "w", encoding="utf-8", newline="").write(s)
print("ok", os.path.getsize(p))
print("vidcell", s.count("wp__vidcell"), "cv", s.count("wp__cv\""), "case", s.count("wp__case"))
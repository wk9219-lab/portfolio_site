import os, sys
sys.stdout.reconfigure(encoding="utf-8", errors="replace")
p = r"C:\Users\LOPES\.dsh\dsh_orb\portfolio_site" + "\\" + "\u4e2a\u4eba\u4f5c\u54c1\u96c6\u7f51\u7ad9.html"
s = open(p, encoding="utf-8").read()
old = 'p.jsx("div",{className:"wp__pvbody",ref:pvRef,onScroll:_onSc,'
new = 'p.jsx("div",{className:"wp__pvbody",ref:pvRef,onScroll:_onSc,onClick:function(ev){if(ev.target===ev.currentTarget)setPv(null);},'
print("count", s.count(old))
if s.count(old) != 1: raise SystemExit("anchor fail")
s = s.replace(old, new, 1)
open(p,"w",encoding="utf-8",newline="").write(s)
print("ok", os.path.getsize(p))
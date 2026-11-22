import os, sys
sys.stdout.reconfigure(encoding="utf-8", errors="replace")
p=r"C:\Users\LOPES\.dsh\dsh_orb\portfolio_site\个人作品集网站.html"
s=open(p,encoding="utf-8").read()
old='function _case(gi){'
new='function _case(props){var gi=props.gi;'
print("count", s.count(old))
if s.count(old)!=1: raise SystemExit("anchor fail")
s=s.replace(old,new,1)
open(p,"w",encoding="utf-8",newline="").write(s)
print("ok", os.path.getsize(p))
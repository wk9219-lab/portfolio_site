import os, sys
sys.stdout.reconfigure(encoding="utf-8", errors="replace")
p = r"C:\Users\LOPES\.dsh\dsh_orb\portfolio_site" + "\\" + "\u4e2a\u4eba\u4f5c\u54c1\u96c6\u7f51\u7ad9.html"
s = open(p, encoding="utf-8").read()
old = ".wp__pvimg{flex:0 0 720px;width:720px;max-width:72vw;height:62vh;object-fit:contain;"
new = ".wp__pvimg{flex:0 0 auto;width:auto;height:62vh;max-width:72vw;object-fit:contain;"
print("count", s.count(old))
if s.count(old) == 1:
    s = s.replace(old, new, 1)
    open(p,"w",encoding="utf-8",newline="").write(s)
    print("ok", os.path.getsize(p))
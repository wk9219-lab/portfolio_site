import os, sys
sys.stdout.reconfigure(encoding="utf-8", errors="replace")
p = r"C:\Users\LOPES\.dsh\dsh_orb\portfolio_site" + "\\" + "\u4e2a\u4eba\u4f5c\u54c1\u96c6\u7f51\u7ad9.html"
s = open(p, encoding="utf-8").read()
bad = "]],_WNAME="
print("count", s.count(bad))
if s.count(bad) == 1:
    s = s.replace(bad, "],_WNAME=", 1)
    open(p,"w",encoding="utf-8",newline="").write(s)
    print("fixed", os.path.getsize(p))
else:
    print("no fix needed")
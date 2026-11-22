import sys, re
sys.stdout.reconfigure(encoding="utf-8", errors="replace")
p=r"C:\Users\LOPES\.dsh\dsh_orb\portfolio_site\个人作品集网站.html"
s=open(p,encoding="utf-8").read()
print("_SB occurrences:", len(re.findall(r"_SB\b", s)))
for m in re.finditer(r"_SB\b", s):
    i=m.start()
    print(i, repr(s[max(0,i-60):i+60]))
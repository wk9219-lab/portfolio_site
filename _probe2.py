import sys, re
sys.stdout.reconfigure(encoding="utf-8", errors="replace")
p=r"C:\Users\LOPES\.dsh\dsh_orb\portfolio_site\个人作品集网站.html"
s=open(p,encoding="utf-8").read()
i=s.find("var _SB=")
print("idx",i)
print("PRE:",repr(s[i-120:i]))
print("HEAD:",repr(s[i:i+90]))
j=s.find(",_WNAME=") 
print("sbEnd:", repr(s[s.find(";function _WorksPage(){")-40:s.find(";function _WorksPage(){")+30]))
k=s.find("function _case(")
print("CASE:",repr(s[k:k+140]))
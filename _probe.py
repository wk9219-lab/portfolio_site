import io,sys,json
sys.stdout.reconfigure(encoding="utf-8",errors="replace")
p=r"C:\Users\LOPES\.dsh\dsh_orb\portfolio_site\个人作品集网站.html"
s=open(p,encoding="utf-8").read()
i=s.find("function _WorksPage(){")
print("funcStart",i)
i2=s.find("wp__grid--video")
print("videoGridRef",i2)
print("----SEG----")
print(s[i2-2200:i2+1800])
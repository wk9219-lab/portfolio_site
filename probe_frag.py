p = "C:\\Users\\LOPES\\.dsh\\dsh_orb\\portfolio_site\\\u4e2a\u4eba\u4f5c\u54c1\u96c6\u7f51\u7ad9.html"
s = open(p,"r",encoding="utf-8").read()
a = s.find("function _WorksPage(){")
i = s.find("{", a); d=0; j=i
while j < len(s):
    if s[j]=="{": d+=1
    elif s[j]=="}":
        d-=1
        if d==0: break
    j+=1
fn = s[a:j+1]
print("FN LEN", len(fn))
print("TAIL:", fn[-320:])
print("---")
k = fn.find("wp__card--sq")
print("FRAG:", fn[k-200:k+260])
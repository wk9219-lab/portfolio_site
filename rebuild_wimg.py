import base64, os, json
base = "C:\\Users\\LOPES\\.dsh\\dsh_orb\\portfolio_site"
p = base + "\\\u4e2a\u4eba\u4f5c\u54c1\u96c6\u7f51\u7ad9.html"
keys = ["h0","f0","f1","f2","f3","f4","f5","f6","f7","f8"]
WIMG = ["data:image/jpeg;base64," + base64.b64encode(open(os.path.join(base,"assets_src","w_%s.jpg"%k),"rb").read()).decode("ascii") for k in keys]
s = open(p,"r",encoding="utf-8").read()
a = s.find("var _WIMG=[")
m = s.find(",_WNAME=")
assert a != -1 and m != -1
s = s[:a] + "var _WIMG=" + json.dumps(WIMG) + s[m:]
assert "]] ,_WNAME" not in s and "]],_WNAME" not in s
open(p,"w",encoding="utf-8",newline="").write(s)
print("bytes:", len(s.encode("utf-8")))
import base64, os, json
base = "C:\\Users\\LOPES\\.dsh\\dsh_orb\\portfolio_site"
p = base + "\\\u4e2a\u4eba\u4f5c\u54c1\u96c6\u7f51\u7ad9.html"
def uri(k):
    return "data:image/jpeg;base64," + base64.b64encode(open(os.path.join(base,"assets_src","%s.jpg"%k),"rb").read()).decode("ascii")

keys = ["w_h0"] + ["w_f%d"%i for i in range(9)] + ["g%02d"%i for i in range(29)]
WIMG = [uri(k) for k in keys]
WNAME = [["\u5496\u5561\u673a \u00b7 \u4ea7\u54c1\u6e32\u67d3","COFFEE MACHINE / RENDERING"]] + [["",""] for _ in range(len(keys)-1)]

s = open(p,"r",encoding="utf-8").read()
a = s.find("var _WIMG=[")
m = s.find(",_WNAME=")
e = s.find("];", m)
assert a != -1 and m != -1 and e != -1 and a < m < e
decl = "var _WIMG=" + json.dumps(WIMG) + ",_WNAME=" + json.dumps(WNAME, ensure_ascii=False) + ";"
s = s[:a] + decl + s[e+2:]

n = len(WIMG) - 1
FR = list(range(1, n+1))
# insert _FR after decl
s = s.replace(decl, decl + "var _FR=" + json.dumps(FR) + ";", 1)

old_map = "children:[1,2,3,4,5,6,7,8,9].map(function(i){"
assert s.count(old_map) == 1
s = s.replace(old_map, "children:_FR.map(function(i){", 1)

assert s.count("((lb-2+9)%9)+1") == 1
s = s.replace("((lb-2+9)%9)+1", "((lb-2+_FR.length)%_FR.length)+1", 1)
assert s.count("setLb((lb%9)+1)") == 1
s = s.replace("setLb((lb%9)+1)", "setLb((lb%_FR.length)+1)", 1)

open(p,"w",encoding="utf-8",newline="").write(s)
print("fragments:", n, "| bytes:", len(s.encode("utf-8")))
import base64, os, json, re
base = "C:\\Users\\LOPES\\.dsh\\dsh_orb\\portfolio_site"
p = base + "\\\u4e2a\u4eba\u4f5c\u54c1\u96c6\u7f51\u7ad9.html"
keys = ["d0","d1","d2","d3","d4","d5","d6","d7","h0","f0","f1","f2","f3","f4","f5","f6","f7","f8"]
imgs = []
for k in keys:
    b = open(os.path.join(base, "assets_src", "w_%s.jpg" % k), "rb").read()
    imgs.append("data:image/jpeg;base64," + base64.b64encode(b).decode("ascii"))
s = open(p, "r", encoding="utf-8").read()
i = s.find("var _WIMG=[")
assert i != -1
j = s.find("],_WNAME=", i)
assert j != -1
s = s[:i] + "var _WIMG=" + json.dumps(imgs) + s[j:]
open(p, "w", encoding="utf-8", newline="").write(s)
print("bytes:", len(s.encode("utf-8")))
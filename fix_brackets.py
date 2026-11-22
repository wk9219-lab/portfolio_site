p = "C:\\Users\\LOPES\\.dsh\\dsh_orb\\portfolio_site\\\u4e2a\u4eba\u4f5c\u54c1\u96c6\u7f51\u7ad9.html"
s = open(p, "r", encoding="utf-8").read()
bad = "]],_WNAME="
print("bad count:", s.count(bad))
assert s.count(bad) == 1
s = s.replace(bad, "],_WNAME=", 1)
open(p, "w", encoding="utf-8", newline="").write(s)
print("fixed, bytes:", len(s.encode("utf-8")))
i = s.find("var _WIMG=")
print("head:", s[i:i+40])
j = s.find(",_WNAME=")
print("around WNAME:", s[j-30:j+60])
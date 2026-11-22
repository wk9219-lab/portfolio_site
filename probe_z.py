p = "C:\\Users\\LOPES\\.dsh\\dsh_orb\\portfolio_site\\\u4e2a\u4eba\u4f5c\u54c1\u96c6\u7f51\u7ad9.html"
s = open(p, "r", encoding="utf-8").read()
import re
for m in re.finditer(r"\.nav\{[^}]*\}", s):
    print("NAV:", m.group(0)[:300])
for m in re.finditer(r"\.wp\{[^}]*\}", s):
    print("WP:", m.group(0)[:300])
for m in re.finditer(r"z-index:\s*\d{3,5}", s):
    pass
print("nav--glass:", s[s.find(".nav--glass"):s.find(".nav--glass")+200] if ".nav--glass" in s else "none")
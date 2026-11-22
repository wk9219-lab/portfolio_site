p = "C:\\Users\\LOPES\\.dsh\\dsh_orb\\portfolio_site\\\u4e2a\u4eba\u4f5c\u54c1\u96c6\u7f51\u7ad9.html"
s = open(p, "r", encoding="utf-8").read()
old = ".wp{position:fixed;inset:0;z-index:9000;"
assert s.count(old) == 1, s.count(old)
s = s.replace(old, ".wp{position:fixed;inset:0;z-index:10000;", 1)
open(p, "w", encoding="utf-8", newline="").write(s)
print("z fixed, bytes:", len(s.encode("utf-8")))
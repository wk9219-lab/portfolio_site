p = "C:\\Users\\LOPES\\.dsh\\dsh_orb\\portfolio_site\\\u4e2a\u4eba\u4f5c\u54c1\u96c6\u7f51\u7ad9.html"
s = open(p, "r", encoding="utf-8").read()
key = "\u5148\u4ee5\u9ad8\u7ea7\u5360\u4f4d\u56fe"
i = s.find(key)
print("idx=", i, "count=", s.count(key))
print("---- before 700 ----")
print(s[max(0,i-700):i])
print("---- at ----")
print(s[i:i+240])
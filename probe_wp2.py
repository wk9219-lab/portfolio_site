p = "C:\\Users\\LOPES\\.dsh\\dsh_orb\\portfolio_site\\\u4e2a\u4eba\u4f5c\u54c1\u96c6\u7f51\u7ad9.html"
s = open(p, "r", encoding="utf-8").read()
k = s.find(".wp__sec+.wp__sec")
print(s[k:k+1600])
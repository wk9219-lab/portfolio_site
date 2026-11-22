p = "C:\\Users\\LOPES\\.dsh\\dsh_orb\\portfolio_site\\\u4e2a\u4eba\u4f5c\u54c1\u96c6\u7f51\u7ad9.html"
s = open(p, "r", encoding="utf-8").read()
a = s.find("function _WorksPage(){")
print("start=", a)
# brace match
i = s.find("{", a)
depth = 0
j = i
while j < len(s):
    c = s[j]
    if c == "{": depth += 1
    elif c == "}":
        depth -= 1
        if depth == 0:
            break
    j += 1
print("end=", j+1, "len=", j+1-a)
print("---- FUNC ----")
print(s[a:j+1])
print()
print("---- CSS .wp ----")
k = s.find(".wp{")
print(s[k:k+1500])
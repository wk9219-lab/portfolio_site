p = "C:\\Users\\LOPES\\.dsh\\dsh_orb\\portfolio_site\\\u4e2a\u4eba\u4f5c\u54c1\u96c6\u7f51\u7ad9.html"
s = open(p, "r", encoding="utf-8").read()
key = "\u5148\u4ee5\u9ad8\u7ea7\u5360\u4f4d\u56fe"
assert s.count(key) == 1, s.count(key)
i = s.find(key)
anchor = 'p.jsx("p",{className:"section__note"'
st = s.rfind(anchor, 0, i)
assert st != -1
j = s.find('"})', i)
assert j != -1
end = j + 4
chunk = s[st:end]
assert chunk.startswith(anchor), chunk[:60]
assert key in chunk
assert chunk.endswith('"}),'), chunk[-20:]
s2 = s[:st] + s[end:]
assert s2.count(key) == 0
assert len(s2) == len(s) - len(chunk)
open(p, "w", encoding="utf-8", newline="").write(s2)
print("REMOVED CHARS:", len(chunk))
print("CHUNK:", chunk)
print("OLD BYTES:", len(s.encode("utf-8")))
print("NEW BYTES:", len(s2.encode("utf-8")))
ctx = s2[max(0,st-90):st+90]
print("CTX:", ctx)
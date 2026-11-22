import sys
p = "C:\\Users\\LOPES\\.dsh\\dsh_orb\\portfolio_site\\\u4e2a\u4eba\u4f5c\u54c1\u96c6\u7f51\u7ad9.html"
s = open(p, "r", encoding="utf-8").read()
orig = len(s)

works = '["#works","\\u4f5c\\u54c1\\u96c6"],'
assert s.count(works) == 1, "works token count=%d" % s.count(works)
s = s.replace(works, "", 1)

contact_end = '["#contact","\u8054\u7cfb"]]'
assert s.count(contact_end) == 1, "contact end count=%d" % s.count(contact_end)
s = s.replace(contact_end, '["#contact","\u8054\u7cfb"],["#works","\\u4f5c\\u54c1\\u96c6"]]', 1)

cls = 'className:"nav__link",children:['
assert s.count(cls) == 1, "cls count=%d" % s.count(cls)
s = s.replace(cls, 'className:"nav__link"+(r==="#works"?" nav__link--hot":""),children:[', 1)

css = ('.nav__link--hot{color:#ff2d1f!important;font-weight:700;padding:6px 14px;'
       'border:1px solid rgba(255,45,31,.45);border-radius:999px;'
       'background:rgba(255,45,31,.13);box-shadow:0 0 20px rgba(255,45,31,.22);'
       'transition:color .3s,background .3s,border-color .3s,box-shadow .3s}'
       '.nav__link--hot .nav__bracket{color:#ff2d1f;opacity:.7}'
       '.nav__link--hot:hover{color:#fff!important;background:#ff2d1f;border-color:#ff2d1f;'
       'box-shadow:0 0 26px rgba(255,45,31,.55)}'
       '.nav__link--hot:hover .nav__bracket{color:#fff;opacity:.85}')
assert s.count("</style>") == 1
s = s.replace("</style>", css + "</style>", 1)

open(p, "w", encoding="utf-8", newline="").write(s)
print("OK orig=%d new=%d" % (orig, len(s)))
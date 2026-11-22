p = "C:\\Users\\LOPES\\.dsh\\dsh_orb\\portfolio_site\\\u4e2a\u4eba\u4f5c\u54c1\u96c6\u7f51\u7ad9.html"
s = open(p, "r", encoding="utf-8").read()
orig = len(s)

# 1) 从导航链接列表里排除 #works
a = 'n.map(([r,l])=>p.jsxs('
assert s.count(a) == 1, "map count=%d" % s.count(a)
s = s.replace(a, 'n.filter(([r])=>r!=="#works").map(([r,l])=>p.jsxs(', 1)

# 2) 还原 map 内的 className
b = 'className:"nav__link"+(r==="#works"?" nav__link--hot":""),children:['
assert s.count(b) == 1, "clsmap count=%d" % s.count(b)
s = s.replace(b, 'className:"nav__link",children:[', 1)

# 3) 把 CTA 包进右组，作品集放它左边
c = 'p.jsx("a",{href:"#contact",className:"nav__cta",children:"\u8054\u7cfb\u6211"})]})}'
assert s.count(c) == 1, "cta count=%d" % s.count(c)
hot = ('p.jsxs("a",{href:"#works",className:"nav__link nav__link--hot",children:['
       'p.jsx("span",{className:"nav__bracket",children:"["}),'
       '"\u4f5c\u54c1\u96c6",'
       'p.jsx("span",{className:"nav__bracket",children:"]"})]}),')
newc = ('p.jsxs("div",{className:"nav__right",children:[' + hot +
        'p.jsx("a",{href:"#contact",className:"nav__cta",children:"\u8054\u7cfb\u6211"})]})]})}')
s = s.replace(c, newc, 1)

# 4) 替换之前追加的 --hot 样式
start = s.index('.nav__link--hot{color:#ff2d1f!important')
endmark = '.nav__link--hot:hover .nav__bracket{color:#fff;opacity:.85}'
end = s.index(endmark) + len(endmark)
newcss = ('.nav__right{display:flex;align-items:center;gap:18px}'
 '.nav__link--hot{color:#fff!important;font-weight:700;letter-spacing:.06em;'
 'padding:10px 20px;border:1px solid #ff2d1f;border-radius:999px;'
 'background:linear-gradient(135deg,#ff2d1f,#c8180d);'
 'box-shadow:0 8px 26px rgba(255,45,31,.38);'
 'transition:transform .3s,box-shadow .3s}'
 '.nav__link--hot .nav__bracket{color:rgba(255,255,255,.7)}'
 '.nav__link--hot:hover{transform:translateY(-2px);box-shadow:0 12px 34px rgba(255,45,31,.62)}'
 '.nav__link--hot:hover .nav__bracket{color:#fff}'
 '@media(max-width:1024px){.nav__link--hot{display:none}}')
s = s[:start] + newcss + s[end:]

open(p, "w", encoding="utf-8", newline="").write(s)
print("OK orig=%d new=%d" % (orig, len(s)))
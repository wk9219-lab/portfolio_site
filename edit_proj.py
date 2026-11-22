import json, base64, os
base = "C:\\Users\\LOPES\\.dsh\\dsh_orb\\portfolio_site"
p = base + "\\\u4e2a\u4eba\u4f5c\u54c1\u96c6\u7f51\u7ad9.html"

imgs = []
for n in (1, 2, 3):
    fn = os.path.join(base, "assets_src", "p%02d_w.jpg" % n)
    b = open(fn, "rb").read()
    imgs.append("data:image/jpeg;base64," + base64.b64encode(b).decode("ascii"))

s = open(p, "r", encoding="utf-8").read()
orig = len(s)

anchor = 'function Ud(){const e=[{no:"01"'
assert s.count(anchor) == 1, ("anchor", s.count(anchor))
s = s.replace(anchor, 'function Ud(){const _PIMG=' + json.dumps(imgs) + ';const e=[{no:"01"', 1)

old_visual = 'p.jsxs("div",{className:"project__visual",children:[p.jsx("span",{className:"project__no",children:t.no}),p.jsx("div",{className:"project__orb"})]})'
assert s.count(old_visual) == 1, ("visual", s.count(old_visual))
new_visual = 'p.jsxs("div",{className:"project__visual"+(t.img?" project__visual--photo":""),style:t.img?{backgroundImage:`linear-gradient(180deg,rgba(8,8,10,.66) 0%,rgba(8,8,10,.10) 40%,rgba(8,8,10,.58) 78%,rgba(8,8,10,.88) 100%),url("${t.img}")`}:void 0,children:[p.jsx("span",{className:"project__no",children:t.no}),t.img?null:p.jsx("div",{className:"project__orb"})]})'
s = s.replace(old_visual, new_visual, 1)

for i, tone in enumerate(("red", "cyan", "amber")):
    a = ',tone:"%s"}' % tone
    assert s.count(a) == 1, (tone, s.count(a))
    s = s.replace(a, ',tone:"%s",img:_PIMG[%d]}' % (tone, i), 1)

css = ('.project__visual--photo{background-color:#0a0a0f;background-size:cover;background-position:center}'
       '.project__visual--photo .project__no{color:rgba(255,255,255,.72);text-shadow:0 4px 28px rgba(0,0,0,.7)}')
assert s.count("</style>") == 1
s = s.replace("</style>", css + "</style>", 1)

open(p, "w", encoding="utf-8", newline="").write(s)
print("CHARS ADDED:", len(s) - orig)
print("NEW BYTES:", len(s.encode("utf-8")))
print("IMG COUNT:", s.count("data:image/jpeg;base64,"))
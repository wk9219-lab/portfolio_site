import base64, os, json
base = "C:\\Users\\LOPES\\.dsh\\dsh_orb\\portfolio_site"
p = base + "\\\u4e2a\u4eba\u4f5c\u54c1\u96c6\u7f51\u7ad9.html"

keys = ["d0","d1","d2","d3","d4","d5","d6","d7","h0","f0","f1","f2","f3","f4","f5","f6","f7","f8"]
imgs = []
for k in keys:
    b = open(os.path.join(base, "assets_src", "w_%s.jpg" % k), "rb").read()
    imgs.append("data:image/jpeg;base64," + base64.b64encode(b).decode("ascii"))

names = [
 ["\u5496\u5561\u673a", "COFFEE MACHINE"],
 ["\u624b\u673a\u58f3", "PHONE CASE"],
 ["\u624b\u8868", "WATCH"],
 ["\u663e\u793a\u5668", "MONITOR"],
 ["\u6c99\u53d1", "SOFA"],
 ["\u6e38\u620f\u624b\u67c4", "GAME CONTROLLER"],
 ["\u79fb\u52a8\u7535\u6e90", "POWER BANK"],
 ["\u82b1\u5349\u8bd7", "FLORAL CARE"],
 ["\u5496\u5561\u673a \u00b7 \u4ea7\u54c1\u6e32\u67d3", "COFFEE MACHINE / RENDERING"],
 ["", ""], ["", ""], ["", ""], ["", ""], ["", ""], ["", ""], ["", ""], ["", ""], ["", ""]
]

new_fn = (
'function _WorksPage(){var st=ct.useState(typeof location!=="undefined"?(location.hash||""):""),h=st[0],setH=st[1];'
'ct.useEffect(function(){var on=function(){setH(location.hash||"");};window.addEventListener("hashchange",on);return function(){window.removeEventListener("hashchange",on);};},[]);'
'var open=h==="#works";ct.useEffect(function(){document.documentElement.style.overflow=open?"hidden":"";return function(){document.documentElement.style.overflow="";};},[open]);'
'function pl(i,no){return p.jsxs("div",{className:"wp__item",children:['
'p.jsx("div",{className:"wp__card wp__card--wide wp__card--img",style:{backgroundImage:\'url("\'+_WIMG[i]+\'")\'},children:p.jsx("span",{className:"wp__no",children:no})}),'
'p.jsxs("div",{className:"wp__label",children:[p.jsx("b",{children:_WNAME[i][0]}),p.jsx("em",{children:_WNAME[i][1]})]})]},i);}'
'var dyn=[0,1,2,3,4,5,6,7];'
'return p.jsxs("div",{className:"wp"+(open?" is-open":""),children:['
'p.jsxs("div",{className:"wp__bar",children:[p.jsx("div",{className:"wp__logo",children:"HUANGWENJIAN"}),'
'p.jsx("button",{className:"wp__back",onClick:function(){if(location.hash)location.hash="";setH("");},children:"\u2190 \u8fd4\u56de"})]}),'
'p.jsx("div",{className:"wp__scroll",children:p.jsxs("div",{className:"wp__inner",children:['
'p.jsxs("section",{className:"wp__sec",children:['
'p.jsxs("h2",{className:"wp__title",children:[p.jsx("b",{children:"Dynamic Collection"}),p.jsx("i",{children:"|"}),p.jsx("span",{children:"\u52a8\u6001\u96c6"})]}),'
'p.jsx("div",{className:"wp__grid wp__grid--four",children:dyn.map(function(i,k){return pl(i,"0"+(k+1));})})]}),'
'p.jsxs("section",{className:"wp__sec",children:['
'p.jsxs("h2",{className:"wp__title",children:[p.jsx("b",{children:"Project Collection"}),p.jsx("i",{children:"|"}),p.jsx("span",{children:"\u9879\u76ee\u96c6"})]}),'
'p.jsx("div",{className:"wp__card wp__card--big wp__card--img",style:{backgroundImage:\'url("\'+_WIMG[8]+\'")\'},children:p.jsx("span",{className:"wp__no",children:"01"})}),'
'p.jsxs("div",{className:"wp__cap",children:[p.jsx("b",{children:_WNAME[8][0]}),p.jsx("span",{children:"| "+_WNAME[8][1]})]})]}),'
'p.jsxs("section",{className:"wp__sec",children:['
'p.jsxs("h2",{className:"wp__title",children:[p.jsx("b",{children:"Fragment Collection"}),p.jsx("i",{children:"|"}),p.jsx("span",{children:"\u788e\u7247\u96c6"})]}),'
'p.jsx("div",{className:"wp__grid",children:[9,10,11,12,13,14,15,16,17].map(function(i,k){'
'return p.jsx("div",{className:"wp__card wp__card--sq wp__card--img",style:{backgroundImage:\'url("\'+_WIMG[i]+\'")\'},children:p.jsx("span",{className:"wp__no",children:"0"+(k+1)})},i);})})]})]})})]});}'
)

css = ('.wp__grid--four{grid-template-columns:repeat(4,1fr);gap:18px}'
'.wp__item{display:flex;flex-direction:column;gap:10px}'
'.wp__label{display:flex;align-items:baseline;gap:9px}'
'.wp__label b{font-size:13px;font-weight:700;letter-spacing:.02em;color:rgba(255,255,255,.92)}'
'.wp__label em{font-style:normal;font-size:9.5px;letter-spacing:.15em;color:var(--fg-faint)}'
'.wp__card--img{background-size:cover;background-position:center;background-color:#0d0d12}'
'.wp__card--img:before{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(6,6,9,.34) 0%,rgba(6,6,9,0) 30%,rgba(6,6,9,.62) 100%);pointer-events:none}'
'.wp__card--img .wp__no{z-index:2;color:rgba(255,255,255,.82);font-weight:700}'
'.wp__card{transition:transform .55s var(--ease),box-shadow .55s var(--ease)}'
'.wp__card:hover{transform:translateY(-3px);box-shadow:0 22px 50px rgba(0,0,0,.55)}'
' @media(max-width:1280px){.wp__grid--four{grid-template-columns:repeat(3,1fr)}}'
' @media(max-width:1024px){.wp__grid--four{grid-template-columns:repeat(2,1fr)}}'
' @media(max-width:640px){.wp__grid--four{grid-template-columns:1fr;gap:12px}}')

s = open(p, "r", encoding="utf-8").read()
orig = len(s)
a = s.find("function _WorksPage(){")
assert a != -1
i = s.find("{", a); depth = 0; j = i
while j < len(s):
    if s[j] == "{": depth += 1
    elif s[j] == "}":
        depth -= 1
        if depth == 0: break
    j += 1
end = j + 1
old_len = end - a

decl = "var _WIMG=" + json.dumps(imgs) + ",_WNAME=" + json.dumps(names, ensure_ascii=False) + ";"
s = s[:a] + decl + new_fn + s[end:]

assert s.count("</style>") == 1
s = s.replace("</style>", css + "</style>", 1)

open(p, "w", encoding="utf-8", newline="").write(s)
print("OLD FN LEN:", old_len)
print("NEW FN LEN:", len(new_fn))
print("CHARS DELTA:", len(s) - orig)
print("NEW BYTES:", len(s.encode("utf-8")))
import base64, os, json
base = "C:\\Users\\LOPES\\.dsh\\dsh_orb\\portfolio_site"
p = base + "\\\u4e2a\u4eba\u4f5c\u54c1\u96c6\u7f51\u7ad9.html"
def uri(k):
    return "data:image/jpeg;base64," + base64.b64encode(open(os.path.join(base,"assets_src","w_%s.jpg"%k),"rb").read()).decode("ascii")

keys = ["h0","f0","f1","f2","f3","f4","f5","f6","f7","f8"]
WIMG = [uri(k) for k in keys]
WNAME = [["\u5496\u5561\u673a \u00b7 \u4ea7\u54c1\u6e32\u67d3","COFFEE MACHINE / RENDERING"],
         ["\u5496\u5561\u673a","COFFEE MACHINE"],["\u624b\u673a\u58f3","PHONE CASE"],
         ["\u624b\u8868","WATCH"],["\u663e\u793a\u5668","MONITOR"],["\u6c99\u53d1","SOFA"],
         ["\u6e38\u620f\u624b\u67c4","GAME CONTROLLER"],["\u79fb\u52a8\u7535\u6e90","POWER BANK"],
         ["\u82b1\u5349\u8bd7","FLORAL CARE"],["\u6c99\u53d1","SOFA"]]

s = open(p,"r",encoding="utf-8").read()

# 1. rebuild _WIMG
a = s.find("var _WIMG=[")
b = s.find("],_WNAME=")
assert a != -1 and b != -1
c = s.find("];", b)
assert c != -1
s = s[:a] + "var _WIMG=" + json.dumps(WIMG) + ",_WNAME=" + json.dumps(WNAME, ensure_ascii=False) + ";" + s[c+2:]

# 2. state for lightbox
old_open = 'var open=h==="#works";'
assert s.count(old_open) == 1
s = s.replace(old_open, 'var lst=ct.useState(-1),lb=lst[0],setLb=lst[1];var open=h==="#works";', 1)

# 3. reset lightbox when closing
old_eff = 'ct.useEffect(function(){if(!open){var _vs=document.querySelectorAll(".wp video");'
assert s.count(old_eff) == 1
s = s.replace(old_eff, 'ct.useEffect(function(){if(!open){setLb(-1);var _vs=document.querySelectorAll(".wp video");', 1)

# 4. Esc key
s = s.replace('var open=h==="#works";',
  'var open=h==="#works";ct.useEffect(function(){var k=function(e){if(e.key==="Escape")setLb(-1);};window.addEventListener("keydown",k);return function(){window.removeEventListener("keydown",k);};},[]);', 1)

# 5. fragment -> masonry + lightbox
old_grid = ('p.jsx("div",{className:"wp__grid",children:[1,2,3,4,5,6,7,8,9].map(function(i,k){'
            'return p.jsx("div",{className:"wp__card wp__card--sq wp__card--img",style:{backgroundImage:\'url("\'+_WIMG[i]+\'")\'},'
            'children:p.jsx("span",{className:"wp__no",children:"0"+(k+1)})},i);})})')
assert s.count(old_grid) == 1, s.count(old_grid)

new_grid = ('p.jsx("div",{className:"wp__masonry",children:[1,2,3,4,5,6,7,8,9].map(function(i){'
 'return p.jsx("img",{className:"wp__frag",src:_WIMG[i],alt:"",onClick:function(ev){ev.stopPropagation();setLb(i);}},i);})}),'
 'lb>=0?p.jsx("div",{className:"wp__lb",onClick:function(){setLb(-1);},children:['
 'p.jsx("img",{className:"wp__lbimg",src:_WIMG[lb],alt:"",onClick:function(ev){ev.stopPropagation();}}),'
 'p.jsx("button",{className:"wp__lbbtn wp__lbbtn--prev",onClick:function(ev){ev.stopPropagation();setLb(((lb-2+9)%9)+1);},children:"\\u2039"}),'
 'p.jsx("button",{className:"wp__lbbtn wp__lbbtn--next",onClick:function(ev){ev.stopPropagation();setLb((lb%9)+1);},children:"\\u203a"}),'
 'p.jsx("button",{className:"wp__lbclose",onClick:function(ev){ev.stopPropagation();setLb(-1);},children:"\\u00d7"})]}):null')
s = s.replace(old_grid, new_grid, 1)

css = ('.wp__masonry{column-count:3;column-gap:18px}'
'.wp__frag{width:100%;display:block;border-radius:14px;margin:0 0 18px;cursor:zoom-in;break-inside:avoid;transition:transform .5s var(--ease),box-shadow .5s var(--ease),filter .5s var(--ease)}'
'.wp__frag:hover{transform:translateY(-3px);box-shadow:0 22px 50px rgba(0,0,0,.55)}'
'.wp__lb{position:fixed;inset:0;z-index:10060;background:rgba(4,4,6,.94);display:flex;align-items:center;justify-content:center;cursor:zoom-out}'
'.wp__lbimg{max-width:86vw;max-height:86vh;border-radius:10px;box-shadow:0 40px 100px rgba(0,0,0,.72);cursor:default}'
'.wp__lbbtn{position:absolute;top:50%;transform:translateY(-50%);width:48px;height:48px;border-radius:50%;border:1px solid rgba(255,255,255,.22);background:rgba(255,255,255,.06);color:#fff;font-size:22px;line-height:1;cursor:pointer;transition:background .25s,border-color .25s}'
'.wp__lbbtn:hover{background:rgba(255,45,31,.85);border-color:#ff2d1f}'
'.wp__lbbtn--prev{left:3vw}.wp__lbbtn--next{right:3vw}'
'.wp__lbclose{position:absolute;top:20px;right:24px;width:40px;height:40px;border-radius:50%;border:1px solid rgba(255,255,255,.22);background:rgba(255,255,255,.06);color:#fff;font-size:18px;line-height:1;cursor:pointer;transition:background .25s,border-color .25s}'
'.wp__lbclose:hover{background:rgba(255,45,31,.85);border-color:#ff2d1f}'
' @media(max-width:1024px){.wp__masonry{column-count:2}}'
' @media(max-width:640px){.wp__masonry{column-count:1}}')

assert s.count("</style>") == 1
s = s.replace("</style>", css + "</style>", 1)

open(p,"w",encoding="utf-8",newline="").write(s)
print("bytes:", len(s.encode("utf-8")))
print("masonry:", s.count("wp__masonry"), "lb:", s.count("wp__lb"), "frag:", s.count("wp__frag"))
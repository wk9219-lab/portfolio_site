import base64, os, json
base = "C:\\Users\\LOPES\\.dsh\\dsh_orb\\portfolio_site"
p = base + "\\\u4e2a\u4eba\u4f5c\u54c1\u96c6\u7f51\u7ad9.html"
def uri(fn):
    b = open(os.path.join(base, "assets_src", fn), "rb").read()
    return "data:image/jpeg;base64," + base64.b64encode(b).decode("ascii")

stills = [("h0","\u5496\u5561\u673a \u00b7 \u4ea7\u54c1\u6e32\u67d3","COFFEE MACHINE / RENDERING")]
for k, cn, en in [("f0","\u5496\u5561\u673a","COFFEE MACHINE"),("f1","\u624b\u673a\u58f3","PHONE CASE"),
                  ("f2","\u624b\u8868","WATCH"),("f3","\u663e\u793a\u5668","MONITOR"),
                  ("f4","\u6c99\u53d1","SOFA"),("f5","\u6e38\u620f\u624b\u67c4","GAME CONTROLLER"),
                  ("f6","\u79fb\u52a8\u7535\u6e90","POWER BANK"),("f7","\u82b1\u5349\u8bd7","FLORAL CARE"),
                  ("f8","\u6c99\u53d1","SOFA")]:
    stills.append((k, cn, en))

WIMG = ["data:image/jpeg;base64," + base64.b64encode(open(os.path.join(base,"assets_src","w_%s.jpg"%k),"rb").read()).decode("ascii") for k,_,_ in stills]
WNAME = [[cn, en] for _,cn,en in stills]

vids = []
for i, cn, en, dur in [(0,"\u663e\u793a\u5668","MONITOR","00:50"),
                       (1,"\u6e38\u620f\u624b\u67c4","GAME CONTROLLER","00:30"),
                       (2,"\u624b\u673a\u58f3","PHONE CASE","00:44"),
                       (3,"\u79fb\u52a8\u7535\u6e90","POWER BANK","00:21"),
                       (4,"\u7403\u978b","SNEAKERS","00:36")]:
    vb = open(os.path.join(base,"assets_src","v%d.mp4"%i),"rb").read()
    vids.append({"s":"data:video/mp4;base64,"+base64.b64encode(vb).decode("ascii"),
                 "p":uri("v%d_p.jpg"%i),"d":dur,"cn":cn,"en":en})

decl = ("var _WIMG=" + json.dumps(WIMG) + ",_WNAME=" + json.dumps(WNAME, ensure_ascii=False) + ";\n"
        "var _VID=" + json.dumps(vids, ensure_ascii=False, separators=(",",":")) + ";\n"
        "function _VCard(props){var r=ct.useRef(null),st=ct.useState(!1),on=st[0],setOn=st[1];"
        "function tg(){var v=r.current;if(!v)return;if(v.paused){var q=v.play();if(q&&q.catch)q.catch(function(){});setOn(!0);}else{v.pause();setOn(!1);}}"
        "var d=_VID[props.i];"
        "return p.jsxs(\"div\",{className:\"wp__item\",children:["
        "p.jsxs(\"div\",{className:\"wp__card wp__card--wide wp__card--video\",onClick:tg,children:["
        "p.jsx(\"video\",{ref:r,src:d.s,poster:d.p,preload:\"none\",muted:!0,loop:!0,playsInline:!0}),"
        "p.jsx(\"span\",{className:\"wp__play\"+(on?\" is-on\":\"\"),children:on?\"\\u2759\\u2759\":\"\\u25b6\"}),"
        "p.jsx(\"span\",{className:\"wp__dur\",children:d.d}),"
        "p.jsx(\"span\",{className:\"wp__no\",children:props.no})]}),"
        "p.jsxs(\"div\",{className:\"wp__label\",children:[p.jsx(\"b\",{children:d.cn}),p.jsx(\"em\",{children:d.en})]})]});}\n")

css = ('.wp__grid--video{grid-template-columns:repeat(3,1fr);gap:22px}'
'.wp__card--video{overflow:hidden;cursor:pointer}'
'.wp__card--video video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block;z-index:1}'
'.wp__play{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:56px;height:56px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:rgba(8,8,10,.5);border:1px solid rgba(255,255,255,.55);color:#fff;font-size:14px;line-height:1;z-index:3;backdrop-filter:blur(6px);transition:opacity .3s,background .3s,border-color .3s,transform .3s}'
'.wp__card--video:hover .wp__play{background:rgba(255,45,31,.92);border-color:#ff2d1f;transform:translate(-50%,-50%) scale(1.06)}'
'.wp__play.is-on{opacity:0}'
'.wp__card--video:hover .wp__play.is-on{opacity:.8}'
'.wp__dur{position:absolute;right:11px;top:10px;z-index:3;font-size:10px;letter-spacing:.06em;color:rgba(255,255,255,.88);background:rgba(8,8,10,.55);border-radius:4px;padding:2px 6px}'
' @media(max-width:1024px){.wp__grid--video{grid-template-columns:repeat(2,1fr)}}'
' @media(max-width:640px){.wp__grid--video{grid-template-columns:1fr;gap:14px}}')

s = open(p,"r",encoding="utf-8").read()
before = len(s)

a = s.find("var _WIMG=[")
b = s.find("function _WorksPage(){")
assert a != -1 and b != -1 and a < b
s = s[:a] + decl + s[b:]

s, n1 = s.replace("_WIMG[8]", "_WIMG[0]"), s.count("_WIMG[8]")
s = s.replace("_WNAME[8]", "_WNAME[0]")
s = s.replace("[9,10,11,12,13,14,15,16,17]", "[1,2,3,4,5,6,7,8,9]", 1)
s = s.replace('{className:"wp__grid wp__grid--four",children:dyn.map(function(i,k){return pl(i,"0"+(k+1));})}',
              '{className:"wp__grid wp__grid--video",children:[0,1,2,3,4].map(function(k){return p.jsx(_VCard,{no:"0"+(k+1),i:k},k);})}', 1)
s = s.replace("var dyn=[0,1,2,3,4,5,6,7];", "", 1)
s = s.replace('var open=h==="#works";',
              'var open=h==="#works";ct.useEffect(function(){if(!open){var _vs=document.querySelectorAll(".wp video");for(var _i=0;_i<_vs.length;_i++)_vs[_i].pause();}},[open]);', 1)

assert s.count("</style>") == 1
s = s.replace("</style>", css + "</style>", 1)

open(p,"w",encoding="utf-8",newline="").write(s)
print("bytes:", len(s.encode("utf-8")), "| videos:", len(vids), "| stills:", len(WIMG))
print("dyn grid video:", "wp__grid--video" in s, "| VCard:", "_VCard" in s)
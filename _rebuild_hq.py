import base64, json, os, re, subprocess, sys
sys.stdout.reconfigure(encoding="utf-8", errors="replace")
FF = r"C:\ffmpeg7.1.1\bin\ffmpeg.exe"
ROOT = "D:\\" + "\u8d44\u6599" + "\\" + "\u4f5c\u54c1\u96c6" + "\\" + "\u6750\u6599"
OUT = r"C:\Users\LOPES\.dsh\dsh_orb\portfolio_site\assets_src\hq"
HTML = "C:\\Users\\LOPES\\.dsh\\dsh_orb\\portfolio_site\\" + "\u4e2a\u4eba\u4f5c\u54c1\u96c6\u7f51\u7ad9.html"
os.makedirs(OUT, exist_ok=True)
SC = "scale='if(gt(iw,ih),min(1600,iw),-2)':'if(gt(iw,ih),-2,min(1600,ih))'"

def export(src, dst):
    if os.path.exists(dst) and os.path.getsize(dst) > 0: return dst
    r = subprocess.run([FF,"-y","-loglevel","error","-i",src,"-vf",SC,"-q:v","2",dst], capture_output=True)
    if r.returncode != 0 or not os.path.exists(dst):
        print("FAIL", src, r.stderr.decode("utf-8","replace")[:160]); return None
    return dst

def frame(vid, t, dst):
    if os.path.exists(dst) and os.path.getsize(dst) > 0: return dst
    r = subprocess.run([FF,"-y","-loglevel","error","-ss",str(t),"-i",vid,"-frames:v","1","-vf",SC,"-q:v","2",dst], capture_output=True)
    if r.returncode != 0 or not os.path.exists(dst): return None
    return dst

def durl(p):
    return "data:image/jpeg;base64," + base64.b64encode(open(p,"rb").read()).decode()

def natural(n):
    return [int(t) if t.isdigit() else t for t in re.split(r"(\d+)", n)]

F = lambda name: os.path.join(ROOT, name)
CN = {"display":"\u663e\u793a\u5668","pad":"\u6e38\u620f\u624b\u67c4","case":"\u624b\u673a\u58f3","power":"\u79fb\u52a8\u7535\u6e90","shoe":"\u7403\u978b",
      "floral":"\u82b1\u5349\u8bd7","coffee":"\u5496\u5561\u673a","sofa":"\u6c99\u53d1","watch":"\u624b\u8868"}

# ---------- SB ----------
sb_src = [
 ["huashuo (0-00-02-05).jpg","huashuo (0-00-04-20).jpg","huashuo (0-00-05-24).jpg","huashuo (0-00-22-12).jpg","huashuo (0-00-36-12).jpg","huashuo (0-00-46-04).jpg"],
 ["WC A (0-00-04-10).jpg","WC A (0-00-14-18).jpg","WC A (0-00-18-20).jpg","WC A (0-00-21-06).jpg","WC A (0-00-23-02).jpg","WC A (0-00-29-16).jpg"],
 ["01 (0-00-00-00).jpg","01 (0-00-08-02).jpg","01 (0-00-11-07).jpg","01 (0-00-29-03).jpg","01 (0-00-33-20).jpg","01 (0-00-43-16).jpg"],
 ["Image 49.png","Image 52.png","Image 54.png","Image 61.png","Image 68.png","Image 74.png"],
 None]
sb_folders = [CN["display"], CN["pad"], CN["case"], CN["power"], CN["shoe"]]
SB = []
for g, files in enumerate(sb_src):
    urls = []
    if files:
        for i, f in enumerate(files):
            p = export(F(sb_folders[g]) + "\\" + f, os.path.join(OUT, "sb%d_%d.jpg" % (g,i)))
            if p: urls.append(p)
    else:
        vid = F(CN["shoe"]) + "\\02.mp4"
        for i, t in enumerate([3,9,15,21,27,33]):
            p = frame(vid, t, os.path.join(OUT, "sb%d_%d.jpg" % (g,i)))
            if p: urls.append(p)
    print("SB", g, len(urls))
    SB.append(urls)

# ---------- PG ----------
pg_meta = [(CN["floral"],"FLORAL CARE"), (CN["coffee"],"COFFEE MACHINE"), (CN["sofa"],"SOFA"), (CN["watch"],"WATCH")]
PG = []
for g,(name,en) in enumerate(pg_meta):
    folder = F(name)
    files = sorted([f for f in os.listdir(folder) if f.lower().endswith((".jpg",".jpeg",".png",".webp"))], key=natural)
    urls = []
    for i,f in enumerate(files):
        p = export(os.path.join(folder,f), os.path.join(OUT, "pj%d_%d.jpg" % (g,i)))
        if p: urls.append(p)
    print("PG", name, len(urls))
    PG.append({"cn":name,"en":en,"imgs":urls})

# ---------- WIMG ----------
frag = [ (CN["coffee"],"02_01.png"), (CN["case"],"01 (0-00-08-02).jpg"), (CN["watch"],"\u7ec6\u8282.png"),
         (CN["display"],"huashuo (0-00-46-04).jpg"), (CN["sofa"],"02.png"), (CN["pad"],"WC A (0-00-14-18).jpg"),
         (CN["power"],"Image 54.png"), (CN["floral"],"05_1.png"), (CN["sofa"],"\u56fe\u7247 30.png") ]
w_src = [ (CN["coffee"], "01.jpg") ] + frag
root_files = sorted([f for f in os.listdir(ROOT) if f.lower().endswith((".jpg",".jpeg",".png",".webp"))], key=natural)
print("root imgs", len(root_files))
for f in root_files:
    w_src.append((None, f))
WIMG = []
for i,(folder, fn) in enumerate(w_src):
    src = (F(folder) + "\\" + fn) if folder else os.path.join(ROOT, fn)
    p = export(src, os.path.join(OUT, "w%d.jpg" % i))
    if not p:
        print("missing", src); continue
    WIMG.append(p)
print("WIMG", len(WIMG))

raw = sum(os.path.getsize(p) for p in WIMG) + sum(os.path.getsize(u) for d in PG for u in d["imgs"]) + sum(os.path.getsize(u) for g in SB for u in g)
print("raw bytes total", raw, "=", round(raw/1024/1024,2), "MB")

WJ = "[" + ",".join('"' + durl(p) + '"' for p in WIMG) + "]"
SJ = json.dumps([[durl(u) for u in g] for g in SB], ensure_ascii=True, separators=(",",":"))
PJ = json.dumps([{"cn":d["cn"],"en":d["en"],"imgs":[durl(u) for u in d["imgs"]]} for d in PG], ensure_ascii=True, separators=(",",":"))
json.dump({"W":len(WIMG)}, open(os.path.join(OUT,"_meta.json"),"w"))

s = open(HTML, encoding="utf-8").read()
# replace from last to first
a = s.find("var _PG="); b = s.find(";var _SB=", a)
assert a>0 and b>a
s = s[:a] + "var _PG=" + PJ + s[b:]
a = s.find("var _SB="); b = s.find(";function _WorksPage(){", a)
assert a>0 and b>a
s = s[:a] + "var _SB=" + SJ + s[b:]
a = s.find("var _WIMG="); b = s.find("],_WNAME=", a)
assert a>0 and b>a
s = s[:a] + "var _WIMG=" + WJ + s[b:]
a = s.find("var _FR=["); b = s.find("]", a)
assert a>0 and b>a
s = s[:a] + "var _FR=[" + ",".join(str(i) for i in range(1,len(WIMG))) + s[b:]

# CSS: no crop
reps = [
 (".wp__frame{width:100%;aspect-ratio:16/9;object-fit:cover;", ".wp__frame{width:100%;aspect-ratio:16/9;object-fit:contain;"),
 (".wp__pvimg{flex:0 0 720px;width:720px;max-width:72vw;height:62vh;object-fit:cover;", ".wp__pvimg{flex:0 0 720px;width:720px;max-width:72vw;height:62vh;object-fit:contain;"),
 (".wp__pgcover{position:relative;aspect-ratio:4/3;border-radius:12px;background-size:cover;", ".wp__pgcover{position:relative;aspect-ratio:4/3;border-radius:12px;background-size:contain;background-repeat:no-repeat;"),
]
for o,n in reps:
    print("css", s.count(o), o[:40])
    s = s.replace(o,n,1)

open(HTML,"w",encoding="utf-8",newline="").write(s)
print("written", os.path.getsize(HTML))
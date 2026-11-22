import base64, json, os, subprocess, sys
sys.stdout.reconfigure(encoding="utf-8", errors="replace")
FF = r"C:\ffmpeg7.1.1\bin\ffmpeg.exe"
SRC = "D:\\" + "\u8d44\u6599" + "\\" + "\u4f5c\u54c1\u96c6" + "\\" + "\u6750\u6599"
OUT = r"C:\Users\LOPES\.dsh\dsh_orb\portfolio_site\assets_src"
os.makedirs(OUT, exist_ok=True)

folders = [
 ("\u82b1\u5349\u8bd7", "FLORAL CARE"),
 ("\u5496\u5561\u673a", "COFFEE MACHINE"),
 ("\u6c99\u53d1", "SOFA"),
 ("\u624b\u8868", "WATCH"),
]

def natural(name):
    import re
    return [int(t) if t.isdigit() else t for t in re.split(r"(\d+)", name)]

pg = []
for g,(name,en) in enumerate(folders):
    folder = os.path.join(SRC, name)
    files = [f for f in os.listdir(folder) if f.lower().endswith((".jpg",".jpeg",".png",".webp"))]
    files.sort(key=natural)
    urls = []
    for i,f in enumerate(files):
        dst = os.path.join(OUT, "pj%d_%d.jpg" % (g,i))
        cmd = [FF,"-y","-loglevel","error","-i",os.path.join(folder,f),
               "-vf","scale=760:760:force_original_aspect_ratio=decrease","-q:v","6",dst]
        r = subprocess.run(cmd, capture_output=True)
        if r.returncode!=0 or not os.path.exists(dst):
            print("FAIL", name, f, r.stderr.decode("utf-8","replace")[:160]); continue
        urls.append(dst)
    print(g, name, len(urls), "/", len(files), "first:", files[0] if files else "")
    pg.append({"cn":name,"en":en,"imgs":urls})

total = sum(os.path.getsize(u) for d in pg for u in d["imgs"])
print("files", sum(len(d["imgs"]) for d in pg), "raw", total)

def durl(p):
    return "data:image/jpeg;base64," + base64.b64encode(open(p,"rb").read()).decode()

out = [{"cn":d["cn"],"en":d["en"],"imgs":[durl(u) for u in d["imgs"]]} for d in pg]
json.dump(out, open(os.path.join(OUT,"_pg.json"),"w",encoding="utf-8"))
print("chars", sum(len(u) for d in out for u in d["imgs"]))
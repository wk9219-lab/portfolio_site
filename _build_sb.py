import base64, json, os, subprocess, sys
sys.stdout.reconfigure(encoding="utf-8", errors="replace")
FF = r"C:\ffmpeg7.1.1\bin\ffmpeg.exe"
FBP = r"C:\ffmpeg7.1.1\bin\ffprobe.exe"
SRC = "D:\\" + "\u8d44\u6599" + "\\" + "\u4f5c\u54c1\u96c6" + "\\" + "\u6750\u6599"
OUT = r"C:\Users\LOPES\.dsh\dsh_orb\portfolio_site\assets_src"
HTML = "C:\\Users\\LOPES\\.dsh\\dsh_orb\\portfolio_site\\" + "\u4e2a\u4eba\u4f5c\u54c1\u96c6\u7f51\u7ad9.html"

groups = [
 ("\u663e\u793a\u5668", ["huashuo (0-00-02-05).jpg","huashuo (0-00-04-20).jpg","huashuo (0-00-05-24).jpg","huashuo (0-00-22-12).jpg","huashuo (0-00-36-12).jpg","huashuo (0-00-46-04).jpg"], None),
 ("\u6e38\u620f\u624b\u67c4", ["WC A (0-00-04-10).jpg","WC A (0-00-14-18).jpg","WC A (0-00-18-20).jpg","WC A (0-00-21-06).jpg","WC A (0-00-23-02).jpg","WC A (0-00-29-16).jpg"], None),
 ("\u624b\u673a\u58f3", ["01 (0-00-00-00).jpg","01 (0-00-08-02).jpg","01 (0-00-11-07).jpg","01 (0-00-29-03).jpg","01 (0-00-33-20).jpg","01 (0-00-43-16).jpg"], None),
 ("\u79fb\u52a8\u7535\u6e90", ["Image 49.png","Image 52.png","Image 54.png","Image 61.png","Image 68.png","Image 74.png"], None),
 ("\u7403\u978b", [], "02.mp4"),
]

os.makedirs(OUT, exist_ok=True)
sb = []
for g,(name, files, mp4) in enumerate(groups):
    folder = os.path.join(SRC, name)
    urls = []
    if files:
        for i,f in enumerate(files):
            dst = os.path.join(OUT, "sb%d_%d.jpg" % (g,i))
            cmd = [FF,"-y","-loglevel","error","-i",os.path.join(folder,f),
                   "-vf","scale=760:428:force_original_aspect_ratio=increase,crop=760:428","-q:v","5",dst]
            r = subprocess.run(cmd, capture_output=True)
            if r.returncode!=0 or not os.path.exists(dst):
                print("FAIL", name, f, r.stderr.decode("utf-8","replace")[:200]); continue
            urls.append(dst)
    else:
        vid = os.path.join(folder, mp4)
        for i,t in enumerate([3,9,15,21,27,33]):
            dst = os.path.join(OUT, "sb%d_%d.jpg" % (g,i))
            cmd = [FF,"-y","-loglevel","error","-ss",str(t),"-i",vid,"-frames:v","1",
                   "-vf","scale=760:428:force_original_aspect_ratio=increase,crop=760:428","-q:v","5",dst]
            r = subprocess.run(cmd, capture_output=True)
            if r.returncode!=0 or not os.path.exists(dst):
                print("FAIL", name, t, r.stderr.decode("utf-8","replace")[:200]); continue
            urls.append(dst)
    print(g, name, len(urls), [os.path.basename(u) for u in urls])
    sb.append(urls)

total = sum(os.path.getsize(u) for grp in sb for u in grp)
print("raw bytes", total, "groups", [len(x) for x in sb])

def durl(p):
    b = open(p,"rb").read()
    return "data:image/jpeg;base64," + base64.b64encode(b).decode()

arr = [[durl(u) for u in grp] for grp in sb]
json.dump(arr, open(os.path.join(OUT,"_sb.json"),"w",encoding="utf-8"))
print("chars", sum(len(u) for grp in arr for u in grp))
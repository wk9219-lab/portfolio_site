import cv2, os, json, sys
p = r"C:\Users\LOPES\.dsh\dsh_orb\portfolio_site\assets_src\avatar_src.jpg"
img = cv2.imread(p)
h, w = img.shape[:2]
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
cas = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_frontalface_default.xml")
faces = cas.detectMultiScale(gray, 1.08, 5, minSize=(80,80))
print("image", w, h, "faces", len(faces))
if len(faces):
    f = max(faces, key=lambda a: a[2]*a[3])
    x,y,fw,fh = [int(v) for v in f]
    print("face", x,y,fw,fh)
    cx = x + fw//2
    cy = y + fh//2
    side = int(fh * 2.35)
    side = min(side, w, h)
    left = cx - side//2
    top  = cy - int(side*0.46)
    left = max(0, min(left, w-side))
    top  = max(0, min(top, h-side))
    print("crop", side, left, top)
    crop = img[top:top+side, left:left+side]
    out = cv2.resize(crop, (512,512), interpolation=cv2.INTER_LANCZOS4)
    dst = r"C:\Users\LOPES\.dsh\dsh_orb\portfolio_site\assets_src\avatar_512.jpg"
    cv2.imwrite(dst, out, [int(cv2.IMWRITE_JPEG_QUALITY), 86])
    print("saved", os.path.getsize(dst), "bytes")
else:
    print("NO FACE")

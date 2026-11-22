import sys
sys.stdout.reconfigure(encoding="utf-8", errors="replace")
from rapidocr_onnxruntime import RapidOCR
ocr = RapidOCR()
for n in ["single_hero"]:
    res,_ = ocr(rf"C:\Users\LOPES\.dsh\dsh_orb\portfolio_site\shots\{n}.png")
    print(f"=== {n} ===")
    if res:
        for box,txt,score in res:
            t=txt.strip()
            if score>0.5 and len(t)>=2: print("  "+t)
    else: print("  NO TEXT")

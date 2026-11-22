import sys, os
sys.stdout.reconfigure(encoding="utf-8", errors="replace")
from rapidocr_onnxruntime import RapidOCR
ocr = RapidOCR()
base = r"C:\Users\LOPES\.dsh\dsh_orb\portfolio_site\shots"
for n in ["v2_hero","v2_profile","v2_contact"]:
    f=os.path.join(base,n+".png")
    if not os.path.exists(f): continue
    res,_ = ocr(f)
    print(f"\n===== {n} =====")
    if res:
        for box,txt,score in res:
            t=txt.strip()
            if score>0.5 and len(t)>=2: print("  "+t)
    else: print("  NO TEXT")

import sys, glob, os
sys.stdout.reconfigure(encoding="utf-8", errors="replace")
from rapidocr_onnxruntime import RapidOCR
ocr = RapidOCR()
base = r"C:\Users\LOPES\.dsh\dsh_orb\portfolio_site\shots"
for n in ["p1_hero","p2_profile","p3_projects","p4_caps","p5_contact"]:
    f = os.path.join(base, n+".png")
    if not os.path.exists(f): continue
    res,_ = ocr(f)
    print(f"\n===== {n} =====")
    if res:
        for box,txt,score in res:
            t=txt.strip()
            if score>0.55 and len(t)>=2:
                print(f"  {t}")
    else:
        print("  NO TEXT")

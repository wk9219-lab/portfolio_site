import sys
sys.stdout.reconfigure(encoding="utf-8", errors="replace")
from rapidocr_onnxruntime import RapidOCR
ocr = RapidOCR()
res,_ = ocr(r"C:\Users\LOPES\.dsh\dsh_orb\portfolio_site\shots\hero2.png")
print("=== hero2 OCR ===")
if res:
    for box,txt,score in res:
        if score>0.5 and len(txt.strip())>=2:
            print(f"  [{score:.2f}] {txt.strip()}")
else: print("NO TEXT")

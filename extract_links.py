import fitz # PyMuPDF
import re

pdf_path = r"C:\Users\kdnelson\.gemini\antigravity\brain\58079af7-1a4b-4ae3-8f7f-976dc59ae725\.user_uploaded\media_1789818518259.pdf"

try:
    doc = fitz.open(pdf_path)
    links = []
    for page in doc:
        for link in page.get_links():
            if "uri" in link:
                links.append(link["uri"])
                
    # Remove duplicates but preserve order
    seen = set()
    unique_links = [x for x in links if not (x in seen or seen.add(x))]
    
    for l in unique_links:
        print(l)
except Exception as e:
    print("Error:", e)

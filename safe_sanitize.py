import sys

# 1. Update App.tsx
try:
    with open('src/App.tsx', 'r', encoding='utf-8') as f:
        app_code = f.read()

    app_replacements = [
        ('v2026.2 Live', 'אב-טיפוס מבוסס AI - לא עבר אימות משפטי'),
        ('גרסת מחקר: 2026.2 - Red Team Validated (מעודכן)', 'גרסת מחקר: 2026.2 (אב-טיפוס רעיוני לדיון)'),
        ('גרסת מחקר: 2026.2 - Red Team Validated', 'גרסת מחקר: 2026.2 (אב-טיפוס רעיוני לדיון)'),
        ('מותאם למחלקת המחקר והמדיניות של תנועת רגבים', 'יוזמה אזרחית עצמאית | מודל חשיבה קונספטואלי לדיון'),
        ('ניתוח סיכונים ובג״ץ (Red Team Assessment):', 'ניתוח סיכונים והערכה משפטית ראשונית:'),
        ('בשיעור של 1.5%', 'בדמי ניהול יחסיים'),
        ('של 1.5%', 'בדמי ניהול יחסיים')
    ]

    for old, new in app_replacements:
        app_code = app_code.replace(old, new)

    disclaimer = """
            {/* Disclaimer */}
הערת שקיפות (Disclaimer)
מערכת זו הינה מודל רעיוני (Conceptual Framework) שנוצר כיוזמה אזרחית בעזרת כלי בינה מלאכותית (AI) לשם סיעור מוחות. המנופים המוצגים אינם מהווים חוות דעת משפטית. חלקם מתארים פערים יישומיים קיימים, בעוד אחרים הם בגדר הצעות מדיניות חדשות הדורשות הוכחת סמכות, חקיקה, או התאמה להסכמי הסחר ופרוטוקול פריז.

"""

if "הערת שקיפות" not in app_code:
app_code = app_code.replace("

\n

\n

", "

\n

\n

\n" + disclaimer)

with open('src/App.tsx', 'w', encoding='utf-8') as f:
    f.write(app_code)
except Exception as e:
print(f"Error processing App.tsx: {e}")

2. Update leversData.ts
try:
with open('src/data/leversData.ts', 'r', encoding='utf-8') as f:
data_code = f.read()

data_replacements = [
    ('Standards Institution Chokehold', 'Standards Compliance Review'),
    ('Strict Phytosanitary Agricultural Blockade', 'Phytosanitary Regulatory Alignment'),
    ('Electronic Advance Data Blockade', 'EAD Postal Compliance'),
    ('RTGS High-Risk Clearing Tariffs', 'Risk-Based Payment Compliance (RTGS)'),
    ('Confiscation of Dormant Financial Assets', 'Dormant Accounts Regulatory Review'),
    ('Foreign Portfolio Investment Blockade', 'PEX Portfolio Regulatory Oversight'),
    ('The E-Waste & Scrap Metal Blockade', 'Basel Convention E-Waste Enforcement'),
    ('Carbon Border Adjustment Tax - CBAM', 'Regional Carbon Levy'),
    ('מיסוי פחמן (CBAM) על תוצרת תעשייתית מזהמת', 'היטל פחמן סביבתי אזורי'),
    ('אימוץ מנגנון ה-CBAM האירופי על ידי ישראל מאפשר למסות', 'בחינת מנגנון היטל פחמן אזורי מאפשרת למסות'),
    ('בשיעור 1%-2%', 'בדמי ניהול יחסיים'),
    ('של 1%-2%', 'בתעריף מבוסס סיכון'),
    ('בשיעור 2%-5%', 'בתעריף מבוסס סיכון'),
    ('של 25%', 'בשיעור מס סטנדרטי'),
    ('(0.5%-1.5%)', '(בדמי ניהול יחסיים)'),
    ('של 0.5%', 'תפעולית'),
    ('של 50 ש"ח', 'תפעולית'),
    ('הקיזוז החד-צדדי עלול להוות הפרה של הסכם פריז ולהיפסל בבג"ץ.', 'הקיזוז החד-צדדי דורש בחינה מול פרוטוקול פריז הכלכלי, שכן הנספח הנוכחי אינו כולל מנגנון אגרה מסוג זה, ועלול להיפסל בבג"ץ.'),
    ("researchStatus: 'פער יישומי מתועד - ישימות גבוהה'", "researchStatus: 'הצעת מדיניות - טעון בירור משפטי/עובדתי'"),
    ("researchStatus: 'פער יישומי מתועד - ישימות בינונית'", "researchStatus: 'הצעת מדיניות - טעון בירור משפטי/עובדתי'"),
    ("researchStatus: 'פער יישומי מתועד'", "researchStatus: 'דורש אימות מול נתוני רשויות'")
]

for old, new in data_replacements:
    data_code = data_code.replace(old, new)

with open('src/data/leversData.ts', 'w', encoding='utf-8') as f:
    f.write(data_code)
except Exception as e:
print(f"Error processing leversData.ts: {e}")

print('✅ Sanitization completed successfully!')

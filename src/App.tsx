import React, { useState, useMemo } from 'react';
import { 
  Building2, 
  Coins, 
  FileText, 
  Layers, 
  ShieldAlert, 
  CheckCircle2, 
  Search, 
  Filter, 
  ArrowRight, 
  ArrowLeft, 
  Share2, 
  Download, 
  ChevronRight, 
  Gavel, 
  TrendingDown, 
  AlertTriangle, 
  Scale, 
  Cpu, 
  Compass, 
  Copy, 
  ExternalLink,
  Presentation,
  ListFilter,
  Flame,
  Award,
  BookOpen
} from 'lucide-react';
import { LEVERS_DATA, Lever } from './data/leversData';

type Tab = 'executive' | 'categories' | 'flagship' | 'roadmap' | 'presentation' | 'all-levers';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('executive');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLever, setSelectedLever] = useState<Lever | null>(null);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const categories = [
    { 
      id: 'finance', 
      label: 'פיננסים ובנקאות', 
      icon: Coins, 
      color: 'from-amber-500/20 to-yellow-600/10 border-amber-500/40 text-amber-400',
      badgeBg: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
      desc: 'שימוש בדיני הבנקאות, מערכות הסליקה (זה"ב), מדיניות מוניטרית ותקני הלבנת הון (FATF) כדי לייקר את עלות הכסף של הרשות, לחייב דמי שימוש בשקל ולחסום ערוצי הון זרים.'
    },
    { 
      id: 'infrastructure', 
      label: 'תשתיות ואיכות סביבה', 
      icon: Cpu, 
      color: 'from-emerald-500/20 to-teal-600/10 border-emerald-500/40 text-emerald-400',
      badgeBg: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
      desc: 'החלת תעריפים ריאליים וקנסות הנדסיים מודרניים על מים (עלות שולית), חשמל (עיוות הרמוני ודמי הולכה), טיפול בשפכים (פחת הוני) ואמנות סביבה בינלאומיות (באזל, CBAM).'
    },
    { 
      id: 'trade', 
      label: 'סחר ומכס', 
      icon: Layers, 
      color: 'from-blue-500/20 to-indigo-600/10 border-blue-500/40 text-blue-400',
      badgeBg: 'bg-blue-500/10 text-blue-300 border-blue-500/30',
      desc: 'סגירת מעטפת המכס הישראלית על ידי ביטול פטורי תקינה במכון התקנים, בדיקות מעבדה פיטוסניטריות מחמירות, ביטול מחסני ערובה והטלת מכסי היצף ועמילות סחר מקוון.'
    },
    { 
      id: 'civil', 
      label: 'מנהל אזרחי ורישוי', 
      icon: Building2, 
      color: 'from-purple-500/20 to-violet-600/10 border-purple-500/40 text-purple-400',
      badgeBg: 'bg-purple-500/10 text-purple-300 border-purple-500/30',
      desc: 'החלת משטר רגולציה אזרחי דווקני בשטחי C הכולל חשיפת נהנים סופיים (UBO), חובת רישוי מקצועי ישראלי, סיווג צמ"ה כדו-שימושי ואכיפת חוק צמצום המזומן ותקני בטיחות עבודה.'
    }
  ];

  const flagshipLevers = useMemo(() => {
    return LEVERS_DATA.filter(l => l.isFlagship);
  }, []);

  const filteredLevers = useMemo(() => {
    return LEVERS_DATA.filter(lever => {
      const matchesCat = selectedCategory === 'all' || lever.category === selectedCategory;
      const matchesSearch = 
        lever.titleHe.includes(searchQuery) ||
        lever.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lever.summary.includes(searchQuery) ||
        lever.governingAuthority.includes(searchQuery) ||
        lever.legalShield.includes(searchQuery) ||
        (lever.legalAuthority && lever.legalAuthority.includes(searchQuery));
      return matchesCat && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2500);
  };

  const slides = [
    {
      title: 'המעבר ללוחמה בירוקרטית (Bureaucratic Warfare)',
      subtitle: 'שינוי פרדיגמה אסטרטגי עבור תנועת רגבים',
      tag: 'מבוא אסטרטגי',
      content: (
        <div className="space-y-6 text-slate-200">
          <p className="text-lg leading-relaxed">
            המאבק הלאומי המסורתי התמקד במשך שנים ב"נשק כבד" ורועש: הריסות מבנים, סיפוח שטחים, מבצעים צבאיים או קיצוץ פוליטי גלוי של כספי הסליקה. פעולות אלו מייצרות באופן קבוע התנגדות בינלאומית, עיכובים משפטיים בבג"ץ וחיכוך דיפלומטי חריף.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
            <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-500/30">
              <h4 className="font-bold text-rose-400 mb-2 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" /> הפרדיגמה הישנה: פטיש פוליטי
              </h4>
              <ul className="text-sm space-y-1 text-slate-300 list-disc list-inside">
                <li>הריסת מבנים נקודתית מול מצלמות</li>
                <li>הצהרות פוליטיות המזמינות גינויים בינלאומיים</li>
                <li>צווארי בקבוק תפעוליים שסותמים את ועדות המנהל האזרחי</li>
                <li>העלמת עין מנהלית רבת-שנים מאז הסכמי אוסלו</li>
              </ul>
            </div>
            <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-500/30">
              <h4 className="font-bold text-cyan-400 mb-2 flex items-center gap-2">
                <ShieldAlert className="w-5 h-5" /> הפרדיגמה החדשה: לוחמה בירוקרטית
              </h4>
              <ul className="text-sm space-y-1 text-slate-300 list-disc list-inside">
                <li>החלת כללי עולם ראשון (OECD, WTO, FATF) על ישות עוינת</li>
                <li>חסינות מוחלטת מביקורת בינלאומית תחת כסות הגנה על הציבור</li>
                <li>שאיבת הון חוקית וקיזוז חשבונאי ישיר מכספי סליקה</li>
                <li>שיתוק תפוקתי (Throughput) של מנגנוני הרשות מבפנים</li>
              </ul>
            </div>
          </div>
          <p className="text-slate-300 leading-relaxed">
            כלכלת הרשות הפלסטינית היא סירת גומי ששטה בתוך אוקיינוס של רגולציה ותשתיות ישראליות. הפעלת הפינצטה הרגולטורית מאפשרת לממשל הישראלי לפרק את מוקדי הכוח שלה בצורה קרה, חוקית ומדויקת.
          </p>
        </div>
      )
    },
    {
      title: 'ארבעת מרחבי הפעולה המאקרו-רגולטוריים',
      subtitle: 'חלוקה אסטרטגית של 52 המנופים המנהליים',
      tag: 'ארכיטקטורה רגולטורית',
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categories.map((c) => {
            const Icon = c.icon;
            const count = LEVERS_DATA.filter(l => l.category === c.id).length;
            return (
              <div key={c.id} className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-slate-800 text-cyan-400">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-slate-100 text-lg">{c.label}</h4>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    {count} מנופים
                  </span>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed pt-2">{c.desc}</p>
              </div>
            );
          })}
        </div>
      )
    },
    {
      title: 'מנוף דגל 1: ביטול פטור מכון התקנים ליבוא פלסטיני',
      subtitle: 'Standards Compliance Review',
      tag: 'מנוף דגל סחר ומכס',
      content: (
        <div className="space-y-4 text-slate-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800">
              <span className="text-xs text-amber-400 font-bold uppercase tracking-wider block mb-1">המצב כיום</span>
              <p className="text-sm text-slate-300">
                סחורות יבוא מכל העולם המיועדות לרש"פ עוברות בנמלי חיפה ואשדוד. המכס מעניק להן פטור גורף מבדיקות מכון התקנים הישראלי, בהנחה שהרשות בודקת אותן בעצמה.
              </p>
            </div>
            <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800">
              <span className="text-xs text-cyan-400 font-bold uppercase tracking-wider block mb-1">הפרצה הרגולטורית</span>
              <p className="text-sm text-slate-300">
                הפטור הוא הנחיה מנהלית פנימית בלבד. שר האוצר יכול לבטלו מחר בבוקר בנימוק של הגנה על בריאות הציבור ומניעת הברחת מוצרים מסוכנים מהרשות לתוך תחומי הקו הירוק.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800">
              <span className="text-xs text-rose-400 font-bold uppercase tracking-wider block mb-1">משמעות כלכלית</span>
              <p className="text-sm text-slate-300">
                חובת בדיקת מעבדה לכל מכולה תייצר צוואר בקבוק עצום. דמי השהיה בנמלים ירקיעו שחקים, היבוא ייעצר, יבואנים יפשטו רגל, והכנסות הרשות ממסי יבוא יתרסקו.
              </p>
            </div>
            <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800">
              <span className="text-xs text-emerald-400 font-bold uppercase tracking-wider block mb-1">צעד ביצועי נדרש</span>
              <p className="text-sm text-slate-300">
                הנחיה מנהלית חתומה של מנהל רשות המסים ושר האוצר המבטלת את נוהל "פטור תקינה לסחורות איו\"ש" – ללא צורך בחקיקה ראשית.
              </p>
            </div>
          </div>
          <div className="p-3 bg-slate-900 border border-cyan-500/30 rounded-lg text-xs text-cyan-300">
            <strong>מגן משפטי בינלאומי:</strong> הסכם הסחר של ה-WTO לעניין חסמי תקינה (TBT Agreement) המתיר מפורשות הגנה על שלום ובריאות הציבור.
          </div>
        </div>
      )
    },
    {
      title: 'מנוף דגל 2: דמי שימוש והנפקה על המטבע (Currency Seigniorage Fees)',
      subtitle: 'מנוף מאקרו-מוניטרי תקדימי',
      tag: 'מנוף דגל פיננסי',
      content: (
        <div className="space-y-4 text-slate-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800">
              <span className="text-xs text-amber-400 font-bold uppercase tracking-wider block mb-1">המצב כיום</span>
              <p className="text-sm text-slate-300">
                הכלכלה הפלסטינית משתמשת בשקל הישראלי כהילך חוקי בלעדי. בנק ישראל ומשרד האוצר מדפיסים, מנהלים, מגבים ומשנעים שטרות עבור 3 מיליון איש בחינם.
              </p>
            </div>
            <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800">
              <span className="text-xs text-cyan-400 font-bold uppercase tracking-wider block mb-1">הפרצה הרגולטורית</span>
              <p className="text-sm text-slate-300">
                אין שום חוק בינלאומי המחייב מדינה לספק מטבע יציב בחינם לישות עוינת. ישראל רשאית לדרוש דמי סניוראז׳ (Seigniorage) ואחזקת מטבע על פי עלות תפעולית.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800">
              <span className="text-xs text-rose-400 font-bold uppercase tracking-wider block mb-1">משמעות כלכלית</span>
              <p className="text-sm text-slate-300">
                השתת עמלת ניהול מטבע בדמי ניהול יחסיים ממחזור המזומנים הפלסטיני משמעה קיזוז מיידי של מאות מיליוני ש"ח בשנה ישירות מכספי הסליקה כהחזר הוצאות לגיטימי לבנק ישראל.
              </p>
            </div>
            <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800">
              <span className="text-xs text-emerald-400 font-bold uppercase tracking-wider block mb-1">צעד ביצועי נדרש</span>
              <p className="text-sm text-slate-300">
                החלטת ממשלה / הוראת שעה של שר האוצר בשיתוף נגיד בנק ישראל לקביעת תעריף שירותי ניהול מטבע וקיזוזו החודשי.
              </p>
            </div>
          </div>
          <div className="p-3 bg-slate-900 border border-amber-500/30 rounded-lg text-xs text-amber-300">
            <strong>מגן משפטי בינלאומי:</strong> סמכויות בנק מרכזי ריבוני בדיני המטבע ומניעת עשיית עושר ולא במשפט.
          </div>
        </div>
      )
    },
    {
      title: 'מנוף דגל 3: חשיפת בעלי שליטה (UBO) בחברות זרות בשטחי C',
      subtitle: 'חוקי הלבנת הון ככלי לעצירת ההשתלטות על מקרקעין',
      tag: 'מנוף דגל מנהל אזרחי',
      content: (
        <div className="space-y-4 text-slate-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800">
              <span className="text-xs text-amber-400 font-bold uppercase tracking-wider block mb-1">המצב כיום</span>
              <p className="text-sm text-slate-300">
                בכירי הרשות ואוליגרכים רוכשים שטחים אסטרטגיים בשטחי C דרך חברות קש בירדן, בפנמה ובמקלטי מס. המנהל האזרחי רושם את החברה מבלי לבדוק מי האדם הפיזי מאחוריה.
              </p>
            </div>
            <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800">
              <span className="text-xs text-cyan-400 font-bold uppercase tracking-wider block mb-1">הפרצה הרגולטורית</span>
              <p className="text-sm text-slate-300">
                ישראל החילה דיני איסור הלבנת הון נוקשים הדורשים חשיפת נהנה סופי (Ultimate Beneficial Owner - UBO) בכל עסקת נדל"ן, אך אלו מעולם לא הוחלו בצו צבאי על תאגידים זרים באיו"ש.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800">
              <span className="text-xs text-rose-400 font-bold uppercase tracking-wider block mb-1">משמעות כלכלית ומרחבית</span>
              <p className="text-sm text-slate-300">
                הקפאה מיידית של כל רכישות הנדל"ן האסטרטגיות של הרשות. חילוט מקרקעין שנרכשו בכספי ארגוני טרור או תרומות לא מדווחות, בכלים מסחריים מודרניים.
              </p>
            </div>
            <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800">
              <span className="text-xs text-emerald-400 font-bold uppercase tracking-wider block mb-1">צעד ביצועי נדרש</span>
              <p className="text-sm text-slate-300">
                צו צבאי של אלוף פיקוד המרכז המאמץ את תקנות איסור הלבנת הון (חובת זיהוי נהנה סופי) לתוך תחיקת הביטחון ומערכת הטאבו של המנהל האזרחי.
              </p>
            </div>
          </div>
          <div className="p-3 bg-slate-900 border border-purple-500/30 rounded-lg text-xs text-purple-300">
            <strong>מגן משפטי בינלאומי:</strong> סטנדרטים עולמיים של ארגון ה-FATF ודיני מאבק בהלבנת הון (AML) שאינם ניתנים לתקיפה בינלאומית.
          </div>
        </div>
      )
    },
    {
      title: 'מפת דרכים אופרטיבית לתנועת רגבים',
      subtitle: '3 צעדים מעשיים לקידום מיידי מול משרדי הממשלה והכנסת',
      tag: 'תוכנית עבודה 2026',
      content: (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex gap-4 items-start">
            <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400 font-bold text-lg shrink-0">1</div>
            <div>
              <h4 className="font-bold text-slate-100 text-base mb-1">שאילתות פרלמנטריות ממוקדות צווארי בקבוק (Throughput Audits)</h4>
              <p className="text-sm text-slate-300">
                הגשת שאילתות ישירות לשר האוצר ולשר הכלכלה בוועדת הכספים ובוועדת חוץ וביטחון: דרישת נתונים על מספר מכולות היבוא הפלסטיניות שנבדקות במכון התקנים, והיקף הגבייה בגין שירותי מטבע וסניוראז׳.
              </p>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex gap-4 items-start">
            <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400 font-bold text-lg shrink-0">2</div>
            <div>
              <h4 className="font-bold text-slate-100 text-base mb-1">ניסוח והגשת 'הצעת מחליטים' לשר האוצר ולקבינט</h4>
              <p className="text-sm text-slate-300">
                הכנת פאקט חקיקתי מוכן לחתימה: טיוטת צו אלוף הפיקוד להחלת חובת UBO במקרקעי שטחי C, וטיוטת הוראת שעה לגביית הוצאות בנק ישראל מכספי הסליקה של הרשות.
              </p>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex gap-4 items-start">
            <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 font-bold text-lg shrink-0">3</div>
            <div>
              <h4 className="font-bold text-slate-100 text-base mb-1">מיצוי הליכים ופנייה משפטית מקדמית למנהל המכס וליועמ"ש</h4>
              <p className="text-sm text-slate-300">
                פנייה רשמית של מחלקת המשפט ברגבים בדרישה לנמק מדוע המכס מעניק פטור בלתי חוקי מתקינה ליבוא פלסטיני, כצעד מקדים להגשת עתירה לבג"ץ על הפליה ואפליה רגולטורית לרעה של אזרחי ישראל.
              </p>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-cyan-500/30">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-cyan-600 to-blue-700 shadow-lg shadow-cyan-900/30">
              <Scale className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold tracking-tight text-white font-['Rubik',sans-serif]">
                  מנופי מדיניות ולוחמה בירוקרטית
                </h1>
                <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-300 font-mono">
                  רגבים אסטרטגיה
                </span>
                <span className="flex items-center gap-1.5 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  אב-טיפוס מבוסס AI - לא עבר אימות משפטי
                </span>
              </div>
              <p className="text-xs text-slate-400">
                סינתזה ביצועית של 52 מנופים אזרחיים, כלכליים ומנהליים מול הרשות הפלסטינית
              </p>
            </div>
          </div>

          {/* Navigation Bar */}
          <nav className="flex items-center gap-1.5 p-1 bg-slate-950/70 border border-slate-800/80 rounded-xl text-sm font-medium">
            <button
              onClick={() => setActiveTab('executive')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'executive' 
                  ? 'bg-cyan-600 text-white shadow-sm' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <FileText className="w-4 h-4" />
              תקציר מנהלים
            </button>
            <button
              onClick={() => setActiveTab('categories')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'categories' 
                  ? 'bg-cyan-600 text-white shadow-sm' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Layers className="w-4 h-4" />
              קיטלוג אסטרטגי
            </button>
            <button
              onClick={() => setActiveTab('flagship')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'flagship' 
                  ? 'bg-cyan-600 text-white shadow-sm' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Award className="w-4 h-4" />
              מנופי דגל (Top Tier)
            </button>
            <button
              onClick={() => setActiveTab('roadmap')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'roadmap' 
                  ? 'bg-cyan-600 text-white shadow-sm' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Compass className="w-4 h-4" />
              מפת דרכים לביצוע
            </button>
            <button
              onClick={() => setActiveTab('presentation')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'presentation' 
                  ? 'bg-indigo-600 text-white shadow-sm' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Presentation className="w-4 h-4" />
              מצב מצגת
            </button>
            <button
              onClick={() => setActiveTab('all-levers')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'all-levers' 
                  ? 'bg-cyan-600 text-white shadow-sm' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <ListFilter className="w-4 h-4" />
              כל 52 המנופים
            </button>
          </nav>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* TAB 1: EXECUTIVE SUMMARY */}
        {activeTab === 'executive' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Hero Banner */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-l from-slate-900 via-slate-900 to-cyan-950/70 border border-slate-800 p-8 shadow-2xl">
              <div className="relative z-10 max-w-4xl space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/80 text-cyan-300 text-xs font-semibold">
                  <ShieldAlert className="w-3.5 h-3.5" /> מסמך עמדה ומצגת מנהלים | תנועת רגבים
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-['Rubik',sans-serif] leading-tight">
                  מ"אגרוף קמוץ" ל"רשת קורי עכביש": מעבר ללוחמה בירוקרטית
                </h2>
                <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                  במשך שלושה עשורים התמקד השיח הפוליטי וההתיישבותי בישראל בסמכויות צבאיות, פעולות הריסה נקודתיות ובמאבקים מדיניים בעלי פרופיל תקשורתי גבוה. ואולם, הכוח האמיתי של משרד האוצר, רשות המסים והמנהל האזרחי אינו טמון בהצהרות על פירוק הרשות או בהורדת דחפורים לשטח, אלא <strong className="text-cyan-300">בהחלה מדוקדקת, דווקנית וקרה של רגולציה אזרחית מודרנית</strong> – דיני תקינה, איכות סביבה, הלבנת הון, בטיחות בדרכים ומדיניות מוניטרית – על משק נחשל התלוי לחלוטין בתשתיות ישראליות.
                </p>
                <div className="pt-2 flex flex-wrap gap-4">
                  <button 
                    onClick={() => setActiveTab('flagship')}
                    onClick={() => setActiveTab('flagship')}
                    className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 font-semibold text-white shadow-lg shadow-cyan-900/40 transition flex items-center gap-2 text-sm"
                  >
                    מעבר ישיר ל-3 מנופי הדגל
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => setActiveTab('presentation')}
                    className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 font-semibold text-slate-200 border border-slate-700 transition flex items-center gap-2 text-sm"
                  >
                    <Presentation className="w-4 h-4 text-indigo-400" />
                    הפעל מצגת מנהלים
                  </button>
                </div>
              </div>
              <div className="absolute left-0 bottom-0 top-0 w-1/3 bg-radial from-cyan-600/10 to-transparent pointer-events-none" />
            </div>

            {/* Core Pillars Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/40 transition-all space-y-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-bold">
                  <TrendingDown className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">פוקוס על תפוקה (Throughput)</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  הכשל הממשלתי הנוכחי אינו היעדר סמכות אלא צווארי בקבוק תפעוליים שמונעים אכיפה (כמו מחסור במודדים להסדר מקרקעין או היעדר חיבורי מערכות). התמקדות בתפוקה מאפשרת לשתק את הרשות בלי להמציא חוקים חדשים.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/40 transition-all space-y-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold">
                  <Gavel className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">עמידות משפטית ומנהלית מוגברת</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  הקהילה הבינלאומית ובית המשפט העליון מכירים בסמכות המנהלית המובהקת לאכוף חוקי בטיחות מזון, מניעת אסבסט, תקני בטיחות רכב או כללי מאבק בהלבנת הון (FATF). הכלים נשענים על סטנדרטים בינלאומיים לגיטימיים.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/40 transition-all space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
                  <Coins className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">קיזוז חשבונאי ישיר</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  במקום עימותים פוליטיים על עצירת כספי מסים, המדינה יכולה להשית שומות מסחריות, דמי ניהול מוניטרי (Seigniorage), היטלי שפכים וקנסות עיוות רשת – ולקזזם אוטומטית בהתאם לחשבונאות ציבורית תקינה.
                </p>
              </div>
            </div>

            {/* Comparison Matrix Table */}
            <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl">
              <div className="p-5 border-b border-slate-800 bg-slate-900/90 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white font-['Rubik',sans-serif]">
                    מטריצת השוואה: לוחמה בירוקרטית מול פעולות מסורתיות
                  </h3>
                  <p className="text-xs text-slate-400">ניתוח פרמטרים מרכזיים להערכת אפקטיביות</p>
                </div>
                <span className="text-xs px-2.5 py-1 rounded bg-slate-800 text-cyan-400 font-mono border border-slate-700">
                  ניתוח תורת המשחקים
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-right text-sm">
                  <thead className="bg-slate-950/60 text-slate-400 text-xs font-semibold border-b border-slate-800">
                    <tr>
                      <th className="py-3 px-4">פרמטר</th>
                      <th className="py-3 px-4 text-rose-300">דפוס פעולה מסורתי (פוליטי/צבאי)</th>
                      <th className="py-3 px-4 text-cyan-300">לוחמה בירוקרטית (רגולציה אזרחית)</th>
                      <th className="py-3 px-4">יתרון אסטרטגי לרגבים</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-200">
                    <tr className="hover:bg-slate-800/30">
                      <td className="py-3.5 px-4 font-medium text-slate-300">זירת הפעולה</td>
                      <td className="py-3.5 px-4 text-slate-400">הריסות בשטח, חיכוך מול מצלמות</td>
                      <td className="py-3.5 px-4 text-cyan-300 font-medium">נמלים, שרתי מחשב, משרדי ממשלה</td>
                      <td className="py-3.5 px-4 text-emerald-400 text-xs font-semibold">אפס חיכוך פיזי ותקשורתי</td>
                    </tr>
                    <tr className="hover:bg-slate-800/30">
                      <td className="py-3.5 px-4 font-medium text-slate-300">עמידות בינלאומית</td>
                      <td className="py-3.5 px-4 text-slate-400">גינויים באו"ם, לחץ אמריקאי וסנקציות</td>
                      <td className="py-3.5 px-4 text-cyan-300 font-medium">עמידות גבוהה: הגנה מבוססת על בריאות הציבור, סביבה ותקינה</td>
                      <td className="py-3.5 px-4 text-emerald-400 text-xs font-semibold">אי-יכולת של האיחוד לתקוף תקני איכות</td>
                    </tr>
                    <tr className="hover:bg-slate-800/30">
                      <td className="py-3.5 px-4 font-medium text-slate-300">השפעה כלכלית</td>
                      <td className="py-3.5 px-4 text-slate-400">קיזוז פוליטי שמשוחרר תחת לחץ זר</td>
                      <td className="py-3.5 px-4 text-cyan-300 font-medium">הסדרת חובות מסחריים וקיזוז עלויות שירות ריאליות</td>
                      <td className="py-3.5 px-4 text-emerald-400 text-xs font-semibold">בלתי הפיך ומתמשך חודש בחודשו</td>
                    </tr>
                    <tr className="hover:bg-slate-800/30">
                      <td className="py-3.5 px-4 font-medium text-slate-300">כלי יישום נדרש</td>
                      <td className="py-3.5 px-4 text-slate-400">חקיקה ראשית בכנסת / החלטות קבינט סוערות</td>
                      <td className="py-3.5 px-4 text-cyan-300 font-medium">צווים מנהליים, הוראות שעה, נהלי מכס</td>
                      <td className="py-3.5 px-4 text-emerald-400 text-xs font-semibold">ישימות מיידית בחתימת שר/מנכ"ל בלבד</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Disclaimer */}
        <div className="mt-8 p-5 rounded-2xl bg-slate-900 border border-slate-700/50 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-2 h-full bg-cyan-600/50"></div>
          <h4 className="text-cyan-400 font-bold text-sm mb-2 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4" />
            הערת שקיפות (Disclaimer)
          </h4>
          <p className="text-sm text-slate-300 leading-relaxed">
            מערכת זו הינה <strong>מודל רעיוני (Conceptual Framework)</strong> שנוצר כיוזמה אזרחית בעזרת כלי בינה מלאכותית (AI) לשם סיעור מוחות. המנופים המוצגים <strong>אינם מהווים חוות דעת משפטית</strong>. חלקם מתארים פערים יישומיים קיימים, בעוד אחרים הם בגדר הצעות מדיניות חדשות הדורשות הוכחת סמכות, חקיקה, או התאמה להסכמי הסחר ופרוטוקול פריז.
          </p>
        </div>

        {/* TAB 2: STRATEGIC CATEGORIZATION */}
        {activeTab === 'categories' && (
          <div className="space-y-8 animate-fadeIn">
            <div>
              <h2 className="text-2xl font-extrabold text-white font-['Rubik',sans-serif]">
                קיטלוג אסטרטגי של 52 המנופים הרגולטוריים
              </h2>
              <p className="text-slate-400 text-sm mt-1">
                מיפוי שיטתי ב-4 מקרו-קטגוריות של כלכלה ומנהל אזרחי
              </p>
            </div>

            {/* Categories Overview Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {categories.map((cat) => {
                const Icon = cat.icon;
                const leversInCat = LEVERS_DATA.filter(l => l.category === cat.id);
                return (
                  <div 
                    key={cat.id} 
                    className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 shadow-lg space-y-4 flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-3 rounded-xl bg-slate-800 text-cyan-400">
                            <Icon className="w-6 h-6" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-white font-['Rubik',sans-serif]">{cat.label}</h3>
                            <span className="text-xs text-slate-400">{leversInCat.length} מנופים אופרטיביים מופו</span>
                          </div>
                        </div>
                        <span className={`text-xs font-bold px-3 py-1 rounded-full border ${cat.badgeBg}`}>
                          אשכול אסטרטגי
                        </span>
                      </div>
                      <p className="text-sm text-slate-300 leading-relaxed">
                        {cat.desc}
                      </p>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-slate-800/80">
                      <span className="text-xs font-semibold text-slate-400 block">רשימת מנופים מובילים באשכול:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {leversInCat.slice(0, 5).map((l) => (
                          <button
                            key={l.id}
                            onClick={() => {
                              setSelectedLever(l);
                            }}
                            className="text-xs px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 hover:border-cyan-500/50 transition truncate max-w-xs"
                          >
                            {l.number}. {l.titleHe}
                          </button>
                        ))}
                        {leversInCat.length > 5 && (
                          <button
                            onClick={() => {
                              setSelectedCategory(cat.id);
                              setActiveTab('all-levers');
                            }}
                            className="text-xs px-2.5 py-1 rounded-md bg-cyan-950 text-cyan-300 border border-cyan-800 font-semibold"
                          >
                            + עוד {leversInCat.length - 5} מנופים
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick jump to all levers */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-850 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h4 className="text-lg font-bold text-white">מעוניין לצפות בכל 52 המנופים המסווגים?</h4>
                <p className="text-xs text-slate-400">כולל חיפוש טקסטואלי, סינון רשויות מפקחות, ניקוד ישימות ופירוט מלא.</p>
              </div>
              <button
                onClick={() => setActiveTab('all-levers')}
                className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-sm transition flex items-center gap-2"
              >
                צפייה במאגר המלא
                <ArrowLeft className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* TAB 3: TOP TIER SELECTION (מנופי דגל) */}
        {activeTab === 'flagship' && (
          <div className="space-y-8 animate-fadeIn">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-2">
                <Flame className="w-3.5 h-3.5" /> 3 המנופים הישימים, הקטלניים והחסינים ביותר
              </div>
              <h2 className="text-3xl font-extrabold text-white font-['Rubik',sans-serif]">
                מנופי הדגל של המחקר (Top Tier Selection)
              </h2>
              <p className="text-slate-400 text-sm mt-1 max-w-3xl">
                שלושת המנופים הבאים נבחרו מתוך כלל המאגר כבעלי האימפקט הכלכלי הגבוה ביותר, עמידות משפטית בינלאומית מושלמת וישימות מנהלית מיידית ללא צורך בחקיקה בכנסת.
              </p>
            </div>

            {/* Flagship Cards Detail */}
            <div className="space-y-8">
              {flagshipLevers.map((lever, index) => {
                const catObj = categories.find(c => c.id === lever.category);
                return (
                  <div 
                    key={lever.id}
                    className="p-6 sm:p-8 rounded-2xl bg-slate-900 border-2 border-cyan-500/40 shadow-2xl relative overflow-hidden"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-600 to-blue-700 text-white flex items-center justify-center font-extrabold text-xl shadow-md">
                          0{index + 1}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-2xl font-bold text-white font-['Rubik',sans-serif]">
                              {lever.titleHe}
                            </h3>
                            <span className="text-xs px-2.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-cyan-300 font-mono">
                              {lever.titleEn}
                            </span>
                          </div>
                          <span className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
                            רשות שלטונית אחראית: <strong className="text-slate-200">{lever.governingAuthority}</strong>
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 mt-3 md:mt-0">
                        <span className={`text-xs px-3 py-1 rounded-full border font-bold ${catObj?.badgeBg}`}>
                          {catObj?.label}
                        </span>
                        <span className="text-xs px-3 py-1 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-300 font-bold">
                          ציון ישימות: 5/5
                        </span>
                        <span className={`text-xs px-3 py-1 rounded-full border font-bold ${
                          lever.researchStatus?.includes('גבוהה') ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' :
                          lever.researchStatus?.includes('בינונית') ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' :
                          lever.researchStatus?.includes('נמוכה') || lever.researchStatus?.includes('מורכבת') ? 'bg-rose-500/10 text-rose-400 border-rose-500/30' :
                          'bg-slate-500/10 text-slate-400 border-slate-500/30'
                        }`}>
                          {lever.researchStatus}
                        </span>
                        <span className="text-xs px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 font-bold flex items-center gap-1">
                          <Gavel className="w-3.5 h-3.5" />
                          {lever.legalAuthority}
                        </span>
                      </div>
                    </div>

                    {/* Exact 4-part structure required by user */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* 1. המצב כיום */}
                      <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-2">
                        <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                          <AlertTriangle className="w-4 h-4" />
                          1. המצב כיום (Current Situation)
                        </div>
                        <p className="text-slate-300 text-sm leading-relaxed">
                          {lever.currentSituation}
                        </p>
                      </div>

                      {/* 2. הפרצה הרגולטורית */}
                      <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-2">
                        <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                          <ShieldAlert className="w-4 h-4" />
                          2. הפרצה הרגולטורית (The Missed Point / Regulatory Gap)
                        </div>
                        <p className="text-slate-300 text-sm leading-relaxed">
                          {lever.regulatoryGap}
                        </p>
                      </div>

                      {/* 3. משמעות כלכלית */}
                      <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-2">
                        <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                          <TrendingDown className="w-4 h-4" />
                          3. משמעות כלכלית (Economic Impact)
                        </div>
                        <p className="text-slate-300 text-sm leading-relaxed">
                          {lever.economicImpact}
                        </p>
                      </div>

                      {/* 4. הצעד הביצועי הנדרש */}
                      <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-2">
                        <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                          <CheckCircle2 className="w-4 h-4" />
                          4. הצעד הביצועי הנדרש (Required Execution Step)
                        </div>
                        <p className="text-slate-300 text-sm leading-relaxed">
                          {lever.executionStep}
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 p-4 rounded-xl bg-slate-900 border border-amber-900/50 flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-sm font-bold text-amber-500 block mb-1">ניתוח סיכונים והערכה משפטית ראשונית:</span>
                        <p className="text-sm text-slate-300 leading-relaxed">{lever.feasibilityAndRisks}</p>
                      </div>
                    </div>

                    {/* Operational Legal Shield Footer */}
                    <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4 bg-slate-950/40 p-4 rounded-xl">
                      <div className="text-xs text-slate-300 flex items-center gap-2">
                        <Gavel className="w-4 h-4 text-cyan-400 shrink-0" />
                        <span><strong>מגן משפטי ואמנות בינלאומיות:</strong> {lever.legalShield}</span>
                      </div>
                      <button
                        onClick={() => copyToClipboard(
                          `מנוף דגל: ${lever.titleHe} (${lever.titleEn})
1. המצב כיום: ${lever.currentSituation}
2. הפרצה הרגולטורית: ${lever.regulatoryGap}
3. משמעות כלכלית: ${lever.economicImpact}
4. הצעד הביצועי הנדרש: ${lever.executionStep}
מגן משפטי: ${lever.legalShield}
רשות אחראית: ${lever.governingAuthority}`,
                          lever.id
                        )}
                        className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1.5 transition"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        {copiedText === lever.id ? 'הועתק ללוח!' : 'העתק תמצית מנהלים זו'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 4: ACTIONABLE ROADMAP */}
        {activeTab === 'roadmap' && (
          <div className="space-y-8 animate-fadeIn">
            <div>
              <h2 className="text-3xl font-extrabold text-white font-['Rubik',sans-serif]">
                מפת דרכים אופרטיבית לתנועת רגבים (Actionable Roadmap)
              </h2>
              <p className="text-slate-400 text-sm mt-1">
                תוכנית עבודה מוגדרת להנעת המנגנונים הממשלתיים והפרלמנטריים בטווח של 30-90 יום
              </p>
            </div>

            {/* Roadmap Steps */}
            <div className="space-y-6">
              {/* Step 1 */}
              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-lg">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white font-['Rubik',sans-serif]">
                      שלב 1: הנחת שאילתות פרלמנטריות ממוקדות תפוקה (Throughput Audits)
                    </h3>
                    <p className="text-xs text-slate-400">חשיפת צווארי הבקבוק המנהליים מעל דוכן הכנסת ובוועדת הכספים</p>
                  </div>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">
                  השיח הפרלמנטרי תקוע בוויכוחים עקרוניים על סמכויות. מחלקת המדיניות של רגבים תנסח עבור חברי כנסת שאילתות ישירות המאלצות את פקידי האוצר ורשות המסים למסור נתונים מדויקים על העלמת עין רגולטורית:
                </p>

                {/* Question Box */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-cyan-400">נוסח מוכן לשאילתה ישירה לשר האוצר / שר הכלכלה:</span>
                    <button
                      onClick={() => copyToClipboard(
                        `לכבוד שר האוצר / שר הכלכלה,
הנדון: שאילתה דחופה בעניין הפטור מבדיקות מכון התקנים לסחורות המיובאות לרשות הפלסטינית
1. כמה מכולות יבוא מכלל הנמלים יועדו בשנים 2024-2025 לשטחי הרשות הפלסטינית?
2. כמה מתוכן עברו בדיקה פיזית או מעבדתית של מכון התקנים הישראלי לפני כניסתן?
3. מהו הבסיס המשפטי לנוהל הפוטר סחורות אלו מבדיקות תקינה ביחס לבריאות ובטיחות הציבור?
4. האם נבחנה הערכת הסיכון של זליגת טובין שאינם עומדים בתקן הישראלי מתוך הרשות לשווקי ישראל?`,
                        'query-1'
                      )}
                      className="text-xs px-2.5 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700 flex items-center gap-1 hover:bg-slate-700"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      {copiedText === 'query-1' ? 'הועתק!' : 'העתק שאילתה'}
                    </button>
                  </div>
                  <pre className="text-xs text-slate-300 font-sans whitespace-pre-wrap leading-relaxed p-2 bg-slate-900/60 rounded">
                    {`"לכבוד שר האוצר ושר הכלכלה:
1. כמה מכולות יבוא מכלל הנמלים יועדו בשנים 2024-2025 לשטחי הרשות הפלסטינית?
2. כמה מתוכן עברו בדיקה פיזית או מעבדתית של מכון התקנים הישראלי לפני כניסתן?
3. מהו הבסיס המשפטי המדויק להענקת פטור גורף מסחורות אלו בנמלי הים?
4. האם נבחנה הערכת הנזק והזליגה של מוצרים מסוכנים אלו לתוך ישראל?"`}
                  </pre>
                </div>
              </div>

              {/* Step 2 */}
              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-lg">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white font-['Rubik',sans-serif]">
                      שלב 2: גיבוש מסמך מדיניות והצעת מחליטים לקבינט (Cabinet Resolution Pack)
                    </h3>
                    <p className="text-xs text-slate-400">הגשת מסמך אופרטיבי שלם וחתום לשר האוצר ולשר במשרד הביטחון</p>
                  </div>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">
                  הכנת "ערכת החלטה" (Turnkey Policy Brief) המכילה את כל הניסוחים המשפטיים הנדרשים לחתימה מיידית, ללא צורך במחקר נוסף מצד הפקידות:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <span className="text-xs font-bold text-amber-400">טיוטת צו צבאי (UBO בשטחי C):</span>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      "צו בדבר מניעת הלבנת הון בעסקאות מקרקעין (יהודה והשומרון) - התניית רישום זכויות מקרקעין של תאגידים זרים בגילוי מלא ומאומת של בעלי השליטה הסופיים (Ultimate Beneficial Owners)."
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <span className="text-xs font-bold text-emerald-400">הוראת שעה לשר האוצר (דמי סניוראז׳):</span>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      "הוראה מנהלית לניכוי הוצאות החזקת ותחזוקת השקל הישראלי באיו\"ש מתוך כספי הגבייה המועברים לרש\"פ, בהתאם לחישוב בנק ישראל ובדמי ניהול יחסיים מהמחזור השנתי."
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-lg">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white font-['Rubik',sans-serif]">
                      שלב 3: מיצוי הליכים מנהלי ועצומת עתירה לבג"ץ (Pre-Litigation Action)
                    </h3>
                    <p className="text-xs text-slate-400">יצירת מנוף לחץ משפטי על רשות המסים והמנהל האזרחי</p>
                  </div>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">
                  הגשת מכתב מיצוי הליכים מקדים מטעם המחלקה המשפטית של תנועת רגבים ליועצת המשפטית לממשלה ולמנהל רשות המסים, הטוען לאפליה אסורה: <strong className="text-slate-100">מדוע יבואן ישראלי מחויב לשלם אלפי שקלים למכון התקנים ולהמתין שבועות, בעוד יבואן פלסטיני זוכה לפטור גורף המסכן את הציבור?</strong>
                </p>
                <div className="p-3 bg-slate-950/70 border border-emerald-500/30 rounded-lg text-xs text-emerald-300">
                  צעד זה מייצר הכרח לפקידות הממשלתית לבחון את המדיניות, ומאלץ את המערכת לבטל את הפטור המנהלי גם ללא צורך בהכרעה שיפוטית בבג"ץ.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: PRESENTATION MODE */}
        {activeTab === 'presentation' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                  שקופית {currentSlide + 1} מתוך {slides.length}
                </span>
                <h2 className="text-2xl font-extrabold text-white font-['Rubik',sans-serif]">
                  מצגת מנהלים: מנופי לחץ בירוקרטיים
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <button
                  disabled={currentSlide === 0}
                  onClick={() => setCurrentSlide(prev => Math.max(0, prev - 1))}
                  className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-800 text-white transition"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  disabled={currentSlide === slides.length - 1}
                  onClick={() => setCurrentSlide(prev => Math.min(slides.length - 1, prev + 1))}
                  className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-800 text-white transition"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Slide Canvas */}
            <div className="min-h-[460px] p-8 sm:p-10 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border-2 border-indigo-500/30 shadow-2xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-indigo-950 border border-indigo-800 text-indigo-300">
                    {slides[currentSlide].tag}
                  </span>
                  <span className="text-xs text-slate-500 font-mono">
                    תנועת רגבים | מחלקת מחקר ומדיניות
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-['Rubik',sans-serif] mb-1">
                  {slides[currentSlide].title}
                </h3>
                <p className="text-slate-400 text-sm mb-6">
                  {slides[currentSlide].subtitle}
                </p>

                <div className="mt-4">
                  {slides[currentSlide].content}
                </div>
              </div>

              {/* Slide Navigation Dots */}
              <div className="flex items-center justify-center gap-2 mt-8 pt-4 border-t border-slate-800/80">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-2 rounded-full transition-all ${
                      currentSlide === idx ? 'w-8 bg-indigo-500' : 'w-2 bg-slate-700 hover:bg-slate-600'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: ALL 52 LEVERS DATABASE */}
        {activeTab === 'all-levers' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-extrabold text-white font-['Rubik',sans-serif]">
                  מאגר כל 52 המנופים הרגולטוריים
                </h2>
                <p className="text-slate-400 text-xs mt-0.5">
                  חיפוש, סינון וניתוח מעמיק של כלל כלי המדיניות
                </p>
              </div>

              {/* Search & Category Filter */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute right-3 top-2.5 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="חיפוש מנוף, רשות או מונח..."
                    className="pr-9 pl-4 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 w-64"
                  />
                </div>

                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
                >
                  <option value="all">כל 4 הקטגוריות ({LEVERS_DATA.length})</option>
                  <option value="finance">פיננסים ובנקאות</option>
                  <option value="infrastructure">תשתיות ואיכות סביבה</option>
                  <option value="trade">סחר ומכס</option>
                  <option value="civil">מנהל אזרחי ורישוי</option>
                </select>
              </div>
            </div>

            {/* Levers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredLevers.map((lever) => {
                const catObj = categories.find(c => c.id === lever.category);
                return (
                  <div
                    key={lever.id}
                    onClick={() => setSelectedLever(lever)}
                    className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-900 cursor-pointer transition-all flex flex-col justify-between space-y-3 group shadow-md"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-slate-500">
                          #{lever.number}
                        </span>
                        <div className="flex items-center gap-1.5">
                          {lever.isFlagship && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                              דגל
                            </span>
                          )}
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${catObj?.badgeBg}`}>
                            {catObj?.label}
                          </span>
                        </div>
                      </div>

                      <h4 className="font-bold text-slate-100 group-hover:text-cyan-300 transition text-base">
                        {lever.titleHe}
                      </h4>
                      <p className="text-xs text-slate-400 font-mono">
                        {lever.titleEn}
                      </p>
                      <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                        {lever.summary}
                      </p>

                      <div className="flex flex-wrap gap-2 pt-2 mt-auto">
                        <span className={`text-[10px] px-2 py-0.5 rounded border ${
                          lever.researchStatus?.includes('גבוהה') ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' :
                          lever.researchStatus?.includes('בינונית') ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' :
                          lever.researchStatus?.includes('נמוכה') || lever.researchStatus?.includes('מורכבת') ? 'bg-rose-500/10 text-rose-400 border-rose-500/30' :
                          'bg-slate-500/10 text-slate-400 border-slate-500/30'
                        }`}>
                          {lever.researchStatus}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 flex items-center gap-1">
                          <Gavel className="w-3 h-3" />
                          {lever.legalAuthority}
                        </span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                      <span className="truncate max-w-[170px]">{lever.governingAuthority}</span>
                      <span className="text-cyan-400 group-hover:translate-x-[-3px] transition flex items-center gap-1 font-semibold">
                        פרטים
                        <ArrowLeft className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredLevers.length === 0 && (
              <div className="text-center py-16 bg-slate-900/40 rounded-2xl border border-slate-800">
                <Search className="w-10 h-10 text-slate-600 mx-auto mb-2" />
                <p className="text-slate-400 font-medium">לא נמצאו מנופים התואמים את החיפוש.</p>
                <button
                  onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
                  className="mt-2 text-xs text-cyan-400 underline"
                >
                  איפוס סינונים
                </button>
              </div>
            )}
          </div>
        )}

      </main>

      {/* Lever Details Modal */}
      {selectedLever && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 w-full max-w-2xl rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-4 pb-3 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-cyan-300">
                    מנוף #{selectedLever.number}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    {selectedLever.titleEn}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white font-['Rubik',sans-serif]">
                  {selectedLever.titleHe}
                </h3>
                
                <div className="flex flex-wrap gap-2 mt-3">
                  <span className={`text-xs px-2.5 py-1 rounded-full border ${
                    selectedLever.researchStatus?.includes('גבוהה') ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' :
                    selectedLever.researchStatus?.includes('בינונית') ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' :
                    selectedLever.researchStatus?.includes('נמוכה') || selectedLever.researchStatus?.includes('מורכבת') ? 'bg-rose-500/10 text-rose-400 border-rose-500/30' :
                    'bg-slate-500/10 text-slate-400 border-slate-500/30'
                  }`}>
                    {selectedLever.researchStatus}
                  </span>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 flex items-center gap-1">
                    <Gavel className="w-3.5 h-3.5" />
                    {selectedLever.legalAuthority}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedLever(null)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-sm">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-xs font-bold text-amber-400 block mb-1">המצב כיום:</span>
                <p className="text-slate-300 leading-relaxed">{selectedLever.currentSituation}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-xs font-bold text-cyan-400 block mb-1">הפרצה הרגולטורית:</span>
                <p className="text-slate-300 leading-relaxed">{selectedLever.regulatoryGap}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-xs font-bold text-rose-400 block mb-1">משמעות כלכלית:</span>
                <p className="text-slate-300 leading-relaxed">{selectedLever.economicImpact}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-xs font-bold text-emerald-400 block mb-1">צעד ביצועי נדרש:</span>
                <p className="text-slate-300 leading-relaxed">{selectedLever.executionStep}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900 border border-amber-900/50 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-bold text-amber-500 block mb-1">ניתוח סיכונים והערכה משפטית ראשונית:</span>
                  <p className="text-sm text-slate-300 leading-relaxed">{selectedLever.feasibilityAndRisks}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 text-xs">
                  <span className="text-slate-400 block">רשות מוסמכת:</span>
                  <span className="font-semibold text-slate-200">{selectedLever.governingAuthority}</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 text-xs">
                  <span className="text-slate-400 block">עוגן משפטי בינלאומי:</span>
                  <span className="font-semibold text-slate-200">{selectedLever.legalShield}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
              <button
                onClick={() => {
                  copyToClipboard(
                    `מנוף מדיניות: ${selectedLever.titleHe} (${selectedLever.titleEn})
המצב כיום: ${selectedLever.currentSituation}
הפרצה הרגולטורית: ${selectedLever.regulatoryGap}
משמעות כלכלית: ${selectedLever.economicImpact}
צעד ביצועי: ${selectedLever.executionStep}
רשות אחראית: ${selectedLever.governingAuthority}`,
                    selectedLever.id
                  );
                }}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5"
              >
                <Copy className="w-3.5 h-3.5" />
                {copiedText === selectedLever.id ? 'הועתק בהצלחה!' : 'העתק כרטיס מנוף'}
              </button>
              <button
                onClick={() => setSelectedLever(null)}
                className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold"
              >
                סגור
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-between gap-4">
          <p>
            מסמך מדיניות ומצגת מנהלים אופרטיבית | יוזמה אזרחית עצמאית | מודל חשיבה קונספטואלי לדיון
          </p>
          <div className="flex items-center gap-4 text-slate-400">
            <span>גרסת מחקר: 2026.2 (אב-טיפוס רעיוני לדיון)</span>
            <span>סטנדרט: OECD / WTO / FATF</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

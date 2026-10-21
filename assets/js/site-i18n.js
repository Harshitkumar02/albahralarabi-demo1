/**
 * SiteLang – Unified i18n engine for Al Bahr Al Arabi Group.
 * Loaded BEFORE layout.js and page scripts.
 *
 * Usage:
 *   SiteLang.register({ en: {...}, ar: {...} })   — page adds its strings
 *   SiteLang.set('ar')                            — apply language site-wide
 *   SiteLang.get()                                — returns current lang code
 *   document.addEventListener('languagechange', e => { ... })
 */
var SiteLang = (function () {

    /* ── shared header / footer / nav strings (source of truth: index.html) ── */
    var SHARED_KEYS = {};          // filled below with all shared keys

    var strings = { en: {}, ar: {} };
    var currentLang = 'en';
    var originals = new WeakMap(); // remembers original EN innerHTML

    /* ── Shared EN strings ── */
    var sharedEN = {
        top_email:      'info@albahralarabi.com',
        top_phone:      '+971 65260602',
        top_address:    'FF3P+WFG Al Hamriyah Free Zone - Sharjah - UAE',
        menu_home:      'Home',
        menu_about:     'About Us',
        menu_group:     'Group<br>Companies',
        menu_group_m:   'Group Companies',
        menu_services:  'Services',
        menu_projects:  'Projects',
        menu_media:     'Media Center',
        menu_careers:   'Careers',
        menu_contact:   'Contact Us',
        btn_quote:      'Request<br>a Quote',
        btn_quote_m:    'Request a Quote',
        company_1:      'Al Bahr Al Arabi Marine Engineering-UAE',
        company_2:      'Al Bahr Al Arabi Technical Industries FZC-UAE',
        company_3:      'Gulf Tech Energy Contracting LLC-UAE',
        company_4:      'Crystal Petroleum FZE-UAE',
        company_5:      'Crystal Petrochemicals FZCO-UAE',
        company_6:      'Crystal Petrokimya-Turkey',
        company_7:      'Crystal Care Ltd-KSA',
        company_8:      'Meecon LTD-UK',
        company_9:      'Crystal Oilfield Constr & Cont. LLC-Qatar',
        learn_more_company: 'Learn More',
        visit_website:  'Visit Website',
        quick_links:    'Quick Links',
        services_col:   'Services',
        contact_col:    'Contact',
        footer_desc:    'Engineering Excellence Since 1998. Leading EPC contractor specializing in Oil & Gas infrastructure solutions across the MENA region.',
        footer_svc_1:   'EPC Projects',
        footer_svc_2:   'Tank Farms',
        footer_svc_3:   'Refinery Plants',
        footer_svc_4:   'Steel Fabrication',
        footer_svc_5:   'Civil Works',
        address:        'Hamriyah Free Zone, Sharjah, UAE',
        copyright:      '© {year} Al Bahr Al Arabi Group. All rights reserved.',
        privacy:        'Privacy Policy',
        terms:          'Terms of Service',
        aria_menu_open:  'Open main menu',
        aria_menu_close: 'Close main menu',
        aria_lang_toggle:'Switch language',
        aria_linkedin:   'LinkedIn',
        aria_facebook:   'Facebook',
        aria_instagram:  'Instagram',
        aria_twitter:    'Twitter'
    };

    /* ── Shared AR strings ── */
    var sharedAR = {
        top_email:      'info@albahralarabi.com',
        top_phone:      '+971 65260602',
        top_address:    'FF3P+WFG المنطقة الحرة بالحمرية - الشارقة - الإمارات العربية المتحدة',
        menu_home:      'الرئيسية',
        menu_about:     'من نحن',
        menu_group:     'شركات<br>المجموعة',
        menu_group_m:   'شركات المجموعة',
        menu_services:  'الخدمات',
        menu_projects:  'المشاريع',
        menu_media:     'المركز الإعلامي',
        menu_careers:   'الوظائف',
        menu_contact:   'اتصل بنا',
        btn_quote:      'طلب<br>عرض سعر',
        btn_quote_m:    'طلب عرض سعر',
        company_1:      'البحر العربي للهندسة البحرية - الإمارات',
        company_2:      'البحر العربي للصناعات الفنية (م.ح) - الإمارات',
        company_3:      'جلف تيك للمقاولات الطاقية ذ.م.م - الإمارات',
        company_4:      'كريستال للبترول (م.ح) - الإمارات',
        company_5:      'كريستال للبتروكيماويات (م.ح) - الإمارات',
        company_6:      'كريستال بتروكيميا - تركيا',
        company_7:      'كريستال كير المحدودة - السعودية',
        company_8:      'ميكون المحدودة - المملكة المتحدة',
        company_9:      'كريستال لمقاولات حقول النفط - قطر',
        learn_more_company: 'اعرف المزيد',
        visit_website:  'زيارة الموقع',
        quick_links:    'روابط سريعة',
        services_col:   'الخدمات',
        contact_col:    'اتصل',
        footer_desc:    'التميز الهندسي منذ 1998. مقاول رائد في الهندسة والتوريد والإنشاء متخصص في حلول البنية التحتية للنفط والغاز عبر منطقة الشرق الأوسط وشمال أفريقيا.',
        footer_svc_1:   'مشاريع الهندسة والتوريد والإنشاء المتكاملة',
        footer_svc_2:   'إنشاء محطات الخزانات',
        footer_svc_3:   'محطات التقطير والتكرير',
        footer_svc_4:   'تصنيع الهياكل الفولاذية',
        footer_svc_5:   'الأعمال المدنية والبناء',
        address:        'المنطقة الحرة بالحمرية، الشارقة، الإمارات العربية المتحدة',
        copyright:      '© {year} مجموعة البحر العربي. جميع الحقوق محفوظة.',
        privacy:        'سياسة الخصوصية',
        terms:          'شروط الخدمة',
        aria_menu_open:  'فتح القائمة الرئيسية',
        aria_menu_close: 'إغلاق القائمة الرئيسية',
        aria_lang_toggle:'تبديل اللغة',
        aria_linkedin:   'لينكد إن',
        aria_facebook:   'فيسبوك',
        aria_instagram:  'انستغرام',
        aria_twitter:    'تويتر'
    };

    // Build SHARED_KEYS set for protecting during register()
    Object.keys(sharedEN).forEach(function (k) { SHARED_KEYS[k] = true; });

    // Seed strings with shared data
    Object.keys(sharedEN).forEach(function (k) { strings.en[k] = sharedEN[k]; });
    Object.keys(sharedAR).forEach(function (k) { strings.ar[k] = sharedAR[k]; });

    /* ── Public API ── */
    function register(dict) {
        // Merge page-level strings, but shared keys always win
        ['en', 'ar'].forEach(function (lang) {
            if (!dict[lang]) return;
            Object.keys(dict[lang]).forEach(function (k) {
                if (SHARED_KEYS[k]) return;       // shared keys are locked
                strings[lang][k] = dict[lang][k];
            });
        });
    }

    function get() { return currentLang; }

    function t(key) {
        var s = strings[currentLang];
        if (s && s[key] !== undefined) return s[key];
        // fallback to EN
        return strings.en[key] || key;
    }

    function set(lang) {
        currentLang = lang;
        try { localStorage.setItem('preferredLang', lang); } catch (e) { /* ignore */ }

        var html = document.documentElement;
        html.lang = lang;
        html.dir = 'ltr';   // always LTR, even for Arabic

        // Apply font
        if (lang === 'ar') {
            document.body.classList.add('font-arabic');
            document.body.classList.remove('font-sans');
            document.body.style.textAlign = 'left';
        } else {
            document.body.classList.add('font-sans');
            document.body.classList.remove('font-arabic');
            document.body.style.textAlign = '';
        }

        // Update all toggle buttons
        var toggleLabel = lang === 'ar' ? 'عربي | EN' : 'EN | عربي';
        document.querySelectorAll('[data-lang-toggle-text]').forEach(function (el) {
            el.textContent = toggleLabel;
        });

        // data-i18n
        document.querySelectorAll('[data-i18n]').forEach(function (el) {
            var key = el.getAttribute('data-i18n');
            // Store original EN text the first time (for pages with AR-only dictionaries)
            if (!originals.has(el)) {
                originals.set(el, el.innerHTML);
            }
            var val = strings[lang] && strings[lang][key];
            if (val !== undefined) {
                // Handle {year} placeholder
                if (key === 'copyright') {
                    val = val.replace('{year}', new Date().getFullYear());
                }
                el.innerHTML = val;
            } else if (lang === 'en') {
                // Restore original EN
                el.innerHTML = originals.get(el);
            }
        });

        // data-i18n-placeholder
        document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
            var key = el.getAttribute('data-i18n-placeholder');
            var val = strings[lang] && strings[lang][key];
            if (val !== undefined) {
                el.placeholder = val;
            }
        });

        // Dispatch event for dynamic content
        document.dispatchEvent(new CustomEvent('languagechange', { detail: { lang: lang } }));
    }

    function init() {
        var saved = 'en';
        try { saved = localStorage.getItem('preferredLang') || 'en'; } catch (e) { /* ignore */ }
        set(saved);
    }

    // Auto-init on DOMContentLoaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        // DOM already loaded (shouldn't happen since script is in <head>)
        init();
    }

    return {
        register: register,
        get: get,
        set: set,
        t: t,
        strings: strings
    };
})();

/**
 * SiteLayout – Generates the shared header (top bar + nav) and footer.
 * Source of truth: index.html design.
 *
 * Usage (in every page body):
 *   <div id="site-header"></div><script>SiteLayout.mountHeader('site-header')</script>
 *   ...page content...
 *   <div id="site-footer"></div><script>SiteLayout.mountFooter('site-footer')</script>
 */
var SiteLayout = (function () {

    /* ── Helpers ── */
    var C = SITE_CONFIG;

    function currentPage() {
        var path = window.location.pathname;
        var file = path.split('/').pop() || 'index.html';
        if (file === '' || file === '/' ) file = 'index.html';
        if (!file.includes('.')) file += '.html';
        return file;
    }

    function isActive(file) {
        var cur = currentPage();
        if (file === 'index.html') return cur === 'index.html' || cur === '' || cur === '/';
        return cur === file;
    }

    function socialLink(url, iconClass, ariaKey) {
        var href = url || '#';
        var attrs = url
            ? 'target="_blank" rel="noopener noreferrer"'
            : '';
        return '<!-- TODO: add real social URLs in site-config.js -->' +
            '<a href="' + href + '" ' + attrs +
            ' aria-label="' + ariaKey + '"' +
            ' class="w-10 h-10 rounded-full border border-steel-grey flex items-center justify-center text-steel-grey hover:bg-accent-blue hover:text-white hover:border-accent-blue transition-all">' +
            '<i class="fa-brands ' + iconClass + '"></i></a>';
    }

    function companyDropdownHref(idx) {
        return 'index.html#company-' + (idx + 1);
    }

    function quoteHref() {
        if (currentPage() === 'contact.html') return '#contact-form-el';
        return 'contact.html?topic=quote#contact-form-el';
    }

    /* ── Header HTML ── */
    function headerHTML() {
        var page = currentPage();
        var companyLinks = '';
        C.companies.forEach(function (co, i) {
            companyLinks += '<a href="' + companyDropdownHref(i) +
                '" class="block px-4 py-2 text-xs hover:bg-blue-50 hover:text-accent-blue focus:bg-blue-50 focus:text-accent-blue focus:outline-none" data-i18n="' + co.key + '">' +
                co.name + '</a>';
        });

        // Mobile company links
        var mobileCompanyLinks = '';
        C.companies.forEach(function (co, i) {
            mobileCompanyLinks += '<a href="' + companyDropdownHref(i) +
                '" class="text-xs text-steel-grey hover:text-accent-blue" data-i18n="' + co.key + '">' +
                co.name + '</a>';
        });

        // Desktop nav links
        var desktopNav = '';
        C.menu.forEach(function (item) {
            if (item.key === 'menu_group') {
                // Group Companies dropdown
                var active = isActive('index.html') && window.location.hash === '#group-companies';
                desktopNav += '<div class="relative group" id="desktop-group-dropdown">' +
                    '<a href="index.html#group-companies" class="flex items-center hover:text-accent-blue transition-all py-1 text-center leading-tight focus:outline-none focus:ring-2 focus:ring-accent-blue focus:ring-offset-2 rounded">' +
                    '<span data-i18n="menu_group" class="">Group<br>Companies</span>' +
                    '<i class="fa-solid fa-chevron-down ml-1.5 text-[10px]"></i></a>' +
                    '<div class="absolute left-0 mt-2 w-72 bg-white shadow-xl rounded-lg py-2 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all transform origin-top scale-95 group-hover:scale-100 border border-gray-100 z-50" role="menu">' +
                    companyLinks + '</div></div>';
            } else {
                var act = isActive(item.file);
                var cls = act
                    ? 'text-corporate-blue font-semibold border-b-2 border-corporate-blue'
                    : 'hover:text-accent-blue';
                var aria = act ? ' aria-current="page"' : '';
                desktopNav += '<a href="' + item.file + '" class="' + cls + ' transition-all py-1 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-accent-blue focus:ring-offset-2 rounded" data-i18n="' + item.key + '"' + aria + '>' +
                    (SiteLang.strings.en[item.key] || item.key) + '</a>';
            }
        });

        // Mobile nav links
        var mobileNav = '';
        C.menu.forEach(function (item) {
            if (item.key === 'menu_group') {
                mobileNav += '<div class="pl-4">' +
                    '<button class="flex items-center justify-between w-full text-steel-grey font-medium min-h-[44px] focus:outline-none focus:ring-2 focus:ring-accent-blue rounded" id="mobile-dropdown-btn" aria-expanded="false" aria-controls="mobile-dropdown-content">' +
                    '<span data-i18n="menu_group_m">Group Companies</span>' +
                    '<i class="fa-solid fa-chevron-down text-[12px] transition-transform"></i></button>' +
                    '<div id="mobile-dropdown-content" class="hidden flex flex-col space-y-3 mt-3 pl-4 border-l border-gray-100" role="menu">' +
                    mobileCompanyLinks + '</div></div>';
            } else {
                var act = isActive(item.file);
                var cls = act
                    ? 'text-corporate-blue font-bold text-lg border-l-4 border-corporate-blue pl-4'
                    : 'text-steel-grey font-medium pl-4';
                var aria = act ? ' aria-current="page"' : '';
                mobileNav += '<a href="' + item.file + '" class="' + cls + ' min-h-[44px] flex items-center focus:outline-none focus:ring-2 focus:ring-accent-blue rounded" data-i18n="' + item.key + '"' + aria + '>' +
                    (SiteLang.strings.en[item.key] || item.key) + '</a>';
            }
        });

        return '' +
            /* Top Bar */
            '<div id="top-bar" class="bg-white border-b border-gray-100 py-2">' +
            '<div class="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">' +
            '<div class="flex flex-wrap justify-center md:justify-start items-center gap-4 md:gap-6 text-[10px] font-medium text-steel-grey">' +
            '<a href="mailto:' + C.email + '" class="flex items-center hover:text-accent-blue transition-all">' +
            '<i class="fa-solid fa-envelope text-accent-blue mr-1.5"></i>' +
            '<span data-i18n="top_email">' + C.email + '</span></a>' +
            '<a href="' + C.phoneTel + '" class="flex items-center hover:text-accent-blue transition-all">' +
            '<i class="fa-solid fa-phone text-accent-blue mr-1.5"></i>' +
            '<span data-i18n="top_phone">' + C.phone + '</span></a>' +
            '<div class="flex items-center">' +
            '<i class="fa-solid fa-location-dot text-accent-blue mr-1.5"></i>' +
            '<span data-i18n="top_address">' + C.topBarAddress + '</span></div></div>' +
            '<button class="lang-toggle-btn flex items-center space-x-2 text-xs font-semibold px-3 py-1.5 rounded-full border border-gray-200 transition-all hover:border-accent-blue focus:outline-none focus:ring-2 focus:ring-accent-blue" aria-label="Switch language">' +
            '<i class="fa-solid fa-globe text-accent-blue"></i>' +
            '<span data-lang-toggle-text>EN | عربي</span></button></div></div>' +

            /* Header */
            '<header id="header" class="sticky top-0 z-50 bg-white shadow-md">' +
            '<div class="container mx-auto px-4 sm:px-6 lg:px-8">' +
            '<div class="flex justify-between items-center h-20">' +

            /* Logo */
            '<a href="index.html" class="flex items-center group" aria-label="' + C.brandName + ' - Home">' +
            '<img src="' + C.logo + '" alt="' + C.brandName + '" class="h-14 md:h-16 w-auto object-contain transition-all group-hover:scale-105"></a>' +

            /* Desktop Nav */
            '<nav class="hidden xl:flex items-center space-x-8" aria-label="Main navigation">' +
            desktopNav + '</nav>' +

            /* Quote Button (desktop) */
            '<div class="hidden xl:block">' +
            '<a href="' + quoteHref() + '" class="bg-accent-blue text-white px-5 py-2 rounded font-bold hover:bg-corporate-blue transition-all text-center leading-none flex items-center justify-center text-[11px] uppercase tracking-wider min-w-[110px] focus:outline-none focus:ring-2 focus:ring-accent-blue focus:ring-offset-2" data-i18n="btn_quote">Request<br>a Quote</a></div>' +

            /* Hamburger */
            '<button id="mobile-menu-btn" class="xl:hidden text-corporate-blue text-2xl focus:outline-none focus:ring-2 focus:ring-accent-blue rounded p-2 min-w-[44px] min-h-[44px] flex items-center justify-center" aria-label="Open main menu" aria-controls="mobile-menu" aria-expanded="false">' +
            '<i class="fa-solid fa-bars"></i></button>' +
            '</div></div>' +

            /* Mobile Menu Panel */
            '<div id="mobile-menu" class="hidden xl:hidden bg-white border-t border-gray-100 pb-6 pt-4 px-4 shadow-xl max-h-[calc(100vh-5rem)] overflow-y-auto" role="navigation" aria-label="Mobile navigation">' +
            '<div class="flex flex-col space-y-4">' +
            mobileNav +
            '<div class="pt-4 border-t border-gray-100 flex flex-col space-y-4">' +
            '<a href="' + quoteHref() + '" class="bg-accent-blue text-white text-center py-3 rounded font-semibold min-h-[44px] flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-accent-blue" data-i18n="btn_quote_m">Request a Quote</a>' +
            '<button class="lang-toggle-btn flex items-center justify-center space-x-2 text-xs font-semibold px-3 py-1.5 rounded-full border border-gray-200 transition-all hover:border-accent-blue min-h-[44px] focus:outline-none focus:ring-2 focus:ring-accent-blue" aria-label="Switch language">' +
            '<i class="fa-solid fa-globe text-accent-blue"></i>' +
            '<span data-lang-toggle-text>EN | عربي</span></button>' +
            '</div></div></div>' +
            '</header>';
    }

    /* ── Footer HTML ── */
    function footerHTML() {
        var year = new Date().getFullYear();

        // Quick Links
        var quickLinks = '';
        C.menu.forEach(function (item) {
            var href = item.file || 'index.html#group-companies';
            quickLinks += '<li><a href="' + href + '" class="hover:text-accent-blue transition-all" data-i18n="' +
                (item.key === 'menu_group' ? 'menu_group_m' : item.key) + '">' +
                (SiteLang.strings.en[item.key === 'menu_group' ? 'menu_group_m' : item.key] || '') + '</a></li>';
        });

        // Services
        var footerServices = [
            { key: 'footer_svc_1', href: 'services.html#detail-epc' },
            { key: 'footer_svc_2', href: 'services.html#detail-tanks' },
            { key: 'footer_svc_3', href: 'services.html#card-petrochem' },
            { key: 'footer_svc_4', href: 'services.html#detail-steel' },
            { key: 'footer_svc_5', href: 'services.html#card-civil' }
        ];
        var svcLinks = '';
        footerServices.forEach(function (s) {
            svcLinks += '<li><a href="' + s.href + '" class="hover:text-accent-blue transition-all" data-i18n="' + s.key + '">' +
                (SiteLang.strings.en[s.key] || s.key) + '</a></li>';
        });

        return '<footer id="footer" class="bg-corporate-blue pt-20 pb-10 text-white">' +
            '<div class="container mx-auto px-4 sm:px-6 lg:px-8">' +
            '<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">' +

            /* Brand Column */
            '<div>' +
            '<a href="index.html" class="flex items-center mb-6 group">' +
            '<img src="' + C.logo + '" alt="' + C.brandName + '" class="h-12 w-auto object-contain brightness-0 invert opacity-90 transition-all group-hover:opacity-100"></a>' +
            '<p class="text-sm text-blue-100 opacity-70 mb-8 leading-relaxed" data-i18n="footer_desc">' + SiteLang.strings.en.footer_desc + '</p>' +
            '<div class="flex space-x-4">' +
            socialLink(C.social.linkedin, 'fa-linkedin-in', 'LinkedIn') +
            socialLink(C.social.facebook, 'fa-facebook-f', 'Facebook') +
            socialLink(C.social.instagram, 'fa-instagram', 'Instagram') +
            socialLink(C.social.twitter, 'fa-twitter', 'Twitter') +
            '</div></div>' +

            /* Quick Links */
            '<div><h4 class="text-lg font-bold mb-6" data-i18n="quick_links">Quick Links</h4>' +
            '<ul class="space-y-4 text-sm text-blue-100 opacity-70">' + quickLinks + '</ul></div>' +

            /* Services */
            '<div><h4 class="text-lg font-bold mb-6" data-i18n="services_col">Services</h4>' +
            '<ul class="space-y-4 text-sm text-blue-100 opacity-70">' + svcLinks + '</ul></div>' +

            /* Contact */
            '<div><h4 class="text-lg font-bold mb-6" data-i18n="contact_col">Contact</h4>' +
            '<ul class="space-y-6 text-sm text-blue-100 opacity-70">' +
            '<li class="flex space-x-3"><i class="fa-solid fa-location-dot mt-1 text-accent-blue"></i>' +
            '<a href="contact.html#map-section" class="hover:text-accent-blue transition-all"><span data-i18n="address">' + C.footerAddress + '</span></a></li>' +
            '<li class="flex space-x-3"><i class="fa-solid fa-phone mt-1 text-accent-blue"></i>' +
            '<a href="' + C.phoneTel + '" class="hover:text-accent-blue transition-all">' + C.phone + '</a></li>' +
            '<li class="flex space-x-3"><i class="fa-solid fa-envelope mt-1 text-accent-blue"></i>' +
            '<a href="mailto:' + C.email + '" class="hover:text-accent-blue transition-all">' + C.email + '</a></li>' +
            '</ul></div>' +
            '</div>' +

            /* Bottom bar */
            '<div class="border-t border-white/10 pt-10 flex flex-col md:flex-row justify-between items-center text-xs text-blue-100 opacity-50 space-y-4 md:space-y-0">' +
            '<p data-i18n="copyright">© ' + year + ' ' + C.brandName + '. All rights reserved.</p>' +
            '<div class="flex space-x-8">' +
            '<!-- TODO: add Privacy Policy page --><a href="#" class="hover:text-white" data-i18n="privacy">Privacy Policy</a>' +
            '<!-- TODO: add Terms of Service page --><a href="#" class="hover:text-white" data-i18n="terms">Terms of Service</a>' +
            '</div></div></div></footer>';
    }

    /* ── Mount functions ── */
    function mountHeader(containerId) {
        var el = document.getElementById(containerId);
        if (!el) return;
        el.innerHTML = headerHTML();
        initMenuBehaviors();
    }

    function mountFooter(containerId) {
        var el = document.getElementById(containerId);
        if (!el) return;
        el.innerHTML = footerHTML();
    }

    /* ── Menu behaviors ── */
    function initMenuBehaviors() {
        var menuBtn = document.getElementById('mobile-menu-btn');
        var mobileMenu = document.getElementById('mobile-menu');
        var dropdownBtn = document.getElementById('mobile-dropdown-btn');
        var dropdownContent = document.getElementById('mobile-dropdown-content');

        if (!menuBtn || !mobileMenu) return;

        // Toggle mobile menu
        function openMobile() {
            mobileMenu.classList.remove('hidden');
            menuBtn.setAttribute('aria-expanded', 'true');
            menuBtn.setAttribute('aria-label', 'Close main menu');
            var icon = menuBtn.querySelector('i');
            if (icon) { icon.classList.remove('fa-bars'); icon.classList.add('fa-xmark'); }
            document.body.style.overflow = 'hidden';
        }

        function closeMobile() {
            mobileMenu.classList.add('hidden');
            menuBtn.setAttribute('aria-expanded', 'false');
            menuBtn.setAttribute('aria-label', 'Open main menu');
            var icon = menuBtn.querySelector('i');
            if (icon) { icon.classList.remove('fa-xmark'); icon.classList.add('fa-bars'); }
            document.body.style.overflow = '';
        }

        menuBtn.addEventListener('click', function () {
            var isOpen = menuBtn.getAttribute('aria-expanded') === 'true';
            isOpen ? closeMobile() : openMobile();
        });

        // Close on link click inside mobile menu
        mobileMenu.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', closeMobile);
        });

        // Close on Escape
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                closeMobile();
                // Also close desktop dropdown
                closeDesktopDropdown();
            }
        });

        // Close on outside click
        document.addEventListener('click', function (e) {
            if (!mobileMenu.contains(e.target) && !menuBtn.contains(e.target)) {
                if (menuBtn.getAttribute('aria-expanded') === 'true') closeMobile();
            }
        });

        // Close on resize to xl
        var mql = window.matchMedia('(min-width: 1280px)');
        function handleResize(e) {
            if (e.matches) closeMobile();
        }
        if (mql.addEventListener) {
            mql.addEventListener('change', handleResize);
        } else if (mql.addListener) {
            mql.addListener(handleResize);
        }

        // Mobile accordion
        if (dropdownBtn && dropdownContent) {
            dropdownBtn.addEventListener('click', function () {
                var open = dropdownContent.classList.contains('hidden');
                dropdownContent.classList.toggle('hidden');
                dropdownBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
                var chevron = dropdownBtn.querySelector('i');
                if (chevron) chevron.classList.toggle('rotate-180');
            });
        }

        // Desktop dropdown: also handle click for touch laptops, Escape, outside click
        var desktopDD = document.getElementById('desktop-group-dropdown');
        if (desktopDD) {
            var ddMenu = desktopDD.querySelector('[role="menu"]');
            var ddTrigger = desktopDD.querySelector('a');

            // Track if shown via click
            var clickOpen = false;

            function showDesktopDropdown() {
                if (ddMenu) {
                    ddMenu.classList.remove('invisible', 'opacity-0', 'scale-95');
                    ddMenu.classList.add('visible', 'opacity-100', 'scale-100');
                }
                clickOpen = true;
            }
            function closeDesktopDropdown() {
                if (ddMenu) {
                    ddMenu.classList.add('invisible', 'opacity-0', 'scale-95');
                    ddMenu.classList.remove('visible', 'opacity-100', 'scale-100');
                }
                clickOpen = false;
            }

            // Click/tap to toggle
            if (ddTrigger) {
                ddTrigger.addEventListener('click', function (e) {
                    // On current page (index.html), let the hash navigation happen but also toggle
                    if (clickOpen) {
                        closeDesktopDropdown();
                    } else {
                        showDesktopDropdown();
                    }
                });
            }

            // Close on outside click
            document.addEventListener('click', function (e) {
                if (clickOpen && !desktopDD.contains(e.target)) {
                    closeDesktopDropdown();
                }
            });

            // Make it available globally for Escape handler
            window._closeDesktopDropdown = closeDesktopDropdown;
        }

        // Language toggle buttons (all of them)
        document.querySelectorAll('.lang-toggle-btn').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var cur = SiteLang.get();
                SiteLang.set(cur === 'en' ? 'ar' : 'en');
            });
        });

        // Handle ?topic=quote on contact.html
        if (currentPage() === 'contact.html') {
            var params = new URLSearchParams(window.location.search);
            if (params.get('topic') === 'quote') {
                var serviceSelect = document.getElementById('c-service');
                if (serviceSelect) {
                    // Try to select quote/general-inquiry option
                    for (var i = 0; i < serviceSelect.options.length; i++) {
                        var opt = serviceSelect.options[i];
                        if (opt.value === 'quote' || opt.value === 'general-inquiry' ||
                            opt.value.toLowerCase().indexOf('general') !== -1 ||
                            opt.value.toLowerCase().indexOf('quote') !== -1) {
                            serviceSelect.selectedIndex = i;
                            break;
                        }
                    }
                }
                var formEl = document.getElementById('contact-form-el');
                var firstField = document.getElementById('c-first');
                if (formEl) {
                    setTimeout(function() {
                        formEl.scrollIntoView({ behavior: 'smooth' });
                        if (firstField) firstField.focus();
                    }, 300);
                }
            }
        }

        // Handle ?cat= filter on projects.html
        if (currentPage() === 'projects.html') {
            var params = new URLSearchParams(window.location.search);
            var cat = params.get('cat');
            if (cat) {
                setTimeout(function () {
                    var filterBtn = document.querySelector('[data-filter="' + cat + '"]');
                    if (filterBtn) {
                        filterBtn.click();
                        var filterSection = document.getElementById('project-filters');
                        if (filterSection) filterSection.scrollIntoView({ behavior: 'smooth' });
                    }
                }, 500);
            }
        }

        // Handle company card highlight on index.html via hash
        if (currentPage() === 'index.html') {
            function highlightCompanyCard() {
                var hash = window.location.hash;
                if (hash && hash.match(/^#company-\d+$/)) {
                    var card = document.getElementById(hash.substring(1));
                    if (card) {
                        card.classList.add('ring-2', 'ring-accent-blue');
                        setTimeout(function () {
                            card.classList.remove('ring-2', 'ring-accent-blue');
                        }, 2000);
                    }
                }
            }
            // Run on load and on hash change
            window.addEventListener('hashchange', highlightCompanyCard);
            setTimeout(highlightCompanyCard, 300);
        }
    }

    function closeDesktopDropdown() {
        if (window._closeDesktopDropdown) window._closeDesktopDropdown();
    }

    return {
        mountHeader: mountHeader,
        mountFooter: mountFooter
    };
})();

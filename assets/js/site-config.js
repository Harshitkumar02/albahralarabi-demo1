/**
 * SITE_CONFIG – Single source of truth for Al Bahr Al Arabi Group website.
 * Edit values here and they propagate to every page automatically.
 */
var SITE_CONFIG = {
    brandName: 'Al Bahr Al Arabi Group',
    logo: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/gen_745f0de433_ae400837bc0fe4a4.png',
    email: 'info@albahralarabi.com',
    phone: '+971 65260602',
    phoneTel: 'tel:+97165260602',
    topBarAddress: 'FF3P+WFG Al Hamriyah Free Zone - Sharjah - UAE',
    footerAddress: 'Hamriyah Free Zone, Sharjah, UAE',
    whatsapp: 'https://wa.me/97165260602',
    brochureUrl: 'assets/albahralarabi-company-profile.pdf',

    /* TODO: add real social URLs in site-config.js */
    social: {
        linkedin: '',
        facebook: '',
        instagram: '',
        twitter: ''
    },

    companies: [
        { key: 'company_1', name: 'Al Bahr Al Arabi Marine Engineering-UAE', icon: 'fa-ship', url: null },
        { key: 'company_2', name: 'Al Bahr Al Arabi Technical Industries FZC-UAE', icon: 'fa-industry', url: null },
        { key: 'company_3', name: 'Gulf Tech Energy Contracting LLC-UAE', icon: 'fa-bolt', url: null },
        { key: 'company_4', name: 'Crystal Petroleum FZE-UAE', icon: 'fa-gas-pump', url: 'https://www.crystal-petroleum.com' },
        { key: 'company_5', name: 'Crystal Petrochemicals FZCO-UAE', icon: 'fa-flask-vial', url: null },
        { key: 'company_6', name: 'Crystal Petrokimya-Turkey', icon: 'fa-earth-europe', url: 'https://www.crystalpetrokimya.com' },
        { key: 'company_7', name: 'Crystal Care Ltd-KSA', icon: 'fa-hand-holding-heart', url: null },
        { key: 'company_8', name: 'Meecon LTD-UK', icon: 'fa-tower-observation', url: null },
        { key: 'company_9', name: 'Crystal Oilfield Constr & Cont. LLC-Qatar', icon: 'fa-trowel-bricks', url: 'https://www.crystaloilfield.qa' }
    ],

    menu: [
        { key: 'menu_home', file: 'index.html' },
        { key: 'menu_about', file: 'about.html' },
        { key: 'menu_group', file: null },          // dropdown, links to index.html#group-companies
        { key: 'menu_services', file: 'services.html' },
        { key: 'menu_projects', file: 'projects.html' },
        { key: 'menu_media', file: 'media-center.html' },
        { key: 'menu_careers', file: 'careers.html' },
        { key: 'menu_contact', file: 'contact.html' }
    ]
};

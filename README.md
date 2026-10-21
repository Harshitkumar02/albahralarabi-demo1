# Al Bahr Al Arabi Group - Official Website

Unified, bilingual (English & Arabic) static website for Al Bahr Al Arabi Group.

## Pages
- `index.html` - Home
- `about.html` - About Us
- `services.html` - Services & Capabilities
- `projects.html` - Project Portfolio (26 projects with interactive filters)
- `media-center.html` - Media Center & Gallery
- `careers.html` - Careers & Job Openings
- `contact.html` - Contact & Locations

## Architecture
- **No build step required**: Plain static HTML, Tailwind CSS (CDN), Font Awesome 6.5.2, Google Fonts (Inter & Cairo).
- `assets/js/site-config.js` - Single source of truth for group metadata, company entities, contacts, and links.
- `assets/js/site-i18n.js` - Unified `SiteLang` i18n engine with persistent English and Arabic language toggling.
- `assets/js/layout.js` - Unified header and footer mounting, responsive navigation, active page highlighting, and URL parameter handling.
- `assets/albahralarabi-company-profile.pdf` - Corporate profile brochure.

## Deploying to Vercel

### Option 1: Drag & Drop via Web Dashboard
1. Go to [vercel.com/new](https://vercel.com/new).
2. Drag and drop this project folder directly into the dashboard.
3. Click **Deploy**.

### Option 2: Via Git (GitHub / GitLab / Bitbucket)
1. Push this folder to a Git repository.
2. In Vercel, import the repository.
3. Framework Preset: **Other**.
4. Root Directory: `./` (leave default).
5. Click **Deploy**.

### Option 3: Via Vercel CLI
```bash
npm i -g vercel
vercel
```

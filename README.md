# Survade Landing Page

A modern, vibrant landing page for Survade - Your Personal SDR for High-Quality Leads. Built for marketing freelancers and small agency owners.

## Overview

Survade democratizes lead generation by providing freelancers with the same powerful tools and best practices that agencies use, making it accessible and affordable for solo marketers.

### Target Audience
- Content Strategists
- SEO Marketers
- Ecommerce Managers
- Social Media Managers
- Ads Strategists

## Features

- **Modern Design**: Bold, vibrant gradient-based design with smooth animations
- **Fully Responsive**: Works seamlessly on desktop, tablet, and mobile devices
- **Scroll Animations**: Engaging scroll-triggered animations using Intersection Observer
- **Waitlist Form**: Built-in email collection with validation
- **SEO Optimized**: Semantic HTML with proper meta tags
- **Performance Optimized**: Lightweight, vanilla JavaScript with no dependencies
- **Accessible**: WCAG compliant with proper focus states and reduced motion support

## Project Structure

```
survade-site/
├── index.html          # Main HTML file
├── styles.css          # All styling and animations
├── script.js           # Interactive functionality
├── .gitignore          # Git ignore rules
└── README.md           # This file
```

## Deployment to GitHub Pages

### Option 1: Deploy from Main Branch (Recommended)

1. **Push your code to GitHub**:
   ```bash
   git add .
   git commit -m "Initial landing page setup"
   git push origin main
   ```

2. **Enable GitHub Pages**:
   - Go to your repository on GitHub
   - Click on **Settings**
   - Scroll down to **Pages** section (left sidebar)
   - Under **Source**, select:
     - Branch: `main`
     - Folder: `/ (root)`
   - Click **Save**

3. **Access your site**:
   - Your site will be live at: `https://ritvikPuranik.github.io/survade-site/`
   - It may take a few minutes for the first deployment

### Option 2: Custom Domain (survade.live)

1. **Add CNAME record in your domain registrar**:
   - Type: `CNAME`
   - Name: `@` (or `www`)
   - Value: `ritvikPuranik.github.io`

2. **Create CNAME file** in your repository:
   ```bash
   echo "survade.live" > CNAME
   git add CNAME
   git commit -m "Add custom domain"
   git push
   ```

3. **Configure in GitHub**:
   - Go to repository Settings → Pages
   - Under **Custom domain**, enter: `survade.live`
   - Check **Enforce HTTPS** (wait for SSL certificate to provision)

## Setting Up Form Submissions

The waitlist form currently uses a simulated submission. To collect real leads, choose one of these options:

### Option 1: Formspree (Easiest)

1. Sign up at [Formspree.io](https://formspree.io/)
2. Create a new form
3. Update `script.js` line 120-134 with your Formspree endpoint:
   ```javascript
   const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify(formData)
   });
   ```

### Option 2: Google Forms

1. Create a Google Form with fields: Name, Email, Specialty
2. Get the form URL and entry IDs
3. Update `script.js` with the Google Forms endpoint (see comments in script.js)

### Option 3: Custom Backend API

1. Create your own API endpoint
2. Update `script.js` to POST to your endpoint (see comments in script.js)
3. Consider using services like:
   - Netlify Functions
   - Vercel Serverless Functions
   - Firebase
   - Supabase

### Option 4: Email Services

Integrate with email marketing platforms:
- **Mailchimp**: Use their API to add subscribers
- **ConvertKit**: Use embedded forms
- **EmailOctopus**: Use their API

## Local Development

To run locally:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/ritvikPuranik/survade-site.git
   cd survade-site
   ```

2. **Open in browser**:
   - Simply open `index.html` in your browser, or
   - Use a local server (recommended):
   ```bash
   # Python 3
   python -m http.server 8000

   # Python 2
   python -m SimpleHTTPServer 8000

   # Node.js (if you have npx)
   npx serve
   ```

3. **View your site**:
   - Navigate to `http://localhost:8000`

## Customization

### Colors

Edit CSS variables in `styles.css` (lines 8-14):
```css
:root {
    --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    --secondary-gradient: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    /* ... more colors */
}
```

### Content

All content is in `index.html`. Key sections:
- **Hero** (line 17): Main headline and CTA
- **Features** (line 67): Feature cards
- **Testimonials** (line 142): Social proof
- **Waitlist** (line 182): Form section

### Animations

Animations are defined in `styles.css` and triggered by `script.js` using Intersection Observer.

## Analytics

To add Google Analytics:

1. Add this before closing `</head>` in `index.html`:
   ```html
   <!-- Google Analytics -->
   <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'GA_MEASUREMENT_ID');
   </script>
   ```

2. Replace `GA_MEASUREMENT_ID` with your actual Google Analytics ID

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- No external dependencies
- Vanilla JavaScript
- CSS animations with GPU acceleration
- Lazy-loaded animations
- Optimized for Core Web Vitals

## License

Copyright 2025 Survade. All rights reserved.

## Support

For issues or questions:
- Open an issue on GitHub
- Contact: [your-email@example.com]

## Roadmap

- [ ] Add blog section
- [ ] Integrate real form backend
- [ ] Add more testimonials
- [ ] Create demo video
- [ ] Add pricing page
- [ ] Multi-language support

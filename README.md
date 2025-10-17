# My Custom Website

A modern, responsive website built for GitHub Pages deployment. This sample website features a clean design, smooth animations, and mobile-first responsive layout.

## 🚀 Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern UI**: Clean, professional design with smooth animations
- **Interactive Elements**: Mobile navigation, form handling, and scroll effects
- **Fast Loading**: Optimized for performance and speed
- **Accessible**: Built with accessibility best practices
- **Easy to Customize**: Well-structured code that's easy to modify

## 📁 Project Structure

```
├── index.html          # Main HTML file
├── styles.css          # CSS styles and responsive design
├── script.js           # JavaScript for interactivity
└── README.md           # This file
```

## 🎨 Sections

- **Hero Section**: Eye-catching introduction with call-to-action buttons
- **About Section**: Information about the website with animated statistics
- **Services Section**: Feature cards highlighting key benefits
- **Contact Section**: Contact form and information
- **Footer**: Links and social media icons

## 🚀 Deployment to GitHub Pages

### Method 1: Automatic Deployment (Recommended)

1. **Push your code to GitHub**:
   ```bash
   git add .
   git commit -m "Add sample website"
   git push origin main
   ```

2. **Enable GitHub Pages**:
   - Go to your repository on GitHub
   - Click on "Settings" tab
   - Scroll down to "Pages" section
   - Under "Source", select "Deploy from a branch"
   - Choose "main" branch and "/ (root)" folder
   - Click "Save"

3. **Access your website**:
   - Your website will be available at: `https://yourusername.github.io`
   - It may take a few minutes to deploy

### Method 2: Using GitHub Actions (Advanced)

1. Create a `.github/workflows/deploy.yml` file:
   ```yaml
   name: Deploy to GitHub Pages
   
   on:
     push:
       branches: [ main ]
   
   jobs:
     deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v2
         - name: Deploy to GitHub Pages
           uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./
   ```

## 🛠️ Customization

### Changing Colors
Edit the CSS variables in `styles.css`:
```css
:root {
  --primary-color: #6366f1;
  --secondary-color: #8b5cf6;
  --text-color: #333;
  --bg-color: #f8fafc;
}
```

### Adding Your Content
1. **Update the hero section** in `index.html`:
   ```html
   <h1 class="hero-title">Your Website Title</h1>
   <p class="hero-description">Your description here</p>
   ```

2. **Modify contact information**:
   - Update email, phone, and location in the contact section
   - Customize the contact form fields

3. **Add your own sections**:
   - Copy existing section structure
   - Modify content and styling as needed

### Adding Images
1. Create an `images` folder
2. Add your images
3. Update the HTML to reference your images:
   ```html
   <img src="images/your-image.jpg" alt="Description">
   ```

## 📱 Mobile Responsiveness

The website is fully responsive and includes:
- Mobile-first CSS design
- Hamburger menu for mobile navigation
- Touch-friendly buttons and links
- Optimized typography for all screen sizes

## 🎯 Performance Tips

- Images are optimized for web
- CSS and JavaScript are minified-ready
- Uses modern CSS Grid and Flexbox
- Implements lazy loading for animations

## 🔧 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Feel free to fork this project and customize it for your own needs. If you make improvements, consider submitting a pull request!

## 📞 Support

If you have any questions or need help customizing this website, feel free to open an issue or contact me.

---

**Happy coding! 🎉**
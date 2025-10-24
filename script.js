// Minimal JavaScript for the layered background website

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Website loaded with layered background');
    
    // Add a simple fade-in effect for the content
    const content = document.querySelector('.content');
    if (content) {
        content.style.opacity = '0';
        content.style.transition = 'opacity 1s ease-in-out';
        
        setTimeout(() => {
            content.style.opacity = '1';
        }, 500);
    }
});

// Simple click effect for the content
document.querySelector('.content').addEventListener('click', function() {
    this.style.transform = 'scale(1.05)';
    this.style.transition = 'transform 0.3s ease';
    
    setTimeout(() => {
        this.style.transform = 'scale(1)';
    }, 300);
});
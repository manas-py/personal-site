// Simple parallax effect for background layers
document.addEventListener('DOMContentLoaded', function() {
    const bottomLayer = document.querySelector('.bottom-layer');
    const topLayer = document.querySelector('.top-layer');
    const overlayLayer = document.querySelector('.overlay-layer');
    
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!prefersReducedMotion) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate1 = scrolled * -0.5;
            const rate2 = scrolled * -0.3;
            const rate3 = scrolled * -0.1;
            
            if (bottomLayer) {
                bottomLayer.style.transform = `translateY(${rate1}px)`;
            }
            if (topLayer) {
                topLayer.style.transform = `translateY(${rate2}px)`;
            }
            if (overlayLayer) {
                overlayLayer.style.transform = `translateY(${rate3}px)`;
            }
        });
    }
    
    // Add smooth fade-in animation for content
    const content = document.querySelector('.content');
    if (content) {
        content.style.opacity = '0';
        content.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            content.style.transition = 'opacity 1s ease, transform 1s ease';
            content.style.opacity = '1';
            content.style.transform = 'translateY(0)';
        }, 100);
    }
    
    // Console message
    console.log('🎨 Layered background website loaded successfully!');
});

// Handle window resize to maintain proper layering
window.addEventListener('resize', function() {
    // Force a repaint to ensure layers maintain proper positioning
    const layers = document.querySelectorAll('.layer');
    layers.forEach(layer => {
        layer.style.transform = layer.style.transform;
    });
});

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Add any keyboard shortcuts here if needed
    if (e.key === 'r' && e.ctrlKey) {
        e.preventDefault();
        location.reload();
    }
});
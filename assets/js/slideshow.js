// Hero Slideshow Functionality
class HeroSlideshow {
    constructor() {
        this.slides = document.querySelectorAll('.slide');
        this.dots = document.querySelectorAll('.dot');
        this.prevBtn = document.querySelector('.slide-prev');
        this.nextBtn = document.querySelector('.slide-next');
        this.currentSlide = 0;
        this.slideInterval = null;
        this.slideDuration = 5000; // 5 seconds per slide
        
        this.init();
    }
    
    init() {
        // Start autoplay
        this.startAutoplay();
        
        // Event listeners for manual controls
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        // Dot navigation
        this.dots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                const slideIndex = parseInt(e.target.dataset.slide);
                this.goToSlide(slideIndex);
            });
        });
        
        // Pause on hover
        const slideshow = document.querySelector('.hero-slideshow');
        slideshow.addEventListener('mouseenter', () => this.stopAutoplay());
        slideshow.addEventListener('mouseleave', () => this.startAutoplay());
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prevSlide();
            if (e.key === 'ArrowRight') this.nextSlide();
        });
        
        // Touch swipe support for mobile
        this.addTouchSupport();
    }
    
    showSlide(index) {
        // Hide all slides
        this.slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Remove active class from all dots
        this.dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show current slide
        this.slides[index].classList.add('active');
        this.dots[index].classList.add('active');
        this.currentSlide = index;
    }
    
    nextSlide() {
        let nextIndex = this.currentSlide + 1;
        if (nextIndex >= this.slides.length) {
            nextIndex = 0;
        }
        this.showSlide(nextIndex);
        this.restartAutoplay();
    }
    
    prevSlide() {
        let prevIndex = this.currentSlide - 1;
        if (prevIndex < 0) {
            prevIndex = this.slides.length - 1;
        }
        this.showSlide(prevIndex);
        this.restartAutoplay();
    }
    
    goToSlide(index) {
        if (index >= 0 && index < this.slides.length) {
            this.showSlide(index);
            this.restartAutoplay();
        }
    }
    
    startAutoplay() {
        if (this.slideInterval) return;
        
        this.slideInterval = setInterval(() => {
            this.nextSlide();
        }, this.slideDuration);
    }
    
    stopAutoplay() {
        if (this.slideInterval) {
            clearInterval(this.slideInterval);
            this.slideInterval = null;
        }
    }
    
    restartAutoplay() {
        this.stopAutoplay();
        this.startAutoplay();
    }
    
    addTouchSupport() {
        const slideshow = document.querySelector('.hero-slideshow');
        let touchStartX = 0;
        let touchEndX = 0;
        
        slideshow.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        slideshow.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe(touchStartX, touchEndX);
        }, { passive: true });
    }
    
    handleSwipe(startX, endX) {
        const minSwipeDistance = 50;
        
        if (startX - endX > minSwipeDistance) {
            // Swipe left - next slide
            this.nextSlide();
        } else if (endX - startX > minSwipeDistance) {
            // Swipe right - previous slide
            this.prevSlide();
        }
    }
}

// Initialize slideshow when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new HeroSlideshow();
});
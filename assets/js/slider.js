    scroll(direction) {
        const scrollAmount = this.options.itemWidth + this.options.gap;
        const currentScroll = this.container.scrollLeft;
        const targetScroll = currentScroll + (scrollAmount * direction);
        
        this.container.scrollTo({
            left: targetScroll,
            behavior: 'smooth'
        });
    }
}

// ===== 슬라이더 유틸리티 함수 =====

// 모든 슬라이더 일시정지 (페이지 숨김 시)
document.addEventListener('visibilitychange', function() {
    const sliders = document.querySelectorAll('.hero-slider');
    sliders.forEach(sliderElement => {
        const sliderInstance = sliderElement.sliderInstance;
        if (sliderInstance) {
            if (document.hidden) {
                sliderInstance.pauseAutoplay();
            } else {
                sliderInstance.resumeAutoplay();
            }
        }
    });
});

// 슬라이더 인스턴스를 DOM 요소에 저장하여 나중에 접근 가능하게 함
function attachSliderInstance(element, instance) {
    element.sliderInstance = instance;
}

// 반응형 처리
window.addEventListener('resize', MuseumApp.debounce(function() {
    // 슬라이더 크기 재조정
    const heroSlider = document.getElementById('hero-slider');
    if (heroSlider && heroSlider.sliderInstance) {
        // 필요시 슬라이더 재초기화
    }
}, 250));

// 슬라이더 성능 최적화
function optimizeSliders() {
    // 화면에 보이지 않는 슬라이더는 일시정지
    const sliders = document.querySelectorAll('[id$="-slider"]');
    
    if ('IntersectionObserver' in window) {
        const sliderObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const sliderInstance = entry.target.sliderInstance;
                if (sliderInstance) {
                    if (entry.isIntersecting) {
                        sliderInstance.resumeAutoplay();
                    } else {
                        sliderInstance.pauseAutoplay();
                    }
                }
            });
        }, {
            threshold: 0.1
        });
        
        sliders.forEach(slider => {
            sliderObserver.observe(slider);
        });
    }
}

// 페이지 로드 후 성능 최적화 실행
window.addEventListener('load', optimizeSliders);

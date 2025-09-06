        @keyframes slideInLeft {
            from {
                opacity: 0;
                transform: translateX(-30px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        .section-visible {
            animation: fadeInUp 0.8s ease-out forwards;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(40px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .success-message {
            animation: slideInRight 0.3s ease-out;
            transition: all 0.3s ease;
        }
        
        @keyframes slideInRight {
            from {
                opacity: 0;
                transform: translateX(100%);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        /* 폼 에러 스타일 */
        .form-group input.error,
        .form-group textarea.error,
        .form-group select.error {
            border-color: #dc2626;
            box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
        }
        
        /* 카드 호버 효과 개선 */
        .research-card {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .member-card .member-details {
            max-height: 0;
            opacity: 0;
            overflow: hidden;
            transition: all 0.3s ease;
        }
        
        /* 데이터 노드 연결선 효과 */
        .data-visualization::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 200px;
            height: 200px;
            border: 2px solid rgba(255, 255, 255, 0.1);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            animation: rotate 20s linear infinite;
        }
        
        @keyframes rotate {
            from { transform: translate(-50%, -50%) rotate(0deg); }
            to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        
        /* 뉴스 카드 스타거드 애니메이션 */
        .news-card {
            animation-delay: var(--animation-delay, 0s);
        }
        
        /* 스크롤바 커스터마이징 */
        ::-webkit-scrollbar {
            width: 8px;
        }
        
        ::-webkit-scrollbar-track {
            background: var(--light-gray);
        }
        
        ::-webkit-scrollbar-thumb {
            background: var(--primary-blue);
            border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
            background: var(--primary-dark-blue);
        }
    `;
    document.head.appendChild(style);
}

// ===== 키보드 네비게이션 개선 =====
function enhanceKeyboardNavigation() {
    // 연구 분야 카드 키보드 탐색
    const researchCards = document.querySelectorAll('.research-card');
    researchCards.forEach((card, index) => {
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', `${card.querySelector('h3').textContent} 연구 분야 상세보기`);
        
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // 팀 멤버 카드 키보드 탐색
    const memberCards = document.querySelectorAll('.member-card');
    memberCards.forEach(card => {
        card.setAttribute('tabindex', '0');
        
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                // 마우스 호버 효과를 키보드로도 트리거
                const event = new Event('mouseenter');
                this.dispatchEvent(event);
            }
        });
        
        card.addEventListener('blur', function() {
            const event = new Event('mouseleave');
            this.dispatchEvent(event);
        });
    });
}

// ===== 데이터 저장 및 분석 =====
function trackLabInteractions() {
    // 연구 분야 관심도 추적
    const researchCards = document.querySelectorAll('.research-card');
    researchCards.forEach(card => {
        card.addEventListener('click', function() {
            const researchArea = this.querySelector('h3').textContent;
            console.log(`연구 분야 관심: ${researchArea}`);
            
            // 로컬 스토리지에 저장
            const interests = MuseumApp.storage.get('researchInterests') || [];
            if (!interests.includes(researchArea)) {
                interests.push(researchArea);
                MuseumApp.storage.set('researchInterests', interests);
            }
        });
    });
    
    // 페이지 체류 시간 측정
    const startTime = Date.now();
    
    window.addEventListener('beforeunload', function() {
        const stayTime = Date.now() - startTime;
        console.log(`페이지 체류 시간: ${Math.round(stayTime / 1000)}초`);
        
        // 분석 데이터 저장
        const analyticsData = {
            timestamp: new Date().toISOString(),
            stayTime: stayTime,
            scrollDepth: getScrollDepth(),
            interests: MuseumApp.storage.get('researchInterests') || []
        };
        
        MuseumApp.storage.set('lastVisit', analyticsData);
    });
}

// 스크롤 깊이 계산
function getScrollDepth() {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    return Math.round((scrollTop / docHeight) * 100);
}

// ===== 성능 최적화 =====
function optimizeLabPerformance() {
    // 이미지 지연 로딩 (팀 멤버 사진)
    const memberPhotos = document.querySelectorAll('.member-photo img');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    
                    // 실제 이미지가 없을 때 플레이스홀더 표시
                    img.addEventListener('error', function() {
                        this.style.display = 'none';
                        const placeholder = document.createElement('div');
                        placeholder.style.cssText = `
                            width: 100%;
                            height: 100%;
                            background: linear-gradient(135deg, #1e40af, #3b82f6);
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            color: white;
                            font-size: 2rem;
                            font-weight: 600;
                        `;
                        
                        const name = this.alt.split(' ')[0];
                        placeholder.textContent = name.charAt(0);
                        
                        this.parentNode.appendChild(placeholder);
                    });
                    
                    imageObserver.unobserve(img);
                }
            });
        });
        
        memberPhotos.forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // 애니메이션 최적화
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (prefersReducedMotion.matches) {
        document.body.classList.add('reduced-motion');
    }
}

// ===== 초기화 =====
// 스타일 추가
addLabAnimationStyles();

// 키보드 네비게이션 개선
enhanceKeyboardNavigation();

// 인터랙션 추적
trackLabInteractions();

// 성능 최적화
optimizeLabPerformance();

// 전역 객체에 연구실 기능 추가
window.LabFeatures = {
    trackContactFormSubmission,
    getScrollDepth,
    showSuccessMessage
};

console.log('🎯 연구실 전용 기능이 모두 로드되었습니다.');

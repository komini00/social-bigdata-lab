// ===== 개선된 네비게이션 및 링크 기능 =====

document.addEventListener('DOMContentLoaded', function() {
    console.log('🔗 링크 기능이 초기화되었습니다.');
    
    // 기존 초기화 함수들
    initializeApp();
    initializeLazyLoading();
    initializeScrollAnimations();
    initializeKeyboardNavigation();
    
    // 새로운 링크 기능 추가
    initializeInternalLinks();
    initializeButtonActions();
    initializeCardClicks();
});

// ===== 내부 링크 개선 =====
function initializeInternalLinks() {
    // 앵커 링크 스무스 스크롤 개선
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').slice(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                // 헤더 높이 계산
                const header = document.querySelector('.header');
                const headerHeight = header ? header.offsetHeight : 0;
                const offset = headerHeight + 20; // 20px 추가 여백
                
                // 스무스 스크롤 실행
                const targetPosition = targetElement.offsetTop - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // 모바일 메뉴 닫기
                const mainNav = document.querySelector('.main-nav');
                const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
                if (mainNav && mainNav.classList.contains('mobile-open')) {
                    mainNav.classList.remove('mobile-open');
                    if (mobileMenuToggle) {
                        mobileMenuToggle.setAttribute('aria-expanded', 'false');
                        mobileMenuToggle.classList.remove('active');
                    }
                }
                
                // 활성 네비게이션 표시
                updateActiveNavigation(targetId);
                
                console.log(`✅ 스크롤 이동: ${targetId}`);
            } else {
                console.warn(`❌ 대상을 찾을 수 없습니다: ${targetId}`);
            }
        });
    });
}

// ===== 버튼 액션 구현 =====
function initializeButtonActions() {
    // "연구실 둘러보기" 버튼
    const exploreBtn = document.querySelector('a[href="#about"]');
    if (exploreBtn) {
        exploreBtn.addEventListener('click', function() {
            console.log('🔬 연구실 둘러보기 클릭됨');
            showNotification('연구실 소개 섹션으로 이동합니다', 'info');
        });
    }
    
    // "분석 자문 문의" 버튼  
    const consultingBtn = document.querySelector('a[href="#consulting"]');
    if (consultingBtn) {
        consultingBtn.addEventListener('click', function() {
            console.log('💼 분석 자문 문의 클릭됨');
            showNotification('분석 자문 섹션으로 이동합니다', 'info');
        });
    }
    
    // "연구실 문의" 버튼
    const contactBtn = document.querySelector('.btn-contact');
    if (contactBtn) {
        contactBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 연락처 섹션으로 스크롤
            const contactSection = document.querySelector('.contact-section');
            if (contactSection) {
                contactSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // 문의 폼에 포커스
                setTimeout(() => {
                    const nameInput = document.querySelector('#name');
                    if (nameInput) {
                        nameInput.focus();
                    }
                }, 800);
                
                showNotification('문의 폼으로 이동합니다', 'success');
            }
            
            console.log('📞 연구실 문의 버튼 클릭됨');
        });
    }
}

// ===== 카드 클릭 기능 =====
function initializeCardClicks() {
    // 연구 분야 카드 클릭
    const researchCards = document.querySelectorAll('.research-card');
    researchCards.forEach((card, index) => {
        card.style.cursor = 'pointer';
        card.setAttribute('tabindex', '0');
        
        card.addEventListener('click', function() {
            const cardTitle = this.querySelector('h3').textContent;
            
            // 상세 정보 모달 (향후 구현을 위한 준비)
            showResearchDetail(cardTitle, index);
            
            console.log(`🔬 연구 분야 클릭: ${cardTitle}`);
        });
        
        // 키보드 접근성
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // 뉴스 카드 클릭
    const newsCards = document.querySelectorAll('.news-card');
    newsCards.forEach((card, index) => {
        card.style.cursor = 'pointer';
        card.setAttribute('tabindex', '0');
        
        card.addEventListener('click', function() {
            const newsTitle = this.querySelector('h3').textContent;
            showNewsDetail(newsTitle, index);
            
            console.log(`📰 뉴스 클릭: ${newsTitle}`);
        });
        
        // 키보드 접근성
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // 팀 멤버 카드 클릭
    const memberCards = document.querySelectorAll('.member-card');
    memberCards.forEach((card, index) => {
        card.style.cursor = 'pointer';
        card.setAttribute('tabindex', '0');
        
        card.addEventListener('click', function() {
            const memberName = this.querySelector('h4').textContent;
            showMemberDetail(memberName, index);
            
            console.log(`👤 팀 멤버 클릭: ${memberName}`);
        });
    });
}

// ===== 상세 정보 표시 함수들 =====
function showResearchDetail(title, index) {
    const researchDetails = [
        {
            title: "소비자 인식 및 트렌드 분석",
            description: "소셜 미디어와 온라인 리뷰 데이터를 통해 브랜드 인식과 사회적 이슈에 대한 대중의 반응을 분석합니다.",
            methods: ["텍스트 마이닝", "감성 분석", "의미연결망 분석"],
            applications: ["브랜드 모니터링", "위기 관리", "마케팅 전략"]
        },
        {
            title: "항공/관광 산업 분석", 
            description: "포스트 코로나 시대의 항공사 서비스 품질과 관광 트렌드를 빅데이터로 분석합니다.",
            methods: ["빅데이터 분석", "서비스 품질 측정", "ESG 평가"],
            applications: ["서비스 개선", "경쟁력 분석", "지속가능경영"]
        },
        {
            title: "하이브리드 추천 시스템 개발",
            description: "사용자의 감성 반응과 협업 필터링을 결합한 개인 맞춤형 추천 알고리즘을 개발합니다.",
            methods: ["협업 필터링", "감성 분석", "머신러닝"],
            applications: ["관광 상품 추천", "개인화 서비스", "고객 경험 개선"]
        }
    ];
    
    const detail = researchDetails[index];
    if (detail) {
        showModal(`
            <div class="modal-header">
                <h3>${detail.title}</h3>
            </div>
            <div class="modal-body">
                <p><strong>개요:</strong> ${detail.description}</p>
                <p><strong>주요 방법론:</strong> ${detail.methods.join(', ')}</p>
                <p><strong>활용 분야:</strong> ${detail.applications.join(', ')}</p>
                <p class="modal-note">더 자세한 정보는 연구실로 문의해 주세요.</p>
            </div>
        `);
    }
}

function showNewsDetail(title, index) {
    const newsDetails = [
        {
            title: "2025년도 인문사회 신진연구자 지원사업 최종 선정",
            content: "교육부와 한국연구재단에서 주관하는 인문사회 신진연구자 지원사업에 최종 선정되어 3년간 크루즈 관광 추천시스템 연구를 수행합니다. 본 연구는 관광객의 리뷰 데이터를 AI로 분석하여 개인 맞춤형 서비스를 제공하는 것을 목표로 합니다."
        },
        {
            title: "「Chat GPT와 함께하는 대학생활」 우수도서 선정",
            content: "AI 시대 대학생들을 위한 실용적 가이드북이 한국대학출판협회 '2024 올해의 우수도서'로 선정되었습니다. 전국 대학도서관에 배포되어 학생들의 AI 활용 능력 향상에 기여할 예정입니다."
        },
        {
            title: "한국항공경영학회 최우수 논문상 수상",
            content: "항공사 ESG 경영에 대한 빅데이터 분석 연구로 한국항공경영학회 2022 추계학술대회에서 최우수 논문상을 수상했습니다. 본 연구는 일반인의 항공사 친환경 경영 인식이 기업 태도에 미치는 영향을 SOR 모형으로 분석했습니다."
        }
    ];
    
    const news = newsDetails[index];
    if (news) {
        showModal(`
            <div class="modal-header">
                <h3>${news.title}</h3>
            </div>
            <div class="modal-body">
                <p>${news.content}</p>
            </div>
        `);
    }
}

function showMemberDetail(name, index) {
    const memberDetails = [
        {
            name: "고민환 교수",
            detail: "동국대학교 WISE캠퍼스 항공서비스무역학과 교수로 재직 중이며, 텍스트 마이닝과 빅데이터 분석 분야의 전문가입니다. 경희대학교에서 관광학 박사학위를 취득했으며, 항공관광 산업의 디지털 전환과 ESG 경영 연구에 집중하고 있습니다."
        },
        {
            name: "박현아 박사", 
            detail: "호텔관광 분야의 고객 경험 분석과 서비스 품질 측정을 전문으로 하는 전임연구원입니다. 특히 온라인 리뷰 데이터를 활용한 고객 만족도 분석과 서비스 개선 방안 연구에 집중하고 있습니다."
        },
        {
            name: "이진우",
            detail: "항공사 ESG 경영에 대한 온라인 인식 분석을 주제로 석사과정을 진행 중입니다. 소셜 미디어 데이터를 활용한 기업 평판 분석과 지속가능경영 커뮤니케이션 전략 연구에 관심을 가지고 있습니다."
        }
    ];
    
    const member = memberDetails[index];
    if (member) {
        showModal(`
            <div class="modal-header">
                <h3>${member.name}</h3>
            </div>
            <div class="modal-body">
                <p>${member.detail}</p>
                <p class="modal-note">연구 협력이나 학술 교류에 관심이 있으시면 연구실로 연락해 주세요.</p>
            </div>
        `);
    }
}

// ===== 모달 시스템 =====
function showModal(content) {
    // 기존 모달 제거
    const existingModal = document.querySelector('.custom-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // 새 모달 생성
    const modal = document.createElement('div');
    modal.className = 'custom-modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                ${content}
                <button class="modal-close" aria-label="모달 닫기">✕</button>
            </div>
        </div>
    `;
    
    // 모달 스타일
    const style = document.createElement('style');
    style.textContent = `
        .custom-modal {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 2000;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: fadeIn 0.3s ease;
        }
        
        .modal-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(5px);
        }
        
        .modal-content {
            position: relative;
            background: white;
            border-radius: 12px;
            padding: 2rem;
            max-width: 600px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
            animation: slideUp 0.3s ease;
        }
        
        .modal-header h3 {
            color: var(--primary-blue, #1e40af);
            margin-bottom: 1rem;
            font-size: 1.5rem;
        }
        
        .modal-body p {
            line-height: 1.7;
            margin-bottom: 1rem;
        }
        
        .modal-note {
            font-style: italic;
            color: #666;
            border-top: 1px solid #eee;
            padding-top: 1rem;
            margin-top: 1.5rem;
        }
        
        .modal-close {
            position: absolute;
            top: 1rem;
            right: 1rem;
            width: 32px;
            height: 32px;
            border: none;
            background: #f0f0f0;
            border-radius: 50%;
            cursor: pointer;
            font-size: 1.2rem;
            transition: all 0.3s ease;
        }
        
        .modal-close:hover {
            background: #e0e0e0;
            transform: scale(1.1);
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes slideUp {
            from { opacity: 0; transform: translateY(50px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(modal);
    
    // 모달 닫기 이벤트
    const closeBtn = modal.querySelector('.modal-close');
    const overlay = modal.querySelector('.modal-overlay');
    
    function closeModal() {
        modal.style.animation = 'fadeIn 0.3s ease reverse';
        setTimeout(() => {
            modal.remove();
            style.remove();
        }, 300);
    }
    
    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);
    
    // ESC 키로 닫기
    function handleEscape(e) {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', handleEscape);
        }
    }
    document.addEventListener('keydown', handleEscape);
    
    // 포커스 트랩
    closeBtn.focus();
}

// ===== 알림 시스템 =====
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const colors = {
        info: '#3b82f6',
        success: '#10b981', 
        warning: '#f59e0b',
        error: '#ef4444'
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${colors[type] || colors.info};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1500;
        max-width: 350px;
        font-size: 0.875rem;
        animation: slideInRight 0.3s ease;
        cursor: pointer;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // 3초 후 자동 제거
    setTimeout(() => {
        notification.style.animation = 'slideInRight 0.3s ease reverse';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
    
    // 클릭으로 즉시 제거
    notification.addEventListener('click', () => {
        notification.style.animation = 'slideInRight 0.3s ease reverse';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    });
}

// ===== 활성 네비게이션 표시 =====
function updateActiveNavigation(activeId) {
    const navLinks = document.querySelectorAll('.main-nav a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === `#${activeId}`) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// ===== 나머지 기존 기능들 =====
// (기존 main.js의 다른 함수들을 여기에 포함)
function initializeApp() {
    // 모바일 메뉴 토글
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            mainNav.classList.toggle('mobile-open');
            
            // 햄버거 메뉴 애니메이션
            this.classList.toggle('active');
        });
    }
    
    // 외부 클릭 시 메뉴 닫기
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.header') && mainNav && mainNav.classList.contains('mobile-open')) {
            mainNav.classList.remove('mobile-open');
            if (mobileMenuToggle) {
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
                mobileMenuToggle.classList.remove('active');
            }
        }
    });
}

function initializeLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.01
        });
        
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        lazyImages.forEach(img => {
            img.classList.add('lazy');
            imageObserver.observe(img);
        });
    }
}

function initializeScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    if ('IntersectionObserver' in window) {
        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        animatedElements.forEach(el => {
            animationObserver.observe(el);
        });
    } else {
        animatedElements.forEach(el => {
            el.classList.add('animate');
        });
    }
}

function initializeKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-user');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-user');
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const accessibilityPanel = document.getElementById('accessibility-panel');
            if (accessibilityPanel && !accessibilityPanel.hidden) {
                accessibilityPanel.hidden = true;
                accessibilityPanel.setAttribute('aria-hidden', 'true');
            }
            
            const mainNav = document.querySelector('.main-nav');
            const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
            if (mainNav && mainNav.classList.contains('mobile-open')) {
                mainNav.classList.remove('mobile-open');
                if (mobileMenuToggle) {
                    mobileMenuToggle.setAttribute('aria-expanded', 'false');
                    mobileMenuToggle.classList.remove('active');
                    mobileMenuToggle.focus();
                }
            }
        }
    });
}

// 유틸리티 함수들
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

const storage = {
    get: function(key) {
        try {
            return JSON.parse(localStorage.getItem(key));
        } catch {
            return null;
        }
    },
    
    set: function(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch {
            return false;
        }
    },
    
    remove: function(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch {
            return false;
        }
    }
};

// 전역 변수로 내보내기
window.MuseumApp = {
    storage,
    debounce,
    throttle,
    showNotification,
    showModal
};

console.log('🎯 개선된 링크 기능이 모두 로드되었습니다.');

// ===== 연구 업적 전체 보기 기능 =====
function toggleFullList() {
    const fullList = document.getElementById('full-publication-list');
    const viewMoreText = document.getElementById('view-more-text');
    const arrow = document.querySelector('.btn-view-more .arrow');
    
    if (fullList.style.display === 'none') {
        fullList.style.display = 'block';
        viewMoreText.textContent = '이전 연구 목록 닫기';
        arrow.textContent = '▲';
        
        // 부드러운 스크롤 애니메이션
        setTimeout(() => {
            fullList.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
        }, 100);
    } else {
        fullList.style.display = 'none';
        viewMoreText.textContent = '이전 연구 전체 보기 (2017-2023, 39편)';
        arrow.textContent = '▼';
    }
}

// DOM이 로드된 후 이벤트 리스너 추가
document.addEventListener('DOMContentLoaded', function() {
    const viewMoreBtn = document.querySelector('.btn-view-more');
    if (viewMoreBtn) {
        viewMoreBtn.addEventListener('click', toggleFullList);
    }
});

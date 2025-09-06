// ===== 접근성 기능 JavaScript =====

document.addEventListener('DOMContentLoaded', function() {
    initializeAccessibility();
});

// ===== 접근성 초기화 =====
function initializeAccessibility() {
    initializeAccessibilityPanel();
    initializeFontSizeControls();
    initializeThemeControls();
    loadSavedSettings();
}

// ===== 접근성 패널 =====
function initializeAccessibilityPanel() {
    const accessibilityBtn = document.querySelector('.accessibility-btn');
    const accessibilityPanel = document.getElementById('accessibility-panel');
    const panelClose = document.querySelector('.panel-close');
    
    if (!accessibilityBtn || !accessibilityPanel) return;
    
    // 패널 열기
    accessibilityBtn.addEventListener('click', function() {
        openAccessibilityPanel();
    });
    
    // 패널 닫기
    if (panelClose) {
        panelClose.addEventListener('click', function() {
            closeAccessibilityPanel();
        });
    }
    
    // 배경 클릭으로 닫기
    accessibilityPanel.addEventListener('click', function(e) {
        if (e.target === accessibilityPanel) {
            closeAccessibilityPanel();
        }
    });
    
    // 패널 내부 포커스 트랩
    trapFocusInPanel(accessibilityPanel);
}

function openAccessibilityPanel() {
    const accessibilityPanel = document.getElementById('accessibility-panel');
    const accessibilityBtn = document.querySelector('.accessibility-btn');
    
    accessibilityPanel.hidden = false;
    accessibilityPanel.setAttribute('aria-hidden', 'false');
    accessibilityBtn.setAttribute('aria-expanded', 'true');
    
    // 첫 번째 포커스 가능한 요소에 포커스
    const firstFocusable = accessibilityPanel.querySelector('button, [tabindex]:not([tabindex="-1"])');
    if (firstFocusable) {
        firstFocusable.focus();
    }
    
    // 바디 스크롤 비활성화
    document.body.style.overflow = 'hidden';
}

function closeAccessibilityPanel() {
    const accessibilityPanel = document.getElementById('accessibility-panel');
    const accessibilityBtn = document.querySelector('.accessibility-btn');
    
    accessibilityPanel.hidden = true;
    accessibilityPanel.setAttribute('aria-hidden', 'true');
    accessibilityBtn.setAttribute('aria-expanded', 'false');
    
    // 바디 스크롤 활성화
    document.body.style.overflow = '';
    
    // 접근성 버튼으로 포커스 복귀
    accessibilityBtn.focus();
}

// ===== 포커스 트랩 =====
function trapFocusInPanel(panel) {
    panel.addEventListener('keydown', function(e) {
        if (e.key !== 'Tab') return;
        
        const focusableElements = panel.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (e.shiftKey) {
            // Shift + Tab
            if (document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            }
        } else {
            // Tab
            if (document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }
    });
}

// ===== 글자 크기 조절 =====
function initializeFontSizeControls() {
    const fontButtons = document.querySelectorAll('.font-btn');
    
    fontButtons.forEach(button => {
        button.addEventListener('click', function() {
            const size = this.dataset.size;
            changeFontSize(size);
            updateActiveButton(fontButtons, this);
        });
    });
}

function changeFontSize(size) {
    const body = document.body;
    
    // 기존 글자 크기 클래스 제거
    body.classList.remove('font-small', 'font-medium', 'font-large');
    
    // 새 글자 크기 클래스 추가
    if (size !== 'medium') {
        body.classList.add(`font-${size}`);
    }
    
    // 설정 저장
    MuseumApp.storage.set('fontSize', size);
    
    // 접근성 알림
    announceChange(`글자 크기가 ${getFontSizeLabel(size)}(으)로 변경되었습니다.`);
}

function getFontSizeLabel(size) {
    const labels = {
        'small': '작게',
        'medium': '보통',
        'large': '크게'
    };
    return labels[size] || '보통';
}

// ===== 테마 변경 =====
function initializeThemeControls() {
    const themeButtons = document.querySelectorAll('.theme-btn');
    
    themeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const theme = this.dataset.theme;
            changeTheme(theme);
            updateActiveButton(themeButtons, this);
        });
    });
}

function changeTheme(theme) {
    const body = document.body;
    
    // 기존 테마 클래스 제거
    body.classList.remove('theme-default', 'theme-dark', 'theme-high-contrast');
    
    // 새 테마 클래스 추가
    if (theme !== 'default') {
        body.classList.add(`theme-${theme}`);
    }
    
    // 설정 저장
    MuseumApp.storage.set('theme', theme);
    
    // 접근성 알림
    announceChange(`테마가 ${getThemeLabel(theme)}(으)로 변경되었습니다.`);
}

function getThemeLabel(theme) {
    const labels = {
        'default': '기본',
        'dark': '다크모드',
        'high-contrast': '고대비모드'
    };
    return labels[theme] || '기본';
}

// ===== 활성 버튼 업데이트 =====
function updateActiveButton(buttons, activeButton) {
    buttons.forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed', 'false');
    });
    
    activeButton.classList.add('active');
    activeButton.setAttribute('aria-pressed', 'true');
}

// ===== 저장된 설정 불러오기 =====
function loadSavedSettings() {
    // 글자 크기 설정 불러오기
    const savedFontSize = MuseumApp.storage.get('fontSize') || 'medium';
    changeFontSize(savedFontSize);
    
    const fontButtons = document.querySelectorAll('.font-btn');
    const activeFontBtn = Array.from(fontButtons).find(btn => btn.dataset.size === savedFontSize);
    if (activeFontBtn) {
        updateActiveButton(fontButtons, activeFontBtn);
    }
    
    // 테마 설정 불러오기
    const savedTheme = MuseumApp.storage.get('theme') || 'default';
    changeTheme(savedTheme);
    
    const themeButtons = document.querySelectorAll('.theme-btn');
    const activeThemeBtn = Array.from(themeButtons).find(btn => btn.dataset.theme === savedTheme);
    if (activeThemeBtn) {
        updateActiveButton(themeButtons, activeThemeBtn);
    }
}

// ===== 접근성 알림 =====
function announceChange(message) {
    // 스크린 리더를 위한 라이브 영역 생성/업데이트
    let liveRegion = document.getElementById('accessibility-announcer');
    
    if (!liveRegion) {
        liveRegion = document.createElement('div');
        liveRegion.id = 'accessibility-announcer';
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.className = 'sr-only';
        document.body.appendChild(liveRegion);
    }
    
    // 메시지 업데이트
    liveRegion.textContent = message;
    
    // 일정 시간 후 메시지 제거
    setTimeout(() => {
        liveRegion.textContent = '';
    }, 1000);
}

// ===== 시스템 설정 감지 =====
function detectSystemPreferences() {
    // 다크 모드 선호도 감지
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        const savedTheme = MuseumApp.storage.get('theme');
        if (!savedTheme) {
            changeTheme('dark');
        }
    }
    
    // 고대비 선호도 감지
    if (window.matchMedia && window.matchMedia('(prefers-contrast: high)').matches) {
        const savedTheme = MuseumApp.storage.get('theme');
        if (!savedTheme) {
            changeTheme('high-contrast');
        }
    }
    
    // 애니메이션 감소 선호도 감지
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.body.classList.add('reduced-motion');
    }
}

// 시스템 설정 변화 감지
if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (e.matches && !MuseumApp.storage.get('theme')) {
            changeTheme('dark');
        }
    });
    
    window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', e => {
        document.body.classList.toggle('reduced-motion', e.matches);
    });
}

// 초기화 시 시스템 설정 감지
detectSystemPreferences();

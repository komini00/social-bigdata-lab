// ===== 검색 기능 JavaScript =====

document.addEventListener('DOMContentLoaded', function() {
    initializeSearch();
});

// ===== 검색 초기화 =====
function initializeSearch() {
    const searchInput = document.querySelector('.search-box input');
    const searchButton = document.querySelector('.search-box button');
    const popularKeywords = document.querySelectorAll('.keyword');
    
    if (searchInput && searchButton) {
        initializeSearchBox(searchInput, searchButton);
    }
    
    if (popularKeywords.length > 0) {
        initializePopularKeywords(popularKeywords);
    }
    
    // 검색 기록 관리
    initializeSearchHistory();
}

// ===== 검색 박스 =====
function initializeSearchBox(input, button) {
    // 검색 실행
    button.addEventListener('click', function() {
        performSearch(input.value.trim());
    });
    
    // 엔터 키로 검색
    input.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            performSearch(this.value.trim());
        }
    });
    
    // 실시간 검색 제안 (디바운스 적용)
    input.addEventListener('input', MuseumApp.debounce(function() {
        const query = this.value.trim();
        if (query.length >= 2) {
            showSearchSuggestions(query);
        } else {
            hideSearchSuggestions();
        }
    }, 300));
    
    // 검색 박스 포커스 시 기록 표시
    input.addEventListener('focus', function() {
        showSearchHistory();
    });
    
    // 검색 박스 외부 클릭 시 제안/기록 숨김
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.search-box')) {
            hideSearchSuggestions();
            hideSearchHistory();
        }
    });
}

// ===== 검색 실행 =====
function performSearch(query) {
    if (!query) {
        alert('검색어를 입력해주세요.');
        return;
    }
    
    // 검색 기록에 추가
    addToSearchHistory(query);
    
    // 검색 로딩 표시
    showSearchLoading();
    
    // 실제 검색 API 호출 (예시)
    searchContent(query)
        .then(results => {
            hideSearchLoading();
            displaySearchResults(results);
        })
        .catch(error => {
            hideSearchLoading();
            showSearchError('검색 중 오류가 발생했습니다. 다시 시도해주세요.');
            console.error('검색 오류:', error);
        });
    
    // 검색 분석 (예시)
    trackSearchEvent(query);
}

// ===== 검색 API (예시) =====
async function searchContent(query) {
    // 실제 구현에서는 실제 API 엔드포인트를 사용
    return new Promise((resolve) => {
        setTimeout(() => {
            // 목업 데이터
            const mockResults = [
                {
                    type: 'exhibition',
                    title: `"${query}" 관련 전시`,
                    description: '검색된 전시 설명...',
                    image: 'assets/images/exhibitions/search-result.jpg',
                    url: '#'
                },
                {
                    type: 'collection',
                    title: `"${query}" 관련 소장품`,
                    description: '검색된 소장품 설명...',
                    image: 'assets/images/collections/search-result.jpg',
                    url: '#'
                }
            ];
            resolve(mockResults);
        }, 500);
    });
}

// ===== 검색 제안 =====
function showSearchSuggestions(query) {
    const suggestions = generateSuggestions(query);
    if (suggestions.length === 0) return;
    
    let suggestionBox = document.getElementById('search-suggestions');
    if (!suggestionBox) {
        suggestionBox = createSuggestionBox();
    }
    
    suggestionBox.innerHTML = '';
    suggestions.forEach(suggestion => {
        const item = document.createElement('div');
        item.className = 'suggestion-item';
        item.textContent = suggestion;
        item.addEventListener('click', () => {
            document.querySelector('.search-box input').value = suggestion;
            performSearch(suggestion);
            hideSearchSuggestions();
        });
        suggestionBox.appendChild(item);
    });
    
    suggestionBox.style.display = 'block';
}

function generateSuggestions(query) {
    // 실제 구현에서는 서버에서 제안을 가져옴
    const mockSuggestions = [
        '이불 전시',
        '현대미술',
        '고미술',
        '조선시대',
        '도자기',
        '회화',
        '조각',
        '설치미술'
    ];
    
    return mockSuggestions.filter(item => 
        item.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 5);
}

function hideSearchSuggestions() {
    const suggestionBox = document.getElementById('search-suggestions');
    if (suggestionBox) {
        suggestionBox.style.display = 'none';
    }
}

function createSuggestionBox() {
    const box = document.createElement('div');
    box.id = 'search-suggestions';
    box.className = 'search-suggestions';
    
    const searchBox = document.querySelector('.search-box');
    searchBox.appendChild(box);
    
    return box;
}

// ===== 검색 기록 =====
function initializeSearchHistory() {
    // 검색 기록 초기화
    if (!MuseumApp.storage.get('searchHistory')) {
        MuseumApp.storage.set('searchHistory', []);
    }
}

function addToSearchHistory(query) {
    let history = MuseumApp.storage.get('searchHistory') || [];
    
    // 중복 제거
    history = history.filter(item => item !== query);
    
    // 최신 검색어를 앞에 추가
    history.unshift(query);
    
    // 최대 10개까지만 저장
    if (history.length > 10) {
        history = history.slice(0, 10);
    }
    
    MuseumApp.storage.set('searchHistory', history);
}

function showSearchHistory() {
    const history = MuseumApp.storage.get('searchHistory') || [];
    if (history.length === 0) return;
    
    let historyBox = document.getElementById('search-history');
    if (!historyBox) {
        historyBox = createHistoryBox();
    }
    
    historyBox.innerHTML = '<div class="history-title">최근 검색어</div>';
    
    history.forEach(query => {
        const item = document.createElement('div');
        item.className = 'history-item';
        
        const text = document.createElement('span');
        text.textContent = query;
        text.addEventListener('click', () => {
            document.querySelector('.search-box input').value = query;
            performSearch(query);
            hideSearchHistory();
        });
        
        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = '×';
        deleteBtn.className = 'delete-history';
        deleteBtn.setAttribute('aria-label', `${query} 검색 기록 삭제`);
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            removeFromSearchHistory(query);
            showSearchHistory();
        });
        
        item.appendChild(text);
        item.appendChild(deleteBtn);
        historyBox.appendChild(item);
    });
    
    historyBox.style.display = 'block';
}

function removeFromSearchHistory(query) {
    let history = MuseumApp.storage.get('searchHistory') || [];
    history = history.filter(item => item !== query);
    MuseumApp.storage.set('searchHistory', history);
}

function hideSearchHistory() {
    const historyBox = document.getElementById('search-history');
    if (historyBox) {
        historyBox.style.display = 'none';
    }
}

function createHistoryBox() {
    const box = document.createElement('div');
    box.id = 'search-history';
    box.className = 'search-history';
    
    const searchBox = document.querySelector('.search-box');
    searchBox.appendChild(box);
    
    return box;
}

// ===== 인기 키워드 =====
function initializePopularKeywords(keywords) {
    keywords.forEach(keyword => {
        keyword.addEventListener('click', function(e) {
            e.preventDefault();
            const query = this.textContent.trim();
            document.querySelector('.search-box input').value = query;
            performSearch(query);
        });
    });
}

// ===== 검색 결과 표시 =====
function displaySearchResults(results) {
    // 검색 결과 페이지로 이동하거나 모달로 표시
    console.log('검색 결과:', results);
    
    // 예시: 간단한 알림으로 결과 표시
    if (results.length > 0) {
        alert(`${results.length}개의 검색 결과를 찾았습니다.`);
    } else {
        alert('검색 결과가 없습니다.');
    }
}

// ===== 검색 로딩/에러 상태 =====
function showSearchLoading() {
    const button = document.querySelector('.search-box button');
    if (button) {
        button.innerHTML = '<span class="loading"></span>';
        button.disabled = true;
    }
}

function hideSearchLoading() {
    const button = document.querySelector('.search-box button');
    if (button) {
        button.innerHTML = '🔍';
        button.disabled = false;
    }
}

function showSearchError(message) {
    // 에러 메시지 표시
    alert(message);
}

// ===== 검색 분석 =====
function trackSearchEvent(query) {
    // 검색 이벤트 추적 (Google Analytics 등)
    if (typeof gtag !== 'undefined') {
        gtag('event', 'search', {
            search_term: query,
            page_title: document.title,
            page_location: window.location.href
        });
    }
    
    console.log('검색 추적:', query);
}

// ===== 검색 스타일 추가 =====
function addSearchStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .search-suggestions,
        .search-history {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            border: 1px solid var(--secondary-gray);
            border-top: none;
            border-radius: 0 0 8px 8px;
            box-shadow: var(--shadow-md);
            max-height: 200px;
            overflow-y: auto;
            z-index: 10;
            display: none;
        }
        
        .suggestion-item,
        .history-item {
            padding: var(--spacing-sm);
            cursor: pointer;
            border-bottom: 1px solid var(--light-gray);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .suggestion-item:hover,
        .history-item:hover {
            background-color: var(--light-gray);
        }
        
        .history-title {
            padding: var(--spacing-xs) var(--spacing-sm);
            font-size: var(--font-xs);
            color: var(--text-gray);
            background-color: var(--light-gray);
            border-bottom: 1px solid var(--secondary-gray);
        }
        
        .delete-history {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: var(--secondary-gray);
            border: none;
            cursor: pointer;
            font-size: var(--font-xs);
        }
        
        .delete-history:hover {
            background: var(--text-gray);
            color: white;
        }
        
        .search-box {
            position: relative;
        }
    `;
    document.head.appendChild(style);
}

// 스타일 추가
addSearchStyles();

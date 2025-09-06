# 🔬 소셜 빅데이터 분석 랩 웹사이트

동국대학교 WISE캠퍼스 소셜 빅데이터 분석 랩(SDA Lab)의 공식 웹사이트입니다.

## 📋 프로젝트 개요

- **연구실**: 소셜 빅데이터 분석 랩 (Social Big Data Analytics Lab)
- **연구책임자**: 고민환 교수 (동국대학교 WISE캠퍼스 항공서비스무역학과)
- **주요 연구**: 텍스트 마이닝, 의미연결망 분석, AI 기반 빅데이터 분석
- **목표**: 항공·관광·서비스 산업의 당면 과제 해결 및 ESG 경영 지원

## 🚀 시작하기

### 1. 파일 구조
```
📁 claude_project/
├── 📄 index.html                 # 메인 페이지 (601줄)
├── 📁 assets/
│   ├── 📁 css/
│   │   ├── 🎨 lab-style.css      # 연구실 전용 스타일 (909줄)
│   │   └── 🎨 accessibility.css  # 접근성 테마
│   ├── 📁 js/
│   │   ├── ⚡ main.js            # 메인 기능
│   │   ├── ⚡ accessibility.js   # 접근성 컨트롤
│   │   └── ⚡ lab-features.js    # 연구실 전용 기능 (476줄)
│   └── 📁 images/               # 이미지 파일들
│       └── 📁 team/             # 팀 멤버 사진
└── 📄 README.md                 # 이 파일
```

### 2. 웹사이트 실행
1. 웹 브라우저에서 `index.html` 파일 열기
2. 또는 로컬 서버 실행:
   ```bash
   # Python 3
   python -m http.server 8000
   
   # 브라우저에서 http://localhost:8000 접속
   ```

## ✨ 주요 기능

### 🎯 연구실 전용 기능
- **데이터 시각화**: 히어로 섹션의 인터랙티브 데이터 노드 애니메이션
- **연구 분야 소개**: 3가지 핵심 연구 영역 카드형 레이아웃
- **성과 관리**: 논문, 저서, 수상 내역 체계적 정리
- **분석 자문**: 서비스 소개 및 성공 사례 제시
- **팀 소개**: 연구책임자 및 연구진 프로필
- **연락처 폼**: 실시간 유효성 검사가 포함된 문의 시스템

### ♿ 접근성 기능
- **글자 크기 조절**: 작게/보통/크게 3단계
- **테마 변경**: 기본/다크모드/고대비모드
- **키보드 네비게이션**: Tab, Enter, Arrow 키 지원
- **스크린 리더 지원**: ARIA 라벨, 의미론적 HTML
- **포커스 관리**: 명확한 포커스 표시

### 🎨 디자인 시스템
- **연구실 브랜딩**: 블루 계열 전문적 컬러 팔레트
- **반응형 레이아웃**: 모바일부터 데스크톱까지 최적화
- **인터랙티브 요소**: 마우스 호버, 클릭 피드백
- **스크롤 애니메이션**: 섹션별 순차적 등장 효과

## 🛠️ 기술 스택

### Frontend
- **HTML5**: 시맨틱 마크업, ARIA 접근성
- **CSS3**: CSS Grid, Flexbox, Custom Properties, 애니메이션
- **Vanilla JavaScript**: ES6+ 문법, 모듈화 구조
- **웹 표준**: Intersection Observer, localStorage API

### 디자인 기능
- **컬러 시스템**: CSS 변수 기반 테마 관리
- **타이포그래피**: Noto Sans KR + Inter 폰트 조합
- **애니메이션**: CSS 트랜지션 + JavaScript 인터랙션
- **반응형**: 4단계 브레이크포인트 (576px/768px/992px/1200px)

## 📱 섹션별 구성

### 1. 히어로 섹션
- 연구실 소개 및 핵심 메시지
- 인터랙티브 데이터 시각화
- CTA 버튼 (연구실 둘러보기, 분석 자문 문의)

### 2. 연구실 소개
- 연구책임자 인사말
- 연구진 프로필 카드
- 연구실 비전 및 목표

### 3. 연구 분야
- 소비자 인식 및 트렌드 분석
- 항공/관광 산업 분석  
- 하이브리드 추천 시스템 개발

### 4. 주요 성과
- 진행 중인 연구 프로젝트
- 대표 논문 및 저서
- 수상 내역

### 5. 분석 자문
- 제공 서비스 소개
- 성공 사례 (에어링크 항공)
- 서비스 문의 안내

### 6. 소식
- 최신 연구 성과
- 수상 소식
- 도서 출간 정보

### 7. 연락처
- 연구실 정보
- 빠른 문의 폼
- 위치 및 연락처

## 🎨 디자인 커스터마이징

### 색상 변경
`assets/css/lab-style.css`의 `:root` 섹션에서 색상 변경:

```css
:root {
    --primary-blue: #1e40af;        /* 메인 블루 */
    --secondary-blue: #3b82f6;      /* 보조 블루 */
    --accent-green: #10b981;        /* 성공/긍정 */
    --accent-orange: #f59e0b;       /* 주목/수상 */
}
```

### 애니메이션 조정
데이터 시각화 속도 변경:
```javascript
// lab-features.js에서
setInterval(activateNodesSequentially, 8000); // 8초 → 원하는 시간으로 변경
```

### 콘텐츠 수정
- **팀 정보**: `index.html`의 `.team-grid` 섹션 수정
- **연구 성과**: `.publications-list` 섹션 업데이트
- **연락처**: `.contact-details` 정보 변경

## 📊 성능 및 최적화

### 성능 목표
- **FCP (First Contentful Paint)**: < 2.0초
- **TTI (Time to Interactive)**: < 4.0초
- **Lighthouse Score**: 90+ (Performance, Accessibility, SEO)

### 최적화 기능
- **이미지 지연 로딩**: Intersection Observer 활용
- **CSS 최적화**: 중복 제거, 압축
- **JavaScript 모듈화**: 기능별 파일 분리
- **캐싱 활용**: localStorage 기반 설정 저장

## 📝 콘텐츠 관리

### 팀 멤버 추가
1. `assets/images/team/` 폴더에 사진 추가
2. `index.html`의 `.team-grid`에 멤버 카드 추가:

```html
<div class="member-card">
    <div class="member-photo">
        <img src="assets/images/team/new-member.jpg" alt="새 멤버 이름" loading="lazy">
    </div>
    <div class="member-info">
        <h4>새 멤버 이름</h4>
        <p class="position">직책</p>
        <div class="member-details">
            <p><strong>관심 분야:</strong> 연구 관심사</p>
        </div>
    </div>
</div>
```

### 연구 성과 추가
`.publications-list`에 새 논문/저서 추가:

```html
<div class="publication-item">
    <div class="publication-type">논문</div>
    <div class="publication-content">
        <h4>논문 제목</h4>
        <p class="publication-award">🏆 수상 내역 (선택사항)</p>
    </div>
</div>
```

### 소식 업데이트
`.news-grid`에 새 소식 추가:

```html
<article class="news-card award">
    <div class="news-badge">수상</div>
    <div class="news-date">2025.XX.XX</div>
    <h3>소식 제목</h3>
    <p>소식 내용...</p>
</article>
```

## 🚀 배포 가이드

### GitHub Pages 배포
1. GitHub 리포지토리 생성
2. 파일 업로드
3. Settings → Pages → Source: Deploy from a branch
4. Branch: main, Folder: / (root)

### Netlify 배포
1. 프로젝트 폴더를 zip으로 압축
2. Netlify에 드래그 앤 드롭
3. 자동 배포 완료

## 📞 지원 및 문의

### 기술 지원
- **개발 관련**: 코드 수정, 기능 추가, 버그 수정
- **디자인 변경**: 색상, 레이아웃, 애니메이션 조정
- **콘텐츠 업데이트**: 팀 정보, 연구 성과, 소식 추가

### 연구실 문의
- **이메일**: komini00@dongguk.ac.kr
- **전화**: 054-770-2311
- **주소**: 동국대학교 WISE캠퍼스 진흥관 3층

## 📈 향후 개발 계획

### Phase 1 (완료)
- ✅ 기본 웹사이트 구조
- ✅ 반응형 디자인
- ✅ 접근성 기능
- ✅ 연락처 폼

### Phase 2 (향후 계획)
- [ ] 연구 성과 데이터베이스 연동
- [ ] 관리자 대시보드
- [ ] 다국어 지원 (영문)
- [ ] SEO 최적화

### Phase 3 (확장 기능)
- [ ] 연구 블로그
- [ ] 프로젝트 갤러리
- [ ] 온라인 세미나 시스템
- [ ] 협업 연구자 네트워크

---

**개발**: Claude AI Assistant 전문가팀  
**최종 업데이트**: 2025년 9월 6일  
**버전**: 1.0.0

> 💡 **팁**: 웹사이트 수정이나 추가 기능이 필요하시면 언제든 말씀해 주세요!

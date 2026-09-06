# CHAPTER B

기독교 출판사의 도서와 브랜드를 소개하는 정적 웹사이트입니다. 흰색을 중심으로 버건디 `#7A2E2E`를 포인트 컬러로 사용했습니다.

## 포함된 화면

- 홈: 대표 신간, 분야, 신간 도서, 출판 철학, 시리즈, 소식
- 도서: 검색, 분야 필터, 정렬, 도서 목록
- 도서 상세: 서지정보, 구글 폼 구매 요청 안내, 책 소개, 차례, 연관 도서
- 출판사 소개: 브랜드 이야기와 핵심 가치

## 도서 정보 업데이트

모든 자리표시자 도서 정보는 `data/books.ts` 한 파일에서 관리합니다. 배열에 책을 추가하거나 기존 항목을 수정하면 홈, 도서 목록, 상세 페이지에 함께 반영됩니다.

표지용 임시 아트워크는 `public/images/chapter-b-cover-art.png`에 있습니다. 실제 표지 이미지가 준비되면 `Book` 데이터에 이미지 경로를 추가하고 `components/site/book-cover.tsx`의 표시 부분을 교체하면 됩니다.

## 로컬 실행

```bash
npm ci
npm run dev
```

## GitHub Pages 배포

1. GitHub에 새 저장소를 만들고 이 폴더의 파일을 올립니다.
2. 저장소의 **Settings → Pages → Source**를 **GitHub Actions**로 설정합니다.
3. `main` 브랜치에 푸시하면 `.github/workflows/deploy-pages.yml`이 자동으로 빌드와 배포를 진행합니다.

구글 폼 주소는 GitHub 저장소의 **Settings → Secrets and variables → Actions → Variables**에서 `NEXT_PUBLIC_GOOGLE_FORM_URL` 이름으로 등록합니다.

사용자/조직 사이트와 프로젝트 사이트의 경로 차이는 빌드 시 자동으로 처리됩니다.

## 구글 폼 연결

도서 상세 페이지에는 장바구니나 결제 기능 대신 [CHAPTER B 구매 요청 폼](https://forms.gle/8S6GoVM3qC4zy73r9)으로 이동하는 버튼이 표시됩니다. 다른 폼으로 교체하려면 `NEXT_PUBLIC_GOOGLE_FORM_URL`에 새 주소를 설정하면 됩니다.

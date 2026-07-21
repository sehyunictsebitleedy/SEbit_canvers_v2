# SEbit Canvers v2

Canvers v2는 **Editor, Dashboard, SaaS, Template 시안**을 빠르게 생성하기 위한 AI 웹서비스 시안 생성 플랫폼입니다.

사용자는 원하는 템플릿 유형을 고르고 몇 가지 질문에 답하면, AI가 웹서비스의 구조와 디자인 방향을 먼저 제안합니다.

> 원하는 웹서비스 시안을 3분 만에 생성하세요.

## GitHub 저장소

- Repository: [sehyunictsebitleedy/SEbit_canvers_v2](https://github.com/sehyunictsebitleedy/SEbit_canvers_v2)

## v2 디자인 방향

마지막 확정 시안은 **밝은 컴팩트 SaaS 랜딩** 방향입니다.

- 밝은 오프화이트 배경
- 트렌디한 라임 그린 포인트 컬러
- 검정 CTA 버튼
- 둥근 카드와 부드러운 그림자
- Hero 우측에 웹서비스 시안 프리뷰와 AI 프롬프트 카드 배치
- 모바일 앱 중심이 아닌 웹서비스 생성 플랫폼 중심의 프리뷰
- 섹션은 짧고 명확하게 분리
- 전문적이지만 너무 무겁지 않은 Friendly AI 톤

### 기준 시안 이미지

- [밝은 컴팩트 시안](./design-drafts/canvers-v2-bright-compact-draft.png)

## 메인 카피

```text
원하는 웹서비스 시안을
3분 만에 생성하세요.
```

```text
템플릿을 선택하면 AI가 구조와 디자인을 먼저 제안합니다.
```

## 주요 메뉴 구조

```text
Canvers
Templates
Product
Cases
About
Start
```

## 랜딩 페이지 섹션 구성

### 1. Header

- 좌측 Canvers 로고
- 중앙 메뉴
- 우측 검정 CTA 버튼
- 밝은 배경 위에 작고 정돈된 내비게이션

### 2. Hero

- 좌측 메인 문구와 CTA
- 우측 웹서비스 생성 프리뷰
- AI 프롬프트 카드
- 템플릿 선택 미니 카드
- 생성된 시안 미리보기 카드
- 작은 신뢰 요소 예시: `1.5K+ drafts created`

### 3. Value Section

핵심 메시지:

```text
템플릿 선택이 더 쉬워집니다.
```

표현 방식:

- 짧은 설명 텍스트
- `Clear structure`
- `Fast draft`
- 아이콘은 오래된 라인 아이콘이 아니라 부드러운 UI glyph 형태 사용

### 4. Dark Feature Band

밝은 페이지 중간에 검정/차콜 영역을 넣어 시각적 강약을 만듭니다.

핵심 메시지:

```text
AI가 구조를 먼저 설계합니다.
```

포함 요소:

- 생성된 SaaS 시안 프리뷰
- Editor 카드
- Dashboard 카드
- 짧은 설명과 CTA

### 5. AI Builder Flow

질문 몇 개로 시안을 만드는 흐름을 보여줍니다.

```text
서비스 유형은?
주요 기능은?
원하는 톤은?
완성된 시안
```

### 6. Cases

Canvers로 생성할 수 있는 시안 예시를 카드로 보여줍니다.

- SaaS
- Dashboard
- Editor

각 카드는 긴 설명보다 미리보기 중심으로 구성합니다.

### 7. CTA Banner

라임 그린 배너로 마지막 전환을 유도합니다.

```text
지금 Canvers로
첫 시안을 만들어보세요.
```

### 8. Footer

- 다크 footer
- Product / Resources / Company 링크
- 뉴스레터 구독 영역
- 약관 링크

## 지원할 템플릿 유형

| 유형 | 설명 |
| --- | --- |
| Editor | 문서, 콘텐츠, 블로그, 지식관리형 서비스 시안 |
| Dashboard | 관리자, 통계, CRM, 예약관리형 서비스 시안 |
| SaaS | 랜딩, 가격표, 회원가입, 서비스 소개형 시안 |
| Template | 범용 홈페이지와 마케팅 페이지 시안 |

## 작업 히스토리

### 2026-07-05

- Canvers v1의 메인 랜딩 구조 정리
- 업종 선택, 테마 선택, 정보 입력, AI 시안 생성 흐름 구성
- `Soft Pastel` 스타일 기반 메인 화면 적용
- `Canvers_기획서_v2.2.md` 작성 및 업데이트
- 기존 README에 구현 범위와 실행 방법 정리

### 2026-07-11

- 첫 번째 디자인 레퍼런스 검토
- 프리미엄 포스터형 A안 생성
- 레트로 작업실/Friendly AI 기반 B안 생성
- B안을 단락형 롱페이지 시안으로 확장
- 시안 이미지 `design-drafts/canvers-b-longpage-draft.png` 저장

### 2026-07-18

- Nuxt UI Templates 레퍼런스 검토
- Editor, Dashboard, SaaS, Template 생성 플랫폼 방향 기획
- `Dark Studio Template Builder` 방향 제안
- `Friendly Template Lab` 방향 제안
- A안 다크/코발트 전문가형 시안 생성
- A안을 더 심플한 섹션형 레이아웃으로 재정리
- 노트북 중심 hero 대신 AI 생성 캔버스 방향 제안

### 2026-07-20

- 다크 바이오/딥테크 레퍼런스 기반 시안 생성
- 레퍼런스와 차이가 커서 레이아웃 문법을 다시 분석
- 큰 라운드 프레임, 어두운 hero, 왼쪽 타이틀/오른쪽 카드 흐름으로 재생성
- 밝은 SaaS 랜딩 레퍼런스 검토
- 밝은 오프화이트 + 라임 그린 + 검정 CTA 기반의 컴팩트 시안 생성
- 마지막 작업 기준 시안을 `canvers-v2-bright-compact-draft.png`로 저장

### 2026-07-21

- 프로젝트 기준 저장소를 `SEbit_canvers_v2`로 변경 준비
- README를 v2 기준으로 재작성
- 마지막 밝은 컴팩트 시안을 README 기준 시안으로 명시
- 메인 랜딩 화면을 마지막 밝은 컴팩트 시안 기준으로 실제 코드에 반영
- Hero, Value, Dark Feature Band, AI Builder Flow, Cases, CTA, Footer 섹션 구현
- 기존 보라/파스텔 랜딩과 깨진 한글 문구를 v2 카피와 레이아웃으로 교체
- `npm.cmd run build`로 Next.js 프로덕션 빌드 검증 완료
- 내비게이션 hover 인디케이터, 버튼/카드 hover, Hero 프리뷰 float, AI 카드 float, 선택 카드 glow 등 v2 모션 레이어 추가
- `prefers-reduced-motion` 대응으로 움직임 감소 환경에서는 주요 애니메이션 비활성화
- 2번째 주요 섹션의 SaaS, Editor, Dashboard 영역을 추상 아이콘 대신 실제 사이트 예시 이미지 썸네일로 교체
- 예시 이미지를 `public/images/examples`에 추가하고 랜딩 페이지에서 직접 사용하도록 연결
- SaaS 예시 영역의 이미지 크기를 줄이고, 랜딩/가격표/CTA 흐름을 설명하는 카피와 CTA 버튼을 다시 추가
- 하단 CTA 섹션의 형광 라임 면적을 줄이고, 크림/민트 배경과 흐릿한 UI 카드 패턴을 추가해 더 부드러운 전환 섹션으로 조정
- IDE 로컬 수정 사항이었던 영문 hero 카피, 프리뷰 문구 줄바꿈, `Question?` 섹션 타이틀을 원격 코드에도 반영
- 사용자 추가 스타일 보존을 위해 `.h2_en` 클래스 정의를 소스 CSS에 복원
- 첨부된 Canvers 로고 이미지를 `public/images/brand/logo.png`로 추가하고 Header/Footer 로고에 적용
- Hero 메인 카피를 `Create your ideal web service draft.`로 영문 변경
- Hero 텍스트, 서브 카피, CTA, trust chip이 아래에서 올라오도록 entrance 애니메이션 추가
- 의미가 약한 장식 아이콘을 `No signup`, `Responsive`, `AI draft`, `AI Prompt`, 단계 번호 등 의미 기반 UI 라벨로 정리

## 현재 구현 기준

현재 코드는 v1에서 작업한 Next.js 기반 Canvers MVP를 포함하고 있습니다.

v2 작업에서는 아래 방향으로 이어갈 예정입니다.

- 기존 업종/테마 선택 흐름을 `Templates` 중심으로 재정리
- 메인 랜딩을 밝은 컴팩트 SaaS 스타일로 개편
- Editor, Dashboard, SaaS, Template 카드 중심 UI로 변경
- AI 프롬프트 입력과 생성 프리뷰를 Hero에서 바로 보여주기
- `/create` 흐름은 템플릿 선택 후 질문 단계로 연결

## 기술 스택

- Next.js 14
- React 18
- TypeScript
- Supabase
- OpenAI API
- Zod
- Playwright

## 실행 방법

```powershell
git clone https://github.com/sehyunictsebitleedy/SEbit_canvers_v2.git
cd SEbit_canvers_v2
npm.cmd install
Copy-Item .env.example .env.local
npm.cmd run dev
```

브라우저에서 아래 주소를 엽니다.

```text
http://localhost:3000
```

PowerShell에서 `npm` 실행이 차단되면 `npm.cmd`를 사용합니다.

## 환경 변수

`.env.example`을 `.env.local`로 복사한 뒤 필요한 값을 입력합니다.

```text
NEXT_PUBLIC_SITE_URL=http://localhost:3000

NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

OPENAI_API_KEY=
CANVERS_MOCK_MODE=true
```

API 키가 없으면 mock mode로 동작합니다.

## 관련 문서

- [Canvers 기획서 v2.2](./Canvers_기획서_v2.2.md)
- [Backend 구성 문서](./BACKEND.md)

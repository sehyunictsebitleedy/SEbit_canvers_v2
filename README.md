# SEbit Canvers v2

## 최신 작업 내역 (2026-08-31, Claude 디자인 개선 2차)

- 메인 랜딩의 "구조를 먼저 설계합니다" 섹션(dark-band)을 카피/생성 시안 카드/Editor/Dashboard 4개 블록이 2x2로 정렬되는 그리드로 재구성했습니다.
- 중복도가 높고 우선순위가 낮았던 "Canvers로 만든 시안" 섹션을 삭제했습니다.
- 모바일 폭(≤720px)에서 상단 내비게이션 링크가 대체 메뉴 없이 사라지던 문제를 발견해 햄버거 토글 + 드롭다운 메뉴를 새로 추가했습니다.
- 푸터의 브랜드 워드마크("Canvers")가 어두운 배경에서 색상이 잉크색으로 하드코딩돼 있어 보이지 않던 문제, "완성된 시안" 카드 제목이 4줄로 쪼개지던 줄바꿈 문제를 수정했습니다.
- 값 제안, 다크밴드, Question, CTA 섹션에 스크롤 시 페이드업되는 리빌 인터랙션을 추가했습니다(`prefers-reduced-motion` 대응 포함).
- 생성 시안 미리보기 3종을 각각 참고 이미지 기준으로 다시 다듬었습니다.
  - **Editor**: 문서 편집 툴 구조를 걷어내고 Hero 배너 → Featured(대형+소형 리스트) → Latest Posts 그리드 + Popular Posts 사이드바로 구성되는 블로그/매거진 홈페이지 구조로 전면 재구성했습니다. 내비게이션도 상단형으로 전환했습니다.
  - **SaaS**: 랜딩 페이지 구조는 유지한 채 제품 카드에 스탯 칩(MRR·Active users), 막대 차트에 퍼센트 라벨을 추가하고 Key sections 카드에 아이콘 배지·소프트 섀도우·강조 카드를 적용해 톤을 다듬었습니다.
  - **Dashboard**: Team(그라데이션 아바타 리스트), Calendar(이번 달 달력, 오늘 날짜 자동 하이라이트) 위젯 2종을 추가했습니다.
- AI Design Director의 추천 지침에 "트렌드적 장식보다 구조화된 그리드·무채색 아이콘 배지·절제된 포인트 컬러"를 우선하도록 명시하고, Dashboard 템플릿에는 표준 관리자 콘솔 레이아웃을 추천하도록 지침을 추가했습니다.
- `/create`의 Style 선택지를 6개(Soft/Minimal/Bold/Editorial/Modern Business/Minimal Service)에서 Soft/Minimal/Bold 3개로 줄이고, `/templates`의 템플릿별 자동 스타일 지정도 함께 정리했습니다.

## 최신 작업 내역 (2026-08-31, Claude 디자인 개선)

- 메인 랜딩(`/`) 히어로 헤드라인이 좁은 컬럼 폭과 강제 줄바꿈이 겹쳐 4줄로 어색하게 쪼개지던 문제를 폰트 크기·컬럼 비율 조정과 `text-wrap: balance` 적용으로 정리했습니다.
- 히어로 우측 플로팅 카드(AI Prompt, 템플릿 선택)가 브라우저 목업 콘텐츠를 가리던 문제를 프리뷰 창 폭 축소와 카드 위치 재배치로 해결했습니다.
- "템플릿 선택이 더 쉬워집니다" 섹션의 텍스트 기반 가짜 아이콘("IA", "AI")을 실제 인라인 SVG 아이콘으로 교체했습니다.
- 히어로 템플릿 그리드의 4번째 썸네일이 SaaS 이미지를 필터만 씌워 재사용하던 것을 "+12 더보기" 링크 타일로 교체했습니다.
- 하단 CTA 헤드라인의 줄바꿈 파손을 같은 방식으로 수정했습니다.
- `/templates` 페이지의 "Template" 카드가 "SaaS" 카드와 동일한 이미지를 재사용하던 문제를 컬러 스와치·타이포 샘플로 구성된 디자인 키트 목업으로 교체했습니다.
- `/templates`, `/product`의 검은 배경 CTA에서 검은 버튼이 배경에 묻혀 거의 보이지 않던 대비 문제를 그린 액센트 버튼으로 수정했습니다.
- 생성된 시안 미리보기(`/[slug]`)의 좌측 사이드바(Dashboard, Editor)가 상위 `justify-content: space-between`을 그대로 물려받아 로고와 메뉴 사이에 거대한 빈 공간이 생기던 CSS 버그를 수정했습니다.
- Dashboard 미리보기에서 차트 3종을 모두 선택했을 때 2열 그리드에 3번째 차트가 혼자 남아 절반이 비어 보이던 문제를 마지막 항목이 전체 폭을 차지하도록 수정했습니다.
- 모바일 폭에서 Dashboard 사이드바에 남아있던 데스크톱 전용 높이 규칙과 메뉴 글자색 대비 문제를 함께 수정했습니다.

## 최신 작업 내역 (2026-08-31)

- 기본 한글 폰트를 네이버 `Nanum Gothic`으로 변경했습니다. `h1`은 Presentation, `h2`는 Paperozi ExtraBold를 사용합니다.
- 한글 문장이 글자 중간에서 끊기지 않도록 단어 단위 줄바꿈과 제목·문단별 자연스러운 text wrapping 규칙을 추가했습니다.
- Product Hero와 메인 Hero의 자간을 각각 `0.01em`, `-0.01em`으로 조정했습니다.
- 메인, Product, Templates Navi의 `About` 메뉴를 `SEbit About`으로 변경하고 `http://sebit.co.kr`을 새 창으로 연결했습니다.
- Dashboard 차트 선택 항목을 바, 원형, 도넛 3종으로 정리하고 기본 차트를 바와 원형으로 변경했습니다.
- 생성 시안의 기본 배경은 흰색 또는 검은색만 사용하며 장식용 그라데이션을 제거했습니다. 차트 구분처럼 의미가 있는 데이터 색상은 유지합니다.
- 디자인 가이드에 `AI Design Director`를 추가했습니다. 디자인 요구사항을 입력하면 Structured Outputs 기반의 디자인 토큰을 추천하고, 미리보기 후 사용자가 적용할 때만 JSON과 시안에 저장합니다.
- AI 디자인 추천은 배경을 검은색 또는 흰색으로 제한하고 Brand tone, Density, CTA, Component, Accent, Font, Radius, Navigation과 디자인 메모를 구조화해 반환합니다.
- `.env.example`에 `OPENAI_MODEL`, `OPENAI_DESIGN_MODEL` 설정 예시를 추가했습니다. `.env.local`은 Git에 포함되지 않습니다.

## 최신 작업 내역 (2026-08-17)

- Dashboard 시안은 `public/images/examples/dashboard-example.png`를 참고해 짙은 좌측 사이드바, 라임 포인트 컬러, KPI 카드, 분석 차트, Top sections 테이블, Recent activity 패널 중심으로 개선했습니다.
- Dashboard의 선택형 차트 기능은 참고 이미지 기반 레이아웃 안에서도 그대로 반영되며 데스크톱, 태블릿, 모바일 화면에 맞춰 재배치됩니다.
- Navi의 `Start`와 일반 `시안 만들기` CTA는 기존처럼 생성 화면으로 이동합니다.
- `/templates` 페이지의 네 번째 `Template` 카드에서 `시안 만들기`를 누른 경우에만 `준비 중입니다.` 안내창을 표시합니다.
- 시안 생성 화면에서 `Dashboard` 템플릿을 선택하면 차트 유형 선택 메뉴가 표시됩니다.
- `바`, `원형`, `도넛` 차트를 하나 이상 복수 선택할 수 있습니다.
- 선택한 차트 유형은 생성 요청과 `data/sites/{slug}.json`의 `input.chartTypes`에 저장됩니다.
- Dashboard 미리보기에는 선택한 차트만 카드 형태로 렌더링됩니다.
- 기존에 생성된 Dashboard JSON에 `chartTypes`가 없으면 바와 원형 차트를 기본 표시합니다.
- 모바일에서는 차트 선택 카드와 미리보기 차트가 화면 너비에 맞춰 2열 또는 1열로 재배치됩니다.

## 최신 작업 내역 (2026-08-10)

- 생성된 시안 미리보기(`/[slug]`)를 템플릿별 전용 레이아웃 구조로 고도화했습니다.
- SaaS, Dashboard, Editor, Template 선택값에 따라 같은 화면을 색상만 바꾸는 방식이 아니라 완전히 다른 섹션 구조로 렌더링되도록 분리했습니다.
- SaaS 시안은 랜딩 페이지, 제품 소개, 가격/CTA 흐름 중심으로 구성했습니다.
- Dashboard 시안은 좌측 내비게이션, 핵심 지표 카드, 워크스페이스 패널, 리스트형 섹션 구조로 구성했습니다.
- Editor 시안은 문서 목록, 편집 문서, 툴바, 본문 블록이 보이는 편집기형 구조로 구성했습니다.
- Template 시안은 Hero, Offerings, Section, Design system 블록을 조합하는 키트형 보드 구조로 구성했습니다.
- 각 템플릿 레이아웃은 디자인 가이드의 density, CTA style, component style 설정을 계속 반영하도록 연결했습니다.
- 반응형 대응을 추가해 태블릿/모바일에서도 템플릿별 구조가 깨지지 않도록 정리했습니다.

## 최신 업데이트 (2026-08-02)

- 생성된 시안을 수정할 수 있는 `/[slug]/guide` 디자인 가이드 페이지를 추가했습니다.
- 생성 시안 미리보기 페이지에 `Edit in Design Guide` 버튼을 추가해, 생성 직후 바로 디자인 가이드로 이동할 수 있게 했습니다.
- Editor, Dashboard, SaaS, Template 선택값에 따라 생성 시안의 미리보기 레이아웃이 다르게 보이도록 분기했습니다.
- 메인 랜딩과 템플릿 페이지에 `Nuxt 스타일의 페이지 구조`를 제안한다는 표현을 추가했습니다.
- 시안 생성 단계에서 `Top navigation`과 `Left side navigation` 중 내비게이션 위치를 선택할 수 있게 했습니다.
- Dashboard와 Editor 템플릿은 좌측형 navi, SaaS와 Template 템플릿은 상단형 navi가 기본 추천값으로 설정됩니다.
- 디자인 가이드에서도 내비게이션 위치를 다시 변경하고 JSON에 저장할 수 있습니다.
- `/cases` 페이지와 메뉴를 제거하고, 필요한 메뉴 중심으로 내비게이션을 단순화했습니다.
- OpenAI quota 문제가 있을 때도 테스트할 수 있도록 JSON 저장형 mock draft 흐름을 정리했습니다.
- Open Design은 직접 API 연동이 아니라 디자인 시스템/워크플로우 참고용으로 활용하기로 정리했습니다.
- `/[slug]/guide`를 단순 수정 폼에서 디자인 시스템 편집 화면으로 확장했습니다.
- 디자인 가이드에 Brand tone, Layout rules, Section density, CTA style, Component style, Design notes 항목을 추가했습니다.
- 디자인 가이드에서 저장한 density, CTA, component style 값이 생성 시안 미리보기에 반영되도록 연결했습니다.

Canvers v2는 **Editor, Dashboard, SaaS, Template 형태의 웹서비스 시안**을 빠르게 생성하고 다듬기 위한 AI 기반 시안 제작 MVP입니다.

사용자는 템플릿 유형과 간단한 서비스 정보를 입력하면, Canvers가 Nuxt 스타일의 웹서비스 구조, 문구, 섹션 구성을 먼저 제안합니다. 생성된 결과는 JSON 파일로 저장되며, 별도 DB 없이 로컬 환경에서 생성, 확인, 수정 흐름을 테스트할 수 있습니다.

## GitHub 저장소

- Repository: [sehyunictsebitleedy/SEbit_canvers_v2](https://github.com/sehyunictsebitleedy/SEbit_canvers_v2)

## 현재 작업 방향

현재 버전은 실제 서비스 출시 전, **웹서비스 시안 생성 흐름과 디자인 방향을 검증하는 v1 MVP**입니다.

핵심 방향은 다음과 같습니다.

- 밝고 컴팩트한 SaaS 랜딩 디자인
- 전문적이지만 과하게 무겁지 않은 Friendly AI 톤
- 템플릿 선택 후 AI가 Nuxt 스타일 구조와 문구를 먼저 제안하는 흐름
- DB 없이 JSON 파일로 생성 결과 저장
- 생성된 시안을 디자인 가이드 페이지에서 다시 수정
- Open Design식 디자인 시스템 워크플로우를 참고하되, Canvers 자체 JSON 생성 구조 유지
- 불필요한 메뉴를 늘리지 않고 `Templates`, `Product`, `About` 중심으로 구성

## 메인 카피

```text
Create your ideal web service draft.
```

```text
템플릿을 선택하면 AI가 Nuxt 스타일의 구조와 디자인을 먼저 제안합니다.
```

## 주요 메뉴

```text
Canvers
Templates
Product
About
Start
```

## 페이지 구조

| 경로 | 설명 |
| --- | --- |
| `/` | Canvers 메인 랜딩 페이지 |
| `/templates` | Editor, Dashboard, SaaS, Template 유형별 시안 생성 진입 페이지 |
| `/product` | Canvers의 생성 흐름과 핵심 기능 소개 페이지 |
| `/create` | 시안 생성을 위한 질문 입력 페이지 |
| `/[slug]` | 생성된 시안 미리보기 페이지 |
| `/[slug]/guide` | 생성된 시안을 수정하는 디자인 가이드 페이지 |
| `/[slug]/cms` | 생성된 JSON 원본 확인 페이지 |

## 지원 템플릿 유형

| 유형 | 설명 |
| --- | --- |
| Editor | 문서, 콘텐츠, 글쓰기, 협업형 편집 서비스 시안 |
| Dashboard | 관리자, 통계, CRM, 예약 관리형 서비스 시안 |
| SaaS | 랜딩, 가격표, 회원가입, 서비스 소개형 시안 |
| Template | 범용 랜딩 페이지와 마케팅 페이지 시안 |

## 생성 흐름

1. 사용자가 `/templates`에서 원하는 템플릿 유형을 선택합니다.
2. `/create`에서 서비스명, 핵심 문구, 주요 기능, 원하는 톤을 입력합니다.
3. 생성 전에 내비게이션 위치를 `Top navigation` 또는 `Left side navigation` 중 선택합니다.
4. OpenAI API 키가 있으면 AI가 시안 문구와 섹션 구성을 생성합니다.
5. API 키가 없거나 사용량 한도 문제가 있으면 mock draft로 대체 생성됩니다.
6. 생성 결과는 `data/sites/{slug}.json`에 저장됩니다.
7. `/[slug]`에서 생성된 시안을 확인합니다.
8. `/[slug]/guide`에서 컬러, 문구, 섹션 내용을 수정합니다.
9. 수정한 내용은 같은 JSON 파일에 다시 저장됩니다.

## 디자인 가이드 페이지

생성된 시안을 바로 수정할 수 있도록 `/[slug]/guide` 페이지를 추가했습니다.

현재 수정 가능한 항목은 다음과 같습니다.

- 브랜드 톤
- 레이아웃 규칙
- 섹션 밀도
- CTA 스타일
- 컴포넌트 스타일
- 디자인 메모
- 배경색
- 텍스트 컬러
- 포인트 컬러
- 헤드라인 폰트 방향
- 카드 라운드 스타일
- 내비게이션 위치
- Hero 서브 문구
- About 라벨과 본문
- CTA 버튼 문구
- 섹션별 제목, 본문, 키워드

저장 후에는 `/[slug]` 미리보기 페이지와 `/[slug]/cms` JSON 확인 페이지에 변경 내용이 반영됩니다.

## 데이터 저장 방식

현재 v1 MVP는 별도 DB를 사용하지 않습니다.

생성된 시안은 아래 경로에 JSON 파일로 저장됩니다.

```text
data/sites/{slug}.json
```

문의 또는 리드 데이터는 아래 경로에 저장할 수 있도록 준비되어 있습니다.

```text
data/leads/{id}.json
```

주의: `data/sites/*.json`, `data/leads/*.json`은 `.gitignore`에 포함되어 있어 Git에 커밋되지 않습니다.

## OpenAI API 설정

`.env.local` 파일에 아래 값을 입력합니다.

```env
OPENAI_API_KEY=your_api_key
OPENAI_MODEL=gpt-4o-mini
OPENAI_DESIGN_MODEL=gpt-4o-mini
CANVERS_MOCK_MODE=false
```

`OPENAI_API_KEY`는 OpenAI Platform의 API Keys 화면에서 발급한 프로젝트 키를 사용합니다. 모델 값은 계정에서 사용할 수 있는 모델 ID를 입력하며, 디자인 추천 전용 모델을 따로 지정하지 않으려면 `OPENAI_DESIGN_MODEL`을 `OPENAI_MODEL`과 동일하게 설정합니다.

디자인 가이드의 `AI 디자인 추천`은 요구사항을 구조화된 디자인 토큰으로 변환해 먼저 미리보기를 보여주며, `추천 설정 적용`을 눌렀을 때만 JSON과 시안에 저장합니다. `CANVERS_MOCK_MODE=true`이거나 API 키가 없으면 외부 API를 호출하지 않고 로컬 추천값을 사용합니다.

API 키가 없거나 할당량 문제가 있을 경우 mock mode로 실행할 수 있습니다.

```env
CANVERS_MOCK_MODE=true
```

OpenAI API 키 생성 위치:

```text
https://platform.openai.com/api-keys
```

사용량과 결제 상태 확인:

```text
https://platform.openai.com/usage
https://platform.openai.com/settings/organization/billing/overview
```

## 실행 방법

```powershell
git clone https://github.com/sehyunictsebitleedy/SEbit_canvers_v2.git
cd SEbit_canvers_v2
npm.cmd install
npm.cmd run dev
```

브라우저에서 아래 주소를 엽니다.

```text
http://localhost:3000
```

PowerShell에서 `npm` 실행이 차단되면 `npm.cmd`를 사용합니다.

## 빌드 확인

```powershell
npm.cmd run build
```

현재 확인된 주요 라우트:

```text
/
/templates
/product
/create
/[slug]
/[slug]/guide
/[slug]/cms
/api/generate
/api/leads
/api/slug/check
```

## 기술 스택

- Next.js 14
- React 18
- TypeScript
- OpenAI API
- Zod
- JSON file storage
- Playwright

참고: `@supabase/supabase-js` 의존성은 이전 백엔드 검토 과정에서 포함되어 있으나, 현재 v1 MVP의 생성 결과 저장은 JSON 파일 방식을 기준으로 동작합니다.

## 디자인 시안 자료

- [밝은 컴팩트 시안](./design-drafts/canvers-v2-bright-compact-draft.png)
- [B안 롱페이지 시안](./design-drafts/canvers-b-longpage-draft.png)

## 작업 기록

### 2026-07-05

- Canvers v1 메인 랜딩 구조 정리
- 업종 선택, 테마 선택, 정보 입력, AI 시안 생성 흐름 구성
- `Soft Pastel` 스타일 기반 메인 화면 적용
- 기존 기획 문서와 README 구조 정리

### 2026-07-11

- 첫 번째 디자인 레퍼런스 기반 프리미엄 포스터형 A안 생성
- Friendly AI 콘셉트 기반 B안 생성
- B안을 단락별 롱페이지 시안으로 확장
- `design-drafts/canvers-b-longpage-draft.png` 저장

### 2026-07-18

- Nuxt UI Templates 레퍼런스 검토
- Editor, Dashboard, SaaS, Template 생성 플랫폼 방향 기획
- A안을 더 심플한 섹션형 레이아웃으로 재정리
- 히어로 영역을 노트북 중심에서 AI 생성 캔버스 방향으로 조정

### 2026-07-20

- 밝은 SaaS 랜딩 레퍼런스 기반 최종 시안 방향 확정
- 밝은 오프화이트 배경, 라임 그린 포인트, 블랙 CTA 중심 디자인 적용
- `design-drafts/canvers-v2-bright-compact-draft.png` 저장

### 2026-07-21

- 프로젝트 기준 저장소를 `SEbit_canvers_v2`로 변경
- 메인 랜딩을 최종 밝은 컴팩트 시안 기준으로 구현
- Hero, Value, Dark Feature Band, AI Builder Flow, CTA, Footer 섹션 구현
- Canvers 로고 이미지 반영
- Hero 문구를 `Create your ideal web service draft.`로 변경
- 텍스트 등장 모션, 버튼 hover, 카드 hover, hero float 모션 추가
- 의미 없는 장식 아이콘을 텍스트 기반 UI 요소로 정리
- `/templates` 페이지 추가
- `/product` 페이지 추가
- Product CTA 버튼을 Templates CTA 스타일과 통일

### 2026-07-28

- Product와 Use Case Drafts의 내용 중복을 줄이기 위해 `/cases` 페이지와 메뉴 제거
- 내비게이션을 `Templates`, `Product`, `About` 중심으로 단순화
- DB 없이 동작하는 JSON 저장형 생성 흐름으로 정리
- `/create`, `/api/generate`, `/[slug]`, `/[slug]/cms` 흐름 정비
- OpenAI API 키가 없거나 quota 오류가 있을 때 mock draft로 동작하도록 구성
- 생성된 시안을 수정할 수 있는 `/[slug]/guide` 디자인 가이드 페이지 추가
- 디자인 가이드에서 컬러, 폰트 방향, 라운드, Hero, About, CTA, 섹션 문구를 수정하고 JSON에 저장하도록 구현
- 시안 생성 단계에서 상단형 navi와 좌측형 navi를 선택할 수 있도록 추가
- Dashboard와 Editor 템플릿은 좌측형 navi, SaaS와 Template은 상단형 navi가 기본 추천값으로 설정되도록 조정

## 관련 문서

- [Canvers 기획서 v2.2](./Canvers_기획서_v2.2.md)
- [Backend 구성 문서](./BACKEND.md)

# SEbit Canvers Backend

## Structure

- `app/api/generate`: 시안 생성 API
- `app/api/slug/check`: 사이트 주소 사용 가능 여부 체크
- `app/api/leads`: 맞춤 디자인 문의 저장
- `app/create`: 생성 폼
- `app/[slug]`: 공개 시안 페이지
- `app/[slug]/cms`: CMS 텍스트 편집 화면 초안
- `lib/canvers`: 공통 타입, 테마, 슬러그, mock 카피 생성
- `lib/server`: AI, 저장소, 생성 파이프라인

## Local Setup

```powershell
npm install
copy .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

Without API keys, the app runs in mock mode and still creates proposal pages.

## Environment

```text
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
OPENAI_API_KEY=
CANVERS_MOCK_MODE=true
```

Set `CANVERS_MOCK_MODE=false` after adding `OPENAI_API_KEY`.

## Supabase

Run `supabase/schema.sql` in the Supabase SQL editor.

MVP tables:

- `sites`: generated proposal data
- `leads`: custom design inquiry leads

## Generation Flow

```text
User input
-> generateSite()
-> Track A: reference URL style extraction fallback
-> Track B: preset theme JSON
-> copy generation
-> save site
-> redirect to /{slug}
```

Track A currently returns the warm fallback style unless real screenshot + vision logic is added. The function is already isolated at `lib/server/ai.ts`.

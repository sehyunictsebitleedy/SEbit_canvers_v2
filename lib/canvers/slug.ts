const reservedSlugs = new Set([
  "cms",
  "login",
  "signup",
  "logout",
  "forgot-password",
  "api",
  "admin",
  "pricing",
  "about",
  "blog"
]);

const romanizedFallbacks: Record<string, string> = {
  카페: "cafe",
  로스터스: "roasters",
  공방: "workshop",
  뷰티: "beauty",
  미용: "beauty",
  세현: "sehyun",
  합정: "hapjeong"
};

export function toSlug(value: string) {
  const roughRomanized = Object.entries(romanizedFallbacks).reduce(
    (text, [from, to]) => text.replaceAll(from, ` ${to} `),
    value.trim().toLowerCase()
  );

  const slug = roughRomanized
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .replace(/_/g, "-")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  return slug || "my-site";
}

export function validateSlug(slug: string) {
  const normalized = toSlug(slug);

  if (!/^[a-z0-9-]+$/.test(normalized)) {
    return {
      ok: false,
      slug: normalized,
      reason: "영문 소문자, 숫자, 하이픈만 사용할 수 있습니다."
    };
  }

  if (reservedSlugs.has(normalized)) {
    return {
      ok: false,
      slug: normalized,
      reason: "예약된 주소입니다. 다른 주소를 입력해 주세요."
    };
  }

  return {
    ok: true,
    slug: normalized,
    reason: "사용 가능한 형식입니다."
  };
}

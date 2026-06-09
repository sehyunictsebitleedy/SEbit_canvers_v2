export function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
}

export function isMockMode() {
  return process.env.CANVERS_MOCK_MODE !== "false" || !process.env.OPENAI_API_KEY;
}

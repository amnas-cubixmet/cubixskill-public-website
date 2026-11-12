export function resolveInstructorLoginUrl(panelUrl?: string, loginPath?: string): string | null {
  const path = loginPath?.trim() || '/login';
  if (!panelUrl?.trim() || !path.startsWith('/') || /[\\?#\s]/.test(path) || path.startsWith('//')) {
    return null;
  }

  try {
    const panel = new URL(panelUrl.trim());
    if (!['http:', 'https:'].includes(panel.protocol) || panel.username || panel.password ||
        panel.pathname !== '/' || panel.search || panel.hash) {
      return null;
    }

    const login = new URL(path, panel);
    return login.origin === panel.origin ? login.href : null;
  } catch {
    return null;
  }
}

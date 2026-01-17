export function apiUrl(path: string) {
  const config = useRuntimeConfig();
  const base = String(config.public.apiBase || '').replace(/\/+$|\s+/g, '');
  const trimmed = String(path || '').replace(/^\/+/, '');
  if (!base) return trimmed ? `/${trimmed}` : '/';
  return trimmed ? `${base}/${trimmed}` : base;
}

export function apiFetch(path: string, opts?: any) {
  return $fetch(apiUrl(path), opts);
}

export function useApiFetch(path: string, opts?: any) {
  // useFetch returns reactive refs; caller expects that shape
  return useFetch(apiUrl(path), opts);
}

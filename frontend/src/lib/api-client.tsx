type RequestOptions = {
  method?: string;
  headers?: Record<string, string>;
  body?: any;
  cookie?: string;
  token?: string;
  params?: Record<string, string | number | boolean | undefined | null>;
};

async function fetchApi(url: string, options: RequestOptions = {}) {
  const { method = "GET", body, token } = options;
  const apiUrl = `${window._env_?.VITE_PUBLIC_API_URL || import.meta.env.VITE_PUBLIC_API_URL}${url}`;

  const response = await fetch(apiUrl, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  return response;
}

export const api = {
  get(url: string, token?: string, options?: RequestOptions) {
    return fetchApi(url, { ...options, token, method: "GET" });
  },
  post(url: string, token?: string, body?: any, options?: RequestOptions) {
    return fetchApi(url, { ...options, token, method: "POST", body });
  },
};

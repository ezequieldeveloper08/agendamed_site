interface FetchOptions<TParams> {
  endpoint: string
  params?: TParams
  revalidate?: number | false
  tags?: string[]
}

export async function fetchGeneric<TResponse, TParams = unknown>({
  endpoint,
  params,
  revalidate = 3600,
  tags = [],
}: FetchOptions<TParams>): Promise<TResponse> {
  const url = new URL(endpoint, process.env.NEXT_PUBLIC_API_URL)

  if (params && typeof params === "object") {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value))
      }
    })
  }

  const res = await fetch(url.toString(), {
    method: "GET",
    next: {
      revalidate,
      tags,
    },
    headers: {
      "Content-Type": "application/json",
    },
  })

  if (!res.ok) {
    throw new Error(`Erro ao buscar ${endpoint}: ${res.status}`)
  }

  const json = await res.json()
  return json
}

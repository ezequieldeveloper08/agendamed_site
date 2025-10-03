import { useState, useCallback, useEffect } from "react";
import { parseCookies } from "nookies";

export function useApi() {
    const baseUrl = 'http://localhost:8080/';
    const [running, setRunning] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<any>(null);

    const handleRequest = useCallback(
        async (method: string, path: string, body?: any) => {
            setRunning(true);
            setError(null);

            try {
                const { 'agendamed.access_token': rawToken } = parseCookies();
                const token = rawToken?.replace(/^"|"$/g, "");
                const res = await fetch(`${baseUrl}${path}`, {
                    method,
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": token && `Bearer ${token}`
                    },
                    body: body ? JSON.stringify(body) : undefined,
                });

                if (!res.ok) {
                    const errorData = await res.json()
                    console.log(errorData?.message);
                    throw new Error(errorData?.message ?? `Erro ${method} ${path}: ${res.status}`);
                }

                const json = await res.json();
                setData(json);
                return json;
            } catch (err: any) {
                setError(err.message);
                throw err;
            } finally {
                setRunning(false);
            }
        },
        [baseUrl]
    );

    const get = (path: string) => handleRequest("GET", path);
    const post = (path: string, body: any) => handleRequest("POST", path, body);
    const put = (path: string, body: any) => handleRequest("PUT", path, body);
    const patch = (path: string, body: any) => handleRequest("PATCH", path, body);
    const del = (path: string) => handleRequest("DELETE", path);

    return { get, post, put, patch, del, running, error, data };
}

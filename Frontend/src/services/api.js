// src/services/api.js
// Wrapper mínimo sobre fetch para reemplazar axios.

// Base URL del backend (ajústala según tu puerto)
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

let authToken = null;

// Guardar/eliminar token para usar en las peticiones
export function setAuthToken(token) {
    authToken = token;
}

// Helper que realiza peticiones al backend usando fetch
export async function apiFetch(path, options = {}) {
    const url = path.startsWith("http") ? path : `${BASE_URL}${path}`;

    const headers = Object.assign({}, options.headers || {});

    // Por defecto trabajamos con JSON
    if (!headers["Content-Type"] && !(options.body instanceof FormData)) {
        headers["Content-Type"] = "application/json";
    }

    if (authToken) {
        headers["Authorization"] = `Bearer ${authToken}`;
    }

    try {
        const res = await fetch(url, { ...options, headers });

        // Intento parsear JSON, si hay contenido
        const text = await res.text();
        let data = null;
        try {
            data = text ? JSON.parse(text) : null;
        } catch (e) {
            // No es JSON
            data = text;
        }

        if (!res.ok) {
            return { ok: false, status: res.status, error: data || res.statusText, data: data };
        }

        return { ok: true, data };
    } catch (err) {
        return { ok: false, error: err.message || String(err) };
    }
}

export default { apiFetch, setAuthToken, BASE_URL };
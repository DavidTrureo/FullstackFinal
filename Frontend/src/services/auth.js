// Defino las claves que voy a usar en localStorage:
// - USERS_KEY: para guardar la lista completa de usuarios.
// - CURRENT_KEY: para guardar el usuario actualmente logueado.
const USERS_KEY = "lug_users";
const CURRENT_KEY = "lug_current_user";

// Función auxiliar para cargar usuarios desde localStorage.
// Si no hay nada guardado, retorna un arreglo vacío.
const loadUsers = () => {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) ?? [];
  } catch {
    return [];
  }
};

// Función auxiliar para guardar la lista de usuarios en localStorage.
const saveUsers = (users) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

// Función para generar un hash SHA-256 de un texto (como la contraseña).
// Uso la API Web Crypto y convierto el resultado a hexadecimal.
async function sha256(text) {
  const enc = new TextEncoder();
  const buf = await crypto.subtle.digest("SHA-256", enc.encode(text));
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

// -------------------- API pública --------------------

// Función para registrar un nuevo usuario.
export async function registerUser({ name, email, tel, password }) {
  const users = loadUsers();

  // Verifico si el correo ya existe en la lista de usuarios.
  const exists = users.some((u) => u.email.toLowerCase() === email.toLowerCase());
  if (exists) {
    const err = new Error("El correo ya está registrado.");
    err.code = "EMAIL_TAKEN";
    throw err;
  }

  // Genero el hash de la contraseña para no guardarla en texto plano.
  const passwordHash = await sha256(password);

  // Creo el nuevo usuario con un ID único y fecha de creación.
  const newUser = {
    id: crypto.randomUUID(),
    name,
    email,
    tel,
    passwordHash,
    createdAt: new Date().toISOString(),
  };

  // Lo agrego a la lista y guardo en localStorage.
  users.push(newUser);
  saveUsers(users);

  // Al registrar, automáticamente lo considero logueado.
  localStorage.setItem(CURRENT_KEY, JSON.stringify({ id: newUser.id, email, name, tel }));

  // Retorno los datos básicos del usuario.
  return { id: newUser.id, email, name, tel };
}

// Función para iniciar sesión.
export async function loginUser({ email, password }) {
  const users = loadUsers();

  // Busco el usuario por correo.
  const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (!user) {
    const err = new Error("Correo o contraseña inválidos.");
    err.code = "INVALID_CREDENTIALS";
    throw err;
  }

  // Verifico que la contraseña coincida con el hash guardado.
  const passwordHash = await sha256(password);
  if (passwordHash !== user.passwordHash) {
    const err = new Error("Correo o contraseña inválidos.");
    err.code = "INVALID_CREDENTIALS";
    throw err;
  }

  // Guardo al usuario como el actual en localStorage.
  localStorage.setItem(CURRENT_KEY, JSON.stringify({ id: user.id, email: user.email, name: user.name, tel: user.tel }));

  // Retorno los datos básicos del usuario.
  return { id: user.id, email: user.email, name: user.name, tel: user.tel };
}

// Función para cerrar sesión: simplemente elimino el usuario actual de localStorage.
export function logoutUser() {
  localStorage.removeItem(CURRENT_KEY);
}

// Función para obtener el usuario actual desde localStorage.
export function getCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem(CURRENT_KEY)) || null;
  } catch {
    return null;
  }
}

// Función para actualizar el perfil del usuario actual (nombre y teléfono).
export function updateCurrentUserProfile({ name, tel }) {
  const current = getCurrentUser();
  if (!current) return null;

  const users = loadUsers();
  const idx = users.findIndex((u) => u.id === current.id);

  if (idx >= 0) {
    // Actualizo los datos en la lista de usuarios.
    users[idx] = { ...users[idx], name: name ?? users[idx].name, tel: tel ?? users[idx].tel };
    saveUsers(users);

    // Actualizo también la sesión actual.
    const updated = { ...current, name: users[idx].name, tel: users[idx].tel };
    localStorage.setItem(CURRENT_KEY, JSON.stringify(updated));
    return updated;
  }

  return current;
}
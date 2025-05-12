# Frávega GitHub Users Challenge

Aplicación web desarrollada como parte del challenge técnico.  
Permite buscar usuarios de GitHub, ver sus detalles y marcarlos como favoritos (sin persistencia local).

---

## 🚀 Tecnologías

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Context API
- GitHub REST API
- Server Components / Client Components
- SSR y CSR combinados
- Jest + React Testing Library

---

## ⚙️ Requisitos

- Node.js **v19.8.0 o superior**
- npm **v10.0.0 o superior**
- Recomendado: usar `nvm`

nvm install 20
nvm use 20


---

## 🔐 Variables de entorno

Crear un archivo `.env.local` en la raíz del proyecto con el siguiente contenido:

GITHUB_API_URL=https://api.github.com
NEXT_PUBLIC_GITHUB_API_TOKEN=pone_tu_token_personal_aca


> ⚠️ Este proyecto funciona sin autenticación, pero GitHub impone un límite de **60 requests por hora** para usuarios no autenticados.  
> Si querés evitar ese límite, generá un token personal desde tu cuenta de GitHub y agregalo como se indica arriba.

---

## 🧪 Funcionalidades

### Página principal (`/`)
- Lista inicial de usuarios (**CSR**)
- Búsqueda por nombre con debounce
- Renderizado responsivo con Tailwind
- Marcar/desmarcar favoritos (estado global en Context)

### Detalle de usuario (`/user/[username]`)
- Renderizado **SSR** con Server Components
- Datos completos del usuario
- Repos públicos (limitados a 10)
- Botón de favorito (Client Component)
- Modal visual con rutas paralelas (**App Router**)

### Estado de la interfaz
- `error.tsx`: Error boundaries
- `loading.tsx`: Pantalla de carga
- `not-found.tsx`: Página no encontrada

---

## 🧪 Tests

Este proyecto incluye tests unitarios y de integración con cobertura automatizada.

- Framework: **Jest + React Testing Library**
- Objetivo de cobertura: **80% o más**

### Incluye tests para:
- Componentes: `UserCard`, `SearchInput`, `FavoriteButton`, `Loader`
- SSR Client Component: `UserDetailClient`
- Context global: `FavoritesContext`
- Integración de `HomePage`
- Utilidades de API: `lib/github.ts`

npm test
npm run test:coverage


---

## 📦 Instalación

git clone https://github.com/garemar/github-users-fravega.git
cd github-users-fravega
npm install
npm run dev


Abrí [http://localhost:3000](http://localhost:3000) en tu navegador.

---

## 📁 Estructura del proyecto

/src
/app → App Router (layout, pages)
/(main) → Página principal con slot para modal
@modal/user/[username] → Modal SSR de detalle de usuario
/components → UI Components (UserCard, SearchInput, etc.)
/context → Estado global (FavoritesContext)
/lib → Acceso a la API de GitHub
/styles → Tailwind base (globals.css)


---

## ℹ️ Nota técnica

Al utilizar rutas paralelas con modales `fixed`, el navegador puede emitir el siguiente warning:

Skipping auto-scroll behavior due to position: fixed...


> Este mensaje es esperable, **no representa un error** y **no afecta la experiencia visual**.  
> Podés ignorarlo con seguridad.
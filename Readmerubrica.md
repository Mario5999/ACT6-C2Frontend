# Cinematoon — Respuesta a la Rúbrica

Universidad Politécnica de Chiapas  
Docente: Viviana López Rojo

Este documento responde directamente a la rúbrica de evaluación con base en la implementación actual del proyecto.

## 1) Reporte PDF (15%)

### Criterio: Diagrama y Justificación SOA
**Qué pide la rúbrica:**
- Diagrama arquitectónico claro (puertos, redes, tecnologías).
- Explicación técnica de la separación de responsabilidades.
- Detalle de implementación.

**Cómo se responde en este proyecto:**
- Arquitectura separada en capas:
	- Frontend (Next.js): interfaz y consumo de API.
	- Backend (Express): capa intermedia para exponer endpoints propios.
	- API de terceros (TMDB): fuente de datos.
- Puertos usados:
	- Frontend: `http://localhost:3000`
	- Backend: `http://localhost:3001`
- Separación de responsabilidades:
	- Frontend solo consume endpoints del backend.
	- Backend gestiona lógica de integración, API key y errores.

**Evidencia técnica (código):**
- Backend en puerto `3001`: `Backend/server.js`
- Endpoints internos:
	- `GET /apiv1/movies`
	- `GET /apiv1/tv`
	- `GET /apiv1/actors`
	(definidos en `Backend/Api/*.js` y registrados en `Backend/server.js`)
- Integración con TMDB y manejo de key en backend:
	- `Backend/controllers/moviesController.js`
	- `Backend/controllers/seriesController.js`
	- `Backend/controllers/actorsController.js`

## 2) Implementación (15%)

### Criterio: Estructura Multirepo
**Qué pide la rúbrica:** 3 repositorios independientes.

**Estado actual:** **Parcial**
- En el workspace actual se observan dos proyectos principales:
	- `Backend/`
	- `cinematoon/`
- Para cumplir al 100% este criterio, debe existir y entregarse un tercer repositorio (por ejemplo: infraestructura, documentación técnica o despliegue).

### Criterio: Buenas prácticas
**Estado actual:** **Cumple**

**Variables de entorno (.env):**
- Backend carga variables con `dotenv` en `Backend/server.js`.
- API key leída desde variables de entorno en controladores (`TMDB_API_KEY` o `NEXT_PUBLIC_TMDB_API_KEY`).

**Asincronía (`async/await`):**
- Backend: consumo de TMDB con `fetch` y `async/await` en controladores.
- Frontend: consumo al backend con `fetch` y `async/await` en:
	- `cinematoon/app/Pages/Movies.tsx`
	- `cinematoon/app/Pages/Series.tsx`
	- `cinematoon/app/Pages/Actors.tsx`

**Manejo de estados UI (loading/success/error):**
- `loading`: muestra “Cargando...”.
- `success`: renderiza datos en tarjetas.
- `error`: muestra mensaje amigable sin romper la app.

**CORS:**
- Configurado en backend con middleware `cors()` en `Backend/server.js`.

## 3) Defensa (70%)

### Criterio: Dominio del flujo de datos
**Flujo esperado para explicar en defensa:**
1. El cliente (Next.js) lanza petición HTTP al backend (`/apiv1/...`).
2. El backend recibe la petición y ejecuta controlador.
3. El controlador consulta TMDB con la API key segura en backend.
4. El backend transforma/reenvía respuesta al frontend.
5. El frontend actualiza estado y pinta loading/success/error.

### Criterio: Justificación de seguridad y red
**Puntos clave para argumentar:**
- CORS permite que frontend y backend en puertos distintos se comuniquen en desarrollo.
- API key sensible se gestiona en backend con variables de entorno.
- Aislamiento por puertos separa responsabilidades y reduce acoplamiento.

### Criterio: Resolución y tolerancia a fallos
**Qué ya implementa el proyecto:**
- Si TMDB responde error, backend devuelve estado y payload de error.
- Si hay fallo de red o excepción, backend responde 500 con mensaje controlado.
- Frontend captura error y muestra mensaje amigable al usuario.

## Resumen de cumplimiento

| Entregable | Criterio | Estado |
|---|---|---|
| Reporte PDF | Diagrama y Justificación SOA | En proceso (documentar en PDF final) |
| Implementación | Estructura Multirepo (3 repos) | Parcial |
| Implementación | Buenas prácticas (.env, async/await, UI states, CORS) | Cumple |
| Defensa | Dominio del flujo de datos | Cumple (preparar explicación oral) |
| Defensa | Justificación de seguridad y red | Cumple |
| Defensa | Resolución y tolerancia a fallos | Cumple |

## Ejecución local

### Backend
```bash
cd Backend
npm run dev
### Frontend
```bash
cd cinematoon
npm run dev

```


```

## Pendientes para cerrar rúbrica al 100%

- Entregar PDF con diagrama arquitectónico formal (puertos, tecnologías, flujo HTTP).
- Confirmar y entregar 3 repositorios independientes (si la materia lo exige estrictamente).
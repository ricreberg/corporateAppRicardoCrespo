# Actividad 3 · Aplicación corporativa con Ionic y Angular

Práctica de Desarrollo de Interfaces (2.º DAM).
Fecha de la actividad: 2 de octubre de 2026.

- **Autor:** Ricardo Crespo
- **Proyecto:** corporateApp_RicardoCrespo
- **Rama de trabajo:** desarrollo

## Aplicación publicada

https://corporate-app-ricardo-crespo.vercel.app/home

## Funcionalidades

- Home con menú horizontal hacia Productos, Nosotros y Contacto.
- Catálogo de tres productos desde un JSON local, con ID, nombre,
  unidades, precio, fotografía y vendedor.
- Fotografías optimizadas en WebP.
- Descripción de la empresa y geolocalización del dispositivo.
- Cálculo de distancia geográfica a las coordenadas de oficina
  facilitadas para la práctica.
- Formulario de contacto con validación de correo y mensaje.
- Guardado y recuperación del último mensaje en el dispositivo.
- Ejecución en Android mediante Capacitor y publicación web en Vercel.

El formulario guarda el mensaje localmente; no envía correos.
Cada nuevo mensaje sustituye al anterior.

La distancia se calcula mediante Haversine y no representa
un recorrido por carretera. Requiere permiso de ubicación.

## Tecnologías

Ionic 9, Angular 22, TypeScript, SCSS y Capacitor 8.

Complementos de Capacitor: Geolocation y Preferences.

## Estructura

- src/app/pages/: Home, Productos, Nosotros y Contacto.
- src/app/models/: interfaz Product.
- src/app/services/: servicio de consulta de productos.
- src/assets/data/products.json: datos del catálogo.
- src/assets/images/: fotografías en WebP.
- android/: proyecto nativo.
- vercel.json: compilación y reescritura de rutas para Vercel.

La geolocalización y la persistencia se implementan directamente
en sus páginas, siguiendo las indicaciones de clase.

## Ejecución local

Requisitos: Node.js, npm e Ionic CLI.

Desde la carpeta del proyecto:

```bash
npm ci
ionic serve
```

Abre http://localhost:8100/home, o el puerto indicado por la terminal.

## Compilación

```bash
npm run build
```

La aplicación compilada se genera en www.

## Android

Requiere Android Studio y el entorno Android configurado.

Para actualizar los recursos del proyecto nativo:

```bash
npm run build
npx cap sync android
npx cap open android
```

Si el último comando no localiza Android Studio, abre manualmente
la carpeta android desde el IDE.

La aplicación se probó en un emulador Pixel 9 con Android 15 (API 35),
compilando con el SDK de Android 16 (API 36).

## Publicación

El código se mantiene en la rama desarrollo, configurada como
predeterminada. Vercel utiliza npm run build y publica www.

La configuración de reescritura permite acceder directamente
a las rutas de Angular y recargarlas.

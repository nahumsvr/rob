# Rob - Tu compañero de estudio

## Descripción

Rob, tu nuevo mejor amigo, incentiva un equilibrio saludable: se alimenta y prospera cuando el estudiante completa tanto sesiones de estudio enfocadas como pausas de descanso activo, como meditaciones y ejercicios de respiración. Este ciclo positivo no solo impulsa la productividad, sino que también promueve activamente la salud mental.

## Cómo Empezar

Sigue estas instrucciones para tener una copia del proyecto corriendo en tu máquina local para desarrollo y pruebas.

### Prerrequisitos

Necesitarás tener instalado en tu sistema:

  * Node.js y npm
  * Angular CLI
  * Xcode
  * CocoaPods

### Clonar el Repositorio

Primero, clona el repositorio en tu máquina local usando el siguiente comando en tu terminal:

```bash
git clone https://github.com/nahumsvr/rob.git
```

### Instalar Dependencias

Navega al directorio del proyecto e instala las dependencias necesarias:

```bash
cd rob
npm install
```

### Correr en Xcode (para iOS)

1.  **Construir el proyecto de Angular:**

    ```bash
    ng build --configuration=production
    ```

2.  **Añadir la plataforma de iOS a Capacitor:**

    ```bash
    npx cap add ios
    ```

3.  **Sincronizar el proyecto:**

    ```bash
    npx cap sync
    ```

4.  **Abrir el proyecto en Xcode:**

    ```bash
    npx cap open ios
    ```

5.  Una vez que Xcode esté abierto, puedes seleccionar un simulador o un dispositivo físico y correr la aplicación.

## Futuras Implementaciones

Nuestro plan es evolucionar "Rob" con las siguientes mejoras clave:

  * **Gamificación y Recompensas:** Implementar un sistema de moneda virtual para desbloquear accesorios y personalizar a Rob.
  * **Módulo de Bienestar Avanzado:** Integrar meditaciones guiadas y sincronización con Apple Health para monitorizar la calidad del sueño.
  * **Herramientas de Enfoque Total:** Introducir un modo de concentración que bloquee notificaciones y aplicaciones que generen distracciones.
  * **Modelo de Sostenibilidad:** Añadir compras integradas opcionales para contenido cosmético.
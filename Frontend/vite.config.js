// Importo la función defineConfig desde Vite.
// Esto me permite definir la configuración del proyecto de manera clara y tipada.
import { defineConfig } from 'vite'

// Importo el plugin oficial de React para Vite.
// Gracias a este plugin, Vite entiende cómo compilar JSX y optimizar React.
import react from '@vitejs/plugin-react'

// Exporto la configuración principal del proyecto.
// Uso defineConfig para que Vite reconozca todo lo que está dentro.
export default defineConfig({
  // Aquí indico los plugins que quiero usar. En este caso, React.
  plugins: [react()],

  // ✅ Configuración de Vitest (el sistema de pruebas que estoy usando)
  test: {
    // Defino el entorno de pruebas como "jsdom".
    // Esto simula un navegador dentro de Node.js, ideal para testear componentes React.
    environment: 'jsdom',

    // Activo "globals" para poder usar funciones como describe, it y expect
    // sin necesidad de importarlas en cada archivo de test.
    globals: true,

    // setupFiles: archivo donde preparo configuraciones extra para las pruebas.
    // Aquí cargo jest-dom para tener matchers adicionales como "toBeInTheDocument".
    setupFiles: './src/setupTests.js',

    // Permito importar CSS dentro de los tests.
    // Esto es útil si quiero probar componentes que dependen de estilos.
    css: true,

    // Configuración de cobertura de pruebas
    coverage: {
      // Uso el motor oficial "v8" para medir cobertura.
      provider: 'v8',

      // Defino los reportes: uno en texto (consola) y otro en HTML (más visual).
      reporter: ['text', 'html'],

      // Indico la carpeta donde se guardarán los reportes de cobertura.
      reportsDirectory: './coverage',
    },
  },
})
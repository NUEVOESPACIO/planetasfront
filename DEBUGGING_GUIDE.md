# Guía de Debugging en React con VS Code

## ¿Qué es un Debugger?

Un **debugger** es una herramienta que te permite:
- **Pausar** la ejecución de tu código en puntos específicos (breakpoints)
- **Inspeccionar** variables y su estado en ese momento
- **Recorrer** el código línea por línea
- **Ver** el flujo de ejecución de tu aplicación

## Cómo usar el Debugger en VS Code

### Paso 1: Configurar Breakpoints

Un **breakpoint** es un punto donde quieres que el código se pause.

1. Abre cualquier archivo `.jsx` o `.js` (por ejemplo, `src/App.jsx`)
2. Haz clic en el **margen izquierdo** (al lado del número de línea) donde quieres pausar
3. Verás un **punto rojo** 🔴 - ese es tu breakpoint

**Ejemplo:**
```jsx
function App() {
  const [currentView, setCurrentView] = useState('home')  // ← Breakpoint aquí
  
  const handleNavigate = (viewId) => {
    setCurrentView(viewId)  // ← O aquí
  }
  // ...
}
```

### Paso 2: Iniciar el Servidor de Desarrollo

**IMPORTANTE:** El servidor debe estar corriendo ANTES de iniciar el debugger.

1. Abre una terminal en VS Code (`` Ctrl + ` ``)
2. Ejecuta:
   ```bash
   npm run dev
   ```
3. Espera a que veas: `Local: http://localhost:5173/`

### Paso 3: Iniciar el Debugger

1. Ve a la pestaña **"Run and Debug"** en VS Code:
   - Presiona `Ctrl + Shift + D` (o `Cmd + Shift + D` en Mac)
   - O haz clic en el ícono de "play con bug" 🐛 en la barra lateral

2. En la parte superior, selecciona **"Debug React App (Chrome)"**

3. Haz clic en el botón **▶️ verde** o presiona `F5`

4. Se abrirá una nueva ventana de Chrome con tu aplicación

### Paso 4: Usar el Debugger

Cuando el código llegue a tu breakpoint:

#### Panel de Debug (izquierda):
- **Variables**: Ve todas las variables y sus valores
- **Watch**: Agrega expresiones para monitorear
- **Call Stack**: Ve la pila de llamadas (qué funciones llamaron a esta)
- **Breakpoints**: Lista de todos tus breakpoints

#### Controles (arriba):
- **▶️ Continue (F5)**: Continúa la ejecución hasta el próximo breakpoint
- **⏸️ Pause**: Pausa la ejecución
- **⏭️ Step Over (F10)**: Ejecuta la línea actual y va a la siguiente
- **⤵️ Step Into (F11)**: Entra dentro de una función
- **⤴️ Step Out (Shift + F11)**: Sale de la función actual
- **🔄 Restart (Ctrl + Shift + F5)**: Reinicia el debugger
- **⏹️ Stop (Shift + F5)**: Detiene el debugger

## Ejemplo Práctico: Debuggear el Menú

### 1. Agrega breakpoints en `Menu.jsx`:

```jsx
function Menu({ currentView, onNavigate }) {
  const handleClick = (e, viewId) => {
    e.preventDefault();  // ← Breakpoint aquí 🔴
    onNavigate(viewId);  // ← Y aquí 🔴
  };
  // ...
}
```

### 2. Agrega breakpoint en `App.jsx`:

```jsx
const handleNavigate = (viewId) => {
  setCurrentView(viewId)  // ← Breakpoint aquí 🔴
}
```

### 3. Inicia el debugger y haz clic en "Inicio" en el menú

### 4. Observa:
- El código se pausará en `handleClick`
- Puedes ver el valor de `viewId` en el panel Variables
- Presiona **F10** (Step Over) para avanzar línea por línea
- Verás cómo `onNavigate` llama a `handleNavigate` en App.jsx

## Tips y Trucos

### 1. Debug Console
En la parte inferior, hay una **Debug Console** donde puedes:
- Escribir expresiones JavaScript
- Evaluar variables: escribe `currentView` y verás su valor
- Ejecutar código: escribe `console.log(viewId)`

### 2. Conditional Breakpoints
Puedes hacer que un breakpoint solo se active bajo ciertas condiciones:

1. Click derecho en el breakpoint 🔴
2. Selecciona "Edit Breakpoint"
3. Escribe una condición, por ejemplo: `viewId === 'about'`

### 3. Logpoints
En lugar de pausar, puedes hacer que imprima un mensaje:

1. Click derecho en el margen
2. Selecciona "Add Logpoint"
3. Escribe: `Current view: {viewId}`

### 4. Inspeccionar Variables
- **Hover** sobre una variable para ver su valor
- En el panel **Variables**, expande objetos para ver sus propiedades
- **Click derecho** en una variable → "Set Value" para cambiar su valor (útil para testing)

## Atajos de Teclado Útiles

- `F5`: Iniciar/Continuar debugging
- `F9`: Toggle breakpoint (agregar/quitar breakpoint en la línea actual)
- `F10`: Step Over (siguiente línea)
- `F11`: Step Into (entrar en función)
- `Shift + F11`: Step Out (salir de función)
- `Shift + F5`: Detener debugging
- `Ctrl + Shift + F5`: Reiniciar debugging

## Solución de Problemas

### El debugger no se conecta
- ✅ Asegúrate de que `npm run dev` esté corriendo
- ✅ Verifica que el puerto sea 5173 (o el que uses)
- ✅ Cierra y vuelve a abrir Chrome si es necesario

### Los breakpoints no funcionan
- ✅ Verifica que el archivo esté guardado
- ✅ Asegúrate de que `sourceMaps: true` esté en la configuración
- ✅ Revisa que estés usando la configuración correcta en launch.json

### No veo las variables
- ✅ Verifica que el código haya llegado al breakpoint
- ✅ Expande los objetos en el panel Variables
- ✅ Usa la Debug Console para evaluar expresiones

## Ejercicio Práctico

1. Abre `src/App.jsx`
2. Agrega un breakpoint en la línea `setCurrentView(viewId)`
3. Inicia el debugger
4. Haz clic en diferentes opciones del menú
5. Observa cómo cambia el valor de `viewId` cada vez
6. Usa **Step Over** para ver qué pasa después de `setCurrentView`

¡Ahora estás listo para debuggear tu aplicación React! 🎉

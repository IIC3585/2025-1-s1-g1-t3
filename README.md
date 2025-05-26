#### IIC3585-1 SECCIÓN 1 - GRUPO 1
# 🤖 Trabajo 3: Frameworks Vue y Svelte

MoneyExchange

| Integrantes | Mail UC |
|-|-|
| Tarek Elías Hirmas Aboid | tarek.hirmas@uc.cl |
| Sebastián Lobo Cáceres | salobo@uc.cl|
| Anita Martí Campos | asmarti@uc.cl |

> [!NOTE]
> Fecha de entrega 26-05-2025


### :book: Correr el proyecto
> [!WARNING]
> Es necesario tener node instalado

1. Clonar el repositorio mediante git
```bash
https://github.com/IIC3585/2025-1-s1-g1-t3.git
```
2. Ir a la carpeta del proyecto que se desea correr
3. Instalar las dependencias
```bash
npm install
```
4. Correr el proyecto, por defecto ambos proyectos corren en **http://localhost:5173/**
```bash
npm run dev
```

### 📦 Estructura del Proyecto

El proyecto está organizado de la siguiente manera:

```
.
├── app-svelte/                         // Versión Svelte de la aplicación
|   ├── src/                            // Código fuente Svelte
|   │   ├── lib/
|   |   │   ├── components/             // Componentes reutilizables de UI
|   |   |   │   ├── chart/              // Gráfico de variación de moneda
|   |   |   │   ├── multipleConverter/  // Conversor de múltiples monedas
|   |   |   │   ├── singleConverter/    // Conversor de una sola moneda
|   |   |   │   ├── ui/                 // Componentes de interfaz genéricos
|   |   │   ├── hooks/                  // Lógica reutilizable (Svelte)
|   |   │   ├── api.ts                  // Interacción con la API de tasas
|   |   │   ├── currencies.ts           // Definiciones de monedas
|   |   │   ├── index.ts
|   |   │   ├── types.ts                // Definiciones de tipos TypeScript
|   |   │   ├── utils.ts                // Funciones de utilidad
|   |   ├── routes/                     // Rutas y páginas de la aplicación
|   |   │   ├── +layout.svelte          // Diseño global de la app
|   |   │   ├── +page.svelte            // Página principal de la app
|   |   ├── app.css                     // Estilos globales Svelte
|   |   ├── app.d.ts                
|   |   ├── app.html                
|   ├── static/                         // Archivos estáticos
|   │   ...
|   ├── package.json
|   ├── README.md
├── app-vue/                        // Versión Vue de la aplicación
|   ├── public/                     // Archivos estáticos Vue
│   ├── src/                        // Código fuente Vue
|   │   ├── assets/                 // Activos como imágenes, fuentes
|   │   ├── components/             // Componentes reutilizables de UI
|   |   │   ├── chart/              // Gráfico de variación de moneda
|   |   │   ├── icons/              // Iconos de la interfaz
|   |   │   ├── multipleConverter/  // Conversor de múltiples monedas
|   |   │   ├── singleConverter/    // Conversor de una sola moneda
|   |   │   ├── ui/                 // Componentes de interfaz genéricos
|   │   ├── lib/                    // Lógica compartida
|   |   │   ├── api.ts              // Interacción con la API de tasas
|   |   │   ├── currencies.ts       // Definiciones de monedas
|   |   │   ├── types.ts            // Definiciones de tipos TypeScript
|   |   │   ├── utils.ts            // Funciones de utilidad
|   │   ├── App.vue                 // Componente raíz de la app
|   │   ├── main.ts                 // Punto de entrada de la app
|   │   ...
|   ├── package.json
|   ├── README.md
└── README.md                       // README principal del proyecto          
```

### 🛠️ Características principales:

Estas aplicaciones, disponibles tanto en Svelte como en Vue, ofrecen una solución completa para la gestión y visualización de tipos de cambio de moneda. Cuentan con tres funcionalidades principales:

* **Conversión Simple de Monedas**
Permite realizar conversiones rápidas y directas entre dos monedas específicas. Ideal para necesidades puntuales y cálculos rápidos.

* **Conversión Múltiple de Monedas**
Ofrece la posibilidad de convertir una cantidad a diversas monedas simultáneamente. Esto es útil para comparar valores en diferentes divisas de un vistazo.

* **Visualización Gráfica de la Variación Histórica**
Presenta un gráfico interactivo que muestra la evolución del tipo de cambio de una moneda a lo largo del tiempo. Esta característica es invaluable para analizar tendencias y tomar decisiones informadas.

Ambas versiones de la aplicación **(Svelte y Vue)** comparten la misma lógica central, garantizando una experiencia consistente y funcional, independientemente del framework elegido.


### 🚀 Conexión con APIS

Para garantizar la precisión y la actualidad de los datos, la aplicación se conecta a dos APIs de intercambio de divisas distintas y gratuitas, ninguna de las cuales requiere una API key para su uso. Esto facilita el acceso a la información sin configuraciones adicionales.

1. Conversión Simple y Múltiple de Monedas
Para las funcionalidades de conversión simple y múltiple, la aplicación utiliza la API de [Open Exchange Rates](https://www.google.com/search?q=open.er-api.com). Esta API proporciona tasas de cambio globales y actualizadas, permitiendo conversiones precisas entre una amplia variedad de divisas.

2. Variación Gráfica del Cambio en el Tiempo
Para la visualización histórica de la variación de los tipos de cambio, la aplicación se integra con la API de [Frankfurter](https://frankfurter.dev/) (api.frankfurter.dev). Esta API se eligió debido a que es gratuita, sin embargo, está limitada a cambio proveniente del Banco Central Europeo.

Estas dos integraciones aseguran que la aplicación pueda ofrecer tanto conversiones en tiempo real como análisis históricos detallados, cubriendo así todas las necesidades de nuestros usuarios.
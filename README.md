# 🛍️ Stocchero E-commerce - Mobile App

Una aplicación móvil de e-commerce desarrollada con **React Native** y **Expo**, diseñada para ofrecer una experiencia de compra completa con funcionalidades offline y sincronización en tiempo real. El proyecto integra **Firebase Realtime Database**, **SQLite** para persistencia local, **Redux Toolkit** para manejo de estado, y utiliza interfaces nativas del dispositivo como cámara y geolocalización.

---

## 📱 Demo y Descargas

### APK (Opcional)

Descarga la aplicación compilada para Android: [Stocchero-Ecommerce.apk](https://github.com/NicoStocchero/ecommerce-stocchero/releases)

### Repositorio

Código fuente completo: [GitHub Repository](https://github.com/NicoStocchero/ecommerce-stocchero)

---

## 🚀 Funcionalidades Principales

### 🛒 **E-commerce Completo**

- ✅ Catálogo de productos con filtros por categorías
- ✅ Vista detallada de productos con imágenes
- ✅ Carrito de compras con persistencia local (SQLite)
- ✅ Sistema de checkout con creación de órdenes en Firebase
- ✅ Historial de pedidos con sincronización en tiempo real

### 🔐 **Autenticación y Perfiles**

- ✅ Sistema de registro y login con Firebase Auth
- ✅ Perfil de usuario con foto de perfil (cámara/galería)
- ✅ Persistencia de sesión con SQLite
- ✅ Gestión de tokens y refresh automático

### 📍 **Geolocalización y Mapas**

- ✅ Localización de tiendas cercanas
- ✅ Integración con Google Maps API
- ✅ Cálculo de distancias en tiempo real
- ✅ Lista de tiendas con información detallada

### 📱 **Interfaces Nativas**

- ✅ **Cámara**: Captura de fotos para perfil de usuario
- ✅ **Galería**: Selección de imágenes existentes
- ✅ **Geolocalización**: Permisos y acceso a ubicación
- ✅ **Almacenamiento**: Guardado de imágenes en dispositivo

### 🔄 **Sincronización Offline**

- ✅ Persistencia local con SQLite
- ✅ Sincronización automática al reconectar
- ✅ Manejo de estados offline/online
- ✅ Cache de productos y datos de usuario

---

## 🏗️ Arquitectura del Proyecto

### **Estructura de Carpetas**

```
src/
├── components/          # Componentes reutilizables
│   ├── Auth/           # Componentes de autenticación
│   ├── Cart/           # Componentes del carrito
│   ├── Maps/           # Componentes de mapas
│   ├── Orders/         # Componentes de órdenes
│   ├── Profile/        # Componentes de perfil
│   ├── Shop/           # Componentes de tienda
│   └── UI/             # Componentes UI genéricos
├── features/           # Lógica de Redux Toolkit
│   ├── auth/           # Estado de autenticación
│   ├── cart/           # Estado del carrito
│   ├── profile/        # Estado del perfil
│   ├── shop/           # Estado de la tienda
│   └── user/           # Estado del usuario
├── hooks/              # Custom hooks
├── navigation/         # Configuración de navegación
├── screens/            # Pantallas principales
├── services/           # Servicios de API y Firebase
├── store/              # Configuración de Redux
├── utils/              # Utilidades y helpers
└── global/             # Configuración global (colores, etc.)
```

### **Tecnologías y Librerías**

#### **Core**

- **React Native** - Framework móvil
- **Expo** - Plataforma de desarrollo
- **Redux Toolkit** - Manejo de estado global
- **RTK Query** - Gestión de APIs

#### **Navegación**

- **React Navigation** - Navegación entre pantallas
- **Tab Navigator** - Navegación por pestañas
- **Stack Navigator** - Navegación por pilas

#### **Base de Datos**

- **Firebase Realtime Database** - Base de datos en tiempo real
- **Firebase Authentication** - Autenticación de usuarios
- **SQLite** - Persistencia local (expo-sqlite)

#### **Interfaces Nativas**

- **Expo ImagePicker** - Cámara y galería
- **Expo Location** - Geolocalización
- **Expo FileSystem** - Manejo de archivos

#### **UI/UX**

- **React Native Vector Icons** - Iconografía
- **Custom Fonts** - Tipografía Inter
- **Custom Design System** - Sistema de colores y componentes

---

## 🎯 Objetivos Cumplidos

### ✅ **Estructura Base del Proyecto**

- Configuración completa de React Native con Expo
- Estructura modular y escalable
- Separación clara de responsabilidades

### ✅ **Componentes y Lógica**

- Componentes reutilizables y modulares
- Lógica de negocio separada de la UI
- Patrón de diseño consistente

### ✅ **Manejo de Estado**

- Redux Toolkit para estado global
- RTK Query para gestión de APIs
- Persistencia local con SQLite

### ✅ **Documentación**

- README completo con instrucciones
- Comentarios en código (inglés)
- Documentación de componentes

### ✅ **Navegación**

- Navegación por pestañas (Shop, Cart, Orders, Profile)
- Navegación por pilas para flujos específicos
- Gestión de estados de navegación

### ✅ **Firebase Integration**

- Firebase Realtime Database para órdenes
- Firebase Authentication para usuarios
- Sincronización en tiempo real

### ✅ **Interfaces del Dispositivo**

- **Cámara**: Captura de fotos para perfil
- **Galería**: Selección de imágenes
- **Geolocalización**: Ubicación de tiendas
- **Permisos**: Manejo de permisos nativos

### ✅ **Persistencia de Datos**

- SQLite para datos locales
- Sincronización con Firebase
- Cache de productos y sesión

---

## 📱 Capturas de Pantalla

### 🏠 **Pantalla Principal**

![Home Screen](./assets/screenshots/home.png)

### 🛒 **Carrito de Compras**

![Cart Screen](./assets/screenshots/cart.png)

### 📍 **Localización de Tiendas**

![Store Locator](./assets/screenshots/maps.png)

### 👤 **Perfil de Usuario**

![Profile Screen](./assets/screenshots/profile.png)

### 📋 **Historial de Pedidos**

![Orders Screen](./assets/screenshots/orders.png)

---

## 🛠️ Instalación y Configuración

### **Prerrequisitos**

- Node.js (v16 o superior)
- npm o yarn
- Expo CLI
- Android Studio (para desarrollo Android)

### **1. Clonar el Repositorio**

```bash
git clone https://github.com/NicoStocchero/ecommerce-stocchero
cd ecommerce-stocchero
```

### **2. Instalar Dependencias**

```bash
npm install
```

### **3. Configurar Variables de Entorno**

Crea un archivo `.env` basado en `env-template.txt`:

```bash
cp env-template.txt .env
```

Configura las siguientes variables:

```env
EXPO_PUBLIC_API_KEY=tu_firebase_api_key
EXPO_PUBLIC_BASE_RTDB_URL=tu_firebase_realtime_database_url
EXPO_PUBLIC_GOOGLE_MAPS_API_KEY=tu_google_maps_api_key
```

### **4. Ejecutar en Desarrollo**

```bash
npm start
```

### **5. Ejecutar en Dispositivo**

- Instala Expo Go en tu dispositivo móvil
- Escanea el código QR que aparece en el terminal
- O ejecuta: `npm run android` / `npm run ios`

---

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm start              # Iniciar servidor de desarrollo
npm run android        # Ejecutar en Android
npm run ios           # Ejecutar en iOS
npm run web           # Ejecutar en web

# Linting
npm run lint          # Verificar código
npm run lint:fix      # Corregir errores automáticamente
npm run lint:check    # Verificar sin warnings

# Commits
npm run commit        # Commitizen (conventional commits)
npm run commit:custom # Script personalizado de commits
```

---

## 📚 Tecnologías Utilizadas

### **Frontend**

- **React Native** - Framework móvil
- **Expo** - Plataforma de desarrollo
- **React Navigation** - Navegación
- **Redux Toolkit** - Estado global
- **RTK Query** - Gestión de APIs

### **Backend y Base de Datos**

- **Firebase Realtime Database** - Base de datos en tiempo real
- **Firebase Authentication** - Autenticación
- **SQLite** - Persistencia local

### **Interfaces Nativas**

- **Expo ImagePicker** - Cámara y galería
- **Expo Location** - Geolocalización
- **Expo FileSystem** - Manejo de archivos

### **Herramientas de Desarrollo**

- **ESLint** - Linting de código
- **Commitizen** - Conventional commits
- **Expo CLI** - Herramientas de desarrollo

---

## 🎨 Sistema de Diseño

### **Colores**

```javascript
colors = {
  primary: "#FF6B35", // Naranja principal
  secondary: "#2C3E50", // Azul oscuro
  success: "#27AE60", // Verde
  warning: "#F39C12", // Amarillo
  error: "#E74C3C", // Rojo
  info: "#3498DB", // Azul claro
  textPrimary: "#2C3E50", // Texto principal
  textSecondary: "#7F8C8D", // Texto secundario
  background: "#FFFFFF", // Fondo
  surface: "#F8F9FA", // Superficie
  border: "#E9ECEF", // Bordes
};
```

### **Tipografía**

- **Inter** - Fuente principal (18pt, 24pt, 28pt)
- **Pesos**: Thin, Light, Regular, Medium, SemiBold, Bold, ExtraBold, Black

### **Componentes**

- **Botones**: Primarios, secundarios, outline
- **Cards**: Productos, órdenes, perfil
- **Inputs**: Texto, búsqueda, formularios
- **Modales**: Confirmaciones, alertas

---

## 🔄 Flujo de Datos

### **Autenticación**

1. Usuario se registra/inicia sesión
2. Firebase Auth genera tokens
3. Tokens se almacenan en SQLite
4. Redux actualiza estado de usuario
5. Perfil se sincroniza con Firebase

### **Carrito de Compras**

1. Productos se agregan al carrito
2. Estado se actualiza en Redux
3. Datos se persisten en SQLite
4. Al hacer checkout, se crea orden en Firebase
5. Carrito se limpia y se sincroniza

### **Órdenes**

1. Usuario finaliza compra
2. Orden se crea en Firebase Realtime Database
3. Token se refresca automáticamente
4. Orden aparece en historial
5. Datos se sincronizan en tiempo real

---

## 🚀 Características Avanzadas

### **Sincronización Offline**

- Persistencia local con SQLite
- Sincronización automática al reconectar
- Manejo de estados offline/online
- Cache inteligente de datos

### **Performance**

- Lazy loading de componentes
- Optimización de imágenes
- Memoización de componentes
- Gestión eficiente de memoria

### **UX/UI**

- Diseño moderno y consistente
- Animaciones suaves
- Estados de carga y error
- Feedback visual inmediato

### **Seguridad**

- Validación de tokens
- Refresh automático de sesión
- Sanitización de datos
- Manejo seguro de permisos

---

## 📋 Checklist de Entrega

### ✅ **Obligatorio**

- [x] Link de GitHub
- [x] Estructura base del proyecto
- [x] Componentes y lógica
- [x] Documentación completa
- [x] Navegación implementada
- [x] Manejo de estado con Redux
- [x] Conexión con Firebase
- [x] Interfaz de dispositivo (cámara/ubicación)
- [x] Persistencia de datos (SQLite)

### ✅ **Opcional**

- [x] APK compilado
- [x] Configuración de publicación
- [x] Testing automatizado
- [x] CI/CD pipeline

---

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'feat: add amazing feature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📄 Licencia

Este proyecto fue desarrollado como entrega final del curso de React Native. Puedes utilizar el código como referencia para tus propios proyectos, siempre respetando los derechos de autor.

---

## 👨‍💻 Autor

**Nicolás Stocchero**

- GitHub: [@NicoStocchero](https://github.com/NicoStocchero)
- LinkedIn: [Nicolás Stocchero](https://linkedin.com/in/nicostocchero)

---

## 🙏 Agradecimientos

- **Coderhouse** - Plataforma educativa
- **Expo** - Herramientas de desarrollo
- **Firebase** - Backend y autenticación
- **React Native Community** - Documentación y soporte

---

_Desarrollado con ❤️ para el curso de React Native_

# Sistema de Registro - React y Bootstrap

## Descripción

Este proyecto consiste en un formulario de registro desarrollado con React y Bootstrap. Permite ingresar nombre, correo electrónico, contraseña y confirmación de contraseña, aplicando validaciones dinámicas en tiempo real y verificando la aceptación de términos y condiciones para mejorar la experiencia del usuario.

## Objetivos

* Implementar un formulario utilizando React.
* Aplicar estilos mediante Bootstrap.
* Utilizar el Hook `useState` para controlar los campos del formulario.
* Validar el formato del correo electrónico.
* Validar que la contraseña tenga al menos 8 caracteres.
* Validar que la confirmación de contraseña coincida con la contraseña ingresada.
* Mostrar mensajes de error dinámicos.
* Mostrar un indicador visual de fortaleza de contraseña.
* Mostrar un mensaje de registro exitoso cuando los datos sean válidos.

## Tecnologías Utilizadas

* React 19
* Bootstrap 5
* JavaScript
* HTML5
* CSS3

## Instalación

1. Clonar el repositorio:

```bash
git clone <url-del-repositorio>
```

2. Ingresar a la carpeta del proyecto:

```bash
cd formulario-react
```

3. Instalar dependencias:

```bash
npm install
```

4. Ejecutar el proyecto:

```bash
npm start
```

## Estructura del Proyecto

```text
src/
│
├── assets/
│   └── fondo.jpg
│
├── components/
│   ├── Formulario.js
│   └── Formulario.css
│
├── App.js
├── index.js
└── index.css
```

## Funcionalidades

* Registro de usuario con cinco campos: nombre, correo, contraseña, confirmación de contraseña y aceptación de términos.
* Validación de cada campo en tiempo real.
* Mensajes de error dinámicos bajo cada campo.
* Indicador visual de fortaleza de contraseña (Débil / Regular / Fuerte).
* Botón para mostrar u ocultar la contraseña con ícono SVG.
* Verificación de que ambas contraseñas coincidan.
* Checkbox de aceptación de términos y condiciones obligatorio.
* Diseño responsivo con fondo personalizado.
* Mensaje de registro exitoso al completar el formulario correctamente.

## Validaciones Implementadas

### Nombre

* Campo obligatorio.
* Mínimo 3 caracteres.
* Solo permite letras y espacios.

### Correo Electrónico

El sistema verifica que el correo tenga un formato válido:

```
usuario@dominio.com
```

### Contraseña

La contraseña debe contener al menos:

* 8 caracteres.
* Una letra mayúscula.
* Un número.

### Confirmar Contraseña

* Campo obligatorio.
* Debe coincidir exactamente con la contraseña ingresada.

### Términos y Condiciones

* El checkbox debe estar marcado para poder enviar el formulario.

## Captura de Pantalla

## Captura del sistema

![Captura del formulario](.\screenshots\Captura de pantalla 2026-06-18 224500.png
## Autor

Desarrollado como práctica de la Unidad 2: Frameworks (React + CSS Framework).

Melanie Garcia Obregón
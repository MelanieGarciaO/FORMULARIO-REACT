# Sistema de Registro - React y Bootstrap

## Descripción

Este proyecto consiste en un formulario de registro desarrollado con React y Bootstrap. Permite ingresar nombre, correo electrónico y contraseña, aplicando validaciones dinámicas en tiempo real para mejorar la experiencia del usuario.

## Objetivos

* Implementar un formulario utilizando React.
* Aplicar estilos mediante Bootstrap.
* Utilizar el Hook `useState` para controlar los campos del formulario.
* Validar el formato del correo electrónico.
* Validar que la contraseña tenga al menos 8 caracteres.
* Mostrar mensajes de error dinámicos.
* Mostrar un mensaje de registro exitoso cuando los datos sean válidos.

## Tecnologías Utilizadas

* React
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

* Registro de usuario.
* Validación de correo electrónico en tiempo real.
* Validación de contraseña con mínimo 8 caracteres.
* Mensajes de error dinámicos.
* Diseño responsivo.
* Fondo personalizado con imagen.
* Mensaje de registro exitoso.

## Validaciones Implementadas

### Correo Electrónico

El sistema verifica que el correo tenga un formato válido:

usuario@dominio.com


### Contraseña

La contraseña debe contener al menos:

* 8 caracteres.

## Captura de Pantalla

Agregar aquí una captura del formulario funcionando.

## Autor

Desarrollado como práctica de la Unidad 2: Frameworks (React + CSS Framework).

Melanie Garcia Obregón
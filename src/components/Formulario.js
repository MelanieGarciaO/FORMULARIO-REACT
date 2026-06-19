import React, { useState } from 'react';
import './Formulario.css';

// ── Funciones de validación ──────────────────────────────────────────────────

function validarNombre(valor) {
  if (!valor.trim()) return 'El nombre es obligatorio.';
  if (valor.trim().length < 3) return 'El nombre debe tener al menos 3 caracteres.';
  if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(valor))
    return 'El nombre solo puede contener letras y espacios.';
  return '';
}

function validarCorreo(valor) {
  if (!valor.trim()) return 'El correo electrónico es obligatorio.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor))
    return 'Ingresa un correo válido (ej: usuario@dominio.com).';
  return '';
}

function validarContrasena(valor) {
  if (!valor) return 'La contraseña es obligatoria.';
  if (valor.length < 8) return 'La contraseña debe tener al menos 8 caracteres.';
  return '';
}

// ── Indicador de fortaleza ───────────────────────────────────────────────────

function IndicadorFortaleza({ contrasena }) {
  const criterios = [
    { texto: '8 caracteres mínimo', cumplido: contrasena.length >= 8 },
    { texto: 'Una letra mayúscula',  cumplido: /[A-Z]/.test(contrasena) },
    { texto: 'Un número',            cumplido: /[0-9]/.test(contrasena) },
  ];

  const cumplidos = criterios.filter((c) => c.cumplido).length;
  const colores   = ['#dc3545', '#ffc107', '#198754'];
  const etiquetas = ['Débil', 'Regular', 'Fuerte'];
  const color     = colores[cumplidos - 1] || '#dee2e6';
  const etiqueta  = etiquetas[cumplidos - 1] || '';

  return (
    <div className="mb-3">
      <div className="d-flex gap-1 mb-1">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="flex-fill indicador-barra"
            style={{ backgroundColor: i < cumplidos ? color : '#dee2e6' }}
          />
        ))}
      </div>
      {etiqueta && (
        <small style={{ color, fontWeight: 600 }}>{etiqueta}</small>
      )}
      <ul className="criterio-lista mt-1">
        {criterios.map((c, i) => (
          <li key={i} style={{ color: c.cumplido ? '#198754' : '#6c757d' }}>
            {c.cumplido ? '✓' : '○'} {c.texto}
          </li>
        ))}
      </ul>
    </div>
  );
}

// ── Componente principal ─────────────────────────────────────────────────────

function Formulario() {
  const [valores, setValores] = useState({
    nombre:     '',
    correo:     '',
    contrasena: '',
  });

  const [tocados, setTocados] = useState({
    nombre:     false,
    correo:     false,
    contrasena: false,
  });

  const [enviado, setEnviado] = useState(false);

  // Errores calculados en tiempo real
  const errores = {
    nombre:     validarNombre(valores.nombre),
    correo:     validarCorreo(valores.correo),
    contrasena: validarContrasena(valores.contrasena),
  };

  const formularioValido =
    !errores.nombre && !errores.correo && !errores.contrasena;

  function handleChange(campo) {
    return (e) => {
      setValores((prev) => ({ ...prev, [campo]: e.target.value }));
      setEnviado(false);
    };
  }

  function handleBlur(campo) {
    return () => setTocados((prev) => ({ ...prev, [campo]: true }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setTocados({ nombre: true, correo: true, contrasena: true });
    if (!formularioValido) return;

    setEnviado(true);
    setValores({ nombre: '', correo: '', contrasena: '' });
    setTocados({ nombre: false, correo: false, contrasena: false });
  }

  return (
    <div className="card formulario-card">
      <div className="card-body p-4 p-md-5">

        <h1 className="formulario-titulo text-center mb-1">Crear cuenta</h1>
        <p className="formulario-subtitulo text-center mb-4">
          Completa el formulario para registrarte
        </p>

        {enviado && (
          <div className="alert alert-success d-flex align-items-center gap-2" role="alert">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
            </svg>
            <span>¡Registro exitoso! Bienvenido/a.</span>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>

          {/* ── Nombre ── */}
          <div className="mb-3">
            <label htmlFor="nombre" className="form-label fw-semibold">
              Nombre completo
            </label>
            <input
              id="nombre"
              type="text"
              className={`form-control ${
                tocados.nombre
                  ? errores.nombre ? 'is-invalid' : 'is-valid'
                  : ''
              }`}
              value={valores.nombre}
              onChange={handleChange('nombre')}
              onBlur={handleBlur('nombre')}
              placeholder="Ej: María González"
            />
            {tocados.nombre && errores.nombre && (
              <div className="invalid-feedback">{errores.nombre}</div>
            )}
          </div>

          {/* ── Correo ── */}
          <div className="mb-3">
            <label htmlFor="correo" className="form-label fw-semibold">
              Correo electrónico
            </label>
            <input
              id="correo"
              type="email"
              className={`form-control ${
                tocados.correo
                  ? errores.correo ? 'is-invalid' : 'is-valid'
                  : ''
              }`}
              value={valores.correo}
              onChange={handleChange('correo')}
              onBlur={handleBlur('correo')}
              placeholder="Ej: maria@correo.com"
            />
            {tocados.correo && errores.correo && (
              <div className="invalid-feedback">{errores.correo}</div>
            )}
          </div>

          {/* ── Contraseña ── */}
          <div className="mb-3">
            <label htmlFor="contrasena" className="form-label fw-semibold">
              Contraseña
            </label>
            <input
              id="contrasena"
              type="password"
              className={`form-control ${
                tocados.contrasena
                  ? errores.contrasena ? 'is-invalid' : 'is-valid'
                  : ''
              }`}
              value={valores.contrasena}
              onChange={handleChange('contrasena')}
              onBlur={handleBlur('contrasena')}
              placeholder="Mínimo 8 caracteres"
            />
            {tocados.contrasena && errores.contrasena && (
              <div className="invalid-feedback">{errores.contrasena}</div>
            )}
          </div>

          {/* ── Indicador de fortaleza ── */}
          {valores.contrasena && (
            <IndicadorFortaleza contrasena={valores.contrasena} />
          )}

          <button
            type="submit"
            className="btn btn-primary w-100 py-2 fw-semibold mt-2"
          >
            Registrarse
          </button>

        </form>
      </div>
    </div>
  );
}

export default Formulario;
import React, { useState } from 'react';
import './Formulario.css';

// ── Íconos SVG ───────────────────────────────────────────────────────────────

function IconoOjo() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
    </svg>
  );
}

function IconoOjoOculto() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
      <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
      <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
      <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
    </svg>
  );
}

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

function validarConfirmar(valor, contrasena) {
  if (!valor) return 'Por favor confirma tu contraseña.';
  if (valor !== contrasena) return 'Las contraseñas no coinciden.';
  return '';
}

function validarTerminos(aceptado) {
  if (!aceptado) return 'Debes aceptar los términos y condiciones.';
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
    confirmar:  '',
  });

  const [tocados, setTocados] = useState({
    nombre:     false,
    correo:     false,
    contrasena: false,
    confirmar:  false,
    terminos:   false,
  });

  const [terminos, setTerminos]     = useState(false);
  const [enviado,  setEnviado]      = useState(false);
  const [verContrasena, setVerContrasena] = useState(false);
  const [verConfirmar,  setVerConfirmar]  = useState(false);

  // Errores calculados en tiempo real
  const errores = {
    nombre:     validarNombre(valores.nombre),
    correo:     validarCorreo(valores.correo),
    contrasena: validarContrasena(valores.contrasena),
    confirmar:  validarConfirmar(valores.confirmar, valores.contrasena),
    terminos:   validarTerminos(terminos),
  };

  const formularioValido =
    !errores.nombre &&
    !errores.correo &&
    !errores.contrasena &&
    !errores.confirmar &&
    !errores.terminos;

  function handleChange(campo) {
    return (e) => {
      setValores((prev) => ({ ...prev, [campo]: e.target.value }));
      setEnviado(false);
    };
  }

  function handleBlur(campo) {
    return () => setTocados((prev) => ({ ...prev, [campo]: true }));
  }

  function handleTerminos(e) {
    setTerminos(e.target.checked);
    setTocados((prev) => ({ ...prev, terminos: true }));
    setEnviado(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setTocados({
      nombre: true, correo: true, contrasena: true,
      confirmar: true, terminos: true,
    });
    if (!formularioValido) return;

    setEnviado(true);
    setValores({ nombre: '', correo: '', contrasena: '', confirmar: '' });
    setTocados({ nombre: false, correo: false, contrasena: false, confirmar: false, terminos: false });
    setTerminos(false);
  }

  // Helper: clases Bootstrap para cada input
  function claseInput(campo) {
    if (!tocados[campo]) return 'form-control';
    return `form-control ${errores[campo] ? 'is-invalid' : 'is-valid'}`;
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
              className={claseInput('nombre')}
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
              className={claseInput('correo')}
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
            <div className="input-group">
              <input
                id="contrasena"
                type={verContrasena ? 'text' : 'password'}
                className={claseInput('contrasena')}
                value={valores.contrasena}
                onChange={handleChange('contrasena')}
                onBlur={handleBlur('contrasena')}
                placeholder="Mínimo 8 caracteres"
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setVerContrasena((v) => !v)}
                tabIndex={-1}
                title={verContrasena ? 'Ocultar' : 'Mostrar'}
              >
                {verContrasena ? <IconoOjoOculto /> : <IconoOjo />}
              </button>
            </div>
            {tocados.contrasena && errores.contrasena && (
              <div className="text-danger mt-1" style={{ fontSize: '0.875em' }}>
                {errores.contrasena}
              </div>
            )}
          </div>

          {/* ── Indicador de fortaleza ── */}
          {valores.contrasena && (
            <IndicadorFortaleza contrasena={valores.contrasena} />
          )}

          {/* ── Confirmar contraseña ── */}
          <div className="mb-3">
            <label htmlFor="confirmar" className="form-label fw-semibold">
              Confirmar contraseña
            </label>
            <div className="input-group">
              <input
                id="confirmar"
                type={verConfirmar ? 'text' : 'password'}
                className={claseInput('confirmar')}
                value={valores.confirmar}
                onChange={handleChange('confirmar')}
                onBlur={handleBlur('confirmar')}
                placeholder="Repite tu contraseña"
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setVerConfirmar((v) => !v)}
                tabIndex={-1}
                title={verConfirmar ? 'Ocultar' : 'Mostrar'}
              >
                {verConfirmar ? <IconoOjoOculto /> : <IconoOjo />}
              </button>
            </div>
            {tocados.confirmar && errores.confirmar && (
              <div className="text-danger mt-1" style={{ fontSize: '0.875em' }}>
                {errores.confirmar}
              </div>
            )}
            {tocados.confirmar && !errores.confirmar && (
              <div className="text-success mt-1" style={{ fontSize: '0.875em' }}>
                ✓ Las contraseñas coinciden.
              </div>
            )}
          </div>

          {/* ── Términos y condiciones ── */}
          <div className="mb-4">
            <div className="form-check">
              <input
                id="terminos"
                type="checkbox"
                className={`form-check-input ${
                  tocados.terminos
                    ? errores.terminos ? 'is-invalid' : 'is-valid'
                    : ''
                }`}
                checked={terminos}
                onChange={handleTerminos}
              />
              <label htmlFor="terminos" className="form-check-label">
                Acepto los{' '}
                <a href="#terminos" className="text-primary">
                  términos y condiciones
                </a>{' '}
                y la{' '}
                <a href="#privacidad" className="text-primary">
                  política de privacidad
                </a>
                .
              </label>
              {tocados.terminos && errores.terminos && (
                <div className="invalid-feedback">{errores.terminos}</div>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 py-2 fw-semibold"
          >
            Registrarse
          </button>

        </form>
      </div>
    </div>
  );
}

export default Formulario;
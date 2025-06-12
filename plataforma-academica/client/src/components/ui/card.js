// client/src/components/ui/card.js
import React from 'react';

export const Card = ({ children, className }) => {
  return <div className={`card ${className}`}>{children}</div>;
};

export const CardHeader = ({ children }) => {
  return <div className="card-header">{children}</div>;
};

export const CardTitle = ({ children }) => {
  return <h3 className="card-title">{children}</h3>;
};

export const CardContent = ({ children }) => {
  return <div className="card-content">{children}</div>;
};

export const Button = ({ variant, children }) => {
  return (
    <button className={`btn ${variant}`}>
      {children}
    </button>
  );
};

export const Typography = ({ variant, children, style, ...props }) => {
  const typographyStyles = {
    h1: { fontSize: '2rem', fontWeight: 'bold' },
    h2: { fontSize: '1.75rem', fontWeight: 'bold' },
    h3: { fontSize: '1.5rem', fontWeight: 'bold' },
    p: { fontSize: '1rem', fontWeight: 'normal' },
    // Puedes agregar más variantes según necesites
  };

  const selectedStyle = typographyStyles[variant] || typographyStyles.p;

  return (
    <div style={{ ...selectedStyle, ...style }} {...props}>
      {children}
    </div>
  );
};

export const TextField = ({ label, value, onChange, placeholder, type = 'text', style, ...props }) => {
  return (
    <div style={{ marginBottom: '1rem', ...style }} {...props}>
      {label && <label style={{ display: 'block', marginBottom: '0.5rem' }}>{label}</label>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{
          padding: '0.5rem',
          borderRadius: '4px',
          border: '1px solid #ccc',
          width: '100%',
        }}
      />
    </div>
  );
};

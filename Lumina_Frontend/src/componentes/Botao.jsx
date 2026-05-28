import "./Botao.css";

export default function Botao({
  children,
  onClick,
  variant = "primario",
  className = "",
  ...props
}) {
  return (
    <button
      className={`btn btn-${variant} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}

export function BotaoPrimario({ children, onClick, className = "", ...props }) {
  return (
    <Botao variant="primario" onClick={onClick} className={className} {...props}>
      {children}
    </Botao>
  );
}

export function BotaoSecundario({ children, onClick, className = "", ...props }) {
  return (
    <Botao variant="secundario" onClick={onClick} className={className} {...props}>
      {children}
    </Botao>
  );
}

export function BotaoCard({ children, onClick, className = "", ...props }) {
  return (
    <Botao variant="card" onClick={onClick} className={className} {...props}>
      {children}
    </Botao>
  );
}
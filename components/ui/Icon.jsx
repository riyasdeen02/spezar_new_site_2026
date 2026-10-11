// Material Symbols icon by name. The font only contains the icons listed in `iconNames` in
// app/layout.jsx, so add a new name there when you use one here.
export default function Icon({ name, className = "" }) {
  return (
    <span className={`material-symbols-outlined ${className}`} aria-hidden="true">
      {name}
    </span>
  );
}

import type { IconName } from '../Icon/icons';

export interface CommandItem {
  /** Identificador estable del comando. */
  id: string;
  /** Texto del comando. Es lo que se busca. */
  label: string;
  /** Texto de apoyo (qué hace). */
  description?: string;
  /** Ícono a la izquierda (decorativo). */
  icon?: IconName;
  /** Atajo de teclado, tecla por tecla: `['⌘', 'K']`. Solo se muestra en web; en native no hay teclado. */
  shortcut?: string[];
  /** Palabras extra para encontrar el comando ("preferencias" para "Ajustes"). */
  keywords?: string[];
  /** Se invoca al elegir el comando (clic, toque o Enter). La paleta se cierra después. */
  onSelect: () => void;
}

export interface CommandGroup {
  /** Título del grupo ("Navegación", "Acciones"). */
  label: string;
  /** Comandos del grupo. */
  items: CommandItem[];
}

/** Contrato compartido de `CommandPalette`: búsqueda y acciones rápidas, desde cualquier pantalla. */
export interface CommandPaletteBaseProps {
  /** Si la paleta está abierta (se controla desde fuera, p. ej. con ⌘K). */
  open: boolean;
  /** Se invoca al pedir abrir o cerrar (Escape, tocar fuera o elegir un comando). */
  onOpenChange: (open: boolean) => void;
  /** Comandos agrupados. Los grupos sin coincidencias se ocultan al buscar. */
  groups: CommandGroup[];
  /**
   * Nombre accesible de la paleta.
   * @default 'Paleta de comandos'
   */
  label?: string;
  /**
   * Texto de ejemplo del campo de búsqueda.
   * @default 'Escribe un comando o busca…'
   */
  placeholder?: string;
  /**
   * Mensaje cuando nada coincide.
   * @default 'Sin resultados'
   */
  emptyText?: string;
}

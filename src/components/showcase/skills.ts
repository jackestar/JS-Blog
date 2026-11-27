interface Skill {
  /** astro-icon name: `set:name`, or a file name from `src/icons/`. */
  icon: string;
  /** Shown as the tooltip and read by screen readers. */
  label: string;
}

export const skills = {
  c: {icon: 'simple-icons:c', label: 'C'},
  cpp: {icon: 'simple-icons:cplusplus', label: 'C++'},
  typescript: {icon: 'simple-icons:typescript', label: 'TypeScript'},
  astro: {icon: 'simple-icons:astro', label: 'Astro'},
  esp32: {icon: 'simple-icons:espressif', label: 'ESP32'},
  arduino: {icon: 'simple-icons:arduino', label: 'Arduino'},
  kicad: {icon: 'simple-icons:kicad', label: 'KiCad'},
  blender: {icon: 'simple-icons:blender', label: 'Blender'},
  inkscape: {icon: 'simple-icons:inkscape', label: 'Inkscape'},
  linux: {icon: 'simple-icons:linux', label: 'Linux'},
  git: {icon: 'simple-icons:git', label: 'Git'},
  // Local icon: src/icons/avr.svg
  // avr: {icon: 'avr', label: 'AVR'},
} as const satisfies Record<string, Skill>;

export type SkillKey = keyof typeof skills;

export const skillKeys = Object.keys(skills) as [SkillKey, ...SkillKey[]];

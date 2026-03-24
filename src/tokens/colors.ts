/**
 * Paleta oficial FIPS extraída do Brandbook (cores primárias, secundárias e neutros).
 * Valores em hex para uso em CSS/TS; alinhar alterações ao PDF de marca.
 */
export const fipsPalette = {
  azulProfundo: '#004B9B',
  azulProfundoDark: '#002A68',
  cinzaChumbo: '#333B41',
  cinzaMetal: '#C0CCD2',
  azulIntermediario: '#658EC9',
  azulCeuClaro: '#D3E3F4',
  amareloPastel: '#FFE4B8',
  azulCeu: '#93BDE4',
  azulCeuProfundo: '#0090D0',
  amareloOuro: '#FDC24E',
  amareloOuroEscuro: '#F6921E',
  verdeClaro: '#8BE5AD',
  verdeFloresta: '#00C64C',
  verdeFlorestaEscuro: '#00904C',
  branco: '#FFFFFF',
  neutroClaro: '#E8EBFF',
} as const

export type FipsPaletteKey = keyof typeof fipsPalette

/** Tokens semânticos para UI de produto e documentação */
export const semanticColors = {
  primary: fipsPalette.azulProfundo,
  primaryHover: fipsPalette.azulProfundoDark,
  secondary: fipsPalette.azulCeuProfundo,
  accent: fipsPalette.amareloOuro,
  accentStrong: fipsPalette.amareloOuroEscuro,
  success: fipsPalette.verdeFloresta,
  successStrong: fipsPalette.verdeFlorestaEscuro,
  info: fipsPalette.azulCeu,
  surface: fipsPalette.branco,
  surfaceMuted: fipsPalette.neutroClaro,
  border: fipsPalette.cinzaMetal,
  foreground: fipsPalette.cinzaChumbo,
  foregroundMuted: '#4b5563',
  sidebar: fipsPalette.azulProfundo,
  sidebarMuted: fipsPalette.azulProfundoDark,
} as const

# Technology logo images

Logos for the Technology Landscape section (`components/sections/TechnologyLandscape.jsx`).
Logos are shown in their original colours, with no text labels. Each logo's name is still used
as its alt text and hover tooltip.

The lowercase `.svg` files are brand-coloured marks from Simple Icons (v13.21.0). The other files
(PNG/WebP) were supplied by the team. `solidworks.svg` is the Dassault Systèmes (3DS) mark, which is
also what the portfolio deck uses.

## Dark-mode copies
Logos with black text get a `-dark.png` copy where only the black text is recoloured white, so the
brand colours stay exact on the dark theme. The original is used in light mode.

`lora-dark.png`, `simcom-dark.png`, `texas-instruments-dark.png`, `eagle-dark.png`,
`ublox-dark.png`, `microchip-dark.png` and `quectel-dark.png` were made this way.
`azure-transparent.png` is `azure.png` with its white background removed.

If you replace one of those originals, regenerate its copy too (or send it to Claude to do it).

## Options per logo in `technologyGroups`
- `darkFile: "<file>"`: the dark-theme copy to show instead of `file`.
- `invertOnDark: true`: an all-black logo, shown in solid white on the dark theme.
- `fitWidth: true` or a number: size a wide wordmark or a padded square by width instead of height.
  The number is the width multiplier (default 2.5); raise it if a logo looks small.
- `tone: "lift"`: brightens deep-coloured logos (e.g. Raspberry Pi) on the dark background.

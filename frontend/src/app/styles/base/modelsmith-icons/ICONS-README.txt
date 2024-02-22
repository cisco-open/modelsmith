🎯 Objective

Our aim is to centralize all icons, facilitating unified modifications. To realize this, let's 
upgrade the Angular Material <mat-icon> component to incorporate a bespoke font that amalgamates 
the SVG icons excluded from the material set.

🛠 Adding a New Icon: Step-by-Step

1. Start with IcoMoon: Navigate to icomoon.io/app/.
2. Import Existing Icons: Click "Import Icons" and select the selection.json file. Approve the ensuing popup to load pre-existing icons.
3. Upload Custom SVG: Introduce your custom SVG icon. Ensure its absence of <strokes> (IcoMoon will notify you if they're present during generation). If needed, convert SVG strokes to fills using this tool.
4. Generate Font: Mark all icons and proceed with "Generate Font".
5. Download & Unpack: Obtain the resultant font and unzip.
- Replace selection.json in the codebase with the one from the zip.
- Substitute existing fonts with the newly generated ones from the zip.
- Update airgap-icons-style using style.css from the zip and rename it as "airgap-icons-style".
- Update Icon Demo: Augment the icon demonstration page with your new icon.

🔍 Utilizing the New Icon

To employ the fresh icon within your app, use the format: <mat-icon fontIcon="icon-name"></mat-icon>.

📚 Icon Resources

Iconpack: iconer.app/iconpark/
SVG Repository: svgrepo.com/

💡 Custom Font Recognition in Angular Material

How does Angular Material identify our distinctive font? Refer to code.module.ts. Here, we introduce the "airgap" alias, allowing Angular Material to identify it as a valid font for <mat-icon>. The registration code looks like: this.registry.registerFontClassAlias('airgap-icons', 'airgap');.
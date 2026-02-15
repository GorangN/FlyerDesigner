/**
 * Flyer Template Engine
 * Liest flyer-config.json und baut Spreads + Panels dynamisch auf.
 * Inspiriert von der Avesa_Flyer-Architektur (spread-basiert mit Falzlinien).
 */

class FlyerEngine {
    constructor(configPath = 'flyer-config.json') {
        this.configPath = configPath;
        this.config = null;
    }

    async init() {
        await this.loadConfig();
        this.applyColors();
        this.applyFonts();
        this.applyFormat();
        this.buildSpreads();
        this.updateInfoHeader();
    }

    /* ── Config laden ──────────────────────────────────── */
    async loadConfig() {
        const res = await fetch(this.configPath);
        if (!res.ok) throw new Error(`Config nicht gefunden: ${this.configPath}`);
        this.config = await res.json();
    }

    /* ── Farben als CSS-Variablen setzen ───────────────── */
    applyColors() {
        const root = document.documentElement;
        const c = this.config.colors;
        root.style.setProperty('--color-primary', c.primary);
        root.style.setProperty('--color-primary-text', c.primaryText);
        root.style.setProperty('--color-secondary', c.secondary);
        root.style.setProperty('--color-secondary-text', c.secondaryText);
        root.style.setProperty('--color-background', c.background);
        root.style.setProperty('--color-text-main', c.textMain);
        root.style.setProperty('--color-text-muted', c.textMuted);
        root.style.setProperty('--color-accent', c.accent);
        root.style.setProperty('--color-border', c.border);
    }

    /* ── Fonts als CSS-Variablen setzen ────────────────── */
    applyFonts() {
        const root = document.documentElement;
        const f = this.config.fonts;
        root.style.setProperty('--font-heading', f.heading);
        root.style.setProperty('--font-body', f.body);
        root.style.setProperty('--font-mono', f.mono);
        // Tailwind-kompatible Font-Namen (ohne Fallback)
        root.style.setProperty('--font-heading-name', f.heading.split(',')[0].replace(/'/g, '').trim());
        root.style.setProperty('--font-body-name', f.body.split(',')[0].replace(/'/g, '').trim());
        root.style.setProperty('--font-mono-name', f.mono.split(',')[0].replace(/'/g, '').trim());
    }

    /* ── Seitenformat (A5 / A6) + Orientierung setzen ─── */
    applyFormat() {
        const fmt = this.config.format;
        const dims = fmt.options[fmt.active];
        if (!dims) {
            console.warn(`Format "${fmt.active}" nicht gefunden, nutze A6.`);
            return;
        }

        // Querformat: Breite und Höhe tauschen
        const isLandscape = fmt.orientation === 'querformat';
        const w = isLandscape ? dims.height : dims.width;
        const h = isLandscape ? dims.width : dims.height;

        const root = document.documentElement;
        root.style.setProperty('--page-width', w);
        root.style.setProperty('--page-height', h);

        // Dynamisches @page-Stylesheet
        const pageStyle = document.getElementById('dynamic-page-style');
        if (pageStyle) {
            pageStyle.textContent = `@page { size: ${w} ${h}; margin: 0; }`;
        }
    }

    /* ── Spreads + Panels erzeugen ─────────────────────── */
    buildSpreads() {
        const container = document.getElementById('flyer-container');
        if (!container) return;

        const layoutKey = this.config.layout.active;
        const layoutDef = this.config.layout.options[layoutKey];
        if (!layoutDef) {
            console.warn(`Layout "${layoutKey}" nicht gefunden.`);
            return;
        }

        const panelCount = layoutDef.panels;
        const fmt = this.config.format;
        const dims = fmt.options[fmt.active];
        container.innerHTML = '';

        // Spreads aufbauen: Panels pro Spread gruppieren
        const spreads = this.groupPanelsIntoSpreads(panelCount, layoutKey);

        spreads.forEach((spreadPanels, spreadIdx) => {
            // Spread-Label
            const label = document.createElement('div');
            label.className = 'section-label mb-6 bg-primary/10 text-primary px-4 py-1 rounded-full text-xs font-black tracking-widest uppercase italic text-center no-print';
            label.textContent = spreadPanels.label;
            container.appendChild(label);

            // Spread-Container
            const spreadDiv = document.createElement('div');
            const spreadWidthMM = parseFloat(dims.width) * spreadPanels.panels.length;
            spreadDiv.className = 'spread mx-auto mb-12';
            spreadDiv.style.width = `${spreadWidthMM}mm`;
            spreadDiv.style.height = dims.height;
            if (spreadPanels.reverse) {
                spreadDiv.style.flexDirection = 'row-reverse';
            }

            // Panels im Spread
            spreadPanels.panels.forEach((panelIdx, posInSpread) => {
                const panelData = this.config.panels[String(panelIdx)] || {};
                const panelEl = this.createPanel(panelIdx, panelData);

                // Falzlinie zwischen Panels (nicht am letzten)
                if (posInSpread < spreadPanels.panels.length - 1) {
                    const foldLine = document.createElement('div');
                    foldLine.className = 'fold-line';
                    panelEl.appendChild(foldLine);
                }

                spreadDiv.appendChild(panelEl);
            });

            container.appendChild(spreadDiv);
        });
    }

    /* ── Panels in Spreads gruppieren ──────────────────── */
    groupPanelsIntoSpreads(panelCount, layoutKey) {
        switch (layoutKey) {
            case 'einfach':
                // 2 Panels = 1 Spread (Vorderseite links, Rückseite rechts)
                return [
                    { label: 'Grußkarte – Außenseite', panels: [1, 2], reverse: false }
                ];

            case '2-falz':
                // 4 Panels = 2 Spreads (Außen + Innen)
                return [
                    { label: 'Seite 1: Außenseite', panels: [1, 2], reverse: true },
                    { label: 'Seite 2: Innenseite', panels: [3, 4], reverse: false }
                ];

            case '3-falz':
                // 6 Panels = 2 Spreads à 3 Panels (Außen + Innen)
                return [
                    { label: 'Seite 1: Außenseite', panels: [1, 2, 3], reverse: true },
                    { label: 'Seite 2: Innenseite', panels: [4, 5, 6], reverse: false }
                ];

            default:
                // Fallback: alle in einen Spread
                const allPanels = Array.from({ length: panelCount }, (_, i) => i + 1);
                return [{ label: 'Alle Panels', panels: allPanels, reverse: false }];
        }
    }

    /* ── Einzelnes Panel erstellen ─────────────────────── */
    createPanel(index, data) {
        const panel = document.createElement('div');
        panel.className = 'panel';
        panel.dataset.panel = index;
        panel.dataset.role = data.role || '';

        const content = document.createElement('div');
        content.className = 'panel-content';

        // Header
        const header = document.createElement('header');
        header.className = 'mb-auto';

        if (data.heading) {
            const h2 = document.createElement('h2');
            h2.className = 'font-heading font-black text-2xl leading-none uppercase';
            h2.textContent = data.heading;
            header.appendChild(h2);
        }

        if (data.subheading) {
            const sub = document.createElement('p');
            sub.className = 'font-mono text-[8px] bg-secondary text-white inline-block px-2 py-1 mt-3 uppercase tracking-tight';
            sub.textContent = data.subheading;
            header.appendChild(sub);
        }

        // Body
        const main = document.createElement('main');
        main.className = 'flex-1 flex flex-col justify-center';
        if (data.body) {
            main.innerHTML = data.body;
        } else {
            // Platzhalter
            const ph = document.createElement('div');
            ph.className = 'border-2 border-dashed border-slate-200 rounded-2xl p-4 text-center text-slate-300 text-xs';
            ph.innerHTML = `<i class="ti ti-layout text-2xl mb-1 block"></i>Panel ${index}<br><span class="text-[9px]">${data.role || 'content'}</span>`;
            main.appendChild(ph);
        }

        // Footer
        const footer = document.createElement('footer');
        footer.className = 'border-t border-black/5 pt-3 text-[7px] text-slate-400 mt-auto';
        if (data.footer) {
            footer.textContent = data.footer;
        }

        content.appendChild(header);
        content.appendChild(main);
        content.appendChild(footer);
        panel.appendChild(content);

        return panel;
    }

    /* ── Info-Header aktualisieren ─────────────────────── */
    updateInfoHeader() {
        const info = document.getElementById('flyer-info');
        if (!info) return;

        const fmt = this.config.format.active;
        const layout = this.config.layout.options[this.config.layout.active];
        const brand = this.config.branding.companyName || 'Flyer Template';

        info.innerHTML = `
      <h1 class="text-xl font-bold mb-1">${brand}</h1>
      <p class="text-slate-500 text-sm">
        Format: <strong>${fmt}</strong> · Layout: <strong>${layout?.label || '–'}</strong> · ${layout?.panels || 0} Panels
      </p>
      <p class="text-slate-400 text-xs italic mt-1">
        <kbd class="px-2 py-0.5 bg-white border rounded text-[10px] font-mono">Ctrl+P</kbd> zum Drucken
      </p>
    `;
    }
}

/* ── Initialisierung ─────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
    const engine = new FlyerEngine();
    engine.init().catch(err => {
        console.error('FlyerEngine Fehler:', err);
        document.body.innerHTML = `<div style="padding:2rem;color:red;font-family:monospace;">
      <h2>⚠ Fehler beim Laden der Konfiguration</h2>
      <pre>${err.message}</pre>
    </div>`;
    });
});

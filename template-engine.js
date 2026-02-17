/**
 * Flyer Template Engine
 * Reads flyer-config.json and dynamically builds spreads + panels.
 * Inspired by Avesa_Flyer architecture (spread-based with fold lines).
 */

class FlyerEngine {
    constructor(configPath = 'flyer-config.json') {
        this.configPath = configPath;
        this.config = null;
    }

    async init() {
        await this.loadConfig();
        await this.loadPresets();
        this.render();
        this.initSidebar();
        this.initLiveEditor();
    }

    /* ── Sidebar & Config Switching ─── */
    initSidebar() {
        const toggle = document.getElementById('sidebar-toggle');
        const sidebar = document.getElementById('config-sidebar');
        const selector = document.getElementById('config-selector');

        if (!toggle || !sidebar || !selector) return;

        // Populate presets dropdown
        selector.innerHTML = '';
        Object.entries(this.presets).forEach(([id, preset]) => {
            const opt = document.createElement('option');
            opt.value = id;
            opt.textContent = preset.label;
            selector.appendChild(opt);
        });

        // Toggle Sidebar
        toggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
            const icon = toggle.querySelector('i');
            if (sidebar.classList.contains('active')) {
                icon.className = 'ti ti-x';
            } else {
                icon.className = 'ti ti-settings';
            }
        });

        // Switch Config
        selector.addEventListener('change', (e) => {
            this.applyPreset(e.target.value);
            this.syncSidebarWithConfig();
            this.render();
            console.log(`Applied preset: ${e.target.value}`);
        });
    }

    async loadPresets() {
        try {
            const res = await fetch('presets.json');
            this.presets = await res.json();
        } catch (err) {
            console.warn('Could not load presets.json:', err);
            this.presets = {};
        }
    }

    applyPreset(id) {
        const preset = this.presets[id];
        if (!preset) return;

        // Apply colors
        if (preset.colors) {
            this.config.colors = { ...this.config.colors, ...preset.colors };
        }
        // Apply branding
        if (preset.branding) {
            this.config.branding = { ...this.config.branding, ...preset.branding };
        }
        // Apply panels
        if (preset.panels) {
            this.config.panels = { ...this.config.panels, ...preset.panels };
        }
    }

    /* ── Live Editor Synchronization ─── */
    initLiveEditor() {
        const inputs = {
            'edit-color-primary': (val) => this.config.colors.primary = val,
            'edit-color-secondary': (val) => this.config.colors.textMain = val,
            'edit-color-accent': (val) => this.config.colors.accent = val,
            'edit-color-bg': (val) => this.config.colors.background = val,
            'edit-format': (val) => this.config.format.active = val,
            'edit-orientation': (val) => this.config.format.orientation = val,
            'edit-layout': (val) => this.config.layout.active = val,
            'edit-company-name': (val) => this.config.branding.companyName = val,
            'edit-slogan': (val) => this.config.branding.slogan = val
        };

        Object.entries(inputs).forEach(([id, updater]) => {
            const el = document.getElementById(id);
            if (!el) return;

            const eventType = el.tagName === 'SELECT' || el.type === 'color' ? 'input' : 'keyup';

            el.addEventListener(eventType, (e) => {
                updater(e.target.value);
                this.render();
            });
        });
    }

    syncSidebarWithConfig() {
        const mappings = {
            'edit-color-primary': this.config.colors.primary,
            'edit-color-secondary': this.config.colors.textMain,
            'edit-color-accent': this.config.colors.accent,
            'edit-color-bg': this.config.colors.background,
            'edit-format': this.config.format.active,
            'edit-orientation': this.config.format.orientation,
            'edit-layout': this.config.layout.active,
            'edit-company-name': this.config.branding.companyName,
            'edit-slogan': this.config.branding.slogan
        };

        Object.entries(mappings).forEach(([id, value]) => {
            const el = document.getElementById(id);
            if (el) el.value = value;
        });
    }

    render() {
        this.applyColors();
        this.applyFonts();
        this.applyFormat();
        this.buildSpreads();
        this.updateInfoHeader();
    }

    /* ── Render Main Flow ───────────────────────────────── */
    async loadConfig() {
        const res = await fetch(this.configPath);
        if (!res.ok) throw new Error(`Config not found: ${this.configPath}`);
        this.config = await res.json();
        this.syncSidebarWithConfig(); // Initial sync
    }

    /* ── Set Colors as CSS Variables ───────────────── */
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

    /* ── Set Fonts as CSS Variables ────────────────── */
    applyFonts() {
        const root = document.documentElement;
        const f = this.config.fonts;
        root.style.setProperty('--font-heading', f.heading);
        root.style.setProperty('--font-body', f.body);
        root.style.setProperty('--font-mono', f.mono);
        // Tailwind-compatible font names (without fallback)
        root.style.setProperty('--font-heading-name', f.heading.split(',')[0].replace(/'/g, '').trim());
        root.style.setProperty('--font-body-name', f.body.split(',')[0].replace(/'/g, '').trim());
        root.style.setProperty('--font-mono-name', f.mono.split(',')[0].replace(/'/g, '').trim());
    }

    /* ── Set Page Format (A5 / A6) + Orientation ─── */
    applyFormat() {
        const fmt = this.config.format;
        const layoutKey = this.config.layout.active;
        const dims = fmt.options[fmt.active];

        if (!dims) {
            console.warn(`Format "${fmt.active}" not found, using A6.`);
            return;
        }

        const isLandscape = fmt.orientation === 'landscape' || fmt.orientation === 'querformat';
        const w = isLandscape ? dims.height : dims.width;
        const h = isLandscape ? dims.width : dims.height;

        const root = document.documentElement;
        root.style.setProperty('--page-width', w);
        root.style.setProperty('--page-height', h);

        // Track format in DOM for CSS targeting
        root.dataset.format = fmt.active;

        const panelsPerSpread = layoutKey === '3-fold' || layoutKey === '3-falz' ? 3 : 2;
        let spreadWidthMM = parseFloat(w) * panelsPerSpread;

        // Match the +10mm gap from buildSpreads for simple layouts
        if (layoutKey === 'simple' || layoutKey === 'einfach') {
            spreadWidthMM += 10;
        }

        // Dynamic @page stylesheet
        const pageStyle = document.getElementById('dynamic-page-style');
        if (pageStyle) {
            pageStyle.textContent = `@page { size: ${w} ${h}; margin: 0; }`;
        }
    }

    /* ── Build Spreads + Panels ─────────────────────── */
    buildSpreads() {
        const container = document.getElementById('flyer-container');
        if (!container) return;

        const layoutKey = this.config.layout.active;
        const layoutDef = this.config.layout.options[layoutKey];
        if (!layoutDef) {
            console.warn(`Layout "${layoutKey}" not found.`);
            return;
        }

        const panelCount = layoutDef.panels;
        const fmt = this.config.format;
        const dims = fmt.options[fmt.active];
        container.innerHTML = '';

        // Build spreads: group panels per spread
        const spreads = this.groupPanelsIntoSpreads(panelCount, layoutKey);

        spreads.forEach((spreadPanels, spreadIdx) => {
            // Spread Label
            const label = document.createElement('div');
            label.className = 'section-label w-fit mx-auto mb-4 bg-slate-200 text-slate-600 px-4 py-1 rounded-full text-[10px] font-black tracking-widest uppercase italic text-center no-print';
            label.textContent = spreadPanels.label;
            container.appendChild(label);

            // Fetch current physical dimensions (accounting for orientation)
            const fmt = this.config.format;
            const dims = fmt.options[fmt.active];
            const isLandscape = fmt.orientation === 'landscape' || fmt.orientation === 'querformat';
            const panelWidthMM = parseFloat(isLandscape ? dims.height : dims.width);

            // Spread Container
            const spreadDiv = document.createElement('div');
            let spreadWidthMM = panelWidthMM * spreadPanels.panels.length;

            // Add gap for simple layouts (approx 10mm for the 40px gap)
            if (layoutKey === 'simple' || layoutKey === 'einfach') {
                spreadWidthMM += 10;
            }

            spreadDiv.className = 'spread mx-auto mb-12';

            // Layout specific spacing
            if (layoutKey === 'simple' || layoutKey === 'einfach') {
                spreadDiv.classList.add('spread--gap');
            }

            spreadDiv.style.width = `${spreadWidthMM}mm`;
            spreadDiv.style.height = isLandscape ? dims.width : dims.height;
            if (spreadPanels.reverse) {
                spreadDiv.style.flexDirection = 'row-reverse';
            }

            // Panels in Spread
            spreadPanels.panels.forEach((panelIdx, posInSpread) => {
                const panelData = this.config.panels[String(panelIdx)] || {};
                const panelEl = this.createPanel(panelIdx, panelData);

                // Fold line between panels (not on the outer edge, and not for simple layouts)
                const isLastInVisualOrder = spreadPanels.reverse ? (posInSpread === 0) : (posInSpread === spreadPanels.panels.length - 1);

                if (!isLastInVisualOrder && layoutKey !== 'simple' && layoutKey !== 'einfach') {
                    const foldLine = document.createElement('div');
                    foldLine.className = 'fold-line';
                    panelEl.appendChild(foldLine);
                }

                spreadDiv.appendChild(panelEl);
            });

            container.appendChild(spreadDiv);
        });
    }

    /* ── Group Panels into Spreads ──────────────────── */
    groupPanelsIntoSpreads(panelCount, layoutKey) {
        switch (layoutKey) {
            case 'simple':
            case 'einfach': // Backward compatibility
                // 2 Panels = 1 Spread (Front Left, Back Right)
                return [
                    { label: 'Greeting Card – Outside', panels: [1, 2], reverse: false }
                ];

            case '2-fold':
            case '2-falz':
                // 4 Panels = 2 Spreads (Outside + Inside)
                return [
                    { label: 'Side 1: Outside', panels: [1, 2], reverse: true },
                    { label: 'Side 2: Inside', panels: [3, 4], reverse: false }
                ];

            case '3-fold':
            case '3-falz':
                // 6 Panels = 2 Spreads à 3 Panels (Outside + Inside)
                return [
                    { label: 'Side 1: Outside', panels: [1, 2, 3], reverse: true },
                    { label: 'Side 2: Inside', panels: [4, 5, 6], reverse: false }
                ];

            default:
                // Fallback: all in one spread
                const allPanels = Array.from({ length: panelCount }, (_, i) => i + 1);
                return [{ label: 'All Panels', panels: allPanels, reverse: false }];
        }
    }

    /* ── Create Single Panel ─────────────────────── */
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
            sub.className = 'font-mono text-[8px] border border-white/20 text-white inline-block px-2 py-1 mt-3 uppercase tracking-widest';
            sub.textContent = data.subheading;
            header.appendChild(sub);
        }

        // Body
        const main = document.createElement('main');
        main.className = 'flex-1 flex flex-col justify-center';
        if (data.body) {
            main.innerHTML = data.body;
        } else {
            // Placeholder
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

    /* ── Update Info Header ─────────────────────── */
    updateInfoHeader() {
        const info = document.getElementById('flyer-info');
        if (!info) return;

        const fmt = this.config.format.attribute || this.config.format.active;
        const orient = this.config.format.orientation;
        const layout = this.config.layout.options[this.config.layout.active];
        const brand = this.config.branding.companyName || 'Flyer Template';

        info.innerHTML = `
            <div class="inline-flex items-center gap-6 px-4 py-2 bg-white/40 backdrop-blur-md rounded-2xl border border-zinc-200/50 shadow-sm">
                <div class="flex items-center gap-2">
                    <div class="w-5 h-5 bg-zinc-950 rounded flex items-center justify-center border border-white/10">
                        <i class="ti ti-layout-dashboard text-white text-xs"></i>
                    </div>
                    <h1 class="text-base font-black tracking-tighter text-zinc-950">${brand}</h1>
                </div>
                
                <div class="hidden sm:block h-4 w-px bg-zinc-200"></div>
                
                <div class="flex items-center gap-4 text-[9px] font-bold uppercase tracking-widest text-zinc-400">
                    <span class="text-zinc-600">Format: <span class="text-zinc-950 font-black">${fmt}</span></span>
                    <span class="text-zinc-600">Layout: <span class="text-zinc-950 font-black">${layout?.label || '–'}</span></span>
                    <span class="text-zinc-600">${layout?.panels || 0} Panels</span>
                </div>

                <div class="hidden sm:block h-4 w-px bg-zinc-200"></div>

                <div class="no-print inline-flex items-center gap-1.5">
                    <kbd class="px-1.5 py-0.5 bg-white border border-zinc-300 rounded shadow-sm text-[8px] font-mono text-zinc-950">CTRL+P</kbd>
                    <span class="text-[9px] text-zinc-400 font-semibold italic">to Print</span>
                </div>
            </div>
        `;
    }
}

/* ── Init ─────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
    const engine = new FlyerEngine();
    engine.init().catch(err => {
        console.error('FlyerEngine Error:', err);
        document.body.innerHTML = `<div style="padding:2rem;color:red;font-family:monospace;">
      <h2>⚠ Error loading configuration</h2>
      <pre>${err.message}</pre>
    </div>`;
    });
});

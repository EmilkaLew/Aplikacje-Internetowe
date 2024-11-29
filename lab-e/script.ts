interface AppState {
    currentStyle: string; // Aktualna nazwa pliku stylu
    styles: Record<string, string>; // Słownik dostępnych stylów
}

class StyleManager {
    private state: AppState;
    private themeLink: HTMLLinkElement;

    constructor() {
        this.themeLink = document.getElementById("theme-style") as HTMLLinkElement;

        if (!this.themeLink) {
            throw new Error("Nie znaleziono elementu <link> z ID 'theme-style'.");
        }

        // Definiowanie stanu aplikacji
        this.state = {
            currentStyle: this.themeLink.getAttribute("href") || "",
            styles: {
                "style1": "style/page1.css",
                "style2": "style/page2.css",
            },
        };

        // Podłącz zdarzenia do linków
        this.attachEventListeners();
    }

    private attachEventListeners(): void {
        const links = document.querySelectorAll("[data-style]");

        links.forEach(link => {
            link.addEventListener("click", (event) => {
                event.preventDefault();
                const target = event.target as HTMLAnchorElement;
                const styleName = target.getAttribute("data-style");

                if (styleName) {
                    this.changeStyle(styleName);
                }
            });
        });
    }

    private changeStyle(styleFile: string): void {
        const newStylePath = `style/${styleFile}`;

        if (this.state.currentStyle !== newStylePath) {
            this.themeLink.setAttribute("href", newStylePath);
            this.state.currentStyle = newStylePath;
        }
    }
}

// Inicjalizacja
document.addEventListener("DOMContentLoaded", () => {
    new StyleManager();
});

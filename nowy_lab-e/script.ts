interface AppState {
    currentStyle: string; // Aktualna nazwa pliku stylu
    styles: Record<string, string>; // Słownik dostępnych stylów
}

class StyleManager {
    private state: AppState;
    private themeLink: HTMLLinkElement;
    private linksContainer: HTMLElement;

    constructor() {
        // Znajdź element <link> w DOM
        this.themeLink = document.getElementById("theme-style") as HTMLLinkElement;
        if (!this.themeLink) {
            throw new Error("Nie znaleziono elementu <link> z ID 'theme-style'.");
        }

        // Znajdź kontener na linki w DOM
        this.linksContainer = document.getElementById("style-links-container") as HTMLElement;
        if (!this.linksContainer) {
            throw new Error("Nie znaleziono kontenera na linki 'style-links-container'.");
        }

        // Zainicjalizuj stan aplikacji
        this.state = {
            currentStyle: this.themeLink.getAttribute("href") || "",
            styles: {
                "style1": "page1.css",
                "style2": "page2.css",
                "style3": "page3.css", //Nowy styl
            },
        };

        // Generowanie dynamicznych linków
        this.generateStyleLinks();

        // Podłącz zdarzenia do linków
        this.attachEventListeners();
    }

/**
     * Dynamiczne generowanie linków do stylów na podstawie stanu aplikacji.
     */
    private generateStyleLinks(): void {

    this.linksContainer.innerHTML = "";

    const ul = document.createElement("ul");
    ul.classList.add("menu");

    for (const [styleName, stylePath] of Object.entries(this.state.styles)) {
        const li = document.createElement("li");
        const link = document.createElement("a");
        link.href = "#";
        link.textContent = styleName;
        link.setAttribute("data-style", stylePath);

        link.addEventListener("click", (event) => {
            event.preventDefault();
            this.changeStyle(stylePath);
        });

        li.appendChild(link);
        ul.appendChild(li);
    }
    this.linksContainer.appendChild(ul);
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

    private changeStyle(newStylePath: string): void {
        if (this.state.currentStyle !== newStylePath) {

            this.themeLink.parentNode?.removeChild(this.themeLink);

            const newLink = document.createElement("link");
            newLink.id = "theme-style";
            newLink.rel = "stylesheet";
            newLink.href = `style/${newStylePath}`;

            document.head.appendChild(newLink);

            this.state.currentStyle = newStylePath;
        }
    }
}

// Inicjalizacja
document.addEventListener("DOMContentLoaded", () => {
    new StyleManager();
});

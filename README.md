# Planety

## Wstęp

Projekt "Planety" to wizualizacja układu planetarnego z wykorzystaniem biblioteki Three.js. Projekt pozwala na dynamiczne dodawanie planet i księżyców, kontrolowanie ich parametrów oraz śledzenie ruchu planet w czasie rzeczywistym. Celem projektu jest edukacja i demonstracja możliwości Three.js w tworzeniu interaktywnych wizualizacji 3D.

## Funkcjonalność

- Dodawanie planet i księżyców
- Kontrola parametrów planet i księżyców (rozmiar, prędkość, odległość od słońca, kolor)
- Śledzenie ruchu planet w czasie rzeczywistym
- Interaktywne interfejsy użytkownika za pomocą Tweakpane
- Efekty wizualne, takie jak poświata gwiazd
- Dynamiczne tworzenie i usuwanie obiektów

## Wymagania

Aby uruchomić projekt "Planety", potrzebujesz:

- Node.js (wersja 14 lub nowsza)
- npm (wersja 6 lub nowsza)

## Instalacja

Aby zainstalować projekt "Planety", wykonaj poniższe kroki:

1. **Klonowanie repozytorium**:
    ```bash
    git clone https://github.com/your-username/planety.git
    cd planety
    ```

2. **Instalacja zależności**:
    Upewnij się, że masz zainstalowany Node.js i npm. Następnie zainstaluj zależności projektu:
    ```bash
    npm install
    ```

## Konfiguracja i uruchomienie

Aby uruchomić projekt lokalnie, wykonaj poniższe kroki:

1. **Uruchomienie projektu**:
    Użyj poniższego polecenia, aby uruchomić projekt:
    ```bash
    npm start
    ```

2. **Otwieranie w przeglądarce**:
    Po uruchomieniu projektu, otwórz przeglądarkę i przejdź do adresu `http://localhost:3000`, aby zobaczyć wizualizację układu planetarnego.

## Przykładowy zestaw planet

Projekt zawiera wstępnie zdefiniowane dane dla planet i ich księżyców w układzie słonecznym:

```javascript
const solarSystemData = [
    { name: 'Merkury', distance: 0.06, size: 0.0005, speed: 4.17, color: '#aaaaaa', moons: [] },
    { name: 'Wenus', distance: 0.10, size: 0.0012, speed: 1.61, color: '#ffcc66', moons: [] },
    { name: 'Ziemia', distance: 0.15, size: 0.0013, speed: 1.0, color: '#3388ff', moons: [
        { name: 'Księżyc', distance: 0.03, size: 0.0003, speed: 13.4, color: '#cccccc' }
    ] },
    { name: 'Mars', distance: 0.23, size: 0.0007, speed: 0.53, color: '#ff5522', moons: [
        { name: 'Fobos', distance: 0.009, size: 0.0001, speed: 1148, color: '#888888' },
        { name: 'Deimos', distance: 0.023, size: 0.0001, speed: 289, color: '#999999' }
    ] },
    { name: 'Jowisz', distance: 0.78, size: 0.014, speed: 0.084, color: '#ffaa77', moons: [
        { name: 'Io', distance: 0.05, size: 0.001, speed: 203, color: '#ff9900' },
        { name: 'Europa', distance: 0.07, size: 0.0009, speed: 104, color: '#ccccff' },
        { name: 'Ganimedes', distance: 0.11, size: 0.0015, speed: 51, color: '#bbbbbb' },
        { name: 'Kallisto', distance: 0.18, size: 0.0014, speed: 22, color: '#aaaaaa' }
    ] },
    { name: 'Saturn', distance: 1.43, size: 0.0115, speed: 0.034, color: '#ffdd99', moons: [
        { name: 'Tytan', distance: 0.12, size: 0.0014, speed: 23, color: '#ffcc66' },
        { name: 'Enceladus', distance: 0.05, size: 0.0005, speed: 259, color: '#ffffff' }
    ] },
    { name: 'Uran', distance: 2.87, size: 0.005, speed: 0.012, color: '#99ccff', moons: [
        { name: 'Miranda', distance: 0.04, size: 0.0003, speed: 260, color: '#bbbbbb' },
        { name: 'Ariel', distance: 0.06, size: 0.0004, speed: 146, color: '#cccccc' }
    ] },
    { name: 'Neptun', distance: 4.50, size: 0.005, speed: 0.006, color: '#3366ff', moons: [
        { name: 'Triton', distance: 0.08, size: 0.0007, speed: 62, color: '#99ccff' }
    ] }
];
```

## Interakcja użytkownika

Użytkownicy mogą przeprowadzać następujące interakcje na działającym projekcie:

- **Dodawanie planet**: Użytkownicy mogą dodawać nowe planety za pomocą interfejsu użytkownika.
- **Modyfikowanie planet**: Użytkownicy mogą dostosowywać parametry planet, takie jak rozmiar, prędkość, odległość od słońca i kolor.
- **Dodawanie księżyców**: Użytkownicy mogą dodawać księżyce do istniejących planet.
- **Usuwanie planet i księżyców**: Użytkownicy mogą usuwać planety i księżyce z układu planetarnego.
- **Śledzenie planet**: Użytkownicy mogą wybrać planetę, za którą kamera będzie podążać.
- **Swobodna kamera**: Użytkownicy mogą przełączyć się na swobodną kamerę, aby eksplorować układ planetarny.

## Struktura projektu

Projekt "Planety" składa się z następujących plików i folderów:

- `src/main.js`: Główny plik JavaScript zawierający logikę projektu.
- `src/style.css`: Plik CSS zawierający style dla projektu.
- `index.html`: Plik HTML zawierający strukturę strony.
- `README.md`: Plik dokumentacji projektu.
- `node_modules/`: Folder zawierający wszystkie wymagane moduły Node.js.
- `package.json`: Plik konfiguracyjny projektu zawierający zależności.
- wiele innych plików zależnych od poszczególnych modułów.

## Technologie

Projekt "Planety" wykorzystuje następujące technologie:

- **Three.js** (wersja 0.132.2): Biblioteka do tworzenia grafiki 3D w przeglądarce.
- **Tweakpane** (wersja 2.3.0): Narzędzie do tworzenia interfejsów użytkownika do modyfikacji parametrów w czasie rzeczywistym.
- **JavaScript**: Język programowania używany do implementacji logiki projektu.
- **HTML**: Język znaczników używany do tworzenia struktury strony.
- **CSS**: Język stylów używany do stylizacji strony.
- **Vite**: Narzędzie do budowania i uruchamiania projektu.

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
    git clone https://github.com/Maciej-Szczecinski/Planety.git
    cd planety
    ```

2. **Instalacja zależności**:
    Upewnij się, że masz zainstalowany Node.js i npm. Następnie zainstaluj zależności projektu:
    ```bash
    npm install
    ```
    Projekt nie jest "zbudowany" więc nie uruchamia się domyślnym poleceniem "npm start".

## Konfiguracja i uruchomienie

Aby uruchomić projekt lokalnie, wykonaj poniższe kroki:

1. **Uruchomienie projektu**:
    Użyj poniższego polecenia, aby uruchomić projekt:
    ```bash
    npm run dev
    ```

2. **Otwieranie w przeglądarce**:
    Po uruchomieniu projektu, otwórz przeglądarkę i przejdź do adresu `http://localhost:5137`, aby zobaczyć wizualizację układu planetarnego.

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

## Napotkane problemy:

Jednym z głównych problemów napotkanych podczas pracy z Three.js była ograniczona znajomość języka JavaScript, co znacząco wydłużyło czas realizacji projektu. Konieczne było zapoznanie się z podstawami składni, mechanizmami działania oraz specyficznymi aspektami języka, co wpłynęło na tempo postępów i wymagało dodatkowego wysiłku w zakresie nauki oraz debugowania kodu.

Aby usprawnić proces tworzenia i poprawy kodu, wykorzystano modele LLM do generowania fragmentów kodu oraz korekty ciężkich do samodzielnego zrozumienia błędów. Pomogło to w szybkim uzyskiwaniu rozwiązań dla napotkanych problemów, optymalizacji kodu oraz lepszym zrozumieniu składni i zasad działania JavaScript oraz Three.js.

Początkowo interfejs użytkownika opierał się na bibliotece lil-gui, jednak ze względu na jej ograniczenia w tworzeniu dynamicznych paneli menu została zastąpiona przez tweakpane. Zmiana ta była konieczna, ponieważ projekt wymagał możliwości dodawania niezależnych paneli kontroli dla wszystkich planet, co nie było efektywnie realizowane przy użyciu lil-gui.

Generowanie tła gwiazd bez pełnego polegania na generatorach szumu okazało się złożonym problemem, wymagającym wielu iteracji kodu. Celem było opracowanie własnego rozwiązania zamiast korzystania z gotowych bibliotek, co zwiększyło poziom trudności i wydłużyło proces implementacji. Końcowe rozmiązanie nie jest najsprawniejszą metodą rozwiązania tego problemu ale po wielu testach okazało się najstabilniejszą. 

Początkowo projekt zakładał wykorzystanie realistycznych modeli fizycznych, jednak ostatecznie zdecydowano się na wstępnie zainicjalizowany, przybliżony model Układu Słonecznego(rozmiar planet jest mało dokładny a odległości znacznie zredukowane). Głównym powodem tej zmiany były trudności związane z wizualizacją realistycznych modeli oraz skala danych niezbędnych do zachowania fizycznego realizmu. Modele te okazały się nieczytelne i często przekraczały granice dokładności możliwe do uzyskania w Three.js, co uniemożliwiało ich efektywne zastosowanie.

Domyślnie projekt uruchamia się w skali czasu, w której 1 minuta rzeczywistego czasu odpowiada 365 dniom symulacji. Skala ta została wybrana w celu nadania priorytetu aspektom wizualnym projektu. W związku ze zmianą priorytetów interfejs użytkownika został rozszerzony o dodatkowe elementy ułatwiające orientację w symulacji, takie jak nazwy planet wyświetlające się nad nimi, znaczniki zapewniające ich widoczność niezależnie od odległości kamery oraz generator kropek rysujących trajektorie planet.

Część materiałów zastosowanych w obiektach opiera się na shaderach, których samodzielne stworzenie okazało się zbyt wymagające. W celu ich implementacji wykorzystano dostępne schematy oraz wsparcie modeli LLM, co pozwoliło na efektywne opracowanie i dostosowanie shaderów do potrzeb projektu.

Dalsze próby optymalizacji projektu przekroczyły dostępny margines czasu na takie korekty. Końcowy projekt jest w pełni funkcjonalny, jednak jego efektywność pozostawia wiele do życzenia. Optymalizacja wydajności okazała się wyzwaniem wykraczającym poza możliwości osoby, dla której było to pierwsze doświadczenie z JavaScript i Three.js.

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Pane } from 'tweakpane';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x060810); // Ustaw kolor tła

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 1000);
camera.position.set(0, 2.5, 5);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Funkcja generująca losowy kolor dla każdej gwiazdy(1 z 3 możliwych)
function getRandomColor() {
    const rand = Math.random();
    if (rand < 0.33) {
        return new THREE.Color(0xffffff); // Biały
    } else if (rand < 0.66) {
        return new THREE.Color(0xffcbbb); // Lekko pomarańczowy
    } else {
        return new THREE.Color(0xbbefff); // Lekko niebieski
    }
}

// Definiowanie właściwości gwiazd
const numStars = 1000; // Podstawowe gwiazdy
const numClusterStars = numStars * 4; // Skupione gwiazdy
const starRadius = 0.25;
const spaceSize = 250;
const minDistance = spaceSize / 4;
const clusterRadiusRange = [2, 15]; // Zakres rozprzestrzenienia skupisk (dostosuj w razie potrzeby)

// Utwórz grupę do przechowywania wszystkich gwiazd
const starsGroup = new THREE.Group();
scene.add(starsGroup);

const stars = [];
const clusteredStars = [];

// Funkcja generująca losową pozycję 3D poza minDistance
function getRandomPosition() {
    let x, y, z, distance;
    do {
        x = (Math.random() - 0.5) * spaceSize;
        y = (Math.random() - 0.5) * spaceSize;
        z = (Math.random() - 0.5) * spaceSize;
        distance = Math.sqrt(x * x + y * y + z * z);
    } while (distance < minDistance);
    return new THREE.Vector3(x, y, z);
}

// Funkcja generująca losowy wektor jednostkowy dla pełnego skupienia 3D
function getRandomUnitVector() {
    let x, y, z, length;
    do {
        x = Math.random() * 2 - 1;
        y = Math.random() * 2 - 1;
        z = Math.random() * 2 - 1;
        length = Math.sqrt(x * x + y * y + z * z);
    } while (length > 1 || length === 0);
    return new THREE.Vector3(x / length, y / length, z / length); // Normalizuj wektor
}

// Generowanie głównych gwiazd (Grupa 1)
for (let i = 0; i < numStars; i++) {
    const geometry = new THREE.PlaneGeometry(starRadius, starRadius);
    const material = new THREE.ShaderMaterial({
        uniforms: { 
            uColor: { value: getRandomColor() },
            glowStrength: { value: 1.0 } // Kontrola intensywności poświaty
        },
        vertexShader: `
            varying vec2 vUv;
            void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
        fragmentShader: `
            uniform vec3 uColor;
            uniform float glowStrength;
            varying vec2 vUv;

            void main() {
                vec2 center = vec2(0.5, 0.5);
                float distance = length(vUv - center);

                // Płynne przejście alfa dla efektu poświaty
                float alpha = smoothstep(0.6, 0.0, distance); // Rozszerza poświatę dalej

                // Miękki efekt promieniowania radialnego: zwiększ jasność w kierunku centrum, ale zachowaj kolor
                vec3 glow = uColor * (1.0 + glowStrength * (1.0 - distance) * 0.8); 

                gl_FragColor = vec4(glow, alpha);
            }
        `,
        transparent: true
    });

    const star = new THREE.Mesh(geometry, material);
    const position = getRandomPosition();
    star.position.copy(position);
    starsGroup.add(star);
    stars.push(star);
}

// Generowanie skupionych gwiazd (Grupa 2) z pełnym skupieniem 3D
for (let i = 0; i < numClusterStars; i++) {
    const geometry = new THREE.PlaneGeometry(starRadius, starRadius);
    const material = new THREE.ShaderMaterial({
        uniforms: { 
            uColor: { value: getRandomColor() },
            glowStrength: { value: 1.0 } // Kontrola intensywności poświaty
        },
        vertexShader: `
            varying vec2 vUv;
            void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
        fragmentShader: `
            uniform vec3 uColor;
            uniform float glowStrength;
            varying vec2 vUv;

            void main() {
                vec2 center = vec2(0.5, 0.5);
                float distance = length(vUv - center);

                // Płynne przejście alfa dla efektu poświaty
                float alpha = smoothstep(0.6, 0.0, distance); // Rozszerza poświatę dalej

                // Miękki efekt promieniowania radialnego: zwiększ jasność w kierunku centrum, ale zachowaj kolor
                vec3 glow = uColor * (1.0 + glowStrength * (1.0 - distance) * 0.8); 

                gl_FragColor = vec4(glow, alpha);
            }
        `,
        transparent: true
    });

    // Wybierz losową gwiazdę z Grupy 1 i umieść wokół niej skupione gwiazdy w 3D
    const baseStar = stars[Math.floor(Math.random() * stars.length)];
    
    // Generuj losowy kierunek i skaluj go do promienia skupiska
    const direction = getRandomUnitVector();
    const clusterRadius = Math.random() * (clusterRadiusRange[1] - clusterRadiusRange[0]) + clusterRadiusRange[0];

    const star = new THREE.Mesh(geometry, material);
    star.position.set(
        baseStar.position.x + direction.x * clusterRadius,
        baseStar.position.y + direction.y * clusterRadius,
        baseStar.position.z + direction.z * clusterRadius
    );

    starsGroup.add(star);
    clusteredStars.push(star);
}

const planets = [];
const pane = new Pane();
pane.title = 'Kontrola układu';

let timeScale = 1; // Domyślna skala czasu
pane.addBinding({ timeScale }, 'timeScale', { 
    min: 0.01, 
    max: 2, 
    step: 0.01, 
    label: 'Skala czasu' })
    .on('change', (ev) => {
        timeScale = ev.value;
});

// Utwórz słońce
const baseSunSize = 0.14; // Podstawowy rozmiar słońca
const starGeometry = new THREE.SphereGeometry(baseSunSize, 32, 32);
const starMaterial = new THREE.MeshBasicMaterial({ color: 0xfffebb });
const sun = new THREE.Mesh(starGeometry, starMaterial);
scene.add(sun);

// Przechowuj wartości skalera i temperatury w obiekcie, aby umożliwić dynamiczne aktualizacje
const sunControls = {
    scaler: 1, // Domyślna wartość skalera
    temperature: 0.5, // Domyślna wartość temperatury (0.0 do 1.0)
};

// Funkcja mapująca temperaturę na kolor
function getTemperatureColor(temperature) {
    const lowTempColor = new THREE.Color(0xFFBBBB); // Kolor niższej temperatury
    const highTempColor = new THREE.Color(0xBBBFFF); // Kolor wyższej temperatury
    const baseTempColor = new THREE.Color(0xfffebb); // Kolor podstawowej temperatury

    if (temperature < 0.5) {
        // Interpolacja między lowTempColor a baseTempColor
        return lowTempColor.lerp(baseTempColor, temperature * 2);
    } else {
        // Interpolacja między baseTempColor a highTempColor
        return baseTempColor.lerp(highTempColor, (temperature - 0.5) * 2);
    }
}

// Dodaj suwak do kontrolowania skalera słońca
const sunFolder = pane.addFolder({ title: 'Kontrola słońca' });
sunFolder.addBinding(sunControls, 'scaler', {
    label: 'Rozmiar',
    min: 0.1,  // Minimalna wartość skalera
    max: 2,    // Maksymalna wartość skalera
    step: 0.1  // Rozmiar kroku
}).on('change', (ev) => {
    // Aktualizuj geometrię słońca, gdy zmienia się skaler
    const newSize = baseSunSize * sunControls.scaler; // Oblicz nowy rozmiar
    sun.geometry.dispose(); // Usuń starą geometrię, aby zwolnić pamięć
    sun.geometry = new THREE.SphereGeometry(newSize, 32, 32); // Utwórz nową geometrię z zaktualizowanym rozmiarem
});

// Dodaj suwak do kontrolowania temperatury słońca
sunFolder.addBinding(sunControls, 'temperature', {
    label: 'Temperatura',
    min: 0.0,  // Minimalna wartość temperatury
    max: 1.0,  // Maksymalna wartość temperatury
    step: 0.01 // Rozmiar kroku
}).on('change', (ev) => {
    // Aktualizuj kolor materiału słońca, gdy zmienia się temperatura
    const newColor = getTemperatureColor(sunControls.temperature);
    sun.material.color.copy(newColor);
});

function createCircleMesh(radius, color) {
    const geometry = new THREE.RingGeometry(radius * 0.9, radius, 32); // Wewnętrzny i zewnętrzny promień
    const material = new THREE.MeshBasicMaterial({
        color: color,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.5
    });
    return new THREE.Mesh(geometry, material);
}
function updateCircleScale(circle, camera) {
    const distance = camera.position.distanceTo(circle.position);
    const scale = distance * 0.002; // Kontrola rozmiaru okręgu
    circle.scale.set(scale, scale, 1);
}
function createLabelTexture(text) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 128;
    canvas.height = 128;
    ctx.fillStyle = 'white';
    ctx.font = '24px Arial';
    ctx.fillText(text, 20, 40);
    const texture = new THREE.CanvasTexture(canvas);
    return texture;
}
function updateLabelScale(label, camera) {
    const distance = camera.position.distanceTo(label.position);
    const scale = distance * 0.15; // Kontrola rozmiaru etykiety
    label.scale.set(scale, scale, 1);
}
const dots = []; // Przechowuj kropki z ich czasem utworzenia i odniesieniem do planety
const spawnIntervals = {}; // Śledź aktywne interwały tworzenia kropek dla każdej planety

// Funkcja rozpoczynająca dynamiczne tworzenie kropek w oparciu o prędkość planety
function startSpawningDotsForPlanet(planet) {
    if (spawnIntervals[planet.name]) return;

    const interval = Math.max(50 / timeScale, 200 / planet.speed / timeScale); // Skala interwału tworzenia (min 500ms)

    spawnIntervals[planet.name] = setInterval(() => {
        spawnDotAtPlanet(planet);
    }, interval);
}

// Funkcja tworząca zanikającą kropkę w lokalizacji planety za pomocą Points
function spawnDotAtPlanet(planet) {
    const dotGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(planet.mesh.position.toArray());
    dotGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const dotMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.00001,
        transparent: true,
        opacity: 1,
    });

    const dot = new THREE.Points(dotGeometry, dotMaterial);
    scene.add(dot);

    const lifetime = Math.max(3000, 15000 / planet.speed); // Minimalny czas życia 3s

    dots.push({ dot, createdAt: Date.now(), lifetime, planet });
}
// Funkcja usuwająca wszystkie kropki związane z konkretną planetą
function removeDotsForPlanet(planet) {
    for (let i = dots.length - 1; i >= 0; i--) {
        if (dots[i].planet === planet) {
            scene.remove(dots[i].dot);
            dots[i].dot.geometry.dispose();
            dots[i].dot.material.dispose();
            dots.splice(i, 1);
        }
    }
}
function addPlanet(data) {
    const planet = {
        name: data?.name || `Planeta ${planets.length + 1}`,
        distance: data?.distance || baseSunSize * 2  + Math.random(),
        size: data?.size || 0.0005 + Math.random() * 0.015,
        speed: data?.speed || 0.01 + Math.random() * 0.1,
        color: data?.color || `#${Math.floor(Math.random() * 16777215).toString(16)}`,
        moons: [],
        mesh: null,
        circle: null,
        label: null
    };

    const geometry = new THREE.SphereGeometry(planet.size, 16, 16);
    const material = new THREE.MeshBasicMaterial({ color: planet.color });
    planet.mesh = new THREE.Mesh(geometry, material);
    scene.add(planet.mesh);

    planet.circle = createCircleMesh(10, planet.color);
    scene.add(planet.circle);

    const labelMaterial = new THREE.SpriteMaterial({ map: createLabelTexture(planet.name) });
    planet.label = new THREE.Sprite(labelMaterial);
    planet.label.scale.set(1, 1, 1);
    scene.add(planet.label);

    planets.push(planet);
    startSpawningDotsForPlanet(planet);

    const planetFolder = pane.addFolder({ title: planet.name, expanded: false });
    planetFolder.addBinding(planet, 'name', {label: 'Nazwa'}).on('change', () => {
        planet.label.material.map = createLabelTexture(planet.name);
        planet.label.material.needsUpdate = true;
        planetFolder.title = planet.name;
    });
    planetFolder.addBinding(planet, 'size', {label: 'Rozmiar'}).on('change', () => {
        planet.mesh.scale.setScalar(planet.size);
    });
    planetFolder.addBinding(planet, 'distance', {label: 'Dystans'});
    planetFolder.addBinding(planet, 'speed', {label: 'Prędkość'});
    planetFolder.addBinding(planet, 'color', {label: 'Kolor'}).on('change', () => {
        planet.mesh.material.color.set(planet.color);
        planet.circle.material.color.set(planet.color);
    });

    const moonsFolder = planetFolder.addFolder({ title: 'Księżyce', expanded: false });
    data?.moons?.forEach(moonData => addMoon(planet, moonsFolder, moonData));

    moonsFolder.addButton({ title: 'Dodaj księżyc' }).on('click', () => {
        addMoon(planet, moonsFolder);
    });
    planetFolder.addButton({ title: 'Usuń planetę' }).on('click', () => {
        scene.remove(planet.mesh);
        scene.remove(planet.circle);
        scene.remove(planet.label);
        planets.splice(planets.indexOf(planet), 1);
        pane.remove(planetFolder);

        // Zatrzymaj tworzenie kropek i wyczyść interwał
        if (spawnIntervals[planet.name]) {
            clearInterval(spawnIntervals[planet.name]);
            delete spawnIntervals[planet.name];
        }
        // Natychmiast usuń wszystkie kropki związane z planetą
        removeDotsForPlanet(planet);
    });
    planetFolder.addButton({ title: `Podążaj za planetą` }).on('click', () => moveCameraToPlanet(planet));
}

function addMoon(planet, moonsFolder, data = {}) {
    const moon = {
        name: data?.name || `Księżyc ${planet.moons.length + 1}`,
        distance: data?.distance || planet.size + Math.random() * 0.05,
        size: data?.size || Math.min(planet.size * 0.8, 0.0001 + Math.random() * 0.0015),
        speed: data?.speed || 5 + Math.random() * 50,
        color: data?.color || `#${Math.floor(Math.random() * 16777215).toString(16)}`,
        mesh: null
    };

    const geometry = new THREE.SphereGeometry(moon.size, 8, 8);
    const material = new THREE.MeshBasicMaterial({ color: moon.color });
    moon.mesh = new THREE.Mesh(geometry, material);
    planet.mesh.add(moon.mesh);
    planet.moons.push(moon);

    const moonFolder = moonsFolder.addFolder({ title: moon.name });
    moonFolder.addBinding(moon, 'name', {label: 'Nazwa'}).on('change', () => {
        moonFolder.title = moon.name;
    });
    moonFolder.addBinding(moon, 'size', {label: 'Rozmiar'}).on('change', () => {
        moon.mesh.scale.setScalar(moon.size);
    });
    moonFolder.addBinding(moon, 'distance', {label: 'Dystans'});
    moonFolder.addBinding(moon, 'speed', {label: 'Prędkość'});
    moonFolder.addBinding(moon, 'color', {label: 'Kolor'}).on('change', () => {
        moon.mesh.material.color.set(moon.color);
    });
    moonFolder.addButton({ title: "Usuń księżyc" }).on('click', () => {
        planet.mesh.remove(moon.mesh);
        planet.moons = planet.moons.filter(m => m !== moon);
        moonsFolder.remove(moonFolder);
    });
}
let attachedPlanet = null;

function moveCameraToPlanet(planet) {
    attachedPlanet = planet; // Ustaw wybraną planetę do śledzenia
}

function resetCamera() {
    attachedPlanet = null; // Odłącz kamerę od planety
    
    const defaultPosition = new THREE.Vector3(0, 2.5, 5); // Ustaw domyślną pozycję
    camera.position.set(defaultPosition.x, defaultPosition.y, defaultPosition.z); // Natychmiast przejdź do domyślnej pozycji
    controls.target.set(0, 0, 0); // Zresetuj cel do środka
    controls.update();
}

function updateCameraFollow() {
    if (attachedPlanet) {
        const offset = new THREE.Vector3(0, attachedPlanet.size * 10, attachedPlanet.size * 20); // Dostosuj pozycję offsetu
        const targetPosition = attachedPlanet.mesh.position.clone().add(offset);

        camera.position.copy(targetPosition); // Upewnij się, że kamera podąża natychmiast
        controls.target.copy(attachedPlanet.mesh.position); // Utrzymuj cel zablokowany na planecie
    }
    controls.update();
}
pane.addButton({ title: 'Swobodna kamera' }).on('click', () => resetCamera());
pane.addButton({ title: 'Dodaj planetę' }).on('click', () => addPlanet({}));

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

solarSystemData.forEach(data => {
    addPlanet(data);
});

function animate() {
    requestAnimationFrame(animate);
    const time = Date.now() * 0.00005 * timeScale;
    planets.forEach(planet => {
        const angle = time * planet.speed;
        const totalDistance = planet.distance * 5 * sunControls.scaler; //Domyślna skala tego układu to jedynie fragment rzeczywistego układu słonecznego
        planet.mesh.position.set(Math.cos(angle) * totalDistance, 0, Math.sin(angle) * totalDistance);
        planet.label.position.copy(planet.mesh.position).add(new THREE.Vector3(0, planet.size * 2, 0));
        planet.circle.position.copy(planet.mesh.position).add(new THREE.Vector3(0, 0, 0));
        
        // Aktualizuj skalę etykiety i okręgu w zależności od odległości od kamery
        updateLabelScale(planet.label, camera);
        updateCircleScale(planet.circle, camera);
        planet.circle.lookAt(camera.position);

        planet.moons.forEach((moon, index) => {
            const moonAngle = time * moon.speed;
            moon.mesh.position.set(
                Math.cos(moonAngle) * moon.distance,
                0,
                Math.sin(moonAngle) * moon.distance
            );
        });
    });

    // Aktualizuj kropki: Zanikaj i usuwaj po ich skalowanym czasie życia
    const now = Date.now();
    for (let i = dots.length - 1; i >= 0; i--) {
        const { dot, createdAt, lifetime } = dots[i];
        const elapsed = now - createdAt;

        if (elapsed > lifetime) {
            scene.remove(dot);
            dot.geometry.dispose();
            dot.material.dispose();
            dots.splice(i, 1);
        } else {
            dot.material.opacity = 1 - elapsed / lifetime;
        }
    }

    updateCameraFollow(); // Utrzymuj kamerę przyczepioną, jeśli wybrano planetę
    // Upewnij się, że każda gwiazda zawsze patrzy na kamerę
    stars.concat(clusteredStars).forEach(star => {
        star.lookAt(camera.position);
    });

    controls.update();
    renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

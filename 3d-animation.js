// 3d-animation.js

// Scene Setup
const scene = new THREE.Scene();

// Camera Setup
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 15;

// Renderer Setup
const container = document.getElementById('webgl-container');
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true }); // alpha: true allows background CSS color to show if needed
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6); // Soft white light
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 0.8);
pointLight.position.set(10, 10, 10);
scene.add(pointLight);

const pointLight2 = new THREE.PointLight(0xda251d, 1); // India post red accent
pointLight2.position.set(-10, -10, 10);
scene.add(pointLight2);


// Materials
const material1 = new THREE.MeshStandardMaterial({ 
    color: 0xda251d, 
    roughness: 0.4, 
    metalness: 0.3,
    wireframe: false
});

const material2 = new THREE.MeshStandardMaterial({ 
    color: 0x222222, 
    roughness: 0.2, 
    metalness: 0.8,
});

const material3 = new THREE.MeshStandardMaterial({ 
    color: 0xffd700, // Gold/coin color
    roughness: 0.3, 
    metalness: 0.6,
});


// Objects Array
const objects = [];

// Helper function to add a random shape
function addShape(geometry, material, x, y, z) {
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    
    // random rotation speeds
    mesh.userData = {
        rx: (Math.random() - 0.5) * 0.02,
        ry: (Math.random() - 0.5) * 0.02,
        rz: (Math.random() - 0.5) * 0.02
    };

    scene.add(mesh);
    objects.push(mesh);
}

// Create geometrical shapes
// Large central accent
const torusKnotGeo = new THREE.TorusKnotGeometry( 3, 0.8, 100, 16 );
addShape(torusKnotGeo, material1, 0, 0, -5);

// Add floating smaller shapes
for(let i=0; i<15; i++) {
    const geoType = Math.floor(Math.random() * 3);
    let geo;
    if (geoType === 0) geo = new THREE.IcosahedronGeometry(Math.random() * 1.5 + 0.5);
    else if (geoType === 1) geo = new THREE.OctahedronGeometry(Math.random() * 1.5 + 0.5);
    else geo = new THREE.TetrahedronGeometry(Math.random() * 1.5 + 0.5);

    const matType = Math.floor(Math.random() * 3);
    let mat = material1;
    if (matType === 1) mat = material2;
    if (matType === 2) mat = material3;

    const x = (Math.random() - 0.5) * 30;
    const y = (Math.random() - 0.5) * 30;
    const z = (Math.random() - 0.5) * 20 - 5; // Keep them slightly back

    addShape(geo, mat, x, y, z);
}

// Mouse Interaction variables
let mouseX = 0;
let mouseY = 0;
let targetX = 0;
let targetY = 0;

const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX - windowHalfX);
    mouseY = (event.clientY - windowHalfY);
});

// Animation Loop
function animate() {
    requestAnimationFrame(animate);

    targetX = mouseX * 0.001;
    targetY = mouseY * 0.001;

    // Smoothly interpolate camera rotation based on mouse
    camera.rotation.y += 0.05 * (targetX - camera.rotation.y);
    camera.rotation.x += 0.05 * (targetY - camera.rotation.x);

    // Rotate all objects
    objects.forEach(obj => {
        obj.rotation.x += obj.userData.rx;
        obj.rotation.y += obj.userData.ry;
        obj.rotation.z += obj.userData.rz;
    });

    renderer.render(scene, camera);
}

animate();

// Handle Window Resize
window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});

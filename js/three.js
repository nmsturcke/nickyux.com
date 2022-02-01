import * as THREE from '/modules/three/three.module.js'
import {OrbitControls} from '/modules/three/controls/OrbitControls.js'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById("background")
});
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xFF3247});
const torus = new THREE.Mesh( geometry, material );
scene.add( torus );

camera.position.z = 30;

const pointLight = new THREE.PointLight(0xff00ff);
pointLight.position.set(2, 2, 2);
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight)

// const lightHelper = new THREE.PointLightHelper(pointLight);
// scene.add(lightHelper);

const controls = new OrbitControls(camera, renderer.domElement);

function animate() {
    requestAnimationFrame(animate);
    torus.rotation.x += 0.01;
    torus.rotation.y += 0.001;
    torus.rotation.z += 0.008;
    controls.update();
    // controls.activate();
    renderer.render(scene, camera);
}

// controls.addEventListener( 'dragstart', function ( event ) { event.object.material.emissive.set( 0xaaaaaa ); } ); controls.addEventListener( 'dragend', function ( event ) { event.object.material.emissive.set( 0x000000 ); } );

animate();
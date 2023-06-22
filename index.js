import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor(0x232323);
document.body.appendChild( renderer.domElement );

const leaf = new THREE.SphereGeometry(.5, 5, 5, 2, 6.3, 0, 3);
const material = new THREE.MeshBasicMaterial({ color: 0xfff6e6, wireframe: true });
const sphere = new THREE.Mesh(leaf, material);
scene.add(sphere);

camera.position.z = 5;

let inhale = true;
const inhaleTime = 0.006, 
exhaleTime = 0.009;

function animate() {
  breathe();
  sphere.rotation.x += 0.005;
  sphere.rotation.y += 0.005;
  sphere.rotation.z += 0.005;
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}

function checkBreath() {
  if (sphere.scale.x >= 2) {
    inhale = false;
  } else if (sphere.scale.x <= 0.5) {
    inhale = true;
  }
}

function breathe() {
  checkBreath();
  var words = "";
  const text = document.getElementById("text");

  if (inhale) {
    sphere.scale.x += inhaleTime;
    sphere.scale.y += inhaleTime;
    sphere.scale.z += inhaleTime;
    words = "breathe in";
    text.style.animation = "inhale 2.9s ease-in-out 1";
  } else if (!inhale) {
    sphere.scale.x -= exhaleTime;
    sphere.scale.y -= exhaleTime;
    sphere.scale.z -= exhaleTime;
    words = "breathe out";
    text.style.animation = "exhale 2.9s ease-in-out 1";
  }

  text.innerHTML = words;
}

animate();
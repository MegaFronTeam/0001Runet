//Import the THREE.js library

import * as THREE from "three";
// To allow for the camera to move around the scene
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";
// import { RGBMLoader } from "three/addons/loaders/RGBMLoader.js";  
// import { EXRLoader } from 'three/addons/loaders/EXRLoader.js';
//Create a Three.JS Scene
let camera;
const monkeyUrl = new URL('model/RU-logo-export-anim-4.gltf', import.meta.url);
const scene = new THREE.Scene();
// scene.add(new THREE.GridHelper(20, 20));

//create a new camera with positions and angles
// const camera = new THREE.PerspectiveCamera(75, window.innerWidth  / window.innerHeight  , 1, 20);
// camera.position.set(3, 0.15, 3);

let canvas = document.getElementById("container3D")
camera = new THREE.PerspectiveCamera(40, window.innerWidth / (window.innerWidth), 0.25, 100);
camera.position.set(1, 5, 55);
camera.position.x = -44;
camera.position.z = 6;
camera.position.y = 38;


scene.rotation.x = -.1;
scene.rotation.y = -1;
// camera.position.z = -1;
scene.position.y = 9.5;
scene.position.z = 0;



let cameraTarget = new THREE.Vector3(0, 29.4, 0);
//Keep the 3D object on a global variable so we can access it later
let object;

let mixer;

//Instantiate a loader for the .gltf file
const dracoLoader = new DRACOLoader();

dracoLoader.setDecoderPath('https://cdn.jsdelivr.net/npm/three@0.156.1/examples/jsm/libs/draco/')
const filename = 'img/@2x/ru-hdri-test-3-1.png';

let envPath = filename;

const loader = new GLTFLoader();
loader.setDRACOLoader(dracoLoader);
//Instantiate a new renderer and set its size
const renderer = new THREE.WebGLRenderer({
  alpha: true,
  antialias: true,
  // powerPreference: "high-performance"
}); //Alpha: true allows for the transparent background
let pixelRatio = window.devicePixelRatio;
let width = canvas.clientWidth * pixelRatio;
let height = canvas.clientHeight * pixelRatio;
renderer.setSize(width, height);

renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.setClearColor(0x000000, 0);
// renderer.setSize(window.innerWidth, window.innerWidth);
renderer.toneMapping = THREE.ACESFilmicToneMapping;



//Add the renderer to the DOM
canvas.appendChild(renderer.domElement);



// var pmremGenerator = new THREE.PMREMGenerator(renderer);
// pmremGenerator.compileEquirectangularShader();

// new RGBMLoader()
//   .setDataType(THREE.FloatType)
//   .load(envPath, (texture) => {
//     envMap = pmremGenerator.fromEquirectangular(texture).texture;
//     pmremGenerator.dispose();
//     scene.environment = envMap; 
//     // scene.background = envMap; 

//   });

const textureLoader = new THREE.TextureLoader()

const environmentMap = textureLoader.load(envPath, (environmentMap) => {
  environmentMap.mapping = THREE.EquirectangularReflectionMapping
  environmentMap.colorSpace = THREE.SRGBColorSpace
  // scene.background = environmentMap
  scene.environment = environmentMap
})

function animate() {
  render();
  requestAnimationFrame(animate);
}
//Add a listener to the window, so we can resize the window and the camera
window.addEventListener("resize", function () {
  pixelRatio = window.devicePixelRatio;
  width = canvas.clientWidth * pixelRatio;
  height = canvas.clientHeight * pixelRatio;
  camera.aspect = window.innerWidth / (window.innerWidth);
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  // renderer.setSize(window.innerWidth, window.innerWidth  );
});

const global = {}
global.envMapIntensity = 201
global.color = 0xEBB86B;
global.roughness = .112;
global.metalness = .4;

loader.load(
  monkeyUrl.href,
  function (gltf) {
    //If the file is loaded, add it to the scene
    object = gltf.scene;
    object.traverse(function (child) {
      //This allow us to check if the children is an instance of the Mesh constructor
      if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
        child.material.roughness = .6;
        child.material.envMapIntensity = 1.8;
      }
    });
    // object = new THREE.Mesh(object, material);
    object.scale.set(4, 4, 4);
    scene.add(object);
    mixer = new THREE.AnimationMixer(object);
    const clips = gltf.animations;
    clips.forEach(function (clip) {
      const action = mixer.clipAction(clip);
      action.play();
    });
  },
  function (xhr) {
  },
  function (error) {
    console.error(error);
  }
);


camera.lookAt(cameraTarget);

function render() {

  if (mixer)
    mixer.update(0.01);

  renderer.render(scene, camera);

}




//Start the 3D rendering
animate();
//Import the THREE.js library

import * as THREE from "three";
// To allow for the camera to move around the scene
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";  
import { RGBMLoader } from "three/addons/loaders/RGBMLoader.js";  
// import { EXRLoader } from 'three/addons/loaders/EXRLoader.js';
//Create a Three.JS Scene
let camera;
// const monkeyUrl = new URL('/scene1.gltf', import.meta.url);
// const monkeyUrl = new URL('model/RU-logo-export-anim-3.1.gltf', import.meta.url);
const monkeyUrl = new URL('model/RU-logo-export-anim-4.gltf', import.meta.url); 
const scene = new THREE.Scene();
// scene.add(new THREE.GridHelper(20, 20));

//create a new camera with positions and angles
// const camera = new THREE.PerspectiveCamera(75, window.innerWidth  / window.innerHeight  , 1, 20);
// camera.position.set(3, 0.15, 3);

camera = new THREE.PerspectiveCamera(40, window.innerWidth / (window.innerWidth), 0.25, 100);
camera.position.set(1, 5, 55);
camera.position.x = -44;
camera.position.z = 10;
camera.position.y = 35;

scene.rotation.x = -.1;
scene.rotation.y = -1;
// camera.position.z = -1;
scene.position.y = 8; 
scene.position.z = -1;



let cameraTarget = new THREE.Vector3( 144, 12.4, -15 );
//Keep the 3D object on a global variable so we can access it later
let object;

//OrbitControls allow the camera to move around the scene
let controls;

let mixer;

const textures = { none: null };

//Instantiate a loader for the .gltf file
const dracoLoader = new DRACOLoader();


 
dracoLoader.setDecoderPath('https://cdn.jsdelivr.net/npm/three@0.156.1/examples/jsm/libs/draco/')
// const filename = 'model/ru-hdri-test.hdr';
// const filename = 'model/ru-hdri-test-3.hdr';
// const filename = 'model/ru-hdri-test-3.png';
const filename = 'img/@2x/ru-hdri-test-3-1.png';

let envPath = filename;
let envMap; 


const loader = new GLTFLoader();
loader.setDRACOLoader(dracoLoader); 


 

let w = 1331;
let h = 3916;
//Instantiate a new renderer and set its size
const renderer = new THREE.WebGLRenderer({ 
  alpha: true ,
  antialias: true,
  // powerPreference: "high-performance"
 }); //Alpha: true allows for the transparent background
renderer.setPixelRatio(window.devicePixelRatio * 12);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = .094;
renderer.setClearColor(0x000000, 0); 
// renderer.setSize(window.innerWidth, window.innerWidth);
renderer.toneMapping = THREE.ACESFilmicToneMapping;


 
//Add the renderer to the DOM
document.getElementById("container3D").appendChild(renderer.domElement); 



var pmremGenerator = new THREE.PMREMGenerator(renderer);
pmremGenerator.compileEquirectangularShader();

new RGBMLoader()
  .setDataType(THREE.FloatType)
  .load(envPath, (texture) => {
    envMap = pmremGenerator.fromEquirectangular(texture).texture;
    pmremGenerator.dispose();
    scene.environment = envMap; 
    // scene.background = envMap; 
    
  });
  
controls = new OrbitControls(camera, renderer.domElement);  
function animate() {   
  render();
  requestAnimationFrame(animate);
} 
//Add a listener to the window, so we can resize the window and the camera
window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / (window.innerWidth);
  camera.updateProjectionMatrix();
  renderer.setPixelRatio(window.devicePixelRatio * 12);
  // renderer.setSize(window.innerWidth, window.innerWidth  );
});






loader.load( 
  monkeyUrl.href, 
  function (gltf) {
    //If the file is loaded, add it to the scene
    object = gltf.scene;
    object.traverse(function (child) {
      //This allow us to check if the children is an instance of the Mesh constructor
      if (child instanceof THREE.Mesh) {
        child.material = new THREE.MeshStandardMaterial({
          color: 0xEBB86B,
          roughness: .114,
          metalness: .56,
          envMapIntensity: 2,
          envMap: envMap
        });
 
        // child.material.map = diffuseMap;
        // child.material.roughnessMap = roughnessMap;
        // child.material.needsUpdate = true;

        //Sometimes there are some vertex normals missing in the .obj files, ThreeJs will compute them
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
    //While it is loading, log the progress
    // console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },
  function (error) {
    //If there is an error, log it
    console.error(error);
  }
);


 
function render() {

  if (mixer)  
      mixer.update(0.02); 
  camera.lookAt(cameraTarget);

  renderer.render(scene, camera);

}




//Start the 3D rendering
animate();
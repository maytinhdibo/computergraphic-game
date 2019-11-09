// Setup three.js WebGL renderer. Note: Antialiasing is a big performance hit.
// Only enable it if you actually need to.
var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.floor(window.devicePixelRatio));

// Append the canvas element created by the renderer to document body element.
document.body.appendChild(renderer.domElement);

// scene

scene = new THREE.Scene();
scene.background = new THREE.Color(0x465766);
scene.fog = new THREE.Fog(0x465766, 150, 1000);

// Create a three.js camera.
var camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  10000
);

// Apply VR headset positional data to camera.
var controls = new THREE.VRControls(camera);

// Apply VR stereo rendering to renderer.
var effect = new THREE.VREffect(renderer);
effect.setSize(window.innerWidth, window.innerHeight);

//Loader
var loader = new THREE.TextureLoader();

// ground
var groundTexture = loader.load("texture/grass.png");
groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
groundTexture.repeat.set(25, 25);
groundTexture.anisotropy = 16;

var groundMaterial = new THREE.MeshPhongMaterial({ map: groundTexture });

var mesh = new THREE.Mesh(
  new THREE.PlaneBufferGeometry(20000, 20000),
  groundMaterial
);
mesh.position.y = -250;
mesh.rotation.x = -Math.PI / 2;
mesh.receiveShadow = true;
scene.add(mesh);

//light
var mainlight = new THREE.AmbientLight(0xeeeeee, 0.7);
scene.add(mainlight);

// full game

//box
var hopgo = THREE.ImageUtils.loadTexture("texture/crate.png");
var hggeometry = new THREE.BoxGeometry(1, 1, 1);
var hgmaterial = new THREE.MeshPhongMaterial({ map: hopgo });
var hopgo = new THREE.Mesh(hggeometry, hgmaterial);
hopgo.position.x = -5.6;
hopgo.position.z = -5.6;
hopgo.position.y = -4.5;
scene.add(hopgo);

//domdom

var domdoms = [];

var sphere = new THREE.SphereGeometry(0.02, 16, 8);
var domdomMaterial = new THREE.MeshBasicMaterial({ color: 0xffd859 });

// for (let i = 0; i < 10; i++) {
//   let domdom = new THREE.PointLight(0xf4aa49, 0.2, 8);
//   domdom.add(new THREE.Mesh(sphere, domdomMaterial));
//   scene.add(domdom);

//   let x = Math.floor(Math.random() * 50) - 25;
//   let y = Math.floor(Math.random() * 20) - 10;
//   let z = Math.floor(Math.random() * 2) - 1;
//   domdoms.push({
//     ele: domdom,
//     x,
//     y,
//     z,
//   });
//   domdom.visible = true;
//   domdom.position.set(x, y, z);
// }

//point light
var sphere = new THREE.SphereGeometry(10, 10, 10);
pointLight = new THREE.PointLight(0xf4aa49, 50, 120);
var domdoma = new THREE.MeshBasicMaterial({ color: 0xffd859 });
pointLight.add(new THREE.Mesh(sphere, domdoma));
scene.add(pointLight);
pointLight.position.set(350, 100, 300);

function lightAnimation() {
  pointLight.position.set(0, 0, 0);
}

var TGALoader = new THREE.TGALoader();
var OBJLoader = new THREE.OBJLoader();
var GLTFLoader = new THREE.GLTFLoader();

//yasuo
var yasuo;
OBJLoader.load(
  "texture/b_yasuo.obj",

  function(object) {
    yasuo = object;

    yasuo.position.x = 500;
    yasuo.position.y = -250;
    yasuo.rotation.y = -Math.PI / 2;

    TGALoader.load(
      "texture/b_yasuo.tga",
      function(texture) {
        var y_material = new THREE.MeshPhongMaterial({
          color: 0xffffff,
          map: texture,
        });

        yasuo.traverse(function(node) {
          node.material = y_material;
        });
      },
      function(xhr) {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      function(error) {
        console.log("An error happened");
      }
    );

    scene.add(object);
  }
);

//ghost
// var ghost;

// GLTFLoader.load(
//   // resource URL
//   "texture/ghost/ghost.gltf",
//   // called when the resource is loaded
//   function(gltf) {
//     scene.add(gltf.scene);
//     ghost = gltf;

//     ghost.scene.position.x = 240;
//     ghost.scene.position.y = -250;
//     ghost.scene.position.z = 50;
//     ghost.scene.rotation.y = -Math.PI / 2;

//     gltf.animations; // Array<THREE.AnimationClip>

//     let mixer = new THREE.AnimationMixer(ghost.scene);
//     ghost.animations.forEach(clip => {
//       mixer.clipAction(clip).play();
//     });

//     var count = 0;
//     setInterval(() => {
//       count = count > 0.2 ? 0 : count + 0.001;

//       mixer.update(count);

//       ghost.scene.position.x = 400 + Math.sin(count * (Math.PI / 0, 2)) * 500;
//       ghost.scene.position.y = -250 + Math.sin(count * (Math.PI / 0, 2)) * 400;
//       ghost.scene.position.z = -200 - Math.sin(count * (Math.PI / 0.2)) * 800;

//       // console.log(ghost.scene.position);
//     }, 100)(ghost, mixer);

//     gltf.scene; // THREE.Scene
//     gltf.scenes; // Array<THREE.Scene>
//     gltf.cameras; // Array<THREE.Camera>
//     gltf.asset; // Object
//   },
//   // called while loading is progressing
//   function(xhr) {
//     console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
//   },
//   // called when loading has errors
//   function(error) {
//     console.log("An error happened");
//   }
// );

//phoenix
var phoenix;

GLTFLoader.load(
  // resource URL
  "texture/phoenix/scene.gltf",
  // called when the resource is loaded
  function(gltf) {
    scene.add(gltf.scene);
    phoenix = gltf;

    phoenix.scene.position.x = 800;
    phoenix.scene.position.y = -250;
    phoenix.scene.position.z = 60;
    phoenix.scene.rotation.y = -Math.PI / 2;

    gltf.animations; // Array<THREE.AnimationClip>

    let mixer = new THREE.AnimationMixer(phoenix.scene);
    phoenix.animations.forEach(clip => {
      mixer.clipAction(clip).play();
    });

    var count = 0;
    setInterval(() => {
      count = count > 0.09 ? 0.03 : count + 0.001;

      mixer.update(count);
      phoenix.scene.position.x =
        800 * Math.cos(count - (0.03 / 0.06) * 2 * Math.PI);
      // phoenix.scene.position.y = 800*Math.sin(count-0.03/0.06 * Math.PI);
      phoenix.scene.position.y =
        800 * Math.sin(count - (0.03 / 0.06) * 2 * Math.PI);
      phoenix.scene.rotation.x = Math.sin(count * (Math.PI / 0, 2));

      // console.log(ghost.scene.position);
    }, 100)(phoenix, mixer);
  },
  // called while loading is progressing
  function(xhr) {
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  // called when loading has errors
  function(error) {
    console.log("An error happened");
  }
);

//ghost_stag
var ghost_stag;

GLTFLoader.load(
  // resource URL
  "texture/ghost_stag/scene.gltf",
  // called when the resource is loaded
  function(gltf) {
    scene.add(gltf.scene);
    ghost_stag = gltf;
    ghost_stag.scene.scale.set(0.2, 0.2, 0.2);
    ghost_stag.scene.position.x = 400;
    ghost_stag.scene.position.y = -240;
    ghost_stag.scene.position.z = 500;
    ghost_stag.scene.rotation.y = -Math.PI / 1.3;

    var animateF = setInterval(function() {
      animate();
    }, 100);

    function animate() {
      ghost_stag.scene.position.y++;
      if (ghost_stag.scene.position.y > 150) {
        setInterval(lightAnimation, 300);
        clearInterval(animateF);
      }
    }
  },
  // called while loading is progressing
  function(xhr) {
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  // called when loading has errors
  function(error) {
    console.log("An error happened");
  }
);

//tree
var tree;

GLTFLoader.load(
  // resource URL
  "texture/tree/scene.gltf",
  // called when the resource is loaded
  function(gltf) {
    scene.add(gltf.scene);
    tree = gltf;

    tree.scene.position.x = 450;
    tree.scene.position.y = -250;
    tree.scene.position.z = -750;
    tree.scene.rotation.y = -Math.PI / 2;

    tree.scene.scale.set(2, 2, 2);

    tree.scene.rotation.y=Math.PI / 1.5;

    let mixer = new THREE.AnimationMixer(tree.scene);
    tree.animations.forEach(clip => {
      mixer.clipAction(clip).play();
    });
  },
  // called while loading is progressing
  function(xhr) {
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  // called when loading has errors
  function(error) {
    console.log("An error happened");
  }
);

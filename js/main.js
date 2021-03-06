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
var TGALoader = new THREE.TGALoader();
var OBJLoader = new THREE.OBJLoader();
var GLTFLoader = new THREE.GLTFLoader();

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

//skybox

let materialArray = [];
let texture_ft = new THREE.TGALoader().load("texture/envmap/miramar_ft.tga");
let texture_bk = new THREE.TGALoader().load("texture/envmap/miramar_bk.tga");
let texture_up = new THREE.TGALoader().load("texture/envmap/miramar_up.tga");
let texture_dn = new THREE.TGALoader().load("texture/envmap/miramar_dn.tga");
let texture_rt = new THREE.TGALoader().load("texture/envmap/miramar_rt.tga");
let texture_lf = new THREE.TGALoader().load("texture/envmap/miramar_lf.tga");

materialArray.push(new THREE.MeshBasicMaterial({ map: texture_ft }));
materialArray.push(new THREE.MeshBasicMaterial({ map: texture_bk }));
materialArray.push(new THREE.MeshBasicMaterial({ map: texture_up }));
materialArray.push(new THREE.MeshBasicMaterial({ map: texture_dn }));
materialArray.push(new THREE.MeshBasicMaterial({ map: texture_rt }));
materialArray.push(new THREE.MeshBasicMaterial({ map: texture_lf }));

for (let i = 0; i < 6; i++) materialArray[i].side = THREE.BackSide;

let skyboxGeo = new THREE.BoxGeometry(3000, 3000, 3000);
let skybox = new THREE.Mesh(skyboxGeo, materialArray);
scene.add(skybox);

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
pointLight.position.set(400, 100, 300);
pointLight.visible = false;

var t = 0;
function lightAnimation() {
  t++;
  pointLight.position.set(
    400 + 200 * Math.sin(t / 10),
    100,
    500 + 200 * Math.cos(t / 10)
  );
}

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
    phoenix.scene.scale.set(0.5, 0.5, 0.5);
    phoenix.scene.position.x = 800;
    phoenix.scene.position.y = 200;
    phoenix.scene.position.z = 600;
    phoenix.scene.rotation.y = -Math.PI / 2;
    gltf.animations; // Array<THREE.AnimationClip>

    let mixer = new THREE.AnimationMixer(phoenix.scene);
    phoenix.animations.forEach(clip => {
      mixer.clipAction(clip).play();
    });
    const upper = 1000;
    const lower = 199;
    var signed = 1;
    var count = 0;
    var beta = 0;

    setInterval(() => {
      count = count > 0.2 ? 0.03 : count + 0.001;
      mixer.update(count);
      const alpha = (2 * Math.PI) / 60;
      if (phoenix.scene.position.y > upper || phoenix.scene.position.y < lower)
        signed *= -1;
      phoenix.scene.position.y += 10 * signed;
      phoenix.scene.position.x = 800 + Math.sin(phoenix.scene.rotation.y) * 500;
      phoenix.scene.position.z = 600 + Math.cos(phoenix.scene.rotation.y) * 500;
      phoenix.scene.rotation.y += alpha;
      beta += 10;

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

    var animateF;
    setTimeout(function() {
      document.querySelector("#rock").play();
      animateF = setInterval(function() {
        animate();
      }, 100);
    }, 5000);

    function animate() {
      ghost_stag.scene.position.y++;
      if (ghost_stag.scene.position.y > 150) {
        setInterval(lightAnimation, 100);
        pointLight.visible = true;
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

    tree.scene.rotation.y = Math.PI / 1.5;

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

//fire
var fire;

GLTFLoader.load(
  // resource URL
  "texture/fire/scene.gltf",
  // called when the resource is loaded
  function(gltf) {
    scene.add(gltf.scene);
    fire = gltf;

    fire.scene.position.set(10, 0, 0);
    fire.scene.rotation.y = -Math.PI / 2;

    let mixer = new THREE.AnimationMixer(fire.scene);
    fire.animations.forEach(clip => {
      mixer.clipAction(clip).play();
    });

    var count = 0;
    setInterval(() => {
      count = count > 0.5 ? 0 : count + 0.05;

      mixer.update(count);

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

//planet
var planet;

GLTFLoader.load(
  // resource URL
  "texture/planet/scene.gltf",
  // called when the resource is loaded
  function(gltf) {
    scene.add(gltf.scene);
    planet = gltf;

    // planet.scene.position.set(10, 0, 0);
    planet.scene.position.set(-500, 800, 10);
    planet.scene.scale.set(0.2, 0.2, 0.2);
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

//laugh
document.onclick = function() {
  document.querySelector("#audio").play();
};
setInterval(function() {
  document.querySelector("#laugh").play();
}, 20000);

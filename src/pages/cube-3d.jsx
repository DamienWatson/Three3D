import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const Cube3d = () => {
  const divRef = useRef();

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 0, 3);
  const renderer = new THREE.WebGLRenderer({ anitalias: true });
  const orbitControls = new OrbitControls(camera, renderer.domElement);
  
  const geometry = new THREE.BoxGeometry();
  // order to add materials: x+,x-,y+,y-,z+,z-
  var cubeMaterials = [
    new THREE.MeshStandardMaterial({ color: 0xff3333 }),
    new THREE.MeshStandardMaterial({ color: 0xff8800 }),
    new THREE.MeshStandardMaterial({ color: 0xffff33 }),
    new THREE.MeshStandardMaterial({ color: 0x33ff33 }),
    new THREE.MeshStandardMaterial({ color: 0x3333ff }),
    new THREE.MeshStandardMaterial({ color: 0x8833ff })
  ];
  const cube = new THREE.Mesh(geometry, cubeMaterials);
  scene.add(cube);

  // Lights
  const ambientLight = new THREE.AmbientLight(0xFFFFFF, 1);
  scene.add(ambientLight);

  const spotlight = new THREE.SpotLight(0xFFFFFF, 1000);
  spotlight.position.set(-5, 2, 6);
  scene.add(spotlight);

  // Animate
  const animate = (time) => {
    cube.rotation.x = time / 1000;
    cube.rotation.y = time / 1000;
    renderer.render(scene, camera);
  };

  useEffect(() => {
    const rect = document.documentElement.getBoundingClientRect(); // { width: 800, height: 800 };
    renderer.setSize(rect.width - 16, rect.height);
    divRef.current.appendChild(renderer.domElement);

    orbitControls.update();
    renderer.render(scene, camera);
    renderer.setAnimationLoop(animate);
  }, []);

  return (
    <div ref={divRef}></div>
  );
};

export default Cube3d;

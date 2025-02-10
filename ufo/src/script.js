import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import {Sky} from "three/addons/objects/Sky.js"
import gsap from 'gsap'
import { Timer } from 'three/addons/misc/Timer.js'
import GUI from 'lil-gui'

/**
 * Base
 */
// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

//Textures

const textureLoader = new THREE.TextureLoader()

const floorTexture = textureLoader.load('./floor/summer-background-sea-water.webp')

const ufoColorTexture = textureLoader.load('/ufo/Metals/Metal044A_1K-JPG_Color.jpg')
const ufoMetalnessTexture =  textureLoader.load('./ufo/Metals/Metal044A-JPG_Metalness.jpg')
const ufoRoughnessTexture =  textureLoader.load('./ufo/Metals/Metal044A-JPG_Roughness.jpg')

ufoColorTexture.colorSpace = THREE.SRGBColorSpace
/**
 * House
 */
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(40,40,100,100),
    new THREE.MeshStandardMaterial({
        map:floorTexture,
        transparent:true
    })
)
floor.rotation.x = - Math.PI * 0.5
scene.add(floor)

// gui.add(floor.material, 'displacementScale').min(0).max(1).step(0.001).name('floorDisplacementScale')
// gui.add(floor.material, 'displacementBias').min(-1).max(1).step(0.001).name('floordisplacementBias')

//TicTac

const capsule = new THREE.Mesh( 
    new THREE.CapsuleGeometry(1,2,20,40),
    new THREE.MeshStandardMaterial({
        color:"#ffffff",
        map:ufoColorTexture,
        roughnessMap: ufoRoughnessTexture,
        metalnessMap: ufoMetalnessTexture,
  
    })
 ); 
 console.log(THREE.MeshStandardMaterial)
 capsule.position.y = 2
 capsule.rotation.x = Math.PI * 0.5

scene.add( capsule )

//Orbs
const orb1 = new THREE.PointLight('#A6EDE3', 6)
const orb2 = new THREE.PointLight('#C9FCD4', 6)
const orb3 = new THREE.PointLight('#7BAF83', 6)
scene.add(orb1,orb2,orb3)

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#ffffff', 0.5)
scene.add(ambientLight)

// Directional light
const directionalLight = new THREE.DirectionalLight('#ffffff', 1.5)
directionalLight.position.set(3, 2, -8)
scene.add(directionalLight)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 4
camera.position.y = 2
camera.position.z = 5
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

const sky = new Sky();
sky.scale.set(100,100,100)
sky.material.uniforms['turbidity'].value = 10
sky.material.uniforms['rayleigh'].value = 3
sky.material.uniforms['mieCoefficient'].value = 0.1
sky.material.uniforms['mieDirectionalG'].value = 0.95
sky.material.uniforms['sunPosition'].value.set(0.3, -0.038, -0.95)

scene.add(sky)

//Fog
scene.fog = new THREE.FogExp2('#04343f', 0.1)

/**
 * Animate
 */
const tl = gsap.timeline({repeat: -1, repeatDelay: 1});
tl.to(capsule.position, {duration: 0.1, delay: 1, x: -2})
  .to(capsule.position, {duration: 0.1, delay: 1, y: 3})
  .to(capsule.position, {duration: 0.1, delay: 0.8, y: 1})
  .to(capsule.position, {duration: 0.1, delay: 0.5, z: 3})
  .to(capsule.position, {duration: 0.1, delay: 1, x: 3})
  .to(capsule.position, {duration: 0.1, delay: 0.5, x: -5, z: -20}) // Fly off screen
  .to(capsule.position, {duration: 0.1, delay: 0.5, opacity: 0}); // Disappear




const timer = new Timer()

const tick = () =>
{
    // Timer
    timer.update()
    const elapsedTime = timer.getElapsed()

    const orb1Angle = elapsedTime * 0.5
    orb1.position.x = Math.cos(orb1Angle) * 4
    orb1.position.z = Math.sin(orb1Angle) * 4
    orb1.position.y = Math.sin(orb1Angle) * Math.sin(orb1Angle * 2.34) * Math.sin(orb1Angle * 3.45)
    
    const orb2Angle = - elapsedTime * 0.38
    orb2.position.x = Math.cos(orb2Angle) * 4
    orb2.position.z = Math.sin(orb2Angle) * 4
    orb2.position.y = Math.sin(orb2Angle) * Math.sin(orb2Angle * 2.34) * Math.sin(orb2Angle * 3.45)
    
    const orb3Angle = elapsedTime * 0.23
    orb3.position.x = Math.cos(orb3Angle) * 6
    orb3.position.z = Math.sin(orb3Angle) * 6
    orb3.position.y = Math.sin(orb3Angle) * Math.sin(orb3Angle * 2.34) * Math.sin(orb3Angle * 3.45)

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
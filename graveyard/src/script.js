import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Timer } from 'three/addons/misc/Timer.js'
import GUI from 'lil-gui'

/**
 * Base
 */
// Debug
const gui = new GUI()
gui.close()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

//Textures
const textureLoader = new THREE.TextureLoader()

const floorAlphaTexture = textureLoader.load('./floor/alpha.jpg')
const floorColorTexture = textureLoader.load('./floor/coast_sand_rocks_02/coast_sand_rocks_02_diff_1k.jpg')
const floorARMTexture = textureLoader.load('./floor/coast_sand_rocks_02/coast_sand_rocks_02_arm_1k.jpg')
const floorNormalTexture = textureLoader.load('./floor/coast_sand_rocks_02/coast_sand_rocks_02_nor_gl_1k.jpg')
const floorDisplacementTexture = textureLoader.load('./floor/coast_sand_rocks_02/coast_sand_rocks_02_disp_1k.jpg')

floorColorTexture.repeat.set(8,8)
floorColorTexture.wrapS = THREE.RepeatWrapping
floorColorTexture.wrapT = THREE.RepeatWrapping
floorColorTexture.colorSpace = THREE.SRGBColorSpace

floorARMTexture.repeat.set(8,8)
floorARMTexture.wrapS = THREE.RepeatWrapping
floorARMTexture.wrapT = THREE.RepeatWrapping

floorNormalTexture.repeat.set(8,8)
floorNormalTexture.wrapS = THREE.RepeatWrapping
floorNormalTexture.wrapT = THREE.RepeatWrapping

floorDisplacementTexture.repeat.set(8,8)
floorDisplacementTexture.wrapS = THREE.RepeatWrapping
floorDisplacementTexture.wrapT = THREE.RepeatWrapping

const wallColorTexture = textureLoader.load('./walls/mossy_brick/mossy_brick_diff_1k.jpg')
const wallARMTexture = textureLoader.load('./walls//mossy_brick/mossy_brick_arm_1k.jpg')
const wallNormalTexture = textureLoader.load('./walls/mossy_brick/mossy_brick_nor_gl_1k.jpg')

wallColorTexture.colorSpace = THREE.SRGBColorSpace

const roofColorTexture = textureLoader.load('./roof/roof_slates/roof_slates_02_diff_1k.jpg')
const roofARMTexture = textureLoader.load('./roof/roof_slates/roof_slates_02_arm_1k.jpg')
const roofNormalTexture = textureLoader.load('./roof/roof_slates/roof_slates_02_nor_gl_1k.jpg')
const roofDisplacementTexture = textureLoader.load('./roof/roof_slates/roof_slates_02_disp_1k.jpg')

roofColorTexture.colorSpace = THREE.SRGBColorSpace
roofColorTexture.repeat.set(3,1)
roofColorTexture.wrapS = THREE.RepeatWrapping

roofARMTexture.repeat.set(3,1)
roofARMTexture.wrapS = THREE.RepeatWrapping

roofNormalTexture.repeat.set(3,1)
roofNormalTexture.wrapS = THREE.RepeatWrapping

const bushColorTexture = textureLoader.load('./bushes/forest_leaves/forest_leaves_03_diff_1k.jpg')
const bushARMTexture = textureLoader.load('./bushes/forest_leaves/forest_leaves_03_arm_1k.jpg')
const bushNormalTexture = textureLoader.load('./bushes/forest_leaves/forest_leaves_03_nor_gl_1k.jpg')
const bushDisplacementTexture = textureLoader.load('./bushes/forest_leaves/forest_leaves_03_disp_1k.jpg')

bushColorTexture.colorSpace = THREE.SRGBColorSpace
bushColorTexture.repeat.set(2,1)
bushColorTexture.wrapS = THREE.RepeatWrapping
bushColorTexture.wrapT = THREE.RepeatWrapping

bushARMTexture.repeat.set(2,1)
bushARMTexture.wrapS = THREE.RepeatWrapping

bushNormalTexture.repeat.set(2,1)
bushNormalTexture.wrapS = THREE.RepeatWrapping

/**
 * House
 */

//Floor
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20,20,100,100),
    new THREE.MeshStandardMaterial({
        alphaMap:floorAlphaTexture,
        transparent: true,
        map:floorColorTexture,
        aoMap : floorARMTexture,
        roughnessMap: floorARMTexture,
        metalnessMap: floorARMTexture,
        normalMap: floorNormalTexture,
        displacementMap: floorDisplacementTexture,
        displacementScale: 0.3,
        displacementBias: -0.2
    })
)
floor.rotation.x = - Math.PI * 0.5
scene.add(floor)

gui.add(floor.material, 'displacementScale').min(0).max(1).step(0.001).name('floorDisplacementScale')
gui.add(floor.material, 'displacementBias').min(-1).max(1).step(0.001).name('floordisplacementBias')




//House Container
const house = new THREE.Group()
scene.add(house)

//Walls
const walls = new THREE.Mesh(
    new THREE.BoxGeometry(4,2.5,4),
    new THREE.MeshStandardMaterial({
        map:wallColorTexture,
        aoMap: wallARMTexture,
        roughnessMap: wallARMTexture,
        metalnessMap:wallARMTexture,
        normalMap:wallNormalTexture
    })
)
walls.position.y +=1.25
house.add(walls)

//Roof
const roof = new THREE.Mesh(
    new THREE.ConeGeometry(3.5,1.5,4),
    new THREE.MeshStandardMaterial({
        map:roofColorTexture,
        aoMap:roofARMTexture,
        roughnessMap:roofARMTexture,
        metalnessMap:roofARMTexture,
        normalMap:roofNormalTexture,
       
    })
)
roof.position.y += 2.5 + 0.75
roof.rotation.y = Math.PI * 0.25
house.add(roof)

//Door
const door = new THREE.Mesh(
    new THREE.PlaneGeometry(2.2,2.2),
    new THREE.MeshStandardMaterial()
)
door.position.y = 1
door.position.z = 2 +0.001
house.add(door)

//Bushes
const bushGeometry = new THREE.SphereGeometry(1,16,16)
const bushMaterial = new THREE.MeshStandardMaterial({
    map:bushColorTexture,
    aoMap:bushARMTexture,
    roughnessMap:bushARMTexture,
    metalnessMap:bushARMTexture,
    normalMap:bushNormalTexture,

})

const bush1 = new THREE.Mesh(
    bushGeometry,
    bushMaterial
)
bush1.scale.set(0.5,0.5,0.5)
bush1.position.set(0.8,0.2,2.2)
bush1.rotation.x = -0.75


const bush2= new THREE.Mesh(
    bushGeometry,
    bushMaterial
)
bush2.scale.set(0.25,0.25,0.25)
bush2.position.set(1.4,0.1,2.1)
bush1.rotation.x = -0.75


const bush3= new THREE.Mesh(
    bushGeometry,
    bushMaterial
)
bush3.scale.set(0.4,0.4,0.4)
bush3.position.set(-0.8, 0.1,2.2)
bush1.rotation.x = -0.75


const bush4= new THREE.Mesh(
    bushGeometry,
    bushMaterial
)
bush4.scale.set(0.15,0.15,0.15)
bush4.position.set(-1,0.05,2.6)
bush1.rotation.x = -0.75

house.add(bush1,bush2,bush3,bush4)

//Graves
const graveGeometry = new THREE.BoxGeometry(0.6,0.8,0.2)
const graveMaterial = new THREE.MeshStandardMaterial()

const graves = new THREE.Group()
scene.add(graves)

for (let i = 0; i <30; i ++){

    const angle = Math.random() * Math.PI * 2
    const radius = 3 + Math.random() * 4
    const x = Math.sin(angle) * radius
    const z = Math.cos(angle) * radius

    const grave = new THREE.Mesh(graveGeometry, graveMaterial)
    grave.position.x = x
    grave.position.y = Math.random() * 0.4
    grave.position.z = z
    grave.rotation.x = (Math.random() - 0.5) * 0.4
    grave.rotation.y = (Math.random() - 0.5) * 0.4
    grave.rotation.z = (Math.random() - 0.5) * 0.4

    graves.add(grave)
}



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

/**
 * Animate
 */
const timer = new Timer()

const tick = () =>
{
    // Timer
    timer.update()
    const elapsedTime = timer.getElapsed()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
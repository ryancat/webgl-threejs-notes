const THREE = require('three')
const Stats = require('stats.js')

let scene = new THREE.Scene(),
    renderer = window.WebGLRenderingContext ? new THREE.WebGLRenderer() : new THREE.CanvasRenderer(),
    light = new THREE.AmbientLight(0xFFFFFF),
    camera,
    box,
    stats

const initScene = () => {
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.getElementById('webgl-container').appendChild(renderer.domElement)
  
  scene.add(light)
  

  camera = new THREE.PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  1,
  1000)
  
  camera.position.z = 100
  scene.add(camera)

  box = new THREE.Mesh(
    new THREE.SphereGeometry(15, 15, 15),
    new THREE.MeshBasicMaterial({
      color: 0xFF0000,
      wireframe: true
    }) 
  )
  
  box.name = 'box'
  scene.add(box)
  
  render()
}

const initStats = () => {
  stats = new Stats()
  stats.showPanel(0)
  document.body.appendChild(stats.dom)
}

const init = () => {
  initStats()
  initScene()
}

const render = () => {
  stats.begin()

  box.rotation.y += Math.PI / 100
  // box.position.z += 0.1
  
  renderer.render(scene, camera)

  stats.end()
  requestAnimationFrame(render)
}

window.onload = init

// For debugging
window.scene = scene
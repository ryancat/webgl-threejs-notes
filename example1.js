const THREE = require('three')
const Stats = require('stats.js')

let scene = new THREE.Scene(),
    renderer = window.WebGLRenderingContext ? new THREE.WebGLRenderer() : new THREE.CanvasRenderer(),
    light = new THREE.AmbientLight(0xFFFFFF),
    camera,
    box,
    stats,
    customTriangle

const initScene = () => {
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.getElementById('webgl-container').appendChild(renderer.domElement)
  
  scene.add(light)
  

  camera = new THREE.PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  1,
  1000)
  
  camera.position.z = 5
  scene.add(camera)

  // Create custom geometry
  const triangleGeometry = new THREE.Geometry()
  // Adding vertices
  triangleGeometry.vertices.push(new THREE.Vector3(0, 1, 0))
  triangleGeometry.vertices.push(new THREE.Vector3(-Math.pow(2, 0.5) / 2, 0, 0))
  triangleGeometry.vertices.push(new THREE.Vector3(Math.pow(2, 0.5) / 2, 0, 0))
  // Adding faces
  const face3 = new THREE.Face3(0, 1, 2)
  face3.vertexColors[0] = new THREE.Color(0xFF0000)
  face3.vertexColors[1] = new THREE.Color(0x00FF00)
  face3.vertexColors[2] = new THREE.Color(0x0000FF)
  triangleGeometry.faces.push(face3)

  // Create custom material
  const material = new THREE.MeshBasicMaterial({
    vertexColors: THREE.VertexColors,
    side: THREE.DoubleSide
  })

  customTriangle = new THREE.Mesh(triangleGeometry, material)

  // box = new THREE.Mesh(
  //   new THREE.SphereGeometry(15, 15, 15),
  //   new THREE.MeshBasicMaterial({
  //     color: 0xFF0000,
  //     wireframe: true
  //   }) 
  // )
  
  // box.name = 'box'
  scene.add(customTriangle)
  
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

  // box.rotation.y += Math.PI / 100
  // box.position.z += 0.1
  
  customTriangle.rotation.y += Math.PI / 100
  renderer.render(scene, camera)

  stats.end()
  requestAnimationFrame(render)
}

window.onload = init

// For debugging
window.scene = scene
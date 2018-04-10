const THREE = require('three')
const Stats = require('stats.js')

let scene = new THREE.Scene(),
    renderer = window.WebGLRenderingContext ? new THREE.WebGLRenderer() : new THREE.CanvasRenderer(),
    light = new THREE.AmbientLight(0xFFFFFF),
    camera,
    box,
    stats,
    customWave

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
  camera.position.y = 15
  camera.position.x = -15
  scene.add(camera)

  // Create custom geometry
  const planeGeometry = new THREE.Geometry()
  // Adding vertices
  const rowCount = 100
  const waveWidth = 40
  let row = 0
  while (row < rowCount) {
    planeGeometry.vertices.push(new THREE.Vector3(-waveWidth / 2, 0, row - rowCount / 2))
    planeGeometry.vertices.push(new THREE.Vector3(waveWidth / 2, 0, row - rowCount / 2))
    row++
  }
  // Adding faces
  row = 0
  while (row < rowCount) {
    let faceA = new THREE.Face3(row, row + 1, row + 2),
        faceB = new THREE.Face3(row + 1, row + 2, row + 3)

    planeGeometry.faces.push(faceA)
    planeGeometry.faces.push(faceB)

    // faceA.vertexColors[0] = new THREE.Color(0x0000FF)
    // faceA.vertexColors[1] = new THREE.Color(0x0000FF)
    // faceA.vertexColors[2] = new THREE.Color(0x0000FF)
    // faceB.vertexColors[0] = new THREE.Color(0x0000FF)
    // faceB.vertexColors[1] = new THREE.Color(0x0000FF)
    // faceB.vertexColors[2] = new THREE.Color(0x0000FF)
    row++
  }
  // face3.vertexColors[0] = new THREE.Color(0xFF0000)
  // face3.vertexColors[1] = new THREE.Color(0x00FF00)
  // face3.vertexColors[2] = new THREE.Color(0x0000FF)
  // planeGeometry.faces.push(face3)

  // Create custom material
  const material = new THREE.MeshBasicMaterial({
    vertexColors: THREE.VertexColors,
    side: THREE.DoubleSide,
    wireframe: true
  })

  customWave = new THREE.Mesh(planeGeometry, material)
  customWave.rotation.x = Math.PI / 4
  customWave.rotation.y = Math.PI / 4

  // box = new THREE.Mesh(
  //   new THREE.SphereGeometry(15, 15, 15),
  //   new THREE.MeshBasicMaterial({
  //     color: 0xFF0000,
  //     wireframe: true
  //   }) 
  // )
  
  // box.name = 'box'
  scene.add(customWave)

  const loader = new THREE.ObjectLoader()
  loader.load('./model.json', (object) => {
    console.log('geometry', object.geometry)
    const something = new THREE.Mesh(object.geometry, material)
    something.position.z = 60
    something.position.y = 10
    something.position.x = -15
    scene.add(something)
    render()
  })

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

/**
 * Move the wave forward
 */
let currentVertice = 0
let lastVertice = -1
const waveHeight = 5
const moveWave = () => {
  const geometry = customWave.geometry,
        vertices = geometry.vertices,
        faces = geometry.faces

  if (lastVertice >= 0) {
    vertices[lastVertice].y -= waveHeight
    vertices[lastVertice + 1].y -= waveHeight
  }

  vertices[currentVertice].y += waveHeight
  vertices[currentVertice + 1].y += waveHeight

  lastVertice = currentVertice
  currentVertice = (currentVertice) % (vertices.length / 2) + 2

  // Update color
  // TODO: how to update color?
  // faces[currentVertice].vertexColors[0] = new THREE.Color(0xFFFFFF)
  // faces[currentVertice].vertexColors[1] = new THREE.Color(0xFFFFFF)
  // faces[currentVertice].vertexColors[2] = new THREE.Color(0xFFFFFF)
  geometry.verticesNeedUpdate = true
  // geometry.colorsNeedUpdate = true
}

startTime = Date.now()
const render = () => {
  stats.begin()
  // box.rotation.y += Math.PI / 100
  // box.position.z += 0.1

  if (Date.now() - startTime > 30) {
    moveWave()
    startTime = Date.now()
  }

  renderer.render(scene, camera)

  stats.end()
  requestAnimationFrame(render)
}

window.onload = init

// For debugging
window.scene = scene
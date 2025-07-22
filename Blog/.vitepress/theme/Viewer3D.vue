<template>
  <div ref="container" class="viewer3d-container"></div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js'

const props = defineProps({
  modelUrl: { type: String, required: true },
  previewImg: { type: String, required: true }
})
const container = ref(null)
let viewerInstance = null

class Viewer {
  constructor(url, previewImg, container) {
    this.url = url
    this.container = container
    this.previewImg = previewImg
    this.container.innerHTML = ''
    this.preview = document.createElement('img')
    this.preview.src = this.previewImg
    this.preview.alt = 'Vista Previa'
    this.preview.className = 'viewer-preview'
    this.viewerStartBanner = document.createElement('div')
    this.viewerStartBanner.className = 'viewer-start-banner'
    this.startBanner = document.createElement('div')
    this.startBanner.className = 'startBanner'
    this.startBanner.innerText = 'Vista 3D'
    this.viewerStartBanner.appendChild(this.startBanner)
    this.previewWrapper = document.createElement('div')
    this.previewWrapper.className = 'viewer-preview-wrapper'
    this.previewWrapper.appendChild(this.preview)
    this.previewWrapper.appendChild(this.viewerStartBanner)
    this.container.appendChild(this.previewWrapper)
    this.loadProgress = document.createElement('div')
    this.loadProgress.className = 'loadProgress viewer-load-progress'
    this.loadProgressP = document.createElement('p')
    this.loadProgressP.innerText = 'Cargando...'
    this.loadProgress.appendChild(this.loadProgressP)
    this.container.appendChild(this.loadProgress)
    this.startBanner.addEventListener('click', () => this.startViewer())
    this.preview.addEventListener('click', () => this.startViewer())
  }
  startViewer() {
    this.previewWrapper.style.display = 'none'
    this.loadProgress.style.display = 'flex'
    this.canvas = document.createElement('div')
    this.canvas.className = 'viewer-canvas'
    this.container.appendChild(this.canvas)
    this.unloadBtn = document.createElement('button')
    this.unloadBtn.className = 'viewer-unload-btn'
    this.unloadBtn.innerText = '×'
    this.unloadBtn.title = 'Cerrar Modelo'
    this.unloadBtn.addEventListener('click', () => this.resetViewer())
    this.canvas.appendChild(this.unloadBtn)
    this.fullscreenBtn = document.createElement('button')
    this.fullscreenBtn.className = 'viewer-fullscreen-btn'
    this.fullscreenBtn.innerText = '⛶'
    this.fullscreenBtn.title = 'Pantalla Completa'
    this.fullscreenBtn.addEventListener('click', () => this.toggleFullscreen())
    this.canvas.appendChild(this.fullscreenBtn)
    this._abortController = null
    this.initThree()
    this.loadModel()
  }
  toggleFullscreen() {
    if (!document.fullscreenElement) {
      if (this.container.requestFullscreen) {
        this.container.requestFullscreen()
      } else if (this.container.webkitRequestFullscreen) {
        this.container.webkitRequestFullscreen()
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen()
      }
    }
  }
  resetViewer() {
    // Exit fullscreen if active
    if (document.fullscreenElement === this.container) {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen()
      }
    }
    if (this._abortController) {
      this._abortController.abort()
      this._abortController = null
    }
    if (this.canvas && this.canvas.parentNode) {
      this.canvas.parentNode.removeChild(this.canvas)
    }
    window.removeEventListener('resize', this.resizeBind, false)
    if (this.renderer) {
      this.renderer.dispose && this.renderer.dispose()
      this.renderer.forceContextLoss && this.renderer.forceContextLoss()
    }
    this.scene = null
    this.camera = null
    this.renderer = null
    this.controls = null
    this.content = null
    this.previewWrapper.style.display = ''
    this.loadProgress.style.display = 'none'
  }
  initThree() {
    this.backgroundColor = new THREE.Color('#222222')
    this.scene = new THREE.Scene()
    this.scene.background = this.backgroundColor
    const width = this.container.clientWidth
    const height = this.container.clientHeight
    const aspect = width / height
    this.camera = new THREE.PerspectiveCamera(15, aspect, 0.1, 2000)
    this.camera.position.set(0, 0, 10)
    this.scene.add(this.camera)
    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setSize(width, height)
    this.canvas.appendChild(this.renderer.domElement)
    const pmremGenerator = new THREE.PMREMGenerator(this.renderer)
    this.scene.environment = pmremGenerator.fromScene(new RoomEnvironment()).texture
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.screenSpacePanning = true
    this.resizeBind = this.resize.bind(this)
    window.addEventListener('resize', this.resizeBind, false)
    this.animate = this.animate.bind(this)
    requestAnimationFrame(this.animate)
  }
  animate() {
    requestAnimationFrame(this.animate)
    if (this.controls) this.controls.update()
    if (this.renderer && this.scene && this.camera)
      this.renderer.render(this.scene, this.camera)
  }
  resize() {
    if (!this.canvas || !this.camera || !this.renderer) return
    const width = this.container.clientWidth
    const height = this.container.clientHeight
    this.camera.aspect = width / height
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(width, height)
  }
  loadModel() {
    let controller = null
    if (window.AbortController) {
      controller = new AbortController()
      this._abortController = controller
    }
    const loader = new GLTFLoader()
    if (controller) {
      loader.manager.setURLModifier((url) => {
        return new Request(url, { signal: controller.signal })
      })
    }
    loader.load(
      this.url,
      (gltf) => {
        this._abortController = null
        const scene = gltf.scene || gltf.scenes[0]
        if (!scene) {
          throw new Error('Error al cargar la escena')
        }
        this.backgroundColor.setHex(0x232425)
        this.loadProgress.style.display = 'none'
        this.setContent(scene)
      },
      (l) => {
        this.backgroundColor.setHex(0x111111)
        this.loadProgressP.innerHTML = `${(l.loaded * 100 / l.total).toFixed(1)}%`
        this.loadProgress.style.display = 'flex'
      },
      (e) => {
        if (controller && controller.signal.aborted) {
          this.loadProgressP.innerHTML = 'Carga abortada'
        } else {
          console.error('Error Cargando Modelo:', e)
          this.loadProgressP.innerHTML = 'Error'
        }
        this.loadProgress.style.display = 'flex'
        setTimeout(() => this.resetViewer(), 2000)
        this._abortController = null
      }
    )
  }
  setContent(object) {
    this.clear()
    object.updateMatrixWorld()
    const box = new THREE.Box3().setFromObject(object)
    const size = box.getSize(new THREE.Vector3()).length()
    const center = box.getCenter(new THREE.Vector3())
    object.position.x -= center.x
    object.position.y -= center.y
    object.position.z -= center.z
    this.controls.reset()
    this.controls.maxDistance = size * 5
    this.camera.near = size / 100
    this.camera.far = size * 100
    this.camera.updateProjectionMatrix()
    this.camera.position.copy(center)
    this.camera.position.x += size
    this.camera.position.y += size
    this.camera.position.z += size
    this.camera.lookAt(center)
    this.scene.add(object)
    this.content = object
  }
  clear() {
    if (!this.content) return
    this.scene.remove(this.content)
    this.content.traverse(function(node) {
      if (!node.geometry) return
      node.geometry.dispose()
    })
  }
}

onMounted(() => {
  viewerInstance = new Viewer(props.modelUrl, props.previewImg, container.value)
})

onBeforeUnmount(() => {
  if (viewerInstance && typeof viewerInstance.resetViewer === 'function') {
    viewerInstance.resetViewer()
  }
  viewerInstance = null
})
</script>

<style>
.viewer3d-container {
  width: 100%;
  height: 400px;
  position: relative;
  overflow: hidden;
}
/* Preview image */
.viewer-preview {
    width: 100%;
    display: block;
    cursor: pointer;
}

.viewer-preview {
  opacity: .5;
}

/* Preview wrapper */
.viewer-preview-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
}

.viewer-preview-wrapper img {
  border:none !important;
}

.viewer-start-banner {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  top: 0;
  left: 0;
}

/* Start banner */
.startBanner {
    background: #222e;
    color: #fff;
    padding: 1em 2em;
    border-radius: 8px;
    font-size: 1.2em;
    cursor: pointer;
}

/* Load progress banner */
.viewer-load-progress {
    display: none;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #222;
    color: #fff;
    padding: 1em 2em;
    border-radius: 8px;
    font-size: 1.2em;
    z-index:1002;
}

/* Canvas container */
.viewer-canvas {
    width: 100%;
    height: 100%;
    position: relative;
}

/* Unload button */
.viewer-unload-btn {
    position: absolute;
    top: 12px;
    right: 12px;
    /* z-index: 1001; */
    background: #111;
    color: #fff;
    border: none;
    border-radius: 50%;
    width: 32px;
    height: 32px;
    font-size: 1.5em;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: ease 0.2s;
}

.viewer-unload-btn:hover {
    background: #333e;
}

/* Fullscreen button */
.viewer-fullscreen-btn {
    position: absolute;
    top: 12px;
    right: 60px;
    /* z-index: 1001; */
    background: #111;
    color: #fff;
    border: none;
    border-radius: 50%;
    width: 32px;
    height: 32px;
    font-size: 1.5em;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: ease 0.2s;
}

.viewer-fullscreen-btn:hover {
    background: #333e;
}
</style>

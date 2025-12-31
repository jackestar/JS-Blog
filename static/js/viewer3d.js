// Vanilla JS 3D viewer using three.js from CDN
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.155.0/build/three.module.js'
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.155.0/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.155.0/examples/jsm/controls/OrbitControls.js'
import { RoomEnvironment } from 'https://cdn.jsdelivr.net/npm/three@0.155.0/examples/jsm/environments/RoomEnvironment.js'

const bg_color = getComputedStyle(document.documentElement).getPropertyValue('--bg-color').trim() || '#0a0b10';
const card_bg = getComputedStyle(document.documentElement).getPropertyValue('--card-bg').trim() || '#14161f';


class Viewer3D {
    constructor(containerEl) {
        this.container = containerEl
        this.url = containerEl.dataset.modelUrl || ''
        this.previewImg = containerEl.dataset.preview || ''
        this._abortController = null
        this._setupPreview()
    }

    _setupPreview() {
        this.container.classList.add('viewer3d-container')
        this.container.innerHTML = ''
        this.previewWrapper = document.createElement('div')
        this.previewWrapper.className = 'viewer-preview-wrapper'
        this.preview = document.createElement('img')
        this.preview.className = 'viewer-preview'
        if (this.previewImg) this.preview.src = this.previewImg
        else this.preview.style.background = bg_color
        this.preview.alt = 'Preview'
        this.previewWrapper.appendChild(this.preview)

        this.viewerStartBanner = document.createElement('div')
        this.viewerStartBanner.className = 'viewer-start-banner'
        this.startBanner = document.createElement('div')
        this.startBanner.className = 'startBanner'
        this.startBanner.setAttribute('role', 'button')
        this.startBanner.setAttribute('tabindex', '0')
        this.startBanner.setAttribute('aria-label', this.url ? 'Abrir vista 3D' : 'Sin modelo 3D')
        // Inline cube SVG (from cube.svg) — uses currentColor for easy tinting
        this.startBanner.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
        <path stroke="none" d="M 0,0 H 24 V 24 H 0 Z" fill="none" />

        <path class="cube-outer" d="M 21,16.008 V 7.99 A 1.98,1.98 0 0 0 20,6.273 L 13,2.265 a 2.016,2.016 0 0 0 -2,0 L 4,6.273 C 3.381,6.628 3,7.283 3,7.991 v 8.018 c 0,0.709 0.381,1.363 1,1.717 l 7,4.008 a 2.016,2.016 0 0 0 2,0 l 7,-4.008 c 0.619,-0.355 1,-1.01 1,-1.718 z" />

        <g class="cube-inner">
            <path class="inner-line line-bottom" d="M 12,22 V 17" />
            <path class="inner-line line-right" d="M 16.65913,9.3049675 20.73,6.96" />
            <path class="inner-line line-left" d="M 3.27,6.96 6.878365,9.0432905" />
        </g>
    <path class="cube-play" d="m 10,9 5,3 -5,3 z" />
  </svg>
    `
        this.viewerStartBanner.appendChild(this.startBanner)
        this.previewWrapper.appendChild(this.viewerStartBanner)
        this.container.appendChild(this.previewWrapper)

        this.loadProgress = document.createElement('div')
        this.loadProgress.className = 'loadProgress'
        this.loadProgressP = document.createElement('p')
        this.loadProgressP.style.margin = '0'
        this.loadProgressP.innerText = 'Cargando...'
        this.loadProgress.appendChild(this.loadProgressP)
        this.container.appendChild(this.loadProgress)

        this.startBanner.addEventListener('click', () => this.startViewer())
        this.startBanner.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this.startViewer() } })
        this.preview.addEventListener('click', () => this.startViewer())
    }

    startViewer() {
        if (!this.url) {
            this.loadProgressP.innerText = 'No 3D model'
            this.loadProgress.style.display = 'flex'
            setTimeout(() => { this.loadProgress.style.display = 'none' }, 1200)
            return
        }
        this.previewWrapper.style.display = 'none'
        this.loadProgress.style.display = 'flex'

        this.canvasWrap = document.createElement('div')
        this.canvasWrap.className = 'viewer-canvas'
        this.container.appendChild(this.canvasWrap)

        this.unloadBtn = document.createElement('button')
        this.unloadBtn.className = 'viewer-unload-btn'
        this.unloadBtn.title = 'Cerrar Modelo'
        this.unloadBtn.innerText = '×'
        this.unloadBtn.addEventListener('click', () => this.resetViewer())
        this.canvasWrap.appendChild(this.unloadBtn)

        this.fullscreenBtn = document.createElement('button')
        this.fullscreenBtn.className = 'viewer-fullscreen-btn'
        this.fullscreenBtn.title = 'Pantalla Completa'
        this.fullscreenBtn.innerText = '⛶'
        this.fullscreenBtn.addEventListener('click', () => this.toggleFullscreen())
        this.canvasWrap.appendChild(this.fullscreenBtn)

        this.initThree()
        this.loadModel()
    }

    toggleFullscreen() {
        if (!document.fullscreenElement) {
            if (this.container.requestFullscreen) this.container.requestFullscreen()
            else if (this.container.webkitRequestFullscreen) this.container.webkitRequestFullscreen()
            else if (this.container.mozRequestFullScreen) this.container.mozRequestFullScreen()
        } else {
            if (document.exitFullscreen) document.exitFullscreen()
            else if (document.webkitExitFullscreen) document.webkitExitFullscreen()
            else if (document.mozCancelFullScreen) document.mozCancelFullScreen()
        }
    }

    resetViewer() {
        if (document.fullscreenElement === this.container) {
            if (document.exitFullscreen) document.exitFullscreen()
        }
        if (this._abortController) { this._abortController.abort(); this._abortController = null }
        if (this.canvasWrap && this.canvasWrap.parentNode) this.canvasWrap.parentNode.removeChild(this.canvasWrap)
        window.removeEventListener('resize', this.resizeBind, false)
        document.removeEventListener('fullscreenchange', this.fullscreenChangeBind, false)
        document.removeEventListener('webkitfullscreenchange', this.fullscreenChangeBind, false)
        document.removeEventListener('mozfullscreenchange', this.fullscreenChangeBind, false)
        if (this.renderer) {
            this.renderer.dispose && this.renderer.dispose()
            this.renderer.forceContextLoss && this.renderer.forceContextLoss()
        }
        this.scene = this.camera = this.renderer = this.controls = this.content = null
        this.previewWrapper.style.display = ''
        this.loadProgress.style.display = 'none'
    }

    initThree() {
        this.backgroundColor = new THREE.Color(bg_color)
        this.scene = new THREE.Scene()
        this.scene.background = this.backgroundColor
        const width = this.container.clientWidth
        const height = this.container.clientHeight
        this.camera = new THREE.PerspectiveCamera(15, width / height, 0.1, 2000)
        this.camera.position.set(0, 0, 10)
        this.scene.add(this.camera)
        this.renderer = new THREE.WebGLRenderer({ antialias: true })
        this.renderer.setPixelRatio(window.devicePixelRatio)
        this.renderer.setSize(width, height)
        this.canvasWrap.appendChild(this.renderer.domElement)
        const pmremGenerator = new THREE.PMREMGenerator(this.renderer)
        this.scene.environment = pmremGenerator.fromScene(new RoomEnvironment()).texture
        this.controls = new OrbitControls(this.camera, this.renderer.domElement)
        this.controls.screenSpacePanning = true
        this.resizeBind = this.resize.bind(this)
        this.fullscreenChangeBind = this.fullscreenChange.bind(this)
        window.addEventListener('resize', this.resizeBind, false)
        document.addEventListener('fullscreenchange', this.fullscreenChangeBind, false)
        document.addEventListener('webkitfullscreenchange', this.fullscreenChangeBind, false)
        document.addEventListener('mozfullscreenchange', this.fullscreenChangeBind, false)
        this.animate = this.animate.bind(this)
        requestAnimationFrame(this.animate)
    }

    fullscreenChange() {
        requestAnimationFrame(() => this.resize())
    }

    animate() {
        requestAnimationFrame(this.animate)
        if (this.controls) this.controls.update()
        if (this.renderer && this.scene && this.camera) this.renderer.render(this.scene, this.camera)
    }

    resize() {
        if (!this.canvasWrap || !this.camera || !this.renderer) return
        const fsEl = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || null
        const target = (fsEl === this.container) ? fsEl : this.container
        const width = target.clientWidth
        const height = target.clientHeight
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
            try { loader.manager.setURLModifier((url) => { return new Request(url, { signal: controller.signal }) }) } catch (e) { /* ignore */ }
        }
        loader.load(this.url,
            (gltf) => {
                this._abortController = null
                const scene = gltf.scene || (gltf.scenes && gltf.scenes[0])
                if (!scene) {
                    this.loadProgressP.innerText = 'Escena vacía'
                    setTimeout(() => this.resetViewer(), 1500)
                    return
                }
                this.backgroundColor.setHex(0x232425)
                this.loadProgress.style.display = 'none'
                this.setContent(scene)
            },
            (xhr) => {
                if (xhr && xhr.total) this.loadProgressP.innerHTML = `${(xhr.loaded * 100 / xhr.total).toFixed(1)}%`
                this.loadProgress.style.display = 'flex'
            },
            (err) => {
                if (controller && controller.signal.aborted) this.loadProgressP.innerHTML = 'Carga abortada'
                else { console.error('Error cargando', err); this.loadProgressP.innerHTML = 'Error' }
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
        this.camera.near = Math.max(size / 100, 0.01)
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
        this.content.traverse(node => {
            if (!node.geometry) return
            node.geometry.dispose()
        })
    }
}

// Auto-initialize viewers for elements with class `viewer3d`
const initAll = () => {
    const els = document.querySelectorAll('.viewer3d')
    els.forEach(el => {
        // attach instance to element for possible future cleanup
        if (!el.__viewer3d) el.__viewer3d = new Viewer3D(el)
    })
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initAll)
else initAll()

export { Viewer3D }

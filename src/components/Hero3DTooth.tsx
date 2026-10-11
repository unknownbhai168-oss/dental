import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Sparkles, Eye, Palette, RotateCw } from 'lucide-react';

interface Hero3DToothProps {
  currentShade?: string;
  onShadeChange?: (shade: string) => void;
  interactiveMode?: 'beauty' | 'anatomy' | 'shade';
}

/**
 * Procedural Anatomical Molar Tooth Geometry Generator
 * Generates an accurate 4-cusped molar crown with cervical constriction
 * and bifurcated anatomical roots.
 */
function createAnatomicalToothGeometry(): THREE.BufferGeometry {
  const geom = new THREE.BufferGeometry();
  const vertices: number[] = [];
  const indices: number[] = [];
  const uvs: number[] = [];

  // Slices along Y: from crown top (Y = 1.6) down to root apex (Y = -2.2)
  const crownSlices = 28;
  const radialSegments = 36;
  const rootSlices = 24;

  // 1. Generate Crown Mesh (from top of cusps down to cervical margin Y = 0)
  for (let s = 0; s <= crownSlices; s++) {
    const v = s / crownSlices;
    const y = 1.5 - v * 1.5; // 1.5 down to 0.0

    // Radial pinch: widest near upper third, narrowing at cervix
    const neckFactor = 0.85 + 0.35 * Math.sin(v * Math.PI * 0.9);

    for (let r = 0; r <= radialSegments; r++) {
      const u = r / radialSegments;
      const angle = u * Math.PI * 2;

      // 4-cusp modulation (mesiobuccal, distobuccal, mesiolingual, distolingual)
      const cusp4 = 0.18 * Math.cos(4 * angle) * Math.max(0, 1 - v * 1.8);
      const groove = -0.12 * Math.cos(2 * angle) * Math.max(0, 0.8 - v * 2.0);

      // Occlusal table rounding
      let radius = (1.05 + cusp4 + groove) * neckFactor;

      let px = Math.cos(angle) * radius;
      let pz = Math.sin(angle) * (radius * 0.95); // slight oval
      let py = y;

      // Sculpt top cusps & central pit
      if (v < 0.25) {
        const cuspElevation = 0.22 * Math.sin(4 * angle) * (1 - v / 0.25);
        const centralFossa = -0.28 * Math.cos(2 * angle) * Math.sin(2 * angle) * (1 - v / 0.25);
        py += cuspElevation + centralFossa;
      }

      vertices.push(px, py, pz);
      uvs.push(u, v * 0.4);
    }
  }

  // Indices for crown body
  for (let s = 0; s < crownSlices; s++) {
    for (let r = 0; r < radialSegments; r++) {
      const a = s * (radialSegments + 1) + r;
      const b = (s + 1) * (radialSegments + 1) + r;
      const c = (s + 1) * (radialSegments + 1) + (r + 1);
      const d = s * (radialSegments + 1) + (r + 1);

      indices.push(a, b, d);
      indices.push(b, c, d);
    }
  }

  // 2. Generate Bifurcated Dual Roots (Y = 0 down to Y = -2.2)
  // We generate two distinct root cones: Buccal/Mesial Root and Lingual/Distal Root
  const rootRadialSegs = 18;
  const rootOffsets = [
    { x: -0.42, z: 0.0, curveX: -0.15 },
    { x: 0.42, z: 0.0, curveX: 0.15 },
  ];

  rootOffsets.forEach((root) => {
    const rootStartIndex = vertices.length / 3;

    for (let s = 0; s <= rootSlices; s++) {
      const v = s / rootSlices;
      const y = -v * 2.0; // 0 down to -2.0

      // Root tapers from cervix diameter down to apex
      const rootRadius = (0.52 * (1 - v * 0.82)) * (1 + 0.1 * Math.sin(v * Math.PI));

      // Organic curvature towards apex
      const shiftX = root.x + root.curveX * Math.sin(v * Math.PI * 0.8);
      const shiftZ = root.z + 0.08 * Math.sin(v * Math.PI);

      for (let r = 0; r <= rootRadialSegs; r++) {
        const u = r / rootRadialSegs;
        const angle = u * Math.PI * 2;

        const px = shiftX + Math.cos(angle) * rootRadius;
        const pz = shiftZ + Math.sin(angle) * (rootRadius * 0.85);
        const py = y;

        vertices.push(px, py, pz);
        uvs.push(u, 0.4 + v * 0.6);
      }
    }

    for (let s = 0; s < rootSlices; s++) {
      for (let r = 0; r < rootRadialSegs; r++) {
        const a = rootStartIndex + s * (rootRadialSegs + 1) + r;
        const b = rootStartIndex + (s + 1) * (rootRadialSegs + 1) + r;
        const c = rootStartIndex + (s + 1) * (rootRadialSegs + 1) + (r + 1);
        const d = rootStartIndex + s * (rootRadialSegs + 1) + (r + 1);

        indices.push(a, b, d);
        indices.push(b, c, d);
      }
    }
  });

  geom.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  geom.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geom.setIndex(indices);
  geom.computeVertexNormals();
  return geom;
}

export const Hero3DTooth: React.FC<Hero3DToothProps> = ({
  currentShade = '#FFFFFF',
  onShadeChange,
  interactiveMode = 'beauty',
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [webGlAvailable, setWebGlAvailable] = useState<boolean>(true);
  const [activeMode, setActiveMode] = useState<'beauty' | 'anatomy' | 'shade'>(interactiveMode);
  const [selectedToothShade, setSelectedToothShade] = useState<string>(currentShade);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const toothMaterialRef = useRef<THREE.MeshPhysicalMaterial | null>(null);
  const toothGroupRef = useRef<THREE.Group | null>(null);
  const targetRotationRef = useRef<{ x: number; y: number }>({ x: 0.1, y: 0.2 });

  useEffect(() => {
    setActiveMode(interactiveMode);
  }, [interactiveMode]);

  useEffect(() => {
    if (toothMaterialRef.current) {
      toothMaterialRef.current.color.set(selectedToothShade);
    }
  }, [selectedToothShade]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // WebGL support check
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      if (!gl) {
        setWebGlAvailable(false);
        return;
      }
    } catch {
      setWebGlAvailable(false);
      return;
    }

    const width = container.clientWidth || 580;
    const height = container.clientHeight || 580;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0.3, 7.8);

    // 2. Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // 3. Lighting Setup: Three-Point Studio + Aqua Clinical Accents
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.4);
    keyLight.position.set(5, 8, 6);
    scene.add(keyLight);

    const fillAquaLight = new THREE.DirectionalLight(0x54d6d0, 2.0);
    fillAquaLight.position.set(-6, -2, 4);
    scene.add(fillAquaLight);

    const rimTealLight = new THREE.DirectionalLight(0x087f8c, 2.5);
    rimTealLight.position.set(0, 6, -6);
    scene.add(rimTealLight);

    // Soft point light reflecting off enamel
    const pointLight = new THREE.PointLight(0xdcefff, 2.0, 10);
    pointLight.position.set(2, 3, 4);
    scene.add(pointLight);

    // 4. Geometry and Main Molar Tooth Mesh
    const toothGeom = createAnatomicalToothGeometry();

    const toothMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(selectedToothShade),
      roughness: 0.12,
      metalness: 0.05,
      clearcoat: 0.95,
      clearcoatRoughness: 0.08,
      reflectivity: 0.92,
      sheen: 0.65,
      sheenColor: new THREE.Color(0x54d6d0),
      transmission: 0.08,
      ior: 1.58,
    });
    toothMaterialRef.current = toothMat;

    const mainTooth = new THREE.Mesh(toothGeom, toothMat);
    mainTooth.scale.set(1.4, 1.4, 1.4);
    mainTooth.position.set(0, 0.3, 0);

    const mainGroup = new THREE.Group();
    mainGroup.add(mainTooth);
    scene.add(mainGroup);
    toothGroupRef.current = mainGroup;

    // 5. Contact Shadow Plane
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 128;
    shadowCanvas.height = 128;
    const sCtx = shadowCanvas.getContext('2d');
    if (sCtx) {
      const grad = sCtx.createRadialGradient(64, 64, 10, 64, 64, 60);
      grad.addColorStop(0, 'rgba(8, 127, 140, 0.35)');
      grad.addColorStop(0.5, 'rgba(84, 214, 208, 0.15)');
      grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      sCtx.fillStyle = grad;
      sCtx.fillRect(0, 0, 128, 128);
    }
    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const shadowPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(3.6, 3.6),
      new THREE.MeshBasicMaterial({
        map: shadowTex,
        transparent: true,
        opacity: 0.8,
        depthWrite: false,
      })
    );
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -2.4;
    scene.add(shadowPlane);

    // 6. Floating Background Miniature Teeth
    const miniTeethGroup = new THREE.Group();
    const miniToothGeom = toothGeom.clone();
    const miniToothMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      roughness: 0.2,
      clearcoat: 0.8,
      transmission: 0.15,
      opacity: 0.75,
      transparent: true,
    });

    const miniTeethData = [
      { pos: [-3.0, 1.6, -3.2], scale: 0.38, rotSpeed: 0.008, phase: 0 },
      { pos: [3.2, 1.9, -3.5], scale: 0.42, rotSpeed: -0.006, phase: 1.5 },
      { pos: [-2.4, -1.8, -2.5], scale: 0.32, rotSpeed: 0.005, phase: 3.1 },
      { pos: [2.6, -1.6, -2.8], scale: 0.35, rotSpeed: -0.007, phase: 4.2 },
    ];

    const miniMeshes: THREE.Mesh[] = [];
    miniTeethData.forEach((item) => {
      const m = new THREE.Mesh(miniToothGeom, miniToothMat);
      m.position.set(item.pos[0], item.pos[1], item.pos[2]);
      m.scale.set(item.scale, item.scale, item.scale);
      miniMeshes.push(m);
      miniTeethGroup.add(m);
    });
    scene.add(miniTeethGroup);

    // 7. Sparkling Enamel Particles
    const particleCount = 75;
    const pGeom = new THREE.BufferGeometry();
    const pPositions = new Float32Array(particleCount * 3);
    const pScales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const r = 1.8 + Math.random() * 2.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;

      pPositions[i * 3] = r * Math.cos(theta) * Math.cos(phi);
      pPositions[i * 3 + 1] = r * Math.sin(phi) + 0.2;
      pPositions[i * 3 + 2] = r * Math.sin(theta) * Math.cos(phi);
      pScales[i] = 0.5 + Math.random() * 1.5;
    }
    pGeom.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));

    // Particle sprite
    const pCanvas = document.createElement('canvas');
    pCanvas.width = 32;
    pCanvas.height = 32;
    const pCtx = pCanvas.getContext('2d');
    if (pCtx) {
      const pGrad = pCtx.createRadialGradient(16, 16, 2, 16, 16, 15);
      pGrad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      pGrad.addColorStop(0.4, 'rgba(84, 214, 208, 0.8)');
      pGrad.addColorStop(1, 'rgba(8, 127, 140, 0)');
      pCtx.fillStyle = pGrad;
      pCtx.fillRect(0, 0, 32, 32);
    }
    const pTexture = new THREE.CanvasTexture(pCanvas);
    const pMat = new THREE.PointsMaterial({
      size: 0.18,
      map: pTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const particles = new THREE.Points(pGeom, pMat);
    scene.add(particles);

    // 8. Interaction & Mouse Parallax
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const handlePointerDown = (e: PointerEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const mouseRelX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const mouseRelY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      if (isDragging) {
        const deltaX = e.clientX - prevMouseX;
        const deltaY = e.clientY - prevMouseY;
        targetRotationRef.current.y += deltaX * 0.008;
        targetRotationRef.current.x += deltaY * 0.008;
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;
      } else {
        // Parallax drift
        targetRotationRef.current.y += mouseRelX * 0.0015;
        targetRotationRef.current.x = THREE.MathUtils.clamp(
          targetRotationRef.current.x - mouseRelY * 0.001,
          -0.5,
          0.6
        );
      }
    };

    const handlePointerUp = () => {
      isDragging = false;
    };

    container.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    // 9. Resize Observer
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // 10. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth Bobbing
      const bobbing = Math.sin(elapsed * 1.4) * 0.12;
      mainTooth.position.y = 0.3 + bobbing;

      // Shadow breathes with tooth height
      const shadowScale = 1.0 - bobbing * 0.4;
      shadowPlane.scale.set(shadowScale, shadowScale, shadowScale);

      // Continuous gentle rotation + lerped mouse interaction
      targetRotationRef.current.y += 0.0035;

      mainGroup.rotation.x = THREE.MathUtils.lerp(
        mainGroup.rotation.x,
        targetRotationRef.current.x,
        0.05
      );
      mainGroup.rotation.y = THREE.MathUtils.lerp(
        mainGroup.rotation.y,
        targetRotationRef.current.y,
        0.05
      );

      // Mini teeth drifting and slow counter-rotation
      miniMeshes.forEach((mesh, idx) => {
        const item = miniTeethData[idx];
        mesh.rotation.y += item.rotSpeed;
        mesh.rotation.x = Math.sin(elapsed * 0.8 + item.phase) * 0.2;
        mesh.position.y = item.pos[1] + Math.sin(elapsed * 1.2 + item.phase) * 0.15;
      });

      // Sparkling particles slow orbital drift
      particles.rotation.y = elapsed * 0.08;
      particles.rotation.x = Math.sin(elapsed * 0.05) * 0.1;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);

      renderer.dispose();
      toothGeom.dispose();
      miniToothGeom.dispose();
      toothMat.dispose();
      miniToothMat.dispose();
      pGeom.dispose();
      pMat.dispose();
      shadowTex.dispose();
      pTexture.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  const handleResetRotation = () => {
    targetRotationRef.current = { x: 0.1, y: 0.2 };
  };

  const handleShadeSelect = (colorHex: string) => {
    setSelectedToothShade(colorHex);
    if (onShadeChange) onShadeChange(colorHex);
  };

  return (
    <div
      className="relative w-full h-[460px] md:h-[540px] lg:h-[600px] flex items-center justify-center select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Dynamic Background Glow Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-[#54D6D0]/20 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2 animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#087F8C]/15 rounded-full blur-3xl transform translate-x-1/4 translate-y-1/4" />
        <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-[#DDF8F0]/30 rounded-full blur-2xl" />
      </div>

      {/* 3D Canvas Mounting Container or WebGL Fallback */}
      {webGlAvailable ? (
        <div
          ref={mountRef}
          className="relative w-full h-full cursor-grab active:cursor-grabbing flex items-center justify-center"
          title="Drag to rotate and inspect the 3D anatomical tooth"
        />
      ) : (
        /* Polished SVG/CSS Vector Fallback if WebGL unavailable */
        <div className="relative w-full h-full flex flex-col items-center justify-center p-8 text-center">
          <div className="relative w-48 h-56 flex items-center justify-center animate-bounce duration-1000">
            <svg
              viewBox="0 0 100 120"
              className="w-full h-full filter drop-shadow-[0_20px_25px_rgba(8,127,140,0.25)]"
            >
              <path
                d="M 22 25 C 22 10, 48 8, 50 18 C 52 8, 78 10, 78 25 C 80 48, 86 65, 75 105 C 70 115, 62 110, 58 92 C 55 80, 52 75, 50 75 C 48 75, 45 80, 42 92 C 38 110, 30 115, 25 105 C 14 65, 20 48, 22 25 Z"
                fill="url(#toothGrad)"
                stroke="#54D6D0"
                strokeWidth="1.5"
              />
              <defs>
                <linearGradient id="toothGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="60%" stopColor="#F0FDFC" />
                  <stop offset="100%" stopColor="#DDF8F0" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <p className="text-xs text-[#087F8C] font-medium mt-3">High-Definition Enamel Visual Model</p>
        </div>
      )}

      {/* Interactive 3D HUD Controls Pill */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 p-1 bg-white/80 backdrop-blur-md rounded-xl border border-[#087F8C]/15 shadow-sm">
        <button
          onClick={() => setActiveMode('beauty')}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
            activeMode === 'beauty'
              ? 'bg-[#087F8C] text-white shadow-sm'
              : 'text-[#142C43]/70 hover:text-[#087F8C] hover:bg-slate-50'
          }`}
          title="Glossy enamel beauty rendering"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Luminescence</span>
        </button>

        <button
          onClick={() => setActiveMode('shade')}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
            activeMode === 'shade'
              ? 'bg-[#087F8C] text-white shadow-sm'
              : 'text-[#142C43]/70 hover:text-[#087F8C] hover:bg-slate-50'
          }`}
          title="Compare tooth shade whitening"
        >
          <Palette className="w-3.5 h-3.5" />
          <span>Shade Guide</span>
        </button>

        <button
          onClick={() => setActiveMode('anatomy')}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
            activeMode === 'anatomy'
              ? 'bg-[#087F8C] text-white shadow-sm'
              : 'text-[#142C43]/70 hover:text-[#087F8C] hover:bg-slate-50'
          }`}
          title="Explore tooth anatomy layers"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Anatomy</span>
        </button>

        <button
          onClick={handleResetRotation}
          className="p-1.5 text-[#142C43]/60 hover:text-[#087F8C] hover:bg-slate-100 rounded-lg transition-colors ml-1"
          title="Reset 3D rotation"
        >
          <RotateCw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Floating Anatomical Pins (Visible when Anatomy mode is active) */}
      {activeMode === 'anatomy' && (
        <div className="absolute inset-0 pointer-events-none z-20 flex flex-col justify-between p-6">
          <div className="flex items-center justify-between">
            <div className="pointer-events-auto bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-md border border-[#54D6D0]/30 max-w-[210px] transform hover:scale-105 transition-transform">
              <span className="text-[11px] font-bold text-[#087F8C] tracking-wide uppercase block">01. Enamel Shield</span>
              <p className="text-[11px] text-[#142C43]/80 leading-snug mt-0.5">
                96% mineralized hydroxyapatite crystal prisms, protecting inner tooth structure.
              </p>
            </div>

            <div className="pointer-events-auto bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-md border border-[#54D6D0]/30 max-w-[210px] transform hover:scale-105 transition-transform text-right">
              <span className="text-[11px] font-bold text-[#087F8C] tracking-wide uppercase block">02. Dentin Core</span>
              <p className="text-[11px] text-[#142C43]/80 leading-snug mt-0.5">
                Microscopic fluid tubules providing shock absorption and natural warmth.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="pointer-events-auto bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-md border border-[#54D6D0]/30 max-w-[210px] transform hover:scale-105 transition-transform">
              <span className="text-[11px] font-bold text-[#087F8C] tracking-wide uppercase block">03. Cervical Margin</span>
              <p className="text-[11px] text-[#142C43]/80 leading-snug mt-0.5">
                Cementoenamel junction sealing the vital root beneath the healthy gumline.
              </p>
            </div>

            <div className="pointer-events-auto bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-md border border-[#54D6D0]/30 max-w-[210px] transform hover:scale-105 transition-transform text-right">
              <span className="text-[11px] font-bold text-[#087F8C] tracking-wide uppercase block">04. Dual Roots</span>
              <p className="text-[11px] text-[#142C43]/80 leading-snug mt-0.5">
                Anchored firmly into alveolar bone via micro-cushioning periodontal fibers.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Shade Switcher Bar (Visible when Shade mode is active) */}
      {activeMode === 'shade' && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 bg-white/90 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-[#087F8C]/20 shadow-lg flex items-center gap-3">
          <span className="text-xs font-semibold text-[#142C43] whitespace-nowrap">Enamel Shade:</span>
          <div className="flex items-center gap-2">
            {[
              { code: 'BL1', name: 'Ultra Bright', hex: '#FFFFFF' },
              { code: 'B1', name: 'Luminous', hex: '#FAF9F5' },
              { code: 'A1', name: 'Pearl', hex: '#F4EFE6' },
              { code: 'A2', name: 'Natural', hex: '#EBE2D3' },
              { code: 'A3', name: 'Warm', hex: '#DFD2BE' },
            ].map((s) => (
              <button
                key={s.code}
                onClick={() => handleShadeSelect(s.hex)}
                className={`group relative flex flex-col items-center p-1.5 rounded-lg transition-all ${
                  selectedToothShade === s.hex ? 'bg-[#DDF8F0] ring-2 ring-[#087F8C]' : 'hover:bg-slate-100'
                }`}
                title={`${s.name} (${s.code})`}
              >
                <span
                  className="w-5 h-5 rounded-full border border-slate-300 shadow-inner"
                  style={{ backgroundColor: s.hex }}
                />
                <span className="text-[10px] font-semibold text-[#142C43] mt-1">{s.code}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Subtle Drag Hint Overlay */}
      <div
        className={`absolute bottom-3 right-4 z-10 text-[11px] text-[#142C43]/50 pointer-events-none transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-60'
        }`}
      >
        <span>Drag to rotate 3D view</span>
      </div>
    </div>
  );
};

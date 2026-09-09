import * as THREE from 'three';
import { 
  MUSEUM_LOCATIONS, 
  FRONT_SCREENS, 
  LEFT_TABLETS, 
  RIGHT_TABLETS, 
  CENTRAL_EXHIBIT 
} from './dataMuseum.js';
import { 
  createMarbleFloorTexture, 
  createCofferedCeilingTexture, 
  createFrontWallTexture, 
  createScreenTexture, 
  createPaintingTexture, 
  createLetterTexture, 
  createBookCoverTexture 
} from './canvasTextures.js';

export class SceneManager {
  constructor(containerElement, onItemClick, onLocationChange) {
    this.container = containerElement;
    this.onItemClick = onItemClick;
    this.onLocationChange = onLocationChange;

    this.currentLocation = MUSEUM_LOCATIONS[0];
    this.interactiveObjects = [];
    this.arrowObjects = [];

    // Camera Orbit State
    this.isDragging = false;
    this.previousMousePosition = { x: 0, y: 0 };
    this.lon = 0;
    this.lat = 0;
    this.targetLon = 0;
    this.targetLat = 0;
    this.fov = 75;

    // Camera Smooth Interpolation
    this.cameraPosTarget = new THREE.Vector3().copy(this.currentLocation.cameraPos);
    this.isTransitioning = false;
    this.showArrows = true;

    this.initThree();
    this.buildRoom();
    this.createInteractiveElements();
    this.updateArrowNavigation();
    this.setupEvents();
    this.animate();
  }

  initThree() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color('#101910');

    this.camera = new THREE.PerspectiveCamera(
      this.fov,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    this.camera.position.copy(this.currentLocation.cameraPos);

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.container.appendChild(this.renderer.domElement);

    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();

    // Lighting setup
    const ambientLight = new THREE.AmbientLight('#ffffff', 1.2);
    this.scene.add(ambientLight);

    const mainSpot = new THREE.SpotLight('#fff4e0', 3.5);
    mainSpot.position.set(0, 4.8, 0);
    mainSpot.angle = Math.PI / 3;
    mainSpot.penumbra = 0.5;
    mainSpot.castShadow = true;
    this.scene.add(mainSpot);

    const frontWallLight = new THREE.PointLight('#ffe57f', 2.0, 10);
    frontWallLight.position.set(0, 3.2, -6.0);
    this.scene.add(frontWallLight);

    const leftWallLight = new THREE.PointLight('#e8f5e8', 1.5, 10);
    leftWallLight.position.set(-6.0, 3.0, 0);
    this.scene.add(leftWallLight);

    const rightWallLight = new THREE.PointLight('#e8f5e8', 1.5, 10);
    rightWallLight.position.set(6.0, 3.0, 0);
    this.scene.add(rightWallLight);
  }

  buildRoom() {
    const roomWidth = 14;
    const roomHeight = 5;
    const roomDepth = 14;

    // Floor
    const floorGeo = new THREE.PlaneGeometry(roomWidth, roomDepth);
    const floorMat = new THREE.MeshStandardMaterial({
      map: createMarbleFloorTexture(),
      roughness: 0.15,
      metalness: 0.2
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = 0;
    floor.receiveShadow = true;
    this.scene.add(floor);

    // Ceiling
    const ceilingGeo = new THREE.PlaneGeometry(roomWidth, roomDepth);
    const ceilingMat = new THREE.MeshStandardMaterial({
      map: createCofferedCeilingTexture(),
      roughness: 0.6,
      emissive: new THREE.Color('#332e22'),
      emissiveIntensity: 0.3
    });
    const ceiling = new THREE.Mesh(ceilingGeo, ceilingMat);
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.y = roomHeight;
    this.scene.add(ceiling);

    // FRONT WALL
    const wallGeo = new THREE.PlaneGeometry(roomWidth, roomHeight);
    const frontWallMat = new THREE.MeshStandardMaterial({
      map: createFrontWallTexture(),
      roughness: 0.4,
      metalness: 0.3
    });
    const frontWall = new THREE.Mesh(wallGeo, frontWallMat);
    frontWall.position.set(0, roomHeight / 2, -roomDepth / 2);
    this.scene.add(frontWall);

    // LEFT WALL
    const leftWallMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#2a382a'),
      roughness: 0.5
    });
    const leftWall = new THREE.Mesh(wallGeo, leftWallMat);
    leftWall.rotation.y = Math.PI / 2;
    leftWall.position.set(-roomWidth / 2, roomHeight / 2, 0);
    this.scene.add(leftWall);

    // RIGHT WALL
    const rightWall = new THREE.Mesh(wallGeo, leftWallMat);
    rightWall.rotation.y = -Math.PI / 2;
    rightWall.position.set(roomWidth / 2, roomHeight / 2, 0);
    this.scene.add(rightWall);

    // BACK WALL
    const backWallMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#1c281c'),
      roughness: 0.6
    });
    const backWall = new THREE.Mesh(wallGeo, backWallMat);
    backWall.rotation.y = Math.PI;
    backWall.position.set(0, roomHeight / 2, roomDepth / 2);
    this.scene.add(backWall);

    // CENTRAL FURNITURE
    this.buildCentralExhibitFurniture();
  }

  buildCentralExhibitFurniture() {
    const furnitureGroup = new THREE.Group();
    furnitureGroup.position.set(0, 0, 0);

    const woodMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#3d2314'),
      roughness: 0.3,
      metalness: 0.1
    });

    const topGeo = new THREE.BoxGeometry(3.2, 0.08, 1.4);
    const topMesh = new THREE.Mesh(topGeo, woodMat);
    topMesh.position.y = 0.95;
    topMesh.castShadow = true;
    topMesh.receiveShadow = true;
    furnitureGroup.add(topMesh);

    const glassMat = new THREE.MeshPhysicalMaterial({
      color: '#ffffff',
      transparent: true,
      opacity: 0.3,
      roughness: 0.05,
      transmission: 0.9,
      ior: 1.5
    });
    const glassGeo = new THREE.BoxGeometry(3.1, 0.4, 1.3);
    const glassMesh = new THREE.Mesh(glassGeo, glassMat);
    glassMesh.position.y = 1.15;
    furnitureGroup.add(glassMesh);

    const shelfGeo = new THREE.BoxGeometry(3.0, 0.05, 1.2);
    const shelfMesh = new THREE.Mesh(shelfGeo, woodMat);
    shelfMesh.position.y = 0.35;
    shelfMesh.receiveShadow = true;
    furnitureGroup.add(shelfMesh);

    const legGeo = new THREE.BoxGeometry(0.12, 0.95, 0.12);
    const legsPos = [
      [-1.5, 0.475, -0.6],
      [1.5, 0.475, -0.6],
      [-1.5, 0.475, 0.6],
      [1.5, 0.475, 0.6]
    ];
    legsPos.forEach(([x, y, z]) => {
      const leg = new THREE.Mesh(legGeo, woodMat);
      leg.position.set(x, y, z);
      leg.castShadow = true;
      furnitureGroup.add(leg);
    });

    this.scene.add(furnitureGroup);
  }

  createInteractiveElements() {
    // 1. FRONT WALL SCREENS (Image 5 style)
    const screenGeo = new THREE.PlaneGeometry(2.4, 1.4);
    const screenPositions = [-5.1, -1.7, 1.7, 5.1];

    FRONT_SCREENS.forEach((screenData, index) => {
      const texture = createScreenTexture(screenData.title, screenData.subtitle, screenData.icon);
      const screenMat = new THREE.MeshStandardMaterial({
        map: texture,
        emissiveMap: texture,
        emissive: new THREE.Color('#ffffff'),
        emissiveIntensity: 0.3,
        roughness: 0.2
      });

      const screenMesh = new THREE.Mesh(screenGeo, screenMat);
      screenMesh.position.set(screenPositions[index], 2.8, -6.95);
      screenMesh.userData = {
        type: 'screen',
        data: screenData,
        id: screenData.id,
        title: screenData.title
      };

      this.scene.add(screenMesh);
      this.interactiveObjects.push(screenMesh);
    });

    // 2. LEFT WALL TABLETS & PAINTINGS
    const tabGeo = new THREE.PlaneGeometry(1.2, 0.8);
    const tabMat1 = new THREE.MeshStandardMaterial({
      map: createScreenTexture(LEFT_TABLETS[0].title, 'Tablet Histórica L1', '📱'),
      emissive: new THREE.Color('#224422'),
      emissiveIntensity: 0.4
    });
    const tabMesh1 = new THREE.Mesh(tabGeo, tabMat1);
    tabMesh1.rotation.y = Math.PI / 2;
    tabMesh1.position.set(-6.95, 2.3, -3.0);
    tabMesh1.userData = { type: 'tablet', data: LEFT_TABLETS[0], title: LEFT_TABLETS[0].title };
    this.scene.add(tabMesh1);
    this.interactiveObjects.push(tabMesh1);

    const paintGeo = new THREE.PlaneGeometry(2.2, 1.5);
    const paintMat1 = new THREE.MeshStandardMaterial({
      map: createPaintingTexture(LEFT_TABLETS[1].title, 'Batalla de Ayacucho 1824', '#3a4d3a')
    });
    const paintMesh1 = new THREE.Mesh(paintGeo, paintMat1);
    paintMesh1.rotation.y = Math.PI / 2;
    paintMesh1.position.set(-6.95, 2.7, 0);
    paintMesh1.userData = { type: 'cuadro', data: LEFT_TABLETS[1], title: LEFT_TABLETS[1].title };
    this.scene.add(paintMesh1);
    this.interactiveObjects.push(paintMesh1);

    const tabMat2 = new THREE.MeshStandardMaterial({
      map: createScreenTexture(LEFT_TABLETS[2].title, 'Tablet Histórica L2', '📱'),
      emissive: new THREE.Color('#224422'),
      emissiveIntensity: 0.4
    });
    const tabMesh2 = new THREE.Mesh(tabGeo, tabMat2);
    tabMesh2.rotation.y = Math.PI / 2;
    tabMesh2.position.set(-6.95, 2.3, 3.0);
    tabMesh2.userData = { type: 'tablet', data: LEFT_TABLETS[2], title: LEFT_TABLETS[2].title };
    this.scene.add(tabMesh2);
    this.interactiveObjects.push(tabMesh2);

    // 3. RIGHT WALL TABLETS & PAINTINGS
    const tabRMat1 = new THREE.MeshStandardMaterial({
      map: createScreenTexture(RIGHT_TABLETS[0].title, 'Tablet Histórica R1', '📱'),
      emissive: new THREE.Color('#224422'),
      emissiveIntensity: 0.4
    });
    const tabRMesh1 = new THREE.Mesh(tabGeo, tabRMat1);
    tabRMesh1.rotation.y = -Math.PI / 2;
    tabRMesh1.position.set(6.95, 2.3, -3.0);
    tabRMesh1.userData = { type: 'tablet', data: RIGHT_TABLETS[0], title: RIGHT_TABLETS[0].title };
    this.scene.add(tabRMesh1);
    this.interactiveObjects.push(tabRMesh1);

    const paintRMat1 = new THREE.MeshStandardMaterial({
      map: createPaintingTexture(RIGHT_TABLETS[1].title, 'La Respuesta de Arica 1880', '#4a3828')
    });
    const paintRMesh1 = new THREE.Mesh(paintGeo, paintRMat1);
    paintRMesh1.rotation.y = -Math.PI / 2;
    paintRMesh1.position.set(6.95, 2.7, 0);
    paintRMesh1.userData = { type: 'cuadro', data: RIGHT_TABLETS[1], title: RIGHT_TABLETS[1].title };
    this.scene.add(paintRMesh1);
    this.interactiveObjects.push(paintRMesh1);

    const tabRMat2 = new THREE.MeshStandardMaterial({
      map: createScreenTexture(RIGHT_TABLETS[2].title, 'Tablet Histórica R2', '📱'),
      emissive: new THREE.Color('#224422'),
      emissiveIntensity: 0.4
    });
    const tabRMesh2 = new THREE.Mesh(tabGeo, tabRMat2);
    tabRMesh2.rotation.y = -Math.PI / 2;
    tabRMesh2.position.set(6.95, 2.3, 3.0);
    tabRMesh2.userData = { type: 'tablet', data: RIGHT_TABLETS[2], title: RIGHT_TABLETS[2].title };
    this.scene.add(tabRMesh2);
    this.interactiveObjects.push(tabRMesh2);

    // 4. CENTRAL FURNITURE - LETTERS & BOOKS
    const letterGeo = new THREE.PlaneGeometry(0.5, 0.7);
    const letterXPos = [-0.9, 0, 0.9];

    CENTRAL_EXHIBIT.lettersTop.forEach((letterData, idx) => {
      const letterMat = new THREE.MeshStandardMaterial({
        map: createLetterTexture(letterData.title, letterData.transcript),
        roughness: 0.4
      });
      const letterMesh = new THREE.Mesh(letterGeo, letterMat);
      letterMesh.rotation.x = -Math.PI / 2;
      letterMesh.position.set(letterXPos[idx], 1.0, 0.1);
      letterMesh.userData = { type: 'carta', data: letterData, title: letterData.title };
      this.scene.add(letterMesh);
      this.interactiveObjects.push(letterMesh);
    });

    const bookGeo = new THREE.BoxGeometry(0.4, 0.08, 0.55);
    CENTRAL_EXHIBIT.booksBottom.forEach((bookData, idx) => {
      const bookMat = new THREE.MeshStandardMaterial({
        map: createBookCoverTexture(bookData.title, bookData.year),
        roughness: 0.5
      });
      const bookMesh = new THREE.Mesh(bookGeo, bookMat);
      bookMesh.position.set(letterXPos[idx], 0.4, 0);
      bookMesh.userData = { type: 'libro', data: bookData, title: bookData.title };
      this.scene.add(bookMesh);
      this.interactiveObjects.push(bookMesh);
    });
  }

  updateArrowNavigation() {
    this.arrowObjects.forEach(obj => this.scene.remove(obj));
    this.arrowObjects = [];

    if (!this.showArrows) return;

    const locationData = this.currentLocation;
    if (!locationData || !locationData.arrows) return;

    locationData.arrows.forEach(arrowData => {
      const arrowGroup = new THREE.Group();
      arrowGroup.position.set(arrowData.x, 0.04, arrowData.z);

      const ringGeo = new THREE.RingGeometry(0.4, 0.5, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0xffd700,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.85
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = -Math.PI / 2;
      arrowGroup.add(ringMesh);

      const circleGeo = new THREE.CircleGeometry(0.38, 32);
      const circleMat = new THREE.MeshBasicMaterial({
        color: 0x2b3e2b,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.9
      });
      const circleMesh = new THREE.Mesh(circleGeo, circleMat);
      circleMesh.rotation.x = -Math.PI / 2;
      arrowGroup.add(circleMesh);

      const arrowShape = new THREE.Shape();
      arrowShape.moveTo(0, 0.25);
      arrowShape.lineTo(0.18, -0.15);
      arrowShape.lineTo(0.07, -0.15);
      arrowShape.lineTo(0.07, -0.28);
      arrowShape.lineTo(-0.07, -0.28);
      arrowShape.lineTo(-0.07, -0.15);
      arrowShape.lineTo(-0.18, -0.15);
      arrowShape.closePath();

      const shapeGeo = new THREE.ShapeGeometry(arrowShape);
      const shapeMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        side: THREE.DoubleSide
      });
      const arrowMesh = new THREE.Mesh(shapeGeo, shapeMat);
      arrowMesh.rotation.x = -Math.PI / 2;
      arrowMesh.rotation.z = arrowData.angle || 0;
      arrowGroup.add(arrowMesh);

      arrowGroup.userData = {
        type: 'floor-arrow',
        targetId: arrowData.targetId,
        label: arrowData.label
      };

      this.scene.add(arrowGroup);
      this.arrowObjects.push(arrowGroup);
    });
  }

  jumpToLocation(locationId) {
    const loc = MUSEUM_LOCATIONS.find(l => l.id === locationId);
    if (!loc) return;

    this.currentLocation = loc;
    this.cameraPosTarget.copy(loc.cameraPos);
    this.isTransitioning = true;

    this.lon = 0;
    this.lat = 0;
    this.targetLon = 0;
    this.targetLat = 0;

    this.updateArrowNavigation();

    if (typeof this.onLocationChange === 'function') {
      this.onLocationChange(loc);
    }
  }

  toggleArrows(visible) {
    this.showArrows = visible !== undefined ? visible : !this.showArrows;
    this.updateArrowNavigation();
    return this.showArrows;
  }

  setupEvents() {
    const dom = this.renderer.domElement;

    dom.addEventListener('mousedown', (e) => {
      this.isDragging = true;
      this.previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    window.addEventListener('mousemove', (e) => {
      if (!this.isDragging) return;

      const deltaX = e.clientX - this.previousMousePosition.x;
      const deltaY = e.clientY - this.previousMousePosition.y;

      this.targetLon -= deltaX * 0.15;
      this.targetLat += deltaY * 0.15;
      this.targetLat = Math.max(-80, Math.min(80, this.targetLat));

      this.previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    window.addEventListener('mouseup', () => {
      this.isDragging = false;
    });

    dom.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        this.isDragging = true;
        this.previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    });

    window.addEventListener('touchmove', (e) => {
      if (!this.isDragging || e.touches.length !== 1) return;

      const deltaX = e.touches[0].clientX - this.previousMousePosition.x;
      const deltaY = e.touches[0].clientY - this.previousMousePosition.y;

      this.targetLon -= deltaX * 0.2;
      this.targetLat += deltaY * 0.2;
      this.targetLat = Math.max(-80, Math.min(80, this.targetLat));

      this.previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    });

    window.addEventListener('touchend', () => {
      this.isDragging = false;
    });

    dom.addEventListener('click', (e) => {
      this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

      this.raycaster.setFromCamera(this.mouse, this.camera);

      const arrowHits = this.raycaster.intersectObjects(
        this.arrowObjects.flatMap(g => g.children), 
        true
      );

      if (arrowHits.length > 0) {
        let parentGroup = arrowHits[0].object.parent;
        while (parentGroup && !parentGroup.userData.targetId) {
          parentGroup = parentGroup.parent;
        }
        if (parentGroup && parentGroup.userData.targetId) {
          this.jumpToLocation(parentGroup.userData.targetId);
          return;
        }
      }

      const objectHits = this.raycaster.intersectObjects(this.interactiveObjects, true);
      if (objectHits.length > 0) {
        const item = objectHits[0].object.userData;
        if (item && typeof this.onItemClick === 'function') {
          this.onItemClick(item);
        }
      }
    });

    window.addEventListener('resize', () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    if (this.camera.position.distanceTo(this.cameraPosTarget) > 0.02) {
      this.camera.position.lerp(this.cameraPosTarget, 0.08);
    } else {
      this.isTransitioning = false;
    }

    this.lon += (this.targetLon - this.lon) * 0.1;
    this.lat += (this.targetLat - this.lat) * 0.1;

    const phi = THREE.MathUtils.degToRad(90 - this.lat);
    const theta = THREE.MathUtils.degToRad(this.lon);

    const targetVector = new THREE.Vector3();
    targetVector.x = this.camera.position.x + 100 * Math.sin(phi) * Math.cos(theta);
    targetVector.y = this.camera.position.y + 100 * Math.cos(phi);
    targetVector.z = this.camera.position.z + 100 * Math.sin(phi) * Math.sin(theta);

    this.camera.lookAt(targetVector);

    const time = Date.now() * 0.003;
    this.arrowObjects.forEach((arrowGroup) => {
      const ring = arrowGroup.children[0];
      if (ring) {
        ring.scale.setScalar(1 + Math.sin(time) * 0.08);
      }
    });

    this.renderer.render(this.scene, this.camera);
  }
}


/**
 * 
 * @module threejs-input-mouse2scene
 * @class InputMouseToScene
 * @author jon
 * @version 1
 **/
import { Vector2, Vector3, Plane, Raycaster } from 'three';
import { EventManager } from 'smaw-event-manager';

/**
 * Creates an instance of InputMouseToScene.
 * 
 * Adds event listener for mousedown, mousemove and mouseup
 
 * @param container the threejs scene container
 * @param camera the threejs camera
 * @param listeners  a list of observers which should implement mouseDown(mousePos, mouse) mouseUp(mousePos, mouse) and mouseMove(mousePos, mouse) functions
 **/
class InputMouseToScene {

	constructor(container, camera, scene, listeners) {
		EventManager.call(this);
		this.listeners = listeners ? listeners : [];
		this.camera = camera;
		this.scene = scene;
		container.addEventListener('mousedown', (e) => { this._mouseDown(e); });
		container.addEventListener('mousemove', (e) => { this._mouseMove(e); });
		container.addEventListener('mouseup', (e) => { this._mouseUp(e); });

		this.raycaster = new Raycaster();
		this.mouse = new Vector2();
		this.plane = new Plane();
		this.planeNormal = new Vector3();
	

	}

	_mouseDown(e) {
		let mouseNormalized = new Vector2((e.clientX / window.innerWidth) * 2 - 1, - (e.clientY / window.innerHeight) * 2 + 1);
		let mousePosInScene = this._getMousePositionInScene(e);
		this.trigger('m2sMouseDown', {
			mousePosInScene: mousePosInScene,
			mouseNormalized: mouseNormalized,
			e: e
		});
	}

	_mouseUp(e) {
		let mouseNormalized = new Vector2((e.clientX / window.innerWidth) * 2 - 1, - (e.clientY / window.innerHeight) * 2 + 1);
		let mousePosInScene = this._getMousePositionInScene(e);
		this.trigger('m2sMouseUp', {
			mousePosInScene: mousePosInScene,
			mouseNormalized: mouseNormalized,
			e: e
		});
	}

	_mouseMove(e) {
		let mouseNormalized = new Vector2((e.clientX / window.innerWidth) * 2 - 1, - (e.clientY / window.innerHeight) * 2 + 1);
		let mousePosInScene = this._getMousePositionInScene(e);
		this.trigger('m2sMouseMove', {
			mousePosInScene: mousePosInScene,
			mouseNormalized: mouseNormalized,
			e: e
		});
	}

	// _getMousePositionInScene(mousePos) {
	// 	let vector = new Vector3(mousePos.x, mousePos.y, 0);
	// 	vector.unproject(this.camera);
	// 	let dir = vector.sub(this.camera.position).normalize();
	// 	let distance = - this.camera.position.z / dir.z;
	// 	let pos = this.camera.position.clone().add(dir.multiplyScalar(distance));
	// 	pos.applyQuaternion(this.camera.quaternion);
	// 	return pos;
	// }

	_throwError(methodName) {
		console.error(`InputMouseToScene Listener should implement ${methodName} function`);
	}

	_getMousePositionInScene(event) {
		let pos = new Vector3();
		this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
		this.mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
		this.planeNormal.copy(this.camera.position).normalize();
		this.plane.setFromNormalAndCoplanarPoint(this.planeNormal, this.scene.position);
		this.raycaster.setFromCamera(this.mouse, this.camera);
		this.raycaster.ray.intersectPlane(this.plane, pos);
		return pos;
	}
}

export { InputMouseToScene };
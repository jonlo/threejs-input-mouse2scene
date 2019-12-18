
/**
 * 
 * @module threejs-input-mouse2scene
 * @class InputMouseToScene
 * @author jon
 * @version 1
 **/
import { Vector2, Vector3 } from 'three';
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

	constructor(container, camera, listeners) {
		EventManager.call(this);
		this.listeners = listeners ? listeners : [];
		this.camera = camera;
		container.addEventListener('mousedown', (e) => { this._mouseDown(e); });
		container.addEventListener('mousemove', (e) => { this._mouseMove(e); });
		container.addEventListener('mouseup', (e) => { this._mouseUp(e); });
	}

	_mouseDown(e) {
		let mouseNormalized = new Vector2((e.clientX / window.innerWidth) * 2 - 1, - (e.clientY / window.innerHeight) * 2 + 1);
		let mousePosInScene = this._getMousePositionInScene(mouseNormalized);
		this.trigger('m2sMouseDown', {
			mousePosInScene: mousePosInScene,
			mouseNormalized: mouseNormalized,
			e: e
		});
		// this.listeners.forEach((listener) => {
		// 	try {
		// 		listener.mouseDown(mousePos, mouse);
		// 	} catch (error) {
		// 		this._throwError('mouseDown');
		// 	}
		// });
	}

	_mouseUp(e) {
		let mouseNormalized = new Vector2((e.clientX / window.innerWidth) * 2 - 1, - (e.clientY / window.innerHeight) * 2 + 1);
		let mousePosInScene = this._getMousePositionInScene(mouseNormalized);
		this.trigger('m2sMouseUp', {
			mousePosInScene: mousePosInScene,
			mouseNormalized: mouseNormalized,
			e: e
		});
	}

	_mouseMove(e) {
		let mouseNormalized = new Vector2((e.clientX / window.innerWidth) * 2 - 1, - (e.clientY / window.innerHeight) * 2 + 1);
		let mousePosInScene = this._getMousePositionInScene(mouseNormalized);
		this.trigger('m2sMouseMove', {
			mousePosInScene: mousePosInScene,
			mouseNormalized: mouseNormalized,
			e: e
		});
	}

	_getMousePositionInScene(mousePos) {
		let vector = new Vector3(mousePos.x, mousePos.y, 0);
		vector.unproject(this.camera);
		let dir = vector.sub(this.camera.position).normalize();
		let distance = - this.camera.position.z / dir.z;
		let pos = this.camera.position.clone().add(dir.multiplyScalar(distance));
		return pos;
	}

	_throwError(methodName) {
		console.error(`InputMouseToScene Listener should implement ${methodName} function`);
	}

}

export { InputMouseToScene };
# threejs-input-mouse2scene

Input module to get the mouse position in a threejs 3d scene

## installation

```
npm install threejs-input-mouse2scene
```

## Quick Start

```javascript
import { InputMouseToScene } from 'threejs-input-mouse2scene';

this.inputMouse = new InputMouseToScene(this.container, this.camera, [this]);

function mouseDown(mousePosScene, mousePosNormalized) {
		
	}

function mouseUp(mousePosScene, mousePosNormalized) {
		
	}

function mouseMove(mousePosScene, mousePosNormalized) {
		
	}
```
## Classes

<dl>
<dt><a href="#InputMouseToScene">InputMouseToScene</a></dt>
<dd></dd>
<dt><a href="#InputMouseToScene">InputMouseToScene</a></dt>
<dd><p>Creates an instance of InputMouseToScene.</p>
<p>Adds event listener for mousedown, mousemove and mouseup</p>
</dd>
</dl>

<a name="InputMouseToScene"></a>

## InputMouseToScene
**Kind**: global class
**Version**: 1
**Author**: jon
<a name="new_InputMouseToScene_new"></a>

### new InputMouseToScene(container, camera, listeners)

| Param     | Description                                                                                                                             |
| --------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| container | the threejs scene container                                                                                                             |
| camera    | the threejs camera                                                                                                                      |
| listeners | a list of observers which should implement mouseDown(mousePos, mouse) mouseUp(mousePos, mouse) and mouseMove(mousePos, mouse) functions |
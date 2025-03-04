uniform mat4 projectionMatrix; //transform teh coordinates into the clip space coordinates
uniform mat4 viewMatrix; //apply transformations relative to camera (position, rotation, fov, near, far)
uniform mat4 modelMatrix; //transformations relative to mesh position, rotation, scale
uniform vec2 uFrequency;
uniform float uTime;


attribute vec3 position;
attribute vec2 uv;

varying vec2 vUv;

// attribute float aRandom;

// varying float vRandom;
    
void main()
{
	vec4 modelPosition = modelMatrix * vec4(position,1.0);
	modelPosition.z += sin(modelPosition.x *uFrequency.x - uTime) * .1;
	modelPosition.z += sin(modelPosition.y *uFrequency.y- uTime) * .1;
	// modelPosition.z += aRandom * 0.1;


	vec4 viewPosition = viewMatrix * modelPosition;

	
	vec4 projectedPosition = projectionMatrix * viewPosition;

	gl_Position = projectedPosition;

	vUv = uv;

	// vRandom = aRandom;


	// gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
}
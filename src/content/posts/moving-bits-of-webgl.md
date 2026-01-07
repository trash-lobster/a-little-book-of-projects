---
title: "The Moving Bits of WebGL"
date: "2026-01-05"
slug: "moving-bits-of-webgl"
description: "Part one of the guide to start tackling WebGL directly."
---

I’ve been afraid to get started in graphics programming. It was intimidating. It felt like a flashy discipline in programming, but also not at the same time. It’s scary to have to think about math again after leaving that chapter behind years ago. 

But alas, your brain gets ideas even if the heart is not prepared.

I wanted to create an infinite canvas component, one tailored for my intended use - an image reference board. I knew that an ordinary canvas won’t cut it (more on that later). I came face to face with taking the first dive with the WebGL API, a web interface to access the graphics rendering pipeline on your devices. For once, I didn’t run away from this challenge, despite knowing the time and commitment.

Thankfully, I was in a time of my life when I didn’t have much to be busy with.

I ignored the readily available wrapper APIs that would have done the job much better (and saving me a lot more time) and decided to go as low as possible.

This write up is a result of that experience and intends to capture what I’ve learnt. I hope to share my learnings and ease the anxiety of any newcomers who might find themselves in the same place where I was when I started, ambitious and lacking. Or just the curious few who might want to know what is happening beneath the Graphics API.

I have only just scratched the surface of graphics programming, but I plan to do more in the future as soon as life permits. This article is only part one, and there will be a follow up soon enough!

# Canvas and Context

While the experiment dealt with 2D only, I find that the inner working to be useful for 2D and 3D work.

On the web, it all starts with the <canvas> element. For those unfamiliar with it, the element is readily available in HTML. More people might be familiar with using the Canvas API to draw graphics. It is certainly easier to use.

So why bother using WebGL?

```jsx
// canvas API

const canvas = document.getElementById("canvas");

const ctx = canvas.getContext("2d");

// WebGL - we will ignore WebGL 2.0 in this article

const glCanvas = document.getElementById("canvas");

const gl = glCanvas.getContext("webgl");
```

Let’s understand what `WebGLRenderingContext` is, the interface that you receive when you call `getContext(“webgl”)`. Effectively, this is the gateway for you to start using the graphics pipeline of your machine to draw on the screen.

To state the obvious, the canvas context (obtained through `getContext("2d")`) is restricted to 2D drawing only. Technically, you don’t need to use a WebGL context to render in 2D, but there’re still good reasons to choose WebGL context over the canvas counterpart.

- WebGL is much more complex and requires a lot more set up just to get started.
- Canvas API is exclusively 2D, while WebGL can do both 2D and 3D.
- WebGL benefits from hardware acceleration through GPU
- WebGL offers more granular control.
- Interaction with drawn elements require custom set up, e.g. hit-testing, clicking

# Shaders

To draw anything on the screen, you need a specific pair of code.

- Vertex shader - this is how you specify the vertex positions, the location of the primitive shapes (points, lines and triangles - but almost everything is a triangle in graphics rendering).
- Fragment shader - receives the positions from the vertex shader (a simplification of the process) and then paint each pixel of the primitives with colors.

Shaders are written in GLSL, with a syntax based on C. Unfortunately, syntax is the least of your problems when it comes to writing shaders (at least that is the case for me). GPUs operate differently from CPUs in a way that heavily impacts how the code is written.

Here’re some [fantastic](https://www.makingsoftware.com/chapters/shaders) [resource](https://webglfundamentals.org/webgl/lessons/webgl-shaders-and-glsl.html) that you could be reading, instead of me trying to regurgitate it.

My only little input is that to help me grasp how shaders work, I find it useful to imagine a grid of 3 x 3 pixels, each receiving the same set of instructions, all at the same time. The only difference is the pixel’s x and y positions and we have to rely on using them to pass or fail a series of instructions.

## Shader Program

Assuming that you’ve written the shader code correctly, you’ll need to make them available to the graphics pipeline. To do so, you need to compile the shaders into `WebGLShader` and attach them to a `WebGlProgram`. To me, the program is akin to the central control and it needs to know everything to make rendering happen, i.e. it needs to know what your shader code is to render.

You can have multiple programs, attached to different shaders, to allow rendering of different ‘objects’. For example, in my infinite canvas, I have one program for the grid, one program for rectangles and one program for textured rectangles/images.

There’re different ways to skin the cat, but you and I can worry about that once we get enough experience and knowledge in the area.

Below are the code blocks I used to create shader objects and attach them to the shader program.

```tsx
// returns a shader if it is created properly
// type is limited to either gl.VERTEX_SHADER or gl.FRAGMENT_SHADER when valid
// source is the literal GLSL code you've written
function createShader(gl: WebGLRenderingContext, type: GLenum, source: string) {
  const shader = gl.createShader(type); // creates the vertex or fragment shader
  gl.shaderSource(shader, source); // sets the source code
  gl.compileShader(shader); // compiles it
  const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS); // checks the status
  if (success) {
    return shader;
  }

  gl.deleteShader(shader);
  throw new Error("Shader was not created.");
}

function createProgram(
  gl: WebGLRenderingContext,
  vert: string,
  frag: string,
) {
  const vertShader = createShader(gl, gl.VERTEX_SHADER, vert);
  const fragShader = createShader(gl, gl.FRAGMENT_SHADER, frag);
  const program = gl.createProgram();
  // attach the shaders to the program so they are included in the link operation
  gl.attachShader(program, vertShader);
  gl.attachShader(program, fragShader);
  // linking it to the context makes it available for use in the rendering process
  // a program can only be linked to the context with which it was created
  gl.linkProgram(program);
  const success = gl.getProgramParameter(program, gl.LINK_STATUS);

  if (!success) {
	  // preemptively mark these for deletion
    gl.deleteProgram(program);
    gl.deleteShader(vertShader);
    gl.deleteShader(fragShader);
    throw new Error(
      "Program was not created or the link to shaders was not successful.",
    );
  }

  gl.detachShader(program, vertShader);
  gl.detachShader(program, fragShader);
  gl.deleteShader(vertShader);
  gl.deleteShader(fragShader);

  return program;
}
```

## linkProgram

This operation deserves a lengthier discussion. The [OpenGL documentation](https://registry.khronos.org/OpenGL-Refpages/gl4/html/glLinkProgram.xhtml) indicates that at the time of calling this function, the vertex shaders and fragment shaders, if attached, will each create an executable to run on the respective processor. 

> If any shader objects of type GL_VERTEX_SHADER are attached to program, they will be used to create an executable that will run on the programmable vertex processor… If any shader objects of type GL_FRAGMENT_SHADER are attached to program, they will be used to create an executable that will run on the programmable fragment processor.
> 

Since the executable is linked with the program, the shader objects are no longer needed and should be detached and removed (the detachment must occur before the clean up can occur).

## Attributes and buffers

Buffers are the same as what you normally come across in software - they are arrays of binary data. You can put whatever you want into them , but you will need attributes to dictate how you retrieve data from the buffers.

Take this simple `vertex` shader:

```glsl
attribute vec2 a_position;

uniform vec2 u_resolution;
uniform mat3 u_matrix;
uniform float u_z;

void main() {
  vec2 position = (u_matrix * vec3(a_position, 1)).xy;

  vec2 zeroToOne = position / u_resolution;
  vec2 zeroToTwo = zeroToOne * 2.0;
  vec2 clipSpace = zeroToTwo - 1.0;
  float z = mix(1.0, -1.0, u_z);

  gl_Position = vec4(clipSpace * vec2(1, -1), z, 1);
}
```

Notice that the `a_position` variable is labelled `attribute`. These are the user-defined input values, provided during `draw` .

See the following to trace the process from setting up and drawing (note that this is a simplified approach that ignores the assignment of `UNIFORM` and `TEXTURE` etc.).

```tsx
// ** SET UP AND UPDATE PHASE **
// gl is the WebGLRenderingContext instance
// program is the WebGLProgram instance, with shaders attached (including vertex above)
// the sequence of creating and assigning data
const positionBuffer = gl.createBuffer();
const attributeLocation = gl.getAttribLocation(program, 'a_position');

// this function returns the positions of what you're drawing in an array
const positions = getPositions();

const vertexArray = new Float32Array(positions.length);
// GLSL requires specific typed array
vertexArray.set(positions);

// ARRAY_BUFFER represents the vertex attribute target, wher a_position is found
// binding it means that the buffer is now what the ARRAY_BUFFER currently refers to
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

// write the content of the array into the target, which currently is the positionBuffer
gl.bufferData(gl.ARRAY_BUFFER, vertexArray, gl.STATIC_DRAW);

// ** DRAW PHASE **

/**
* mdn suggests that this should be enabled first before update vertex attrib pointer
* However, I have not observed any practical difference
*/
gl.enableVertexAttribArray(attributeLocation);

// indicate how the data should be pulled out from the buffer
const size = 2; // 2 components per iteration since it's a vec2D
const type = gl.FLOAT; // the data is 32bit floats
const normalize = false; // don't normalize the data

// the additional space to perform offset when moving from one iteration to the next
// if it's at 0, the array is tightly packed with one iteration after another
const stride = 0;
 // the offset right at the beginning of the buffer
const offset = 0;

// this specifies the layout of the buffer currently bound to gl.ARRAY_BUFFER
gl.vertexAttribPointer(
  attributeLocation,
  size,
  type,
  normalize,
  stride,
  offset,
);

gl.drawArrays(gl.TRIANGLES, 0, this.getVertexCount());

// clean up - unbound the array and disable it
gl.bindBuffer(gl.ARRAY_BUFFER, null);

// prevents leaking into future draws
gl.disableVertexAttribArray(attributeLocation);
```

Hopefully, this helps you with understanding how buffers and attribute work. 

## Uniforms

Uniforms are globals. Notice that from the vertex shader code earlier, how we have set up the following:

```glsl
uniform vec2 u_resolution;
uniform mat3 u_matrix;
```

Aside from being addressed as `uniform`, these two also have their types declared as `vec2` and `mat3`. These types are useful in simplifying the binding process.

```tsx
// We store a reference to the location, just like we did with the vertex positioning
const resolutionLocation = gl.getUniformLocation(program, "u_resolution");
const matrixLocation = gl.getUniformLocation(program, "u_matrix");

// We can assign specifically using a uniform call of that type
// the necessary values
gl.uniform2f(this.resolutionLocation, gl.canvas.width, gl.canvas.height);
gl.uniformMatrix3fv(this.matrixLocation, false, this.worldMatrix);
```

This skips the hassle of setting up how the buffer should be read.

# That's all! For now...

As mentioned earlier, this is meant to be a multi-part write up. What we have covered so far should help you set up your shaders and pipeline.

Next, we will look at rendering on the canvas.
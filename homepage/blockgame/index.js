$( document ).ready(function() {
    // Handler for .ready() called.
let mousePos = { x: undefined, y: undefined };

// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite;

// create an engine
var engine = Engine.create();

// create a renderer
var render = Render.create({
    element: document.body,
    engine: engine
});

// create a ground
var ground = Bodies.rectangle(400, 600, 810, 60, { isStatic: true });
var ceiling = Bodies.rectangle(400, 0, 810, 60, { isStatic: true });
var left = Bodies.rectangle(0, 300, 60, 610, { isStatic: true });
var right = Bodies.rectangle(800, 300, 60, 610, { isStatic: true });

// add all of the bodies to the world
Composite.add(engine.world, [ground]);
Composite.add(engine.world, [ceiling]);
Composite.add(engine.world, [left]);
Composite.add(engine.world, [right]);

// run the renderer
Render.run(render);

// create runner
var runner = Runner.create();

// run the engine
Runner.run(runner, engine);

$( "#main-body" ).on( "click", function() {
  var boxA = Bodies.rectangle(mousePos.x, mousePos.y, 80, 80);
  Composite.add(engine.world, [boxA]);
} );
$( "#main-body" ).on( "mousemove", function() {
  mousePos = { x: event.clientX, y: event.clientY };
} );
});

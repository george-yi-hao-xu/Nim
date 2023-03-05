// // game init
// window.onload = ()=>{
//     // const winWidth = window.innerWidth;
//     // const winHeight = window.innerHeight;
//     const canvasWidth = 0.6 * window.innerWidth;
//     const canvasHeight = 0.3 *  window.innerHeight;
//     renderSticks(21,canvasWidth,canvasHeight,5); // 21 sticks
// }

export function renderSticks(numOfSticks,width,height,stickWidth,stickHeight){
    // module aliases
    var Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        Bodies = Matter.Bodies,
        Composite = Matter.Composite;

    // create an engine

    // var engine = Engine.create({
    //     render: {
    //       element: document.body,
    //       canvas: canvas,
    //       options: {
    //         width: 1000,
    //         height: 1000
    //       }
    //     }
    //   });
    // var canvas = document.createElement('canvas')
    var engine = Engine.create();
    // create a renderer
    var render = Render.create({
        element: document.body,
        engine: engine,
        options: {
            wireframes: false, // <-- important
            background: 'black'
          }
    });

    // change the canvas size
    // render.context.canvas = document.getElementById('canvas');
    render.context.canvas.width = width;
    render.context.canvas.height = height;

    // create two boxes and a ground
    // var boxA = Bodies.rectangle(400, 200, 80, 80);
    // var boxB = Bodies.rectangle(450, 50, 80, 80);
    var ground = Bodies.rectangle(width/2, height, width, 15, 
    {   
        isStatic: true, 
        render: {
            fillStyle: 'black',
            strokeStyle: 'none',
            lineWidth: 3
        } 
    });

    // add all of the bodies to the world
    // Composite.add(engine.world, [boxA, boxB, ground]);

    // create sticks
    let sticksList = [];
    // const numOfSticks = 21;
    // create sticks  with length (height*0.2) and width stickWidth,but have gaps, equal to stickGap
    const stickGap = (width - numOfSticks * stickWidth) / (numOfSticks + 1);
    for (var i = 1; i <= numOfSticks; i++){
        sticksList.push(
            Bodies.rectangle(
                (stickGap + stickWidth) * i - 0.5 * stickWidth, height * 0.75 - 5 * i, stickWidth, stickHeight, 
                {
                    render: {
                        fillStyle: 'white',
                        strokeStyle: 'none',
                        lineWidth: 3
                    }
                }));
    }
    // add sticks to the world
    Composite.add(engine.world, sticksList.concat([ground]));

    // run the renderer
    Render.run(render);

    // create runner
    var runner = Runner.create();

    // run the engine
    Runner.run(runner, engine);
}

import Matter from "matter-js";
import { useRef, useEffect } from "react";

export const MatterDemo = () => {
  const engine = useRef(Matter.Engine.create()).current;
  const render = useRef(Matter.Render.create({
    engine,
    options: {
      // wireframes: false,
      width: 800,
      height: 600,
    },
  })).current;
  const mouse = useRef(Matter.Mouse.create(render.canvas)).current;
  const runner = useRef(Matter.Runner.create()).current;
  const el = useRef<HTMLDivElement>(null);

  // base
  // useEffect(() => {
  //   el.current!.appendChild(render.canvas);

  //   const boxA = Matter.Bodies.rectangle(400, 200, 80, 80, {
  //     frictionAir: 1,
  //   });
  //   const boxB = Matter.Bodies.rectangle(450, 50, 80, 80, {
  //     frictionAir: 0.5,
  //   });

  //   // group
  //   const stack = Matter.Composites.stack(
  //     40, 40, 6, 3, 10, 20,
  //     (x: number, y: number) => Matter.Bodies.circle(x, y, 20),
  //   );

  //   // constraint
  //   const vertical = Matter.Bodies.rectangle(200, 300, 20, 100, {
  //     collisionFilter: {
  //       group: -1,
  //     },
  //   });
  //   const horizontal = Matter.Bodies.rectangle(200, 300, 100, 20, {
  //     collisionFilter: {
  //       group: -1,
  //     },
  //   });

  //   const rotateConstraint = Matter.Constraint.create({
  //     bodyA: vertical,
  //     bodyB: horizontal,
  //     length: 0,
  //   });

  //   // fixed
  //   const ground = Matter.Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

  //   // mouse constraint
  //   const mouseConstraint = Matter.MouseConstraint.create(engine, {
  //     mouse,
  //     constraint: {
  //       stiffness: 0.2,
  //       render: {
  //         // visible: false,
  //       },
  //     },
  //   });

  //   Matter.Composite.add(engine.world, [
  //     boxA, 
  //     boxB, 
  //     stack,
  //     vertical,
  //     horizontal,
  //     rotateConstraint, 
  //     ground,
  //     mouseConstraint,
  //   ]);

  //   Matter.Render.run(render);

  //   Matter.Runner.run(runner, engine);

  //   return () => {
  //     Matter.Composite.remove(engine.world, [boxA, boxB, ground]);
  //     Matter.Render.stop(render);
  //     Matter.Runner.stop(runner);
  //   };
  // }, []);

  // Double Pendulum
  useEffect(() => {
    el.current!.appendChild(render.canvas);

    Matter.Render.run(render);
    Matter.Runner.run(runner, engine);

    const group = Matter.Body.nextGroup(true);
    const length = 200;
    const width = 25;

    const pendulum = Matter.Composites.stack(
      350, 160, 2, 1, -20, 0,
      (x: number, y: number) => Matter.Bodies.rectangle(
        x, y, width, length, {
        collisionFilter: { group },
        frictionAir: 0,
        // @ts-ignore
        chamfer: 5,
        // chamfer: {
        //   radius: 5,
        //   quality: 5,
        // },
        render: {
          fillStyle: "transparent",
          lineWidth: 1,
        },
      },
      ),
    );

    engine.gravity.scale = 0.002;

    Matter.Composites.chain(pendulum, 0.45, 0, -0.45, 0, {
      stiffness: 0.9,
      length: 0,
      angularStiffness: 0.7,
      render: {
        strokeStyle: "#4A485B",
      },
    });

    Matter.Composite.add(pendulum, Matter.Constraint.create({
      bodyB: pendulum.bodies[0],
      pointB: { x: -length * 0.42, y: 0 },
      pointA: { x: pendulum.bodies[0].position.x - length * 0.42, y: pendulum.bodies[0].position.y },
      stiffness: 0.9,
      length: 0,
      render: {
        strokeStyle: "#4A485B",
      },
    }));

    const lowerArm = pendulum.bodies[1];

    Matter.Body.rotate(lowerArm, -Math.PI * 0.3);

    Matter.Composite.add(engine.world, pendulum);

    const trail: { position: Matter.Vector, speed: number }[] = [];

    Matter.Events.on(render, 'afterRender', function () {
      trail.unshift({
        position: Matter.Vector.clone(lowerArm.position),
        speed: lowerArm.speed
      });

      // @ts-ignore
      Matter.Render.startViewTransform(render);
      render.context.globalAlpha = 0.7;

      for (var i = 0; i < trail.length; i += 1) {
        var point = trail[i].position,
          speed = trail[i].speed;

        var hue = 250 + Math.round((1 - Math.min(1, speed / 10)) * 170);
        render.context.fillStyle = 'hsl(' + hue + ', 100%, 55%)';
        render.context.fillRect(point.x, point.y, 2, 2);
      }

      render.context.globalAlpha = 1;
      // @ts-ignore
      Matter.Render.endViewTransform(render);

      if (trail.length > 2000) {
        trail.pop();
      }
    });

    // const mouseConstraint = Matter.MouseConstraint.create(engine, {
    //   mouse: mouse,
    //   constraint: {
    //     stiffness: 0.2,
    //     render: {
    //       visible: false
    //     }
    //   }
    // });

    // Matter.Composite.add(engine.world, mouseConstraint);

    // render.mouse = mouse;

    // Matter.Render.lookAt(render, {
    //   min: { x: 0, y: 0 },
    //   max: { x: 700, y: 600 }
    // });

    return () => {
      Matter.Render.stop(render);
      Matter.Runner.stop(runner);
    };
  }, []);

  return (
    <div ref={el}></div>
  );
};
import { useRef, useEffect, useState } from "react";
import * as d3 from "d3";

const TOP = 40;
const RIGHT = 40;
const BOTTOM = 40;
const LEFT = 40;

const DATA = [
  { x: new Date('2023-7'), y: 20 },
  { x: new Date('2023-8'), y: 40 },
  { x: new Date('2023-9'), y: 60 },
  { x: new Date('2023-10'), y: 80 },
];

export const D3Axis = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const gx = useRef<SVGGElement>(null);
  const gy = useRef<SVGGElement>(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    const circles = svg.append("g")
      .selectAll("circle")
      .data(DATA)
      .enter()
      .append("circle");
      
    const getWindowSize = () => {
      const { clientWidth: WIDTH, clientHeight: HEIGHT } = document.body;
      return { WIDTH, HEIGHT };
    };
    
    const updateSvg = () => {
      const { WIDTH, HEIGHT } = getWindowSize();
      svg.attr("width", WIDTH)
      .attr("height", HEIGHT);
    };

    const getAxis = () => {
      const { WIDTH, HEIGHT } = getWindowSize();

      const x = d3.scaleUtc([new Date(), new Date('2023-12')], [LEFT, WIDTH - RIGHT]);

      const y = d3.scaleLinear([0, 100], [HEIGHT - BOTTOM, TOP]); 

            d3.select(gx.current!)
              .attr("transform", `translate(0, ${HEIGHT - BOTTOM})`)
              .call(d3.axisBottom(x));
            
            d3.select(gy.current!)
              .call(d3.axisLeft(y));   
              
      return { x, y }        
    };

    const updateCircles = () => {
      const { x, y } = getAxis();
      circles.attr("cx", d => x(d.x))
      .attr("cy", d => y(d.y))
      .attr("r", 4)
      .attr("fill", "steelblue");  
    };

    const resize = () => {
      updateSvg();
      updateCircles(); 
    };

    resize();

    window.addEventListener("resize", resize);
     
       
    return () => {
      // svg.remove();
      window.removeEventListener("resize", resize);
    };   

  }, []);

  return (
    <svg ref={svgRef} style={{ width: "100vw", height: "100vh" }}>
      {/* 坐标轴 */}
      <g ref={gx} />
      <g ref={gy} transform={`translate(${LEFT}, 0)`}/>
    </svg>
  );
};

export const D3Line = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const COLORS = [
      "#1abc9c",
      "#2ecc71",
      "#3498db",
      "#9b59b6",
      "#f1c40f",
      "#e67e22",
      "#e74c3c",
    ] as const;

    const SIZE = 4;

    const data: { cx: number, cy: number, r: number, fill: typeof COLORS[number] }[] = [];

    const addItem = (cx: number, cy: number, r: number, fill: typeof COLORS[number]) => {
      const item = { cx, cy, r, fill };
      data.push(item);
    };

    // 数量超过100就变得缓慢
    const batchAddItem = (amount = 50) => {
      const { clientWidth, clientHeight } = document.body;
      for (let i = 0; i < amount; i++) {
        const r = (Math.random() + 0.5) * SIZE;

        addItem(Math.random() * clientWidth, Math.random() * clientHeight, r, COLORS[Math.floor(Math.random() * COLORS.length)]
        );
      }
    };

    batchAddItem();

    const svg = d3.select(svgRef.current);

    const updateSvg = () => {
      const { clientWidth, clientHeight } = document.body;

      svg.attr("width", clientWidth)
         .attr("height", clientHeight);
    };

    svg.selectAll("circle")
       .data(data)
       .join(
         (enter) => {
          return enter.append("circle")
                      .attr("cx", d => d.cx)
                      .attr("cy", d => d.cy)
                      .attr("fill", d => d.fill)
                      .attr("r", 0)
                      .transition()
                      .attr("r", d => d.r);
         },
         (update) => {
           
         },
         (exit) => {
           exit.remove();
         }
       );

       const { clientWidth, clientHeight } = document.body;
       const circles = svg.selectAll("circle");
       const transition = () => {
           circles.transition()
            .delay(250)
            .duration(60000)
            .ease(d3.easeLinear)
            .attr("transform", (d) =>  `translate(${Math.random() * clientWidth - d.cx}, ${Math.random() * clientHeight - d.cy})`
            )
            .on("end", transition)
            // .on("end", () => {
            //   setTimeout(transition, 2000);
            // })
       };
      //  
       svg.on("click", (_event: MouseEvent) => {
         
         // const { clientX, clientY } = event;
         // const r = (Math.random() + 1) * SIZE;
         // addItem(clientX - r / 2, clientY - r / 2, r, COLORS[Math.floor(Math.random() * COLORS.length)]);
   
       });   

    const resize = () => {
      updateSvg();
    };
    
    svg.call(transition).node();
    window.addEventListener("resize", resize);
    
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <svg ref={svgRef} style={{ width: "100vw", height: "100vh" }}>
      </svg>
    </div>
  );
};

export const D3Line2 = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current)
                  .attr("width", 600)
                  .attr("height", 600);


    const bubble = d3.pack().size([600, 600]).padding(3);
    
    const circles = svg.selectAll("circle")
                       .data([])
                       .enter()
                       .append("circle");
    
  }, []);
  
  return (
    <svg ref={svgRef}></svg>
  );
};
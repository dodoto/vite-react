import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import d3Tip from "d3-tip";

const HEIGHT = 500;

const data = [
  { letter: '一', frequency: 0.08167 },
  { letter: '二', frequency: 0.13492 },
  { letter: '三', frequency: 0.02782 },
  { letter: '四', frequency: 0.04253 },
  { letter: '五', frequency: 0.12702 },
  { letter: '六', frequency: 0.02288 },
  { letter: '日', frequency: 0.22288 }
];

const values = [0, 1, 2, 3];

export const D3SimpleBarChart = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const containerWidth = svgRef.current?.parentElement?.offsetWidth || 0;
    const margin = {
      top: 80,
      right: 20,
      bottom: 30,
      left: 60,
    };
    const width = containerWidth - margin.left - margin.right;
    const height = HEIGHT - margin.top - margin.bottom;

    const svg = d3
      .select(svgRef.current)
      .attr("width", containerWidth)
      .attr("height", HEIGHT);
    
    const x = d3
      .scaleBand()
      .rangeRound([0, width])
      .padding(0.4)
      .domain(data.map(d => d.letter));
    
    const y = d3  
      .scaleLinear()
      .rangeRound([height, 0])
      .domain([
        0,
        d3.max(data, d => d.frequency)!
      ]); 
      
    const barWidth = (width / data.length) * 0.9;
    const stepArray = d3.ticks(0, d3.max(data, d => d.frequency)!, 10);
    const colors = ["#ccc", "#ddd"];
    
    // @ts-ignore
    const tip = d3Tip()
      .attr("class", "d3-tip")
      .offset([-10, 0])
      .html((_: MouseEvent, d: typeof data[number]) => (`<strong>星期${d.letter}<br>空置率:</strong> <span style='color:#ffeb3b'>${(d.frequency * 100).toFixed(2)}%</span>`));

    svg.call(tip);
    
    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);
      
    g.append("g")
     .attr("class", "axis axis--x")
     .attr("transform", `translate(0, ${height})`);
    
    g.append("g")
     .attr("class", "axis axis--y")
     .call(d3.axisLeft(y).ticks(10, "%"))
     .append("text")
     .attr("y", -16)
     .attr("dy", ".71em")
     .style("text-anchor", "middle")
     .style("fill", "#fff")
     .text("空置率 (%)");


     g.append('g') // 设置背景柱
     .attr('class', 'bar--bg-bar')
     .selectAll('rect')
     .data(d3.range(stepArray.length - 1))
     .enter()
     .append('rect')
     .attr('stroke', 'none')
     .attr('stroke-width', 0)
     .attr('fill', function(d, i) {
       return colors[i % 2]
     })
     .attr('x', 1)
     .attr('width', width)
     .attr('height', function(d, i) {
       return y(stepArray[i]) - y(stepArray[i + 1])
     })
     .attr('y', function(_, i) {
       return y((i + 1) * stepArray[1])
     })

   g.selectAll('.bar') // 画柱图
     .data(data)
     .enter()
     .append('rect')
     .on('mouseover', tip.show)
     .on('mouseout', tip.hide)
     .attr('class', 'bar')
     .attr('fill', 'rgb(33, 150, 243)')
     .attr('x', d => x(d.letter)!)
     .attr('y', height) // 控制动画由下而上
     .attr('width', x.bandwidth())
     .attr('height', 0) // 控制动画由下而上
    //  .transition()
    //  .duration(200)
    //  .ease(d3.easeBounceInOut)
    //  .delay(function(d, i) {
    //    return i * 200
    //  })
     .attr('y', function(d) {
       return y(d.frequency)
     })
     .attr('height', function(d) {
       return height - y(d.frequency)
     })

   g.append('g')
     .attr('class', 'bar--text')
     .selectAll('text')
     .data(data)
     .enter()
     .append('text')
     .attr('fill', 'white')
     .attr('font-size', '14px')
     .attr('text-anchor', 'middle')
     .attr('x', d => x(d.letter)!)
     .attr('y', function(d) {
       return y(d.frequency)
     })
     .attr('dx', barWidth / 2)
     .attr('dy', '1em')
     .text(function(d) {
       return (d.frequency * 100).toFixed(2) + '%'
     })
     .on('mouseover', tip.show)
     .on('mouseout', tip.hide)

   svg
     .append('g')
     .attr('class', 'bar--title')
     .append('text')
     .attr('fill', '#000')
     .attr('font-size', '16px')
     .attr('font-weight', '700')
     .attr('text-anchor', 'middle')
     .attr('x', containerWidth / 2)
     .attr('y', 20)
     .text('本周酒店房间空置率');
  }, []);

  return (
    <svg ref={svgRef}/>
  );
};

export const D3SimplePointsChart = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const containerWidth = svgRef.current?.parentElement?.offsetWidth || 0;
    const points = [
      [5, 66],
      [7, 55],
      [4, 99],
      [11, 78],
      [28, 65],
      [7, 88],
      [5, 56],
      [2, 60],
      [4, 57],
      [6, 98],
      [27, 33],
      [26, 77],
      [23, 95],
      [34, 87],
      [7, 68],
      [1, 68],
      [2, 60],
      [22, 84],
      [6, 96],
      [13, 87]
    ];
    const margin = {
      top: 80,
      right: 60,
      bottom: 80,
      left: 60,
    };
    const width = containerWidth - margin.left - margin.right;
    const height = HEIGHT - margin.top - margin.bottom;
    const chart = d3
      .select(svgRef.current)
      .attr("width", containerWidth)
      .attr("height", HEIGHT);

    const x = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(points, d => d[0])!
      ]) 
      .range([0, width]);
      
    const y = d3
      .scaleLinear()
      .rangeRound([0, height])
      .domain([
        d3.max(points, d => d[1])!,
        0
      ]);
    
    const z = d3.scaleOrdinal(d3.schemeCategory10);  
    
    const g = chart
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);
    
    // @ts-ignore
    const tip = d3Tip()
      .attr("class", "d3-tip")
      .offset([-10, 0])
      .html((d: typeof points[number] )=> `<strong>运动年限:</strong><span style="color:#ffeb3b">${d[0]}</span><br><strong>健康指数:</strong><span style="color:#ffeb3b">${d[1]}</span>`);
      
    chart.call(tip);
    
    // x
    g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x))
      .append("text")
      .attr("x", width)
      .attr("y", 26)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .style("fill", "#000")
      .text("激烈运动年限(年)");
    
    // y
    g.append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(y))
      .append("text")
      .attr("y", -16)
      .attr("dy", "0.71em")
      .attr("text-anchor", "start")
      .style("fill", "#000")
      .text("健康指数(分)");


    g.append("g")
      .selectAll("circle")
      .attr("class", "points")
      .data(points)
      .enter()
      .append("circle")
      .on("mouseover", tip.show)
      .on("mouseout", tip.hide)
      .attr("cursor", "pointer")
      .attr("fill", d => z(`${d[1]}`))
      .attr("cx", d => x(d[0]))
      .attr("cy", d => y(d[1]))
      .attr("r", 0)
      .transition()
      .duration(750)
      .delay((_, i) => i * 10)
      .attr("r", 10);
    
    chart.append("g")
      .attr("class", "chart--title")
      .append("text")
      .attr("fill", "#000")
      .attr("font-size", "16px")
      .attr("font-wight", "700")
      .attr("text-anchor", "middle")
      .attr("x", containerWidth / 2)
      .attr("y", 20)
      .text("[模拟]激烈运动年限和健康指数关系抽样调查");  

  }, []);

  return (
    <svg ref={svgRef}/>
  );
};

export const D3ChinaMap = () => {
  const [data, setData] = useState<any>();
  const svgRef = useRef<SVGSVGElement>(null);
  
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('http://cdn.a4z.cn/json/china.geojson')
        const data = await res.json()
        setData(data);
      } catch (err) {
        console.log(err)
      }
    })();
  }, []);

  useEffect(() => {
    if (data) {
      const containerWidth = svgRef.current?.parentElement?.offsetWidth || 0;
      const margin = {
        top: 80,
        right: 20,
        bottom: 30,
        left: 60
      };
      const width = containerWidth - margin.left - margin.right
      const height = 1000 - margin.top - margin.bottom;
      let chart = d3
        .select(svgRef.current)
        .attr("width", containerWidth)
        .attr("height", height + margin.top + margin.bottom);

      const projection = d3
        .geoMercator()
        .center([107, 31])
        .scale(d3.min([width, height])!)  
        .translate([width / 2, height / 2]);
      
      const path = d3.geoPath().projection(projection);
      
      const z = d3.scaleOrdinal(d3.schemeCategory10);

      const g = chart
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`)
        .style("fill-opaciy", 0);
      
      const province = g
        .selectAll("path")
        .data(data.features)
        .enter()
        .append("path")
        .attr("stroke", "#fff")
        .attr("storke-width", 1)
        .attr("fill", (_, i) => z(`${i}`))
        .attr("d", path as any)
        .on("mouseover", function() {
          // d3.select(this).attr("fill", "ornage");
          d3.select(this).style("fill-opacity", 0.5);
        })
        .on("mouseout", function(_, i) {
          // d3.select(this).attr("fill", z(`${i}`));
          d3.select(this).style("fill-opacity", 1);
        });

      province
      .append("title")
      .text((d: any) => d.properties.name);
    
      g.transition().duration(1000).style("fill-opaicy", 1);
      
      chart
        .append("g")
        .attr("class", "bar--title")
        .append("text")
        .attr("fill", "#000")
        .attr("font-size", "16px")
        .attr("font-weight", "700")
        .attr("text-anchor", "middle")
        .attr("x", containerWidth / 2)
        .attr("y", 20)
        .text("China Map");

    }
  }, [data]);

  return (
    <svg ref={svgRef}/>
  );
};

// 流程
// 获取或添加 svg
// 生成 x轴 和 y轴 的比例尺
// 画 x轴 和 y轴
// 将轴添加到 svg

// 比例尺 important



export const D3VoronoiChart = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const containerWidth = svgRef.current?.parentElement?.offsetWidth || 0;
    const margin = { top: 40, right: 40, bottom: 40, left: 40 };
    const width = containerWidth - margin.left - margin.right;
    const height = width;

    const chart = d3
      .select(svgRef.current)
      .attr("width", containerWidth)
      .attr("height", containerWidth);

    const k = 1;
    const b = 0;
    const points = [];
    const fy = (x: number, k = 1, b = 0) => k * x + b;
    [-10, 10].forEach(item => points.push([item, fy(item, k, b)]));
    
    const x = d3
      .scaleLinear()
      .domain([-10, 10])
      .range([0, width]);

    const y = d3
      .scaleLinear()
      .domain([10, -10])
      .range([0, height]);
      
    const line = d3
      .line()
      .x(d => x(d[0]))
      .y(d => y(d[1]));
      
    const g = chart
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);
      
    g.append("g")
     .attr("class", "axis axis--x")
     .attr("transform", `translate(0, ${y(0)})`)
     .call(d3.axisBottom(x).ticks(20))
     .append("text")
     .attr("x", width)
     .attr("y", 26)
     .attr("dy", ".71em")
     .style("text-anchor", "end")
     .style("fill", "#000")
     .style("font-size", "16px")
     .text("x");
     
    g.selectAll(".axis--x .tick")
     .append("line")
     .attr("class", "bg-line")
     .attr("stroke", "rgba(0, 0, 0, 0.1)")
     .attr("shape-rendering", "crispEdges")
     .attr("transform", `translate(0, ${-y(0)})`)
     .attr("y2", height);
     
    g.append("g")
     .attr("class", "axis axis--y")
     .attr("transform", `translate(${x(0)}, 0)`)
     .call(d3.axisLeft(y).tickValues(d3.range(-10, 11)))
     .append("text")
     .attr("y", -20)
     .attr("dy", ".71em")
     .style("text-anchor", "start")
     .style("fill", "#000")
     .style("font-size", "16px")
     .text("y");
     
    g.selectAll(".axis--y .tick")
     .append("line")
     .attr("class", "bg-line")
     .attr("stroke", "rgba(0, 0, 0, 0.1)")
     .attr("shape-rendering", "crispEdges")
     .attr("transform", `translate(${-x(0)}, 0)`)
     .attr("x2", width); 
  }, []);

  return (
    <svg ref={svgRef}></svg>
  );
};

type Tuple<TItem, TLength extends number> = [TItem, ...TItem[]] & { length: TLength };

export const GoldenPoints = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const width = svgRef.current?.parentElement?.offsetWidth || HEIGHT;
    const height = width;
    const radius = 6;
    const step = radius * 2;
    const theta = Math.PI * (3 - Math.sqrt(5));
    const data = Array.from({length: 2000}, (_, i) => {
      const r = step * Math.sqrt(i += 0.5), a = theta * i;
      return [
        width / 2 + r * Math.cos(a),
        height / 2 + r * Math.sin(a)
      ];
    });

    let currentTransform: d3.ZoomView = [width / 2, height / 2, height];

    const chart = d3
      .select(svgRef.current)
      .attr("viewBox", [0, 0, width, height]);
    
    const g = chart.append("g");
    
    g.selectAll("circle")
     .data(data)
     .join("circle")
    // .enter()
    // .append("circle")
     .attr("cx", ([x]) => x)
     .attr("cy", ([, y]) => y)
     .attr("r", radius)
     .attr("fill", (d, i) => d3.interpolateRainbow(i / 360));

    const transform = ([x, y, r]: typeof currentTransform) => {
      return `
        translate(${width / 2}, ${height / 2})
        scale(${height / r})
        translate(${-x}, ${-y})
      `;
    }; 

    const transition = () => {
      const d = data[Math.floor(Math.random() * data.length)];
      const i = d3.interpolateZoom(currentTransform, [...d, radius * 2 + 1] as d3.ZoomView);
  
      g.transition()
          .delay(250)
          .duration(i.duration)
          .attrTween("transform", () => t => transform(currentTransform = i(t)))
          .on("end", transition);
    }; 

    chart.call(transition).node();
 
  }, []);

  return (
    <svg ref={svgRef}></svg>
  );
};

const COLORS = [
  "#f3e8ff",
  "#e9d5ff",
  "#d8b4fe",
  "#c084fc",
  "#a855f7",
  "#9333ea",
  "#7e22ce",
  "#6b21a8",
  "#581c87",
].reverse();

export const D3ShapeAnimation = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    const INITIAL_SIZE = width > height ? height * 0.9 : width * 0.9;

    const chart = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .style("background-color", "#181028"); 

    const rect = chart
      .selectAll("rect")
      .data(COLORS)
      .join("rect")
      .attr("x", (_, i) => width / 2 - INITIAL_SIZE * (1 - i * 0.1) / 2)
      .attr("y", (_, i) => height / 2 - INITIAL_SIZE * (1 - i * 0.1) / 2)
      .attr("width", (_, i) => INITIAL_SIZE * (1 - i * 0.1))
      .attr("height", (_, i) => INITIAL_SIZE * (1 - i * 0.1))
      .attr("fill", d => d)
      .attr("transform-origin", "center center");

    let animatedDir = -1;  
    const transition = () => {
      animatedDir = animatedDir * -1;
      rect
      .transition() 
      // .delay((_, i) => (COLORS.length - i) * 100)
      .duration(3000)
      .attr("rx", (_, i) => animatedDir === 1 ? INITIAL_SIZE * (1 - i * 0.1) / 2 : 10)
      .attr("transform", (_, i) => animatedDir === 1 ? `rotate(${30 + i * 15})` : "rotate(0)")
      .on("end", transition);
    };  

    chart.call(transition).node();
  }, []);

  return (
    <svg ref={svgRef}></svg>
  );
};

export const D3DarkLightMode = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    const chart = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      // .style()
  }, []);

  return (
    <svg ref={svgRef}></svg>
  );
};

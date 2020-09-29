// import * as d3 from "d3";

// chart = {
//   const svg = d3.create("svg")
//       .attr("viewBox", [0, 0, width, height]);

//   svg.append("g")
//       .attr("fill", color)
//     .selectAll("rect")
//     .data(data)
//     .join("rect")
//       .attr("x", (d, i) => x(i))
//       .attr("y", d => y(d.value))
//       .attr("height", d => y(0) - y(d.value))
//       .attr("width", x.bandwidth());

//   svg.append("g")
//       .call(xAxis);

//   svg.append("g")
//       .call(yAxis);

//   return svg.node();
// }
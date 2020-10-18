import * as d3 from 'd3';

function getDataForChart(arr) {
  return arr.map((item, index) => ({ 
    x: index, 
    y: item 
  }))
}

export default function createCahart({ Mas_otk, CR, To_oz }, target) {
  const height = 800
  const width = 1200
  const margin = {top: 20, right: 20, bottom: 30, left: 140}

  const svg = d3.select(target).insert('svg')
    .attr('width', width)
    .attr('height', height);
    
  const rangeX = [margin.left, width - margin.right]
  const rangeY = [height - margin.bottom, margin.top]

  const Mas_otkData = getDataForChart(Mas_otk)
  const CRData = getDataForChart(CR)
  const To_ozData = getDataForChart(new Array(CR.length).fill(To_oz))

  const xScale = d3.scaleBand()
    .domain(Mas_otkData.map(d => d.x))
    .range(rangeX)

  const yScale = d3.scaleLinear()
    .domain([d3.min(Mas_otk), d3.max(Mas_otk)])
    .range(rangeY);

  svg.append('g')
    .attr('class', "chart-Mas_ot")
    .selectAll('rect')
    .data(Mas_otkData)
    .join('rect')
    .attr('x', d => xScale(d.x))
    .attr('y', d => yScale(d.y))
    .attr('height', d => yScale(0) - yScale(d.y))
    .attr('width', xScale.bandwidth())

  svg.selectAll("line-circle")
    .data(CRData)
    .enter().append("circle")
    .attr('class', "chart-CR")
    .attr("r", 2)
    .attr("cx", d => xScale(d.x))
    .attr("cy", d => yScale(d.y))

  const To_ozLine = d3.line()
    .y(d => yScale(d.y))
    .x(d => xScale(d.x))
    .curve(d3.curveMonotoneX);

  svg.append("path")
    .attr("class", "chart-To_oz")
    .attr("d", To_ozLine(To_ozData))

  const yAxis = g => g
    .attr('transform', `translate(${margin.left},0)`)
    .call(d3.axisLeft(yScale).ticks(null, 'e'))

  const xAxis = g => g
    .attr('transform', `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(xScale).tickValues(xScale.domain().filter((_,i) => !(i%100))))

  svg.append('g')
    .call(yAxis)

  svg.append('g')
    .call(xAxis)

  svg.append("circle")
    .attr("class", "legend-circle-1")
    .attr("cx",30)
    .attr("cy",130)
    .attr("r", 6)

  svg.append("text")
    .attr("class", "legend")
    .attr("x", 40)
    .attr("y", 130)
    .text("Mas_otk")

  svg.append("circle")
    .attr("class", "legend-circle-2")
    .attr("cx",30)
    .attr("cy",160)
    .attr("r", 6)

  svg.append("text")
    .attr("class", "legend")
    .attr("x", 40)
    .attr("y", 160)
    .text("CR")

  svg.append("circle")
    .attr("class", "legend-circle-3")
    .attr("cx",30)
    .attr("cy",190)
    .attr("r", 6)

  svg.append("text")
    .attr("class", "legend")
    .attr("x", 40)
    .attr("y", 190)
    .text("To_oz")    
}
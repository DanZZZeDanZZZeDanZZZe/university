import text from '!!raw-loader!./static/data-1.txt';
import './style.css'
import mean from 'lodash/mean';
import * as d3 from 'd3';

const exp = (number) => Math.exp(number) 
const abs = (number) => Math.abs(number) 

const Icx_mass = text
  .split('\n')
  .map(i => +i)

const N = Icx_mass.length   

const Mas_otk = Icx_mass
  .filter((_, index) => !(index % 2))

const Mas_vos = Icx_mass
  .filter((_, index) => index % 2)

const To_oz = mean(Mas_otk)
const Tv_oz = mean(Mas_vos)

const Kgot_oz = To_oz / (To_oz + Tv_oz)

const K_og = Kgot_oz 
  * exp(0.3 * To_oz * (-1 / To_oz))

const P_nf = K_og 
  + (1 - Kgot_oz) 
  * (1 - exp(-Tv_oz / To_oz))
  * abs(-(0.3 * To_oz - Tv_oz) / Tv_oz)

const N_0 = Mas_otk.length

const CR = Mas_otk.reduce((result, item, index) => {
  const prevResult = index !== 1 ? result : [result]
  const prevResultItem = prevResult[index - 1]

  const resultItem = prevResultItem
    * (index / (index + 1)) 
    + (item / (index + 1))

  return [...prevResult, resultItem]
})

console.log('Icx_mass', Icx_mass)
console.log('Mas_vos', Mas_vos)

console.log('N ', N)
console.log('To_oz', To_oz)
console.log('Tv_oz', Tv_oz)
console.log('K_og', K_og)
console.log('Kgot_oz', Kgot_oz)
console.log('P_nf', P_nf)
console.log('N_0', N_0)
console.log('CR', CR)

const query = (selector) => document.querySelector(selector)
const insert = (selector, HTML) => query(selector).innerHTML = HTML

const height = 800
const width = 1200
const margin = {top: 20, right: 20, bottom: 30, left: 100}

const svg = d3.select('body').append('svg')
  .attr('width', width)
  .attr('height', height);

const rangeX = [margin.left, width - margin.right]
const rangeY = [height - margin.bottom, margin.top]

const xScale = d3.scaleBand()
  .domain(Mas_otk.map((_, index) => index))
  .range(rangeX)

const yScale = d3.scaleLinear()
  .domain([d3.min(Mas_otk), d3.max(Mas_otk)])
  .range(rangeY);

svg.append('g')
  .attr('fill', 'steelblue')
  .selectAll('rect')
  .data(Mas_otk)
  .join('rect')
  .attr('x', (_, index) => xScale(index))
  .attr('y', d => yScale(d))
  .attr('height', d => yScale(0) - yScale(d))
  .attr('width', xScale.bandwidth())

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

import text from '!!raw-loader!./static/data-3.txt'
import { printTables, printValues } from './utils'
import createCahart from './chart'
import './style.css'

const exp = number => Math.exp(number) 
const abs = number => Math.abs(number) 
const mean = arr => arr.reduce((a, b) => a + b) / arr.length

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

const values = [
  ['N', N],
  ['To_oz', To_oz],
  ['Tv_oz', Tv_oz],
  ['K_og', K_og],
  ['Kgot_oz', Kgot_oz],
  ['P_nf', P_nf],
  ['N_0', N_0],
]

const tableValues = [
  ['Icx_mass',Icx_mass],
  ['Mas_vos', Mas_vos],
  ['Mas_otk', Mas_otk],
  ['CR', CR],
]

printValues(values, ".values")
createCahart({ Mas_otk, CR, To_oz }, '.chart')
printTables(tableValues, '.result-holder')
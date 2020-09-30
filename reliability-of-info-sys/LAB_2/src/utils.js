const select = (selector) => document.querySelector(selector)
const create = (tagName) => document.createElement(tagName)

function createTable(arr) {
  const table = create("table")
  arr.slice(0, 15).forEach((item, index) => {
    const th = create('th')
    th.innerHTML = `<p>${index + 1}</p>`
    const td = create('td')
    td.innerHTML = index < 14 
      ? `${+item.toFixed(4)}`
      : '...'
    const tr = create("tr")
    tr.append(th)
    tr.append(td)
    table.append(tr)
  })
  return table
}

export function printValues(values, target) {
  values.map(item => {    
    const p = create("p")
    p.innerText = `${item[0]} = ${+item[1].toFixed(4)}`
    select(target).append(p)
  })
}

export function printTables(values, target) {
  values.map(item => {    
    const title = create('p')
    title.innerText = item[0]
    const table = createTable(item[1]) 
    select(target).append(title)
    select(target).append(table)
  })
}
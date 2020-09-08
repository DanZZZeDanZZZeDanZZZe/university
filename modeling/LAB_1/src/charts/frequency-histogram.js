const chartOptions = {
  type: 'bar',
  data: {
      datasets: [{
          label: 'Гистограмма частот',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'black',
          borderWidth: 1
      }]
  },
  options: {
      scales: {
          yAxes: [{
              ticks: {
                  beginAtZero: true
              }
          }]
      }
  }
}

function createFrequencyHistogram(hitRate) {
  const data = chartOptions.data
  data.labels = hitRate.map(({name}) => name)
  data.datasets[0].data = hitRate.map(({count}) => count)

  return chartOptions 
}

export default createFrequencyHistogram
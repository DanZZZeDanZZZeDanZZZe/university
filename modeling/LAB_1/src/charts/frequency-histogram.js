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
  data.labels = hitRate.map(i => i[0])
  data.datasets[0].data = hitRate.map(i => i[1])

  return chartOptions 
}

export default createFrequencyHistogram
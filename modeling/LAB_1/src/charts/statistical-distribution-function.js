const chartOptions = {
  type: 'bar',
  data: {
      datasets: [{
          lineTension: 0,
          label: 'Число попаданий в интервал с накоплением',
          backgroundColor: 'rgba(255, 206, 86, 0.2)',
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

function createStatisticalDistributionFunction(stackedHits) {
  const data = chartOptions.data
  data.labels = stackedHits.map(({name}) => name)
  data.datasets[0].data = stackedHits.map(({count}) => count)

  return chartOptions 
}

export default createStatisticalDistributionFunction
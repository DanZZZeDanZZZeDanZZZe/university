const chartOptions = {
  type: 'line',
  data: {
      datasets: [{
          lineTension: 0,
          label: 'Cтатистическая функция распределения',
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
  data.labels = stackedHits.map(i => i[0])
  data.datasets[0].data = stackedHits.map(i => i[1])

  return chartOptions 
}

export default createStatisticalDistributionFunction
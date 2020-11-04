const chartOptions = {
  type: 'bar',
  data: {
    datasets: [
        {
            lineTension: 0,
            label: 'Число попаданий в интервал с накоплением',
            backgroundColor: 'rgba(255, 206, 86, 0.2)',
            borderColor: 'black',
            borderWidth: 1,
        }, 
        // {
        //     label: 'Функция распределения',
        //     borderColor: 'black',
        //     borderWidth: 1,
        //     type: 'line', 
        // }
    ]
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
  const stackedHitsLength = stackedHits.length

  data.labels = stackedHits.map(({name}) => name)

  const stackedHitsCounts = stackedHits.map(({count}) => count)
  data.datasets[0].data = stackedHitsCounts
  // data.datasets[1].data = new Array(stackedHitsLength).fill(null)
  //   .map((_, index) => (index + 1) / stackedHitsLength)
  return chartOptions 
}

export default createStatisticalDistributionFunction
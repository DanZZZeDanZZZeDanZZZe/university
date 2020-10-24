const chartOptions = {
  type: 'bar',
  data: {
    datasets: [
        {
            label: 'Число попаданий в интервал',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'black',
            borderWidth: 1
        },
        // {
        //     label: 'Плотность распределения',
        //     borderColor: 'black',
        //     borderWidth: 1,
        //     type: 'line'
        // },
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

function createFrequencyHistogram(hitRate) {
  const data = chartOptions.data
  const hitRateLength = hitRate.length

  data.labels = hitRate.map(({name}) => name)
  data.datasets[0].data = hitRate.map(({count}) => count)
//   data.datasets[1].data = new Array(hitRateLength).fill(1 / hitRateLength)
  return chartOptions 
}

export default createFrequencyHistogram
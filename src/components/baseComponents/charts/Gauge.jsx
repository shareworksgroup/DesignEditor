import React from 'react'

class Gauge extends React.Component {

  constructor(props) {
    super(props)
    this.chartRef = React.createRef()
  }

  componentDidMount() {
    this.showPie()
  }

  showPie() {
    const myChart = echarts.init(this.chartRef.current)

    myChart.title = 'gauge'

    const gaugeValue = 3.5

    const option = {
      series: [{
        min: 0,
        max: 5,
        name: 'Financial Overview',
        type: 'gauge',
        radius: '85%',
        center: ['50%', '52%'],
        axisLine: {
          lineStyle: {
            color: [
              [0.6, '#fc605b'],
              [0.9, '#55B0F2'],
              [1, '#33c748']
            ],
            width: 3
          }
        },
        axisTick: {
          length: 12
        },
        detail: {
          formatter: function (val) {
            return val.toFixed(1);

          },
          textStyle: {
            fontFamily: 'Roboto, Arial, Verdana, sans-serif',
            fontSize: 30
          }
        },
        data: [{
          value: gaugeValue
        }]
      }]
    }

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option)
    this.myChart = myChart
  }

  state = {
    chartStyle: {width: '100%', height: '250px', margin: 'auto'}
  }

  resize() {
    this.myChart.resize()
  }

  onFullscreen = (isFullScreen) => {
    if (!isFullScreen) {
      this.setState({chartStyle: {width: '100%', height: '250px', margin: 'auto'}})
    } else {
      this.setState({chartStyle: {width: '100%', height: `${$(window).height() - 50}px`, margin: 'auto'}})      
    }
    setTimeout(() => {
      this.resize()
    })
  }

  render() {
    const {chartStyle} = this.state    
    return <div className="dashboard-block">
      <div style={chartStyle} ref={this.chartRef}></div>
    </div>
  }

}

export default Gauge
import React from 'react'

class Pie extends React.Component {

  constructor(props) {
    super(props)
    this.pie = React.createRef()
  }

  componentDidMount() {
    this.showPie()
  }

  showPie() {
    const myChart = echarts.init(this.pie.current)

    myChart.title = '环形图'

    const option = {
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      legend: {
        orient: 'vertical',
        x: 'left',
        data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: 'center'
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: '30',
                fontWeight: 'bold'
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [
            { value: 335, name: '直接访问' },
            { value: 310, name: '邮件营销' },
            { value: 234, name: '联盟广告' },
            { value: 135, name: '视频广告' },
            { value: 1548, name: '搜索引擎' }
          ]
        }
      ]
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
      <div style={chartStyle} ref={this.pie}></div>
    </div>
  }

}

export default Pie
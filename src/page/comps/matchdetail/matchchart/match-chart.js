import React from 'react';
import Part1 from './part1/part1.js';
import Part2 from './part2/part2.js';

class MatchChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      part1Data: [],
      part2Data: []
    }
  }
  componentDidMount() {

  }
  componentWillMount() {

  }
  componentWillReceiveProps(nextProps) {
    if (this.props.singleMatchData !== nextProps.singleMatchData) {
      if (nextProps.singleMatchData) {
        this.handleProps(nextProps.singleMatchData)
      }
    }
  }
  handleProps(data) {
    this.setState({
      // JSON对象截取，先不截了，全传过去用到啥是啥！
      part1Data: data,
      part2Data: data
    }, () => {

    })
  }
  render() {
    const {
      part1Data,
      part2Data
    } = this.state
    return (
      <div>
        <div>
          <Part1 data={part1Data} />
        </div>
        <div>
          <Part2 data={part2Data} />
        </div>
      </div>
    )
  }
}

export default MatchChart;
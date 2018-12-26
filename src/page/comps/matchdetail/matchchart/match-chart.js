import React from 'react';
import Part1 from './part1/part1.js';
import Part2 from './part2/part2.js';
import Part3 from './part3/part3.js';

class MatchChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      part1Data: [],
      part2Data: [],
      part3Data: [],
      team1Name: '',
      team2Name: ''
    }
  }
  componentDidMount() {

  }
  componentWillMount() {

  }
  componentWillReceiveProps(nextProps) {
    if (this.props.singleMatchData !== nextProps.singleMatchData) {
      if (nextProps.singleMatchData) {
        this.handleSingleMatchProps(nextProps.singleMatchData)
      }
    }
    if (this.props.playByplayData !== nextProps.playByplayData) {
      if (nextProps.playByplayData) {
        this.handleSingleMatchPlayByPlayProps(nextProps.playByplayData)
      }
    }
  }
  handleSingleMatchProps(data) {
    this.setState({
      part1Data: data,
      part2Data: data,
      team1Name: data[0]['team1Info'][1],
      team2Name: data[0]['team2Info'][1],
    }, () => {

    })
  }
  handleSingleMatchPlayByPlayProps(data) {
    this.setState({
      part3Data: data
    }, () => {

    })
  }
  render() {
    const {
      part1Data,
      part2Data,
      part3Data,
      team1Name,
      team2Name
    } = this.state
    return (
      <div>
        <div>
          <Part1 data={part1Data} />
        </div>
        <div>
          <Part3 data={part3Data} team1Name={team1Name} team2Name={team2Name}/>
        </div>
        <div>
          <Part2 data={part2Data} />
        </div>
      </div>
    )
  }
}

export default MatchChart;
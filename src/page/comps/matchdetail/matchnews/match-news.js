import React from 'react';

class MatchNews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teamHome: '',
      teamAway: ''
    }
  }
  componentDidMount() {

  }
  componentWillMount() {

  }
  componentWillReceiveProps(nextProps) {
    if (this.props.teamHome !== nextProps.teamHome && this.props.teamAway !== nextProps.teamAway) {
      if (nextProps.teamHome && nextProps.teamAway) {
        this.setState({
          teamHome: nextProps.teamHome,
          teamAway: nextProps.teamAway
        })
      }
    }
  }
  render() {
    const {
      teamHome,
      teamAway
    } = this.state
    return (
      <div>
        <p>team1: {teamHome}</p>
        <p>team2: {teamAway}</p>
      </div>
    )
  }
}

export default MatchNews;
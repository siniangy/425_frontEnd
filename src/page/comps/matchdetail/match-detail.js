import React from 'react';
import {
  Tabs,
  Skeleton
} from 'antd';
import $ from 'jquery';
import MatchNews from './matchnews/match-news.js';
import MatchChart from './matchchart/match-chart.js';
import MatchAudio from './matchaudio/match-audio.js';

const TabPane = Tabs.TabPane;

class MatchDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      singleMatchData: [],
      teamHome: '',
      teamAway: ''
    }
  }
  componentDidMount() {

  }
  componentWillMount() {

  }
  componentWillReceiveProps(nextProps) {
    if (this.props.currentUrl !== nextProps.currentUrl) {
      if (nextProps.currentUrl) {
        this.setState({
          isLoading: true
        })
        this.getSingleMatchDetail(nextProps.currentUrl)
      }
    }
  }
  getSingleMatchDetail(data) {
    const that = this;
    const postData = {
      'url': data
    }
    $.ajax({
      url: '/getSingleMatchDetail',
      type: 'post',
      dataType: 'json',
      data: postData, // 传递json
      success: data => {
        this.setState({
          singleMatchData: data,
          teamHome: data[0]['team1Info'][1].toString(),
          teamAway: data[0]['team2Info'][1].toString()
        }, () => {

        })
      },
      error: err => {
        console.log(err);
      }
    })
  }
  handleKey(key) {

  }
  render() {
    return (
      <div>
        <Tabs defaultActiveKey="1" onChange={(key) => this.handleKey(key)}>
          <TabPane tab="新闻报道" key="1" forceRender={true}>
            {this.state.isLoading ? <MatchNews teamHome={this.state.teamHome} teamAway={this.state.teamAway} /> : <Skeleton />}
          </TabPane>
          <TabPane tab="数据统计" key="2" forceRender={true}>
            {this.state.isLoading ? <MatchChart singleMatchData={this.state.singleMatchData} /> : <Skeleton />}
          </TabPane>
          <TabPane tab="视频摘要" key="3" forceRender={true}>
            {this.state.isLoading ? <MatchAudio /> : <Skeleton />}
          </TabPane>
        </Tabs>
      </div>
    )
  }
}

export default MatchDetail;
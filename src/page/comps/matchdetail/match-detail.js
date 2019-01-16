import React from 'react';
import {
  Tabs,
  Skeleton,
  BackTop
} from 'antd';
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
      playByplayData: [],
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
        this.getSingleMatchPlayByPlay(nextProps.currentUrl)
      }
    }
  }
  getSingleMatchPlayByPlay(data) {
    const that = this;
    const postData = {
      'url': data
    }
    $.ajax({
      url: '/getSingleMatchPlayByPlay',
      type: 'post',
      dataType: 'json',
      data: postData,
      success: data => {
        this.setState({
          playByplayData: data
        }, () => {

        })
      },
      error: err => {
        console.log(err);
      }
    })
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
      data: postData,
      success: data => {
        this.setState({
          singleMatchData: data,
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
      <BackTop />
        <Tabs defaultActiveKey="1" onChange={(key) => this.handleKey(key)}>
          <TabPane tab="新闻报道" key="1" forceRender={true}>
            {this.state.isLoading ? <MatchNews /> : <Skeleton />}
          </TabPane>
          <TabPane tab="数据统计" key="2" forceRender={true}>
            {this.state.isLoading ? <MatchChart singleMatchData={this.state.singleMatchData} playByplayData={this.state.playByplayData}/> : <Skeleton />}
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
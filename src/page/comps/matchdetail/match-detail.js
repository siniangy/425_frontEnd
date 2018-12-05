import React from 'react';
import {
  Tabs
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
      chartData: [],
    }
  }
  componentDidMount() {

  }
  componentWillMount() {

  }
  componentWillReceiveProps(nextProps) {
    if (this.props.currentUrl !== nextProps.currentUrl) {
      if (nextProps.currentUrl) {
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
        console.log(data);
      },
      error: err => {
        console.log(err);
      }
    })
  }
  handleKey(key) {
    console.log(key)
  }
  render() {
    return (
      <div>
        <Tabs defaultActiveKey="1" onChange={(key) => this.handleKey(key)}>
          <TabPane tab="新闻报道" key="1">
          <MatchNews />
          </TabPane>
          <TabPane tab="数据统计" key="2">
          <MatchChart />
          </TabPane>
          <TabPane tab="视频摘要" key="3">
          <MatchAudio />
          </TabPane>
        </Tabs>
      </div>
    )
  }
}

export default MatchDetail;
import React from 'react';
import {
  Select,
  Button,
  Layout,
  Menu,
  Icon
} from 'antd';
import $ from 'jquery';
import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom";
import MatchList from './comps/matchlist/match-list.js';
import MatchDetail from './comps/matchdetail/match-detail.js';
import './style/index.less'

const Option = Select.Option;
const {
  SubMenu
} = Menu;
const {
  Header,
  Content,
  Sider
} = Layout;

class NewsVisualization extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      year: '2015',
      month: '01',
      day: '01',
      dateParams: '',
      matchContent: [],
      matchUrl: [],
      currentMatch: '',
      currentUrl: ''
    }
  }
  componentDidMount() {

  }
  componentWillMount() {

  }
  getMatchItems(data) {
    const that = this;
    const postData = {
      'date': data
    }
    $.ajax({
      url: '/getMatchItems',
      type: 'post',
      dataType: 'json',
      data: postData, // 传递json
      success: data => {
        this.setState({
          matchContent: data[0]['content'],
          matchUrl: data[0]['url']
        })
      },
      error: err => {
        console.log(err);
      }
    })
  }
  handleYearChange(value) {
    this.setState({
      year: value
    }, () => {

    })
  }
  handleMonthChange(value) {
    this.setState({
      month: value
    }, () => {

    })
  }
  handleDayChange(value) {
    this.setState({
      day: value
    }, () => {

    })
  }
  handleClick() {
    // const that = this;
    this.setState({
      dateParams: this.state.year.toString() + '-' + this.state.month.toString() + '-' + this.state.day.toString(),
      mainContentShow: true
    }, () => {
      this.getMatchItems(this.state.dateParams);
    })
  }
  handleMatchDetail(e) {
    this.setState({
      currentUrl: e.target.innerHTML.split('</span>')[0].split('">')[1],
      currentMatch: e.target.innerHTML.split('</span>')[1]
    }, () => {

    })
  }

  render() {
    const {
      year,
      month,
      day
    } = this.state;
    const PandaSvg = () => (
      <svg viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor">
        <path d="M99.096 315.634s-82.58-64.032-82.58-132.13c0-66.064 33.032-165.162 148.646-148.646 83.37 11.91 99.096 165.162 99.096 165.162l-165.162 115.614zM924.906 315.634s82.58-64.032 82.58-132.13c0-66.064-33.032-165.162-148.646-148.646-83.37 11.91-99.096 165.162-99.096 165.162l165.162 115.614z" fill="#6B676E" p-id="1143" />
        <path d="M1024 561.548c0 264.526-229.23 429.42-512.002 429.42S0 826.076 0 561.548 283.96 66.064 512.002 66.064 1024 297.022 1024 561.548z" fill="#333" p-id="1144" />
        <path d="M330.324 842.126c0 82.096 81.34 148.646 181.678 148.646s181.678-66.55 181.678-148.646H330.324z" fill="#333" p-id="1145" />
        <path d="M644.13 611.098C594.582 528.516 561.55 512 512.002 512c-49.548 0-82.58 16.516-132.13 99.096-42.488 70.814-78.73 211.264-49.548 247.742 66.064 82.58 165.162 33.032 181.678 33.032 16.516 0 115.614 49.548 181.678-33.032 29.18-36.476-7.064-176.93-49.55-247.74z" fill="#FFFFFF" p-id="1146" />
    <path d="M611.098 495.484c0-45.608 36.974-82.58 82.58-82.58 49.548 0 198.194 99.098 198.194 165.162s-79.934 144.904-148.646 99.096c-49.548-33.032-132.128-148.646-132.128-181.678zM412.904 495.484c0-45.608-36.974-82.58-82.58-82.58-49.548 0-198.194 99.098-198.194 165.162s79.934 144.904 148.646 99.096c49.548-33.032 132.128-148.646 132.128-181.678z" fill="#6B676E" p-id="1147" />
    <path d="M512.002 726.622c-30.06 0-115.614 5.668-115.614 33.032 0 49.638 105.484 85.24 115.614 82.58 10.128 2.66 115.614-32.944 115.614-82.58-0.002-27.366-85.556-33.032-115.614-33.032z" fill="#333" p-id="1148" />
        <path d="M330.324 495.484m-33.032 0a33.032 33.032 0 1 0 66.064 0 33.032 33.032 0 1 0-66.064 0Z" fill="#333" p-id="1149" />
        <path d="M693.678 495.484m-33.032 0a33.032 33.032 0 1 0 66.064 0 33.032 33.032 0 1 0-66.064 0Z" fill="#333" p-id="1150" />
      </svg>
    );
    const PandaIcon = props => (
      <Icon component={PandaSvg} {...props} />
    );
    return (
      <div>
        <Layout>
          <Header className='header'>
            <Menu
              theme='dark'
              mode='horizontal'
              style={{lineHeight: '64px'}}
            >
              <Menu.Item style={{backgroundColor: 'rgba(0,21,41,1)'}}>
                  <Router>
                    <Link to="/">
                      <img src="/images/logocp.png" style={{marginLeft: '-40px',marginRight: '50px'}}/>
                    </Link>
                  </Router>
              </Menu.Item>
              <Menu.Item style={{backgroundColor: 'rgba(0,21,41,1)'}}>
                  {/*<PandaIcon style={{ fontSize: '40px',marginRight: '30px'}} />*/}
                  <span>请选择日期： </span>
                  <Select defaultValue={this.state.year} style={{ width: 240 }} onChange={(value) => this.handleYearChange(value)}>
                  <Option value="2015">2015</Option>
                  <Option value="2016">2016</Option>
                  <Option value="2017">2017</Option>
                  </Select>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <Select defaultValue={this.state.month} style={{ width: 240 }} onChange={(value) => this.handleMonthChange(value)}>
                    <Option value="01">1</Option>
                    <Option value="02">2</Option>
                    <Option value="03">3</Option>
                    <Option value="04">4</Option>
                    <Option value="05">5</Option>
                    <Option value="06">6</Option>
                    <Option value="07">7</Option>
                    <Option value="08">8</Option>
                    <Option value="09">9</Option>
                    <Option value="10">10</Option>
                    <Option value="11">11</Option>
                    <Option value="12">12</Option>
                  </Select>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <Select defaultValue={this.state.day} style={{ width: 240 }} onChange={(value) => this.handleDayChange(value)}>
                    <Option value="01">1
                    </Option><Option value="02">2
                    </Option><Option value="03">3
                    </Option><Option value="04">4
                    </Option><Option value="05">5
                    </Option><Option value="06">6
                    </Option><Option value="07">7
                    </Option><Option value="08">8
                    </Option><Option value="09">9
                    </Option><Option value="10">10
                    </Option><Option value="11">11
                    </Option><Option value="12">12
                    </Option><Option value="13">13
                    </Option><Option value="14">14
                    </Option><Option value="15">15
                    </Option><Option value="16">16
                    </Option><Option value="17">17
                    </Option><Option value="18">18
                    </Option><Option value="19">19
                    </Option><Option value="20">20
                    </Option><Option value="21">21
                    </Option><Option value="22">22
                    </Option><Option value="23">23
                    </Option><Option value="24">24
                    </Option><Option value="25">25
                    </Option><Option value="26">26
                    </Option><Option value="27">27
                    </Option><Option value="28">28
                    </Option><Option value="29">29
                    </Option><Option value="30">30
                    </Option><Option value="31">31
                    </Option>
                  </Select>
                  &nbsp;&nbsp;&nbsp;&nbsp;
              </Menu.Item>
              <Menu.Item style={{backgroundColor: 'rgba(0,21,41,1)'}}>
                  <Router>
                    <Link to='/match'>
                      <Button type="primary" shape="circle" icon="search" onClick={() => this.handleClick()}/>
                    </Link>
                  </Router>
              </Menu.Item>
            </Menu>
          </Header>
          <Layout>
              <Sider width={200} style={{marginTop: '10px'}}>
                <Menu
                  mode="inline"
                  style={{ height: '100%', borderRight: 0, padding:'10px 10px 10px 5px' }}
                >
                  <MatchList matchContent={this.state.matchContent} matchUrl={this.state.matchUrl} handleMatchDetail={this.handleMatchDetail.bind(this)}/>
                </Menu>
              </Sider>
              <Layout style={{ padding: '0 24px 24px',marginTop: 10 }}>
                <Content style={{ background: '#fff', padding: 24, minHeight: 1500 }}>
                  <MatchDetail currentUrl={this.state.currentUrl} currentMatch={this.state.currentMatch} />
                </Content>
              </Layout>
          </Layout>
        </Layout>
      </div>
    )
  }
}

export default NewsVisualization;
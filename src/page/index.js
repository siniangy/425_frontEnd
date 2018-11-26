import React from 'react';
import {
  Select,
  Button
} from 'antd';
import $ from 'jquery';

import './style/index.less'

const Option = Select.Option;

class NewsVisualization extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true,
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      day: new Date().getDate(),
      dateParams: '',
      mainContentShow: false
    }
  }
  componentDidMount() {

  }
  componentWillMount() {

  }
  _getMatchItems(date) {
    const that = this;
    const postData = {
      date: date
    }
    $.ajax({
      url: '/getMatchItems',
      type: 'post',
      dataType: 'json',
      data: postData,
      success: data => {
        console.log(data);
      },
      error: err => {
        console.log(err);
      }
    })
  }

  show(data) {
    console.log('1111111111' + data)
  }
  handleYearChange(value) {
    this.setState({
      year: value
    }, () => {
      console.log(this.state.year);
    })
  }
  handleMonthChange(value) {
    this.setState({
      month: value
    }, () => {
      console.log(this.state.month);
    })
  }
  handleDayChange(value) {
    this.setState({
      day: value
    }, () => {
      console.log(this.state.day);
    })
  }
  handleClick() {
    // const that = this;
    this.setState({
      dateParams: this.state.year.toString() + this.state.month.toString() + this.state.day.toString(),
      mainContentShow: true
    }, () => {
      console.log(this.state.dateParams);
      this.show(this.state.dateParams);
      this._getMatchItems(this.state.dateParams);
    })
  }
  render() {
    const {
      year,
      month,
      day
    } = this.state;
    return (
      <div>
        <div className="datePicker"> 
          <span>请选择日期：</span>
          <Select defaultValue={this.state.year} style={{ width: 240 }} onChange={(value) => this.handleYearChange(value)}>
          <Option value="2015">2015</Option>
          <Option value="2016">2016</Option>
          <Option value="2017">2017</Option>
          <Option value="2018">2018</Option>
          </Select>
          <Select defaultValue={this.state.month} style={{ width: 240 }} onChange={(value) => this.handleMonthChange(value)}>
            <Option value="1">JANUARY</Option>
            <Option value="2">FEBRUARY</Option>
            <Option value="3">MARCH</Option>
            <Option value="4">APRIL</Option>
            <Option value="5">MAY</Option>
            <Option value="6">JUNE</Option>
            <Option value="7">JULY</Option>
            <Option value="8">AUGUST</Option>
            <Option value="9">SEPTEMBER</Option>
            <Option value="10">OCTOBER</Option>
            <Option value="11">NOVEMBER</Option>
            <Option value="12">DECEMBER</Option>
          </Select>
          <Select defaultValue={this.state.day} style={{ width: 240 }} onChange={(value) => this.handleDayChange(value)}>
            <Option value="1">1
            </Option><Option value="2">2
            </Option><Option value="3">3
            </Option><Option value="4">4
            </Option><Option value="5">5
            </Option><Option value="6">6
            </Option><Option value="7">7
            </Option><Option value="8">8
            </Option><Option value="9">9
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
          <Button type="primary" shape="circle" icon="search" onClick={() => this.handleClick()}/>
        </div>
        <div className="mainContent" style={{display: this.state.mainContentShow ? 'block' : 'none'}}>
          <div className="matchList">
          </div>
          <div className="matchDetail">
          </div>
        </div>
      </div>
    )
  }
}

export default NewsVisualization;
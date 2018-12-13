import React from 'react';
import {
  Table
} from 'antd';

class Part2Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teamDetail: []
    }
  }
  componentDidMount() {

  }
  componentWillMount() {

  }
  componentWillReceiveProps(nextProps) {
    if (this.props.teamDetail != nextProps.teamDetail) {
      if (nextProps.teamDetail) {
        this.setState({
          teamDetail: nextProps.teamDetail
        }, () => {

        })
      }
    }
  }
  render() {
    const {
      teamDetail
    } = this.state
    const dataSource = teamDetail;

    const columns = [{
      title: '球员',
      dataIndex: '0',
      key: '0',
      width: 200
    }, {
      title: '首发',
      dataIndex: '1',
      key: '1',
      width: 100
    }, {
      title: '时间',
      dataIndex: '2',
      key: '2',
      width: 100
    }, {
      title: '投篮%',
      dataIndex: '3',
      key: '3',
      width: 100
    }, {
      title: '命中',
      dataIndex: '4',
      key: '4',
      width: 100
    }, {
      title: '出手',
      dataIndex: '5',
      key: '5',
      width: 100
    }, {
      title: '三分%',
      dataIndex: '6',
      key: '6',
      width: 100
    }, {
      title: '命中',
      dataIndex: '7',
      key: '7',
      width: 100
    }, {
      title: '出手',
      dataIndex: '8',
      key: '8',
      width: 100
    }, {
      title: '罚球%',
      dataIndex: '9',
      key: '9',
      width: 100
    }, {
      title: '命中',
      dataIndex: '10',
      key: '10',
      width: 100
    }, {
      title: '出手',
      dataIndex: '11',
      key: '11',
      width: 100
    }, {
      title: '真实命中%',
      dataIndex: '12',
      key: '12',
      width: 100
    }, {
      title: '篮板',
      dataIndex: '13',
      key: '13',
      width: 100
    }, {
      title: '前场',
      dataIndex: '14',
      key: '14',
      width: 100
    }, {
      title: '后场',
      dataIndex: '15',
      key: '15',
      width: 100
    }, {
      title: '助攻',
      dataIndex: '16',
      key: '16',
      width: 100
    }, {
      title: '抢断',
      dataIndex: '17',
      key: '17',
      width: 100
    }, {
      title: '盖帽',
      dataIndex: '18',
      key: '18',
      width: 100
    }, {
      title: '失误',
      dataIndex: '19',
      key: '19',
      width: 100
    }, {
      title: '犯规',
      dataIndex: '20',
      key: '20',
      width: 100
    }, {
      title: '得分',
      dataIndex: '21',
      key: '21',
      width: 100
    }];
    return (
      <div>
        <Table dataSource={dataSource} columns={columns}  pagination={false} scroll={{ x: 2500, y: 500 }} bordered/>
      </div>
    )
  }
}

export default Part2Table;
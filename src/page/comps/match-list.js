import React from 'react';
import {
  AutoComplete,
  Button,
  Icon,
  Input
} from 'antd';
import MatchItem from './match-item';

class MatchList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  componentDidMount() {

  }
  componentWillMount() {

  }
  render() {
    const matchContent = this.props.matchContent;
    const matchUrl = this.props.matchUrl;
    const matchItems = matchContent.map((item, index) => {
      return (
        <MatchItem
          key={index} 
          content={item} 
        />
      )
    });
    return (
      <div>
        <AutoComplete
            dataSource={matchContent}
            style={{width: 150,marginTop:10,marginBottom:20,marginLeft:15}}
            onSearch={this.handleSearch}
            placeholder="搜索比赛"
        />
        { matchItems }        
      </div>
    )
  }
}

export default MatchList;
import React from "react";

class MatchItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      home: "",
      visit: ""
    };
  }
  componentDidMount() { }
  componentWillMount() {
    this.homeDeal(this.props.content.split('-')[0].split(''));
    this.visitDeal(this.props.content.split('-')[1].split(''));
  }
  homeDeal(data) {
    let d1 = [];
    let d2 = [];
    const changeHome = {
      '篮网': 'BKN',
      '魔术': 'ORL',
      '凯尔特人': 'BOS',
      '凯尔特': 'BOS',
      '马刺': 'SAS',
      '骑士': 'CLE',
      '黄蜂': 'CHA',
      '活塞': 'DET',
      '快船': 'LAC',
      '勇士': 'GSW',
      '太阳': 'PHO',
      '火箭': 'HOU',
      '步行者': 'IND',
      '爵士': 'UTA',
      '湖人': 'LAL',
      '独行侠': 'DAL',
      '灰熊': 'MEM',
      '老鹰': 'ATL',
      '雄鹿': 'MIL',
      '雷霆': 'OKC',
      '森林狼': 'MIN',
      '奇才': 'WAS',
      '尼克斯': 'NYK',
      '掘金': 'DEN',
      '开拓者': 'POR',
      '鹈鹕': 'NOH',
      '国王': 'SAC',
      '热火': 'MIA',
      '猛龙': 'TOR',
      '76人': 'PHI',
      '公牛': 'CHI'
    }
    let num = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    for (let i in data) {
      if (num.indexOf(data[i]) === -1) {
        d1.push(data[i])
      } else {
        d2.push(data[i])
      }
    }
    this.setState({
      home: changeHome[d1.join('')] + d2.join('')
    })
  }
  visitDeal(data) {
    let d1 = [];
    let d2 = [];
    const changeVisit = {
      '篮网': 'BKN',
      '魔术': 'ORL',
      '凯尔特人': 'BOS',
      '凯尔特': 'BOS',
      '马刺': 'SAS',
      '骑士': 'CLE',
      '黄蜂': 'CHA',
      '活塞': 'DET',
      '快船': 'LAC',
      '勇士': 'GSW',
      '太阳': 'PHO',
      '火箭': 'HOU',
      '步行者': 'IND',
      '爵士': 'UTA',
      '湖人': 'LAL',
      '独行侠': 'DAL',
      '灰熊': 'MEM',
      '老鹰': 'ATL',
      '雄鹿': 'MIL',
      '雷霆': 'OKC',
      '森林狼': 'MIN',
      '奇才': 'WAS',
      '尼克斯': 'NYK',
      '掘金': 'DEN',
      '开拓者': 'POR',
      '鹈鹕': 'NOH',
      '国王': 'SAC',
      '热火': 'MIA',
      '猛龙': 'TOR',
      '76人': 'PHI',
      '公牛': 'CHI'
    }
    let num = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    for (let i in data) {
      if (num.indexOf(data[i]) !== -1) {
        d1.push(data[i])
      } else {
        d2.push(data[i])
      }
    }
    this.setState({
      visit: d1.join('') + changeVisit[d2.join("")]
    }, () => {
    })
  }
  render() {
    return (
      <div>
        <div
          style={{
            marginBottom: 30,
            color: "#333",
            border: "20px solid #87cefa",
            borderRadius: "20px",
            textAlign: "center",
            cursor: "pointer"
          }}
          onClick={this.props.handleMatchDetail}
        >
          <span style={{ display: "none" }}>{this.props.url}</span>
          {this.state.home + '-' + this.state.visit}
        </div>
      </div>
    );
  }
}

export default MatchItem;

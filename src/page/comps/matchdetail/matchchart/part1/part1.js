import React from "react";
import { Row, Col, Modal } from "antd";
import Part1Chart from "./scoreChart.js";
import Chart from "./knowledgeMap.js";

class Part1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      team1Name: "",
      team1Home: "",
      team1NowRecord: "",
      team1Img: "",
      team1Score: "",
      team2Name: "",
      team2Home: "",
      team2NowRecord: "",
      team2Img: "",
      team2Score: "",
      team1Sum: 0,
      team2Sum: 0,
      modalVisible: false,
      modalTarget: "",
      isLoading: false,
      width: -1
    };
  }
  componentDidMount() {
    this.handleReSize();
    window.addEventListener("resize", this.handleReSize.bind(this));
  }
  componentWillMount() { }
  componentWillUnmount() {
    window.removeEventListener("resize", this.handleReSize.bind(this));
  }
  handleReSize() {
    let test = document.getElementById("part1");
    this.setState({ width: test.clientWidth });
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.data !== nextProps.data) {
      if (nextProps.data) {
        this.setState({ isLoading: true });
        this.handleProps(nextProps.data);
      }
    }
  }
  handleTeamSum(data) {
    let res = 0;
    for (let i = 0; i < data.length; i++) {
      res += parseInt(data[i]);
    }
    return res;
  }
  handleProps(data) {
    const changeName = {
      '布鲁克林篮网': 'BKN',
      '奥兰多魔术': 'ORL',
      '波士顿凯尔特人': 'BOS',
      '圣安东尼奥马刺': 'SAS',
      '克里夫兰骑士': 'CLE',
      '夏洛特黄蜂': 'CHA',
      '底特律活塞': 'DET',
      '洛杉矶快船': 'LAC',
      '金州勇士': 'GSW',
      '菲尼克斯太阳': 'PHO',
      '休斯顿火箭': 'HOU',
      '印第安纳步行者': 'IND',
      '犹他爵士': 'UTA',
      '洛杉矶湖人': 'LAL',
      '达拉斯独行侠': 'DAL',
      '孟菲斯灰熊': 'MEM',
      '亚特兰大老鹰': 'ATL',
      '密尔沃基雄鹿': 'MIL',
      '俄克拉荷马雷霆': 'OKC',
      '明尼苏达森林狼': 'MIN',
      '华盛顿奇才': 'WAS',
      '纽约尼克斯': 'NYK',
      '丹佛掘金': 'DEN',
      '波特兰开拓者': 'POR',
      '新奥尔良鹈鹕': 'NOH',
      '萨克拉门托国王': 'SAC',
      '迈阿密热火': 'MIA',
      '多伦多猛龙': 'TOR',
      '费城76人': 'PHI',
      '芝加哥公牛': 'CHI'
    }
    const changeHome = {
      '客场': 'Away Court',
      '主场': 'Home Court'
    }
    this.setState(
      {
        team1Name: changeName[data[0]["team1Info"][1]],
        team1Home: changeHome[data[0]["team1Home"][1]],
        team1NowRecord: data[0]["team1Info"][2].split('绩')[1].split('胜')[0]+'W-'+data[0]["team1Info"][2].split('绩')[1].split('胜')[1].split('负')[0]+'L',
        team1Img: data[0]["team1Info"][0],
        team1Score: data[0]["team1Score"],
        team2Name: changeName[data[0]["team2Info"][1]],
        team2Home: changeHome[data[0]["team2Home"][1]],
        team2NowRecord: data[0]["team2Info"][2].split('绩')[1].split('胜')[0]+'W-'+data[0]["team2Info"][2].split('绩')[1].split('胜')[1].split('负')[0]+'L',
        team2Img: data[0]["team2Info"][0],
        team2Score: data[0]["team2Score"],
        team1Sum: this.handleTeamSum(data[0]["team1Score"]),
        team2Sum: this.handleTeamSum(data[0]["team2Score"])
      },
      () => { }
    );
  }
  handleMapTarget(e) {
    this.setState({ modalTarget: e });
  }
  handleModal(e) {
    const changeTarget = {
      '布鲁克林篮网': 'BKN',
      '奥兰多魔术': 'ORL',
      '波士顿凯尔特人': 'BOS',
      '圣安东尼奥马刺': 'SAS',
      '克里夫兰骑士': 'CLE',
      '夏洛特黄蜂': 'CHA',
      '底特律活塞': 'DET',
      '洛杉矶快船': 'LAC',
      '金州勇士': 'GSW',
      '菲尼克斯太阳': 'PHO',
      '休斯顿火箭': 'HOU',
      '印第安纳步行者': 'IND',
      '犹他爵士': 'UTA',
      '洛杉矶湖人': 'LAL',
      '达拉斯独行侠': 'DAL',
      '孟菲斯灰熊': 'MEM',
      '亚特兰大老鹰': 'ATL',
      '密尔沃基雄鹿': 'MIL',
      '俄克拉荷马雷霆': 'OKC',
      '明尼苏达森林狼': 'MIN',
      '华盛顿奇才': 'WAS',
      '纽约尼克斯': 'NYK',
      '丹佛掘金': 'DEN',
      '波特兰开拓者': 'POR',
      '新奥尔良鹈鹕': 'NOH',
      '萨克拉门托国王': 'SAC',
      '迈阿密热火': 'MIA',
      '多伦多猛龙': 'TOR',
      '费城76人': 'PHI',
      '芝加哥公牛': 'CHI'
    }
    let target = ''
    for(let key in changeTarget) {
      if(changeTarget[key] === e.target.innerHTML) {
        target = key+'队'
      }
    }
    this.setState(
      {
        modalVisible: true,
        modalTarget: target
      },
      () => { }
    );
  }
  handleOk(e) {
    this.setState({ modalVisible: false });
  }
  handleCancel(e) {
    this.setState({ modalVisible: false });
  }
  render() {
    const {
      team1Name,
      team1Home,
      team1NowRecord,
      team1Img,
      team1Score,
      team2Name,
      team2Home,
      team2NowRecord,
      team2Img,
      team2Score,
      modalTarget,
    } = this.state;
    return (
      <div
        style={{
          border: "2px solid rgba(240,242,245,1)",
          borderRadius: "10px",
          padding: "10px",
          minHeight: "150px",
          overflow: "auto"
        }}
      >
        <Row
          style={{
            minWidth: "800px"
          }}
        >
          <Col
            span={6}
            style={{
              minWidth: "200px"
            }}
          >
            <Row>
              <Col
                span={12}
                style={{
                  border: "2px solid rgba(240,242,245,1)",
                  borderRadius: "10px",
                  padding: "10px"
                }}
              >
                <h3>
                  <b
                    onClick={e => this.handleModal(e)}
                    style={{
                      cursor: "pointer",
                      color: "rgba(24,144,255,1)"
                    }}
                  >
                    {team1Name}
                  </b>
                </h3>
                <Modal
                  title={modalTarget}
                  visible={this.state.modalVisible}
                  onOk={e => this.handleOk(e)}
                  onCancel={e => this.handleCancel(e)}
                  footer={null}
                  bodyStyle={{ background: "rgba(255,255,180,0.1)" }}
                >
                  <Chart
                    target={modalTarget}
                    handleMapTarget={this.handleMapTarget.bind(this)}
                  />
                </Modal>
                <h4
                  style={{
                    margin: "20px 0"
                  }}
                >
                  <b>{team1Home}</b>
                </h4>
                <h4>
                  <b>{team1NowRecord}</b>
                </h4>
              </Col>
              <Col
                span={12}
                style={{
                  padding: "20px 10px"
                }}
              >
                <img
                  src={team1Img}
                  style={{
                    width: "100%",
                    marginTop: "0px"
                  }}
                />
              </Col>
            </Row>
          </Col>
          <Col
            span={12}
            style={{
              padding: "0px 20px",
              minWidth: "400px"
            }}
            id="part1"
          >
            <Part1Chart
              team1Name={team1Name}
              team2Name={team2Name}
              team1Score={team1Score}
              team2Score={team2Score}
              width={this.state.width}
            />
          </Col>
          <Col
            span={6}
            style={{
              minWidth: "200px"
            }}
          >
            <Row>
              <Col
                span={12}
                style={{
                  padding: "0px 10px"
                }}
              >
                <img
                  src={team2Img}
                  style={{
                    marginTop: "20px",
                    width: "100%"
                  }}
                />
              </Col>
              <Col
                span={12}
                style={{
                  border: "2px solid rgba(240,242,245,1)",
                  borderRadius: "10px",
                  padding: "10px"
                }}
              >
                <h3>
                  <b
                    onClick={e => this.handleModal(e)}
                    style={{
                      cursor: "pointer",
                      color: "rgba(24,144,255,1)"
                    }}
                  >
                    {team2Name}
                  </b>
                </h3>
                <h4
                  style={{
                    margin: "20px 0"
                  }}
                >
                  <b>{team2Home}</b>
                </h4>
                <h4>
                  <b>{team2NowRecord}</b>
                </h4>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Part1;

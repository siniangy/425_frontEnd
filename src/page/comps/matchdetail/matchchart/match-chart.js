import React from "react";
import { Drawer, Input } from "antd";
import Part1 from "./part1/part1.js";
import Part2 from "./part2/part2.js";
import Part3 from "./part3/part3.js";
import { Segment, useDefault } from "segmentit";

const Search = Input.Search;
class MatchChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      part1Data: [],
      part2Data: [],
      part3Data: [],
      team1Name: "",
      team2Name: "",
      drawerVisible: false, // 问答系统
      systemSearchValue: "", // 问答系统
      systemShowData: "" // 问答系统
    };
  }
  componentDidMount() {}
  componentWillMount() {
    // this.show(); 测试Segmentit
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.singleMatchData !== nextProps.singleMatchData) {
      if (nextProps.singleMatchData) {
        this.handleSingleMatchProps(nextProps.singleMatchData);
      }
    }
    if (this.props.playByplayData !== nextProps.playByplayData) {
      if (nextProps.playByplayData) {
        this.handleSingleMatchPlayByPlayProps(nextProps.playByplayData);
      }
    }
  }
  show() {
    const segmentit = useDefault(new Segment());
    const result = segmentit.doSegment("詹姆斯·哈登的本场表现");
    console.log(result);
  }
  getKnowledgeMapData(url) {
    $.ajax({
      url: url,
      type: "get",
      dataType: "json",
      success: data => {
        this.setState(
          {
            systemShowData: data["data"]["desc"]
          },
          () => {}
        );
      },
      error: err => {
        console.log(err);
      }
    });
  }
  handleSingleMatchProps(data) {
    this.setState(
      {
        part1Data: data,
        part2Data: data,
        team1Name: data[0]["team1Info"][1],
        team2Name: data[0]["team2Info"][1]
      },
      () => {}
    );
  }
  handleSingleMatchPlayByPlayProps(data) {
    this.setState(
      {
        part3Data: data
      },
      () => {}
    );
  }
  handleQASystem() {
    this.setState(
      {
        drawerVisible: true
      },
      () => {}
    );
  }
  handleQASystemClose() {
    this.setState(
      {
        drawerVisible: false
      },
      () => {}
    );
  }
  handleSearchValue(value) {
    this.setState(
      {
        systemSearchValue: value
      },
      () => {
        console.log(this.state.systemSearchValue);
        this.getKnowledgeMapData(
          "https://api.ownthink.com/kg/knowledge?entity=" + value.toString()
        );
      }
    );
  }
  render() {
    const {
      part1Data,
      part2Data,
      part3Data,
      team1Name,
      team2Name
    } = this.state;
    const content = (
      <div>
        <p style={{ textIndent: "2em" }}>
          欢迎进入小Q的智能问答系统
        </p>
        <p style={{ textIndent: "2em" }}>
          这里是问题的答案（输入问题后点击搜索按钮）：
        </p>
        <p style={{ textIndent: "2em" }}>{this.state.systemShowData}</p>
      </div>
    );
    return (
      <div>
        <div>
          <Drawer
            title="欢迎进入425篮球知识问答系统"
            placement="left"
            closable={false}
            onClose={() => this.handleQASystemClose()}
            visible={this.state.drawerVisible}
          >
            <Search
              placeholder="input search text"
              onSearch={value => this.handleSearchValue(value)}
              enterButton
              style={{ marginBottom: "20px" }}
            />
            {content}
          </Drawer>
          <img
            src="/images/QA.png"
            style={{
              position: "fixed",
              bottom: "100px",
              right: "20px",
              width: "150px",
              height: "150px",
              zIndex: "100",
              cursor: "pointer"
            }}
            onClick={() => this.handleQASystem()}
          />
        </div>
        <div>
          <Part1 data={part1Data} />
        </div>
        <div>
          <Part2 data={part2Data} />
        </div>
        <div>
          <Part3 data={part3Data} team1Name={team1Name} team2Name={team2Name} />
        </div>
      </div>
    );
  }
}

export default MatchChart;

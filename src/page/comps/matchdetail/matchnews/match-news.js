import React from "react";
import { Tooltip, Popover } from "antd";
import Chart from "./newsMap.js";
import "./news.css";

class MatchNews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalTarget: "",
      showData: ""
    };
  }
  componentDidMount() { }
  componentWillMount() { }
  componentWillReceiveProps(nextProps) { }
  handleModal(e) {
    this.setState(
      {
        modalTarget: e.target.innerHTML
      },
      () => { }
    );
  }
  render() {
    const { modalTarget, showData } = this.state;
    const team1Desc = (
      <p style={{ textIndent: "2em" }}>
        洛杉矶湖人队（Los Angeles
        Lakers）是一个位于美国加利福尼亚州洛杉矶的篮球俱乐部，1947年成立于明尼阿波利斯，1960年搬迁到了洛杉矶。
      </p>
    );
    const team2Desc = (
      <p style={{ textIndent: "2em" }}>
        波特兰开拓者队（Portland Trail
        Blazers）于1970年成立并加盟NBA，是一支属于美国的俄勒冈州波特兰市的球队，也是美国男篮职业联赛（NBA）西部联盟西北赛区的一部分。
      </p>
    );
    const team3Desc = (
      <p style={{ textIndent: "2em" }}>
        比赛时间在2018-10-19,主客队总比分128-119,单节比分分别为第一节34-31,第二节31-32,第三节28-28,第四节35-28
      </p>
    );
    const content = <Chart target={modalTarget} />;
    return (
      <div>
        <div>
          <iframe
            style={{ width: "100%", border: "0px", height: "500px" }}
            sandbox="allow-scripts allow-forms allow-same-origin"
            scrolling="auto"
            src="/html/lunbo.html"
          />
        </div>
        <div style={{ display: "block" }}>
          {/*}<div style={{ width: "100%", textAlign: "center" }}>
            <img src="/images/news.jpg" style={{}} />
          </div>*/}
          <div className="news">
            <p style={{ textIndent: "2em" }}>
              <b>北京时间2018年11月15日简讯</b>: NBA球队
              <Tooltip title={team1Desc}>
                <a href="#">湖人</a>
              </Tooltip>
              在主场迎战
              <Tooltip title={team2Desc}>
                <a href="#">开拓者</a>
              </Tooltip>
              ，这是两只西部球队的较量。湖人目前的战绩为7胜6负,开拓者目前的战绩为10胜3负。开拓者战绩占优，但是在
              <Tooltip title={team3Desc}>
                <a href="#">上一次交手</a>
              </Tooltip>
              中，湖人客场险胜开拓者。两队相比较，湖人最近五场三胜两负，开拓者最近五场四胜一负
              ，开拓者状态更好些。期待今天的较量。
            </p>
            <br />
            <p style={{ textIndent: "2em" }}>
              比赛开始，湖人稍占优势,英格拉姆
              的进球帮助湖人领先了5分。随后开拓者打出一波高潮,反超了湖人11分。首节比赛打完，开拓者领先湖人7分。
            </p>
            <br />
            <p style={{ textIndent: "2em" }}>
              次节比赛，开拓者快速进入状态,打出了一波12-4占据了主动。随后,风云突变,湖人在主场球迷的鼓舞下,一波接着一波反攻,不仅抹平了分差,还帮助球队反超了4分。次节比赛打完，湖人领先开拓者4分。
            </p>
            <br />
            <p style={{ textIndent: "2em" }}>
              第三节开始，开拓者始终落后于湖人,湖人在老詹
              的带领下一度拉开分差到10分。节末开拓者稍微拉近了比分。三节结束，湖人领先开拓者8分。
            </p>
            <br />
            <p style={{ textIndent: "2em" }}>
              最后一节比赛，湖人没有松懈,打出了一波7-0,分差被进一步拉开。节末开拓者稍微拉近了比分。最终，湖人战胜开拓者。
            </p>
            <br />
            <p style={{ textIndent: "2em" }}>
              在开拓者方面，领袖球员
              <Popover
                content={content}
                title={modalTarget}
                placement="top"
                trigger="click"
                overlayStyle={{ width: "500px" }}
                onClick={e => this.handleModal(e)}
              >
                <a href="#">达米安-利拉德</a>
              </Popover>
              31分8篮板11助攻，
              <Popover
                content={content}
                title={modalTarget}
                placement="top"
                trigger="click"
                overlayStyle={{ width: "500px" }}
                onClick={e => this.handleModal(e)}
              >
                <a href="#">CJ-麦科勒姆</a>
              </Popover>
              23分4助攻，虽败犹荣。
            </p>
            <br />
            <p style={{ textIndent: "2em" }}>
              在湖人方面，核心球员
              <Popover
                content={content}
                title={modalTarget}
                placement="top"
                trigger="click"
                overlayStyle={{ width: "500px" }}
                onClick={e => this.handleModal(e)}
              >
                <a href="#">勒布朗-詹姆斯</a>
              </Popover>
              44分10篮板9助攻，明星球员
              <Popover
                content={content}
                title={modalTarget}
                placement="top"
                trigger="click"
                overlayStyle={{ width: "500px" }}
                onClick={e => this.handleModal(e)}
              >
                <a href="#">布兰登-英格拉姆</a>
              </Popover>
              17分4助攻，他们是比赛胜利的重要功臣。
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default MatchNews;

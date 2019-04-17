import React from "react";
import { Modal } from "antd";
import Chart from "./newsInfo.js";
import Iframe from "./iframe.js";
import "./news.css";

class MatchNews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalTarget: "",
      currentUrl: this.props.currentUrl,
      showData: "",
      visible: false
    };
  }
  componentDidMount() { }
  componentWillMount() { this.getCurrentUrl(this.props.currentUrl) }
  componentWillReceiveProps(nextProps) {
    if (this.props.currentUrl !== nextProps.currentUrl) {
      if (nextProps.currentUrl) {
        this.getCurrentUrl(nextProps.currentUrl)
      }
    }
  }
  getCurrentUrl(url) {
    this.setState({
      currentUrl: url.split('//')[1].split('/')[2].split('.')[0]
    }, () => {
      // console.log(this.state.currentUrl)
      this.getUrlTestNews(this.state.currentUrl)
    })
  }
  getUrlTestNews(id) {
    $.ajax({
      url: "https://www.easy-mock.com/mock/5bf3713695d22b57c4fe73a6/example/news2",
      type: "get",
      dataType: "json",
      success: res => {
        let data = res.data[id]
        this.setState(
          {
            showData: data
          },
          () => { }
        );
      },
      error: err => {
        console.log(err);
      }
    });
  }
  handleTagName(e) {
    if (e.target.nodeName === 'A') {
      this.setState({
        visible: true,
        modalTarget: e.target.innerHTML
      })
    }
  }
  handleOk(e) {
    this.setState({
      visible: false,
    });
  }

  handleCancel(e) {
    this.setState({
      visible: false,
    });
  }
  render() {
    const content = <Chart target={this.state.modalTarget} />;
    return (
      <div>
        <div>
          <Iframe currentUrl={this.state.currentUrl} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: this.state.showData }} style={{ fontSize: "18px", textIndent: "2em" }} onClick={(e) => { this.handleTagName(e) }}></div>
        <Modal
          title={this.state.modalTarget}
          visible={this.state.visible}
          onOk={(e) => { this.handleOk(e) }}
          onCancel={(e) => { this.handleCancel(e) }}
        >
          {this.state.modalTarget}
          {/* {content} */}
        </Modal>
      </div>
    );
  }
}

export default MatchNews;

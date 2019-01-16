import React from 'react';

class MatchNews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  componentDidMount() {
    this.getHeatmap()
  }
  componentWillMount() {

  }
  componentWillReceiveProps(nextProps) {

  }
  getHeatmap() {
    var heatmapInstance = h337.create({
      container: document.querySelector('#heatmap'),
    });
    var points = [];
    var max = 0;
    var width = 600;
    var height = 400;
    var len = 100;
    while (len--) {
      var val = Math.floor(Math.random() * 100);
      max = Math.max(max, val);
      var point = {
        x: Math.floor(Math.random() * width),
        y: Math.floor(Math.random() * height),
        value: val
      };
      points.push(point);
    }
    var data = {
      max: max,
      data: points
    };
    heatmapInstance.setData(data);
  }
  render() {
    return (
      <div>
        <p>News</p>
        <div style={{width:'600px',height:'400px'}} id="heatmap"></div>
      </div>
    )
  }
}

export default MatchNews;
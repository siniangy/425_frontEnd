import React from 'react';

class Test extends React.Component {
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
    return (
      <div>
        <p>{this.props.content}</p> 
      </div>
    )
  }
}

export default Test;
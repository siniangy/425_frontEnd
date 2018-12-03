import React from 'react';

class MatchItem extends React.Component {
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
        <div style={{marginBottom:30,color: '#333',border:'20px solid lightblue',borderRadius:'20px',textAlign:'center'}}>
            {this.props.content}
        </div> 
      </div>
    )
  }
}

export default MatchItem;
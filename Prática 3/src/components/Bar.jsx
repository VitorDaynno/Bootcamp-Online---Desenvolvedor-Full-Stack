import React, { Component } from 'react';

class Bar extends Component {
  render() {
    const { color, size } = this.props;
    return (
      <div
        style={{
          backgroundColor: color,
          width: `${size}%`,
          height: '20px',
        }}
      ></div>
    );
  }
}

export default Bar;

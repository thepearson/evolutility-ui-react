import React from 'react';
import axios from 'axios'

var Image = React.createClass({
  componentDidMount: function() {
    const { src, type, url } = this.props;
    if (!src && type === 'feathers-rest') {
      axios.get(url)
          .then((response) => {
            this.setState({
              src: response.data.uri,
              error: null
            });
          })
          .catch((error) => {
            this.setState({
              error: 'Could not load image'
            })
          });
    }
    else {
      this.setState({
        src: url,
        error: null
      });
    }
  },

  getInitialState: function() {
    return {
      src: null,
      error: null
    }
  },

  render: function() {
    const { type, url, className } = this.props;
    const { src, error } = this.state;

    if (!src) {
      if (error) {
        return <p>Error</p>
      }

      return <p>Loading</p>
    }
    return <img src={src} className={className} />
  }
});

export default Image;
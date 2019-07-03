import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

class ClubView extends Component {
  constructor(props, ...rest) {
    super(props, ...rest);
    this.state = {
      contentLoaded: false,
      fetchErrored: false,
      error: null,
      data: {}
    };
  }
  componentDidMount() {
    const { match } = this.props;
    const { clubId } = match.params;
    axios
      .get(
        `https://api.eu-gb.apiconnect.appdomain.cloud/rfu-rfu-digital--production/rfu/clubs/${clubId}`,
        {
          headers: {
            'x-ibm-client-id': 'b60eb49b-1477-43bf-b882-8f7f322702aa'
          },
          timeout: 10000
        }
      )
      .then(response => {
        this.setState({ data: response.data, contentLoaded: true });
      })
      .catch(err => {
        this.setState({
          fetchErrored: true,
          contentLoaded: true,
          error: err.toString()
        });
        console.error(err);
      });
  }
  render() {
    const { contentLoaded, fetchErrored, error, data } = this.state;
    const { name } = data;
    return (
      <>
        <div className="rfu-header">
          <h1 className="rfu-title">{name || 'Loading...'}</h1>
        </div>
        {contentLoaded ? (
          <pre style={{ padding: 10 }}>{JSON.stringify(data, null, 2)}</pre>
        ) : null}
      </>
    );
  }
}

export default withRouter(ClubView);

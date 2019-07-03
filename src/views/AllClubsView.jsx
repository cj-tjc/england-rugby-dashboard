import React, { Component } from 'react';
import axios from 'axios';
import LoadingText from '../components/text/LoadingText';
import { Col, Row } from 'react-flexbox-grid';
import ClubCard from '../components/cards/ClubCard';
import FadeIn from 'react-fade-in';
import InfiniteScroll from 'react-infinite-scroller';

export default class ClubsView extends Component {
  constructor(props, ...rest) {
    super(props, ...rest);
    this.state = {
      contentLoaded: false,
      fetchErrored: false,
      error: null,
      data: [],
      filterString: '',
      items: [],
      currentPage: 0
    };
  }
  componentDidMount() {
    axios
      .get(
        'https://api.eu-gb.apiconnect.appdomain.cloud/rfu-rfu-digital--production/rfu/clubs',
        {
          headers: {
            'x-ibm-client-id': 'b60eb49b-1477-43bf-b882-8f7f322702aa'
          },
          timeout: 10000
        }
      )
      .then(response => {
        this.setState({
          rawData: response.data,
          data: response.data,
          contentLoaded: true
        });
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
  handleFilter = e => {
    e.preventDefault();
    const { value } = e.target;
    const { rawData } = this.state;
    const data = rawData.filter(club => {
      if (value === '') {
        return club.type.display === 'Club';
      } else {
        return (
          club.type.display === 'Club' &&
          club.name.toLowerCase().indexOf(value.toLowerCase()) >= 0
        );
      }
    });
    this.setState({ filterString: value, data });
  };
  getMoreItems = page => {
    const { data } = this.state;
    const items = data
      .filter((club, i) => {
        return i < page * 50;
      })
      .map((club, index) => {
        return (
          <Col lg={3} md={4} sm={6} xs={12}>
            <ClubCard {...club} />
          </Col>
        );
      });
    this.setState({ items, currentPage: page });
  };
  render() {
    const {
      filterString,
      contentLoaded,
      items,
      fetchErrored,
      error,
      data
    } = this.state;
    return (
      <>
        <div className="rfu-header">
          <h1 className="rfu-title">Clubs</h1>
          <input
            onChange={this.handleFilter}
            value={filterString}
            className="rfu-input rfu-input__search"
            placeholder="Filter Clubs"
          />
        </div>
        <div className="rfu-card-container">
          {contentLoaded ? null : <LoadingText />}
          {fetchErrored ? (
            <h2 className="rfu-text__loading">
              Failed to load Club data.
              <br />
              {error}
            </h2>
          ) : null}

          {contentLoaded && filterString.length < 2 ? (
            <InfiniteScroll
              pageStart={1}
              loadMore={this.getMoreItems}
              hasMore={true}
              loader={
                <div className="loader" key={0}>
                  Loading ...
                </div>
              }
            >
              <FadeIn>
                <Row>{items}</Row>
              </FadeIn>
            </InfiniteScroll>
          ) : null}
          {contentLoaded && filterString !== '' && filterString.length >= 2 ? (
            <FadeIn>
              <Row>
                {data.map((club, index) => {
                  return (
                    <Col lg={3} md={4} sm={6} xs={12}>
                      <ClubCard {...club} />
                    </Col>
                  );
                })}
              </Row>
            </FadeIn>
          ) : null}
        </div>
      </>
    );
  }
}

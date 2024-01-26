import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { Link } from "react-router";
import fetchSongs from "../queries/fetchSongs";
class SongList extends Component {
  renderSongs() {
    if (this.props.data.loading) {
      return <div>Loading...</div>;
    }
    return this.props.data.songs.map((song, index) => {
      return (
        <li key={index} className="collection-item">
          {song.title}
        </li>
      );
    });
  }

  render() {
    return (
      <div>
        <ul className="collection">{this.renderSongs()}</ul>
        <Link to="/songs/new" className="btn-floating btn-large red right">
          <i className="material-icons">add</i>
        </Link>
      </div>
    );
  }
}

export default graphql(fetchSongs)(SongList);

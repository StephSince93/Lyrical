import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { Link } from "react-router";
import fetchSongs from "../queries/fetchSongs";
class SongList extends Component {

  renderSongs() {
    const songs = this.props.data.songs;
    if (this.props.data.loading) {
      return <div>Loading...</div>;
    }
    if(!songs.length) return (<h2>There are no songs listed!</h2>)

    return songs.map(({ id, title }, index) => {
      return (
        <li key={index} className="collection-item">
          <Link to={`/songs/${id}`}>{title}</Link>
          <i className="material-icons" onClick={() => this.onSongDelete(id)}>
            delete
          </i>
        </li>
      );
    });
  }

  onSongDelete(id) {
    this.props.mutate({ variables: { id } }).then(() => {
      this.props.data.refetch();
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

const mutation = gql`
  mutation DeleteSong($id: ID) {
    deleteSong(id: $id) {
      id
    }
  }
`;

export default graphql(mutation)(graphql(fetchSongs)(SongList));

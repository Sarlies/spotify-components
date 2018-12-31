import React from 'react';
import { NowPlaying } from '../components/nowPlaying';

const SPOTIFY_TOKEN = 'Bearer BQCWIXK7ellzP6bKa0N5tc4oC8d_SiEN5q103Yrui7Iom3ICO5CgG0qSPW97wxxXaqJC79r5LySvYHS_6ZQS-Vt1t8vsdbyYA8N7RCYV6onz0-4G00LoGtY4uS_2j25AF1ve_6kGvsCg';
const QUERY = 'travis sicko';

class Song extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      song: {},
      isLoading: false,
    };
  }
  
  componentDidMount() {
    this.getSong();
  }

  getSong() {
    this.setState({ isLoading: true });

    fetch(`https://api.spotify.com/v1/search?q=${QUERY}&type=track&market=US&limit=1&offset=0`, { 
      headers: new Headers({
        'Authorization': SPOTIFY_TOKEN,
      })
    })
    .then(res => res.json())
    .then(res => {
      const song = res.tracks.items[0];

      this.setState({ song: {
        track: song.name,
        artist: song.artists[0].name,
        art: song.album.images[0].url,
      }, isLoading: false });
    });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <div><span>Loading...</span></div>
      )
    }

    const { song } = this.state;

    return (
      <div>
        <NowPlaying
          searchQuery={QUERY}
          song={
            {
              name:song.name,
              artist:song.artist,
              art: song.art,
              duration: 313,
            }
          }
          state={
            {
              isPlaying: true,
              shuffle: true,
              repeat: 'ONCE',
              secondsPlayed: 200,
            }
          }
          />
      </div>
    )
  }
}

export default Song;
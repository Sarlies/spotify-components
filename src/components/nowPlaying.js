import React from 'react'
import PropTypes from 'prop-types'


export const NowPlaying = ({ searchQuery, song, state }) => {
  
  const secondsToMinutes = (seconds) => {
    return Math.floor(seconds / 60) + ':' + Math.floor(seconds % 60);
  }

  return (
    <div>
      <div className='now-playing'>

        <div>
          {state.isPlaying ? 'Playing' : 'Paused'}
          {state.shuffle ? 'Shuffle On' : 'Shuffle Off'}
          {(() => {
            switch (state.repeat) {
              case 'OFF':
                return 'Repeat Off'
              case 'ON':
                return 'Repeat On'
              case 'ONCE':
                return 'Repeat Once'
            }
          })()}
        </div>

        <div className="source">
          <span className="source-title">Playing from Search</span>
          <span className="source-description">"{searchQuery}" in Search</span>
        </div>

        <div>
          <div className='song-art'>
            <img src={song.art} alt='' />
          </div>

          <span className='song-title'>{song.name}</span>
          <div>
            <span>{secondsToMinutes(state.secondsPlayed)}</span>
            <span> {secondsToMinutes(song.duration)}</span>
          </div>

          <div>
            <progress value={state.secondsPlayed * (100/song.duration)} max="100"></progress>
          </div>

          <span className='song-artist'>{song.artist}</span>
        </div>
      </div>
    </div>
  )
}

NowPlaying.propTypes = {
  searchQuery: PropTypes.string,
  song: PropTypes.shape({
    name: PropTypes.string,
    artist: PropTypes.string,
    art: PropTypes.string,
    duration: PropTypes.number,
  }).isRequired,
  state: PropTypes.shape({
    isPlaying: PropTypes.bool,
    shuffle: PropTypes.bool,
    repeat: PropTypes.oneOf(['OFF', 'ON', 'ONCE']),
    secondsPlayed: PropTypes.number,
  }).isRequired,
}
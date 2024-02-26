import React, { useState, useEffect } from 'react';
import './Game.css'

const Game = ({petStatus}) => {
    return (
        <>
            <img className='mountain' src="/mountain.png" alt="" draggable={false}/>
            <img className='pet' src={petStatus} alt="" draggable={false}/>
        </>
        
      );
};

export default Game;

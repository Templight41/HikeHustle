import React, { useState, useEffect } from 'react';
import './Game.css'

const Game = ({petStatus}) => {
    return (
        <>
            <img className='mountain' src="/mountain.png" alt="" />
            <img className='pet' src={petStatus} alt="" />
        </>
        
      );
};

export default Game;

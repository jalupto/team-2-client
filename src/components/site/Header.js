// import { ReactDOM } from "react-dom";
import React from // useState
"react";
// import { faClipboard } from "@fortawesome/free-solid-svg-icons";
// import ReactCardFlip from "react-card-flip";
import { FlapDisplay, Presets } from "react-split-flap-effect";
// import from 'extras/themes.css'
import '../../App.css';
const Flipboard = () => {
    return (
        <FlapDisplay
        className='flip' //added by Jared to make the font bigger
        chars={Presets.ALPHANUM + ",!"}
        length={24}
        value={"Choose your destination!"}
        />
    );
};

export default Flipboard;

/* </style>
    <div class="container"></div>
    <script src="//d3js.org/d3.v4.min.js"></script>
  <script> */
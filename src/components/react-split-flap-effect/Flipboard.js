// import { ReactDOM } from "react-dom";
import React, {
  // useState
} from "react";
// import { faClipboard } from "@fortawesome/free-solid-svg-icons";
// import ReactCardFlip from "react-card-flip";
import { FlapDisplay, Presets } from 'react-split-flap-effect'
// import from 'extras/themes.css'
const Flipboard = () => {
  return (
    <FlapDisplay
      chars={Presets.ALPHANUM + ',!'}
      length={17}
      value={'Create a Favorite'}
    />
  )

}

export default Flipboard;



/* </style>
<div class="container"></div>
<script src="//d3js.org/d3.v4.min.js"></script>
<script> */
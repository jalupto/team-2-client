
import React from "react";

import { FlapDisplay, Presets } from 'react-split-flap-effect'

//====================================================================================================================
// MADE BY ARIANNE
//====================================================================================================================

const Flipboard = (props) => {
  return (
    <FlapDisplay
      chars={Presets.ALPHANUM + ',!'}
      // length={props.number}
      value={props.name}
    />
  )

}

export default Flipboard;
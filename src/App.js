import React, { Component } from 'react';
import Palette from "./Palette";
import seedColors from "./SeedColors";
import { generatePalette } from "./ColorHelpers";

class App extends Component {
  render() {
    console.log(generatePalette(seedColors[4]));
    return (
      <div>
        <Palette {...seedColors[4]} />
      </div>
    )
  };
}

export default App;

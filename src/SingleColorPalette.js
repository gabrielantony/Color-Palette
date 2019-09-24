import React, { Component } from 'react';
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import PaletteFooter from "./PaletteFooter";
import { withStyles } from "@material-ui/styles"
import ColorBox from "./ColorBox";


const styles = {
    ColorBox: {
        width: "20%",
        height: props => (props.ShowingFullPalette ? "25%" : "50%"),
        margin: "0 auto",
        display: "inline-block",
        position: "relative",
        cursor: "pointer",
        marginBottom: "-3.5px",
        "&&:hover button": {
            opacity: "1"
        }
    },
    backButton: {
        width: "100px",
        height: "30px",
        position: "absolute",
        display: "inline-block",
        top: "50%",
        left: "50%",
        marginLeft: "-50px",
        marginTop: "-15px",
        textAlign: "center",
        outline: "none",
        background: "rgba(255, 255, 255, 0.3)",
        fontSize: "1rem",
        lineHeight: "30px",
        color: "white",
        textTransform: "uppercase",
        border: "none",
        textDecoration: "none"
    }
}


class SingleColorPalette extends Component {
    constructor(props){
        super(props);
        this._shades = this.gatherShades(this.props.palette, this.props.colorId);
        console.log(this._shades);
        this.state = {format: "hex"};
        this.changeFormat = this.changeFormat.bind(this);
    }

    gatherShades(palette, colorToFilterBy){
        let shades = []
        let allColors = palette.colors

        for (let key in allColors){
           shades = shades.concat(
               allColors[key].filter(color => color.id === colorToFilterBy)
           );
        }
        return shades.slice(1);
    }

    changeFormat(val){
        this.setState({ format: val });
     }

    render() {
        const {format} = this.state;
        const { classes } = this.props;
        const {paletteName, emoji, id,} = this.props.palette;
        const colorBoxes = this._shades.map(color => (
            <ColorBox 
            key={color.name} 
            name={color.name} 
            background={color[format]}
            showingFullPalette={false}
            />
        ))
        return (
            <div className="SingleColorPalette Palette">
                <Navbar
                 handleChange={this.changeFormat}
                 showingAllColors = {false}/>
                <div className="Palette-colors">
                {colorBoxes}
                <div className="go-back ColorBox">
                    <Link to={`/palette/${id}`} className={classes.backButton}>GO BACK</Link>
                    </div>
                </div>
                <PaletteFooter paletteName={paletteName} emoji={emoji} />
            </div>
        )
    }
}

export default withStyles(styles)(SingleColorPalette);

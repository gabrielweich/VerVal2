import React from "react";
import styles from "./PCAButton.css";
import PCA from "../../utils/PCA.js";
type Props = {};
	
export default class PCAButton extends React.Component{
    props: Props;
	constructor(props){
		super(props);
		this.handleClick = this.test.bind(this);
	}
    	test = async () => {
			console.log( (await PCA.getXYZ()));
		}
    render() {
        return(
            <div>
                <button className={styles.button} onClick={this.handleClick} align="center"></button>
            </div>
        )
    }

}
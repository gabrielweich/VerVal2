import React from "react";
import styles from "./ImageWrapperComponent.css";

type Props = {};

export default class ImageWrapperComponent extends React.Component{
    props: Props;

    render() {
        const {path} = this.props;

        return(
            <div className={styles.wrapper} align="center">
                <img className={styles.image} src={path} />
            </div>
        )
    }

}
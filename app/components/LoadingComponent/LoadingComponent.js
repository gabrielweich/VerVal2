import React from "react";
import styles from "./LoadingComponent.css";

type Props = {};

export default class LoadingComponent extends React.Component{
    props: Props;

    render() {
        const {show} = this.props
        return(
            <div className={(show ? styles.displayblock : styles.displaynone)}>
              <div id="loader" className={styles.loader}>
                {this.props.text}
              </div>
            </div>
        )
    }
}

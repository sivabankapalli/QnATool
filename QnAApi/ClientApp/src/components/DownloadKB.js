import React, { Component } from "react";
import { number } from "prop-types";

class DownloadKB extends Component {
    displayName = DownloadKB.name
    constructor(props) {
        super(props);
        this.state = {
            forecasts: [], knowledgebases: [], loading: true, kbID: props.location.pathname.charAt(props.location.pathname.length - 1)
        };// kbID: this.props.location.state.kbID };
        if (this.kbID !== Number)
            this.setState({ kbID: 0 });
        let perId = this.state.kbID;
        if ((typeof perId) != Number) {
            perId = 0;
        }
        const uri = 'api/Download/' + perId;
        fetch(uri)
            .then(response => response.text())
            .then(data => {
                this.setState({ forecasts: data, loading: false });
            });

    }

   
    render() {
        return (
            <div>
                <h1>Download Knowledgebase</h1>
                {this.state.forecasts}
            </div>
        );
    }
}

export default DownloadKB;
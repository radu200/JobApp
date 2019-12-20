import React from "react";

export default class Translator extends React.PureComponent {
    constructor(props) {
        super(props);
        this._ref = React.createRef();
    }

    render() {
        return (
            <div className="tradingview-widget-container" ref={this._ref}>
                <div className="tradingview-widget-container__widget"></div>
                <div id="ytWidget"></div>
            </div>
        );
    }
    componentDidMount() {
        const script = document.createElement('script');
        script.src = "https://translate.yandex.net/website-widget/v1/widget.js?widgetId=ytWidget&pageLang=ro&widgetTheme=light&autoMode=true"
        script.async = true;
        script.innerHTML = /* JSON-ENCODED SETTINGS STRING FROM EMBED CODE */
            this._ref.current.appendChild(script);
    }
}
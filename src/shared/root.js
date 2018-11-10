import * as React from 'react';
import { observer, inject } from "mobx-react";
import AppState from './store';

@inject('appstate')
@observer
export default class Root extends React.Component {

    static defaultProps = {
        appstate: new AppState()
    };

    constructor(props) {
        super(props);
        console.log(typeof window === 'object' ? 'client-side' : 'server-side');
    }

    addItem = () => this.props.appstate.addItem('foobar');

    render() {
        const { appstate } = this.props;

        return (
            <div>
                <button onClick={ this.addItem }>foobar</button>
                <ul>
                    { appstate.items.map((item, key) => <li key={ key }>{ item }</li>) }
                </ul>
            </div>
        );
    }
}
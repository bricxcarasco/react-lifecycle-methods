import React from 'react';

const ErrorComponent = () => <div></div>;

export default class Counter extends React.Component {
    constructor (props) {
        console.log('Constructor');
        super(props);

        this.state = {
            counter: 0,
            seed: 0,
            initializing: true
        }

        this.increment = () => {
            this.setState({
                counter: this.state.counter+1
            })
        }
    
        this.decrement = () => {
            this.setState({
                counter: this.state.counter-1
            });
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if(nextProps.seed && prevState.seed !== nextProps.seed) {
            return {
                seed: nextProps.seed,
                counter: nextProps.seed
            }
        }
        return null;
    }

    componentDidMount() {
        console.log('Component Did Mount');
        setTimeout(() => {
            this.setState({
                initializing: false
            });
        }, 500)
        console.log('-------------------');
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(nextProps.ignoreProp && this.props.ignoreProp !== nextProps.ignoreProp) {
            console.log('Should Component Update - DO NOT RENDER');
            console.log('-------------------');
            return false;
        }
        console.log('Should Component Update - RENDER');
        console.log('-------------------');
        return true;
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log('Get Snapshot Before Update');
        return null;
    }

    render() { 
        if (this.state.initializing) {
            return 'Initiaizing!...';
        }

        console.log('Render');
        return (
            <div>
                <button onClick={this.increment}>Increment</button>
                <button onClick={this.decrement}>Decrement</button>
                <div className="counter">
                    Counter: {this.state.counter}
                </div>
                <ErrorComponent></ErrorComponent>
            </div>
        );
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('Component Did Update');
    }

    componentWillUnmount() {
        console.log('Component Will Unmount');
    }

    componentDidCatch(error, info) {
        console.log('Component Did Catch');
    }
}
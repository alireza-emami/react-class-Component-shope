import { Component } from "react";

interface Props {}

interface State {
  count: number;
  numberofM: number;
  user: string;
  message: string;
}

class Wlcome extends Component<Props, State> {
  state = {
    count: 0,
    numberofM: 1,
    user: "mmad",
    message: " welcome but you should login mr",
  };
  render() {
    const loginUser = () => {
      this.setState({
        message: "tnx for logging now welcome to your personal panel mr",
      });
    };
    return (
      <div>
        <h1> {this.state.count}</h1>
        <button
          onClick={() => {
            this.setState({ count: this.state.count + 1 });
          }}
        >
          plus
        </button>
        <div>
          <h1>Music number {this.state.numberofM}</h1>
          <button
            onClick={() =>
              this.setState({ numberofM: this.state.numberofM - 1 })
            }
          >
            Previous
          </button>
          <button
            onClick={() =>
              this.setState({ numberofM: this.state.numberofM + 1 })
            }
          >
            next
          </button>
        </div>
        <div>
          <p>
            {this.state.message} <strong>{this.state.user}</strong>
          </p>
          <button onClick={loginUser}>login</button>
        </div>
      </div>
    );
  }
}

export default Wlcome;

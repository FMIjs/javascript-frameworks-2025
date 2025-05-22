import { Component, PropsWithChildren } from "react";

export class MyComponent extends Component {
  state = {
    test: "",
  };

  constructor(props: PropsWithChildren) {
    super(props);
  }

  handler() {
    this.setState({ test: "123" });
  }

  render() {
    const myContent = this.state.test === "123" ? <div>1</div> : <div>2</div>;
    return (
      <div onClick={this.handler.bind(this)}>
        HELLO
        {myContent}
      </div>
    );
  }
}

// @flow
import * as React from 'react';
import Alert from 'react-s-alert';
type Props = {
  children: React.Node
};

export default class App extends React.Component<Props> {
  props: Props;

  render() {
    const { children } = this.props;
  return( 
    <div className="divApp">
    <React.Fragment>{children}</React.Fragment>
    <Alert stack={false} />
    </div>
  );
  }
}

import React from "react";
import { connect } from "react-redux";
import { ReduxProps } from "../../../models/ReduxProps";
import IStore from "../../../models/IStore";

interface IProps {}

interface IState {}

interface IStateToProps {}

type Props = IProps & IStateToProps & ReduxProps<any>;

const mapStateToProps = (
  state: IStore,
  ownProps: IProps
): IStateToProps => ({});

export class Feed extends React.PureComponent<Props, IState> {
  render() {
    return <div>{/* ... todo ... */}</div>;
  }
}

export { Feed as Unconnected };
export default connect(mapStateToProps)(Feed);

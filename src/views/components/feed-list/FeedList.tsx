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

export class FeedList extends React.PureComponent<Props, IState> {
  render() {
    return (
      <div className="ui unstackable items">
        Hello, friend! I am a basic React component.
      </div>
    );
  }
}

export { FeedList as Unconnected };
export default connect(mapStateToProps)(FeedList);

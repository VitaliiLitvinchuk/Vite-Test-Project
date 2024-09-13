import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import ActionCreators from "../store/creators";

export const useActions = (reducerKey: keyof typeof ActionCreators) => {
    const dispatch = useDispatch();

    const actions = ActionCreators[reducerKey];

    return bindActionCreators(actions, dispatch);
};
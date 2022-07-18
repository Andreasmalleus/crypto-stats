import { useReducer } from "react";
import { FieldError } from "../types";

type ActionType =
  | { type: "FIELD"; field: string; payload: string }
  | { type: "ERROR"; error: FieldError };

interface ReducerState {
  usernameOrEmail?: string;
  username?: string;
  email?: string;
  password: string;
  passwordConfirm?: string;
  error: FieldError;
}

export const useAuthReducer = (initialState: ReducerState) => {
  const [state, dispatch] = useReducer(
    (state: ReducerState, action: ActionType) => {
      switch (action.type) {
        case "FIELD": {
          return {
            ...state,
            [action.field]: action.payload,
          };
        }
        case "ERROR": {
          return {
            ...state,
            error: action.error,
          };
        }
        default: {
          return state;
        }
      }
    },
    initialState
  );

  return { state, dispatch };
};

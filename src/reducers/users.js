import { RECEIVE_USERS } from "../actions/users";
import { ADD_QUESTION, ANSWER_QUESTION } from "../actions/questions";

export default function users(state = {}, action) {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users,
      };
    case ADD_QUESTION:
      const qid = action.question.id;
      const user = state[action.question.author];
      return {
        ...state,
        [action.question.author]: {
          ...state[action.question.author],
          questions: user.questions.concat([qid])
        }
      };
    case ANSWER_QUESTION:
      const answer = action.answer;
      const questionid = action.qid;

      return {
        ...state,
        [action.authedUser]: {
          ...state[action.authedUser],
          answers: {
            ...state[action.authedUser].answers,
            [questionid]: answer
          }
        }
      };
    default:
      return state;
  }
}

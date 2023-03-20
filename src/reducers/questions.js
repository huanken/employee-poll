import { RECEIVE_QUESTIONS, ADD_QUESTION, ANSWER_QUESTION } from "../actions/questions";

export default function questions(state = {}, action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions,
      };
    case ADD_QUESTION:
      return {
        ...state,
        [action.question.id]: action.question,
      };
    case ANSWER_QUESTION:
      const question = state[action.qid];
      return {
        ...state,
        [action.qid]: {
          ...question,
          [action.answer]: {
            ...question[action.answer],
            votes: question[action.answer].votes.concat([action.authedUser])
          }
        },
      };
    default:
      return state;
  }
}

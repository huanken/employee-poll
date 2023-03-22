import { fireEvent, render } from '@testing-library/react';
import { _saveQuestion, _saveQuestionAnswer, _getQuestions } from '../src/utils/_DATA';
import App from '../src/components/App'
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";
import middleware from "./middleware";
import { BrowserRouter as Router } from "react-router-dom";

delete window.matchMedia
window.matchMedia = (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
})

describe('saveQuestion', () => {
    it('will return the created question', async () => {
        var question = {
            author: "sarahedo",
            question: {
                optionOneText: "option 1",
                optionTwoText: "option 2",
            },
        };
        var result = await _saveQuestion(question);
        expect(result.author).toEqual("sarahedo");
        expect(result.optionOne.text).toEqual("option 1");
        expect(result.optionTwo.text).toEqual("option 2");
    });
});


describe('saveQuestionError', () => {
    it('will return an error if the question format is incorrect', async () => {
        var question = {
            author: "sarahedo",
            optionOneText: "option 1", // wrong format
            optionTwoText: "option 2",
        };
        await expect(_saveQuestion(question)).rejects.toEqual('Question format is incorrect');
    });
});

describe('saveQuestionAnswer', () => {
    it('will pass if answer of question is recorded', async () => {
        var question = {
            authedUser: "johndoe",
            qid: "8xf0y6ziyjabvozdd253nd",
            answer: "optionOne"
        };
        await _saveQuestionAnswer(question);
        var result = await _getQuestions();
        expect(result[question.qid].optionOne.votes).toContain("johndoe");
    });
});

describe('saveQuestionAnswerError', () => {
    it('will pass if answer of question is not recorded', async () => {
        var question = {
            authedUser: "tylermcginnis",
            qid: "8xf0y6ziyjabvozdd253nd",
            answer: "optionOneTwo" // incorrect 
        };
        var result = await _getQuestions();
        await expect(_saveQuestionAnswer(question)).rejects.toEqual('Answer is wrong formatted');
        expect(result[question.qid]?.optionOne?.votes).not.toContain("tylermcginnis");
    });
});

describe('snapshotAppTest', () => {
    const store = createStore(reducer, middleware);
    it('will match the snapshot', async () => {
        var component = render(
            <Provider store={store}>
                <Router>
                    <App />
                </Router>
            </Provider>)
        expect(component).toMatchSnapshot();
    });
});

// describe('snapshotAppTestSubmitButton', () => {
//     const store = createStore(reducer, middleware);
//     it('will display message error if user is not exist', async () => {
//         var component = render(
//             <Provider store={store}>
//                 <Router>
//                     <App />
//                 </Router>
//             </Provider>)
//         // var submitButton = component.getByText('Submit');
//         var inputUsername = component.container.querySelector('input-username');
//         // console.log("inputUsername",submitButton);
//         fireEvent.change(inputUsername, {target: {value:"huanns"}}) 
//         // fireEvent.click(submitButton);
//         expect(component.getByText("Abc")).toBeInTheDocument();
//     });
// });
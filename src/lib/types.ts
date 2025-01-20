export enum CorrectState {
    Correct = "correct",
    Incorrect = "incorrect",
    Partial = "partial"
}

export interface Guess {
    id: string;
    guess: string;
    correct: CorrectState;
    percentage: number;
    correctCharacters: number;
    chractersInCorrectPlaces: number; 
    unnecessaryCharacters: number;


}

export interface Answer {
    id: string;
    answer: string;
}

export interface AnswerOption {
    value: string;
    label: string;
    fullText: string;
}
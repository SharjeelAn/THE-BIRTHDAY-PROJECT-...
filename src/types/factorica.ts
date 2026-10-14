export type ExpressionState =
  | 'idle'
  | 'curious'
  | 'excited'
  | 'shocked'
  | 'confused'
  | 'laughing'
  | 'thinking'
  | 'calculating'
  | 'celebrating'
  | 'sad-comical'
  | 'winking'
  | 'determined';

export type MovementState =
  | 'idle'
  | 'peeking'
  | 'walking'
  | 'hopping'
  | 'jumping'
  | 'landing'
  | 'waving'
  | 'pointing'
  | 'scratching-head'
  | 'calculating-air'
  | 'falling-backward'
  | 'recovering'
  | 'dancing'
  | 'celebrating'
  | 'running-away'
  | 'returning'
  | 'sunglasses-walk';

export type CostumeType =
  | 'standard'
  | 'magnifier'
  | 'calculator'
  | 'party-hat'
  | 'sunglasses'
  | 'grad-cap'
  | 'lab-coat';

export type SceneId = 'encounter' | 'questions' | 'verification' | 'celebration';

export interface AgeAnswers {
  q1AgeTen: number;        // "When you were 10, how many years had you lived?" (0 - 15)
  q2BirthdaysSince: number; // "How many birthdays have passed since then?" (0 - 15)
  q3MathJokes: number;     // "How many years have you survived my terrible jokes?" (0 - 21)
}

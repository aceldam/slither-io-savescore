

namespace slither.io {
    export interface IScoreDB {
        loadScores(): Array<Score>;
        saveScore(score: Score);
        loadHighestScore(userName: string): Score;
        saveUsername(userName: string);
        loadUsername(): string;
    }

    export class ScoreDB implements IScoreDB {
        static ScoreDbKey: string = "slither.io.scoredb";
        static UsernameDbKey: string = "slither.io.username";

        public loadScores(): Array<Score> {
            var dbContent = localStorage.getItem(ScoreDB.ScoreDbKey);

            if (dbContent !== null) {
                return <Array<Score>>JSON.parse(dbContent);
            }

            return new Array<Score>();
        }
        public saveScore(score: Score): void {
            var scores = this.loadScores();

            var existingScore = scores.filter((scoreItem: Score) => scoreItem.username === score.username && scoreItem.score === score.score);

            if (existingScore.length > 0) {
                return;
            }

            scores.push(score);

            localStorage.setItem(ScoreDB.ScoreDbKey, JSON.stringify(scores));
        }
        public loadHighestScore(userName: string): Score {
            var scores = this.loadScores();

            var userScores = scores.filter((score: Score) => score.username === userName);

            if (userScores.length > 0) {
                // sort descending
                var sortedScores = userScores.sort((a:Score, b:Score) => b.score - a.score);

                return sortedScores[0];
            }

            return null;
        }

        public loadUsername(): string {
            return localStorage.getItem(ScoreDB.UsernameDbKey);
        }

        public saveUsername(userName: string) {
            localStorage.setItem(ScoreDB.UsernameDbKey, userName);
        }
    }
} 
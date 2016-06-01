var slither;
(function (slither) {
    var io;
    (function (io) {
        var ScoreDB = (function () {
            function ScoreDB() {
            }
            ScoreDB.prototype.loadScores = function () {
                var dbContent = localStorage.getItem(ScoreDB.ScoreDbKey);
                if (dbContent !== null) {
                    return JSON.parse(dbContent);
                }
                return new Array();
            };
            ScoreDB.prototype.saveScore = function (score) {
                var scores = this.loadScores();
                var existingScore = scores.filter(function (scoreItem) { return scoreItem.username === score.username && scoreItem.score === score.score; });
                if (existingScore.length > 0) {
                    return;
                }
                scores.push(score);
                localStorage.setItem(ScoreDB.ScoreDbKey, JSON.stringify(scores));
            };
            ScoreDB.prototype.loadHighestScore = function (userName) {
                var scores = this.loadScores();
                var userScores = scores.filter(function (score) { return score.username === userName; });
                if (userScores.length > 0) {
                    // sort descending
                    var sortedScores = userScores.sort(function (a, b) { return b.score - a.score; });
                    return sortedScores[0];
                }
                return null;
            };
            ScoreDB.prototype.loadUsername = function () {
                return localStorage.getItem(ScoreDB.UsernameDbKey);
            };
            ScoreDB.prototype.saveUsername = function (userName) {
                localStorage.setItem(ScoreDB.UsernameDbKey, userName);
            };
            ScoreDB.ScoreDbKey = "slither.io.scoredb";
            ScoreDB.UsernameDbKey = "slither.io.username";
            return ScoreDB;
        })();
        io.ScoreDB = ScoreDB;
    })(io = slither.io || (slither.io = {}));
})(slither || (slither = {}));
//# sourceMappingURL=ScoreDB.js.map
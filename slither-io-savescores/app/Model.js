var slither;
(function (slither) {
    var io;
    (function (io) {
        var Score = (function () {
            function Score(username, score, date) {
                this.username = username;
                this.score = score;
                this.date = date;
            }
            return Score;
        })();
        io.Score = Score;
    })(io = slither.io || (slither.io = {}));
})(slither || (slither = {}));
//# sourceMappingURL=Model.js.map
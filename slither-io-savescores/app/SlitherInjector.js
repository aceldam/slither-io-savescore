var slither;
(function (slither) {
    var io;
    (function (io) {
        ///
        var SlitherInjector = (function () {
            function SlitherInjector(db) {
                this.db = db;
            }
            SlitherInjector.prototype.run = function () {
                var _this = this;
                var $lastScore = $("#lastscore");
                var $bestScore = $lastScore.clone();
                $bestScore.prop("id", "bestScore");
                $bestScore.css("margin-top", "10px");
                $lastScore.after($bestScore);
                var lastUsername = db.loadUsername();
                if (lastUsername !== null) {
                    // update nick input box with last used username and display highest score for same
                    $("#nick").val(lastUsername);
                    var highestScore = this.db.loadHighestScore(lastUsername);
                    SlitherInjector.displayBestScore(highestScore);
                }
                $("#lastscore").on("DOMSubtreeModified", function () {
                    console.log("lastscore changed");
                    var $lastScore = $("#lastscore b");
                    if ($lastScore.text() !== null && $lastScore.text() !== "") {
                        var lastScore = $lastScore.text();
                        var userName = $("#nick").val();
                        _this.db.saveUsername(userName);
                        console.log("Saving lastscore: " + lastScore);
                        _this.db.saveScore(new slither.io.Score(userName, parseInt(lastScore, 10), new Date()));
                        var highestScore = _this.db.loadHighestScore(userName);
                        SlitherInjector.displayBestScore(highestScore);
                    }
                });
            };
            SlitherInjector.displayBestScore = function (bestScore) {
                if (bestScore != null) {
                    var $bestScore = $("#bestScore");
                    $bestScore.html("<div><span style='opacity: 0.45'>Your best length ever was </span><b>" + bestScore.score + "</b></span></div>");
                }
            };
            return SlitherInjector;
        })();
        io.SlitherInjector = SlitherInjector;
    })(io = slither.io || (slither.io = {}));
})(slither || (slither = {}));
//# sourceMappingURL=SlitherInjector.js.map
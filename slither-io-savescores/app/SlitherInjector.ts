namespace slither.io {
    ///

    export class SlitherInjector {
        private handle: number;
        private timerStopped: boolean;
        constructor(private db: IScoreDB) {
        }

        public run() {
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

            $("#lastscore").on("DOMSubtreeModified", () => {
                console.log("lastscore changed");

                var $lastScore = $("#lastscore b");

                if ($lastScore.text() !== null && $lastScore.text() !== "") {
                    var lastScore = $lastScore.text();

                    var userName = $("#nick").val();
                    this.db.saveUsername(userName);

                    console.log("Saving lastscore: " + lastScore);

                    this.db.saveScore(new slither.io.Score(userName, parseInt(lastScore, 10), new Date()));

                    var highestScore = this.db.loadHighestScore(userName);
                    SlitherInjector.displayBestScore(highestScore);

                }
            });
        }

        private static displayBestScore(bestScore: Score) {
            if (bestScore != null) {
                var $bestScore = $("#bestScore");

                $bestScore.html("<div><span style='opacity: 0.45'>Your best length ever was </span><b>" + bestScore.score + "</b></span></div>");
            }
        }
    }
} 
﻿namespace slither.io {
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
                $("#nick").val(lastUsername);
                var highestScore = this.db.loadHighestScore(lastUsername);
                SlitherInjector.displayBestScore(highestScore);
            }

            $("#playh div").on("click", (evt: JQueryEventObject) => {
                this.timerStopped = false;
                this.handle = setInterval(() => {
                    if (this.timerStopped) {
                        return;
                    }
                    console.log("waitForLastScore");
                    var $lastScore = $("#lastscore");

                    if ($lastScore.length) {
                        // pskh is the loader that shows after one has pressed play
                        if ($lastScore.find("b").length && !$("#pskh").is(":visible")) {
                            clearInterval(this.handle);
                            this.timerStopped = true;

                            var lastScore = $lastScore.find("b").text();

                            var userName = $("#nick").val();
                            this.db.saveUsername(userName);

                            console.log("Saving lastscore: " + lastScore);

                            this.db.saveScore(new slither.io.Score(userName, parseInt(lastScore, 10), new Date()));

                            var highestScore = this.db.loadHighestScore(userName);
                            SlitherInjector.displayBestScore(highestScore);
                        }
                    }
                }, 1000);
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
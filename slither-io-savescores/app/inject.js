var db = new slither.io.ScoreDB();
var $lastScore = $('#lastscore');
var $bestScore = $lastScore.clone();
$bestScore.prop('id', 'bestScore');
$bestScore.css('margin-top', '10px');
$lastScore.after($bestScore);
displayBestScore();
$('#playh div').on('click', (evt) => {
    var handle = setInterval(waitForLastScore, 1000);
    function waitForLastScore() {
        console.log('waitForLastScore');
        var $lastScore = $('#lastscore');
        if ($lastScore.length) {
            if ($lastScore.find('b').length) {
                clearInterval(handle);
                var lastScore = $lastScore.find('b').text();
                var userName = $('#nick').val();
                db.saveUsername(userName);
                console.log('Saving lastscore: ' + lastScore);
                db.saveScore(new slither.io.Score(userName, parseInt(lastScore, 10), new Date()));
                displayBestScore();
            }
        }
    }
});
function displayBestScore() {
    var lastUsername = db.loadUsername();
    if (lastUsername !== null) {
        $('#nick').val(lastUsername);
        var highestScore = db.loadHighestScore(lastUsername);
        if (highestScore != null) {
            var $bestScore = $('#bestScore');
            $bestScore.html('<div><span style="opacity: 0.45">Your best length ever was </span><b>' + highestScore.score + '</b></span></div>');
        }
    }
}
//# sourceMappingURL=inject.js.map
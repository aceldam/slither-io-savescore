var timer;
chrome.webNavigation.onCompleted.addListener((details) => {
    timer = setInterval(waitForLastScore, 200);
    alert('test');
});
function waitForLastScore() {
    var $lastScore = $("#lastscore");
    if ($lastScore.length) {
        if ($lastScore.find("b").length) {
            var lastScore = $lastScore.find("b").text();
            alert("Lastscore: " + lastScore);
        }
    }
}
//# sourceMappingURL=inject.js.map
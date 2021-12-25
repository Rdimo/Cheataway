(function titleScroller(text) {
  document.title = text;
  setTimeout(function () {
    titleScroller(text.substr(1) + text.substr(0, 1));
  }, 500);
}("CheatAway-"));

var logCredits = function logCredits() {
    const logStyle = [
        `color: #0000009c`,
        "font-size: 3em",
        "font-weight: 300",
        "padding: 100px 0px 100px 0px",
    ].join(";");

    return console.log(
        `%c © ${new Date().getFullYear()} github.com/rdimo 🎉`,
        logStyle
    );
};
logCredits();
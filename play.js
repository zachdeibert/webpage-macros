function createFrame() {
    var i = 0;
    while ( document.head.children.length > i ) {
        if ( document.head.children[i].id == "github-com-zachdeibert-webpage-macros-play-js" ) {
            ++i;
        } else {
            document.head.removeChild(document.head.children[i]);
        }
    }
    while ( document.body.children.length > 0 ) {
        document.body.removeChild(document.body.children[0]);
    }
    var iframe = document.createElement("iframe");
    iframe.style.position = "fixed";
    iframe.style.top = 0;
    iframe.style.left = 0;
    iframe.style.border = 0;
    iframe.style.width = "100vw";
    iframe.style.height = "100vh";
    document.body.appendChild(iframe);
    frames[frames.length - 1].location.href = location.href;
    return iframe;
}

function playback(recordData) {
    if ( location.href != recordData.url ) {
        if ( !confirm("Invalid url.  Continue?") ) {
            document.head.removeChild(document.getElementById("github-com-zachdeibert-webpage-macros-play-js"));
            return;
        }
    }
    var frame = createFrame();
    frame.onload = function() {
        for ( var i = 0; i < recordData.steps.length; ++i ) {
            switch ( recordData.steps[i].type ) {
                case "click":
                    var element = frame.contentDocument.querySelector(recordData.steps[i].element);
                    var e = new MouseEvent("click");
                    element.dispatchEvent(e);
                    break;
                default:
                    console.warn("Unknown step type " + recordData.steps[i].type);
                    break;
            }
        }
        location.reload();
    };
}

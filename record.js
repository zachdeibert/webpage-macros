function createFinishScreen(url, title) {
    var shade = document.createElement("div");
    shade.style.position = "fixed";
    shade.style.top = 0;
    shade.style.left = 0;
    shade.style.bottom = 0;
    shade.style.right = 0;
    shade.style.backgroundColor = "black";
    shade.style.opacity = 0.75;
    shade.onclick = function(e) {
        if ( !e.defaultPrevented ) {
            location.reload();
        }
    };

        var panel = document.createElement("div");
        panel.style.position = "fixed";
        panel.style.top = "25vh";
        panel.style.left = "25vw";
        panel.style.right = "25vw";
        panel.style.backgroundColor = "white";
        panel.style.padding = "20px";
        panel.onclick = function(e) {
            e.preventDefault();
        };
        shade.appendChild(panel);

            var h1 = document.createElement("h1");
            h1.style.textAlign = "center";
            h1.innerText = "Macro Recorded";
            panel.appendChild(h1);

            var p = document.createElement("p");
            p.innerText = "Please bookmark the following link (this is your macro):";
            panel.appendChild(p);

            var a = document.createElement("a");
            a.href = url;
            a.innerText = title;
            a.classList.add("btn");
            a.style.width = "100%";
            panel.appendChild(a);
    document.body.appendChild(shade);
}

function createRecordingScreen(title) {
    var recordData = {
        "url": location.href,
        "steps": []
    };

    var materialize = document.createElement("link");
    materialize.rel = "stylesheet";
    materialize.href = "https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.8/css/materialize.min.css";
    document.head.appendChild(materialize);

    var icons = document.createElement("link");
    icons.rel = "stylesheet";
    icons.href = "https://fonts.googleapis.com/icon?family=Material+Icons";
    document.head.appendChild(icons);

    var jquery = document.createElement("script");
    jquery.src = "https://code.jquery.com/jquery-2.1.1.min.js";
    jquery.onload = function() {

        var materializeScript = document.createElement("script");
        materializeScript.src = "https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.8/js/materialize.min.js";
        document.head.appendChild(materializeScript);

    };
    document.head.appendChild(jquery);

    var gen = document.createElement("script");
    gen.src = "https://cdn.rawgit.com/fczbkk/css-selector-generator/master/build/css-selector-generator.min.js";
    document.head.appendChild(gen);

    var iframe = document.createElement("iframe");
    iframe.style.position = "fixed";
    iframe.style.top = 0;
    iframe.style.left = 0;
    iframe.style.border = 0;
    iframe.style.width = "100vw";
    iframe.style.height = "100vh";
    iframe.onload = function() {
        var iid = setInterval(function() {
            if ( iframe.contentDocument ) {
                clearInterval(iid);
                iframe.contentDocument.onclick = function(e) {
                    recordData.steps.push({
                        "type": "click",
                        "element": new CssSelectorGenerator().getSelector(e.target)
                    });
                };
            }
        }, 10);
    };
    document.body.appendChild(iframe);
    frames[frames.length - 1].location.href = location.href;

    var fab = document.createElement("a");
    fab.classList.add("btn-floating", "btn-large", "waves-effect", "waves-light", "red");
    fab.style.right = "25px";
    fab.style.bottom = "45px";
    fab.style.position = "fixed";
    document.body.appendChild(fab);

        var abbr = document.createElement("abbr");
        abbr.title = "Finish Recording";
        abbr.style.border = 0;
        fab.appendChild(abbr);

            var stop = document.createElement("i");
            stop.classList.add("material-icons");
            stop.innerText = "done";
            stop.onclick = function() {
                createFinishScreen("javascript:" +
                    "(function(){" +
                        "s=document.createElement('script');" +
                        "s.id='github-com-zachdeibert-webpage-macros-record-js';" +
                        "s.src='https://cdn.rawgit.com/zachdeibert/webpage-macros/master/record.js';" +
                        "s.onload=function(){" +
                            "playback(" + JSON.stringify(recordData) + ")" +
                        "};" +
                        "document.head.appendChild(s);" +
                    "})()", title);
            };
            abbr.appendChild(stop);
}

function startRecording(title) {
    var i = 0;
    while ( document.head.children.length > i ) {
        if ( document.head.children[i].id == "github-com-zachdeibert-webpage-macros-record-js" ) {
            ++i;
        } else {
            document.head.removeChild(document.head.children[i]);
        }
    }
    while ( document.body.children.length > 0 ) {
        document.body.removeChild(document.body.children[0]);
    }
    createRecordingScreen(title);
    var iid = setInterval(function() {
        if ( window.Materialize ) {
            clearInterval(iid);
            Materialize.toast("Recording started!", 4000);
        }
    }, 10);
}

function createPanel() {
    var shade = document.createElement("div");
    shade.style.position = "fixed";
    shade.style.top = 0;
    shade.style.left = 0;
    shade.style.bottom = 0;
    shade.style.right = 0;
    shade.style.backgroundColor = "black";
    shade.style.opacity = 0.75;
    shade.onclick = function(e) {
        if ( !e.defaultPrevented ) {
            document.body.removeChild(shade);
            document.head.removeChild(document.getElementById("github-com-zachdeibert-webpage-macros-record-js"));
        }
    };

        var panel = document.createElement("div");
        panel.style.position = "fixed";
        panel.style.top = "25vh";
        panel.style.left = "25vw";
        panel.style.right = "25vw";
        panel.style.backgroundColor = "white";
        panel.style.padding = "20px";
        panel.onclick = function(e) {
            e.preventDefault();
        };
        shade.appendChild(panel);

            var h1 = document.createElement("h1");
            h1.style.textAlign = "center";
            h1.innerText = "Record Macro";
            panel.appendChild(h1);

            var form = document.createElement("form");
            form.action = "#";
            form.method = "GET";
            form.onsubmit = function() {
                startRecording(form.children[1].value);
                return false;
            };
            panel.appendChild(form);

                var label = document.createElement("label");
                label.innerText = "Macro Name:";
                label.htmlFor = "name";
                form.appendChild(label);

                var input = document.createElement("input");
                input.value = "My Macro";
                input.name = "name";
                form.appendChild(input);

                var br = document.createElement("br");
                form.appendChild(br);

                var cancel = document.createElement("button");
                cancel.type = "button";
                cancel.innerText = "Cancel";
                cancel.style.cssFloat = "left";
                cancel.onclick = function() {
                    document.body.removeChild(shade);
                    document.head.removeChild(document.getElementById("github-com-zachdeibert-webpage-macros-record-js"));
                };
                form.appendChild(cancel);

                var submit = document.createElement("button");
                submit.type = "submit";
                submit.innerText = "Record";
                submit.style.cssFloat = "right";
                submit.onclick = form.onsubmit;
                form.appendChild(submit);
    document.body.appendChild(shade);
}

createPanel();

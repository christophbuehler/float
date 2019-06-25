let floater;

function show(pos, attach) {
    if (floater) floater.remove();
    floater = floaters.ufo(attach, "Hey there!", pos);
    floater.show();
}

setInterval(() => {
    if (floater) {
        floater.reposition();
    }
}, 200);
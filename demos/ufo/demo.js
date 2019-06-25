let floater;

function show(pos, attach) {
    if (floater) floater.remove();
    floater = floaters.ufo(attach, "Hey there!", pos);
    floater.show();
}
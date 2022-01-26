
function FGLOG(...data: any[]) {
    console.log("[INF] - " + data)
}

function FGLOG_ERROR(...data: any[]) {
    console.log("[ERR] - " + data)
}



export {FGLOG, FGLOG_ERROR}

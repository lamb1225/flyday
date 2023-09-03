let myEndPoint = `/Act/yoooche`; //yoooche是進到頁面的使用者id，不能寫死
let host = window.location.host;
let path = window.location.pathname;
let webctx = path.substring(0, path.indexOf("/", 1));
let endPointURL = "ws://" + window.location.host + webctx + myEndPoint;
let statusOutput = document.querySelector("#statusOutput");
let webSocket;

function connect() {
    //create a websocket
    webSocket = new WebSocket(endPointURL)

    webSocket.onmessage = function (event) {
        let biddingRoom = document.querySelector("#actroom");
        let newBidRecord = document.createElement('li');
        newBidRecord.classList.add('list-group-item');
        newBidRecord.classList.add('list-group-item-action');
        let jsonObj = JSON.parse(event.data);
        newBidRecord.innerHTML = jsonObj.bidder + ":" + jsonObj.biddingRange;
        biddingRoom.appendChild(newBidRecord);
        biddingRoom.scrollTop = biddingRoom.scrollHeight;
    }
}
let bidder = document.querySelector("#actroom");
bidder.focus();

function bidding() {
    let bidderName = bidder.value.trim();
    if (bidderName === "") {
        alert("請輸入姓名");
        bidder.focus();
        return;
    }
    let biddingRange = document.querySelector("#biddingRange");
    let biddingRangeValue = biddingRange.value;
    console.log(biddingRangeValue);
    let jsonObj = {
        "bidder": bidderName,
        "biddingRange": biddingRangeValue
    }
    webSocket.send(JSON.stringify(jsonObj));
}
function disconnect() {
    webSocket.close();
}

function updateStatus(newStatus) {
    statusOutput.innerHTML = newStatus;
}

function updateBiddingValue() {
    const biddingRange = document.querySelector("#biddingRange");
    const bidding = document.querySelector("#bidding");

    bidding.innerHTML = '出價＄' + biddingRange.value;
}
let bidTimer = setInterval(updateTimer, 1000);


function bidClose() {
    clearInterval(bidTimer);
}
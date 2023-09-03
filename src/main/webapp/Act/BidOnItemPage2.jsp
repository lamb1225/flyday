<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page import="java.util.*" %>
<%@ page import="feature.bid.vo.*" %>
<%@ page import="feature.bid.service.*" %>
<%@ page import="feature.bid.dao.*" %>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="description" content="" />
        <meta name="author" content="" />
        <title>Shop Item - Start Bootstrap Template</title>
        <!-- Bootstrap icons-->
        <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css" rel="stylesheet" />
        <!-- Core theme CSS (includes Bootstrap)-->
        <link href="./css/styles-item-detail.css" rel="stylesheet" />
        <style>
        #timer {
        font-size: 1em;
        font-weight: 100;
        color: white;
        padding: 20px;
        color: white;

        }

        #timer div {
        display: inline-block;
        min-width: 30px;
        padding: 15px;
        background: #020b43;
        border-radius: 10px;
        border: 2px solid #030d52;
        margin: 15px;
        }
        .bidunit {
        font-weight: bold;
        color: rgb(37, 37, 37);
        }
        .bid-record{
        width: 490px;
        height: 180px;
        overflow-y: scroll;
        border: 1px solid #ccc; 
        }
        footer {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 70px;
        background-color: #343a40;
        color: #ffffff;
        padding: 10px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        }
        #statusOutput{
            background-color: #343a40;
            color: #ffffff;
            border-radius: 0px;
            text-align: center;
        }

        </style>
    </head>
    <body onload="connect();" onunload="disconnect();">
        <!-- Navigation-->
        <nav class="navbar navbar-expand-lg navbar-light bg-dark" style="position:fixed; width: 100%; z-index: 999;">
            <div class="container px-4 px-lg-5">
                <a class="navbar-brand" href="#!">Start Bootstrap</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
                        <li class="nav-item"><a class="nav-link active" style="color: #ffffff;" aria-current="page" href="#!">Home</a></li>
                        <li class="nav-item"><a class="nav-link" style="color: #ffffff;" href="#!">About</a></li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" style="color: #ffffff;" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Shop</a>
                            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><a class="dropdown-item" href="#!">All Products</a></li>
                                <li><hr class="dropdown-divider" /></li>
                                <li><a class="dropdown-item" href="#!">Popular Items</a></li>
                                <li><a class="dropdown-item" href="#!">New Arrivals</a></li>
                            </ul>
                        </li>
                    </ul>
                    <form class="d-flex" style="color: #ffffff;">
                        <button class="btn btn-outline-dark" style="color: #ffffff;" type="submit">
                            <i class="bi-cart-fill me-1" style="color: #ffffff;"></i>
                            Cart
                            <span class="badge bg-dark text-white ms-1 rounded-pill">0</span>
                        </button>
                    </form>
                </div>
            </div>
        </nav>
        <!-- Product section-->
        <section class="py-5">
            <div class="container px-4 px-lg-5 my-5">
                <div class="row gx-4 gx-lg-5 align-items-center">
                    <div class="col-md-6"><img class="card-img-top mb-5 mb-md-0" src="http://localhost:8080/PolyBrain/view/bid/images/ACQUIRE.jpg"/></div>
                    <div class="col-md-6">
                        <h1 class="display-5 fw-bolder">ACQIRE:</h1>
                        <h3>by Renegade Game Studios</h3>
                        <div class="fs-5 mb-5" style="text-align: left;">
                            <span>距離結標時間還有:</span>
                            <div id="timer"></div>
                            <ul id="biddingRoom" class="list-group bid-record">
                                <li id="statusOutput" class="list-group-item list-group-item-action" >競標中</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- Related items section-->
                <section class="py-5 bg-light">
                    <div class="container px-4 px-lg-5 mt-5">
                        <h2 class="fw-bolder mb-4">Related products</h2>
                        <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                            <div class="col mb-5">
                                <div class="card h-100">
                                    <!-- Product image-->
                                    <img class="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." />
                                    <!-- Product details-->
                                    <div class="card-body p-4">
                                        <div class="text-center">
                                            <!-- Product name-->
                                            <h5 class="fw-bolder">Fancy Product</h5>
                                            <!-- Product price-->
                                            $40.00 - $80.00
                                        </div>
                                    </div>
                                    <!-- Product actions-->
                                    <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                        <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="#">View options</a></div>
                                    </div>
                                </div>
                            </div>
                            <div class="col mb-5">
                                <div class="card h-100">
                                    <!-- Sale badge-->
                                    <div class="badge bg-dark text-white position-absolute" style="top: 0.5rem; right: 0.5rem">Sale</div>
                                    <!-- Product image-->
                                    <img class="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." />
                                    <!-- Product details-->
                                    <div class="card-body p-4">
                                        <div class="text-center">
                                            <!-- Product name-->
                                            <h5 class="fw-bolder">Special Item</h5>
                                            <!-- Product reviews-->
                                            <div class="d-flex justify-content-center small text-warning mb-2">
                                                <div class="bi-star-fill"></div>
                                                <div class="bi-star-fill"></div>
                                                <div class="bi-star-fill"></div>
                                                <div class="bi-star-fill"></div>
                                                <div class="bi-star-fill"></div>
                                            </div>
                                            <!-- Product price-->
                                            <span class="text-muted text-decoration-line-through">$20.00</span>
                                            $18.00
                                        </div>
                                    </div>
                                    <!-- Product actions-->
                                    <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                        <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="#">Add to cart</a></div>
                                    </div>
                                </div>
                            </div>
                            <div class="col mb-5">
                                <div class="card h-100">
                                    <!-- Sale badge-->
                                    <div class="badge bg-dark text-white position-absolute" style="top: 0.5rem; right: 0.5rem">Sale</div>
                                    <!-- Product image-->
                                    <img class="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." />
                                    <!-- Product details-->
                                    <div class="card-body p-4">
                                        <div class="text-center">
                                            <!-- Product name-->
                                            <h5 class="fw-bolder">Sale Item</h5>
                                            <!-- Product price-->
                                            <span class="text-muted text-decoration-line-through">$50.00</span>
                                            $25.00
                                        </div>
                                    </div>
                                    <!-- Product actions-->
                                    <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                        <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="#">Add to cart</a></div>
                                    </div>
                                </div>
                            </div>
                            <div class="col mb-5">
                                <div class="card h-100">
                                    <!-- Product image-->
                                    <img class="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." />
                                    <!-- Product details-->
                                    <div class="card-body p-4">
                                        <div class="text-center">
                                            <!-- Product name-->
                                            <h5 class="fw-bolder">Popular Item</h5>
                                            <!-- Product reviews-->
                                            <div class="d-flex justify-content-center small text-warning mb-2">
                                                <div class="bi-star-fill"></div>
                                                <div class="bi-star-fill"></div>
                                                <div class="bi-star-fill"></div>
                                                <div class="bi-star-fill"></div>
                                                <div class="bi-star-fill"></div>
                                            </div>
                                            <!-- Product price-->
                                            $40.00
                                        </div>
                                    </div>
                                    <!-- Product actions-->
                                    <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                        <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="#">Add to cart</a></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
        <!-- Footer-->
        
        <footer class="bg-dark">
            <div class="container panel inputArea form-check form-switch">
                    <input type="text" id="bidder" class="textField" style="height: 38px;" placeholder="bidder">
                    <input type="range" id="biddingRange" style="width:40%; height: 14px; margin-left: 20px;" min="50" max="500" step="50" oninput="updateBiddingValue();">
                    <button type="submit" id="bidding" class="btn_bidding btn btn-primary" style="float: right;" onclick="bidding();">出價＄--</button>
            </div>
        </footer>
        <Script>
                let myEndPoint = `/BidOnePage/yoooche`; //yoooche是進到頁面的使用者id，不能寫死
                let host = window.location.host;
                let path = window.location.pathname;
                let webctx = path.substring(0, path.indexOf("/", 1));
                let endPointURL = "ws://" + window.location.host + webctx + myEndPoint;
                let statusOutput = document.querySelector("#statusOutput");
                let webSocket;

                function connect() {
                    //create a websocket
                    webSocket = new WebSocket(endPointURL)

                    webSocket.onopen = function (event) {
                        updateStatus("Websocket Connected");
                        document.querySelector("#bidding").disabled = false;
                    }
                    webSocket.onmessage = function (event) {
                        let biddingRoom = document.querySelector("#biddingRoom");
                        let newBidRecord = document.createElement('li');
                        newBidRecord.classList.add('list-group-item');
                        newBidRecord.classList.add('list-group-item-action');
                        let jsonObj = JSON.parse(event.data);
                        newBidRecord.innerHTML = jsonObj.bidder + ":" + jsonObj.biddingRange;
                        biddingRoom.appendChild(newBidRecord);
                        biddingRoom.scrollTop = biddingRoom.scrollHeight;
                    }
                    webSocket.onclose = function (event) {
                        updateStatus("Websocket Disconnected");
                    }
                }
                let bidder = document.querySelector("#bidder");
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

        function updateTimer() {

            future = Date.parse("2023-08-31 00:00:00"); //時間要從資料庫撈出來，要判斷是哪一場競標（編號），不能寫死
            now = new Date();
            diff = future - now;
            days = Math.floor(diff / (1000 * 60 * 60 * 24));
            hours = Math.floor(diff / (1000 * 60 * 60));
            mins = Math.floor(diff / (1000 * 60));
            secs = Math.floor(diff / 1000);

            d = days;
            h = hours - days * 24;
            m = mins - hours * 60;
            s = secs - mins * 60;

            d = (d < 10) ? "0" + d : d;
            h = (h < 10) ? "0" + h : h;
            m = (m < 10) ? "0" + m : m;
            s = (s < 10) ? "0" + s : s;

            document.getElementById('timer')
                .innerHTML =
                '<div>' + d + '</div>' + '<span class="bidunit">天</span>' +
                '<div>' + h + '</div>' + '<span class="bidunit">時</span>' +
                '<div>' + m + '</div>' + '<span class="bidunit">分</span>' +
                '<div>' + s + '</div>' + '<span class="bidunit">秒</span>';

            if (d == 0 && h == 0 && m == 0 && s == 0) {
                bidClose();
                let urlParams = new URLSearchParams(window.location.search);
                let bidEventId = urlParams.get('bidEventId');
                console.log(bidEventId);

                fetch('http://localhost:8080/PolyBrain/test', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: new URLSearchParams({
                        message : 'closed',
                        bidEventId: bidEventId
                    })
                });
                    
                }
            }
            function bidClose() {
            clearInterval(bidTimer);
            }
            </Script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
        <script src="js/scripts.js"></script>

    </body>
</html>

<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
    <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
        <!DOCTYPE html>
        <html lang="en">

        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>揪團列表</title>
            <style>
                #actTable {
                    border-bottom-top: 6px;
                }

                #actTable th {
                    background-color: #bfbfef;
                }

                #actTable td {
                    width: 160px;
                    border-bottom: 1px dotted deeppink;
                }
            </style>
        </head>

        <body>

            <table id="actTable" style="text-align:center" width="90%">
                <thead>
                    <th>活動編號</th>
                    <th>會員編號</th>
                    <th>行程編號</th>
                    <th>揪團標題</th>
                    <th>揪團內容</th>
                    <th>可參與最多人數</th>
                    <th>可參與最少人數</th>
                    <th>目前參與人數</th>
                    <th>報名開始時間</th>
                    <th>報名結束時間</th>
                    <th>活動狀態</th>
                    <th></th>
                    <th></th>
                </thead>
                <tbody id="showPanel">
                    <c:if test="${not empty actList}">
                        <c:forEach var="act" items="${actList}">
                            <tr>
                                 
                                <td>${act.actno}</td>
                                <td id="memno${act.actno}">${act.memno}</td>
                                <td id="pkgno${act.actno}">${act.pkgno}</td>
                                <td id="acttitle${act.actno}">${act.acttitle}</td>
                                <td id="actcontent${act.actno}">${act.actcontent}</td>
                                <td id="actmaxcount${act.actno}">${act.actmaxcount}</td>
                                <td id="actmincount${act.actno}">${act.actmincount}</td>
                                <td id="actcurrentcount${act.actno}">${act.actcurrentcount}</td>
                                <td id="actjoinbegin${act.actno}">${act.actjoinbegin}</td>
                                <td id="actjoinend${act.actno}">${act.actjoinend}</td>
                                <c:if test="${act.actstatus == 0}">
                                    <td id="actstatus${act.actno}" value="0">揪團中</td>
                                </c:if>
                                <c:if test="${act.actstatus == 1}">
                                    <td id="actstatus${act.actno}" value="1">已成團</td>
                                </c:if>
                                <c:if test="${act.actstatus == 2}">
                                    <td id="actstatus${act.actno}" value="2">已取消</td>
                                </c:if>
                                <td>
                                    <button type="button" class="btn" onclick='onRemoveClick(${act.actno})'>移除</button>
                                </td>
                            </tr>
                        </c:forEach>
                    </c:if>
                </tbody>
            </table>
            <div id="msg" class="error"></div>
            <script src="./Act/js/remove.js"></script>
        </body>

        </html>
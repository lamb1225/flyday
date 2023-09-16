document.addEventListener("DOMContentLoaded", function () {

    // Modal (修改按鈕)
    const editModalBtn = document.getElementById("editModalBtn");
    const small = document.querySelectorAll("small[class='tkt-error-color']");

    const tktplanno = document.querySelector('#tktplanno');
    const planname = document.querySelector('#planname');
    const plancontent = document.querySelector('#plancontent');

     // 方案名稱(驗證)
     planname.addEventListener("blur", function () {
        const plannameTrim = planname.value.trim();
        const plannameLength = plannameTrim.length;
        if (plannameTrim === '') {
            small[0].textContent = '請輸入方案名稱';
        } else if (plannameLength < 2 || plannameLength > 40){
            small[0].textContent = '方案名稱長度需介於2~40字元';
        } else {
            small[0].textContent = '';
        }
    });

    // 方案內容(驗證)
    plancontent.addEventListener("blur", function () {
        const plancontentTrim = plancontent.value.trim();        
        const plancontentLength = plancontent.length;
        if (plancontentTrim === '') {
            small[1].textContent = '請輸入方案內容';
        } else if (plancontentLength < 2 || plancontentLength > 500){
            small[1].textContent = '方案內容需介於2~500字元';
        } else {
            small[1].textContent = '';
        }
    });


    // Modal (修改按鈕)
    editModalBtn.addEventListener("click", function () {
    // 方案名稱(驗證)
    const plannameTrim = planname.value.trim();
    const plannameLength = plannameTrim.length;
    if (plannameTrim === '') {
        small[0].textContent = '請輸入方案名稱';
    } else if (plannameLength < 2 || plannameLength > 40){
        small[0].textContent = '方案名稱長度需介於2~40字元';
    } else {
        small[0].textContent = '';
    }

    // 方案內容(驗證)
    const plancontentTrim = plancontent.value.trim();        
    const plancontentLength = plancontent.length;
    if (plancontentTrim === '') {
        small[1].textContent = '請輸入方案內容';
    } else if (plancontentLength < 2 || plancontentLength > 500){
        small[1].textContent = '方案內容需介於2~500字元';
    } else {
        small[1].textContent = '';
    }
    // 方案內容((存入)
    const plancontentValue = plancontent.value;
    const plancontentParagraphs = plancontentValue.split('\n'); // 將文本分割成多個段落
        // 使用<br>標籤分隔段落並合併
    const plancontentHTML = plancontentParagraphs.map(plancontentParagraphs => `${plancontentParagraphs.trim()}<br>`).join('');        
    // console.log("plancontentHTML",plancontentHTML);

    // 判斷驗證是否為空值
    let allEmpty = true;
    small.forEach(function(element) {
        if (element.textContent !== '') {
            allEmpty = false;
        }
    });

    // Fetch票券回傳
    if (allEmpty) {
        fetch('editTktPlan', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                tktplanno: tktplanno.value,
                planname: planname.value,
                plancontent: plancontentHTML,
            }),
        })
            .then(response => {
                if (response.ok) {
                    alert("保存成功！"); 
                    return response.json(); 
                } else {
                    alert("保存失敗！");
                    const { status, statusText } = response;
                    throw Error(`${status}: ${statusText}`);
                }
            })                      
            .then(data => {
                // console.log(data)
                errorMsgs = data;
            })
            .catch(function(error) {
                console.error('Fetch錯誤：', error);
                alert("保存失敗！");
              });
    } else {
        alert("尚有資料未完成，保存失敗！");
    }

    })

})
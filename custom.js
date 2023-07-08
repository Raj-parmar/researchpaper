let tableData = [];
let trace = {
    x: [],
    y: [],
    type: 'scatter'
};

let editFlag = true;
// const editSecondFlag = true;
// const editThirdFlag = true;


document.getElementById("second").style.display = 'none';
document.getElementById("third").style.display = 'none';
document.getElementById("four").style.display = 'none';

function addRow() {
    let table = document.getElementById("mainTable");
    let row = table.insertRow(-1);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);
    cell1.contentEditable = "true";
    cell2.contentEditable = "true";
    cell3.innerHTML = "0";
    cell4.innerHTML = "0";
}

//Standard addition method cal.
function samAddRow() {
    let tables = document.getElementById("samTable");
    let j = 1,k = 1;
    for (let i = 1; i <= 16; i++) {
        let row = tables.insertRow(-1);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);
        if(j === 5 ){ j = 1,k++}
        cell1.innerHTML = "S"+(k);
        cell2.contentEditable = "true";
        cell3.innerHTML = "0";
        cell4.contentEditable = "true";
        j++;
    }
}

// Water Sample	cal.
function waterSamepleFun(){
    let wsTable = document.getElementById("wst1");
    let j = 1,k = 1,table1=[],table2=[],table3=[];
    for (let i = 1; i <= 3; i++) {
        let row = wsTable.insertRow(-1); 
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);
        let cell5 = row.insertCell(4);
        // if(j === 5 ){ j = 1,k++}
        cell1.innerHTML =0;
        cell2.innerHTML =0;
        cell3.innerHTML =0;
        cell4.innerHTML =0;
        cell5.innerHTML =0;
        // j++;
    }
}

function nextTable(){
    let mainTable = document.getElementById("first");
    mainTable.style.display = 'none'; 
    document.getElementById("second").style.display = '';
    if(editFlag){
        samAddRow();
        editFlag = false;
    }
}

function nextTable2(){
    let mainTable = document.getElementById("second");
    mainTable.style.display = 'none'; 
    document.getElementById("third").style.display = '';
    // waterSamepleFun();
}

function nextTable3(){
    let mainTable = document.getElementById("third");
    mainTable.style.display = 'none'; 
    document.getElementById("four").style.display = '';
    // waterSamepleFun();
}

function updateData() {
    let mainTable = document.getElementById("mainTable");
    let mainNumRows = mainTable.rows.length;
    
    let slope = document.getElementById("slope");
    let intercept = document.getElementById("intercept");
    
    tableData = [];

    let tempI = 0,totalSlope=0,totalIntercept=0,avrUmTemp=0,avrIncTemp=0,avrUm=0,avrInc=0,slopX=[],slopY=[],sum=0,sumTemp=[],slopeX2Temp=[],slopeX2=0;
    for (let i = 1; i < mainNumRows; i++) {
        let um = parseFloat(mainTable.rows[i].cells[0].textContent);
        let int = parseFloat(mainTable.rows[i].cells[1].textContent);
        if(i == 1){
            tempI = int
        }
        //console.log("tempI",tempI)
        let I0I = tempI / int;
        let I0IMinus1 = I0I - 1;

        mainTable.rows[i].cells[2].innerHTML = I0I.toFixed(9);
        mainTable.rows[i].cells[3].innerHTML = I0IMinus1.toFixed(9);

        tableData.push([um, int]);

        avrUmTemp += +mainTable.rows[i].cells[0].textContent;
        avrIncTemp += +mainTable.rows[i].cells[1].textContent;        

        totalSlope += +um;
        totalIntercept += +int;
    }
    
    avrUm = avrUmTemp/(mainNumRows-1)
    avrInc = avrIncTemp/(mainNumRows-1)

    document.getElementById("avrUm").textContent = avrUm
    document.getElementById("avrInc").textContent = avrInc
    for (let i = 1; i < mainNumRows; i++) {
        let um = parseFloat(mainTable.rows[i].cells[0].textContent);
        let int = parseFloat(mainTable.rows[i].cells[1].textContent);
        //slop calculation 
        slopX.push((um-avrUm)) 
        slopY.push((int-avrInc))          
    }

    for (let i = 0; i < slopX.length; i++) {
        sumTemp.push((slopX[i]) * (slopY[i])) 
    }

    for (let i = 0; i < sumTemp.length; i++) {
        sum += +(sumTemp[i])
        slopeX2Temp.push((slopX[i])*(slopX[i]))
    }

    for (let i = 0; i < slopeX2Temp.length; i++) {
        slopeX2 += +(slopeX2Temp[i])
    }


    //console.log("Total slopX: ",slopX)
    //console.log("Total slopY: ",slopY)
    //console.log("Total x * y: ",sumTemp)
    //console.log("Total sum: ",sum)
    //console.log("Total slopeX2Temp: ",slopeX2Temp)
    //console.log("Total slopeX2: ",slopeX2)
    
    totalSlope = sum/slopeX2;
    slope.innerText = totalSlope;
    
    
    totalIntercept = avrInc - (totalSlope*avrUm)
    intercept.innerText =totalIntercept ;
    
    //console.log("Total totalSlope: ",totalSlope)
    //console.log("Total slopeX2: ",totalIntercept)
    

    trace.x = tableData.map(function (value) { return value[0]; });
    trace.y = tableData.map(function (value) { return value[1]; });


    //Standard addition method
    let samTable = document.getElementById("samTable");
    let samNumRows = samTable.rows.length;
    //for water sample variable
    let wstable1 = [], wstable2 =[], wstable3 = [],wstable4 = [], j = 1, k = 1;

    for (let i = 1; i < samNumRows; i++) {
        let ints = parseFloat(samTable.rows[i].cells[3].textContent);
        let calValue = (ints-totalIntercept)/ totalSlope;
        samTable.rows[i].cells[2].innerHTML = calValue;

        if(j === 5){ 
            j = 1;
            k++;
        }
        if(k === 1){
            wstable1.push({'spiked':samTable.rows[i].cells[1].textContent, 'um': samTable.rows[i].cells[2].textContent});
        }else if(k === 2){
            wstable2.push({'spiked':samTable.rows[i].cells[1].textContent, 'um': samTable.rows[i].cells[2].textContent});
        }else if(k === 3){
            wstable3.push({'spiked':samTable.rows[i].cells[1].textContent, 'um': samTable.rows[i].cells[2].textContent});
        }else if(k === 4){
            wstable4.push({'spiked':samTable.rows[i].cells[1].textContent, 'um': samTable.rows[i].cells[2].textContent});
        }
        j++;
        // tableData.push([um, int]);
    }
    //console.log("wstable1",wstable1)
    //console.log("wstable2",wstable2)
    //console.log("wstable3",wstable3)
    //Water sample code 

    // water sample table 1
    let wsTable = document.getElementById("wst1"),
    wsSum = 0,
    meanDiff1 = document.getElementById("meanDiff1"),
    sd1 = document.getElementById("sd1"),
    spiked1 = document.getElementById("spiked1"),
    spikedTotal1 = document.getElementById("spikedTotal1");
    
    if(wsTable !== null && wstable1.length > 0){
        
        let wsNumRows = wsTable.rows.length;

        spiked1.innerHTML = wstable1[0]['spiked']; 
        meanDiff1.innerHTML = calculatewsumSum(wstable1);
        sd1.innerHTML = calculateStandardDeviation(wstable1)
        spikedTotal1.innerHTML = (parseFloat(sd1.textContent)/(parseFloat(meanDiff1.textContent))*100);
        
        for (let i = 1; i < wsNumRows; i++) {
            wsTable.rows[i].cells[0].innerHTML = wstable1[i-1]['spiked'];
            wsTable.rows[i].cells[1].innerHTML = wstable1[i-1]['um'];
        }   
        wsTable.rows[1].cells[2].innerText = calculatewsumSum(wstable1);
        wsTable.rows[1].cells[3].innerText = spikedTotal1.innerHTML
        wsTable.rows[1].cells[4].innerText = ((parseFloat(meanDiff1.textContent)/parseFloat(spiked1.textContent))*100);
    }

    // water sample table 2
    let mainWSTable2 = document.getElementById("wst2"),
    meanDiff2 = document.getElementById("meanDiff2"),
    sd2 = document.getElementById("sd2"),
    spiked2 = document.getElementById("spiked2"),
    spikedTotal2 = document.getElementById("spikedTotal2");
    
    if(mainWSTable2 !== null && wstable2.length > 0){
        
        let wsNumRows = mainWSTable2.rows.length;

        spiked2.innerHTML = wstable2[0]['spiked']; 
        meanDiff2.innerHTML = calculatewsumSum(wstable2);
        sd2.innerHTML = calculateStandardDeviation(wstable2)
        spikedTotal2.innerHTML = (parseFloat(sd2.textContent)/(parseFloat(meanDiff2.textContent))*100);
        
        for (let i = 1; i < wsNumRows; i++) {
            mainWSTable2.rows[i].cells[0].innerHTML = wstable2[i-1]['spiked'];
            mainWSTable2.rows[i].cells[1].innerHTML = wstable2[i-1]['um'];
        }   
        mainWSTable2.rows[1].cells[2].innerText = calculatewsumSum(wstable2);
        mainWSTable2.rows[1].cells[3].innerText = spikedTotal2.innerHTML
        mainWSTable2.rows[1].cells[4].innerText = ((parseFloat(meanDiff2.textContent)/parseFloat(spiked2.textContent))*100);
    }

    // water sample table 3
    let mainWSTable3 = document.getElementById("wst3"),
    meanDiff3 = document.getElementById("meanDiff3"),
    sd3 = document.getElementById("sd3"),
    spiked3 = document.getElementById("spiked3"),
    spikedTotal3 = document.getElementById("spikedTotal3");
    
    if(mainWSTable3 !== null && wstable3.length > 0){
        
        let wsNumRows = mainWSTable3.rows.length;

        spiked3.innerHTML = wstable3[0]['spiked']; 
        meanDiff3.innerHTML = calculatewsumSum(wstable3);
        sd3.innerHTML = calculateStandardDeviation(wstable3)
        spikedTotal3.innerHTML = (parseFloat(sd3.textContent)/(parseFloat(meanDiff3.textContent))*100);
        
        for (let i = 1; i < wsNumRows; i++) {
            mainWSTable3.rows[i].cells[0].innerHTML = wstable3[i-1]['spiked'];
            mainWSTable3.rows[i].cells[1].innerHTML = wstable3[i-1]['um'];
        }   
        mainWSTable3.rows[1].cells[2].innerText = calculatewsumSum(wstable3);
        mainWSTable3.rows[1].cells[3].innerText = spikedTotal3.innerHTML
        mainWSTable3.rows[1].cells[4].innerText = ((parseFloat(meanDiff3.textContent)/parseFloat(spiked3.textContent))*100);
    }

    // water sample table 4
    let mainWSTable4 = document.getElementById("wst4"),
    meanDiff4 = document.getElementById("meanDiff4"),
    sd4 = document.getElementById("sd4"),
    spiked4 = document.getElementById("spiked4"),
    spikedTotal4 = document.getElementById("spikedTotal4");
    
    if(mainWSTable4 !== null && wstable4.length > 0){
        
        let wsNumRows = mainWSTable4.rows.length;

        spiked4.innerHTML = wstable4[0]['spiked']; 
        meanDiff4.innerHTML = calculatewsumSum(wstable4);
        sd4.innerHTML = calculateStandardDeviation(wstable4)
        spikedTotal4.innerHTML = (parseFloat(sd4.textContent)/(parseFloat(meanDiff4.textContent))*100);
        
        for (let i = 1; i < wsNumRows; i++) {
            mainWSTable4.rows[i].cells[0].innerHTML = wstable4[i-1]['spiked'];
            mainWSTable4.rows[i].cells[1].innerHTML = wstable4[i-1]['um'];
        }   
        mainWSTable4.rows[1].cells[2].innerText = calculatewsumSum(wstable4);
        mainWSTable4.rows[1].cells[3].innerText = spikedTotal4.innerHTML
        mainWSTable4.rows[1].cells[4].innerText = ((parseFloat(meanDiff4.textContent)/parseFloat(spiked4.textContent))*100);
    }

    // summaru table
    let summaryTable = document.getElementById("summaryTable");
    // summaryTable 
    if(wsTable !== null && mainWSTable2 !== null && mainWSTable3 !== null && mainWSTable4 !== null && meanDiff1.textContent !== ""){
        // let summaryNumRows = summaryTable.rows.length;
        // for (let i = 1; i < summaryNumRows; i++) {
            summaryTable.rows[1].cells[1].innerHTML = wsTable.rows[1].cells[0].innerHTML;
            summaryTable.rows[2].cells[1].innerHTML = mainWSTable2.rows[1].cells[0].innerHTML;
            summaryTable.rows[3].cells[1].innerHTML = mainWSTable3.rows[1].cells[0].innerHTML;
            summaryTable.rows[4].cells[1].innerHTML = mainWSTable4.rows[1].cells[0].innerHTML;
            
            summaryTable.rows[1].cells[2].innerHTML = parseFloat(meanDiff1.textContent).toFixed(2) + '±' + parseFloat(sd1.textContent).toFixed(2)
            summaryTable.rows[2].cells[2].innerHTML = parseFloat(meanDiff2.textContent).toFixed(2) + '±' + parseFloat(sd2.textContent).toFixed(2)
            summaryTable.rows[3].cells[2].innerHTML = parseFloat(meanDiff3.textContent).toFixed(2) + '±' + parseFloat(sd3.textContent).toFixed(2)
            summaryTable.rows[4].cells[2].innerHTML = parseFloat(meanDiff4.textContent).toFixed(2) + '±' + parseFloat(sd4.textContent).toFixed(2)

            summaryTable.rows[1].cells[3].innerHTML = parseFloat(wsTable.rows[1].cells[3].innerHTML).toFixed(2);
            summaryTable.rows[2].cells[3].innerHTML = parseFloat(mainWSTable2.rows[1].cells[3].innerHTML).toFixed(2);
            summaryTable.rows[3].cells[3].innerHTML = parseFloat(mainWSTable3.rows[1].cells[3].innerHTML).toFixed(2);
            summaryTable.rows[4].cells[3].innerHTML = parseFloat(mainWSTable4.rows[1].cells[3].innerHTML).toFixed(2);

            summaryTable.rows[1].cells[4].innerHTML = parseFloat(wsTable.rows[1].cells[4].innerHTML).toFixed(2);
            summaryTable.rows[2].cells[4].innerHTML = parseFloat(mainWSTable2.rows[1].cells[4].innerHTML).toFixed(2);
            summaryTable.rows[3].cells[4].innerHTML = parseFloat(mainWSTable3.rows[1].cells[4].innerHTML).toFixed(2);
            summaryTable.rows[4].cells[4].innerHTML = parseFloat(mainWSTable4.rows[1].cells[4].innerHTML).toFixed(2);
        // }   
    }
}

function standardAdditionMethod(){
    let slope = document.getElementById("slope").textContent;
    let intercept = document.getElementById("intercept").textContent;    
    
    let mainTable = document.getElementById("samTable");
    let mainNumRows = mainTable.rows.length;
    let j = 1,k = 1,um = 0,avgX = [],avgXTemp = 0;
    for (let i = 1; i < mainNumRows; i++) {       
        let int = parseFloat(mainTable.rows[i].cells[3].textContent);
        um = (int-intercept)/slope;
        mainTable.rows[i].cells[2].innerHTML = um.toFixed(2);
        avgXTemp += +um;
        if(j === 5){
            avgX.push(avgXTemp/4);
            j = 1,
            k++
            avgXTemp = 0
            um = 0
        }
    }

}

function waterSamepleMethod(){
    let mainTable = document.getElementById("wst1");
    let mainNumRows = mainTable.rows.length;
    let j = 1,k = 1,um = 0,avgX = [],avgXTemp = 0;

    for (let i = 1; i < mainNumRows; i++) {        
        let int = parseFloat(mainTable.rows[i].cells[3].textContent);
        um = (int-intercept)/slope;
        mainTable.rows[i].cells[2].innerHTML = um.toFixed(2);
        avgXTemp += +um;
        if(j === 5){
            avgX.push(avgXTemp/4);
            j = 1,
            k++
            avgXTemp = 0
            um = 0
        }
    }
}

setInterval(function () {
    updateData();
    standardAdditionMethod();
    // waterSamepleMethod();
    Plotly.newPlot('myDiv', [trace]);    
}, 1000);


// Function to calculate the sum of an array
function calculatewsumSum(arr) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
      sum += parseFloat(arr[i].um);
    }
    //console.log("sum of um:",sum)
    return String(sum / arr.length);
  }

function calculatewsspikeSum(arr) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
      sum += parseFloat(arr[i].spiked);
    }
    return String(sum / arr.length);
}

function calculateStandardDeviation(arr) {

    const newArr = [];
    for (let i = 0; i < arr.length; i++) {
      newArr.push(parseFloat(arr[i].um));
    }

  const n = newArr.length;
  const mean = newArr.reduce((sum, value) => sum + value, 0) / n;
  const squaredDifferences = newArr.map(value => Math.pow(value - mean, 2));
  const variance = squaredDifferences.reduce((sum, value) => sum + value, 0) / n;
  const standardDeviation = Math.sqrt(variance);
  return standardDeviation;

}

function backFun(param){
    
    if(param === 'first'){
        let mainTable = document.getElementById("second");
        mainTable.style.display = 'none'; 
        document.getElementById("first").style.display = '';
    }else if(param === 'second'){
        let mainTable = document.getElementById("third");
        mainTable.style.display = 'none'; 
        document.getElementById("second").style.display = '';
    }else if(param === 'third'){
        let mainTable = document.getElementById("four");
        mainTable.style.display = 'none'; 
        document.getElementById("third").style.display = '';
    }
}
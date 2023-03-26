let tableData = [];
let trace = {
    x: [],
    y: [],
    type: 'scatter'
};

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

//sam
function samAddRow() {
    let table = document.getElementById("samTable");
    let row = table.insertRow(-1);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);
    cell1.contentEditable = "true";
    cell2.contentEditable = "true";
    cell3.innerHTML = "0";
    cell1.contentEditable = "true";
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
        console.log("tempI",tempI)
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
        slopY.push((um-avrInc))          
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


    console.log("Total slopX: ",slopX)
    console.log("Total slopY: ",slopY)
    console.log("Total sum: ",sum)
    console.log("Total slopeX2: ",slopeX2)
    
    totalSlope = sum/slopeX2;
    slope.innerText = totalSlope;

    
    totalIntercept = avrInc - (totalSlope*avrUm)
    intercept.innerText =totalIntercept ;
    //18337.23977.
    
    

    trace.x = tableData.map(function (value) { return value[0]; });
    trace.y = tableData.map(function (value) { return value[1]; });


    //Standard addition method
    let samTable = document.getElementById("samTable");
    let samNumRows = samTable.rows.length;

    for (let i = 1; i < samNumRows; i++) {
        let ints = parseFloat(samTable.rows[i].cells[3].textContent);
        let calValue = (ints-totalIntercept)/ totalSlope;
        samTable.rows[i].cells[2].innerHTML = calValue;

        // tableData.push([um, int]);
    }
}

setInterval(function () {
    updateData();
    Plotly.newPlot('myDiv', [trace]);
    
}, 1000);

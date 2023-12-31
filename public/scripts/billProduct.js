let i = 1;
function addProduct(){
  i++;
  const table = document.getElementById("productsTable").getElementsByTagName('tbody')[0];
  const row = table.insertRow(-1);
  row.setAttribute('id', 'partinfo' + i);
  const nameCell = row.insertCell(0);
  const quantityCell = row.insertCell(1);
  const priceCell = row.insertCell(2);
  const totalCell = row.insertCell(3);
  nameCell.innerHTML = '<input id="product' + i + '" type="text" placeholder="Product ' + i + '" style="width:100%">';
  quantityCell.innerHTML = '<input id="quantity' + i + '" type="number" placeholder="1">';
  priceCell.innerHTML = '<input id="price' + i + '" type="text" placeholder="$25.00">';
  totalCell.innerHTML = '<input id="total' + i + '" type="text" placeholder="$25.00" disabled>';
}

function replaceThePart(){
  let j = 1;
  let totalValue = [];
  while (j <= i) {
    const partInfo = document.getElementById("partinfo" + j);
    const product = document.getElementById("product" + j);
    const quantity = document.getElementById("quantity" + j);
    const price = document.getElementById("price" + j);
    const total = document.getElementById("total" + j);
    if (partInfo && product && quantity && price && total) {
      const calculatedTotal = price.value * quantity.value;
      total.value = "$" + calculatedTotal.toFixed(2);
      const partInfoTemp = partInfo.getElementsByTagName('td');
      partInfoTemp[0].innerHTML = product.value;
      partInfoTemp[1].innerHTML = quantity.value;
      partInfoTemp[2].innerHTML = "$" + price.value;
      partInfoTemp[3].innerHTML = "$" + calculatedTotal.toFixed(2);
      totalValue.push(calculatedTotal);
    }
    console.log(totalValue);

    if (document.getElementById("addButton")) {
      document.getElementById("addButton").style.display = "none";
    } else {
      console.error("Could not find element with ID 'addButton'");
    }
    j++;  
  }

  //Customer info part of the function
  const carInfo = document.getElementById("car");
  if (carInfo){
    document.getElementById("carInfo").innerHTML = "<td>Car model: " + carInfo.value + "</td>";
  }
  

  //Total value part of the function
  let totalSum = 0;
  let k;
  for (k = 0; k < totalValue.length; k++) {
      if (totalValue[k] == "") {
          totalValue[k] = 0;
      } else {
          totalSum += parseFloat(totalValue[k]);
      }
  }
  // Tax rate
  totalSum = totalSum * 1.05;
  // Commas separating the thousands
  totalSum = totalSum.toFixed(2);
  let parts = totalSum.split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  totalSum = parts.join(".");
  console.log(totalSum);
  document.getElementById("totalCostHtml").innerHTML = "$" + totalSum;
}

function pPage(){
  const originalContents = document.body.innerHTML;
  const printContents = document.getElementById("printHere").innerHTML;
  document.body.innerHTML = printContents;

  if (document.getElementById("pageWidth").classList.contains("container")) {
    document.getElementById("pageWidth").classList.remove("container");
  }

  // hide the infoButton
  if (document.getElementById("infoButton")) {
    document.getElementById("infoButton").style.display = "none";
  } else {
    console.error("Could not find element with ID 'infoButton'");
  }
  
  // hide the enterButton
  if (document.getElementById("enterButton")) {
    document.getElementById("enterButton").style.display = "none";
  } else {
    console.error("Could not find element with ID 'enterButton'");
  }
  
  // hide the addButton
  if (document.getElementById("addButton")) {
    document.getElementById("addButton").style.display = "none";
  } else {
    console.error("Could not find element with ID 'addButton'");
  }

  // hide the customerInput
  if (document.getElementById("customerInput")) {
    document.getElementById("customerInput").style.display = "none";
  } else {
    console.error("Could not find element with ID 'customerInput'");
  }
  
  window.print();
  document.body.innerHTML = originalContents;
}
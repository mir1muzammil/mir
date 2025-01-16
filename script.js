let productQuantity = document.getElementById("productQuantity")
let quantityError = document.getElementById("quantityError")


let  maxQuantity = 20;

productQuantity.addEventListener('input',function () {
    let enteredQuantity = parseFloat(productQuantity.value)
    if (enteredQuantity > maxQuantity) {
        quantityError.style.display = "block"
        
    } else {
        quantityError.style.display = "none"
    }
    
})



productForm.addEventListener("submit", function (event) {
    event.preventDefault(); 

    let productName = document.getElementById("productSelect").value;
    let productQuantity = parseFloat(document.getElementById("productQuantity").value) || 0;
    let productPrice = parseFloat(document.getElementById("productPrice").value) || 0;
    let discount = parseFloat(document.getElementById("discount").value) || 0;
    let tax = parseFloat(document.getElementById("tax").value) || 0;

    // formulas
    let totalCost = productQuantity * productPrice;
    let discountAmount = (totalCost * discount) / 100;  
    let taxAmount = ((totalCost - discountAmount) * tax) / 100; 
    let finalCost = totalCost - discountAmount + taxAmount;
    let currentDate = new Date();
    let updatedDate = currentDate.toLocaleString(); 

    let row = document.createElement("tr");
    row.innerHTML = `
        <td>${productName}</td>
        <td>${productQuantity}</td>
        <td>${productPrice.toFixed(2)}</td>
        <td>${discountAmount.toFixed(2)}%</td>
        <td>${taxAmount.toFixed(2)}%</td>
        <td>${totalCost.toFixed(2)}</td>
        <td>${finalCost.toFixed(2)}</td>
        <td>${updatedDate}</td>
        <button class="btn btn-sm btn-danger mt-3 delete-btn">Delete</button>

    `;
    

   
    row.querySelector(".delete-btn").addEventListener('click' , function () {
        let confirmMessage = confirm("Are you sure");
        if (confirmMessage) {
            row.remove()
        }
    })

    

    let table = document.getElementById("productTable"); 
    table.appendChild(row);

    function updateGrandtotal() {
        let total = 0;
        document.querySelectorAll("#productTable tr").forEach(function () {
            let finalCost = parseFloat(row.children[6].textContent) || 0;
            
            total = total + finalCost;
        })
        document.getElementById("grandTotal").textContent = total.toFixed(2)

        
    }

    productForm.addEventListener("submit", updateGrandtotal());
    productTable.addEventListener("click", function (event) {
        if (event.target.classList.contains("delete-btn")) {
            updateGrandtotal()
        }
        
    })

    productForm.reset()
});
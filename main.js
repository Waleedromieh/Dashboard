var ProductNameInput = document.getElementById("productName")
var productPriceInput = document.getElementById("productPrice")
var productCategoryInput = document.getElementById("productCategory")
var productDescriptionInput = document.getElementById("productDescription")
var searchButton = document.getElementById("searchButton")
var currentInd=0
var products =[]
if (localStorage.getItem("productList")!=null) {
    products=JSON.parse(localStorage.getItem("productList"))
    Display()
}else{
    products=[]
}
function AddProduct(){
    var product = {
        name:ProductNameInput.value,
        price:productPriceInput.value,
        category:productCategoryInput.value,
        description:productDescriptionInput.value,
    }
    products.push(product)
    localStorage.setItem("productList",JSON.stringify(products))
    Display() 
}
function Display() {
    var temp = ""
    for ( var i= 0; i<products.length;i++) {
        temp+=   `<tr>
        <td>`+i+`</td>
        <td>`+products[i].name+`</td>
        <td>`+products[i].price+`</td>
        <td>`+products[i].category+`</td>
        <td>`+products[i].description+`</td>
        <td>
            <button onclick="updateProduct(`+i+`)"(`+i+`)" class="btn btn-warning">update</button>
        </td>
        <td>
            <button onclick="deleteProduct(`+i+`)"(`+i+`)" class="btn btn-danger">delete</button>
        </td>
    </tr>`
    }
    document.getElementById("tableBody").innerHTML=temp

}
function updateProduct(ind) {
    currentInd=ind
    ProductNameInput.value = products[ind].name
    productPriceInput.value = products[ind].price
    productCategoryInput.value = products[ind].category
    productDescriptionInput.value= products[ind].description

    document.getElementById("addProduct").style.display = "none"
    document.getElementById("addedit").style.display = "inline-block"
}
function AddEdit() {
    // console.log(ind);
    products[currentInd].name = ProductNameInput.value
     products[currentInd].price= productPriceInput.value
     products[currentInd].category = productCategoryInput.value
    products[currentInd].description = productDescriptionInput.value 
    Display()
    localStorage.setItem("productList",JSON.stringify(products))
    document.getElementById("addProduct").style.display = "inline-block"
    document.getElementById("addedit").style.display = "none"
    clearForm()
}




function deleteProduct(index) {
    products.splice(index,1)
    console.log(products);
    Display()
    localStorage.setItem("productList",JSON.stringify(products))
}
function clearForm() {
    ProductNameInput.value=""
    productPriceInput.value=""
    productCategoryInput.value=""
    productDescriptionInput.value=""
}

function search() {
    var searchValue = searchButton.value.toLowerCase();
    console.log(searchValue);
    var temp  = ""
    for (var i=0 ;i<products.length;i++) {
        if (products[i].name.toLowerCase().includes(searchValue)==true
        ||
        products[i].category.toLowerCase().includes(searchValue)==true
        ) {
            temp+=  
        `<tr>
        <td>`+i+`</td>
        <td>`+products[i].name.toLowerCase().replace(searchValue,"<span class='text-danger fw-bold'>"+searchValue+"</span>")+`</td>
        <td>`+products[i].price+`</td>
        <td>`+products[i].category.toLowerCase().replace(searchValue,"<span class='text-danger fw-bold'>"+searchValue+"</span>")+`</td>
        <td>`+products[i].description+`</td>
        <td>
            <button onclick="deleteProduct(`+i+`)"(`+i+`)" class="btn btn-warning">update</button>
        </td>
        <td>
            <button onclick="deleteProduct(`+i+`)"(`+i+`)" class="btn btn-danger">delete</button>
        </td>
    </tr>`
        }
    }
    document.getElementById("tableBody").innerHTML=temp
}

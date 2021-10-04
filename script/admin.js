import { http } from "./http.js";
import { ui } from "./ui.js";

const productsURL = "https://61363d1a8700c50017ef54c1.mockapi.io/product";
// const addProductBtn = document.querySelector('.new-product-btn');
const addItem = document.querySelector('.admin-add-item-btn');
const imgInput = document.getElementById('image');
const nameInput = document.getElementById('name');
const priceInput = document.getElementById('price');
const stockInput = document.getElementById('stock');
const categoryInput = document.getElementById('category');
const typeInput = document.getElementById('type');
const descriptionInput = document.getElementById('description');
const validSvg = document.querySelectorAll('.valid_input_svg');
const adminForm = document.getElementById('admin-form');
const adminTable = document.getElementById('admin-tbody');
const cancel = document.getElementById('cancel');
let productToEdit;
let edit = false;
let id;
window.onload = () => {
    http.get(productsURL).then(products => {
        ui.showAllAdminProducts(products);
    });
};

adminForm.addEventListener('submit', addOrEditProducts);
adminTable.addEventListener('click', deleteProduct);
adminTable.addEventListener('click', editProduct);
cancel.addEventListener('click', cancelEdit);

console.log(productsURL);
function addOrEditProducts() {
    if (edit === true && validateInput() === true) {
        productToEdit = {
            image: imgInput.value,
            name: nameInput.value,
            price: priceInput.value,
            stock: stockInput.value,
            category: categoryInput.value,
            type: typeInput.value,
            description: descriptionInput.value
        };
        console.log(productToEdit)
        http
            .put(`${productsURL}/${id}`, productToEdit)
            .then(() => showAllAdminProducts());
        console.log(`${productsURL}/${id}`)
        ui.clearFields();
        id = '';
        edit = false;
        return;
    } else if (edit === false && validateInput() === true) {
        const product = {
            image: imgInput.value,
            name: nameInput.value,
            price: priceInput.value,
            stock: stockInput.value,
            category: categoryInput.value,
            type: typeInput.value,
            description: descriptionInput.value
        };

        http.post(productsURL, product).then(() => showAllAdminProducts());
        ui.clearFields();
    }
    // console.log(validateInput())
};

// console.log(addOrEditProducts)
// console.log(addOrEditProducts())

function editProduct(e) {
    edit = true;
    console.log('works');
    if (e.target.classList.contains('edit-btn')) {
        id = e.target.getAttribute('id');
        http.get(`${productsURL}/${id}`).then((data) => {
            imgInput.value = data.image;
            nameInput.value = data.name;
            priceInput.value = data.price;
            stockInput.value = data.stock;
            categoryInput.value = data.category;
            typeInput.value = data.type;
            descriptionInput.value = data.description;
        });
    };
}


function deleteProduct(e) {
    if (e.target.classList.contains('admin-delete-btn')) {
        console.log(e.target)
        id = e.target.getAttribute('id');
        console.log(id)
        http
            .delete(`${productsURL}/${id}`)
            .then(() => ui.showAllAdminProducts())
            .catch("Error on delete");
        // ui.Messagebanner product deleted
    }
    id = '';
}

function cancelEdit() {
    ui.clearFields;
}


function validateInput() {
    let valid = true;
    if (imgInput.value == '') {
        if (imgInput.classList.contains('input-invalid')) {
            imgInput.classList.remove('input-invalid');
        };
        ui.showAdminMessage('Must contain a link to an image', 0);
        imgInput.classList.add('input-invalid');
        valid = false;
    } else {
        imgInput.classList.add('input-valid');
        validSvg[0].style.display = "block";
    };

    if (nameInput.value === '') {
        if (nameInput.classList.contains('input-invalid')) {
            nameInput.classList.remove('input-invalid');
        };
        ui.showAdminMessage('Name is requierd', 1);
        nameInput.classList.add('input-invalid');
        valid = false;
    } else {
        // stockInput.classList.remove('input-invalid');
        nameInput.classList.add('input-valid');
        validSvg[1].style.display = "block";
    };

    if (priceInput.value == "" || isNaN(priceInput.value) || priceInput.value < 0) {
        if (priceInput.classList.contains('input-invalid')) {
            priceInput.classList.remove('input-invalid');
        };
        ui.showAdminMessage('Price must be a number greater then 0', 2);
        priceInput.classList.add('input-invalid');
        valid = false;
    } else {
        // stockInput.classList.remove('input-invalid');
        priceInput.classList.add('input-valid');
        validSvg[2].style.display = "block";
    };

    if (stockInput.value == "" || isNaN(stockInput.value) || stockInput.value < 0) {
        if (stockInput.classList.contains('input-invalid')) {
            stockInput.classList.remove('input-invalid');
        };
        ui.showAdminMessage('Stock must be a number greater then 0', 3);
        stockInput.classList.add('input-invalid');
        valid = false;
    } else {
        // stockInput.classList.remove('input-invalid');
        stockInput.classList.add('input-valid');
        validSvg[3].style.display = "block";
    };

    if (categoryInput.value === 'barware' || categoryInput.value === 'spirits') {
        // categoryInput.classList.remove('input-invalid');
        categoryInput.classList.add('input-valid');
        validSvg[4].style.display = "block";
    } else {
        ui.showAdminMessage('Category must be barware or spirits', 4);
        categoryInput.classList.add('input-invalid');
        valid = false;
    };
    return valid;
};

validateInput();
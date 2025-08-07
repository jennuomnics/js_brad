import laptopsDetails from "./data.js"
export let laptops = [...laptopsDetails]
const laptopsContainer = document.getElementById('laptopsContainer')

// Displaying Laptops in ui 

const DisplayLaptopsInUi = (laptop) => {

    const mainDiv = document.createElement('div')
    mainDiv.setAttribute('id', laptop.id)
    mainDiv.classList.add('details')

    const left_side = document.createElement('div')
    const right_side = document.createElement('div')

    left_side.classList.add('left-side')
    right_side.classList.add('right-side')
    left_side.innerHTML = `
        <img src="${laptop.image}" alt="${laptop.brand} ${laptop.model}">
    `;

    right_side.innerHTML = `
        <div class='wrapping'>
        <h2>${laptop.brand.toUpperCase()} ${laptop.model}</h2>
            <div>
            <i class="fa-solid fa-trash fa-lg delete" data-id="${laptop.id}" ></i>
            <i class="fa-solid fa-pen-to-square fa-lg update" ></i>
            </div>
        </div>
        
        <p class="description">
            ${laptop.description}
        </p>

        <div class="offer">
            <h2 class="offerPrice">
             <span class='oldPrice'><i class="fa-solid fa-indian-rupee-sign"></i>${
                laptop.price
                }</span>
            <i class="fa-solid fa-indian-rupee-sign"></i>${
              laptop.offerPrice
            }</h2>
            <button type="button" class="offer-button">Limited Offer</button>
        </div>
    `;

    laptop.specs.forEach((item, index) => {
        right_side.innerHTML += `
                <div class="align  ${index >= 4 ? "hidden-spec moreItems" : ""}">
                    <h3>${item.name}</h3>
                    <p>${item.value}</p>
                </div>
            `;
    });

    right_side.innerHTML += `
            <button class="view-more-btn">View More</button>
            <a href="${laptop.url}" target="_blank" class="shop-now-button">
                Shop Now <i class="fa-solid fa-arrow-right-to-bracket"></i>
            </a>
        `;



    const viewMoreBtn = right_side.querySelector(".view-more-btn");
    let expanded = false;

    viewMoreBtn.addEventListener("click", () => {
        const hiddenItems = right_side.querySelectorAll(".moreItems");

        hiddenItems.forEach((item) => {
            item.classList.toggle("hidden-spec");
        });

        expanded = !expanded;
        viewMoreBtn.textContent = expanded ? "View Less" : "View More";
    });

    mainDiv.appendChild(left_side)
    mainDiv.appendChild(right_side)
    laptopsContainer.appendChild(mainDiv)


}

const DisplayLaptopsUi = (laptops) => {
    laptopsContainer.innerHTML = '';
    laptops.map((singleLaptop) => {
        DisplayLaptopsInUi(singleLaptop)
    })
}

DisplayLaptopsUi(laptops)

// Add and Update Laptop
const form = document.getElementById("addLaptopForm");
const addSpecBtn = document.getElementById("addSpecBtn");
const specNameInput = document.getElementById("specName");
const specValueInput = document.getElementById("specValue");
const specRatingInput = document.getElementById("specRating");
const specDisplayContainer = document.getElementById("specDisplayContainer");


const addLaptopButton = document.querySelector('.addLaptop')
const addLaptopContainer = document.querySelector('#addLaptop')
const closeModal = document.getElementById("closeModal");


closeModal.addEventListener("click", () => {
    addLaptopContainer.classList.add("active");
});

// Add Specification and ratings in UI

let addedSpecs = [];
let addedRatings = [];

let editingLaptopId = null;


addLaptopButton.addEventListener('click', (e) => {
    addLaptopContainer.classList.remove('active')
    document.querySelector(".modal-title").textContent = "Add New Laptop";
    document.querySelector(".add-laptop-btn").textContent = "Add Laptop";
    specDisplayContainer.innerHTML = ``
    document.querySelector('.liketoAdd').classList.add('active')
    document.querySelector('#written').classList.add('active')
    form.reset();
})


addSpecBtn.addEventListener("click", () => {
    const name = specNameInput.value.trim().toUpperCase();
    const value = specValueInput.value.trim();
    const rating = parseInt(specRatingInput.value);

    if (!name || !value || isNaN(rating) || rating < 1 || rating > 5) {
        alert("Please enter valid spec name, value, and rating (1–5)");
        return;
    }

    addedSpecs.push({ name, value });
    addedRatings.push({ name, value: rating });

    const specItem = document.createElement("div");
    specItem.classList.add("spec-item");
    specItem.innerHTML = `<strong>${name}:</strong> ${value} | <i class="fa-solid fa-star" style="color: #FFD43B;"></i> ${rating}`;
    specDisplayContainer.appendChild(specItem);


    specNameInput.value = "";
    specValueInput.value = "";
    specRatingInput.value = "";
});



// Updating Laptop Details and Showing in form


laptopsContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete")) {
        if (!confirm("Are you sure you want to delete this laptop?")) return;
        const laptopId = e.target.dataset.id;
        laptops = laptops.filter((lap) => lap.id !== laptopId);
        DisplayLaptopsUi(laptops);
    }
    if (e.target.classList.contains("update")) {
        document.querySelector(".modal-title").textContent = "Edit Laptop";
        document.querySelector(".add-laptop-btn").textContent = "Update Laptop";
        const laptopId = e.target.closest(".details").id;
        const laptop = laptops.find((lap) => lap.id === laptopId);

        if (laptop) {
            editingLaptopId = laptop.id;


            form.brand.value = laptop.brand;
            form.model.value = laptop.model;
            form.image.value = laptop.image;
            form.description.value = laptop.description;
            form.price.value = laptop.price;
            form.offerPrice.value = laptop.offerPrice;
            form.url.value = laptop.url;
            const overallRating = laptop.ratings.find((r) => r.name === "overall");
            form.overallRating.value = overallRating ? overallRating.value : "";


            addedSpecs = [...laptop.specs];
            addedRatings = laptop.ratings.filter((r) => r.name !== "overall");



            addLaptopContainer.classList.remove("active");
        }
    }
});

// Form for Adding and deleting Laptop Details

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const overallRating = parseInt(data.get("overallRating"));
    const ratings = [...addedRatings, { name: "overall", value: overallRating }];

    const laptopData = {
        id: editingLaptopId || randomString(),
        brand: data.get("brand").trim(),
        model: data.get("model").trim(),
        image: data.get("image").trim() || "",
        description: data.get("description").trim(),
        price: parseFloat(data.get("price")),
        offerPrice: parseFloat(data.get("offerPrice")),
        url: data.get("url").trim(),
        specs: [...addedSpecs],
        ratings,
        score: overallRating,
    };

    if (editingLaptopId) {
        const index = laptops.findIndex((l) => l.id === editingLaptopId);
        if (index !== -1) {
            laptops[index] = laptopData;

            console.log("Updated Laptop:", laptops);


            const existingDiv = document.getElementById(editingLaptopId);

            if (existingDiv) {
                laptopsContainer.removeChild(existingDiv);
            }

            DisplayLaptopsUi(laptops)

        }
        editingLaptopId = null;
        form.reset();
        addedSpecs = [];
        addedRatings = [];
        specDisplayContainer.innerHTML = "";
        addLaptopContainer.classList.add("active");
    } else {
        laptops.unshift(laptopData);
        console.log(laptops)
        DisplayLaptopsUi(laptops)
        form.reset();
        addedSpecs = [];
        addedRatings = [];
        specDisplayContainer.innerHTML = "";
        document.querySelector('.liketoAdd').classList.remove('active')
        document.querySelector('#written').classList.remove('active')

    }


});

// Adding Specification
const newSpecificationModal = document.querySelector('#newSpecificationModal')

const anewSpecificationModalForm = document.querySelector('#anewSpecificationModalForm')

const LikeToadd = document.querySelector('.liketoAdd')

document.getElementById('closeModal3').addEventListener('click', () => {
    newSpecificationModal.classList.add('active')
})

LikeToadd.addEventListener('click', (e) => {
    addLaptopContainer.classList.add("active");
    newSpecificationModal.classList.remove('active')
})

anewSpecificationModalForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const index = 0
    newSpecificationModal.classList.add('active')
    laptops[index].specs = [...addedSpecs]
    laptops[index].ratings = [...addedRatings]
    specDisplayContainer.innerHTML = "";
    document.querySelector('.liketoAdd').classList.add('active')
    document.querySelector('#written').classList.add('active')
    DisplayLaptopsUi(laptops)
})

// Search Functionality for Laptops

const searchInput = document.getElementById("searchLaptop");
const searchRemove = document.getElementById('searchRemove')


searchInput.addEventListener("input", function() {
    searchRemove.classList.remove('active')
    const query = this.value.trim().toLowerCase();
    if (query === "") {
        searchRemove.classList.add('active')
        DisplayLaptopsUi(laptops);
    } else {
        const filteredLaptops = laptops.filter((laptop) => {
            return (
                laptop.brand.toLowerCase().includes(query) ||
                laptop.model.toLowerCase().includes(query)
            );
        });
        if (filteredLaptops.length === 0) {
            laptopsContainer.innerHTML = `<p style="margin-top: 20px; color: red; text-align: center;">No laptops found.</p>`;
        } else {
            DisplayLaptopsUi(filteredLaptops);
        }
    }
});

searchRemove.addEventListener('click', () => {
    searchInput.value = ''
    searchRemove.classList.add('active')
    DisplayLaptopsUi(laptops);
})


function randomString() {
    var chars =
        "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz".split("");

    length = Math.floor(Math.random() * chars.length);
    var str = "";
    for (var i = 0; i < length; i++) {
        str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
}
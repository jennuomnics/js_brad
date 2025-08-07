import { laptops } from "./script.js";

// comaparision Results table 

const tbody = document.querySelector("tbody");
// Displaying Best Laptop
const best_one = document.querySelector("#best-one");

let bestLap = null

const DisplayBestLaptop = (laptop) => {
    best_one.classList.remove("active");
    let left_side = document.querySelector("#best-one .left-side img");
    let right_side = document.querySelector("#best-one .right-side");
    left_side.setAttribute("src", `${laptop.image}`);
    right_side.innerHTML = `
       <p class="recomended">Recommended After Comparison</p>
           <h2>${laptop.brand.toUpperCase()} ${laptop.model}</h2>
        <div class="underline"></div>
        <p class="description">
            ${laptop.description}
        </p>

        <div class="offer">
           
            <h1>
             <span class='oldPrice'><i class="fa-solid fa-indian-rupee-sign"></i>${
               laptop.price
                }</span>
            <i class="fa-solid fa-indian-rupee-sign"></i>${
              laptop.offerPrice
            }</h1>
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
};


document.querySelector('#closeModal1').addEventListener('click', (e) => {
    best_one.classList.add("active");
})

//  laptop comparison

const laptop1 = document.querySelector(".laptop1");
const laptop2 = document.querySelector(".laptop2");
const laptop3 = document.querySelector(".laptop3");
const compareButton = document.querySelector(".compare-button");


export function updatingChangeSelectOptions() {
    const selected1 = laptop1.value;
    const selected2 = laptop2.value;
    const selected3 = laptop3.value;

    console.log(selected1, selected2, selected3)

    updateSelect(laptop1, [selected2, selected3], selected1);
    updateSelect(laptop2, [selected1, selected3], selected2);
    updateSelect(laptop3, [selected1, selected2], selected3);
}


function updateSelect(dropdown, excludedIds, currentSelected) {
    dropdown.innerHTML = `<option value="">Choose Laptop</option>`;
    laptops.forEach(laptop => {
        const isExcluded = excludedIds.includes(laptop.id);
        const isSelected = laptop.id === currentSelected;
        if (!isExcluded || isSelected) {
            dropdown.innerHTML += `<option value="${laptop.id}" ${isSelected ? 'selected' : ''}>${laptop.brand} ${laptop.model}</option>`;
        }
    });
}

updatingChangeSelectOptions();

[laptop1, laptop2, laptop3].forEach(dropdown => {
    dropdown.addEventListener('change', updatingChangeSelectOptions);
});

// comparision for 3 Laptops

compareButton.addEventListener("click", () => {
    const id1 = laptop1.value;
    const id2 = laptop2.value;
    const id3 = laptop3.value;

    if (!id1 || !id2 || !id3) {
        alert("Please select all three laptops.");
        return;
    }

    if (new Set([id1, id2, id3]).size < 3) {
        alert("Please select three different laptops.");
        return;
    }

    const getScore = (id) => {
        const laptop = laptops.find(l => l.id === id);
        return laptop.ratings.reduce((sum, r) => sum + r.value, 0);
    };

    const scores = [
        { id: id1, score: getScore(id1) },
        { id: id2, score: getScore(id2) },
        { id: id3, score: getScore(id3) },
    ];

    scores.sort((a, b) => b.score - a.score);
    const bestLaptop = laptops.find(l => l.id === scores[0].id);

    // alert(`Best Laptop: ${bestLaptop.brand} ${bestLaptop.model} (Score: ${scores[0].score})`);

    const selectedLaptops = [
        laptops.find(l => l.id === id1),
        laptops.find(l => l.id === id2),
        laptops.find(l => l.id === id3)
    ];

    document.querySelector('.comparisionResults').classList.remove('active')
    bestLap = bestLaptop
    laptop1.value = ''
    laptop2.value = ''
    laptop3.value = ''
    updatingChangeSelectOptions();
    showComparisonTable(selectedLaptops);
});


// View Comparion Model


document.getElementById('viewResults').addEventListener('click', (e) => {
    DisplayBestLaptop(bestLap)
    best_one.classList.remove('active')

})


// Comparison table Details

function showComparisonTable(selectedLaptops) {
    tbody.innerHTML = "";

    const specNameSet = new Set();
    selectedLaptops.forEach(laptop => {
        laptop.specs.forEach(spec => {
            specNameSet.add(spec.name);
        });
    });

    const sortedSpecNames = Array.from(specNameSet).sort();

    sortedSpecNames.forEach(specName => {
        const row = document.createElement("tr");
        row.setAttribute("data-spec", specName);

        const th = document.createElement("th");
        th.textContent = specName.charAt(0).toUpperCase() + specName.slice(1);
        row.appendChild(th);


        const ratingValues = selectedLaptops.map(laptop => {
            const rating = laptop.ratings.find(r => r.name === specName);
            return rating ? rating.value : -1;
        });

        const maxRating = Math.max(...ratingValues);


        selectedLaptops.forEach((laptop, index) => {
            const spec = laptop.specs.find(s => s.name === specName);
            const value = spec ? spec.value : "---";
            const isMax = ratingValues[index] === maxRating;

            const td = document.createElement("td");
            td.innerHTML = isMax ?
                `${value} <i class="fa-solid fa-check" style="color: #14db22;"></i>` :
                value;
            row.appendChild(td);
        });


        const tdAction = document.createElement("td");
        tdAction.innerHTML = `
      <i class="fa-solid fa-trash fa-lg delete"></i>
      <i class="fa-solid fa-pen-to-square fa-lg update"></i>
    `;
        row.appendChild(tdAction);

        tbody.appendChild(row);
    });




    document.getElementById("header1").innerHTML = `${selectedLaptops[0].brand} ${selectedLaptops[0].model} <a href="#${selectedLaptops[0].id}"><i class="fa-solid fa-eye" style="color: #1c95f2;"></i></a>`;
    document.getElementById("header2").innerHTML = `${selectedLaptops[1].brand} ${selectedLaptops[1].model} <a href="#${selectedLaptops[1].id}"><i class="fa-solid fa-eye" style="color: #1c95f2;"></i></a>`;
    document.getElementById("header3").innerHTML = `${selectedLaptops[2].brand} ${selectedLaptops[2].model} <a href="#${selectedLaptops[2].id}"><i class="fa-solid fa-eye" style="color: #1c95f2;"></i></a>`;
}

//  update and delete specification

tbody.addEventListener("click", (e) => {
    if (e.target.tagName === "I") {
        const row = e.target.closest("tr");
        if (!row) return;

        const specName = row.dataset ? row.dataset.spec : undefined;

        if (!specName) return;
        const header1 = document.getElementById("header1").textContent.split(" ")[0];
        const header2 = document.getElementById("header2").textContent.split(" ")[0];
        const header3 = document.getElementById("header3").textContent.split(" ")[0];

        const selectedLaptops = [
            laptops.find(l => l.brand === header1),
            laptops.find(l => l.brand === header2),
            laptops.find(l => l.brand === header3)
        ];

        if (e.target.classList.contains("delete")) {
            if (confirm("Do you want to Delete the Specification?")) {
                row.remove();
                selectedLaptops.forEach(laptop => {
                    laptop.specs = laptop.specs.filter(spec => spec.name !== specName);
                });
                console.log("''' Updated laptops after delete:", laptops);
            }
        }

        if (e.target.classList.contains("update")) {
            const inputs = row.querySelectorAll("td input");

            console.log(inputs, inputs.length)

            if (inputs.length) return;

            console.log('surya line 1023')
            const specCells = row.querySelectorAll("td");
            const originalValues = Array.from(specCells).slice(0, 3).map(td => td.textContent);

            specCells.forEach((td, i) => {
                if (i < 3) {
                    td.innerHTML = `<input type='text' value='${originalValues[i]}' class='inputSpec' />`;
                }
            });

            const actionTd = specCells[3];
            actionTd.innerHTML = `
              <button class='save'>Save</button>
              <button class='cancel'>Cancel</button>
            `;

            actionTd.querySelector(".save").addEventListener("click", () => {
                const updatedValues = Array.from(row.querySelectorAll("input")).map(input => input.value.trim());
                if (updatedValues.some(val => val === "")) {
                    alert("Enter valid specifications for all laptops.");
                    return;
                }

                updatedValues.forEach((val, idx) => {
                    row.children[idx + 1].textContent = val;
                });

                selectedLaptops.forEach((laptop, idx) => {
                    const existingSpec = laptop.specs.find(s => s.name === specName);
                    if (existingSpec) {
                        existingSpec.value = updatedValues[idx];
                    } else {
                        laptop.specs.push({ name: specName, value: updatedValues[idx] });
                    }
                });

                actionTd.innerHTML = `
                  <i class="fa-solid fa-trash fa-lg delete"></i>
                  <i class="fa-solid fa-pen-to-square fa-lg update"></i>
                `;
                showComparisonTable(selectedLaptops)

                console.log("''' Updated laptops after update:", laptops);
            });



            actionTd.querySelector(".cancel").addEventListener("click", () => {
                originalValues.forEach((val, idx) => {
                    row.children[idx + 1].textContent = val;
                });
                actionTd.innerHTML = `
          <i class="fa-solid fa-trash fa-lg delete"></i>
          <i class="fa-solid fa-pen-to-square fa-lg update"></i>
        `;
            });
        }
    }
});

// Adding Specifications

const addSpecificationForm = document.querySelector(".addForm");
const modelsContainer = document.getElementById("modelsContainer");
const pendingSpecifications = {};

function updatingChangeLaptopDropdown() {
    const selector = document.getElementById("modelSelector");
    selector.innerHTML = `<option value="">-- Select Laptop --</option>`;
    laptops.forEach(laptop => {
        const option = document.createElement("option");
        option.value = laptop.id;
        option.textContent = `${laptop.brand} - ${laptop.model}`;
        selector.appendChild(option);
    });
}


updatingChangeLaptopDropdown()


document.getElementById("addModel").addEventListener("click", () => {
    const laptopId = document.getElementById("modelSelector").value;
    const value = document.getElementById("modelSpecValue").value.trim();
    const rating = parseInt(document.getElementById("modelRating").value);
    const specName = document.getElementById("specificationName").value.trim();

    if (!laptopId || !specName || !value || isNaN(rating) || rating < 1 || rating > 5) {
        alert("Please enter all valid values.");
        return;
    }

    if (!pendingSpecifications[laptopId]) pendingSpecifications[laptopId] = [];

    const alreadyAdded = pendingSpecifications[laptopId].some(s => s.name === specName);
    if (alreadyAdded) {
        alert("Specification already added for this laptop.");
        return;
    }

    pendingSpecifications[laptopId].push({ name: specName, value, rating });

    const modelsContainer = document.getElementById("modelsContainer");
    const laptop = laptops.find(l => l.id === laptopId);
    const div = document.createElement("div");
    div.textContent = `${laptop.brand} - ${laptop.model}: ${specName} = ${value} (Rating: ${rating})`;
    modelsContainer.appendChild(div);

    document.getElementById("modelSpecValue").value = "";
    document.getElementById("modelRating").value = "";
});

// Adding Specification Form Submision

document.querySelector(".addForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const specName = document.getElementById("specificationName").value.trim();

    if (!specName || Object.keys(pendingSpecifications).length === 0) {
        alert("Fill the form completely and add at least one laptop spec.");
        return;
    }

    Object.entries(pendingSpecifications).forEach(([laptopId, specsArray]) => {
        const laptop = laptops.find(l => l.id === laptopId);
        specsArray.forEach(spec => {
            laptop.specs.push({ name: spec.name.toUpperCase(), value: spec.value });
            laptop.ratings.push({ name: spec.name.toUpperCase(), value: spec.rating });
        });
    });
    const id1 = laptop1.value;
    const id2 = laptop2.value;
    const id3 = laptop3.value;

    const selectedLaptops = [
        laptops.find(l => l.id === id1),
        laptops.find(l => l.id === id2),
        laptops.find(l => l.id === id3)
    ];

    showComparisonTable(selectedLaptops)

    console.log("Updated laptops:", laptops);

    Object.keys(pendingSpecifications).forEach(k => delete pendingSpecifications[k]);
    document.getElementById("modelsContainer").innerHTML = "";
    document.querySelector(".addForm").reset();
    updatingChangeLaptopDropdown();
    alert("Specifications added successfully.");
});

document.querySelector(".addSpecification").addEventListener("click", () => {
    const formBox = document.querySelector(".add-from");
    formBox.classList.toggle("active");
    document.querySelector(".addSpecification").innerHTML = formBox.classList.contains("active") ?
        `Add Specification <i class="fa-solid fa-plus fa-lg"></i>` :
        `Cancel Adding`;
    if (formBox.classList.contains("active")) updatingChangeLaptopDropdown();
});

// Thanks Modal 

const thankYouSection = document.querySelector('#thankyou')
const contactForm = document.querySelector('.conFom')


contactForm.addEventListener('submit', (e) => {
    e.preventDefault()

    thankYouSection.classList.remove('active')
    setTimeout(() => {
        thankYouSection.classList.add('active')
        console.log(document.querySelector('.conFom'))
        document.querySelector('.conFom').reset()

    }, 2000)
})
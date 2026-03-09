async function LoadCars(filters = {}) {
    try {
        const query = new URLSearchParams({
            make: filters.make || "",
            model: filters.model || "",
            maxPrice: filters.maxPrice || "",
            maxMileage: filters.maxMileage || "",
            sort: filters.sort || ""
        });

        const response = await fetch(`http://localhost:3000/api/cars?${query.toString()}`);

        if (!response.ok) {
            throw new Error(`HTTP error ${response.status}`);
        }

        const cars = await response.json();
        DisplayCars(cars);
    } catch (error) {
        console.error("Failed to load cars:", error);
    }
}

function DisplayCars(cars) {
    const carListContainer = document.getElementById("CarListContainer");

    if (cars.length === 0) {
        carListContainer.innerHTML = `
            <li>
                <div class="CarCard">
                    <div class="Container">No cars found.</div>
                </div>
            </li>
        `;
        return;
    }

    carListContainer.innerHTML = cars.map(car => `
        <li>
            <div class="CarCard">
                <div class="Container">
                    <div class="CarName">${car.title}</div>
                    <p><strong>Make:</strong> ${car.make}</p>
                    <p><strong>Model:</strong> ${car.model}</p>
                    <p><strong>Year:</strong> ${car.year}</p>
                    <p><strong>Price:</strong> $${car.price.toLocaleString()}</p>
                    <p><strong>Mileage:</strong> ${car.mileage.toLocaleString()} miles</p>
                </div>
            </div>
        </li>
    `).join("");
}

document.getElementById("SearchBar").addEventListener("submit", function(event) {
    event.preventDefault();

    const filters = {
        make: document.getElementById("MakeInput").value.trim(),
        model: document.getElementById("ModelInput").value.trim(),
        maxPrice: document.getElementById("MaxPriceInput").value.trim(),
        maxMileage: document.getElementById("MaxMileageInput").value.trim(),
        sort: document.getElementById("SortInput").value
    };

    LoadCars(filters);
});

function ClearSearchInput() {
    document.getElementById("SearchBar").reset();
    LoadCars({});
}

LoadCars();
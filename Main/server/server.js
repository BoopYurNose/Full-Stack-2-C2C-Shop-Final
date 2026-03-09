const express = require("express"); //NOTE: Remember everytime you update this script, you need to update the server too PLEASE DON'T FUCKING FORGET THIS,
const cors = require("cors"); // LAST TIME YOU SPENT 6 HOURS TRYING TO DEBUG THIS, ONLY TO REALIZE YOU HADN'T UPDATED YOUR SERVER THE COMMAND GOES AS FOLLOWS PLEASE PLEASE DON'T FORGET THIS!
// node Main/server/server.js
// also keep in mind before this delete the old terminal start a new one then run this command for future reference, :D don't be a dumbass

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/api/cars", (req, res) => {
    const make = (req.query.make || "").toLowerCase(); // make all search related stuff lowercased so you don't have capitlization case sensitive issues :3
    const model = (req.query.model || "").toLowerCase();
    const maxPrice = Number(req.query.maxPrice) || Infinity;
    const maxMileage = Number(req.query.maxMileage) || Infinity;
    const sort = req.query.sort || "";

    const cars = [
        { title: "Honda S2000", make: "Honda", model: "S2000", year: 2009, price: 28000, mileage: 284352},
        { title: "Porsche Boxster", make: "Porsche", model: "Boxster", year: 2001, price: 16000, mileage: 20000},
        { title: "Honda Beat", make: "Honda", model: "Beat", year: 1992, price: 11000, mileage: 323532, source: "AutoTrader" },
        { title: "Honda Civic EX", make: "Honda", model: "Civic", year: 2001, price: 4500, mileage: 542352},
        { title: "Honda Prelude 3rd gen", make: "Honda", model: "Prelude", year: 1990, price: 8000, mileage: 1084352}
    ];

    let filteredCars = cars.filter((car) => {
        const matchesMake = make === "" || car.make.toLowerCase().includes(make);
        const matchesModel = model === "" || car.model.toLowerCase().includes(model);
        const matchesPrice = car.price <= maxPrice;
        const matchesMileage = car.mileage <= maxMileage;

        return matchesMake && matchesModel && matchesPrice && matchesMileage;
    });

    if (sort === "price-asc") {
        filteredCars.sort((a, b) => a.price - b.price);
    } else if (sort === "price-desc") {
        filteredCars.sort((a, b) => b.price - a.price);
    } else if (sort === "mileage-asc") {
        filteredCars.sort((a, b) => a.mileage - b.mileage);
    } else if (sort === "mileage-desc") {
        filteredCars.sort((a, b) => b.mileage - a.mileage);
    } else if (sort === "year-desc") {
        filteredCars.sort((a, b) => b.year - a.year);
    } else if (sort === "year-asc") {
        filteredCars.sort((a, b) => a.year - b.year);
    }

    res.json(filteredCars);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
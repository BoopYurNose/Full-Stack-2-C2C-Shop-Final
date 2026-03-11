const express = require("express"); //NOTE: Remember everytime you update this script, you need to update the server too PLEASE DON'T FUCKING FORGET THIS,
const cors = require("cors"); // LAST TIME YOU SPENT 6 HOURS TRYING TO DEBUG THIS, ONLY TO REALIZE YOU HADN'T UPDATED YOUR SERVER THE COMMAND GOES AS FOLLOWS PLEASE PLEASE DON'T FORGET THIS!
// node Main/server/server.js
// also keep in mind before this delete the old terminal start a new one then run this command for future reference, :D don't be a dumbass

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/api/cars", (req, res) => {
    const make = (req.query.make || "").toLowerCase();
    const model = (req.query.model || "").toLowerCase();
    const maxPrice = Number(req.query.maxPrice) || Infinity;
    const maxMileage = Number(req.query.maxMileage) || Infinity;
    const sort = req.query.sort || "";

    const cars = [
        { title: "Honda S2000", make: "Honda", model: "S2000", year: 2009, price: 28000, mileage: 284352},
        { title: "Porsche Boxster", make: "Porsche", model: "Boxster", year: 2001, price: 16000, mileage: 20000},
        { title: "Honda Beat", make: "Honda", model: "Beat", year: 1992, price: 11000, mileage: 78913, source: "AutoTrader" },
        { title: "Honda Civic EX", make: "Honda", model: "Civic", year: 2001, price: 4500, mileage: 542352},
        { title: "Honda Prelude 3rd gen", make: "Honda", model: "Prelude", year: 1990, price: 8000, mileage: 1084352},
        { title: "Chevrolet Silverado", make: "Chevrolet", model: "Silverado LT", year: 2011, price: 3000, mileage: 329021},
        { title: "Chevrolet Corvette", make: "Chevrolet", model: "Corvette", year: 2005, price: 23900, mileage: 67800},
        { title: "Nissan Altima", make: "Nissan", model: "Altima", year: 2015, price: 13599, mileage: 85682},
        { title: "Acura NSX", make: "Acura", model: "NSX", year: 2017, price: 133990, mileage: 14576},
        { title: "Honda NSX", make: "Honda", model: "NSX", year: 1991, price: 105769, mileage: 19329},
        { title: "Audi A6 Premium", make: "Audi", model: "A6", year: 2023, price: 36998, mileage: 18502},
        { title: "BMW X3 XDrive30i", make: "BMW", model: "X3", year: 2018, price: 21998, mileage: 62195},
        { title: "Cadillac CT4 Sport", make: "Cadillac", model: "Cadillac", year: 2025, price: 42998, mileage: 11014},
        { title: "Dodge Challenger SRT Hellcat", make: "Dodge", model: "Challenger SRT Hellcat", year: 2019, price: 67899, mileage: 10525},
        { title: "Mazda CX-9 Grand Touring", make: "Mazda", model: "CX-9 Grand Touring", year: 2023, price: 31998, mileage: 19522},
        { title: "Mitsubishi Lancer ES", make: "Mitsubishi", model: "Lancer ES", year: 2017, price: 15998, mileage: 34981},
        { title: "Mazda CX-9 Grand Touring", make: "Mazda", model: "CX-9 Grand Touring", year: 2023, price: 31998, mileage: 19522},
        { title: "Subaru Impreza", make: "Subaru", model: "Impreza", year: 2017, price: 12990, mileage: 104341},
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
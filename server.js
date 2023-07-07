const express = require("express");
const app = express();
const port = 4000;

const car = [
    {
      id: 1,
      image: {
        src: "https://hips.hearstapps.com/hmg-prod/images/2023-audi-rs-6-avant-performance107-6499d1e3764fc.jpg?crop=0.932xw:0.350xh;0.0442xw,0.336xh&resize=1200:*",
        alt: "Audi RS6",
      },
      company: "Audi",
      title: "RS6",
    },
    {
      id: 2,
      image: {
        src: "https://www.cnet.com/a/img/resize/aee6fa621890d809c11d9c680911771b8a3db106/hub/2021/10/13/b8024a0e-b1a4-400c-96d5-1d68ee22e498/2022-bmw-m5-cs-011.jpg?auto=webp&width=1200",
        alt: "BMW M5",
      },
      company: "BMW",
      title: "M5 CS",
    },
    {
        id: 3,
        image: {
          src: "https://hips.hearstapps.com/hmg-prod/images/2023-mercedes-amg-e63-s-4matic-103-1671563913.jpg?crop=0.466xw:0.350xh;0.311xw,0.465xh&resize=1200:*",
          alt: "AMG",
        },
        company: "Mercedes-Benz",
        title: "E63 AMG",
      }
  ];

  app.use((req, res, next) => {
    console.log(`Request: ${req.method} ${req.originalUrl}`);
    next();
  });
  app.use(express.json())

app.get("/", (req, res) => {
  res.send("Cars API!");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});


// List all jobs
app.get("/car", (req, res) => {
    res.send(car);
  });
  
  // Get a specific job
  app.get("/car/:id", (req, res) => {
    // This will eventually return a specific job
  });
  function getNextIdFromCollection(collection) {
    if(collection.length === 0) return 1; 
    const lastRecord = collection[collection.length - 1];
    return lastRecord.id + 1;
  }
  
  // Create a new job
  app.post("/car", (req, res) => {
    // This will eventually create a new job
    const newCar = {
      ...req.body,
      id: getNextIdFromCollection(car)
    };
    console.log("newCar", newCar);
    car.push(newCar);
    res.send(newCar);
  });
  
  // Update a specific job
  app.patch("/car/:id", (req, res) => {
    const carId = parseInt(req.params.id, 10);
    const carUpdates = req.body;
     const carIndex = car.findIndex((c) => c.id === carId);
     const updatedCar = { ...car[carIndex], ...carUpdates };
     if (carIndex !== -1) {
    car[carIndex] = updatedCar;
    res.send(updatedCar);
     } else {
    res.status(404).send({ message: "Car not found" });
  }
  });
  
  // Delete a specific job
  app.delete("/car/:id", (req, res) => {
    // This will eventually delete a specific job
    const carId = parseInt(req.params.id, 10);
    const carIndex = car.findIndex(c => c.id === carId);
    if (carIndex !== -1) {
        car.splice(carIndex, 1);
        res.status(204).send();
    } else {
        res.status(404).send({ message: "Car not found" });
    }
});
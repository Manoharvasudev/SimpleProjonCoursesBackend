const express = require('express')
const app = express();

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

let courses = [
    {
        id: "11",
        course: "Learn Reactjs",
        price: 299
    },
    {
        id: "22",
        course: "Learn Angular",
        price: 399
    },
    {
        id: "33",
        course: "Learn MongoDB",
        price: 499
    }
];
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json());

app.get('/',(req,res) => {
    res.send(`Server is running Successfully....`)
})

app.get('/api/v1/lco',(req,res) => {
    res.send(`Hii, there Welcome to LCO`)
})

app.get('/api/v1/lcoObject',(req,res) => {
    res.send({id: "666", course: "Backend", price: 999})
})

app.get('/api/v1/lcoArray',(req,res) => {
    res.send(courses)
})

app.get("/api/v1/myCourses/:courseId",(req,res) => {
    const myCourses = courses.find((course) => course.id === req.params.courseId)
    res.send(myCourses)
})

app.post("/api/v1/addCourses",(req,res) => {
    console.log(req.body);
    courses.push(req.body);
    res.send(true);
})

app.get('/api/v1/courseQuery',(req,res) => {
    let location = req.query.location;
    let device = req.query.device;
    res.send({location,device})
})

app.listen(4000,() =>{
    console.log('Server is running in PORT 4000');
})
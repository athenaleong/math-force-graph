const {MongoClient, ObjectID} = require('mongodb');
const uri = "mongodb+srv://chris:SGbxGijIACwFWoxD@cluster0.2lusr.mongodb.net/mathmap?retryWrites=true&w=majority";
var pointCollection; 
MongoClient.connect(uri)
.then(client => {  
    console.log('Connected to Math Map')
    const db = client.db('mathmap');
    pointCollection =  db.collection('point');
}).then(async () => {
    // Mult 5ff8708187405569cf66b620
    // Whole Number Add 5ff8708187405569cf66b61f
    const WholeNumbers = ['Numbers up to 100', 'Addition & Subtraction', 'Multiplication & Division', 'Numbers up to 1000', 'Numbers up to 10000', 'Numbers up to 100000', 'Factors & Multiples', 'Four Operations', 'Numbers up to 10 million']
    //5ff8714f7f953d6d6b9e5d24
    const Money = ['Money']
    // Fraction Add  5ff8714f7f953d6d6b9e5d26
    const Fraction = ['Fraction of a whole', 'Addition & Subtraction', 'Equivalent fractions', 'Mixed Numbers & Improper Fractions', 'Fraction of a Set of Objects', 'Fraction & Division', 'Four Operations']
   // Decimals Add 5ff8714f7f953d6d6b9e5d2d
   // Decimal Mult 5ff8714f7f953d6d6b9e5d2e
    const Decimals = ['Decimals up to 3 decimal places', 'Addition & Subtraction', 'Multiplication & Division', 'Four Operations']
    // 5ff87236d2447b7177c0ad54
    const Percentage = ['Percentage']
    //5ff87236d2447b7177c0ad55
    const Ratio = ['Ratio']
    const RateAndSpeed = ['Rate', 'Distance, Time & Speed']
    //5ff871fc0c3eb3707e9b70cb
    const Algebra = ['Algebra']

    const Measurement = ['Length', 'Time', 'Length, Mass & Volume']
    const Geometry = ['2D Shapes', '3D Shapes', 'Angles', 'Perpendicular & Parallel Lines', 'Rectangle & Square', 'LineSymmetry', 'Triangle', 'Parallelogram, Rhombus & Trapezium', 'Special Quadrilaterals', 'Nets']
    const AreaAndVolume = ['Area & Perimeter', 'Area of Triangle', 'Volume of Cube & Cuboid', 'Area & Circumference of Circle']

    const DataRep = ['Picture Graphs', 'Bar Graphs', 'Tables & Line Graphs', 'PieCharts']
    const DataAnalysis = ['Average']

    LengthMassVolume_2 = [' measuring ∙ length in metres/centimetres ∙ mass in kilograms/grams ∙ volume of liquid in litres', 'measuring and drawing a line segment to the nearest cm', 'using appropriate units of measurement and their abbreviations cm, m, g, kg', 'comparing and ordering ∙ lengths ∙ masses ∙ volumes', 'solving word problems involving length/mass/ volume']
    LengthMassVolume_3 = ['measuring ∙ length in kilometres (km) ∙ volume of liquid in millilitres (ml)', 'measuring length/mass/volume (of liquid) in compound units', 'converting a measurement in compound units to the smaller unit, and vice versa']
    Time_1 = ['telling time to the hour/half hour']
    Time_2 = ['telling time to 5 minutes', 'use of ‘a.m.’ and ‘p.m.’', 'use of abbreviations h and min', 'drawing hands on the clock face to show time 2.5 duration of 1 hour/half hour']
    Time_3 = ['telling time to the minute', 'use of ‘past’ and ‘to’ to tell time', 'measuring time in hours and minutes', 'converting time in hours and minutes to minutes only, and vice versa', 'finding the starting time, finishing time or duration given the other two quantities', 'solving problems involving time in hours and minutes']
    Time_4 = ['measuring time in seconds', '24-hour clock', 'solving problems involving time in 24-hour clock']

    // const RateAndSpeed = ['Rate', 'Distance, Time & Speed']


    json = [];


    var meow = await pointCollection.findOne({name: {$eq: 'Length, Mass & Volume'}, state: {$eq: 'sub-substrand'}});
    var id = meow._id ;
    

    LengthMassVolume_2.forEach(value => {
        json.push({
            'name':  value,
            'parent' : [new ObjectID(id)],
            'state': 'leaf',
            'level' : 2
        })
    })

    LengthMassVolume_3.forEach(value => {
        json.push({
            'name':  value,
            'parent' : [new ObjectID(id)],
            'state': 'leaf',
            'level' : 3
        })
    })

    var meow = await pointCollection.findOne({name: {$eq: 'Time'}, state: {$eq: 'sub-substrand'}});
    var id = meow._id ;

    Time_1.forEach(value => {
        json.push({
            'name':  value,
            'parent' : [new ObjectID(id)],
            'state': 'leaf',
            'level' : 1
        })
    })

    Time_2.forEach(value => {
        json.push({
            'name':  value,
            'parent' : [new ObjectID(id)],
            'state': 'leaf',
            'level' : 2
        })
    })

    Time_3.forEach(value => {
        json.push({
            'name':  value,
            'parent' : [new ObjectID(id)],
            'state': 'leaf',
            'level' : 3
        })
    })

    Time_4.forEach(value => {
        json.push({
            'name':  value,
            'parent' : [new ObjectID(id)],
            'state': 'leaf',
            'level' : 4
        })
    })


    



    

    


    pointCollection.insertMany(json);
    console.log('inserted')

    // pointCollection.remove({parent : {$eq: [ new ObjectID('5ff5c50a9b5920837d7b5a70')]}, 'state': {$eq : 'leaf'}})
    // console.log('inserted')

})



const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];


for(let i=0; i< numbers.length; i++){
    console.log(`Element at index ${i} is ${numbers[i]}`);
}

//Slice creates a copy of the element
const numbersCopy = numbers.slice();
console.log(numbersCopy);
const copy = numbers === numbersCopy;
console.log(copy);

const  [one, two, three, four, five] = [1, 2, 3, 4, 5];
console.log(one, two, three, four, five);

const [ntwo, numone = 1] = [2];
console.log(numone);
console.log(ntwo);

let [,,,,,,,,[,,eleven]] =  [1,2,3,4,5,6,7,8, [9, 10, 11]];
console.log(eleven);

//Reading the element to the left, rest params
const [twelve, thirteen, fourteen, ...num] = [12, 13, 14, 15, 16, 17, 18, 19, 20];
console.log(12);
console.log(13);
console.log(14);
console.log(num);

//Creating a copy of the element
const nums = [12, 13, 14, 15, 16];
const numsCopy = [...nums];
console.log(numsCopy);


const lett1 = ['A', 'B', 'C'];
const lett2 = ['D', 'E', 'F'];

const letters = lett1.concat(lett2);
console.log(letters);


//Join array with operator or separar of your choice
const lets = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
const joined = lets.join('<-->');
console.log(joined);


//Replace array with fill method
const letts = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

const filled = letts.fill('Z', 4, 8);
console.log(letts);

//Check if element exists in an array with includes method
const lettsi = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
const includ = lettsi.includes('D')
console.log(includ);

const lettsio = ['A', 'G', 'C', 'D', 'E', 'F', 'G'];
const includio = lettsi.indexOf('D')
const lincludio = lettsi.lastIndexOf('G')
console.log(includio);
console.log(lincludio);

const planets = ['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Sartun', 'Uranus', 'Neptune', 'Pluto'];
//Reverse realigns the positions starting from the last element
const reversed = planets.reverse();
console.log(reversed);
//Sort changes or sorts the elements positions in ascending
const sorted = planets.sort();

console.log(sorted);

const numbs = [ 6, 12, 4, 65, 78,  89, 80, 24, 28, 34, 56,];
const sorts = numbs.sort((a, b) => (a-b));
console.log(sorts);


const planeterium = ['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Sartun', 'Uranus', 'Neptune', 'Pluto'];
 planeterium.splice(3, 0, 'Maxima');

console.log(planeterium);

const splaneterium = ['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Sartun', 'Uranus', 'Neptune', 'Pluto'];
const planetos = splaneterium.splice(3, 1, 'Maxima');

console.log(planetos);
console.log(splaneterium);


// document.getElementsByTagName('li').forEach(() => {
    
// });;

let planetts = [
    {
        'id': 001,
        'f_name': 'Mercury',
        'l_name': 'First',
        'gender': 'M',
        'married': false,
        'age': 22,
        'paid': 250,
        'courses': ['JavaScript', 'Angular'],
    },
    {
        'id': 002,
        'f_name': 'Venus',
        'l_name': 'Second',
        'gender': 'F',
        'married': true,
        'age': 23,
        'paid': 150,
        'courses': ['JavaScript', 'Vue'],
    },
    {
        'id': 003,
        'f_name': 'Earth',
        'l_name': 'Third',
        'gender': 'M',
        'married': false,
        'age': 24,
        'paid': 350,
        'courses': ['JavaScript', 'React'],
    },
    {
        'id': 004,
        'f_name': 'Mars',
        'l_name': 'Fourth',
        'gender': 'F',
        'married': true,
        'age': 25,
        'paid': 250,
        'courses': ['PHP', 'Laravel'],
    },
    {
        'id': 005,
        'f_name': 'Jupiter',
        'l_name': 'Fifth',
        'gender': 'M',
        'married': false,
        'age': 25,
        'paid': 350,
        'courses': ['Python', 'Django'],
    },
    {
        'id': 003,
        'f_name': 'Uranus',
        'l_name': 'Sixth',
        'gender': 'F',
        'married': true,
        'age': 25,
        'paid': 350,
        'courses': ['Java', 'Spring'],
    },
    

]


//Array iterator methods take functions as arguments
//Filter creates a new array specs in function
const femaleplanetts = planetts.filter((element, index) => {
    return element.gender === 'F';
})

console.log(femaleplanetts);

//Map method
const mapPlanets = planetts.map((element, index) => {
    return {FullName: element['f_name'] + ' ' +  element['l_name']};
});

console.log(mapPlanets);


const total = planetts.reduce(
    (accumulator, planett, currentIndex, array) => {
       accumulator = accumulator + planett.paid;
       return (accumulator);
},
0);
console.log(total);


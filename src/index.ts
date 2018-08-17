const name = "rontend";
const age = 18;
const gender = "male";

const hellow = (name:string, age:number, gender?:string):void => {
    console.log(`Hi, i'm ${name}, ${age}, ${gender}`)
}

hellow(name, age);

export{}
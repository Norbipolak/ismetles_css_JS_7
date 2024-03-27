/*
Mikor tudunk throw-t használni 

Mi meghatárotunk egy kivételt a throw-val és ha az ide beírt feltétel teljesül, akkor a kód futása aa következő képpen történik 
megkeresi a legközelebbi try, catch blokkot ugye a catch ágát pontosabban, de ha viszont nincs ilyen benne, akkor meg a global error 
handler-t, ha nincsen catch blokk, ami kezelné ezt az exception-t

function divide(a, b) {
  if (b === 0) {
    throw new Error('Cannot divide by zero');
  }
  return a / b;
}

try {
  const result = divide(10, 0);
  console.log('Result:', result);
} catch (error) {
  console.error('Error caught:', error.message);
}

Ebben a divide kódban vár a függvény két paramétert (a, b)
egy if ág-val meghatározzuk, hogyha a b az nulla, tehát, amivel osztani szeretnénk, akkor dobjon egy Error-t 
amugy meg adja vissza, hogy a / b 
Csinálunk egy try catch ágat a try-ban meghívjuk a függvényt és adunk neki értéket a catch ágban pedig ha van error
akkor azt kiírjuk 

Mire jó az Error constructor a JavaScriptben 
Csinál nekünk egy objekt-et 
-> 

The Error constructor in JavaScript is used to create a new Error object, 
which represents an error condition. 
When you call new Error(), you're creating a new instance of the Error object with an optional error message.

new Error([message])

When you call new Error(message), you're creating an Error object with the specified error message. 
This error message is typically a human-readable description of what went wrong in your code.

const customError = new Error('This is a custom error message');
console.log(customError.message); // Output: This is a custom error message
console.log(customError.name); // Output: Error (name of the error type)
console.log(customError.stack); // Output: Error stack trace (if available)

We create a new Error object customError with the message "This is a custom error message".

We access the message property of the customError object to retrieve the error message.

The name property of the Error object will typically be "Error", indicating the type of the error.

The stack property contains a stack trace of where the error occurred, which can be useful for debugging purposes.

Milyen property-jei vannak az Error-nak 

The Error object in JavaScript has several properties and methods that provide information about the error.
Here are some of the commonly used properties and methods of the Error object:

Properties:

name: A string representing the name of the error. In most implementations, this is "Error".
message: A string representing the error message associated with the Error object.
stack: A string representing the stack trace of the error. This property is not standardized, 
and its availability and format may vary across different JavaScript engines.

Methods:

toString(): Returns a string representation of the Error object. By default, it returns the same string as message.
toJSON(): Returns a JSON representation of the Error object. By default, it returns an object with name, message, and stack properties.

const customError = new Error('This is a custom error message');

console.log(customError.name);      // Output: "Error"
console.log(customError.message);   // Output: "This is a custom error message"
console.log(customError.stack);     // Output: Stack trace (if available)

console.log(customError.toString()); // Output: "Error: This is a custom error message"
console.log(customError.toJSON());  // Output: { name: "Error", message: "This is a custom error message", stack: "..." }
******************************************************************************************************************************************

In a promise chain, the catch() method is used to handle errors that occur 
during the execution of any preceding then() or asynchronous operation. 
When a promise is rejected (i.e., the reject() function is called), 
the rejection reason (typically an error object) is passed to the catch() method as its argument.

If any promise in the chain is rejected (via reject()), the control jumps directly to the nearest catch() block down the chain.

The catch() block receives the rejection reason (the error object) as its argument.

You can then handle the error within the catch() block, performing actions such as logging the error, 
displaying an error message to the user, or any other error-handling logic.

const myPromise = new Promise((resolve, reject) => {
    Simulate an asynchronous operation
  setTimeout(() => {
    const success = false;  Simulating an error condition
    if (success) {
      resolve('Operation completed successfully');
    } else {
      reject(new Error('Something went wrong'));  Reject with an error
    }
  }, 2000);
});

myPromise.then((result) => {
  console.log(result);  This won't execute if the promise is rejected
}).catch((error) => {
  console.error('Error caught:', error.message);  Handle the error
});


Some of the most common types of asynchronous operations in JavaScript involve:

1. Fetching Data from a Remote Server:
This includes making HTTP requests to APIs or servers to retrieve data. 
Common methods for making HTTP requests asynchronously include the Fetch API, XMLHttpRequest, and various third-party libraries like Axios.

2. File I/O Operations:
Reading or writing files asynchronously, such as reading data from a file on the local filesystem 
using Node.js fs module or accessing files in a web browser environment using the File API.

3. Timeouts and Intervals:
Executing code after a certain delay using setTimeout() or at regular intervals using setInterval().

4. Promises and Callbacks:
Utilizing Promises or callback functions to handle asynchronous operations. 
This can include any custom asynchronous tasks that involve waiting for data or events to be processed.

5. User Interactions and Events:
Handling user interactions and events in a web browser environment, such as mouse clicks, keyboard inputs, form submissions, and DOM events. 
Event-driven programming is inherent to JavaScript, and many operations are triggered asynchronously in response to events.

6. Asynchronous Functions:
Defining and calling asynchronous functions using the async and await keywords. 
This allows for writing asynchronous code in a synchronous-like manner, enhancing readability and maintainability.
**********************************************************************************************************************************************
Nagyon fontos!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

Mi az a kontruktor és milyen fajtái vannak
->

In JavaScript, a constructor is a special function that is used to create and initialize objects of a particular type. 
When you create a new object using a constructor function with the new keyword, 
you are essentially creating an instance of that type of object.

Tehát ez olyan mint a class!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

function Person(name, age) {
  this.name = name;
  this.age = age;
}

const john = new Person('John', 30);

Person is a constructor function that defines a blueprint for creating Person objects.

The name and age parameters represent the properties of the Person object.!!!!!!!!!!!!!!!!!!!!!!!!!!!

Inside the constructor function, this refers to the newly created object being constructed.

When you create a new Person object using new Person('John', 30), it initializes a new object with the specified name and age.

Tehát itt a this.name lesz majd a Person objektumnak a kulcsa!!!
sima name meg a paraméterben a name, amit majd függvényhíváskor megadunk

Milyen fajtái vannak a konstruktoroknak 

1. Object Constructors:

These are basic constructors used to create custom objects. 
You define properties and methods inside the constructor function, 
and each instance of the object created using the constructor function inherits those properties and methods.
Example: function Person(name, age) { ... }

2. Built-in Constructors:

JavaScript provides built-in constructor functions for creating objects of various types, 
such as Array, String, Number, Boolean, Date, etc. 
These constructors allow you to create instances of built-in types.
Example: const arr = new Array();

3. Class Constructors:

With the introduction of ES6 (ECMAScript 2015), 
JavaScript also supports class-based constructors using the class keyword. 
Classes provide a more familiar syntax for defining object blueprints and constructors.

Example:

class Car {
  constructor(brand) {
    this.brand = brand;
  }
}

4. Constructor Functions for Prototypes:

Constructors are commonly used in combination with prototypes to create objects with shared methods and properties. By adding methods and properties to the constructor's prototype, you can ensure that all instances of the object share the same methods and properties.

Example:

function Car(brand) {
  this.brand = brand;
}
Car.prototype.start = function() {
  console.log(this.brand + ' started.');
};
****************************************************************************************************************************************
Lehet ilyen formában lekérni a szerverről adatokat

fetch('https://api.example.com/data')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();  Extract JSON body content
  })
  .then(data => {
    console.log(data);  Process JSON data
  })
  .catch(error => {
    console.error('There was a problem with the request:', error);
  });

In this example, response.json() is used to extract and parse the JSON body content of the response. 
Similarly, you can use response.text() to extract plain text content or response.blob() to extract binary data.

Tehát a szervertől az adatot JSON formátumban kaptuk meg, ezért kell ezt parse-olni -> response.json()
Ha meg a szerverre akarunk mondjuk POST-val vagy PUT-val valamit küldeni, akkor azt meg JSON.stringify-olni kell 
tehát létrehozunk egy változót, abba belerakjuk amit fel szeretnénk vinni, azt meg JSON.stringify-oljuk a bodyban!!!!!!!!!
******************************************************************************************************************************************
Miket tartalmaz a headers (Response objektum)
In an HTTP response object, the headers contain metadata about the response itself, 
including information about the server, the client, and the content being sent. 
These headers provide additional context and instructions for how the client (e.g., web browser) should handle the response.

1. Server Information:

Server: Specifies the software and version of the server that generated the response.

2. Date and Time:

Date: Indicates the date and time when the response was generated by the server.

3. Content Metadata:

Content-Type: Specifies the MIME type of the content being sent in the response (e.g., text/html, application/json).
Content-Length: Indicates the size of the content body in bytes.
Content-Encoding: Specifies the encoding applied to the content (e.g., gzip, deflate).
Content-Disposition: Provides information on how the content should be displayed or processed by the client.
Content-Language: Specifies the language of the content.

4. Cache Control:

Cache-Control: Directives for caching behavior, instructing the client and intermediaries how to handle caching of the response.

5. Response Status:

Status Code: Indicates the status of the response (e.g., 200 for OK, 404 for Not Found, etc.).
Status Text: Provides a human-readable description of the status code.

6. Location and Redirection:

Location: Specifies the URL to redirect to if the response is a redirection (e.g., 301 or 302 status codes).
Refresh: Specifies the time delay (in seconds) before the client should refresh or redirect to a new URL.
****************************************************************************************************************************************
async function getProducts() {
    const response = await fetch("https://dummyjson.com/products");
    const json = await response.json();
    console.log(json);
}

the getProducts function, the fetch function returns a Promise that resolves to a Response object 
representing the HTTP response from the server. 
This Response object contains information about the response, including headers and the response body.

When you call fetch("https://dummyjson.com/products"), 
it initiates an HTTP request to the specified URL and returns a Promise immediately.

The Promise returned by fetch resolves when the HTTP response is received from the server.
Once resolved, it provides a Response object representing the response.

You use the await keyword to wait for the Promise returned by fetch to resolve. 
When it resolves, you get the Response object stored in the response variable.

Next, you call response.json(), 
which returns another Promise that resolves to the JSON content of the response body. 
Again, you use await to wait for this Promise to resolve, 
and when it does, you get the parsed JSON data stored in the json variable.

So, in summary, fetch returns a Promise that resolves to a Response object, 
and response.json() returns a Promise that resolves to the JSON content of the response body. 
Both of these Promises are handled asynchronously using await.
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
updateProduct-ra példa

async function updateProduct(productData) {
    try {
        const response = await fetch("https://example.com/updateProduct", {
            method: "PUT", // Assuming PUT method is used for updating
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(productData)
        });

        if (!response.ok) {
            throw new Error("Failed to update product");
        }

        const updatedProduct = await response.json();
        console.log("Product updated:", updatedProduct);
    } catch (error) {
        console.error("Error updating product:", error);
    }
}

 Usage:
updateProduct({
    "title": "Iphone100",
    "price": 34235435,
    "description": "This is a very good phone"
});

The updateProduct function takes productData as a parameter, 
which is an object containing the data to be updated for the product.

Inside the function, it makes a PUT request to the server's endpoint (https://example.com/updateProduct) 
with the provided product data in the request body. The Content-Type header is set to application/json to indicate that the request body contains JSON data.

If the response status is not OK (200-299 range), 
it throws an error with a descriptive message.

If the request is successful, it parses the JSON response using response.json() 
to get the updated product data and logs it to the console.

If any errors occur during the process, they are caught in the catch block, and an error message is logged to the console.
*/
const data = {
  name: "John Doe",
  age: 30,
  address: {
    street: "123 Main St",
    city: "Anytown",
    country: "USA"
  },
  hobbies: ["Reading", "Cooking", "Hiking"],
  friends: [
    { name: "Alice", age: 25 },
    { name: "Bob", age: 28 },
    { name: "Charlie", age: 32 }
  ]
};

// Iterating through object properties
console.log("Object properties:");
for (const key in data) {
  if (Object.hasOwnProperty.call(data, key)) {
    console.log(`${key}: ${data[key]}`);
  }
}

// Iterating through nested object properties
console.log("\nNested object properties:");
for (const key in data.address) {
  if (Object.hasOwnProperty.call(data.address, key)) {
    console.log(`${key}: ${data.address[key]}`);
  }
}

// Iterating through array elements
console.log("\nArray elements:");
data.hobbies.forEach((hobby, index) => {
  console.log(`Hobby ${index + 1}: ${hobby}`);
});

// Iterating through array of objects
console.log("\nArray of objects:");
data.friends.forEach((friend, index) => {
  console.log(`Friend ${index + 1}: ${friend.name}, Age: ${friend.age}`);
});

/*
Object properties:
name: John Doe
age: 30
address: [object Object]
hobbies: Reading,Cooking,Hiking
friends: [object Object],[object Object],[object Object]

Nested object properties:
street: 123 Main St
city: Anytown
country: USA

Array elements:
Hobby 1: Reading
Hobby 2: Cooking
Hobby 3: Hiking

Array of objects:
Friend 1: Alice, Age: 25
Friend 2: Bob, Age: 28

The data object contains various types of data, including strings, numbers, nested objects (address), arrays (hobbies), 
and an array of objects (friends).

We use for...in loops to iterate through the properties of the data object and its nested address object. 
We check hasOwnProperty to ensure that we're only iterating through the object's own properties and 
not inherited properties from its prototype chain.

We use forEach to iterate through the elements of the hobbies array and the array of objects friends. 
We provide a callback function that receives each array element as its argument, along with its index.

Inside the callback functions, we log the properties of each object or the elements of each array to the console.
*/
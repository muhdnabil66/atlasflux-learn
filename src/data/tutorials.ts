// src/data/tutorials.ts
export interface Topic {
  id: string;
  title: string;
  content: string;
}

export interface Language {
  id: string;
  name: string;
  topics: Topic[];
}

export const tutorialsData: Language[] = [
  {
    id: "html",
    name: "HTML",
    topics: [
      {
        id: "html-intro",
        title: "Introduction to HTML",
        content: `# Introduction to HTML

HTML (HyperText Markup Language) is the standard language for creating web pages.

## Basic HTML Document

\`\`\`html
<!DOCTYPE html>
<html>
<head>
    <title>Page Title</title>
</head>
<body>
    <h1>My First Heading</h1>
    <p>My first paragraph.</p>
</body>
</html>
\`\`\`

- \`<!DOCTYPE html>\` declares the document type.
- \`<html>\` is the root element.
- \`<head>\` contains meta information.
- \`<body>\` holds the visible content.`,
      },
      {
        id: "html-headings",
        title: "Headings",
        content: `# HTML Headings

Headings are defined with \`<h1>\` to \`<h6>\`.

\`\`\`html
<h1>Heading 1</h1>
<h2>Heading 2</h2>
<h3>Heading 3</h3>
<h4>Heading 4</h4>
<h5>Heading 5</h5>
<h6>Heading 6</h6>
\`\`\`

Use headings to create a clear content hierarchy.`,
      },
      {
        id: "html-paragraphs",
        title: "Paragraphs",
        content: `# HTML Paragraphs

The \`<p>\` tag defines a paragraph.

\`\`\`html
<p>This is a paragraph.</p>
<p>This is another paragraph.</p>
\`\`\`

Browsers automatically add margin before and after paragraphs.`,
      },
      {
        id: "html-links",
        title: "Links",
        content: `# HTML Links

Links are created with the \`<a>\` tag.

\`\`\`html
<a href="https://www.example.com">Visit Example</a>
\`\`\`

- \`href\` specifies the URL.
- Links can be relative or absolute.`,
      },
      {
        id: "html-images",
        title: "Images",
        content: `# HTML Images

Images are embedded with the \`<img>\` tag.

\`\`\`html
<img src="image.jpg" alt="Description" width="500" height="600">
\`\`\`

- \`src\` specifies the image path.
- \`alt\` provides alternative text.`,
      },
      {
        id: "html-lists",
        title: "Lists",
        content: `# HTML Lists

HTML supports ordered and unordered lists.

\`\`\`html
<ul>
  <li>Item 1</li>
  <li>Item 2</li>
</ul>

<ol>
  <li>First</li>
  <li>Second</li>
</ol>
\`\`\``,
      },
      {
        id: "html-tables",
        title: "Tables",
        content: `# HTML Tables

Tables are defined with \`<table>\`, \`<tr>\` (rows), \`<td>\` (cells), and \`<th>\` (headers).

\`\`\`html
<table>
  <tr>
    <th>Name</th>
    <th>Age</th>
  </tr>
  <tr>
    <td>John</td>
    <td>30</td>
  </tr>
</table>
\`\`\``,
      },
      {
        id: "html-forms",
        title: "Forms",
        content: `# HTML Forms

Forms collect user input using the \`<form>\` element.

\`\`\`html
<form action="/submit" method="post">
  <label for="name">Name:</label>
  <input type="text" id="name" name="name">
  <input type="submit" value="Submit">
</form>
\`\`\``,
      },
      {
        id: "html-semantic",
        title: "Semantic HTML",
        content: `# Semantic HTML

Semantic elements clearly describe their meaning.

\`\`\`html
<header>Site Header</header>
<nav>Navigation</nav>
<main>
  <article>
    <h1>Article Title</h1>
    <p>Content...</p>
  </article>
</main>
<footer>Footer</footer>
\`\`\``,
      },
    ],
  },
  {
    id: "css",
    name: "CSS",
    topics: [
      {
        id: "css-intro",
        title: "Introduction to CSS",
        content: `# Introduction to CSS

CSS (Cascading Style Sheets) is used to style HTML elements.

## Syntax

\`\`\`css
selector {
    property: value;
}
\`\`\`

Example:
\`\`\`css
body {
    background-color: lightblue;
}
h1 {
    color: white;
    text-align: center;
}
\`\`\``,
      },
      {
        id: "css-selectors",
        title: "Selectors",
        content: `# CSS Selectors

Selectors target HTML elements to apply styles.

\`\`\`css
/* Element selector */
p { color: blue; }

/* ID selector */
#title { font-size: 24px; }

/* Class selector */
.highlight { background-color: yellow; }

/* Universal selector */
* { margin: 0; }
\`\`\``,
      },
      {
        id: "css-colors",
        title: "Colors",
        content: `# CSS Colors

Colors can be set using names, hex, RGB, HSL, etc.

\`\`\`css
color: red;
color: #ff0000;
color: rgb(255, 0, 0);
color: hsl(0, 100%, 50%);
\`\`\``,
      },
      {
        id: "css-backgrounds",
        title: "Backgrounds",
        content: `# CSS Backgrounds

Background properties control element backgrounds.

\`\`\`css
body {
    background-color: lightgray;
    background-image: url('bg.png');
    background-repeat: no-repeat;
    background-position: center;
}
\`\`\``,
      },
      {
        id: "css-borders",
        title: "Borders",
        content: `# CSS Borders

Borders can be styled with width, style, and color.

\`\`\`css
div {
    border: 2px solid black;
    border-radius: 10px;
}
\`\`\``,
      },
      {
        id: "css-margin-padding",
        title: "Margin and Padding",
        content: `# CSS Margin and Padding

- Margin: space outside the border.
- Padding: space inside the border.

\`\`\`css
div {
    margin: 20px;
    padding: 10px;
}
\`\`\``,
      },
      {
        id: "css-box-model",
        title: "Box Model",
        content: `# CSS Box Model

Every element is a rectangular box with content, padding, border, and margin.

\`\`\`css
div {
    width: 300px;
    padding: 10px;
    border: 5px solid gray;
    margin: 20px;
}
\`\`\`

Total width = 300 + 20 + 10 + 10 (left/right) = 340px.`,
      },
      {
        id: "css-flexbox",
        title: "Flexbox",
        content: `# CSS Flexbox

Flexbox is a layout model for arranging items in a container.

\`\`\`css
.container {
    display: flex;
    justify-content: center;
    align-items: center;
}
.item {
    flex: 1;
}
\`\`\``,
      },
      {
        id: "css-grid",
        title: "Grid",
        content: `# CSS Grid

Grid is a two-dimensional layout system.

\`\`\`css
.container {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 10px;
}
\`\`\``,
      },
      {
        id: "css-responsive",
        title: "Responsive Design",
        content: `# Responsive Design

Use media queries to adapt to different screen sizes.

\`\`\`css
@media (max-width: 600px) {
    body {
        background-color: lightblue;
    }
}
\`\`\``,
      },
      {
        id: "css-animations",
        title: "Animations",
        content: `# CSS Animations

Create animations with @keyframes.

\`\`\`css
@keyframes example {
    from {background-color: red;}
    to {background-color: yellow;}
}
div {
    animation: example 2s infinite;
}
\`\`\``,
      },
    ],
  },
  {
    id: "javascript",
    name: "JavaScript",
    topics: [
      {
        id: "js-intro",
        title: "Introduction to JavaScript",
        content: `# Introduction to JavaScript

JavaScript is a programming language that adds interactivity to web pages.

## Your First JavaScript

\`\`\`html
<!DOCTYPE html>
<html>
<body>
    <script>
        console.log("Hello, world!");
        alert("Welcome to JavaScript!");
    </script>
</body>
</html>
\`\`\``,
      },
      {
        id: "js-variables",
        title: "Variables",
        content: `# JavaScript Variables

Variables store data values.

\`\`\`js
let name = "Ali";
const age = 25;
var oldWay = "avoid using";
\`\`\`

- \`let\`: block-scoped variable.
- \`const\`: block-scoped constant.
- \`var\`: function-scoped (avoid).`,
      },
      {
        id: "js-data-types",
        title: "Data Types",
        content: `# JavaScript Data Types

Primitive types: string, number, boolean, null, undefined, symbol.

\`\`\`js
let str = "Hello";
let num = 42;
let bool = true;
let nothing = null;
let notDefined = undefined;
\`\`\``,
      },
      {
        id: "js-operators",
        title: "Operators",
        content: `# JavaScript Operators

Arithmetic, assignment, comparison, logical operators.

\`\`\`js
let sum = 5 + 3; // 8
let isEqual = (5 == "5"); // true (loose)
let isStrict = (5 === "5"); // false
let and = true && false; // false
\`\`\``,
      },
      {
        id: "js-functions",
        title: "Functions",
        content: `# JavaScript Functions

Functions are blocks of reusable code.

\`\`\`js
function greet(name) {
    return "Hello " + name;
}
const arrowGreet = (name) => "Hello " + name;
\`\`\``,
      },
      {
        id: "js-objects",
        title: "Objects",
        content: `# JavaScript Objects

Objects store key-value pairs.

\`\`\`js
let person = {
    name: "John",
    age: 30,
    greet() {
        console.log("Hi");
    }
};
\`\`\``,
      },
      {
        id: "js-arrays",
        title: "Arrays",
        content: `# JavaScript Arrays

Arrays store ordered lists.

\`\`\`js
let fruits = ["apple", "banana", "orange"];
fruits.push("grape");
let first = fruits[0];
\`\`\``,
      },
      {
        id: "js-loops",
        title: "Loops",
        content: `# JavaScript Loops

Loops execute code repeatedly.

\`\`\`js
for (let i = 0; i < 5; i++) {
    console.log(i);
}

let j = 0;
while (j < 5) {
    console.log(j);
    j++;
}
\`\`\``,
      },
      {
        id: "js-conditionals",
        title: "Conditionals",
        content: `# JavaScript Conditionals

if, else if, else, and switch.

\`\`\`js
let age = 18;
if (age >= 18) {
    console.log("Adult");
} else {
    console.log("Minor");
}
\`\`\``,
      },
      {
        id: "js-dom",
        title: "DOM Manipulation",
        content: `# DOM Manipulation

Access and modify HTML elements.

\`\`\`js
document.getElementById("demo").innerHTML = "Hello!";
document.querySelector(".btn").addEventListener("click", () => {
    alert("Clicked!");
});
\`\`\``,
      },
      {
        id: "js-events",
        title: "Events",
        content: `# JavaScript Events

Respond to user actions.

\`\`\`html
<button onclick="myFunction()">Click me</button>
\`\`\`
\`\`\`js
function myFunction() {
    alert("Button clicked!");
}
\`\`\``,
      },
      {
        id: "js-es6",
        title: "ES6+ Features",
        content: `# ES6+ Features

Modern JavaScript features.

\`\`\`js
// Arrow functions
const add = (a, b) => a + b;

// Template literals
let name = "Ali";
console.log(\`Hello \${name}\`);

// Destructuring
const [x, y] = [1, 2];
const {name, age} = person;

// Spread operator
const arr = [1, 2, 3];
const newArr = [...arr, 4];
\`\`\``,
      },
    ],
  },
  {
    id: "python",
    name: "Python",
    topics: [
      {
        id: "python-intro",
        title: "Introduction to Python",
        content: `# Introduction to Python

Python is a high-level, interpreted programming language known for its simplicity.

## Your First Python Program

\`\`\`python
print("Hello, World!")
\`\`\`

Python uses indentation to define code blocks.`,
      },
      {
        id: "python-variables",
        title: "Variables and Data Types",
        content: `# Python Variables

Variables are created when you assign a value.

\`\`\`python
name = "Ali"
age = 25
height = 5.9
is_student = True
\`\`\`

Common data types: int, float, str, bool, list, tuple, dict.`,
      },
      {
        id: "python-control-flow",
        title: "Control Flow",
        content: `# Python Control Flow

if, elif, else, and loops.

\`\`\`python
x = 10
if x > 0:
    print("Positive")
elif x == 0:
    print("Zero")
else:
    print("Negative")

for i in range(5):
    print(i)

while x > 0:
    print(x)
    x -= 1
\`\`\``,
      },
      {
        id: "python-functions",
        title: "Functions",
        content: `# Python Functions

Define reusable code with def.

\`\`\`python
def greet(name):
    return f"Hello, {name}!"

print(greet("Ali"))
\`\`\`

Lambda functions:
\`\`\`python
add = lambda a, b: a + b
\`\`\``,
      },
      {
        id: "python-modules",
        title: "Modules",
        content: `# Python Modules

Import functionality from modules.

\`\`\`python
import math
print(math.sqrt(16))

from datetime import datetime
print(datetime.now())
\`\`\``,
      },
      {
        id: "python-file-io",
        title: "File I/O",
        content: `# Python File I/O

Read and write files.

\`\`\`python
# Writing
with open("file.txt", "w") as f:
    f.write("Hello")

# Reading
with open("file.txt", "r") as f:
    content = f.read()
\`\`\``,
      },
      {
        id: "python-oop",
        title: "Object-Oriented Programming",
        content: `# Python OOP

Define classes and objects.

\`\`\`python
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def greet(self):
        print(f"Hi, I'm {self.name}")

p = Person("Ali", 25)
p.greet()
\`\`\``,
      },
      {
        id: "python-exceptions",
        title: "Exception Handling",
        content: `# Python Exception Handling

Use try/except to handle errors.

\`\`\`python
try:
    x = 1 / 0
except ZeroDivisionError:
    print("Cannot divide by zero")
finally:
    print("This always runs")
\`\`\``,
      },
      {
        id: "python-list-comprehensions",
        title: "List Comprehensions",
        content: `# Python List Comprehensions

Concise way to create lists.

\`\`\`python
squares = [x**2 for x in range(10)]
evens = [x for x in range(20) if x % 2 == 0]
\`\`\``,
      },
    ],
  },
  {
    id: "sql",
    name: "SQL",
    topics: [
      {
        id: "sql-intro",
        title: "Introduction to SQL",
        content: `# Introduction to SQL

SQL (Structured Query Language) is used to manage data in relational databases.

## Basic Query

\`\`\`sql
SELECT * FROM users;
\`\`\`

- \`SELECT\` retrieves data.
- \`FROM\` specifies the table.`,
      },
      {
        id: "sql-where",
        title: "WHERE Clause",
        content: `# SQL WHERE Clause

Filter records with the WHERE clause.

\`\`\`sql
SELECT * FROM users WHERE age > 18;
\`\`\`

Operators: \`=\`, \`>\`, \`<\`, \`>=\`, \`<=\`, \`<>\`, \`BETWEEN\`, \`LIKE\`, \`IN\`.`,
      },
      {
        id: "sql-insert",
        title: "INSERT INTO",
        content: `# SQL INSERT INTO

Add new records.

\`\`\`sql
INSERT INTO users (name, age) VALUES ('John', 25);
\`\`\``,
      },
      {
        id: "sql-update",
        title: "UPDATE",
        content: `# SQL UPDATE

Modify existing records.

\`\`\`sql
UPDATE users SET age = 26 WHERE name = 'John';
\`\`\`

Always use WHERE to avoid updating all rows.`,
      },
      {
        id: "sql-delete",
        title: "DELETE",
        content: `# SQL DELETE

Remove records.

\`\`\`sql
DELETE FROM users WHERE name = 'John';
\`\`\``,
      },
      {
        id: "sql-join",
        title: "JOINs",
        content: `# SQL JOINs

Combine rows from two or more tables.

\`\`\`sql
SELECT users.name, orders.amount
FROM users
INNER JOIN orders ON users.id = orders.user_id;
\`\`\`

Types: INNER, LEFT, RIGHT, FULL OUTER.`,
      },
      {
        id: "sql-group-by",
        title: "GROUP BY",
        content: `# SQL GROUP BY

Group rows that have the same values.

\`\`\`sql
SELECT age, COUNT(*) FROM users GROUP BY age;
\`\`\``,
      },
      {
        id: "sql-order-by",
        title: "ORDER BY",
        content: `# SQL ORDER BY

Sort results.

\`\`\`sql
SELECT * FROM users ORDER BY age DESC;
\`\`\``,
      },
    ],
  },
  {
    id: "java",
    name: "Java",
    topics: [
      {
        id: "java-intro",
        title: "Introduction to Java",
        content: `# Introduction to Java

Java is a class-based, object-oriented programming language.

## Your First Java Program

\`\`\`java
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
\`\`\`

Every Java program must have a \`main\` method.`,
      },
      {
        id: "java-variables",
        title: "Variables",
        content: `# Java Variables

Java is statically typed.

\`\`\`java
int age = 25;
double height = 5.9;
String name = "Ali";
boolean isStudent = true;
\`\`\``,
      },
      {
        id: "java-control-flow",
        title: "Control Flow",
        content: `# Java Control Flow

if, else, switch, loops.

\`\`\`java
int x = 10;
if (x > 0) {
    System.out.println("Positive");
} else {
    System.out.println("Negative");
}

for (int i = 0; i < 5; i++) {
    System.out.println(i);
}
\`\`\``,
      },
      {
        id: "java-oop",
        title: "Object-Oriented Programming",
        content: `# Java OOP

Classes and objects.

\`\`\`java
public class Person {
    String name;
    int age;

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public void greet() {
        System.out.println("Hello, I'm " + name);
    }
}

Person p = new Person("Ali", 25);
p.greet();
\`\`\``,
      },
      {
        id: "java-inheritance",
        title: "Inheritance",
        content: `# Java Inheritance

A class can inherit from another.

\`\`\`java
class Animal {
    void eat() {
        System.out.println("Eating...");
    }
}

class Dog extends Animal {
    void bark() {
        System.out.println("Barking...");
    }
}
\`\`\``,
      },
      {
        id: "java-exceptions",
        title: "Exception Handling",
        content: `# Java Exception Handling

Try-catch blocks.

\`\`\`java
try {
    int result = 10 / 0;
} catch (ArithmeticException e) {
    System.out.println("Cannot divide by zero");
} finally {
    System.out.println("This always runs");
}
\`\`\``,
      },
      {
        id: "java-collections",
        title: "Collections",
        content: `# Java Collections

ArrayList, HashMap, etc.

\`\`\`java
import java.util.ArrayList;
ArrayList<String> list = new ArrayList<>();
list.add("Apple");
list.add("Banana");
System.out.println(list.get(0));
\`\`\``,
      },
    ],
  },
  {
    id: "cpp",
    name: "C++",
    topics: [
      {
        id: "cpp-intro",
        title: "Introduction to C++",
        content: `# Introduction to C++

C++ is a powerful general-purpose programming language.

## Your First C++ Program

\`\`\`cpp
#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!";
    return 0;
}
\`\`\`

C++ supports both procedural and object-oriented programming.`,
      },
      {
        id: "cpp-variables",
        title: "Variables",
        content: `# C++ Variables

Variables must be declared with a type.

\`\`\`cpp
int age = 25;
double height = 5.9;
string name = "Ali";
bool isStudent = true;
\`\`\``,
      },
      {
        id: "cpp-control-flow",
        title: "Control Flow",
        content: `# C++ Control Flow

if, else, switch, loops.

\`\`\`cpp
int x = 10;
if (x > 0) {
    cout << "Positive";
} else {
    cout << "Negative";
}

for (int i = 0; i < 5; i++) {
    cout << i;
}
\`\`\``,
      },
      {
        id: "cpp-functions",
        title: "Functions",
        content: `# C++ Functions

Functions must be declared before use.

\`\`\`cpp
int add(int a, int b) {
    return a + b;
}

int main() {
    cout << add(3, 4);
    return 0;
}
\`\`\``,
      },
      {
        id: "cpp-oop",
        title: "Classes and Objects",
        content: `# C++ Classes

Define classes with public/private members.

\`\`\`cpp
class Person {
public:
    string name;
    int age;
    void greet() {
        cout << "Hello, I'm " << name;
    }
};

Person p;
p.name = "Ali";
p.greet();
\`\`\``,
      },
      {
        id: "cpp-pointers",
        title: "Pointers",
        content: `# C++ Pointers

Pointers store memory addresses.

\`\`\`cpp
int x = 5;
int* ptr = &x;
cout << *ptr; // dereference: 5
\`\`\``,
      },
    ],
  },
  {
    id: "csharp",
    name: "C#",
    topics: [
      {
        id: "csharp-intro",
        title: "Introduction to C#",
        content: `# Introduction to C#

C# (pronounced "C-sharp") is a modern, object-oriented language developed by Microsoft.

## Your First C# Program

\`\`\`csharp
using System;

namespace HelloWorld
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Hello, World!");
        }
    }
}
\`\`\`

C# is widely used for Windows applications, games (Unity), and web development.`,
      },
      {
        id: "csharp-variables",
        title: "Variables",
        content: `# C# Variables

C# is statically typed.

\`\`\`csharp
int age = 25;
double height = 5.9;
string name = "Ali";
bool isStudent = true;
var inferred = "auto"; // type inference
\`\`\``,
      },
      {
        id: "csharp-control-flow",
        title: "Control Flow",
        content: `# C# Control Flow

if, else, switch, loops.

\`\`\`csharp
int x = 10;
if (x > 0)
{
    Console.WriteLine("Positive");
}
else
{
    Console.WriteLine("Negative");
}

for (int i = 0; i < 5; i++)
{
    Console.WriteLine(i);
}
\`\`\``,
      },
      {
        id: "csharp-oop",
        title: "Classes and Objects",
        content: `# C# Classes

Define classes with properties and methods.

\`\`\`csharp
public class Person
{
    public string Name { get; set; }
    public int Age { get; set; }
    public void Greet()
    {
        Console.WriteLine($"Hello, I'm {Name}");
    }
}

Person p = new Person();
p.Name = "Ali";
p.Greet();
\`\`\``,
      },
      {
        id: "csharp-linq",
        title: "LINQ",
        content: `# C# LINQ

Language Integrated Query for data manipulation.

\`\`\`csharp
int[] numbers = { 1, 2, 3, 4, 5 };
var evenNumbers = from n in numbers
                  where n % 2 == 0
                  select n;
foreach (var n in evenNumbers)
    Console.WriteLine(n);
\`\`\``,
      },
    ],
  },
  {
    id: "php",
    name: "PHP",
    topics: [
      {
        id: "php-intro",
        title: "Introduction to PHP",
        content: `# Introduction to PHP

PHP is a server-side scripting language designed for web development.

## Your First PHP Script

\`\`\`php
<?php
echo "Hello, World!";
?>
\`\`\`

PHP code is embedded within HTML using \`<?php ?>\` tags.`,
      },
      {
        id: "php-variables",
        title: "Variables",
        content: `# PHP Variables

Variables start with $.

\`\`\`php
$name = "Ali";
$age = 25;
$height = 5.9;
$isStudent = true;
\`\`\``,
      },
      {
        id: "php-control-flow",
        title: "Control Flow",
        content: `# PHP Control Flow

if, else, switch, loops.

\`\`\`php
$x = 10;
if ($x > 0) {
    echo "Positive";
} else {
    echo "Negative";
}

for ($i = 0; $i < 5; $i++) {
    echo $i;
}
\`\`\``,
      },
      {
        id: "php-functions",
        title: "Functions",
        content: `# PHP Functions

Define functions with function keyword.

\`\`\`php
function greet($name) {
    return "Hello, " . $name;
}
echo greet("Ali");
\`\`\``,
      },
      {
        id: "php-forms",
        title: "Form Handling",
        content: `# PHP Form Handling

Retrieve form data via \$_GET or \$_POST.

\`\`\`html
<form method="post" action="welcome.php">
    Name: <input type="text" name="name">
    <input type="submit">
</form>
\`\`\`

welcome.php:
\`\`\`php
<?php
$name = $_POST['name'];
echo "Welcome, " . $name;
?>
\`\`\``,
      },
      {
        id: "php-mysql",
        title: "MySQLi",
        content: `# PHP MySQLi

Connect to MySQL database.

\`\`\`php
$conn = new mysqli("localhost", "user", "pass", "db");
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
$sql = "SELECT * FROM users";
$result = $conn->query($sql);
\`\`\``,
      },
    ],
  },
  {
    id: "ruby",
    name: "Ruby",
    topics: [
      {
        id: "ruby-intro",
        title: "Introduction to Ruby",
        content: `# Introduction to Ruby

Ruby is a dynamic, open-source programming language focused on simplicity and productivity.

## Your First Ruby Program

\`\`\`ruby
puts "Hello, World!"
\`\`\`

Ruby is known for its elegant syntax and is the language behind the Ruby on Rails framework.`,
      },
      {
        id: "ruby-variables",
        title: "Variables",
        content: `# Ruby Variables

Variables are dynamically typed.

\`\`\`ruby
name = "Ali"
age = 25
height = 5.9
is_student = true
\`\`\``,
      },
      {
        id: "ruby-control-flow",
        title: "Control Flow",
        content: `# Ruby Control Flow

if, unless, else, loops.

\`\`\`ruby
x = 10
if x > 0
    puts "Positive"
else
    puts "Negative"
end

5.times do |i|
    puts i
end
\`\`\``,
      },
      {
        id: "ruby-methods",
        title: "Methods",
        content: `# Ruby Methods

Define methods with def.

\`\`\`ruby
def greet(name)
    "Hello, #{name}!"
end

puts greet("Ali")
\`\`\``,
      },
      {
        id: "ruby-classes",
        title: "Classes",
        content: `# Ruby Classes

Define classes with initialize method.

\`\`\`ruby
class Person
    def initialize(name, age)
        @name = name
        @age = age
    end

    def greet
        puts "Hello, I'm #{@name}"
    end
end

p = Person.new("Ali", 25)
p.greet
\`\`\``,
      },
    ],
  },
  {
    id: "swift",
    name: "Swift",
    topics: [
      {
        id: "swift-intro",
        title: "Introduction to Swift",
        content: `# Introduction to Swift

Swift is a powerful and intuitive programming language for iOS, macOS, watchOS, and tvOS.

## Your First Swift Program

\`\`\`swift
import UIKit

var greeting = "Hello, World!"
print(greeting)
\`\`\`

Swift is designed to be safe, fast, and expressive.`,
      },
      {
        id: "swift-variables",
        title: "Variables",
        content: `# Swift Variables

Use var for variables, let for constants.

\`\`\`swift
var name = "Ali"
let age = 25
var height: Double = 5.9
\`\`\``,
      },
      {
        id: "swift-control-flow",
        title: "Control Flow",
        content: `# Swift Control Flow

if, else, switch, loops.

\`\`\`swift
let x = 10
if x > 0 {
    print("Positive")
} else {
    print("Negative")
}

for i in 1...5 {
    print(i)
}
\`\`\``,
      },
      {
        id: "swift-functions",
        title: "Functions",
        content: `# Swift Functions

Define functions with func.

\`\`\`swift
func greet(name: String) -> String {
    return "Hello, \(name)!"
}
print(greet(name: "Ali"))
\`\`\``,
      },
      {
        id: "swift-optionals",
        title: "Optionals",
        content: `# Swift Optionals

Optionals handle absence of value.

\`\`\`swift
var optionalName: String? = nil
optionalName = "Ali"
if let name = optionalName {
    print("Hello, \(name)")
}
\`\`\``,
      },
    ],
  },
  {
    id: "kotlin",
    name: "Kotlin",
    topics: [
      {
        id: "kotlin-intro",
        title: "Introduction to Kotlin",
        content: `# Introduction to Kotlin

Kotlin is a modern programming language that runs on the Java Virtual Machine (JVM).

## Your First Kotlin Program

\`\`\`kotlin
fun main() {
    println("Hello, World!")
}
\`\`\`

Kotlin is fully interoperable with Java and is the preferred language for Android development.`,
      },
      {
        id: "kotlin-variables",
        title: "Variables",
        content: `# Kotlin Variables

Use val for constants, var for variables.

\`\`\`kotlin
val name = "Ali"  // immutable
var age = 25      // mutable
\`\`\``,
      },
      {
        id: "kotlin-control-flow",
        title: "Control Flow",
        content: `# Kotlin Control Flow

if, when, loops.

\`\`\`kotlin
val x = 10
if (x > 0) {
    println("Positive")
} else {
    println("Negative")
}

for (i in 1..5) {
    println(i)
}
\`\`\``,
      },
      {
        id: "kotlin-functions",
        title: "Functions",
        content: `# Kotlin Functions

Functions are defined with fun.

\`\`\`kotlin
fun greet(name: String): String {
    return "Hello, $name!"
}
println(greet("Ali"))
\`\`\``,
      },
      {
        id: "kotlin-null-safety",
        title: "Null Safety",
        content: `# Kotlin Null Safety

Kotlin eliminates null pointer exceptions.

\`\`\`kotlin
var name: String? = null
name = "Ali"
println(name?.length) // safe call
\`\`\``,
      },
    ],
  },
  {
    id: "go",
    name: "Go",
    topics: [
      {
        id: "go-intro",
        title: "Introduction to Go",
        content: `# Introduction to Go

Go (Golang) is a statically typed, compiled language developed by Google.

## Your First Go Program

\`\`\`go
package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}
\`\`\`

Go is known for its simplicity, concurrency support, and fast compilation.`,
      },
      {
        id: "go-variables",
        title: "Variables",
        content: `# Go Variables

Variables are declared with var or :=.

\`\`\`go
var name string = "Ali"
age := 25
height := 5.9
\`\`\``,
      },
      {
        id: "go-control-flow",
        title: "Control Flow",
        content: `# Go Control Flow

if, else, for loops.

\`\`\`go
x := 10
if x > 0 {
    fmt.Println("Positive")
} else {
    fmt.Println("Negative")
}

for i := 0; i < 5; i++ {
    fmt.Println(i)
}
\`\`\``,
      },
      {
        id: "go-functions",
        title: "Functions",
        content: `# Go Functions

Functions can return multiple values.

\`\`\`go
func add(a int, b int) int {
    return a + b
}

func swap(x, y string) (string, string) {
    return y, x
}
\`\`\``,
      },
      {
        id: "go-goroutines",
        title: "Goroutines",
        content: `# Go Goroutines

Goroutines are lightweight threads.

\`\`\`go
func say(s string) {
    for i := 0; i < 5; i++ {
        time.Sleep(100 * time.Millisecond)
        fmt.Println(s)
    }
}

func main() {
    go say("world")
    say("hello")
}
\`\`\``,
      },
    ],
  },
  {
    id: "rust",
    name: "Rust",
    topics: [
      {
        id: "rust-intro",
        title: "Introduction to Rust",
        content: `# Introduction to Rust

Rust is a systems programming language focused on safety and performance.

## Your First Rust Program

\`\`\`rust
fn main() {
    println!("Hello, World!");
}
\`\`\`

Rust guarantees memory safety without a garbage collector.`,
      },
      {
        id: "rust-variables",
        title: "Variables",
        content: `# Rust Variables

Variables are immutable by default (let), use mut for mutable.

\`\`\`rust
let x = 5; // immutable
let mut y = 10; // mutable
\`\`\``,
      },
      {
        id: "rust-control-flow",
        title: "Control Flow",
        content: `# Rust Control Flow

if, else, loop, while, for.

\`\`\`rust
let x = 10;
if x > 0 {
    println!("Positive");
} else {
    println!("Negative");
}

for i in 0..5 {
    println!("{}", i);
}
\`\`\``,
      },
      {
        id: "rust-functions",
        title: "Functions",
        content: `# Rust Functions

Functions return the last expression implicitly.

\`\`\`rust
fn add(a: i32, b: i32) -> i32 {
    a + b
}

fn main() {
    println!("{}", add(3, 4));
}
\`\`\``,
      },
      {
        id: "rust-ownership",
        title: "Ownership",
        content: `# Rust Ownership

Rust's ownership model ensures memory safety.

\`\`\`rust
let s1 = String::from("hello");
let s2 = s1; // s1 is moved, cannot be used
// println!("{}", s1); // error
\`\`\`

Borrowing with references:
\`\`\`rust
fn calculate_length(s: &String) -> usize {
    s.len()
}
\`\`\``,
      },
    ],
  },
  {
    id: "typescript",
    name: "TypeScript",
    topics: [
      {
        id: "ts-intro",
        title: "Introduction to TypeScript",
        content: `# Introduction to TypeScript

TypeScript is a superset of JavaScript that adds static types.

## Your First TypeScript Program

\`\`\`typescript
function greet(name: string): string {
    return \`Hello, \${name}!\`;
}
console.log(greet("Ali"));
\`\`\`

TypeScript compiles to plain JavaScript.`,
      },
      {
        id: "ts-interfaces",
        title: "Interfaces",
        content: `# TypeScript Interfaces

Interfaces define the shape of objects.

\`\`\`typescript
interface Person {
    name: string;
    age: number;
    greet?(): void; // optional
}

const user: Person = {
    name: "Ali",
    age: 25
};
\`\`\``,
      },
      {
        id: "ts-types",
        title: "Types",
        content: `# TypeScript Types

Union types, type aliases, etc.

\`\`\`typescript
type ID = string | number;
let userId: ID = "abc123";

type Point = {
    x: number;
    y: number;
};
\`\`\``,
      },
      {
        id: "ts-classes",
        title: "Classes",
        content: `# TypeScript Classes

Classes with access modifiers.

\`\`\`typescript
class Animal {
    constructor(public name: string) {}
    move(distance: number): void {
        console.log(\`\${this.name} moved \${distance}m\`);
    }
}
\`\`\``,
      },
      {
        id: "ts-generics",
        title: "Generics",
        content: `# TypeScript Generics

Create reusable components.

\`\`\`typescript
function identity<T>(arg: T): T {
    return arg;
}
let output = identity<string>("myString");
\`\`\``,
      },
    ],
  },
  {
    id: "react",
    name: "React",
    topics: [
      {
        id: "react-intro",
        title: "Introduction to React",
        content: `# Introduction to React

React is a JavaScript library for building user interfaces.

## Your First React Component

\`\`\`jsx
function Welcome(props) {
    return <h1>Hello, {props.name}!</h1>;
}

ReactDOM.render(
    <Welcome name="Ali" />,
    document.getElementById('root')
);
\`\`\`

React uses a virtual DOM for efficient updates.`,
      },
      {
        id: "react-components",
        title: "Components",
        content: `# React Components

Components can be functional or class-based.

\`\`\`jsx
// Functional component
function Greeting({ name }) {
    return <h1>Hello, {name}</h1>;
}

// Class component
class Greeting extends React.Component {
    render() {
        return <h1>Hello, {this.props.name}</h1>;
    }
}
\`\`\``,
      },
      {
        id: "react-props",
        title: "Props",
        content: `# React Props

Props are read-only data passed to components.

\`\`\`jsx
function User(props) {
    return <div>Name: {props.name}, Age: {props.age}</div>;
}

<User name="Ali" age={25} />
\`\`\``,
      },
      {
        id: "react-state",
        title: "State",
        content: `# React State

State is mutable data managed within a component.

\`\`\`jsx
import { useState } from 'react';

function Counter() {
    const [count, setCount] = useState(0);
    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>
                Increment
            </button>
        </div>
    );
}
\`\`\``,
      },
      {
        id: "react-effects",
        title: "useEffect",
        content: `# React useEffect

Perform side effects in functional components.

\`\`\`jsx
import { useState, useEffect } from 'react';

function Example() {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch('/api/data')
            .then(res => res.json())
            .then(setData);
    }, []); // empty array = run once

    return <div>{data}</div>;
}
\`\`\``,
      },
      {
        id: "react-context",
        title: "Context API",
        content: `# React Context API

Share data without prop drilling.

\`\`\`jsx
const ThemeContext = React.createContext('light');

function App() {
    return (
        <ThemeContext.Provider value="dark">
            <Toolbar />
        </ThemeContext.Provider>
    );
}

function Toolbar() {
    return (
        <ThemeContext.Consumer>
            {theme => <div>Current theme: {theme}</div>}
        </ThemeContext.Consumer>
    );
}
\`\`\``,
      },
    ],
  },
  {
    id: "nodejs",
    name: "Node.js",
    topics: [
      {
        id: "node-intro",
        title: "Introduction to Node.js",
        content: `# Introduction to Node.js

Node.js is a JavaScript runtime built on Chrome's V8 engine.

## Your First Node.js Program

\`\`\`javascript
const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello, World!\\n');
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
});
\`\`\`

Node.js allows you to run JavaScript on the server.`,
      },
      {
        id: "node-modules",
        title: "Modules",
        content: `# Node.js Modules

Use require to import modules.

\`\`\`javascript
const fs = require('fs');
const path = require('path');

// Read file
fs.readFile(path.join(__dirname, 'file.txt'), 'utf8', (err, data) => {
    if (err) throw err;
    console.log(data);
});
\`\`\``,
      },
      {
        id: "node-fs",
        title: "File System",
        content: `# Node.js File System

fs module for file operations.

\`\`\`javascript
const fs = require('fs');

// Write file
fs.writeFile('message.txt', 'Hello Node.js', (err) => {
    if (err) throw err;
    console.log('File saved');
});

// Read file
fs.readFile('message.txt', 'utf8', (err, data) => {
    console.log(data);
});
\`\`\``,
      },
      {
        id: "node-events",
        title: "Events",
        content: `# Node.js Events

Many Node.js objects emit events.

\`\`\`javascript
const EventEmitter = require('events');
const myEmitter = new EventEmitter();

myEmitter.on('event', () => {
    console.log('Event fired!');
});

myEmitter.emit('event');
\`\`\``,
      },
      {
        id: "node-express",
        title: "Express.js",
        content: `# Express.js

Express is a minimal web framework for Node.js.

\`\`\`javascript
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
\`\`\``,
      },
    ],
  },
  {
    id: "angular",
    name: "Angular",
    topics: [
      {
        id: "angular-intro",
        title: "Introduction to Angular",
        content: `# Introduction to Angular

Angular is a platform and framework for building single-page client applications using HTML and TypeScript.

## Your First Angular Component

\`\`\`typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: '<h1>Hello, {{name}}!</h1>'
})
export class AppComponent {
  name = 'Angular';
}
\`\`\`

Angular uses dependency injection, modules, and components.`,
      },
      {
        id: "angular-components",
        title: "Components",
        content: `# Angular Components

Components control a patch of screen called a view.

\`\`\`typescript
@Component({
  selector: 'app-user',
  template: \`
    <div>
      <h2>{{ user.name }}</h2>
      <p>{{ user.age }}</p>
    </div>
  \`
})
export class UserComponent {
  @Input() user: User;
}
\`\`\``,
      },
      {
        id: "angular-modules",
        title: "Modules",
        content: `# Angular Modules

NgModules organize an application into cohesive blocks.

\`\`\`typescript
@NgModule({
  declarations: [AppComponent, UserComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
\`\`\``,
      },
      {
        id: "angular-services",
        title: "Services",
        content: `# Angular Services

Services provide functionality across components.

\`\`\`typescript
@Injectable({
  providedIn: 'root'
})
export class DataService {
  getData() {
    return ['item1', 'item2'];
  }
}
\`\`\``,
      },
    ],
  },
  {
    id: "vue",
    name: "Vue",
    topics: [
      {
        id: "vue-intro",
        title: "Introduction to Vue",
        content: `# Introduction to Vue

Vue is a progressive JavaScript framework for building UIs.

## Your First Vue App

\`\`\`html
<div id="app">
  {{ message }}
</div>

<script>
new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!'
  }
});
</script>
\`\`\``,
      },
      {
        id: "vue-directives",
        title: "Directives",
        content: `# Vue Directives

Directives are special attributes with v- prefix.

\`\`\`html
<div v-if="seen">Now you see me</div>
<div v-for="item in items">{{ item.text }}</div>
<input v-model="message">
\`\`\``,
      },
      {
        id: "vue-components",
        title: "Components",
        content: `# Vue Components

Components are reusable Vue instances.

\`\`\`javascript
Vue.component('todo-item', {
  props: ['todo'],
  template: '<li>{{ todo.text }}</li>'
});
\`\`\``,
      },
    ],
  },
  {
    id: "django",
    name: "Django",
    topics: [
      {
        id: "django-intro",
        title: "Introduction to Django",
        content: `# Introduction to Django

Django is a high-level Python web framework that encourages rapid development.

## Your First Django View

\`\`\`python
from django.http import HttpResponse

def index(request):
    return HttpResponse("Hello, world!")
\`\`\`

Django follows the MVT (Model-View-Template) pattern.`,
      },
      {
        id: "django-models",
        title: "Models",
        content: `# Django Models

Models define the database structure.

\`\`\`python
from django.db import models

class Person(models.Model):
    name = models.CharField(max_length=100)
    age = models.IntegerField()
\`\`\``,
      },
      {
        id: "django-views",
        title: "Views",
        content: `# Django Views

Views handle requests and return responses.

\`\`\`python
from django.shortcuts import render
from .models import Person

def person_list(request):
    people = Person.objects.all()
    return render(request, 'list.html', {'people': people})
\`\`\``,
      },
    ],
  },
  {
    id: "flask",
    name: "Flask",
    topics: [
      {
        id: "flask-intro",
        title: "Introduction to Flask",
        content: `# Introduction to Flask

Flask is a micro web framework for Python.

## Your First Flask App

\`\`\`python
from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello():
    return 'Hello, World!'

if __name__ == '__main__':
    app.run()
\`\`\``,
      },
      {
        id: "flask-routing",
        title: "Routing",
        content: `# Flask Routing

Map URLs to functions.

\`\`\`python
@app.route('/user/<username>')
def show_user(username):
    return f'User: {username}'

@app.route('/post/<int:post_id>')
def show_post(post_id):
    return f'Post {post_id}'
\`\`\``,
      },
    ],
  },
  {
    id: "mongodb",
    name: "MongoDB",
    topics: [
      {
        id: "mongodb-intro",
        title: "Introduction to MongoDB",
        content: `# Introduction to MongoDB

MongoDB is a NoSQL database that stores data in JSON-like documents.

## Basic Commands

\`\`\`javascript
// Insert
db.users.insertOne({ name: "Ali", age: 25 })

// Find
db.users.find({ age: { $gt: 20 } })

// Update
db.users.updateOne({ name: "Ali" }, { $set: { age: 26 } })

// Delete
db.users.deleteOne({ name: "Ali" })
\`\`\``,
      },
      {
        id: "mongodb-queries",
        title: "Queries",
        content: `# MongoDB Queries

Query operators.

\`\`\`javascript
// Comparison
db.users.find({ age: { $gte: 18, $lte: 30 } })

// Logical
db.users.find({ $or: [{ age: 25 }, { name: "Ali" }] })

// Regex
db.users.find({ name: /^A/ })
\`\`\``,
      },
      {
        id: "mongodb-aggregation",
        title: "Aggregation",
        content: `# MongoDB Aggregation

Aggregation pipeline.

\`\`\`javascript
db.orders.aggregate([
  { $match: { status: "completed" } },
  { $group: { _id: "$customerId", total: { $sum: "$amount" } } },
  { $sort: { total: -1 } }
])
\`\`\``,
      },
    ],
  },
];

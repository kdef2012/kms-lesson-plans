const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const SUPABASE_URL = 'https://qnmndsnbftcspzrlfnab.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_KEY || fs.readFileSync('.env', 'utf-8').match(/VITE_SUPABASE_ANON_KEY=(.*)/)[1];
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const data = {
  '2026-08-19': {
    direct_instruction: `**Vocabulary:**
- **Base:** The number being multiplied.
- **Exponent:** How many times the base is used as a factor.
- **Power:** The result of a repeated multiplication.

For example, in $5^3$:
- 5 is the base
- 3 is the exponent
- It is read as "5 to the 3rd power" or "5 cubed".

---
**Expanding Exponents**

An exponent is just a shorthand for repeated multiplication.
$x^5 = x \\times x \\times x \\times x \\times x$

**Common Mistake Alert:**
$3^4$ IS NOT $3 \\times 4 = 12$!
$3^4 = 3 \\times 3 \\times 3 \\times 3 = 81$.

---
**Real World Contexts**

**Area:** The area of a square is the side length multiplied by itself.
Area = $s \\times s = s^2$

**Volume:** The volume of a cube is the edge length multiplied by itself three times.
Volume = $e \\times e \\times e = e^3$

If a cube has an edge of 4 cm, its volume is $4^3 = 64$ cm$^3$.`,
    exemplars: [
      {question: 'Write $7 \\times 7 \\times 7 \\times 7$ using an exponent.', correct_answer: '$7^4$', misconception: '$4^7$'},
      {question: 'A square room has a side length of $s$ meters. What is the area of the room? Write as an exponent.', correct_answer: '$s^2$', misconception: '$2s$'},
      {question: 'Evaluate $2^5$.', correct_answer: '32', misconception: '10'},
      {question: 'Evaluate $10^4$.', correct_answer: '10000', misconception: '40'},
      {question: 'A rectangular prism has a square base with side length $x$ and a height of $x$. What is its volume? Write as an exponent.', correct_answer: '$x^3$', misconception: '$3x$'},
      {question: 'A bacterial colony doubles every hour. If it starts with 1 bacterium, it has $2^3$ after 3 hours. How many are there after 6 hours?', correct_answer: '$2^6 = 64$', misconception: '12'},
      {question: 'Evaluate $5^3$.', correct_answer: '125', misconception: '15'},
      {question: 'A square garden has an area of $81$ square feet. What is the side length?', correct_answer: '9', misconception: '40.5'},
      {question: 'Evaluate $3^3$.', correct_answer: '27', misconception: '9'},
      {question: 'Evaluate $1^9$.', correct_answer: '1', misconception: '9'},
      {question: 'Sarah says that $2^4$ and $4^2$ evaluate to the same number. Is she correct? Explain.', correct_answer: 'Yes, both equal 16.', misconception: 'No'},
      {question: 'Write $10 \\times 10 \\times 10 \\times 10 \\times 10$ using an exponent.', correct_answer: '$10^5$', misconception: '$5^{10}$'},
      {question: 'If a cube has a side length of 5 inches, what is its volume?', correct_answer: '$125$ cubic inches', misconception: '$25$'},
      {question: 'True or False: $3^2 = 2^3$', correct_answer: 'False ($9 \\neq 8$)', misconception: 'True'},
      {question: 'The volume of a box is $x^3$. If $x=4$, what is the volume?', correct_answer: '64', misconception: '12'},
      {question: "A city's population is $10^6$. Write this number in standard form.", correct_answer: '1,000,000', misconception: '10,000'}
    ]
  },
  '2026-08-20': {
    direct_instruction: `**The Product Rule**

When multiplying two expressions with the **same base**, you can **ADD** the exponents.
**Formula:** $a^m \\times a^n = a^{m+n}$

*Why does this work?*
Let's expand it out!
$x^4 \\times x^2$
$= (x \\times x \\times x \\times x) \\times (x \\times x)$
Count them... we have 6 $x$'s!
$= x^6$

---
**Example 1: Numbers**
$3^2 \\times 3^6$
$= 3^{2+6}$
$= 3^8$
*(Notice the base stays as 3. Do not multiply 3 by 3!)*

**Example 2: Variables**
$y \\times y^6$
$= y^1 \\times y^6$ (Remember, a variable with no exponent has an invisible 1)
$= y^7$

---
**Word Problem Application**

You are laying tile in a rectangular hallway. The width of the hallway is $10^2$ inches and the length is $10^4$ inches. 

To find the area, multiply width by length:
Area = $10^2 \\times 10^4 = 10^6$ square inches.`,
    exemplars: [
      {question: 'Simplify $x^4 \\times x^5$', correct_answer: '$x^9$', misconception: '$x^{20}$'},
      {question: 'Simplify $3^2 \\times 3^6$', correct_answer: '$3^8$', misconception: '$9^8$ or $3^{12}$'},
      {question: 'Simplify $a^3 \\times a^4$', correct_answer: '$a^7$', misconception: '$a^{12}$'},
      {question: 'A rectangular swimming pool has a width of $2^3$ feet and a length of $2^5$ feet. What is the area of the pool expressed as a power of 2?', correct_answer: '$2^8$', misconception: '$4^8$'},
      {question: 'Simplify $10^5 \\times 10^2$', correct_answer: '$10^7$', misconception: '$100^7$'},
      {question: 'Simplify $y \\times y^6$', correct_answer: '$y^7$', misconception: '$y^6$'},
      {question: 'Simplify $2^4 \\times 2^3$', correct_answer: '$2^7$', misconception: '$4^7$'},
      {question: 'Simplify $b^5 \\times b^5$', correct_answer: '$b^{10}$', misconception: '$b^{25}$'},
      {question: 'Find the missing exponent: $x^3 \\times x^{?} = x^{11}$', correct_answer: '8', misconception: '33'},
      {question: 'Simplify $m^2 \\times m^3 \\times m^4$', correct_answer: '$m^9$', misconception: '$m^{24}$'},
      {question: 'Simplify $5^3 \\times 5^3$', correct_answer: '$5^6$', misconception: '$25^6$'},
      {question: 'A box has dimensions $x$, $x^2$, and $x^3$. Find its volume.', correct_answer: '$x^6$', misconception: '$x^5$'},
      {question: 'Simplify $p^4 \\times p$', correct_answer: '$p^5$', misconception: '$p^4$'},
      {question: 'A hard drive holds $10^4$ folders. Each folder holds $10^3$ files. How many files are there in total?', correct_answer: '$10^7$', misconception: '$10^{12}$'},
      {question: 'Simplify $c^8 \\times c^2$', correct_answer: '$c^{10}$', misconception: '$c^{16}$'},
      {question: 'Find the area of a square with side length $x^4$.', correct_answer: '$x^8$', misconception: '$x^{16}$'}
    ]
  },
  '2026-08-24': {
    direct_instruction: `**The Quotient Rule**

When dividing two expressions with the **same base**, you **SUBTRACT** the exponents.
**Formula:** $\\frac{a^m}{a^n} = a^{m-n}$

*Why does this work?*
$\\frac{10^5}{10^2} = \\frac{10 \\times 10 \\times 10 \\times 10 \\times 10}{10 \\times 10}$
Cancel out the common 10s on the top and bottom... you are left with three 10s on top!
$= 10^3$

---
**The Power of a Power Rule**

When raising a power to another power, you **MULTIPLY** the exponents.
**Formula:** $(a^m)^n = a^{m \\times n}$

*Why does this work?*
$(10^2)^3$ means $10^2$ multiplied by itself three times.
$= 10^2 \\times 10^2 \\times 10^2$
$= 10^{2+2+2} = 10^6$

---
**Putting it in Context**

**Example:**
The Sun\'s mass is about $10^{30}$ kg. Earth\'s mass is about $10^{24}$ kg. 
How many times more massive is the Sun?

Divide the Sun\'s mass by Earth\'s mass:
$\\frac{10^{30}}{10^{24}} = 10^{30-24} = 10^6$ times more massive (which is 1,000,000 times!)`,
    exemplars: [
      {question: 'Simplify $\\frac{10^9}{10^4}$', correct_answer: '$10^5$', misconception: '$10^{13}$'},
      {question: 'Simplify $(10^3)^5$', correct_answer: '$10^{15}$', misconception: '$10^8$'},
      {question: 'Simplify $\\frac{10^7}{10^6}$', correct_answer: '$10^1$ or $10$', misconception: '$10^{13}$'},
      {question: 'A company\'s revenue is $10^8$ dollars. Its expenses are $10^5$ dollars. How many times greater is the revenue than the expenses?', correct_answer: '$10^3$ times', misconception: '$10^{13}$'},
      {question: 'The Sun\'s mass is about $10^{30}$ kg. Earth\'s mass is about $10^{24}$ kg. How many times more massive is the Sun?', correct_answer: '$10^6$ times', misconception: '$10^{54}$'},
      {question: 'Simplify $\\frac{x^{12}}{x^4}$', correct_answer: '$x^8$', misconception: '$x^3$'},
      {question: 'Simplify $(y^5)^4$', correct_answer: '$y^{20}$', misconception: '$y^9$'},
      {question: 'Simplify $\\frac{a^8}{a^3}$', correct_answer: '$a^5$', misconception: '$a^{11}$'},
      {question: 'Simplify $(p^6)^3$', correct_answer: '$p^{18}$', misconception: '$p^9$'},
      {question: 'A rectangular field has an area of $10^6$ square feet. The width is $10^2$ feet. What is the length?', correct_answer: '$10^4$ feet', misconception: '$10^3$ feet'},
      {question: 'Find the missing exponent: $\\frac{10^{10}}{10^{?}} = 10^4$', correct_answer: '6', misconception: '14'},
      {question: 'Find the missing exponent: $(10^{?})^3 = 10^{15}$', correct_answer: '5', misconception: '12'},
      {question: 'Simplify $\\frac{w^{15}}{w^5}$', correct_answer: '$w^{10}$', misconception: '$w^3$'},
      {question: 'Simplify $(z^2)^7$', correct_answer: '$z^{14}$', misconception: '$z^9$'},
      {question: 'Simplify $\\frac{m^{100}}{m^{99}}$', correct_answer: '$m$', misconception: '$m^{199}$'},
      {question: 'A volume is $(x^3)^3$. Simplify the expression.', correct_answer: '$x^9$', misconception: '$x^6$'}
    ]
  },
  '2026-08-25': {
    direct_instruction: `**Negative Exponents**

A negative exponent does NOT make the number negative. It creates a **FRACTION**.
**Formula:** $x^{-a} = \\frac{1}{x^a}$

*Why does this work?*
Follow the pattern:
$10^3 = 1000$
$10^2 = 100$
$10^1 = 10$
$10^0 = 1$
$10^{-1} = \\frac{1}{10}$
$10^{-2} = \\frac{1}{100}$ or $\\frac{1}{10^2}$

---
**The Quotient Rule creates Negative Exponents**

What happens if you have more on the bottom than the top?
$\\frac{x^2}{x^5} = \\frac{x \\times x}{x \\times x \\times x \\times x \\times x}$
Cancel two from top and bottom. You are left with three $x$'s on the bottom.
$= \\frac{1}{x^3}$

Using the subtraction rule: $2 - 5 = -3$.
So $x^{-3}$ is exactly the same as $\\frac{1}{x^3}$!

---
**Using it in Science**

Negative powers of 10 are used to measure extremely small things (microscopic!).

The size of a typical human cell is roughly $10^{-5}$ meters. 
This means it is $\\frac{1}{10^5}$ or $\\frac{1}{100,000}$ of a meter!`,
    exemplars: [
      {question: 'Rewrite $10^{-3}$ as a fraction.', correct_answer: '$\\frac{1}{10^3}$ or $\\frac{1}{1000}$', misconception: '$-1000$'},
      {question: 'Simplify $\\frac{x^4}{x^7}$ using a negative exponent.', correct_answer: '$x^{-3}$', misconception: '$x^3$'},
      {question: 'Rewrite $m^{-5}$ with a positive exponent.', correct_answer: '$\\frac{1}{m^5}$', misconception: '$-m^5$'},
      {question: 'The wavelength of red light is about $10^{-7}$ meters. Rewrite this using a positive exponent in the denominator.', correct_answer: '$\\frac{1}{10^7}$', misconception: '$-10^7$'},
      {question: 'The size of a cell is $10^{-5}$ meters. Rewrite this as a fraction.', correct_answer: '$\\frac{1}{10^5}$', misconception: '$-100000$'},
      {question: 'Simplify $\\frac{y^2}{y^8}$', correct_answer: '$y^{-6}$ or $\\frac{1}{y^6}$', misconception: '$y^4$'},
      {question: 'Simplify $3^{-2}$', correct_answer: '$\\frac{1}{9}$', misconception: '$-6$'},
      {question: 'Simplify $(x^{-2})^3$', correct_answer: '$x^{-6}$ or $\\frac{1}{x^6}$', misconception: '$x^1$'},
      {question: 'Simplify $p^4 \\times p^{-4}$', correct_answer: '$p^0 = 1$', misconception: '$p^8$'},
      {question: 'A microsecond is $10^{-6}$ seconds. Write as a fraction.', correct_answer: '$\\frac{1}{10^6}$', misconception: '$\\frac{-1}{10^6}$'},
      {question: 'Rewrite $\\frac{1}{b^7}$ using a negative exponent.', correct_answer: '$b^{-7}$', misconception: '$b^7$'},
      {question: 'Simplify $\\frac{c^{-3}}{c^2}$', correct_answer: '$c^{-5}$', misconception: '$c^{-1}$'},
      {question: 'Evaluate $2^{-3}$', correct_answer: '$\\frac{1}{8}$', misconception: '$-8$'},
      {question: 'Evaluate $5^{-2}$', correct_answer: '$\\frac{1}{25}$', misconception: '$-10$'},
      {question: 'Simplify $(w^4)^{-2}$', correct_answer: '$w^{-8}$', misconception: '$w^2$'},
      {question: 'Simplify $z^{-5} \\times z^3$', correct_answer: '$z^{-2}$', misconception: '$z^{-15}$'}
    ]
  },
  '2026-08-26': {
    direct_instruction: `**Distributing Exponents (Combining Bases)**

When terms inside parentheses are multiplied, you can "distribute" the exponent to **every** base inside.
**Formula:** $(ab)^n = a^n b^n$

*Example:*
$(3x)^2 = 3^2 \\times x^2 = 9x^2$
**Common Mistake:** Forgetting to square the coefficient! It is NOT $3x^2$.

---
**Fractions raised to a Power**

The same rule applies to division! Distribute the exponent to the numerator and denominator.
**Formula:** $(\\frac{a}{b})^n = \\frac{a^n}{b^n}$

*Example:*
$(\\frac{2}{5})^3 = \\frac{2^3}{5^3} = \\frac{8}{125}$

---
**Combining Different Bases**

If two different bases have the **exact same exponent**, you can multiply the bases together first!
**Formula:** $a^n \\times b^n = (a \\times b)^n$

*Example:*
$2^4 \\times 5^4 = (2 \\times 5)^4 = 10^4$`,
    exemplars: [
      {question: 'Simplify $(2x)^3$', correct_answer: '$8x^3$', misconception: '$2x^3$'},
      {question: 'Evaluate $(\\frac{1}{3})^2$', correct_answer: '$\\frac{1}{9}$', misconception: '$\\frac{2}{3}$'},
      {question: 'Simplify $(ab)^4$', correct_answer: '$a^4 b^4$', misconception: '$ab^4$'},
      {question: 'A square has a side length of $3y$. What is its area?', correct_answer: '$9y^2$', misconception: '$3y^2$'},
      {question: 'Evaluate $(\\frac{2}{5})^3$', correct_answer: '$\\frac{8}{125}$', misconception: '$\\frac{6}{15}$'},
      {question: 'Simplify $(4m)^2$', correct_answer: '$16m^2$', misconception: '$8m^2$'},
      {question: 'Evaluate $(\\frac{1}{2})^4$', correct_answer: '$\\frac{1}{16}$', misconception: '$\\frac{4}{2}$'},
      {question: 'Simplify $(xyz)^5$', correct_answer: '$x^5 y^5 z^5$', misconception: '$xyz^5$'},
      {question: 'Evaluate $(\\frac{3}{4})^2$', correct_answer: '$\\frac{9}{16}$', misconception: '$\\frac{6}{8}$'},
      {question: 'The volume of a cube is $s^3$. If the side is $2x$, what is the volume?', correct_answer: '$8x^3$', misconception: '$2x^3$'},
      {question: 'Simplify $(5p)^3$', correct_answer: '$125p^3$', misconception: '$15p^3$'},
      {question: 'Rewrite $2^4 \\times 5^4$ as a single base.', correct_answer: '$10^4$', misconception: '$7^4$'},
      {question: 'Evaluate $(\\frac{10}{3})^2$', correct_answer: '$\\frac{100}{9}$', misconception: '$\\frac{20}{6}$'},
      {question: 'Simplify $(2a^2)^3$', correct_answer: '$8a^6$', misconception: '$2a^6$'},
      {question: 'Rewrite $3^2 \\times x^2$ as a single quantity squared.', correct_answer: '$(3x)^2$', misconception: '$3x^2$'},
      {question: 'Evaluate $(\\frac{1}{2})^{-2}$', correct_answer: '4', misconception: '$-4$'}
    ]
  },
  '2026-08-27': {
    direct_instruction: `**What is a Square Root?**

The square root $\\sqrt{x}$ is the **inverse** (opposite) of squaring a number.
It asks the question: *"What number, when multiplied by itself, gives me $x$?"*

$\\sqrt{49} = 7$, because $7 \\times 7 = 49$.

**Geometric Meaning:**
If a square has an **Area of 49**, the square root gives you the **Side Length (7)**.

---
**Irrational Square Roots on the Number Line**

Not all numbers are perfect squares. What is $\\sqrt{20}$?
We can **estimate** it by placing it between two perfect squares we know!

1. Think of perfect squares: $16, 25, 36...$
2. $\\sqrt{16} = 4$ and $\\sqrt{25} = 5$.
3. Since 20 is between 16 and 25, $\\sqrt{20}$ must be between 4 and 5.
4. 20 is exactly halfway between 16 and 25, so $\\sqrt{20} \\approx 4.4$ or $4.5$.

---
**Irrational Numbers**

Non-perfect square roots (like $\\sqrt{20}$ or $\\sqrt{7}$) are **Irrational Numbers**.
This means their decimal expansion goes on forever without repeating.
You can never write them as a perfect fraction!`,
    exemplars: [
      {question: 'Evaluate $\\sqrt{64}$', correct_answer: '8', misconception: '32'},
      {question: 'Between which two consecutive integers does $\\sqrt{15}$ lie?', correct_answer: '3 and 4', misconception: '7 and 8'},
      {question: 'Evaluate $\\sqrt{121}$', correct_answer: '11', misconception: '60.5'},
      {question: 'A square rug has an area of $81$ sq ft. What is its side length?', correct_answer: '9 ft', misconception: '40.5 ft'},
      {question: 'Estimate $\\sqrt{50}$ to one decimal place.', correct_answer: '7.1', misconception: '25'},
      {question: 'Between which two integers does $\\sqrt{40}$ lie?', correct_answer: '6 and 7', misconception: '20 and 21'},
      {question: 'Evaluate $\\sqrt{144}$', correct_answer: '12', misconception: '72'},
      {question: 'Estimate $\\sqrt{90}$ to one decimal place.', correct_answer: '9.5', misconception: '45'},
      {question: 'A square playground has an area of $200$ sq meters. Is the side length closer to 14 or 15?', correct_answer: '14 ($14^2 = 196$)', misconception: '15'},
      {question: 'Evaluate $\\sqrt{400}$', correct_answer: '20', misconception: '200'},
      {question: 'Between which two integers is $\\sqrt{7}$?', correct_answer: '2 and 3', misconception: '3 and 4'},
      {question: 'Estimate $\\sqrt{11}$', correct_answer: '3.3', misconception: '5.5'},
      {question: 'Evaluate $\\sqrt{225}$', correct_answer: '15', misconception: '112.5'},
      {question: 'If a square has area $x^2 = 49$, what is $x$?', correct_answer: '7 (or -7)', misconception: '24.5'},
      {question: 'Is $\\sqrt{5}$ rational or irrational?', correct_answer: 'Irrational', misconception: 'Rational'},
      {question: 'Order from least to greatest: $3$, $\\sqrt{10}$, $\\sqrt{8}$', correct_answer: '$\\sqrt{8}$, $3$, $\\sqrt{10}$', misconception: '$3$, $\\sqrt{8}$, $\\sqrt{10}$'}
    ]
  },
  '2026-08-28': {
    direct_instruction: `**What is a Cube Root?**

The cube root $\\sqrt[3]{x}$ is the **inverse** (opposite) of cubing a number.
It asks the question: *"What number, multiplied by itself three times, gives me $x$?"*

$\\sqrt[3]{8} = 2$, because $2 \\times 2 \\times 2 = 8$.

**Geometric Meaning:**
If a 3D box (cube) has a **Volume of 8**, the cube root gives you the **Edge Length (2)**.

---
**Perfect Cubes to Memorize**

You should know these by heart:
$1^3 = 1 \\implies \\sqrt[3]{1} = 1$
$2^3 = 8 \\implies \\sqrt[3]{8} = 2$
$3^3 = 27 \\implies \\sqrt[3]{27} = 3$
$4^3 = 64 \\implies \\sqrt[3]{64} = 4$
$5^3 = 125 \\implies \\sqrt[3]{125} = 5$

---
**Negative Cube Roots**

Can you have a negative inside a square root? NO!
But can you have a negative inside a **cube root**? YES!

$\\sqrt[3]{-8} = -2$, because $-2 \\times -2 \\times -2 = -8$.
Two negatives make a positive, but the third negative turns it back to negative!`,
    exemplars: [
      {question: 'Evaluate $\\sqrt[3]{8}$', correct_answer: '2', misconception: '4'},
      {question: 'Evaluate $\\sqrt[3]{125}$', correct_answer: '5', misconception: '25'},
      {question: 'Evaluate $\\sqrt[3]{27}$', correct_answer: '3', misconception: '9'},
      {question: 'A cube has a volume of $64$ cubic inches. What is its edge length?', correct_answer: '4 in', misconception: '8 in'},
      {question: 'Evaluate $\\sqrt[3]{1000}$', correct_answer: '10', misconception: '100'},
      {question: 'Evaluate $\\sqrt[3]{-8}$', correct_answer: '-2', misconception: 'undefined'},
      {question: 'Between which two integers does $\\sqrt[3]{30}$ lie?', correct_answer: '3 and 4', misconception: '15 and 16'},
      {question: 'Evaluate $\\sqrt[3]{1}$', correct_answer: '1', misconception: '0'},
      {question: 'A cubic water tank holds $216$ cubic meters of water. What is the tank\'s height?', correct_answer: '6 m', misconception: '108 m'},
      {question: 'Evaluate $\\sqrt[3]{0}$', correct_answer: '0', misconception: '1'},
      {question: 'Evaluate $\\sqrt[3]{-27}$', correct_answer: '-3', misconception: '3'},
      {question: 'Between which two integers does $\\sqrt[3]{100}$ lie?', correct_answer: '4 and 5', misconception: '10 and 11'},
      {question: 'Evaluate $\\sqrt[3]{512}$', correct_answer: '8', misconception: '16'},
      {question: 'Evaluate $\\sqrt[3]{343}$', correct_answer: '7', misconception: '21'},
      {question: 'Is $\\sqrt[3]{16}$ an integer?', correct_answer: 'No', misconception: 'Yes'},
      {question: 'Compare: $\\sqrt{64}$ vs $\\sqrt[3]{64}$', correct_answer: '$8 > 4$', misconception: '$4 > 8$'}
    ]
  },
  '2026-08-31': {
    direct_instruction: `**Combining Roots and PEMDAS**

Square roots and cube roots are treated exactly like **exponents** in the Order of Operations (PEMDAS).
You must evaluate the root FIRST before adding or subtracting!

*Example:*
$\\sqrt{25} + \\sqrt[3]{8}$
$= 5 + 2$
$= 7$

---
**Fractions inside Roots**

To take the square root or cube root of a fraction, simply take the root of the top and bottom separately!

$\\sqrt{\\frac{16}{25}} = \\frac{\\sqrt{16}}{\\sqrt{25}} = \\frac{4}{5}$

---
**Decimals inside Roots**

A helpful trick for decimals: count the decimal places!
$\\sqrt{0.04}$ 
Think: $\\sqrt{4} = 2$.
Since $0.2 \\times 0.2 = 0.04$, the answer is $0.2$.`,
    exemplars: [
      {question: 'Evaluate $\\sqrt{\\frac{9}{16}}$', correct_answer: '$\\frac{3}{4}$', misconception: '$\\frac{4.5}{8}$'},
      {question: 'Evaluate $\\sqrt[3]{-125}$', correct_answer: '-5', misconception: '5'},
      {question: 'Evaluate $\\sqrt{100} + \\sqrt[3]{8}$', correct_answer: '12', misconception: '14'},
      {question: 'A square has area $\\frac{49}{64}$ sq ft. Find the side length.', correct_answer: '$\\frac{7}{8}$ ft', misconception: '$\\frac{24.5}{32}$ ft'},
      {question: 'Evaluate $\\sqrt{\\frac{1}{25}}$', correct_answer: '$\\frac{1}{5}$', misconception: '$\\frac{1}{12.5}$'},
      {question: 'Evaluate $\\sqrt[3]{\\frac{8}{27}}$', correct_answer: '$\\frac{2}{3}$', misconception: '$\\frac{4}{9}$'},
      {question: 'Evaluate $\\sqrt{81} - \\sqrt[3]{27}$', correct_answer: '6', misconception: '40'},
      {question: 'The volume of a cube is $\\frac{1}{8}$ cubic meters. Find the edge length.', correct_answer: '$\\frac{1}{2}$ m', misconception: '$\\frac{1}{4}$ m'},
      {question: 'Evaluate $2 \\times \\sqrt{49}$', correct_answer: '14', misconception: '98'},
      {question: 'Evaluate $\\sqrt[3]{-1000}$', correct_answer: '-10', misconception: '10'},
      {question: 'Evaluate $\\sqrt{0.04}$', correct_answer: '0.2', misconception: '0.02'},
      {question: 'Evaluate $\\sqrt[3]{0.001}$', correct_answer: '0.1', misconception: '0.01'},
      {question: 'Evaluate $\\frac{\\sqrt{144}}{3}$', correct_answer: '4', misconception: '48'},
      {question: 'Evaluate $\\sqrt{25} \\times \\sqrt[3]{8}$', correct_answer: '10', misconception: '40'},
      {question: 'Solve for $x$: $x^3 = -64$', correct_answer: '-4', misconception: '4'},
      {question: 'Solve for $y$: $y^2 = \\frac{9}{100}$', correct_answer: '$\\frac{3}{10}$ (or $-\\frac{3}{10}$)', misconception: '$\\frac{4.5}{50}$'}
    ]
  },
  '2026-09-01': {
    direct_instruction: `**Side Length vs Perimeter vs Area**

When solving word problems, read carefully to know what you are looking for!
1. **Area** = The inside space (requires squaring)
2. **Side Length** = One edge (requires square root of Area)
3. **Perimeter** = All edges added together (multiply side by 4)

*Example:* A square garden has an Area of 100. How much fencing is needed to surround it?
Step 1: Find the side length. $\\sqrt{100} = 10$.
Step 2: Find perimeter. $10 \\times 4 = 40$ feet of fencing.

---
**Edge Length vs Volume vs Surface Area**

For 3D Cubes:
1. **Volume** = Space inside (cubing)
2. **Edge Length** = One line segment (cube root of Volume)
3. **Surface Area** = Wrapping paper around the outside (find Area of one face, multiply by 6)

*Example:* A cube has a Volume of 125. What is the area of its base?
Step 1: Find edge length. $\\sqrt[3]{125} = 5$.
Step 2: Find area of the square base. $5^2 = 25$.`,
    exemplars: [
      {question: 'A square park has an area of $400$ sq m. What is its perimeter?', correct_answer: '80 m', misconception: '40 m'},
      {question: 'A cubic box has a volume of $125$ cubic feet. What is the area of one of its faces?', correct_answer: '25 sq ft', misconception: '5 sq ft'},
      {question: 'A square bulletin board has an area of $64$ sq ft. You want to put a border around it. How long is the border?', correct_answer: '32 ft', misconception: '8 ft'},
      {question: 'A cube has a volume of $1000$ $cm^3$. What is the total length of all 12 of its edges?', correct_answer: '120 cm', misconception: '40 cm'},
      {question: 'A farmer has a square field with an area of $81$ acres (assume square acres). How long is one side?', correct_answer: '9', misconception: '40.5'},
      {question: 'A cubic water tank has a volume of $8$ $m^3$. What is the area of its base?', correct_answer: '4 $m^2$', misconception: '2 $m^2$'},
      {question: 'A square room has an area of $121$ sq ft. How much baseboard is needed for the perimeter?', correct_answer: '44 ft', misconception: '11 ft'},
      {question: 'A rubik\'s cube has a volume of $27$ $in^3$. What is its surface area (6 faces)?', correct_answer: '54 $in^2$', misconception: '9 $in^2$'},
      {question: 'The area of a square picture frame is $169$ $in^2$. What is the side length?', correct_answer: '13 in', misconception: '84.5 in'},
      {question: 'A cube holds $64$ cubic liters of water. What is the height of the cube?', correct_answer: '4', misconception: '8'},
      {question: 'A square window has an area of $25$ sq ft. What is its perimeter?', correct_answer: '20 ft', misconception: '10 ft'},
      {question: 'A cubic die has volume $216$ $mm^3$. Find its edge length.', correct_answer: '6 mm', misconception: '36 mm'},
      {question: 'If the area of a square is $x^2 = 100$, what is the perimeter?', correct_answer: '40', misconception: '10'},
      {question: 'A cube has volume $1$. What is its surface area?', correct_answer: '6', misconception: '1'},
      {question: 'A square pool has an area of $196$ sq m. What is its side length?', correct_answer: '14 m', misconception: '98 m'},
      {question: 'A cube has a volume of $512$. What is the area of one face?', correct_answer: '64', misconception: '8'}
    ]
  }
};

async function run() {
  const { data: plans } = await supabase.from('lesson_plans').select('id, date_start, topic');
  
  for (let plan of plans) {
    if (data[plan.date_start] && plan.topic.includes('Open-Up')) {
      const updateData = data[plan.date_start];
      
      await supabase.from('lesson_plans').update({
        direct_instruction: updateData.direct_instruction,
        structured_exemplars: updateData.exemplars
      }).eq('id', plan.id);
      
      console.log('Successfully updated ' + plan.date_start + ': ' + plan.topic);
    }
  }
}

run();

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const SUPABASE_URL = 'https://qnmndsnbftcspzrlfnab.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_KEY || fs.readFileSync('.env', 'utf-8').match(/VITE_SUPABASE_ANON_KEY=(.*)/)[1];
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const data = {
  '2026-08-19': { // Exponent Review
    do_now: 'Evaluate: $3^4$ and $4^3$. Which is larger?',
    direct_instruction: 'Review the definition of an exponent as repeated multiplication. Show examples of expanding $x^5$ to $x \\times x \\times x \\times x \\times x$. Introduce area and volume word problems where exponents naturally occur.',
    exit_ticket: 'A cube has a side length of $5$ cm. Write its volume using an exponent, then evaluate it.',
    exemplars: [
      // Guided
      {question: 'Write $7 \\times 7 \\times 7 \\times 7$ using an exponent.', correct_answer: '$7^4$', misconception: '$4^7$'},
      {question: 'A square room has a side length of $s$ meters. What is the area of the room? Write as an exponent.', correct_answer: '$s^2$', misconception: '$2s$'},
      // Group
      {question: 'Evaluate $2^5$.', correct_answer: '32', misconception: '10'},
      {question: 'Evaluate $10^4$.', correct_answer: '10000', misconception: '40'},
      {question: 'Write the expression $x \\times x \\times x$ using an exponent.', correct_answer: '$x^3$', misconception: '$3x$'},
      {question: 'A bacterial colony doubles every hour. If it starts with 1 bacterium, it has $2^3$ after 3 hours. How many are there after 6 hours?', correct_answer: '$2^6 = 64$', misconception: '12'},
      // Indep
      {question: 'Evaluate $5^3$.', correct_answer: '125', misconception: '15'},
      {question: 'Write $y \\times y \\times y \\times y \\times y$ as a power.', correct_answer: '$y^5$', misconception: '$5y$'},
      {question: 'Evaluate $3^3$.', correct_answer: '27', misconception: '9'},
      {question: 'Evaluate $1^9$.', correct_answer: '1', misconception: '9'},
      {question: 'A square garden has an area of $81$ square feet. What is the side length?', correct_answer: '9', misconception: '40.5'},
      {question: 'Write $10 \\times 10 \\times 10 \\times 10 \\times 10$ using an exponent.', correct_answer: '$10^5$', misconception: '$5^{10}$'},
      {question: 'True or False: $2^4 = 4^2$', correct_answer: 'True ($16 = 16$)', misconception: 'False'},
      {question: 'True or False: $3^2 = 2^3$', correct_answer: 'False ($9 \\neq 8$)', misconception: 'True'},
      {question: 'The volume of a box is $x^3$. If $x=4$, what is the volume?', correct_answer: '64', misconception: '12'},
      {question: 'A city\'s population is $10^6$. Write this number in standard form.', correct_answer: '1,000,000', misconception: '10,000'}
    ]
  },
  '2026-08-20': { // Properties of Integer Exponents
    do_now: 'Simplify $x^2 \\times x^3$ by expanding it out first.',
    direct_instruction: 'Derive the Product Rule ($a^m \\times a^n = a^{m+n}$) by expanding terms. Show how $x^4 \\times x^2 = (x \\times x \\times x \\times x) \\times (x \\times x) = x^6$. Emphasize that bases must be the same.',
    exit_ticket: 'Simplify $m^7 \\times m^5$.',
    exemplars: [
      {question: 'Simplify $x^4 \\times x^5$', correct_answer: '$x^9$', misconception: '$x^{20}$'},
      {question: 'Simplify $3^2 \\times 3^6$', correct_answer: '$3^8$', misconception: '$9^8$ or $3^{12}$'},
      {question: 'Simplify $a^3 \\times a^4$', correct_answer: '$a^7$', misconception: '$a^{12}$'},
      {question: 'Simplify $10^5 \\times 10^2$', correct_answer: '$10^7$', misconception: '$100^7$'},
      {question: 'A rectangle has a width of $x^2$ and a length of $x^5$. What is its area?', correct_answer: '$x^7$', misconception: '$x^{10}$'},
      {question: 'Simplify $y \\times y^6$', correct_answer: '$y^7$', misconception: '$y^6$'},
      {question: 'Simplify $2^4 \\times 2^3$', correct_answer: '$2^7$', misconception: '$4^7$'},
      {question: 'Simplify $b^5 \\times b^5$', correct_answer: '$b^{10}$', misconception: '$b^{25}$'},
      {question: 'Find the missing exponent: $x^3 \\times x^{?} = x^{11}$', correct_answer: '8', misconception: '33'},
      {question: 'Simplify $m^2 \\times m^3 \\times m^4$', correct_answer: '$m^9$', misconception: '$m^{24}$'},
      {question: 'Simplify $5^3 \\times 5^3$', correct_answer: '$5^6$', misconception: '$25^6$'},
      {question: 'A box has dimensions $x$, $x^2$, and $x^3$. Find its volume.', correct_answer: '$x^6$', misconception: '$x^5$'},
      {question: 'Simplify $p^4 \\times p$', correct_answer: '$p^5$', misconception: '$p^4$'},
      {question: 'True or False: $x^2 \\times y^3 = xy^5$', correct_answer: 'False', misconception: 'True'},
      {question: 'Simplify $c^8 \\times c^2$', correct_answer: '$c^{10}$', misconception: '$c^{16}$'},
      {question: 'Find the area of a square with side length $x^4$.', correct_answer: '$x^8$', misconception: '$x^{16}$'}
    ]
  },
  '2026-08-24': { // Powers of 10 / Div
    do_now: 'Simplify $10^5 \\times 10^3$. What is the expanded form?',
    direct_instruction: 'Introduce Power of a Power rule $(a^m)^n = a^{m \\times n}$ and Quotient rule $a^m / a^n = a^{m-n}$. Use visual grouping to show why $(10^2)^3 = 10^6$. Use fraction cancellation to show why $10^5 / 10^2 = 10^3$.',
    exit_ticket: 'Simplify $\\frac{10^8}{10^2}$ and $(10^4)^3$.',
    exemplars: [
      {question: 'Simplify $\\frac{10^9}{10^4}$', correct_answer: '$10^5$', misconception: '$10^{13}$'},
      {question: 'Simplify $(10^3)^5$', correct_answer: '$10^{15}$', misconception: '$10^8$'},
      {question: 'Simplify $\\frac{10^7}{10^6}$', correct_answer: '$10^1$ or $10$', misconception: '$10^{13}$'},
      {question: 'Simplify $(10^4)^2$', correct_answer: '$10^8$', misconception: '$10^6$'},
      {question: 'The Sun\'s mass is about $10^{30}$ kg. Earth\'s mass is about $10^{24}$ kg. How many times more massive is the Sun?', correct_answer: '$10^6$ times', misconception: '$10^{54}$'},
      {question: 'Simplify $\\frac{x^{12}}{x^4}$', correct_answer: '$x^8$', misconception: '$x^3$'},
      {question: 'Simplify $(y^5)^4$', correct_answer: '$y^{20}$', misconception: '$y^9$'},
      {question: 'Simplify $\\frac{a^8}{a^3}$', correct_answer: '$a^5$', misconception: '$a^{11}$'},
      {question: 'Simplify $(p^6)^3$', correct_answer: '$p^{18}$', misconception: '$p^9$'},
      {question: 'A hard drive holds $10^{12}$ bytes. A file is $10^6$ bytes. How many files can fit?', correct_answer: '$10^6$', misconception: '$10^2$'},
      {question: 'Find the missing exponent: $\\frac{10^{10}}{10^{?}} = 10^4$', correct_answer: '6', misconception: '14'},
      {question: 'Find the missing exponent: $(10^{?})^3 = 10^{15}$', correct_answer: '5', misconception: '12'},
      {question: 'Simplify $\\frac{w^{15}}{w^5}$', correct_answer: '$w^{10}$', misconception: '$w^3$'},
      {question: 'Simplify $(z^2)^7$', correct_answer: '$z^{14}$', misconception: '$z^9$'},
      {question: 'Simplify $\\frac{m^{100}}{m^{99}}$', correct_answer: '$m$', misconception: '$m^{199}$'},
      {question: 'A volume is $(x^3)^3$. Simplify the expression.', correct_answer: '$x^9$', misconception: '$x^6$'}
    ]
  },
  '2026-08-25': { // Negative Exponents / Other Bases
    do_now: 'Simplify $\\frac{10^3}{10^5}$ using the subtraction rule. What do you get?',
    direct_instruction: 'Explain $10^{-2} = \\frac{1}{10^2}$ using the pattern of dividing by 10. Show how the quotient rule creates negative exponents when the denominator is larger. Apply these rules to variables (e.g. $x^{-3} = \\frac{1}{x^3}$).',
    exit_ticket: 'Rewrite $y^{-4}$ with a positive exponent.',
    exemplars: [
      {question: 'Rewrite $10^{-3}$ as a fraction.', correct_answer: '$\\frac{1}{10^3}$ or $\\frac{1}{1000}$', misconception: '$-1000$'},
      {question: 'Simplify $\\frac{x^4}{x^7}$ using a negative exponent.', correct_answer: '$x^{-3}$', misconception: '$x^3$'},
      {question: 'Rewrite $m^{-5}$ with a positive exponent.', correct_answer: '$\\frac{1}{m^5}$', misconception: '$-m^5$'},
      {question: 'Simplify $a^2 \\times a^{-6}$', correct_answer: '$a^{-4}$ or $\\frac{1}{a^4}$', misconception: '$a^{-12}$'},
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
  '2026-08-26': { // Rational / Combining Bases
    do_now: 'Evaluate $2^3 \\times 5^3$. Now evaluate $(2 \\times 5)^3$. What do you notice?',
    direct_instruction: 'Introduce $(ab)^n = a^n b^n$. Show how bases can be combined if the exponents are the SAME. Practice with fractions: $(\\frac{a}{b})^n = \\frac{a^n}{b^n}$.',
    exit_ticket: 'Simplify $(3x)^2$ and $(\\frac{1}{4})^2$.',
    exemplars: [
      {question: 'Simplify $(2x)^3$', correct_answer: '$8x^3$', misconception: '$2x^3$'},
      {question: 'Evaluate $(\\frac{1}{3})^2$', correct_answer: '$\\frac{1}{9}$', misconception: '$\\frac{2}{3}$'},
      {question: 'Simplify $(ab)^4$', correct_answer: '$a^4 b^4$', misconception: '$ab^4$'},
      {question: 'Evaluate $(\\frac{2}{5})^3$', correct_answer: '$\\frac{8}{125}$', misconception: '$\\frac{6}{15}$'},
      {question: 'A square has a side length of $3y$. What is its area?', correct_answer: '$9y^2$', misconception: '$3y^2$'},
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
  '2026-08-27': { // Square Roots on Number line
    do_now: 'What is $5^2$? What number squared equals $49$?',
    direct_instruction: 'Introduce square roots as the inverse of squaring. Show how to estimate $\\sqrt{20}$ by placing it between $\\sqrt{16}=4$ and $\\sqrt{25}=5$ on a number line. Emphasize geometric meaning (side of a square).',
    exit_ticket: 'Estimate $\\sqrt{30}$ to the nearest tenth.',
    exemplars: [
      {question: 'Evaluate $\\sqrt{64}$', correct_answer: '8', misconception: '32'},
      {question: 'Between which two consecutive integers does $\\sqrt{15}$ lie?', correct_answer: '3 and 4', misconception: '7 and 8'},
      {question: 'Evaluate $\\sqrt{121}$', correct_answer: '11', misconception: '60.5'},
      {question: 'Estimate $\\sqrt{50}$ to one decimal place.', correct_answer: '7.1', misconception: '25'},
      {question: 'A square rug has an area of $81$ sq ft. What is its side length?', correct_answer: '9 ft', misconception: '40.5 ft'},
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
  '2026-08-28': { // Cube Roots
    do_now: 'Evaluate $3^3$. What number cubed equals 8?',
    direct_instruction: 'Introduce cube roots $\\sqrt[3]{x}$ as the inverse of cubing. Show geometric meaning (edge of a cube). Memorize perfect cubes: 1, 8, 27, 64, 125. Differentiate clearly between square roots and cube roots.',
    exit_ticket: 'Evaluate $\\sqrt[3]{64}$ and $\\sqrt{64}$.',
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
  '2026-08-31': { // Evaluating SQRT / CBRT
    do_now: 'Evaluate $\\sqrt{100}$ and $\\sqrt[3]{1000}$.',
    direct_instruction: 'Mixed practice of square and cube roots. Emphasize reading the index correctly. Practice negative cube roots and fractional roots $\\sqrt{\\frac{4}{9}} = \\frac{2}{3}$.',
    exit_ticket: 'Evaluate $\\sqrt{\\frac{25}{36}}$ and $\\sqrt[3]{-64}$.',
    exemplars: [
      {question: 'Evaluate $\\sqrt{\\frac{9}{16}}$', correct_answer: '$\\frac{3}{4}$', misconception: '$\\frac{4.5}{8}$'},
      {question: 'Evaluate $\\sqrt[3]{-125}$', correct_answer: '-5', misconception: '5'},
      {question: 'Evaluate $\\sqrt{100} + \\sqrt[3]{8}$', correct_answer: '12', misconception: '14'},
      {question: 'Evaluate $\\sqrt{\\frac{1}{25}}$', correct_answer: '$\\frac{1}{5}$', misconception: '$\\frac{1}{12.5}$'},
      {question: 'A square has area $\\frac{49}{64}$ sq ft. Find the side length.', correct_answer: '$\\frac{7}{8}$ ft', misconception: '$\\frac{24.5}{32}$ ft'},
      {question: 'Evaluate $\\sqrt[3]{\\frac{8}{27}}$', correct_answer: '$\\frac{2}{3}$', misconception: '$\\frac{4}{9}$'},
      {question: 'Evaluate $\\sqrt{81} - \\sqrt[3]{27}$', correct_answer: '6', misconception: '40'},
      {question: 'Evaluate $2 \\times \\sqrt{49}$', correct_answer: '14', misconception: '98'},
      {question: 'Evaluate $\\sqrt[3]{-1000}$', correct_answer: '-10', misconception: '10'},
      {question: 'The volume of a cube is $\\frac{1}{8}$ cubic meters. Find the edge length.', correct_answer: '$\\frac{1}{2}$ m', misconception: '$\\frac{1}{4}$ m'},
      {question: 'Evaluate $\\sqrt{0.04}$', correct_answer: '0.2', misconception: '0.02'},
      {question: 'Evaluate $\\sqrt[3]{0.001}$', correct_answer: '0.1', misconception: '0.01'},
      {question: 'Evaluate $\\frac{\\sqrt{144}}{3}$', correct_answer: '4', misconception: '48'},
      {question: 'Evaluate $\\sqrt{25} \\times \\sqrt[3]{8}$', correct_answer: '10', misconception: '40'},
      {question: 'Solve for $x$: $x^3 = -64$', correct_answer: '-4', misconception: '4'},
      {question: 'Solve for $y$: $y^2 = \\frac{9}{100}$', correct_answer: '$\\frac{3}{10}$ (or $-\\frac{3}{10}$)', misconception: '$\\frac{4.5}{50}$'}
    ]
  },
  '2026-09-01': { // Side Length / Edge Length
    do_now: 'If the area of a square is 36, what is its perimeter?',
    direct_instruction: 'Connect area/volume to physical word problems. To find fencing (perimeter), first find the side length using square root. To find ribbon around a box, find edge length using cube root. Multi-step real world applications.',
    exit_ticket: 'A square garden has an area of 144 sq ft. How much fencing is needed to enclose it?',
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
  const { data: plans, error } = await supabase.from('lesson_plans').select('id, date_start, topic');
  if (error) { console.error("Supabase Error:", error); return; }
  for (let plan of plans) {
    if (data[plan.date_start] && !plan.topic.includes('Emergency Plan')) {
      const updateData = data[plan.date_start];
      
      await supabase.from('lesson_plans').update({
        do_now: updateData.do_now,
        direct_instruction: updateData.direct_instruction,
        exit_ticket: updateData.exit_ticket,
        structured_exemplars: updateData.exemplars
      }).eq('id', plan.id);
      
      console.log('Successfully updated ' + plan.date_start + ': ' + plan.topic);
    }
  }
}

run();

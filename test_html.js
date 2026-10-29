const baseSlides = [{ content: 'Test \n new line and \\times' }];
const slidesJSON = JSON.stringify(baseSlides).replace(/</g, '\\u003c');
const html = `
<script>
  const slides = ${slidesJSON};
  console.log(slides[0].content);
</script>
`;
console.log(html);

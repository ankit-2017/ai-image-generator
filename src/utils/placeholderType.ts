var typeTimer:any

function addToPlaceholder(toAdd: string, el: any) {
  el.setAttribute('placeholder', el.getAttribute('placeholder') + toAdd);

  return new Promise(resolve => {
    typeTimer = setTimeout(resolve, 80)
    return typeTimer
  } );
}
var intervalId: any


function clearPlaceholder(el: any) {
  el.setAttribute("placeholder", "");
}
// Print one phrase
function printPhrase(phrase: any, el: any, shouldClear: boolean) {
  return new Promise(resolve => {
      clearPlaceholder(el);
      let letters = phrase.split('');
      letters.reduce(
          (promise: any, letter: string, index: number) => promise.then(() => {
              if (index === letters.length - 1) {
                 intervalId = setTimeout(resolve, 1000);
              }
              return addToPlaceholder(letter, el);
          }),
          Promise.resolve()
      );
  });
} 

function printPhrases(phrases: any, el: any, shouldClear: boolean): void {
  phrases.reduce(
      (promise: any, phrase: string) => promise.then(() => printPhrase(phrase, el, shouldClear)), 
      Promise.resolve()
  );
}

// Start typing
export const cutomPlaceholderType = (element: any, shouldClear: boolean) =>  {
  let phrases = [
      "Type: \"Logo design for my technology company\"",
      "E.g: \"Landscape picture of Mount Everest\"",
      "Try something like that: \"Create an image of cute puppies walking in the park with their owner.\"",
      "E.g: \"A man walking in the space wearing blue spacesuit.\"",
      "Try something ..."
  ];
  if (shouldClear) {
    clearTimeout(intervalId)
    clearTimeout(typeTimer)
    element.setAttribute("placeholder", "Try something ...");
    return 
  }

  printPhrases(phrases, element, shouldClear);
}
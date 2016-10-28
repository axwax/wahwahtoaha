/*
 * Check for browser support
 */

if ('speechSynthesis' in window) {
} else {
}
		$('#msg').html('Your browser <strong>supports</strong> speech synthesis.');
		$('#msg').html('Sorry your browser <strong>does not support</strong> speech synthesis.<br>Try this in <a href="http://www.google.co.uk/intl/en/chrome/browser/canary.html">Chrome Canary</a>.');
		$('#msg').addClass('not-supported');

e.defaults.current_phrase = e.functions.get_new_phrase(e.defaults.current_exercise);
var frenchPhraseList = ["",""];
frenchPhraseList = phrases_telling;

var randomNumber = Math.floor((Math.random() * 3));
var listLength = frenchPhraseList.length;

// Get the 'speak' button
var button = $('#speak');

// Get the text input element.
var speechMsgInput = $('#speech-msg');

// Get the attribute controls.
//var voiceSelect = $('#voice');
var volumeInput = $('#volume');
var rateInput = $('#rate');
var pitchInput = $('#pitch');

// Execute e.functions.loadVoices.
e.functions.loadVoices();

// Chrome loads voices asynchronously.
window.speechSynthesis.onvoiceschanged = function(event) {
  e.functions.loadVoices();
};

$('#speech-msg').keydown(function(event){
   if(event.keyCode == 13){
		// Check current input text with previous spoken phrase
		var lowerCaseInput = speechMsgInput.value;
		lowerCaseInput = lowerCaseInput.toLowerCase();
		var lowerCasePhrase = "" + e.defaults.current_phrase;
		var lowerCasePhraseEnglish = "" + e.defaults.current_phrase;

		lowerCasePhrase = lowerCasePhrase.toLowerCase();
		lowerCasePhraseEnglish = lowerCasePhraseEnglish.toLowerCase();

		console.log("LOWER Case Phrase: " + lowerCasePhrase);
		console.log("REMOVE DIACRITICS Phrase: " + e.functions.removeDiacritics(lowerCasePhrase));

		lowerCasePhrase = e.functions.removeDiacritics(lowerCasePhrase);
		lowerCasePhraseEnglish = e.functions.removeDiacritics(lowerCasePhraseEnglish);

		if ((lowerCasePhrase == lowerCaseInput)||(lowerCasePhraseEnglish == lowerCaseInput)) {
			e.defaults.incorrectAnswerCount=0;
			console.log ("Correct!");
			// Clear the text input
			$('#speech-msg').val("");
			e.defaults.current_phrase = e.functions.get_new_phrase(e.defaults.current_exercise);
			e.functions.speak(e.defaults.current_phrase);
		}
		else
		{
			e.functions.speak(e.defaults.current_phrase);
			e.defaults.incorrectAnswerCount++;
			if (e.defaults.incorrectAnswerCount > 3){
			}
			if (e.defaults.incorrectAnswerCount > 5){
				$('#help').text(e.defaults.current_phrase);
			}
		}
   }
});
const phrases = [
	"Lock tf in before I come over and do it for you 💀.",
	"You're slacking harder than a broken rubber band 💔🫵.",
	"Quit doomscrolling like a clown and get some work done 🤡.",
	"You think success comes with all that scrolling? Pathetic 😤📱.",
	"You're moving slower than Windows XP on startup, pick up the pace 🐢⚡.",
	"Stop pretending to work, you’re not fooling anyone 💀🫵.",
	"At this rate, even a snail is making more progress than you 🐌.",
	"Every time you slack, a winner somewhere laughs at you 🏆😂.",
	"If excuses were currency, you'd be a billionaire by now 💰🙄.",
	"Oh, another 'break'? You’re breaking records in laziness 🤦‍♂️.",
	"Stop embarrassing your future self and grind already 😒⏳.",
	"You’re not stuck; you’re just full of bad decisions 💀🚪.",
];

const randomPhrase = function () {
	return phrases[Math.floor(Math.random() * phrases.length)];
};

export default randomPhrase;

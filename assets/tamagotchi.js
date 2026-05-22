(function() {
	// Game state
	let selectedScenario = null;
	let currentQuestion = 0;
	let stats = { integrity: 50, profit: 50, happiness: 50 };
	let showResult = false;
	let showContactForm = false;
	let showCodeOfPractice = false;
	let showStorySelection = false;

	const scenarios = [
		{
			id: 0,
			name: 'Bookshop',
			description: 'Curate stories in your neighborhood',
			questions: [
				{
					text: 'You open a bookshop. Stock?',
					choices: [
						{ text: 'Books you curate', effects: { integrity: 15, happiness: 10, profit: -5 } },
						{ text: 'Bestsellers only', effects: { integrity: -10, happiness: -5, profit: 15 } }
					]
				},
				{
					text: 'Developer offers mall space. Do?',
					choices: [
						{ text: 'Stay local', effects: { integrity: 10, happiness: 15, profit: -10 } },
						{ text: 'Take the deal', effects: { integrity: -15, happiness: -5, profit: 20 } }
					]
				},
				{
					text: 'Book supplier options. Go with?',
					choices: [
						{ text: 'Independent distributors', effects: { integrity: 15, happiness: 10, profit: -5 } },
						{ text: 'Major wholesale only', effects: { integrity: -10, happiness: -5, profit: 15 } }
					]
				}
			]
		},
		{
			id: 1,
			name: 'Coffee Kiosk',
			description: 'Brew connections one cup at a time',
			questions: [
				{
					text: 'Start coffee kiosk. Focus?',
					choices: [
						{ text: 'Perfect one blend', effects: { integrity: 15, happiness: 10, profit: -5 } },
						{ text: 'Every trendy drink', effects: { integrity: -10, happiness: -5, profit: 15 } }
					]
				},
				{
					text: 'Regular customer forgot wallet. Do?',
					choices: [
						{ text: 'Coffee on the house', effects: { integrity: 10, happiness: 15, profit: -5 } },
						{ text: 'No cash, no coffee', effects: { integrity: -5, happiness: -15, profit: 5 } }
					]
				},
				{
					text: 'Supplier offers cheaper beans with questionable sourcing. Do?',
					choices: [
						{ text: 'Keep ethical suppliers', effects: { integrity: 15, happiness: 10, profit: -5 } },
						{ text: 'Switch for savings', effects: { integrity: -25, happiness: -10, profit: 20 } }
					]
				}
			]
		}
	];

	function resetGame() {
		selectedScenario = null;
		currentQuestion = 0;
		stats = { integrity: 50, profit: 50, happiness: 50 };
		showResult = false;
		showContactForm = false;
		showCodeOfPractice = false;
		showStorySelection = false;
	}

	function selectScenario(id) {
		selectedScenario = id;
		showStorySelection = false;
		renderGame();
	}

	function handleChoice(choiceIndex) {
		const choice = scenarios[selectedScenario].questions[currentQuestion].choices[choiceIndex];
		
		Object.keys(choice.effects).forEach(key => {
			stats[key] = Math.max(0, Math.min(100, stats[key] + choice.effects[key]));
		});

		if (currentQuestion < scenarios[selectedScenario].questions.length - 1) {
			currentQuestion++;
			renderGame();
		} else {
			showResult = true;
			renderGame();
		}
	}

	function shouldShowSuccess() {
		return stats.integrity >= 60 && stats.happiness >= 60;
	}

	function submitContactForm() {
		const message = document.getElementById('contactMessage').value.trim();

		if (!message) {
			alert('Please enter your message.');
			return;
		}

		// Create mailto link
		const subject = encodeURIComponent('Contact Form');
		const body = encodeURIComponent(`Message:\n${message}`);
		const mailtoLink = `mailto:specialprojects@pinn.hk?subject=${subject}&body=${body}`;
		
		window.location.href = mailtoLink;
		
		// Show confirmation
		alert('Thank you for your message! Your email client should open now.');
		
		// Reset form
		document.getElementById('contactMessage').value = '';
	}

	function renderGame() {
		const gameContent = document.getElementById('tamagotchiContent');
		
		if (showContactForm) {
			gameContent.innerHTML = `
				<div class="tamagotchi-logo-block">
					<svg class="tamagotchi-logo" width="50" height="50" viewBox="0 0 131.8 131.5" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
						<path d="M57.7,116.1c0,11.4-4,15.3-15.3,15.3h-27C4.2,131.5,0,127.8,0,116.1V83.2C0,71.8,4,68,15.3,68h27    c11.1,0,15.3,3.6,15.3,15.2L57.7,116.1z M49.7,83c0-5.3-2.4-7.9-7.9-7.9H16.1c-5.5,0-7.9,2.6-7.9,7.9v33.1c0,5.3,2.4,8,7.9,8h25.7    c5.5,0,7.9-2.6,7.9-8L49.7,83z M116.2,36.9c0,11.4-3.8,15.2-15.2,15.2H31.4c-11.2,0-15.3-3.6-15.3-15.2V15.2C16.1,3.8,20,0,31.4,0    H101c11,0,15.1,3.6,15.1,15.2L116.2,36.9z M107.7,15.2c0-5.3-2.3-7.9-7.7-7.9H32.5c-5.5,0-7.9,2.6-7.9,7.9v21.6    c0,5.3,2.4,7.9,7.9,7.9h67.4c5.3,0,7.7-2.6,7.7-7.9L107.7,15.2z M131.8,116.2c0,11.4-3.9,15.3-15.3,15.3H88.2    c-11.1,0-15.2-3.6-15.2-15.3v-33C73,71.8,76.8,68,88.2,68h28.2c11.1,0,15.3,3.6,15.3,15.2L131.8,116.2z M123.9,83    c0-5.3-2.4-7.9-7.9-7.9H89c-5.5,0-7.9,2.6-7.9,7.9v33.1c0,5.3,2.3,8,7.9,8h27c5.3,0,7.9-2.6,7.9-8L123.9,83z"></path>
					</svg>
				</div>
				<div class="tamagotchi-content-block">
					<div class="tamagotchi-result-block">
						<div class="tamagotchi-contact-form">
							<textarea id="contactMessage" placeholder="Your Message" class="tamagotchi-contact-textarea"></textarea>
						</div>
						<div class="tamagotchi-choice-a">Send Message</div>
						<div class="tamagotchi-choice-b">Back</div>
					</div>
				</div>

				<div class="tamagotchi-button-block">
					<div class="tamagotchi-button-row">
						<button class="tamagotchi-choice-btn" onclick="window.Tamagotchi.submitContact()">A</button>
						<button class="tamagotchi-choice-btn" onclick="window.Tamagotchi.backToResult()">B</button>
					</div>
				</div>
			`;
		} else if (showCodeOfPractice) {
			gameContent.innerHTML = `
				<div class="tamagotchi-logo-block">
					<svg class="tamagotchi-logo" width="50" height="50" viewBox="0 0 131.8 131.5" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
						<path d="M57.7,116.1c0,11.4-4,15.3-15.3,15.3h-27C4.2,131.5,0,127.8,0,116.1V83.2C0,71.8,4,68,15.3,68h27    c11.1,0,15.3,3.6,15.3,15.2L57.7,116.1z M49.7,83c0-5.3-2.4-7.9-7.9-7.9H16.1c-5.5,0-7.9,2.6-7.9,7.9v33.1c0,5.3,2.4,8,7.9,8h25.7    c5.5,0,7.9-2.6,7.9-8L49.7,83z M116.2,36.9c0,11.4-3.8,15.2-15.2,15.2H31.4c-11.2,0-15.3-3.6-15.3-15.2V15.2C16.1,3.8,20,0,31.4,0    H101c11,0,15.1,3.6,15.1,15.2L116.2,36.9z M107.7,15.2c0-5.3-2.3-7.9-7.7-7.9H32.5c-5.5,0-7.9,2.6-7.9,7.9v21.6    c0,5.3,2.4,7.9,7.9,7.9h67.4c5.3,0,7.7-2.6,7.7-7.9L107.7,15.2z M131.8,116.2c0,11.4-3.9,15.3-15.3,15.3H88.2    c-11.1,0-15.2-3.6-15.2-15.3v-33C73,71.8,76.8,68,88.2,68h28.2c11.1,0,15.3,3.6,15.3,15.2L131.8,116.2z M123.9,83    c0-5.3-2.4-7.9-7.9-7.9H89c-5.5,0-7.9,2.6-7.9,7.9v33.1c0,5.3,2.3,8,7.9,8h27c5.3,0,7.9-2.6,7.9-8L123.9,83z"></path>
					</svg>
				</div>
				<div class="tamagotchi-content-block">
					<div class="tamagotchi-result-block">
						<div class="tamagotchi-code-section">
							<div class="tamagotchi-code-title">Code of practice:</div>
							<div class="tamagotchi-code-item">
								<strong>1. Good business tells a story.</strong> Products are not the sum of their specifications--they represent a clear purpose.
							</div>
							<div class="tamagotchi-code-item">
								<strong>2. Good business is patient.</strong> It grows slowly, prioritizes profit over revenue. After all, there are no fruits before flowers.
							</div>
							<div class="tamagotchi-code-item">
								<strong>3. Good business knows the limits.</strong> Like any living organism, it has a natural size where it functions best--growth beyond this point creates dysfunction and rot.
							</div>
							<div class="tamagotchi-code-item">
								<strong>4. Good business is simple.</strong> It looks forward while learning from the past, avoiding unnecessary complexity that obscures purpose.
							</div>
							<div class="tamagotchi-code-item">
								<strong>5. Good business sets an example.</strong> It leads through actions, not words, inspiring others to build with the same integrity.
							</div>
						</div>
						<div class="tamagotchi-choice-a">Contact Us</div>
						<div class="tamagotchi-choice-b">Back</div>
					</div>
				</div>

				<div class="tamagotchi-button-block">
					<div class="tamagotchi-button-row">
						<button class="tamagotchi-choice-btn" onclick="window.Tamagotchi.contact()">A</button>
						<button class="tamagotchi-choice-btn" onclick="window.Tamagotchi.backToResult()">B</button>
					</div>
				</div>
			`;
		} else if (showResult) {
			const success = shouldShowSuccess();
			
			if (success) {
				gameContent.innerHTML = `
					<div class="tamagotchi-logo-block">
						<svg class="tamagotchi-logo" width="50" height="50" viewBox="0 0 131.8 131.5" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
							<path d="M57.7,116.1c0,11.4-4,15.3-15.3,15.3h-27C4.2,131.5,0,127.8,0,116.1V83.2C0,71.8,4,68,15.3,68h27    c11.1,0,15.3,3.6,15.3,15.2L57.7,116.1z M49.7,83c0-5.3-2.4-7.9-7.9-7.9H16.1c-5.5,0-7.9,2.6-7.9,7.9v33.1c0,5.3,2.4,8,7.9,8h25.7    c5.5,0,7.9-2.6,7.9-8L49.7,83z M116.2,36.9c0,11.4-3.8,15.2-15.2,15.2H31.4c-11.2,0-15.3-3.6-15.3-15.2V15.2C16.1,3.8,20,0,31.4,0    H101c11,0,15.1,3.6,15.1,15.2L116.2,36.9z M107.7,15.2c0-5.3-2.3-7.9-7.7-7.9H32.5c-5.5,0-7.9,2.6-7.9,7.9v21.6    c0,5.3,2.4,7.9,7.9,7.9h67.4c5.3,0,7.7-2.6,7.7-7.9L107.7,15.2z M131.8,116.2c0,11.4-3.9,15.3-15.3,15.3H88.2    c-11.1,0-15.2-3.6-15.2-15.3v-33C73,71.8,76.8,68,88.2,68h28.2c11.1,0,15.3,3.6,15.3,15.2L131.8,116.2z M123.9,83    c0-5.3-2.4-7.9-7.9-7.9H89c-5.5,0-7.9,2.6-7.9,7.9v33.1c0,5.3,2.3,8,7.9,8h27c5.3,0,7.9-2.6,7.9-8L123.9,83z"></path>
						</svg>
					</div>
					<div class="tamagotchi-content-block">
						<div class="tamagotchi-result-block">
							<div class="tamagotchi-result-text">
								Great minds think alike! It seems we share a vision for thoughtful, sustainable growth.
							</div>
							<div class="tamagotchi-choice-a">Contact Us</div>
							<div class="tamagotchi-choice-b">Check Code of Practice</div>
						</div>
					</div>

					<div class="tamagotchi-button-block">
						<div class="tamagotchi-button-row">
							<button class="tamagotchi-choice-btn" onclick="window.Tamagotchi.contact()">A</button>
							<button class="tamagotchi-choice-btn" onclick="window.Tamagotchi.showCode()">B</button>
						</div>
					</div>
				`;
			} else {
				gameContent.innerHTML = `
					<div class="tamagotchi-logo-block">
						<svg class="tamagotchi-logo" width="50" height="50" viewBox="0 0 131.8 131.5" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
							<path d="M57.7,116.1c0,11.4-4,15.3-15.3,15.3h-27C4.2,131.5,0,127.8,0,116.1V83.2C0,71.8,4,68,15.3,68h27    c11.1,0,15.3,3.6,15.3,15.2L57.7,116.1z M49.7,83c0-5.3-2.4-7.9-7.9-7.9H16.1c-5.5,0-7.9,2.6-7.9,7.9v33.1c0,5.3,2.4,8,7.9,8h25.7    c5.5,0,7.9-2.6,7.9-8L49.7,83z M116.2,36.9c0,11.4-3.8,15.2-15.2,15.2H31.4c-11.2,0-15.3-3.6-15.3-15.2V15.2C16.1,3.8,20,0,31.4,0    H101c11,0,15.1,3.6,15.1,15.2L116.2,36.9z M107.7,15.2c0-5.3-2.3-7.9-7.7-7.9H32.5c-5.5,0-7.9,2.6-7.9,7.9v21.6    c0,5.3,2.4,7.9,7.9,7.9h67.4c5.3,0,7.7-2.6,7.7-7.9L107.7,15.2z M131.8,116.2c0,11.4-3.9,15.3-15.3,15.3H88.2    c-11.1,0-15.2-3.6-15.2-15.3v-33C73,71.8,76.8,68,88.2,68h28.2c11.1,0,15.3,3.6,15.3,15.2L131.8,116.2z M123.9,83    c0-5.3-2.4-7.9-7.9-7.9H89c-5.5,0-7.9,2.6-7.9,7.9v33.1c0,5.3,2.3,8,7.9,8h27c5.3,0,7.9-2.6,7.9-8L123.9,83z"></path>
						</svg>
					</div>
					<div class="tamagotchi-content-block">
						<div class="tamagotchi-result-block">
							<div class="tamagotchi-result-text">
								Unfortunately our goals aren't aligned. Ready to try a different approach?
							</div>
							<div class="tamagotchi-choice-a">Try Another Story</div>
							<div class="tamagotchi-choice-b">Close</div>
						</div>
					</div>

					<div class="tamagotchi-button-block">
						<div class="tamagotchi-button-row">
							<button class="tamagotchi-choice-btn" onclick="window.Tamagotchi.restart()">A</button>
							<button class="tamagotchi-choice-btn" onclick="window.Tamagotchi.close()">B</button>
						</div>
					</div>
				`;
			}
		} else if (showStorySelection) {
			gameContent.innerHTML = `
				<div class="tamagotchi-logo-block">
					<svg class="tamagotchi-logo" width="50" height="50" viewBox="0 0 131.8 131.5" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
						<path d="M57.7,116.1c0,11.4-4,15.3-15.3,15.3h-27C4.2,131.5,0,127.8,0,116.1V83.2C0,71.8,4,68,15.3,68h27    c11.1,0,15.3,3.6,15.3,15.2L57.7,116.1z M49.7,83c0-5.3-2.4-7.9-7.9-7.9H16.1c-5.5,0-7.9,2.6-7.9,7.9v33.1c0,5.3,2.4,8,7.9,8h25.7    c5.5,0,7.9-2.6,7.9-8L49.7,83z M116.2,36.9c0,11.4-3.8,15.2-15.2,15.2H31.4c-11.2,0-15.3-3.6-15.3-15.2V15.2C16.1,3.8,20,0,31.4,0    H101c11,0,15.1,3.6,15.1,15.2L116.2,36.9z M107.7,15.2c0-5.3-2.3-7.9-7.7-7.9H32.5c-5.5,0-7.9,2.6-7.9,7.9v21.6    c0,5.3,2.4,7.9,7.9,7.9h67.4c5.3,0,7.7-2.6,7.7-7.9L107.7,15.2z M131.8,116.2c0,11.4-3.9,15.3-15.3,15.3H88.2    c-11.1,0-15.2-3.6-15.2-15.3v-33C73,71.8,76.8,68,88.2,68h28.2c11.1,0,15.3,3.6,15.3,15.2L131.8,116.2z M123.9,83    c0-5.3-2.4-7.9-7.9-7.9H89c-5.5,0-7.9,2.6-7.9,7.9v33.1c0,5.3,2.3,8,7.9,8h27c5.3,0,7.9-2.6,7.9-8L123.9,83z"></path>
					</svg>
				</div>
				<div class="tamagotchi-content-block">
					<div class="tamagotchi-story-block">
						<div class="tamagotchi-story-title">Choose Your Story</div>
						<div class="tamagotchi-story-a">${scenarios[0].name} - ${scenarios[0].description}</div>
						<div class="tamagotchi-story-b">${scenarios[1].name} - ${scenarios[1].description}</div>
					</div>
				</div>

				<div class="tamagotchi-button-block">
					<div class="tamagotchi-button-row">
						<button class="tamagotchi-choice-btn" onclick="window.Tamagotchi.selectScenario(0)">A</button>
						<button class="tamagotchi-choice-btn" onclick="window.Tamagotchi.selectScenario(1)">B</button>
					</div>
				</div>
			`;
		} else if (selectedScenario !== null) {
			const scenario = scenarios[selectedScenario];
			const question = scenario.questions[currentQuestion];
			const progress = ((currentQuestion + 1) / scenario.questions.length) * 100;
			
			gameContent.innerHTML = `
				<div class="tamagotchi-logo-block">
					<svg class="tamagotchi-logo" width="50" height="50" viewBox="0 0 131.8 131.5" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
						<path d="M57.7,116.1c0,11.4-4,15.3-15.3,15.3h-27C4.2,131.5,0,127.8,0,116.1V83.2C0,71.8,4,68,15.3,68h27    c11.1,0,15.3,3.6,15.3,15.2L57.7,116.1z M49.7,83c0-5.3-2.4-7.9-7.9-7.9H16.1c-5.5,0-7.9,2.6-7.9,7.9v33.1c0,5.3,2.4,8,7.9,8h25.7    c5.5,0,7.9-2.6,7.9-8L49.7,83z M116.2,36.9c0,11.4-3.8,15.2-15.2,15.2H31.4c-11.2,0-15.3-3.6-15.3-15.2V15.2C16.1,3.8,20,0,31.4,0    H101c11,0,15.1,3.6,15.1,15.2L116.2,36.9z M107.7,15.2c0-5.3-2.3-7.9-7.7-7.9H32.5c-5.5,0-7.9,2.6-7.9,7.9v21.6    c0,5.3,2.4,7.9,7.9,7.9h67.4c5.3,0,7.7-2.6,7.7-7.9L107.7,15.2z M131.8,116.2c0,11.4-3.9,15.3-15.3,15.3H88.2    c-11.1,0-15.2-3.6-15.2-15.3v-33C73,71.8,76.8,68,88.2,68h28.2c11.1,0,15.3,3.6,15.3,15.2L131.8,116.2z M123.9,83    c0-5.3-2.4-7.9-7.9-7.9H89c-5.5,0-7.9,2.6-7.9,7.9v33.1c0,5.3,2.3,8,7.9,8h27c5.3,0,7.9-2.6,7.9-8L123.9,83z"></path>
					</svg>
				</div>
				<div class="tamagotchi-content-block">
					<div class="tamagotchi-question-block">
						<div class="tamagotchi-progress-bar">
							<div class="tamagotchi-progress-fill" style="width: ${progress}%"></div>
						</div>
						<div class="tamagotchi-question-text">${question.text}</div>
						<div class="tamagotchi-choice-a">${question.choices[0].text}</div>
						<div class="tamagotchi-choice-b">${question.choices[1].text}</div>
					</div>
				</div>

				<div class="tamagotchi-button-block">
					<div class="tamagotchi-button-row">
						<button class="tamagotchi-choice-btn" onclick="window.Tamagotchi.handleChoice(0)">A</button>
						<button class="tamagotchi-choice-btn" onclick="window.Tamagotchi.handleChoice(1)">B</button>
					</div>
				</div>
			`;
		} else {
			// Initial intro screen
			gameContent.innerHTML = `
				<div class="tamagotchi-logo-block">
					<svg class="tamagotchi-logo" width="50" height="50" viewBox="0 0 131.8 131.5" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
						<path d="M57.7,116.1c0,11.4-4,15.3-15.3,15.3h-27C4.2,131.5,0,127.8,0,116.1V83.2C0,71.8,4,68,15.3,68h27    c11.1,0,15.3,3.6,15.3,15.2L57.7,116.1z M49.7,83c0-5.3-2.4-7.9-7.9-7.9H16.1c-5.5,0-7.9,2.6-7.9,7.9v33.1c0,5.3,2.4,8,7.9,8h25.7    c5.5,0,7.9-2.6,7.9-8L49.7,83z M116.2,36.9c0,11.4-3.8,15.2-15.2,15.2H31.4c-11.2,0-15.3-3.6-15.3-15.2V15.2C16.1,3.8,20,0,31.4,0    H101c11,0,15.1,3.6,15.1,15.2L116.2,36.9z M107.7,15.2c0-5.3-2.3-7.9-7.7-7.9H32.5c-5.5,0-7.9,2.6-7.9,7.9v21.6    c0,5.3,2.4,7.9,7.9,7.9h67.4c5.3,0,7.7-2.6,7.7-7.9L107.7,15.2z M131.8,116.2c0,11.4-3.9,15.3-15.3,15.3H88.2    c-11.1,0-15.2-3.6-15.2-15.3v-33C73,71.8,76.8,68,88.2,68h28.2c11.1,0,15.3,3.6,15.3,15.2L131.8,116.2z M123.9,83    c0-5.3-2.4-7.9-7.9-7.9H89c-5.5,0-7.9,2.6-7.9,7.9v33.1c0,5.3,2.3,8,7.9,8h27c5.3,0,7.9-2.6,7.9-8L123.9,83z"></path>
					</svg>
				</div>
				<div class="tamagotchi-content-block">
					<div class="tamagotchi-intro-block">
						<div class="tamagotchi-intro-text">
							Welcome to our garden. We invest time and resources on projects with substance. We believe the best work emerges when you provide proper conditions--like good soil, adequate light, and time to establish roots before expecting fruit.
						</div>
						<div class="tamagotchi-choice-a">Take the test</div>
						<div class="tamagotchi-choice-b">Close</div>
					</div>
				</div>

				<div class="tamagotchi-button-block">
					<div class="tamagotchi-button-row">
						<button class="tamagotchi-choice-btn" onclick="window.Tamagotchi.startTest()">A</button>
						<button class="tamagotchi-choice-btn" onclick="window.Tamagotchi.close()">B</button>
					</div>
				</div>
			`;
		}
	}

	function createOverlay() {
		const overlay = document.createElement('div');
		overlay.id = 'tamagotchiOverlay';
		overlay.className = 'tamagotchi-overlay';
		overlay.innerHTML = `
			<div class="tamagotchi-container">
				<div id="tamagotchiContent"></div>
			</div>
		`;
		document.body.appendChild(overlay);

		// Close on outside click
		overlay.addEventListener('click', function(e) {
			if (e.target === overlay) {
				if (window.Tamagotchi) {
					window.Tamagotchi.close();
				}
			}
		});

		// Close on Escape key
		document.addEventListener('keydown', function(e) {
			if (e.key === 'Escape' && overlay.style.display === 'flex') {
				if (window.Tamagotchi) {
					window.Tamagotchi.close();
				}
			}
		});
	}

	// Create and expose the global API immediately
	window.Tamagotchi = {
		open: function() {
			if (!document.getElementById('tamagotchiOverlay')) {
				createOverlay();
			}
			const overlay = document.getElementById('tamagotchiOverlay');
			overlay.style.display = 'flex';
			document.body.style.overflow = 'hidden';
			
			// Trigger animation
			setTimeout(() => {
				overlay.classList.add('visible');
			}, 10);
			
			resetGame();
			renderGame();
		},

		close: function() {
			const overlay = document.getElementById('tamagotchiOverlay');
			if (overlay) {
				overlay.classList.remove('visible');
				setTimeout(() => {
					overlay.style.display = 'none';
					document.body.style.overflow = 'auto';
				}, 300);
			}
		},

		restart: function() {
			resetGame();
			renderGame();
		},

		startTest: function() {
			showStorySelection = true;
			renderGame();
		},

		selectScenario: selectScenario,
		handleChoice: handleChoice,

		contact: function() {
			showContactForm = true;
			showCodeOfPractice = false;
			renderGame();
		},

		showCode: function() {
			showCodeOfPractice = true;
			showContactForm = false;
			renderGame();
		},

		submitContact: submitContactForm,

		backToResult: function() {
			showContactForm = false;
			showCodeOfPractice = false;
			renderGame();
		}
	};

	// Auto-open based on URL parameter
	function checkAutoOpen() {
		const urlParams = new URLSearchParams(window.location.search);
		const autoOpen = urlParams.get('tamagotchi');
		
		if (autoOpen === 'open' || autoOpen === 'auto' || window.location.hash === '#tamagotchi') {
			window.Tamagotchi.open();
		}
	}
	
	// Manual trigger function for click events
	window.Tamagotchi.trigger = function() {
		window.Tamagotchi.open();
	};
	
	// Check for auto-open on load
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', () => {
			createOverlay();
			checkAutoOpen();
		});
	} else {
		createOverlay();
		checkAutoOpen();
	}

})();
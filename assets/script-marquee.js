document.addEventListener('DOMContentLoaded', function() {
	const track = document.querySelector('.featured-track');
	const list = document.querySelector('.featured-list');
	const container = document.querySelector('.featured-container');
	
	// Calculate the scroll animation
	const pixelsPerSecond = 60;
	const listWidth = list.offsetWidth + parseInt(getComputedStyle(list).gap);
	const containerWidth = container.offsetWidth;
	const duration = listWidth / pixelsPerSecond;
	
	// Create and apply the animation
	const keyframes = `
		@keyframes scroll {
			from { transform: translateX(${containerWidth}px); }
			to { transform: translateX(-${listWidth}px); }
		}
	`;
	
	const styleSheet = document.createElement("style");
	styleSheet.textContent = keyframes;
	document.head.appendChild(styleSheet);

	// Initial animation
	track.style.animation = `scroll ${duration}s linear infinite`;

	// Pause on hover
	container.addEventListener('mouseenter', () => {
		track.style.animationPlayState = 'paused';
	});

	container.addEventListener('mouseleave', () => {
		track.style.animationPlayState = 'running';
	});
});
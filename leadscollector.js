import wixCRM from 'wix-crm';

$w.onReady(function () {
	let emailInput = $w('#input1'); // Your email input
	let sendButton = $w('#button1'); // Your send button
	let displayText = $w('#text1'); // Your text field

	sendButton.onClick(async () => {
		let email = emailInput.value;
		
		if (email) {
			// Show a pending message
			displayText.text = "Hang tight! Adding your email...";
			
			try {
				await wixCRM.createContact({
					emails: [email]  
				});
				
				// Update with success message
				displayText.text = "Sweet, your email is now set to receive our mails.";
				
			} catch (error) {
				displayText.text = "Darn! Something went wrong. Please try again later.";
			}
			
		} else {
			// Show an error message
			displayText.text = "Whoops! Please enter an email.";
		}
	});
});

$widget.onPropsChanged((oldProps, newProps) => {
	// ... your code for handling prop changes
});

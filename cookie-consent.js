document.addEventListener('DOMContentLoaded', function() {
    const COOKIE_CONSENT_KEY = 'cookie_consent_given';
    const banner = document.getElementById('cookie-consent-banner');
    const acceptButton = document.getElementById('cookie-consent-accept');

    // Check if consent has already been given
    if (localStorage.getItem(COOKIE_CONSENT_KEY)) {
        return;
    }

    // Show the banner
    setTimeout(() => {
        banner.classList.add('show');
    }, 500);

    // Handle accept button click
    acceptButton.addEventListener('click', function() {
        // Set a flag in local storage to indicate consent
        localStorage.setItem(COOKIE_CONSENT_KEY, 'true');
        
        // Hide the banner
        banner.classList.remove('show');
    });
});

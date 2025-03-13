function startChat() {
    alert('Live chat feature coming soon! Please contact with WhatsApp.');
}
document.getElementById('supportForm').addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Your message has been submitted!');
    this.reset();
});
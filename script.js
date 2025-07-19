
        // Mobile menu toggle
        document.querySelector('.mobile-menu-button').addEventListener('click', function() {
            document.querySelector('.mobile-menu').classList.toggle('hidden');
        });

        // Theme toggle
        const themeToggle = document.getElementById('theme-toggle');
        themeToggle.addEventListener('click', function() {
            document.documentElement.classList.toggle('dark');
            // Store user preference in localStorage
            if (document.documentElement.classList.contains('dark')) {
                localStorage.setItem('theme', 'dark');
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            } else {
                localStorage.setItem('theme', 'light');
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            }
        });

        // Check for saved user preference
        if (localStorage.getItem('theme') === 'dark' || (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            document.documentElement.classList.remove('dark');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }

        // Welcome message with name from localStorage
        const welcomeMessage = document.getElementById('welcome-message');
        const storedName = localStorage.getItem('userName');
        
        if (storedName) {
            welcomeMessage.textContent = `Hi ${storedName}!`;
        } else {
            const name = prompt('Welcome! What\'s your name?');
            if (name) {
                localStorage.setItem('userName', name);
                welcomeMessage.textContent = `Hi ${name}!`;
            }
        }

        // Form validation and submission
        const messageForm = document.getElementById('messageForm');
        const submissionResult = document.getElementById('submissionResult');
        const resultContent = document.getElementById('resultContent');

        messageForm.addEventListener('submit', function(e) {
            e.preventDefault();
            let isValid = true;

            // Reset errors
            document.querySelectorAll('.hidden[id$="-error"]').forEach(el => {
                el.classList.add('hidden');
            });

            // Validate name
            const nameInput = document.getElementById('name');
            if (!nameInput.value.trim()) {
                document.getElementById('name-error').classList.remove('hidden');
                isValid = false;
            }

            // Validate email
            const emailInput = document.getElementById('email');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value)) {
                document.getElementById('email-error').classList.remove('hidden');
                isValid = false;
            }

            // Validate message
            const messageInput = document.getElementById('message');
            if (!messageInput.value.trim()) {
                document.getElementById('message-error').classList.remove('hidden');
                isValid = false;
            }

            // Validate consent
            const consentInput = document.getElementById('consent');
            if (!consentInput.checked) {
                document.getElementById('consent-error').classList.remove('hidden');
                isValid = false;
            }

            if (isValid) {
                // Show submission results
                const formData = {
                    name: nameInput.value,
                    email: emailInput.value,
                    phone: document.getElementById('phone').value,
                    message: messageInput.value
                };

                resultContent.innerHTML = `
                    <p><strong>Name:</strong> ${formData.name}</p>
                    <p><strong>Email:</strong> ${formData.email}</p>
                    <p><strong>Phone:</strong> ${formData.phone || 'Not provided'}</p>
                    <p><strong>Message:</strong> ${formData.message}</p>
                `;

                submissionResult.classList.remove('hidden');
                
                // Reset form
                messageForm.reset();
                
                // Scroll to results
                submissionResult.scrollIntoView({ behavior: 'smooth' });
            }
        });

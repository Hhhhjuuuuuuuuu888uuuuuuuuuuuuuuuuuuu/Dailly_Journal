  
        document.addEventListener('DOMContentLoaded', function() {
            // Form elements
            const journalForm = document.getElementById('journal-form');
            const entryIdInput = document.getElementById('entry-id');
            const titleInput = document.getElementById('entry-title');
            const dateInput = document.getElementById('entry-date');
            const contentInput = document.getElementById('entry-content');
            const submitBtn = document.getElementById('submit-btn');
            const cancelBtn = document.getElementById('cancel-btn');
            const formTitle = document.getElementById('form-title');
            
            // Entries container
            const entriesContainer = document.getElementById('entries-container');
            const noEntriesMessage = document.getElementById('no-entries-message');
            
            // Set today's date as default
            dateInput.valueAsDate = new Date();
            
            // Form submission handler
            journalForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // In a real app, this would send data to the backend
                const entryData = {
                    id: entryIdInput.value,
                    title: titleInput.value,
                    date: dateInput.value,
                    content: contentInput.value
                };
                
                console.log('Entry data:', entryData);
                
                // Reset form
                resetForm();
                
                // For demo purposes, add the entry to the UI
                if (!entryData.id) {
                    addEntryToUI({
                        id: Date.now(), // Temporary ID
                        title: entryData.title,
                        date: formatDate(entryData.date),
                        content: entryData.content
                    });
                }
                
                // Show the no entries message if appropriate
                toggleNoEntriesMessage();
            });
            
            // Cancel button handler
            cancelBtn.addEventListener('click', resetForm);
            
            // Function to add an entry to the UI
            function addEntryToUI(entry) {
                const entryElement = document.createElement('div');
                entryElement.className = 'entry';
                entryElement.dataset.id = entry.id;
                
                entryElement.innerHTML = `
                    <h3>${entry.title}</h3>
                    <div class="entry-date">${entry.date}</div>
                    <div class="entry-content">
                        <p>${entry.content}</p>
                    </div>
                    <div class="entry-actions">
                        <button class="edit-btn">Edit</button>
                        <button class="delete-btn">Delete</button>
                    </div>
                `;
                
                // Add to the beginning of the container
                entriesContainer.insertBefore(entryElement, entriesContainer.firstChild);
                
                // Add event listeners to the new buttons
                entryElement.querySelector('.edit-btn').addEventListener('click', () => editEntry(entry));
                entryElement.querySelector('.delete-btn').addEventListener('click', () => deleteEntry(entry.id));
            }
            
            // Function to edit an entry
            function editEntry(entry) {
                formTitle.textContent = 'Edit Journal Entry';
                entryIdInput.value = entry.id;
                titleInput.value = entry.title;
                dateInput.value = formatDateForInput(entry.date);
                contentInput.value = entry.content;
                submitBtn.textContent = 'Update Entry';
                cancelBtn.classList.remove('hidden');
            }
            
            // Function to delete an entry
            function deleteEntry(entryId) {
                // In a real app, this would send a delete request to the backend
                if (confirm('Are you sure you want to delete this entry?')) {
                    const entryElement = document.querySelector(`.entry[data-id="${entryId}"]`);
                    if (entryElement) {
                        entryElement.remove();
                        toggleNoEntriesMessage();
                    }
                }
            }
            
            // Function to reset the form
            function resetForm() {
                journalForm.reset();
                entryIdInput.value = '';
                formTitle.textContent = 'New Journal Entry';
                submitBtn.textContent = 'Save Entry';
                cancelBtn.classList.add('hidden');
                dateInput.valueAsDate = new Date();
            }
            
            // Helper function to format date for display
            function formatDate(dateString) {
                const options = { year: 'numeric', month: 'long', day: 'numeric' };
                return new Date(dateString).toLocaleDateString(undefined, options);
            }
            
            // Helper function to format date for input field
            function formatDateForInput(dateString) {
                const date = new Date(dateString);
                return date.toISOString().split('T')[0];
            }
            
            // Function to toggle the no entries message
            function toggleNoEntriesMessage() {
                if (entriesContainer.children.length === 1) { // Only the message element exists
                    noEntriesMessage.classList.remove('hidden');
                } else {
                    noEntriesMessage.classList.add('hidden');
                }
            }
            
            // Initialize the UI
            toggleNoEntriesMessage();
        });
   
// Main JavaScript for Usman's Story Time Website
// Adding interactive features with beautiful animations and search functionality

document.addEventListener('DOMContentLoaded', function() {
    
    // Add smooth scrolling animation when page loads
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 1s ease-in-out';
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });

    // Add floating animation to story cards
    const storyCards = document.querySelectorAll('.story-card');
    
    storyCards.forEach((card, index) => {
        // Stagger the animation for each card
        setTimeout(() => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(50px)';
            card.style.transition = 'all 0.8s ease-out';
            
            // Trigger animation
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100);
        }, index * 200);
    });

    // Add interactive effects for story cards
    storyCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.background = 'rgba(255, 255, 255, 0.98)';
            this.style.borderColor = 'rgba(102, 126, 234, 0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.background = 'rgba(255, 255, 255, 0.95)';
            this.style.borderColor = 'rgba(255, 255, 255, 0.2)';
        });
    });

    // Search functionality with suggestions
    const searchBox = document.getElementById('storySearch');
    const searchBtn = document.getElementById('searchBtn');
    const noResults = document.getElementById('noResults');
    const searchSuggestions = document.getElementById('searchSuggestions');
    
    function performSearch() {
        const searchTerm = searchBox.value.toLowerCase().trim();
        const storyCards = document.querySelectorAll('.story-card');
        let visibleCount = 0;
        
        // Hide suggestions when searching
        if (searchSuggestions) {
            searchSuggestions.style.display = 'none';
        }
        
        storyCards.forEach(card => {
            const title = card.querySelector('.story-title').textContent.toLowerCase();
            const content = card.querySelector('.story-content').textContent.toLowerCase();
            const moral = card.querySelector('.moral').textContent.toLowerCase();
            const verse = card.querySelector('.islamic-verse');
            const verseText = verse ? verse.textContent.toLowerCase() : '';
            
            const isVisible = title.includes(searchTerm) || 
                            content.includes(searchTerm) || 
                            moral.includes(searchTerm) || 
                            verseText.includes(searchTerm);
            
            if (isVisible) {
                card.style.display = 'block';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });
        
        // Show/hide no results message
        if (searchTerm && visibleCount === 0) {
            if (noResults) noResults.style.display = 'block';
        } else {
            if (noResults) noResults.style.display = 'none';
        }
        
        // If search is cleared, show all cards with animation
        if (!searchTerm) {
            storyCards.forEach((card, index) => {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 100);
            });
        }
    }
    
    function showStoryRequestModal() {
        // Create modal for story request
        const modal = document.createElement('div');
        modal.innerHTML = `
            <div style="
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                backdrop-filter: blur(5px);
                z-index: 2000;
                display: flex;
                justify-content: center;
                align-items: center;
                opacity: 0;
                transition: opacity 0.3s ease;
            " id="storyRequestModal">
                <div style="
                    background: rgba(255, 255, 255, 0.95);
                    backdrop-filter: blur(10px);
                    border-radius: 20px;
                    padding: 40px;
                    max-width: 500px;
                    width: 90%;
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
                    border: 1px solid rgba(255, 255, 255, 0.3);
                    transform: scale(0.8);
                    transition: transform 0.3s ease;
                " id="modalContent">
                    <h2 style="
                        font-family: 'Oxygen', sans-serif;
                        color: #4a5568;
                        margin-bottom: 20px;
                        text-align: center;
                    ">📝 Request a New Story</h2>
                    <p style="
                        color: #6b7280;
                        margin-bottom: 20px;
                        text-align: center;
                        font-style: italic;
                    ">What Islamic story would you like to see added to our collection?</p>
                    <textarea placeholder="Describe the story you'd like to see, or mention a specific theme like 'kindness to animals' or 'importance of honesty'..." style="
                        width: 100%;
                        height: 120px;
                        border: 2px solid rgba(102, 126, 234, 0.3);
                        border-radius: 15px;
                        padding: 15px;
                        font-family: 'Georgia', serif;
                        font-size: 1em;
                        resize: vertical;
                        outline: none;
                        background: rgba(255, 255, 255, 0.9);
                        margin-bottom: 20px;
                    " id="storyRequestText"></textarea>
                    <div style="display: flex; gap: 15px; justify-content: center;">
                        <button style="
                            background: linear-gradient(45deg, #667eea, #764ba2);
                            color: white;
                            border: none;
                            border-radius: 25px;
                            padding: 12px 24px;
                            font-family: 'Oxygen', sans-serif;
                            font-weight: bold;
                            cursor: pointer;
                            transition: all 0.3s ease;
                        " id="submitRequest">Submit Request 📝</button>
                        <button style="
                            background: rgba(108, 114, 147, 0.1);
                            color: #6b7280;
                            border: 2px solid rgba(108, 114, 147, 0.3);
                            border-radius: 25px;
                            padding: 12px 24px;
                            font-family: 'Oxygen', sans-serif;
                            font-weight: bold;
                            cursor: pointer;
                            transition: all 0.3s ease;
                        " id="cancelRequest">Cancel</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Animate in
        setTimeout(() => {
            modal.style.opacity = '1';
            modal.querySelector('#modalContent').style.transform = 'scale(1)';
        }, 50);
        
        // Handle buttons
        modal.querySelector('#cancelRequest').addEventListener('click', () => {
            modal.style.opacity = '0';
            modal.querySelector('#modalContent').style.transform = 'scale(0.8)';
            setTimeout(() => document.body.removeChild(modal), 300);
        });
        
        modal.querySelector('#submitRequest').addEventListener('click', () => {
            const requestText = modal.querySelector('#storyRequestText').value;
            if (requestText.trim()) {
                alert('Thank you for your story request! 🌟\n\n"' + requestText + '"\n\nYour suggestion has been noted and will be considered for future stories. May Allah bless you!');
                modal.style.opacity = '0';
                modal.querySelector('#modalContent').style.transform = 'scale(0.8)';
                setTimeout(() => document.body.removeChild(modal), 300);
            } else {
                alert('Please enter your story request before submitting.');
            }
        });
        
        // Close on background click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.querySelector('#cancelRequest').click();
            }
        });
    }
    
    if (searchBox && searchBtn) {
        // Show suggestions on focus
        searchBox.addEventListener('focus', function() {
            if (searchSuggestions && !this.value) {
                searchSuggestions.style.display = 'block';
            }
            this.style.transform = 'scale(1.02)';
        });
        
        // Hide suggestions on blur (with delay for clicking)
        searchBox.addEventListener('blur', function() {
            this.style.transform = 'scale(1)';
            setTimeout(() => {
                if (searchSuggestions) {
                    searchSuggestions.style.display = 'none';
                }
            }, 200);
        });
        
        // Handle suggestion clicks
        if (searchSuggestions) {
            searchSuggestions.addEventListener('click', function(e) {
                const suggestionItem = e.target.closest('.suggestion-item');
                if (suggestionItem) {
                    const searchValue = suggestionItem.getAttribute('data-search');
                    
                    if (searchValue === 'request') {
                        showStoryRequestModal();
                        searchSuggestions.style.display = 'none';
                        searchBox.blur();
                    } else {
                        searchBox.value = searchValue;
                        performSearch();
                        searchSuggestions.style.display = 'none';
                    }
                }
            });
        }
        
        // Search on input (real-time search)
        searchBox.addEventListener('input', function() {
            performSearch();
            // Hide suggestions when typing
            if (searchSuggestions && this.value) {
                searchSuggestions.style.display = 'none';
            } else if (searchSuggestions && !this.value) {
                searchSuggestions.style.display = 'block';
            }
        });
        
        // Search button click
        searchBtn.addEventListener('click', function() {
            performSearch();
            // Add visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
        
        // Search on Enter key
        searchBox.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                performSearch();
                // Trigger button animation
                searchBtn.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    searchBtn.style.transform = 'scale(1)';
                }, 150);
                // Hide suggestions
                if (searchSuggestions) {
                    searchSuggestions.style.display = 'none';
                }
            }
        });
        
        // Add keyboard shortcuts for search
        document.addEventListener('keydown', function(e) {
            if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
                e.preventDefault();
                searchBox.focus();
            }
            if (e.key === 'Escape' && document.activeElement === searchBox) {
                searchBox.value = '';
                performSearch();
                searchBox.blur();
            }
        });
    }

    console.log('🌟 Usman\'s Story Time website loaded successfully! 🌟');
    console.log('✨ May these stories bring peace and wisdom to all who read them ✨');
    console.log('🔍 Use Ctrl+F (or Cmd+F on Mac) to quickly focus the search bar!');
    console.log('⏎ Press Enter or click the Enter button to search!');
    console.log('📝 Click on "Story Request" to suggest new stories!');
});


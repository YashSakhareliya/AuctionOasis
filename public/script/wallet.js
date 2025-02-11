document.addEventListener("DOMContentLoaded", () => {
    const addFundsBtn = document.getElementById("addFundsBtn")
    const addFundsPopup = document.getElementById("addFundsPopup")
    const closePopup = document.getElementById("closePopup")
    const addFundsForm = document.getElementById("addFundsForm")
  
    addFundsBtn.addEventListener("click", (e) => {
      e.preventDefault()
      addFundsPopup.style.display = "block"
    })
  
    closePopup.addEventListener("click", () => {
      addFundsPopup.style.display = "none"
    })
  
    addFundsForm.addEventListener("submit", (e) => {
      e.preventDefault()
      // Here you would typically send the form data to your server
      // For now, we'll just log it to the console
      const amount = document.getElementById("amount").value
      const paymentMethod = document.getElementById("paymentMethod").value
      console.log("Adding funds:", { amount, paymentMethod })
  
      // Close the popup after submission
      addFundsPopup.style.display = "none"
  
      // You might want to show a success message or update the balance here
      alert("Funds added successfully!")
    })
  
    // Close the popup if the user clicks outside of it
    window.addEventListener("click", (e) => {
      if (e.target === addFundsPopup) {
        addFundsPopup.style.display = "none"
      }
    })
  })
  
  